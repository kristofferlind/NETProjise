using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using Projise.DomainModel.DataModels;
using Projise.DomainModel.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Projise.DomainModel.Repositories
{
    public class MongoProjectRepository : IProjectRepository
    {
        private MongoDatabase database { get; set; }
        private MongoCollection projects { get; set; }
        private MongoCollection users { get; set; }

        public event EventHandler<SyncEventArgs<Project>> OnChange;

        protected virtual void Sync(SyncEventArgs<Project> e)
        {
            EventHandler<SyncEventArgs<Project>> handler = OnChange;
            if (handler != null)
            {
                handler(this, e);
            }
        }

        public MongoProjectRepository()
        {
            var client = new MongoClient(System.Configuration.ConfigurationManager.ConnectionStrings["Mongo"].ConnectionString);
            database = client.GetServer().GetDatabase("NETProjise-dev");
            projects = database.GetCollection<Project>("projects");
            users = database.GetCollection<User>("users");
        }

        public IEnumerable<Project> All(User user)  //ApplicationUser user? flytta auth till domainmodel..
        {
            var userProjects = new List<Project>();

            foreach (var projectId in user.Projects)
            {
                var project = projects.FindOneByIdAs<Project>(projectId);
                userProjects.Add(project);
            }

            return userProjects;
        }

        public Project Find(ObjectId id)
        {
            return projects.FindOneByIdAs<Project>(id);
        }

        public void Add(Project project, User user)
        {
            project.Users.Add(user.Id);
            projects.Insert(project);
            users.FindAndModify(new FindAndModifyArgs
            {
                Query = Query<User>.EQ(u => u.Id, user.Id),
                Update = Update<User>.AddToSet(u => u.Projects, project.Id)
            });

            Sync(new SyncEventArgs<Project>("create", project));
        }

        public void Remove(Project project, User user)
        {
            var query = Query<Project>.EQ(e => e.Id, project.Id);
            projects.Remove(query);
            Sync(new SyncEventArgs<Project>("delete", project));
        }

        public void Update(ObjectId id, Project project)
        {
            var query = Query<Project>.EQ(e => e.Id, id);
            var update = Update<Project>.Set(e => e, project);

            projects.FindAndModify(query, null, update);
            Sync(new SyncEventArgs<Project>("update", project));
        }
    }
}
