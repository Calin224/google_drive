using Core.Entities;
using Core.Interfaces;
using Core.Specification;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PhotoController(IPhotoService photoService, IGenericRepository<Item> repo) : BaseApiController
    {
        [HttpPost("{id:int}")]
        public async Task<ActionResult<Item>> AddPhoto(int id, [FromForm] List<IFormFile> files)
        {
            var item = await repo.GetByIdAsync(id);
            if (item == null) return NotFound("Item not found");

            var results = await photoService.AddPhotosAsync(files);
            var photos = new List<Photo>();

            foreach (var result in results)
            {
                if (result.Error != null) return BadRequest(result.Error.Message);

                var photo = new Photo
                {
                    Url = result.SecureUrl.AbsoluteUri,
                    PublicId = result.PublicId,
                    ItemId = id
                };
                photos.Add(photo);
            }

            item.Photos.AddRange(photos);

            if (await repo.SaveAllAsync()) return Ok(item);

            return BadRequest("Photos could not be added");
        }

        [HttpGet("{itemId:int}/get-all")]
        public async Task<ActionResult<List<Photo>>> GetAllPhotos(int itemId)
        {
            var spec = new ItemSpecification(itemId);
            var item = await repo.GetEntityWithSpec(spec);
            if(item == null) return NotFound("Item not found");

            return Ok(item.Photos.ToList());
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
            if (await repo.SaveAllAsync()) return NoContent();

            return BadRequest("Problem deleting the photo");
        }
    }
}
