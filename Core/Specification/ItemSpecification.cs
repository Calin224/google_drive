using Core.Entities;

namespace Core.Specification
{
    public class ItemSpecification : BaseSpecification<Item>
    {
        public ItemSpecification(ItemSpecParams specParams)
            : base(x =>
                (!specParams.Categories.Any() || specParams.Categories.Contains(x.Category)) &&
                (string.IsNullOrEmpty(specParams.appUserId) || x.AppUserId == specParams.appUserId))
        {
            // AddInclude(x => x.Photos);
            ApplyPaging(specParams.PageSize * (specParams.PageIndex - 1), specParams.PageSize);

            
        }

        public ItemSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.Photos);
            AddInclude(x => x.Pdfs);
            AddInclude(x => x.Pdfs);
        }
    }
}