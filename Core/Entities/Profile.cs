using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Profile : BaseEntity
    {
        public required string Url { get; set; }
        public string? PublicId { get; set; }

        public string AppUserId { get; set; }
        [JsonIgnore] public AppUser AppUser { get; set; } = null!;
    }
}
