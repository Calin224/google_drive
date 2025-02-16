using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Core.Entities
{
    public class Item : BaseEntity
    {
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required string Category { get; set; }
        public List<Photo>? Photos { get; set; } = [];
        public List<Pdf>? Pdfs { get; set; } = [];

        public string AppUserId { get; set; } = string.Empty;
        [JsonIgnore]
        public AppUser? AppUser { get; set; }
    }
}
