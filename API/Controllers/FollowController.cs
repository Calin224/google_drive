using System.Security.Claims;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class FollowController(IFollowRepository repo, UserManager<AppUser> userManager) : BaseApiController
{
    [Authorize]
    [HttpPost("{targetUserId}")]
    public async Task<ActionResult> ToggleFollow(string targetUserId)
    {
        var sourceUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (sourceUserId == null) return BadRequest("You cannot follow yourself");

        var targetUser = await userManager.FindByIdAsync(targetUserId);
        if (targetUser == null) return NotFound("Target user does not exist");
        
        var existingFollow = await repo.GetUserFollow(sourceUserId, targetUserId);
        if (existingFollow != null)
        {
            repo.DeleteFollow(existingFollow);
        }
        else
        {
            var follow = new UserFollow()
            {
                SourceUserId = sourceUserId,
                TargetUserId = targetUserId
            };
            repo.AddFollow(follow);
        }

        if (await repo.SaveChanges()) return Ok();
        
        return BadRequest("Failed to toggle follow");
    }

    [Authorize]
    [HttpGet("followers")]
    public async Task<ActionResult<IReadOnlyList<AppUser>>> GetFollowers()
    {
        var sourceUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        // Console.WriteLine(sourceUserId);
        if(sourceUserId == null) return BadRequest("User not found");
        
        var followers = await repo.GetUserFollowers(sourceUserId);
        return Ok(followers.Select(x => new
        {
            x.FirstName,
            x.LastName,
            x.Email,
            x.Profile
        }));
    }
    
    [HttpGet("exists-follow/{targetUserId}")]
    public async Task<ActionResult<bool>> ExistsFollow(string targetUserId)
    {
        var sourceUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (sourceUserId == null) return BadRequest("User not found");

        var existingFollow = await repo.GetUserFollow(sourceUserId, targetUserId);
        return Ok(new
        {
            existFollow = existingFollow != null
        });
    }

    [Authorize]
    [HttpGet("following")]
    public async Task<ActionResult<IReadOnlyList<AppUser>>> GetFollowing()
    {
        var sourceUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if(sourceUserId == null) return BadRequest("User not found");

        var following = await repo.GetUserFollowing(sourceUserId);
        return Ok(following.Select(x => new
        {
            x.FirstName,
            x.LastName,
            x.Email,
            x.Profile
        }));
    }
}