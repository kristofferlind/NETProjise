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

        public IEnumerable<Project> All(User user)
        {
            return projects.FindAs<Project>(Query<Project>.Where(p => p.Users.Any(u => u.Id == user.Id)));

        }

        public Project Find(ObjectId id)
        {
            return projects.FindOneByIdAs<Project>(id);
        }

        public void Add(Project project, User user)
        {
            project.Users.Clear();
            project.Users.Add(user);
            projects.Insert(project);

            Sync(new SyncEventArgs<Project>("save", project));
        }

        public void Remove(Project project, User user)
        {
            var query = Query<Project>.EQ(e => e.Id, project.Id);
            projects.Remove(query);
            Sync(new SyncEventArgs<Project>("remove", project));
        }

        public void Update(ObjectId id, Project project)
        {
            projects.FindAndModify(new FindAndModifyArgs{
                Query = Query<Project>.EQ(e => e.Id, id),
                Update = Update<Project>.Set(e => e.Name, project.Name)
                                        .Set(e => e.Description, project.Description),
            });

            //Känns sjukt onödigt, men projektet tilldelas ett nytt id?
            var modifiedProject = Find(id);

            Sync(new SyncEventArgs<Project>("save", modifiedProject)); //project));
        }
    }
}
