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
    public class DocumentRepository : RepositoryBase<Document>
    {
        private UserWithSessionVars user;

        public DocumentRepository(UserWithSessionVars user)
        {
            this.user = user;
        }
        protected override IQueryable<Document> CollectionItems()
        {
            return collection.FindAs<Document>(Query<Document>.Where(d => d.ProjectId == user.ActiveProject)).AsQueryable<Document>();
        }

        //public override DocumentWithData FindById(ObjectId id)
        //{
        //    return collection.FindOneByIdAs<DocumentWithData>(id);
        //}

        //public void Update(DocumentWithData collectionItem)
        //{
        //    collection.FindAndModify(new FindAndModifyArgs
        //    {
        //        Query = Query<DocumentWithData>.Where(e => e.Id == collectionItem.Id),
        //        Update = Update<DocumentWithData>.Replace(collectionItem)
        //    });
        //    Sync(new SyncEventArgs<DocumentWithData>("save", collectionItem));
        //}
    }
}
