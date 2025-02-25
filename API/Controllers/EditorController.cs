using API.DTOs;
using Core.Entities;
using Core.Interfaces;
using Core.Specification;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class EditorController(IGenericRepository<Item> itemRepo) : BaseApiController
{
    [HttpPost("{itemId:int}")]
    public async Task<ActionResult<Editor>> UploadEditorText(int itemId, [FromBody] EditorDto editorDto)
    {
        var spec = new ItemSpecification(itemId);
        var item = await itemRepo.GetEntityWithSpec(spec);
        if (item == null) return NotFound();

        if (item.Editor == null)
        {
            item.Editor = new Editor()
            {
                Text = editorDto.Text,
                ItemId = itemId
            };
        }
        else
        {
            item.Editor.Text = editorDto.Text;
        }
        
        if(await itemRepo.SaveAllAsync()) return Ok(item.Editor.Text);
        
        return BadRequest("Failed to upload editor text");
    }

    [HttpPut("{itemId:int}")]
    public async Task<ActionResult> UpdateEditorText(int itemId, [FromBody] EditorDto editorDto)
    {
        var spec = new ItemSpecification(itemId);
        var item = await itemRepo.GetEntityWithSpec(spec);
        if(item == null) return NotFound();

        // item.Editor!.Text = editorDto.Text;
        if (item.Editor == null)
        {
            item.Editor = new Editor
            {
                Text = null
            };
        }

        item.Editor.Text = editorDto.Text;

        if (await itemRepo.SaveAllAsync())
            return NoContent();
        
        return BadRequest("Cannot update editor text");
    }

    [HttpDelete("{itemId:int}")]
    public async Task<ActionResult> DeleteEditorText(int itemId)
    {
        var spec = new ItemSpecification(itemId);
        var item = await itemRepo.GetEntityWithSpec(spec);
        if (item == null) return NotFound();

        if (item.Editor?.Text != "")
        {
            if (item.Editor != null) item.Editor.Text = "";
        }
        if (await itemRepo.SaveAllAsync()) return NoContent();
        
        return BadRequest("Cannot delete editor text");
    }

    [HttpGet("{itemId:int}")]
    public async Task<ActionResult<bool>> ItemHasEditor(int itemId)
    {
        var spec = new ItemSpecification(itemId);
        var item = await itemRepo.GetEntityWithSpec(spec);
        if (item == null) return NotFound();

        return Ok(item.Editor != null);
    }
}