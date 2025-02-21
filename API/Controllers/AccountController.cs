using API.DTOs;
using API.Extensions;
using Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController(SignInManager<AppUser> signInManager) : BaseApiController
    {
        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            var user = new AppUser()
            {
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                Email = registerDto.Email,
                UserName = registerDto.Email
            };

            var res = await signInManager.UserManager.CreateAsync(user, registerDto.Password);

            if(!res.Succeeded) 
            {
                foreach (var error in res.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return ValidationProblem();
            }

            return Ok();
        }

        [Authorize]
        [HttpPut("update-profile")]
        public async Task<ActionResult> UpdateProfile(UpdateUserDto updateUserDto)
        {
            var user = await signInManager.UserManager.GetUserByEmail(User);
            if (user == null) return Unauthorized("User not found");

            user.FirstName = updateUserDto.FirstName;
            user.LastName = updateUserDto.LastName;
            user.Email = updateUserDto.Email;
            user.UserName = updateUserDto.Email;

            var result = await signInManager.UserManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }
                return ValidationProblem();
            }

            await signInManager.RefreshSignInAsync(user);
            return Ok();
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<ActionResult> Logout()
        {
            await signInManager.SignOutAsync();
            return NoContent();
        }

        [HttpGet("auth-status")]
        public ActionResult GetAuthState()
        {
            return Ok(new
            {
                IsAuthenticated = User.Identity?.IsAuthenticated ?? false
            });
        }


        [HttpGet("user-info")]
        public async Task<ActionResult> GetUserInfo()
        {
            if(User.Identity?.IsAuthenticated == false) return NoContent();
            var user = await signInManager.UserManager.Users
                .Include(x => x.Profile)
                .FirstOrDefaultAsync(x => x.Email == User.Identity!.Name);

            return Ok(new 
            {
                user!.FirstName,
                user.LastName,
                user.Email,
                user.Profile
            });   
        }
    }
}
