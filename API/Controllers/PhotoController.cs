using Core.Entities;
using Core.Interfaces;
using Core.Specification;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PhotoController(IPhotoService photoService, IGenericRepository<Item> repo) : BaseApiController
    {
        [HttpPost("{id:int}")]
        public async Task<ActionResult<Item>> AddPhoto(int id, IFormFile file)
        {
            var item = await repo.GetByIdAsync(id);
            if (item == null) return NotFound();
            var result = await photoService.AddPhotoAsync(file);
            if (result.Error != null) return BadRequest(result.Error.Message);
            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId,
                ItemId = id
            };
            item.Photos.Add(photo);
            if (await repo.SaveAllAsync()) return Ok();
            return BadRequest("Photo cannot be added");
        }

        [HttpDelete("{itemId:int}/{photoId:int}")]
        public async Task<ActionResult> DeletePhoto(int itemId, int photoId)
        {
            var spec = new ItemSpecification(itemId);
            var item = await repo.GetEntityWithSpec(spec);
            if (item == null) return NotFound();

            if (item.Photos == null || !item.Photos.Any()) return BadRequest("Item does not have any photos!");

            var photo = item.Photos.FirstOrDefault(x => x.Id == photoId);
            if (photo == null) return BadRequest("Cannot find the photo!");

            if (photo.PublicId != null)
            {
                var result = await photoService.DeletePhotoAsync(photo.PublicId);
                if (result.Error != null) return BadRequest(result.Error.Message);
            }

            item.Photos.Remove(photo);
            if (await repo.SaveAllAsync()) return Ok();

            return BadRequest("Problem deleting the photo");
        }
    }
}
