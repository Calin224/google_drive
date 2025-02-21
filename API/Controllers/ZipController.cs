using Core.Entities;
using Core.Interfaces;
using Core.Specification;
using Infrastructure.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ZipController(IStorageService storageService, IGenericRepository<Item> repo, IGenericRepository<Zip> repoZip) : BaseApiController
{
    [HttpPost("upload/{itemId}")]
    public async Task<ActionResult<Zip>> UploadZip(int itemId, IFormFile file)
    {
        var item = await repo.GetByIdAsync(itemId);
        if (item == null) return NotFound();
        var blobUrl = await storageService.UploadFileAsync(file);

        var zipFile = new Zip()
        {
            FileName = file.FileName,
            FileSize = file.Length,
            BlobUrl = blobUrl,
            ItemId = itemId,
            Item = item
        };

        item.Zips ??= new List<Zip>();
        item.Zips.Add(zipFile);

        if (await repo.SaveAllAsync()) return Ok(zipFile);
        
        return BadRequest("Problem uploading zip file");
    }
    
    [HttpGet("{itemId:int}")]
    public async Task<ActionResult<List<Zip>>> GetAllZips(int itemId)
    {
        var spec = new ZipSpecification(itemId);
        var zips = await repo.ListAsync(spec);
        return Ok(zips);
    }
    
    [HttpDelete("{zipId:int}")]
    public async Task<ActionResult> DeleteZip(int zipId)
    {
        var zip = await repoZip.GetByIdAsync(zipId);
        if (zip == null) return NotFound();
        
        repoZip.Delete(zip);
        storageService.DeleteFileAsync(zip.FileName);
        if (await repo.SaveAllAsync()) return NoContent();
        
        return BadRequest("Problem deleting the zip file");
    }
}