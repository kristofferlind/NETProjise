using MongoDB.Driver.Builders;
using Projise.DomainModel.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Projise.DomainModel.Repositories
{
    public class TaskRepository : RepositoryBase<Entities.Task>
    {
        private UserWithSessionVars user;

        public TaskRepository(UserWithSessionVars user)
        {
            this.user = user;
        }

        protected override IQueryable<Entities.Task> CollectionItems()
        {
            //return collection.FindAs<Task>(Query<Task>.Where(t => t.StoryId ==))
            throw new NotImplementedException();
        }

        public IEnumerable<Entities.Task> FindByStoryId(MongoDB.Bson.ObjectId storyId)
        {
            return collection.FindAs<Entities.Task>(Query<Entities.Task>.Where(t => t.StoryId == storyId));
        }
    }
}
