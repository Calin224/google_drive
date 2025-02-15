using System;
using Core.Entities;
using Core.Interfaces;
using Core.Specification;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class PdfController(IGenericRepository<Item> repo) : BaseApiController
{
    [HttpPost("{itemId:int}")]
    public async Task<ActionResult<Item>> UploadPdf(int itemId, List<IFormFile> files)
    {
        var item = await repo.GetByIdAsync(itemId);
        if(item == null) return NotFound("Item not found!");

        using var memoryStream = new MemoryStream();
        foreach(var file in files)
        {
            await file.CopyToAsync(memoryStream);

            var pdf = new Pdf
            {
                Name = file.FileName,
                Data = memoryStream.ToArray(),
                ContentType = file.ContentType
            };

            item.Pdfs!.Add(pdf);
        }

        if(await repo.SaveAllAsync()) return Ok(item);

        return BadRequest("Pdfs could not be uploaded");
    }

    [HttpDelete("{itemId:int}/{pdfId:int}")]
    public async Task<ActionResult> DeletePdf(int itemId, int pdfId)
    {
        var spec = new ItemSpecification(itemId);
        var item = await repo.GetEntityWithSpec(spec);
        if(item == null) return NotFound();

        if(item.Pdfs == null || !item.Pdfs.Any()) return BadRequest("Item does not have any pdfs");

        var pdf = item.Pdfs.FirstOrDefault(x => x.Id == pdfId);
        if(pdf == null) return BadRequest("Cannot find the pdf!");

        item.Pdfs.Remove(pdf);
        if(await repo.SaveAllAsync()) return NoContent();

        return BadRequest("Problem deleting the pdf!");
    }
}
