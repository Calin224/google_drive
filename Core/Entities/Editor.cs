using Newtonsoft.Json;

namespace Core.Entities;

public class Editor : BaseEntity
{
    public required string Text { get; set; }
    public int ItemId { get; set; }
    [JsonIgnore] public Item? Item { get; set; }
}