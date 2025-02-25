using System.Security.Claims;
using API.SignalR;
using Core.Entities;
using Core.Interfaces;
using Core.Specification;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ItemsController(
        IGenericRepository<Item> itemRepo,
        IGenericRepository<Folder> folderRepo,
        SignInManager<AppUser> signInManager,
        IStorageService blobStorage,
        IUserFollowService userFollowService,
        IFollowRepository followRepo,
        IHubContext<NotificationHub> hubContext) : BaseApiController
    {
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Item>>> GetItems([FromQuery] ItemSpecParams specParams)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            specParams.UserId = userId;
            // specParams.MutualFollowerIds = await userFollowService.GetMutualFollowersAsync(userId);

            var spec = new ItemSpecification(specParams);
            return await CreatePagedResult(itemRepo, spec, specParams.PageIndex, specParams.PageSize);
        }

        [HttpGet("public-for-user")]
        public async Task<ActionResult<IReadOnlyList<Item>>> GetPublicItemsForUser()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var mutualFollowers = await userFollowService.GetMutualFollowersAsync(userId);
            Console.WriteLine("Mutual followers: " + mutualFollowers.Count);

            var spec = new ItemSpecification(userId, mutualFollowers);
            var items = await itemRepo.ListAsync(spec);

            if (!items.Any())
            {
                return NotFound("No items found");
            }

            return Ok(items);
        }

        [Authorize]
        [HttpPost("set-public/{id}")]
        public async Task<ActionResult> SetItemPublic(int id, [FromBody] bool isPublic)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            Console.WriteLine("User id: " + userId);
            if (userId == null) return Unauthorized();

            var spec = new ItemSpecification(id);
            var item = await itemRepo.GetEntityWithSpec(spec);
            if (item == null) return BadRequest("Item not found.");
            if (item.AppUserId != userId) return Unauthorized();

            var followers = await followRepo.GetUserFollowers(userId);
            var following = await followRepo.GetUserFollowing(userId);

            if (item.AppUserId == userId)
            {
                item.IsPublic = isPublic;
                itemRepo.Update(item);

                if (await itemRepo.SaveAllAsync())
                {
                    var ownerConnectionId = NotificationHub.GetConnectionIdForUser(item.AppUserId);
                    if (ownerConnectionId != null)
                    {
                        await hubContext.Clients.Client(ownerConnectionId).SendAsync("ItemUpdated", item);
                    }
                    
                    foreach (var follower in followers)
                    {
                        var followerConnectionId = NotificationHub.GetConnectionIdForUser(follower.Id);
                        if (followerConnectionId != null)
                        {
                            await hubContext.Clients.Client(followerConnectionId).SendAsync("ItemUpdated", item);
                        }
                    }
                    Console.WriteLine("Item updated successfully");
                    return Ok();
                }

                return BadRequest("Item cannot be updated");
            }

            if (followers.Any(f => f.Id == userId) && following.Any(f => f.Id == item.AppUserId))
            {
                item.IsPublic = isPublic;
                itemRepo.Update(item);

                if (await itemRepo.SaveAllAsync())
                {
                    return Ok();
                }

                return BadRequest("Item cannot be updated");
            }

            return Unauthorized();
        }


        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Item>> CreateItem(Item item)
        {
            var user = await signInManager.UserManager.Users.FirstOrDefaultAsync(x => x.Email == User.Identity!.Name);
            var folder = await folderRepo.GetByIdAsync(item.FolderId);

            if (folder == null || folder.AppUserId != user.Id)
            {
                return BadRequest("Folder not found for this user");
            }

            item.AppUserId = user.Id;

            item.Folder = folder;
            itemRepo.Add(item);

            if (await itemRepo.SaveAllAsync())
                return Ok(item);

            return BadRequest("Item cannot be added");
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetItem(int id)
        {
            if (User.Identity?.IsAuthenticated == false) return Unauthorized();
            var user = await signInManager.UserManager.Users.FirstOrDefaultAsync(x => x.Email == User.Identity!.Name);

            var mutualFollowerIds = await userFollowService.GetMutualFollowersAsync(user!.Id);

            var spec = new ItemSpecification(id, user.Id, mutualFollowerIds);
            var item = await itemRepo.GetEntityWithSpec(spec);
            if (item == null) return NotFound();
            return Ok(item);
        }

        [HttpGet("categories")]
        public async Task<ActionResult<IReadOnlyList<string>>> GetCategories([FromQuery] int folderId)
        {
            var spec = new CategorySpecification(folderId);
            var categories = await itemRepo.ListAsync(spec);
            return Ok(categories);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var spec = new ItemSpecification(id);
            var item = await itemRepo.GetEntityWithSpec(spec);
            if (item == null) return NotFound();

            if (item.Folder!.AppUserId != userId) return Unauthorized();

            itemRepo.Delete(item);

            if (await itemRepo.SaveAllAsync())
                return Ok();

            await blobStorage.DeleteEverything();

            return BadRequest("Item cannot be deleted");
        }
    }
}