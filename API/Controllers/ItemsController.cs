using System.Security.Claims;
using Core.Entities;
using Core.Interfaces;
using Core.Specification;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ItemsController(IGenericRepository<Item> repo, SignInManager<AppUser> signInManager) : BaseApiController
    {
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Item>>> GetItems([FromQuery] ItemSpecParams specParams)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized("User not found");

            specParams.appUserId = userId;
            var spec = new ItemSpecification(specParams);
            return await CreatePagedResult(repo, spec, specParams.PageIndex, specParams.PageSize);
        }
        
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Item>> CreateItem(Item item)
        {
            var user = await signInManager.UserManager.GetUserAsync(User);

            if (user.Items == null)
            {
                user.Items = new List<Item>();
            }
            user.Items.Add(item);

            var res = await signInManager.UserManager.UpdateAsync(user);
            
            if(!res.Succeeded) return BadRequest("Item cannot be added");

            return Ok(user.Items);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetItem(int id)
        {
            var spec = new ItemSpecification(id);
            var item = await repo.GetEntityWithSpec(spec);
            if (item == null) return NotFound();
            return Ok(item);
        }

        [HttpGet("categories")]
        public async Task<ActionResult<IReadOnlyList<string>>> GetCategories()
        {
            var spec = new CategorySpecification();
            var categories = await repo.ListAsync(spec);
            return Ok(categories);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var item = await repo.GetByIdAsync(id);
            if (item == null) return NotFound();

            repo.Delete(item);

            if (await repo.SaveAllAsync())
                return Ok();

            return BadRequest("Item cannot be deleted");
        }
    }
}
