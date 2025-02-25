namespace Core.Entities;

public class UserFollow
{
    public AppUser SourceUser { get; set; } = null!;
    public string SourceUserId { get; set; } = string.Empty;

    public AppUser TargetUser { get; set; } = null!;
    public string TargetUserId { get; set; } = string.Empty;
}