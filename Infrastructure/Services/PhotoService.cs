using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace Infrastructure.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly Cloudinary _cloudinary;

        public PhotoService(IConfiguration config)
        {
            var acc = new Account(config["CloudinarySettings:CloudName"], config["CloudinarySettings:ApiKey"],
                config["CloudinarySettings:ApiSecret"]);
            _cloudinary = new Cloudinary(acc);
        }

        public async Task<List<ImageUploadResult>> AddPhotosAsync(List<IFormFile> files)
        {
            var uploadResults = new List<ImageUploadResult>();

            foreach (var file in files)
            {
                var uploadResult = new ImageUploadResult();

                if (file.Length > 0)
                {
                    using var stream = file.OpenReadStream();
                    var uploadParams = new ImageUploadParams
                    {
                        File = new FileDescription(file.FileName, stream),
                        Transformation = new Transformation().Gravity("face"),
                        Folder = "da-net9"
                    };

                    uploadResult = await _cloudinary.UploadAsync(uploadParams);
                }

                uploadResults.Add(uploadResult);
            }

            return uploadResults;
        }
        
        public async Task<DeletionResult> DeletePhotoAsync(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);
            return await _cloudinary.DestroyAsync(deleteParams);
        }
    }
}
