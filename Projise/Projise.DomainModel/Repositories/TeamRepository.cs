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
    public class TeamRepository : RepositoryBase<Team>
    {
        private User user;
        public TeamRepository(User user)
        {
            this.user = user;
        }

        protected override IQueryable<Team> CollectionItems()
        {
            return collection.FindAs<Team>(Query<Team>.Where(t => t.Users.Any(u => u.Id == user.Id))).AsQueryable<Team>();
        }

        public override void Update(Team team)
        {
            collection.FindAndModify(new FindAndModifyArgs
            {
                Query = Query<Team>.Where(t => t.Id == team.Id),
                Update = Update<Team>.Set(t => t.Name, team.Name)
                                        .Set(t => t.Description, team.Description)
            });
            Sync(new SyncEventArgs<IEntity>("save", team));
        }

        public override void Add(Team collectionItem)
        {
            collectionItem.Users.Clear();
            collectionItem.Users.Add(user);
            collection.Insert<Team>(collectionItem);
            Sync(new SyncEventArgs<IEntity>("save", collectionItem));
        }

        public void AddUser(ObjectId teamId, User user)
        {
            collection.FindAndModify(new FindAndModifyArgs
            {
                Query = Query<Team>.Where(t => t.Id == teamId),
                Update = Update<Team>.AddToSet(t => t.Users, user)
            });
            var team = FindById(teamId);
            Sync(new SyncEventArgs<IEntity>("save", team));
        }

        public void RemoveUser(ObjectId teamId, ObjectId userId)
        {
            collection.FindAndRemove(new FindAndRemoveArgs
            {
                Query = Query<Team>.Where(t => t.Users.All(u => u.Id == userId))
            });
            var team = FindById(teamId);
            Sync(new SyncEventArgs<IEntity>("save", team));
        }
    }
}
