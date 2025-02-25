namespace Core.Interfaces;

public interface IUserFollowService
{
    Task<List<string>> GetMutualFollowersAsync(string userId);
}