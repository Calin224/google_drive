using Core.Entities;

namespace Core.Specification
{
    public class ItemSpecification : BaseSpecification<Item>
    {
        public ItemSpecification(ItemSpecParams specParams)
            : base(x =>
                (!specParams.FolderId.HasValue || x.FolderId == specParams.FolderId) &&
                (specParams.Categories.Count == 0 || specParams.Categories.Contains(x.Category)) && 
                (string.IsNullOrEmpty(specParams.Search) || x.Name.ToLower().Contains(specParams.Search)) &&
                (
                    (x.AppUserId == specParams.UserId) || 
                    (x.IsPublic && specParams.MutualFollowerIds.Contains(x.AppUserId))
                )
            )
        {
            ApplyPaging(specParams.PageSize * (specParams.PageIndex - 1), specParams.PageSize);

            switch(specParams.Sort)
            {
                case "dateAsc":
                    AddOrderBy(x => x.DateCreated);
                    break;
                case "dateDesc":
                    AddOrderByDescending(x => x.DateCreated);
                    break;
                case "downloadCount":
                    AddOrderBy(x => x.DownloadCount);
                    break;
                default:
                    AddOrderBy(x => x.Name);
                    break;
            }
        }

        public ItemSpecification(int id, string? userId, List<string> mutualFollowerIds) : base(x => x.Id == id && (x.Folder!.AppUserId == userId) || (x.IsPublic && mutualFollowerIds.Contains(x.Folder!.AppUserId)))
        {
            AddInclude(x => x.Folder);
            AddInclude(x => x.Editor);
            AddInclude(x => x.Zips);
            AddInclude(x => x.Photos);
            AddInclude(x => x.Pdfs);
        }

        public ItemSpecification(int itemId) : base(x => x.Id == itemId)
        {
            AddInclude(x => x.Folder);
            AddInclude(x => x.Editor);
            AddInclude(x => x.Zips);
            AddInclude(x => x.Photos);
            AddInclude(x => x.Pdfs);
        }
        
        public ItemSpecification(string userId, List<string> mutualFollowedUsers) 
            : base(x => x.IsPublic && mutualFollowedUsers.Contains(x.AppUserId))
        {
            AddInclude(x => x.Folder);
            AddInclude(x => x.Editor);
            AddInclude(x => x.Zips);
            AddInclude(x => x.Photos);
            AddInclude(x => x.Pdfs);
        }
    }
}