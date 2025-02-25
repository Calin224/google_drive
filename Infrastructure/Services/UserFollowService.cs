using Core.Interfaces;

namespace Infrastructure.Services;

public class UserFollowService(IFollowRepository repo) : IUserFollowService
{
    public async Task<List<string>> GetMutualFollowersAsync(string userId)
    {
        var followers = await repo.GetUserFollowers(userId);
        
        var following = await repo.GetUserFollowing(userId);
        
        var mutualFollowers = followers
            .Where(f => following.Any(f2 => f2.Id == f.Id))
            .Select(f => f.Id)
            .ToList();

        return mutualFollowers;
    }
}