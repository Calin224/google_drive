 using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specification
{
    public class ItemSpecification : BaseSpecification<Item>
    {
        public ItemSpecification(ItemSpecParams specParams) : base(null)
        {
            AddInclude(x => x.Photos);
            ApplyPaging(specParams.PageSize * (specParams.PageIndex - 1), specParams.PageSize);
        }

        public ItemSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.Photos);
        }
    }
}
