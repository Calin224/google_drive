using System.ComponentModel.DataAnnotations;
using Core.Entities;

namespace API.DTOs
{
    public class ItemDto
    {
        [Required] public string Name { get; set; } = string.Empty;

        [Required] public string Description { get; set; } = string.Empty;
        [Required] public string Category { get; set; } = string.Empty;
    }
}
