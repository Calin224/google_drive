using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class FollowRepository(ItemContext context) : IFollowRepository
{
    public async Task<UserFollow?> GetUserFollow(string sourceUserId, string targetUserId)
    {
        return await context.Follows.FindAsync(sourceUserId, targetUserId);
    }

    public async Task<IReadOnlyList<AppUser>> GetUserFollowers(string userId)
    {
        var followers = await context.Follows
            .Where(f => f.TargetUserId == userId)
            .Include(f => f.SourceUser)
            .Select(f => f.SourceUser)
            .ToListAsync();
        
        Console.WriteLine(followers.Count);
        return followers;
    }

    public async Task<IReadOnlyList<AppUser>> GetUserFollowing(string userId)
    {
        var follwoing = await context.Follows
            .Where(f => f.SourceUserId == userId)
            .Select(f => f.TargetUser)
            .ToListAsync();
        Console.WriteLine(follwoing.Count);
        return follwoing;
    }

    public void DeleteFollow(UserFollow follow)
    {
        context.Follows.Remove(follow);
    }

    public void AddFollow(UserFollow follow)
    {
        context.Follows.Add(follow);
    }

    public async Task<bool> SaveChanges()
    {
        return await context.SaveChangesAsync() > 0;
    }
}