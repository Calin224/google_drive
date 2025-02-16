using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specification
{
    public class CategorySpecification : BaseSpecification<Item, string>
    {
        public CategorySpecification()
        {
            AddSelect(x => x.Category);
            AddDistinct();
        }

        public CategorySpecification(int folderId) : base(x => x.FolderId == folderId)
        {
            AddSelect(x => x.Category);
            AddDistinct();
        }
    }
}
