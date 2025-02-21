using System;
using System.Text.Json.Serialization;

namespace Core.Entities;

public class Folder : BaseEntity
{
    public required string Name { get; set; }
    public List<Item>? Items { get; set; } = [];

    public string AppUserId { get; set; } = string.Empty;
    [JsonIgnore]
    public AppUser? AppUser { get; set; }
}
