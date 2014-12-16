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
    public class IdeaRepository : RepositoryBase<Idea>
    {
        private UserWithSessionVars user;
        public IdeaRepository(UserWithSessionVars user)
        {
            this.user = user;
        }
        protected override IQueryable<Idea> CollectionItems()
        {
            return collection.FindAs<Idea>(Query<Idea>.Where(i => i.ProjectId == user.ActiveProject)).AsQueryable<Idea>();
        }

        public void VoteUp(ObjectId id, ObjectId userId)
        {
            collection.FindAndModify(new FindAndModifyArgs
            {
                Query = Query<Idea>.Where(i => i.Id == id),
                Update = Update<Idea>.AddToSet<ObjectId>(i => i.UsersUp, userId)
                                     .Pull(i => i.UsersDown, userId)
            });
            var idea = FindById(id);
            Sync(new SyncEventArgs<Idea>("save", idea));
        }

        public void VoteDown(ObjectId id, ObjectId userId)
        {
            collection.FindAndModify(new FindAndModifyArgs
            {
                Query = Query<Idea>.Where(i => i.Id == id),
                Update = Update<Idea>.AddToSet<ObjectId>(i => i.UsersDown, userId)
                                     .Pull(i => i.UsersUp, userId)
            });
            var idea = FindById(id);
            Sync(new SyncEventArgs<Idea>("save", idea));
        }
    }
}
