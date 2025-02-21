using Core.Entities;

namespace Core.Specification
{
    public class ItemSpecification : BaseSpecification<Item>
    {
        public ItemSpecification(ItemSpecParams specParams)
            : base(x =>
                (!specParams.FolderId.HasValue || x.FolderId == specParams.FolderId) &&
                (specParams.Categories.Count == 0 || specParams.Categories.Contains(x.Category)) && 
                (string.IsNullOrEmpty(specParams.Search) || x.Name.ToLower().Contains(specParams.Search))
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

        public ItemSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.Editor);
            AddInclude(x => x.Zips);
            AddInclude(x => x.Photos);
            AddInclude(x => x.Pdfs);
            AddInclude(x => x.Pdfs);
        }
    }
}