using API.Extensions;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProfileController(IPhotoService photoService, SignInManager<AppUser> signInManager) : BaseApiController
    {
        [HttpPost]
        public async Task<ActionResult<AppUser>> AddProfilePicture([FromForm] IFormFile file)
        {
            var user = await signInManager.UserManager.Users
                .Include(u => u.Profile)
                .FirstOrDefaultAsync(u => u.Email == User.Identity.Name);
            if (user == null)
                return BadRequest("User not found");

            if (user.Profile != null && user.Profile.PublicId != null)
            {
                var deleteResult = await photoService.DeletePhotoAsync(user.Profile.PublicId);
                if (deleteResult.Error != null)
                    return BadRequest(deleteResult.Error.Message);

                user.Profile.Url = "";
                user.Profile.PublicId = null;
            }

            var res = await photoService.AddPhotosAsync(new List<IFormFile> { file });
            var uploadRes = res.FirstOrDefault();

            if (uploadRes == null || uploadRes.Error != null)
                return BadRequest(uploadRes?.Error.Message ?? "Error uploading file");
            
            if (user.Profile == null)
            {
                user.Profile = new Profile
                {
                    AppUserId = user.Id,
                    Url = uploadRes.SecureUrl.AbsoluteUri,
                    PublicId = uploadRes.PublicId
                };
            }
            else
            {
                user.Profile.Url = uploadRes.SecureUrl.AbsoluteUri;
                user.Profile.PublicId = uploadRes.PublicId;
            }

            var updateRes = await signInManager.UserManager.UpdateAsync(user);
            if (!updateRes.Succeeded)
            {
                foreach (var error in updateRes.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return ValidationProblem();
            }

            await signInManager.RefreshSignInAsync(user);

            return Ok(user);
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteProfilePicture()
        {
            var user = await signInManager.UserManager.Users
                .Include(u => u.Profile)
                .FirstOrDefaultAsync(u => u.Email == User.Identity.Name);
            if (user == null)
                return BadRequest("User not found");

            if (user.Profile == null)
                return NotFound("Profile not found");

            var deleteResult = await photoService.DeletePhotoAsync(user.Profile.PublicId);
            if (deleteResult.Error != null)
                return BadRequest(deleteResult.Error.Message);
            
            user.Profile.Url = "";
            user.Profile.PublicId = null;

            var updateRes = await signInManager.UserManager.UpdateAsync(user);
            if (!updateRes.Succeeded)
            {
                foreach (var error in updateRes.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return ValidationProblem();
            }

            await signInManager.RefreshSignInAsync(user);

            return Ok();
        }
    }
}