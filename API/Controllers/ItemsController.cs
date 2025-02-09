using API.DTOs;
using Core.Entities;
using Core.Interfaces;
using Core.Specification;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;

namespace API.Controllers
{
    public class ItemsController(IGenericRepository<Item> repo, IPhotoService photoService) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Item>>> GetItems([FromQuery]ItemSpecParams specParams)
        {
            var spec = new ItemSpecification();
            return await CreatePagedResult(repo, spec, specParams.PageIndex, specParams.PageSize);
        }

        [HttpPost]
        public async Task<ActionResult<Item>> CreateItem(Item item)
        {
            repo.Add(item);
            if (await repo.SaveAllAsync())
                return CreatedAtAction("GetItem", new { id = item.Id }, item);

            return BadRequest("Item cannot be added");
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
