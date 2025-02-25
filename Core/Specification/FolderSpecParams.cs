using System;

namespace Core.Specification;

public class FolderSpecParams
{
    private const int MaxPageSize = 50;
    public int PageIndex { get; set; } = 1;
    private int pageSize = 5;
    public int PageSize
    {
        get => pageSize;
        set => pageSize = (value > MaxPageSize) ? MaxPageSize : value;
    }

    public string? _search;
    public string Search
    {
        get => _search ?? "";
        set => _search = value.ToLower();
    }

    public string? AppUserId { get; set; }
}
