using System.Text.Json.Serialization;

namespace Core.Entities;

public class Zip : BaseEntity
{
    public string FileName { get; set; } = string.Empty;
    public long FileSize { get; set; }
    public string BlobUrl { get; set; } = string.Empty;
    public DateTime UploadedAt { get; set; } = DateTime.UtcNow;
    public string ContentType { get; set; } = "application/zip";
    public int ItemId { get; set; }
    [JsonIgnore]
    public Item? Item { get; set; }
}