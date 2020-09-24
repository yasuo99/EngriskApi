using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Engrisk.Helper;

namespace Engrisk.Data
{
    public interface ICRUDRepo
    {
         Task<PagingList<T>> GetAll<T>(SubjectParams subjectParams = null, string includeProperties = "") where T:class;
         Task<T> GetOneWithCondition<T>(Expression<Func<T,bool>> expression = null, string includeProperties = "") where T: class;
         IEnumerable<T> GetWithProperties<T>(Dictionary<dynamic,dynamic> properties, Expression<Func<T,bool>> expression = null, string includeProperties = "") where T:class;
         void Create<T>(T subject) where T:class;
         void Update<T>(T subject) where T:class;
         void Delete<T>(dynamic id) where T:class;
         void Delete<T>(T subject) where T:class;
         bool Exists<T>(Dictionary<dynamic,dynamic> properties) where T:class;
         Task<bool> SaveAll();
    }
}