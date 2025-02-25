using Core.Entities;

namespace Core.Interfaces;

public interface IFollowRepository
{
    Task<UserFollow?> GetUserFollow(string sourceUserId, string targetUserId);
    Task<IReadOnlyList<AppUser>> GetUserFollowers(string userId); 
    Task<IReadOnlyList<AppUser>> GetUserFollowing(string userId);
    void DeleteFollow(UserFollow follow);
    void AddFollow(UserFollow follow);
    Task<bool> SaveChanges();
}