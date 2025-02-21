using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class UpdateUserDto
{
    [Required] public string FirstName { get; set; } = string.Empty;
    [Required] public string LastName { get; set; } = string.Empty;
    [Required] public string Email { get; set; } = string.Empty;
}
