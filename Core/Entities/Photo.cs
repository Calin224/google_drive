namespace Core.Entities;

public class Photo : BaseEntity
{
    public required string Url { get; set; }
    public string? PublicId { get; set; }
    public int ItemId { get; set; }
}