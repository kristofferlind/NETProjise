using MongoDB.Bson;
using Projise.DomainModel.Entities;
using Projise.DomainModel.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Projise.DomainModel.Repositories
{
    public interface IRepository<T> where T : IEntity
    {
        event EventHandler<SyncEventArgs<IEntity>> OnChange;
        IEnumerable<T> All();
        T FindById(ObjectId id);
        void Add(T collectionItem);
        void Remove(T collectionItem);
        void Update(T collectionItem);
    }
}
