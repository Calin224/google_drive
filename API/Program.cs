using System.Text.Json.Serialization;
using API.SignalR;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();


builder.Services.AddDbContext<ItemContext>(opt =>
{
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IPhotoService, PhotoService>();
builder.Services.AddScoped<IStorageService, StorageService>();
builder.Services.AddScoped<IFollowRepository, FollowRepository>();
builder.Services.AddScoped<IUserFollowService, UserFollowService>();
builder.Services.AddSignalR();

builder.Services.AddCors();

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    });


builder.Services.AddAuthorization();

builder.Services.ConfigureApplicationCookie(options => {
    options.Cookie.HttpOnly = true;
    options.Cookie.SecurePolicy = CookieSecurePolicy.SameAsRequest;
    options.Cookie.SameSite = SameSiteMode.None;
    options.ExpireTimeSpan = TimeSpan.FromDays(30);
    options.SlidingExpiration = true;
});


// builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
//     .AddCookie(options =>
//     {
//         options.Cookie.SameSite = SameSiteMode.None;          // Allow cross-site cookies
//         options.Cookie.SecurePolicy = CookieSecurePolicy.Always;  // Require HTTPS
//         options.Cookie.HttpOnly = true;
//     });


builder.Services.AddIdentityApiEndpoints<AppUser>()
    .AddEntityFrameworkStores<ItemContext>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseCors(policy =>
        policy.WithOrigins("http://localhost:4200", "https://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()
);

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapControllers();
app.MapGroup("api").MapIdentityApi<AppUser>();
app.MapHub<NotificationHub>("/hub/notifications");
app.MapFallbackToController("Index", "Fallback");

app.Run();
