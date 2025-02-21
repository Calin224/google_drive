using Core.Entities;
using Core.Interfaces;
using Core.Specification;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ItemsController(IGenericRepository<Item> itemRepo, IGenericRepository<Folder> folderRepo, SignInManager<AppUser> signInManager, IStorageService blobStorage) : BaseApiController
    {
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Item>>> GetItems([FromQuery] ItemSpecParams specParams)
        {
            var spec = new ItemSpecification(specParams);
            return await CreatePagedResult(itemRepo, spec, specParams.PageIndex, specParams.PageSize);
        }
        
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Item>> CreateItem(Item item)
        {
            var user = await signInManager.UserManager.GetUserAsync(User);
            var folder = await folderRepo.GetByIdAsync(item.FolderId);

            if (folder == null || folder.AppUserId != user.Id)
            {
                return BadRequest("Folder not found for this user");
            }

            itemRepo.Add(item);
            
            if (await itemRepo.SaveAllAsync())
                return Ok(item);

            return BadRequest("Item cannot be added");
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetItem(int id)
        {
            var spec = new ItemSpecification(id);
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
            var item = await itemRepo.GetByIdAsync(id);
            if (item == null) return NotFound();

            itemRepo.Delete(item);

            if (await itemRepo.SaveAllAsync())
                return Ok();

            await blobStorage.DeleteEverything();

            return BadRequest("Item cannot be deleted");
        }
    }
}
