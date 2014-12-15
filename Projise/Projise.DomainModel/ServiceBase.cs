using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Projise.DomainModel
{
    public abstract class ServiceBase<T> : IEntityService<T>
    {
        public abstract IEnumerable<T> All();
        public abstract T FindById(MongoDB.Bson.ObjectId id);
        public abstract void Add(T collectionItem, MongoDB.Bson.ObjectId parentId);
        public abstract void Remove(T collectionItem);
        public abstract void Update(T collectionItem);
    }
}
