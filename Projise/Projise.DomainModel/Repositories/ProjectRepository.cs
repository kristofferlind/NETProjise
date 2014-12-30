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
    public class ProjectRepository : RepositoryBase<Project>
    {
        private User user;

        public ProjectRepository(User user)
        {
            this.user = user;
        }
        protected override IQueryable<Project> CollectionItems()
        {
            return collection.FindAs<Project>(Query<Project>.Where(p => p.Users.Any(u => u.Id == user.Id))).AsQueryable<Project>();
        }

        public override void Update(Project project)
        {
            collection.FindAndModify(new FindAndModifyArgs
            {
                Query = Query<Project>.Where(p => p.Id == project.Id),
                Update = Update<Project>.Set(p => p.Name, project.Name)
                                        .Set(p => p.Description, project.Description)
            });
            Sync(new SyncEventArgs<IEntity>("save", project));
        }

        public override void Add(Project collectionItem)
        {
            collectionItem.Users.Clear();
            collectionItem.Users.Add(user);
            collection.Insert<Project>(collectionItem);
            Sync(new SyncEventArgs<IEntity>("save", collectionItem));
        }

        public void AddUser(ObjectId projectId, User user)
        {
            collection.FindAndModify(new FindAndModifyArgs
            {
                Query = Query<Project>.Where(p => p.Id == projectId),
                Update = Update<Project>.AddToSet(p => p.Users, user)
            });
            var project = FindById(projectId);
            Sync(new SyncEventArgs<IEntity>("save", project));
        }

        public void AddTeam(ObjectId projectId, Team team)
        {
            collection.FindAndModify(new FindAndModifyArgs
            {
                Query = Query<Project>.Where(p => p.Id == projectId),
                Update = Update<Project>.AddToSetEach<User>(p => p.Users, team.Users)
            });
            var project = FindById(projectId);
            Sync(new SyncEventArgs<IEntity>("save", project));
        }

        public void RemoveUser(ObjectId projectId, ObjectId userId)
        {
            collection.FindAndRemove(new FindAndRemoveArgs
            {
                Query = Query<Project>.Where(p => p.Users.All(u => u.Id == userId))
            });
            var project = FindById(projectId);
            Sync(new SyncEventArgs<IEntity>("save", project));
        }
    }
}
