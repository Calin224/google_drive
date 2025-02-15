using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface ISpecification<T>
    {
        Expression<Func<T, bool>>? Criteria { get; }
        List<Expression<Func<T, object>>> Includes { get; }
        List<string> IncludeStrings { get; }
        public int Take { get; }
        public int Skip { get; }
        public bool IsPagingEnabled { get; }
        public bool IsDistinct { get; }
        IQueryable<T> ApplyCriteria(IQueryable<T> query);
        // IQueryable<T> ApplyUserCriteria(IQueryable<T> query, string userId);
    }

    public interface ISpecification<T, TResult> : ISpecification<T>
    {
        Expression<Func<T, TResult>> Select { get; }
    }
}
