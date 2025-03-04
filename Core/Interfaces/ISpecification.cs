﻿using System.Linq.Expressions;

namespace Core.Interfaces
{
    public interface ISpecification<T>
    {
        Expression<Func<T, bool>>? Criteria { get; }
        Expression<Func<T, object>>? OrderBy { get; }
        Expression<Func<T, object>>? OrderByDescending { get; }
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
