namespace API.RequestHelpers
{
    public class Pagination<T>(int pageIndex, int pageNumber, int count, IReadOnlyList<T> data)
    {
        public int PageIndex { get; set; } = pageIndex;
        public int PageNumber { get; set; } = pageNumber;
        public int Count { get; set; } = count;
        public IReadOnlyList<T> Data { get; set; } = data;
    }
}
