using System.ComponentModel.DataAnnotations;
using Core.Entities;

namespace API.DTOs
{
    public class ItemDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public List<PhotoDto>? Photos { get; set; }
        public string AppUserId { get; set; }
        public AppUserDto? AppUser { get; set; }
    }
}
