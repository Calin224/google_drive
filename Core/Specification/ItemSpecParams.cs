namespace Core.Specification
{
    public class ItemSpecParams
    {
        private const int MaxPageSize = 50;

        private int _pageSize = 5;
        public int PageIndex { get; set; } = 1;

        public int PageSize
        {
            get => _pageSize;
            set
            {
                _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
            }
        }

        public string? Sort { get; set; }

        private List<string> _categories = [];
        public List<string> Categories
        {
            get => _categories;
            set => _categories = value.SelectMany(x => x.Split(',', StringSplitOptions.RemoveEmptyEntries)).ToList();
        }

        public int? FolderId { get; set; }

        private string? _search;
        public string Search
        {
            get => _search ?? "";
            set => _search = value.ToLower();
        }
    }
}
