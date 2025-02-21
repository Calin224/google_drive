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
        public List<Zip>? Zips { get; set; } = [];
        public Editor? Editor { get; set; }

        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
        public int DownloadCount { get; set; } = 0;   
        

        public int FolderId { get; set; }
        public Folder? Folder { get; set; }
    }
}
