using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Security.AccessControl;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specification
{
    public class ItemSpecParams
    {
        private const int MaxPageSize = 50;

        private int _pageSize = 6;
        public int PageIndex { get; set; } = 1;

        public int PageSize
        {
            get => _pageSize;
            set
            {
                _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
            }
        }

        private List<string> _categories = [];
        public List<string> Categories
        {
            get => _categories;
            set => _categories = value.SelectMany(x => x.Split(',', StringSplitOptions.RemoveEmptyEntries)).ToList();
        }
    }
}
