using Core.Entities;

namespace Core.Specification;

public class ZipSpecification : BaseSpecification<Item, IReadOnlyList<Zip>>
{
    public ZipSpecification(int itemId) : base(x => x.Id == itemId)
    {
        AddSelect(x => x.Zips);
    }
}