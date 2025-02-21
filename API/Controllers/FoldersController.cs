using System;
using System.Security.Claims;
using Core.Entities;
using Core.Interfaces;
using Core.Specification;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class FoldersController(IGenericRepository<Folder> repo) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<Folder>>> GetFolders([FromQuery] FolderSpecParams specParams)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null)
            return Unauthorized("User not found");

        specParams.AppUserId = userId;
        var spec = new FolderSpecification(specParams);
        return await CreatePagedResult(repo, spec, specParams.PageIndex, specParams.PageSize);
    }

    [HttpGet("{folderId:int}")]
    public async Task<ActionResult<Folder>> GetFolder(int folderId)
    {
        var spec = new FolderSpecification(folderId);
        var folder = await repo.GetEntityWithSpec(spec);
        if (folder == null) return NotFound();
        return Ok(folder);
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<Folder>> CreateFolder(Folder folder)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null)
            return Unauthorized("User not found");

        folder.AppUserId = userId;
        repo.Add(folder);
        if (await repo.SaveAllAsync())
            return Ok(folder);

        return BadRequest("Problem creating folder");
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteFolder(int id)
    {
        var folder = await repo.GetByIdAsync(id);
        if (folder == null)
            return NotFound();

        repo.Delete(folder);
        if (await repo.SaveAllAsync())
            return Ok();

        return BadRequest("Problem deleting folder");
    }
}