using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using Projise.DomainModel.Entities;
using Projise.DomainModel.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Projise.DomainModel.Repositories
{
    public abstract class RepositoryBase<T> : IRepository<T> where T : IEntity
    {
        protected MongoDatabase database;
        protected MongoCollection collection;

        public RepositoryBase()
        {
            var client = new MongoClient(System.Configuration.ConfigurationManager.ConnectionStrings["Mongo"].ConnectionString);
            database = client.GetServer().GetDatabase("NETProjise-dev");
            var collectionName = typeof(T).Name.ToLower() + "s";
            collection = database.GetCollection<T>(collectionName);
        }

        public virtual event EventHandler<SyncEventArgs<T>> OnChange;
        protected virtual void Sync(SyncEventArgs<T> e)
        {
            EventHandler<SyncEventArgs<T>> handler = OnChange;
            if (handler != null)
            {
                handler(this, e);
            }
        }

        protected abstract IQueryable<T> CollectionItems();

        public IEnumerable<T> All()
        {
            return CollectionItems().AsEnumerable<T>();
        }

        public virtual T FindById(ObjectId id)
        {
            return collection.FindOneByIdAs<T>(id);
        }

        public virtual void Add(T collectionItem)
        {
            collection.Insert<T>(collectionItem);
            Sync(new SyncEventArgs<T>("save", collectionItem));
        }

        //Ta bort?
        public virtual void Remove(T collectionItem)
        {
            collection.Remove(Query<T>.Where(t => t.Id == collectionItem.Id));
            Sync(new SyncEventArgs<T>("remove", collectionItem));
        }

        public virtual void Remove(ObjectId collectionId)
        {
            var collectionItem = FindById(collectionId);
            collection.Remove(Query<T>.Where(t => t.Id == collectionItem.Id));
            Sync(new SyncEventArgs<T>("remove", collectionItem));
        }

        public virtual void Update(T collectionItem)
        {
            collection.FindAndModify(new FindAndModifyArgs
            {
                Query = Query<T>.Where(e => e.Id == collectionItem.Id),
                Update = Update<T>.Replace(collectionItem)
            });
            Sync(new SyncEventArgs<T>("save", collectionItem));
        }
    }
}
