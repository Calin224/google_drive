using System.Net;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;

namespace Core.Interfaces
{
    public interface IPhotoService
    {
        Task<List<ImageUploadResult>> AddPhotosAsync(List<IFormFile> files);
        Task<DeletionResult> DeletePhotoAsync(string publicId);
    }
}
