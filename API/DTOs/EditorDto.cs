using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class EditorDto
{
    [Required] public string Text { get; set; } = string.Empty;
}