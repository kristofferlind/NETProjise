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
    public class Repository<T> : IRepository<T> where T : IEntity
    {
        private MongoDatabase database;
        private MongoCollection collection;
        private string parentIdSelector;
        private string parentsSelector;

        public Repository(string parentIdName = null, string parentsName = null)
        {
            var client = new MongoClient(System.Configuration.ConfigurationManager.ConnectionStrings["Mongo"].ConnectionString);
            database = client.GetServer().GetDatabase("NETProjise-dev");
            var collectionName = typeof(T).ToString().ToLower() + "s";
            collection = database.GetCollection<T>(collectionName);
            if (parentIdName != null)
            {
                parentIdSelector = string.Join(".", collectionName, parentIdName);
            }
            else
            {
                parentIdSelector = null;
            }
            if (parentsName != null)
            {
                parentsSelector = string.Join(".", collectionName, parentsName);
            }
            else
            {
                parentsSelector = null;
            }
        }


        public event EventHandler<SyncEventArgs<T>> OnChange;
        protected virtual void Sync(SyncEventArgs<T> e)
        {
            EventHandler<SyncEventArgs<T>> handler = OnChange;
            if (handler != null)
            {
                handler(this, e);
            }
        }

        //hämtning via "parentId" ex sprints via projectId, hämtning via finns i array ex project.users
        //omdöpning till parentId skulle fungera för 1:N, variabel behövs för N:M
        public IEnumerable<T> All()    //extra variabler här känns inte ok, fasad/servicelager kanske gör det ok?
        {                                                                       //repo skulle kunna ha metod för att reda ut vad som är parent/variabel baserat på collectionName?
            throw new NotImplementedException();
            //if (parentIdSelector != null)
            //{
            //    return collection.FindAs<T>(Query.EQ(parentIdSelector, parentIdValue));
            //}

            //IEnumerable<T> items;

            //if (nToM)
            //{
            //    //Hur få fram identifier fält?
            //    items = collection.FindAs<T>(Query<T>.In(e => e.identifier, id));
            //}
            //else
            //{
            //    //Jag vill helst inte ha ParentId på IEntity..
            //    items = collection.FindAs<T>(Query<T>.EQ(e => e.ParentId, id));
            //}
            //return items;
        }

        public T FindById(ObjectId id)
        {
            return collection.FindOneByIdAs<T>(id);
        }

        //Samma problem som all, parentId eller vilken array som ska utökas behövs
        public void Add(T collectionItem)
        {
            //skulle fungera för 1:n, hur få ut parentId isf? vill gärna inte döpa till parentId
            //bsonrepresentation så att det blir rätt i databasen iaf?
            //jsonrepresentation? skulle bli rätt i klienten också..
            //collectionItem.ParentID = parentId;
            collection.Insert<T>(collectionItem);
            Sync(new SyncEventArgs<T>("save", collectionItem));
        }

        //Som ovan
        public void Remove(T collectionItem)
        {
            var query = Query<T>.EQ(e => e.Id, collectionItem.Id);
            collection.Remove(query);
            Sync(new SyncEventArgs<T>("remove", collectionItem));
        }

        public void Update(T collectionItem)
        {
            collection.FindAndModify(new FindAndModifyArgs
            {
                Query = Query<T>.EQ(e => e.Id, collectionItem.Id),
                Update = Update<T>.Set(e => e, collectionItem)
            });
            Sync(new SyncEventArgs<T>("save", collectionItem));
        }
    }
}
