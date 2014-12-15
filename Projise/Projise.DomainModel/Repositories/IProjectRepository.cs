using MongoDB.Bson;
using MongoDB.Driver;
using Projise.DomainModel.Entities;
using Projise.DomainModel.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Projise.DomainModel.Repositories
{
    public interface IProjectRepository
    {
        event EventHandler<SyncEventArgs<Project>> OnChange;
        IEnumerable<Project> All(User user);
        Project Find(ObjectId id);
        void Add(Project project, User user);
        void Remove(Project project, User user);
        void Update(ObjectId id, Project project);
    }
}
