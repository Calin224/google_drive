using System;
using Core.Entities;

namespace Core.Specification;

public class FolderSpecification : BaseSpecification<Folder>
{
    public FolderSpecification(FolderSpecParams specParams)
        : base(x =>
            (string.IsNullOrEmpty(specParams.AppUserId) || x.AppUserId == specParams.AppUserId) &&
            (string.IsNullOrEmpty(specParams.Search) || x.Name.ToLower().Contains(specParams.Search))
        )
    {
        AddInclude(x => x.Items);
        ApplyPaging(specParams.PageSize * (specParams.PageIndex - 1), specParams.PageSize);
    }

    public FolderSpecification(int id) : base(x => x.Id == id)
    {
        AddInclude(x => x.Items);
    }
}
