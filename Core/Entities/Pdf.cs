using System.Text.Json.Serialization;

namespace Core.Entities;

public class Pdf : BaseEntity
{
    public required string Name { get; set; }
    // public required byte[] Data { get; set; }
    public required string Url { get; set; }
    public string ContentType { get; set; } = "application/pdf";

    public int ItemId { get; set; }

    [JsonIgnore]
    public Item? Item { get; set; }
}