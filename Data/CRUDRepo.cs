using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Engrisk.Helper;
using Microsoft.EntityFrameworkCore;
namespace Engrisk.Data
{
    public class CRUDRepo : ICRUDRepo
    {
        private readonly ApplicationDbContext _db;
        public CRUDRepo(ApplicationDbContext db)
        {
            _db = db;
        }
        public void Create<T>(T subject) where T : class
        {
            _db.Add(subject);
        }

        public void Delete<T>(dynamic id) where T : class
        {
            var dbSet = _db.Set<T>();
            var subject = dbSet.FindAsync(id);
            dbSet.Remove(subject);
        }
        public void Delete<T>(T subject) where T : class
        {
            _db.Remove(subject);
        }

        public void Delete<T>(IEnumerable<T> subjects) where T : class
        {
            var _dbSet = _db.Set<T>();
            foreach (var subject in subjects)
            {
                _dbSet.Remove(subject);
            }
        }

        public bool Exists<T>(Dictionary<dynamic, dynamic> properties) where T : class
        {
            var _dbSet = _db.Set<T>();
            foreach (var item in _dbSet.AsNoTracking().ToList())
            {
                if (item.CompareProperties(properties))
                {
                    return true;
                }
            }
            return false;
        }

        // public async Task<PagingList<T>> GetAll<T>(Expression<Func<T, bool>> expression, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy, SubjectParams subjectParams = null, string includeProperties = "") where T : class
        // {
        //     var dbSet = _db.Set<T>();
        //     var queryableDbSet = dbSet.Take(await dbSet.CountAsync());
        //     if(expression != null)
        //     {
        //         queryableDbSet = queryableDbSet.Where(expression);
        //     }
        //     if(includeProperties != null)
        //     {
        //         foreach(var property in includeProperties.Split(new char[] {','}, StringSplitOptions.RemoveEmptyEntries))
        //         {
        //            queryableDbSet =  queryableDbSet.Include(property);
        //         }
        //     }
        //     if(orderBy != null)
        //     {
        //         queryableDbSet =  orderBy(queryableDbSet);
        //     }

        //     return await PagingList<T>.OnCreateAsync(queryableDbSet, subjectParams.CurrentPage, subjectParams.PageSize);
        // }

        public async Task<PagingList<T>> GetAll<T>(SubjectParams subjectParams = null, Expression<Func<T, bool>> expression = null, string includeProperties = "") where T : class
        {
            var dbSet = _db.Set<T>();
            var queryableDbSet = dbSet.Take(await dbSet.CountAsync());
            if (includeProperties != null)
            {
                foreach (var property in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    queryableDbSet = queryableDbSet.Include(property);
                }
            }
            return await PagingList<T>.OnCreateAsync(queryableDbSet, subjectParams.CurrentPage, subjectParams.PageSize);
        }
        public async Task<IEnumerable<T>> GetAll<T>(Expression<Func<T, bool>> expression, string includeProperties = "") where T : class
        {
            var dbSet = _db.Set<T>();
            var queryableDbSet = dbSet.Take(await dbSet.CountAsync());
            if (includeProperties != null)
            {
                foreach (var property in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    queryableDbSet.Include(property);
                }
            }
            if (expression != null)
            {
                queryableDbSet.Where(expression);
            }
            return await queryableDbSet.ToListAsync();
        }
        public async Task<T> GetOneWithCondition<T>(Expression<Func<T, bool>> expression, string includeProperties) where T : class
        {
            var dbSet = _db.Set<T>();
            var queryableDbSet = dbSet.Take(await dbSet.CountAsync());
            if (expression != null)
            {
                queryableDbSet = queryableDbSet.Where(expression);
            }
            if (includeProperties != null)
            {
                foreach (var property in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    queryableDbSet = queryableDbSet.Include(property);
                }
            }
            return await queryableDbSet.AsNoTracking().FirstOrDefaultAsync();
        }

        public async Task<T> GetOneWithConditionTracking<T>(Expression<Func<T, bool>> expression = null, string includeProperties = "") where T : class
        {
            var dbSet = _db.Set<T>();
            var queryableDbSet = dbSet.Take(await dbSet.CountAsync());
            if (expression != null)
            {
                queryableDbSet = queryableDbSet.Where(expression);
            }
            if (includeProperties != null)
            {
                foreach (var property in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    queryableDbSet = queryableDbSet.Include(property);
                }
            }
            return await queryableDbSet.FirstOrDefaultAsync();
        }

        public async Task<T> GetOneWithManyToMany<T>(Expression<Func<T, bool>> expression = null, Func<IQueryable<T>, IQueryable<T>> eagerLoad = null) where T:class
        {
            var dbSet = _db.Set<T>();
            var queryableDbSet = dbSet.Take(dbSet.Count());
            if(expression != null){
                queryableDbSet = queryableDbSet.Where(expression);
            }
            if(eagerLoad != null){
                return await eagerLoad(queryableDbSet).FirstOrDefaultAsync();
            }
            return await queryableDbSet.FirstOrDefaultAsync();
        }

        public IEnumerable<T> GetWithProperties<T>(Dictionary<dynamic, dynamic> properties, Expression<Func<T, bool>> expression, string includeProperties = "") where T : class
        {
            var dbSet = _db.Set<T>();
            var queryableDbSet = dbSet.Take(dbSet.Count());
            if (expression != null)
            {
                queryableDbSet = queryableDbSet.Where(expression);
            }
            if (includeProperties != null)
            {
                foreach (var property in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    queryableDbSet = queryableDbSet.Include(property);
                }
            }
            foreach (var subject in queryableDbSet)
            {
                if (subject.CompareProperties(properties))
                {
                    yield return subject;
                }
            }
        }

        public async Task<bool> SaveAll()
        {
            return await _db.SaveChangesAsync() > 0;
        }

        public void Update<T>(T subject) where T : class
        {
            if (_db.Attach(subject).State == EntityState.Detached)
            {
                _db.Attach(subject);
            }
            _db.Entry(subject).State = EntityState.Modified;
        }
    }
}