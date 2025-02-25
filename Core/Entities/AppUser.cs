using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Core.Entities
{
    public class AppUser : IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public List<Folder>? Folders { get; set; }
        public Profile? Profile { get; set; }

        public List<UserFollow> FollowedByUsers { get; set; } = [];
        public List<UserFollow> FollowedUsers { get; set; } = [];
    }
}
