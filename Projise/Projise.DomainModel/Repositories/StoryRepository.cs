using MongoDB.Driver.Builders;
using Projise.DomainModel.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Projise.DomainModel.Repositories
{
    public class StoryRepository : RepositoryBase<Story>
    {
        private UserWithSessionVars user;

        public StoryRepository(UserWithSessionVars user)
        {
            this.user = user;
        }

        public StoryRepository()
        {

        }

        protected override IQueryable<Story> CollectionItems()
        {
            return collection.FindAs<Story>(Query<Story>.Where(s => s.ProjectId == user.ActiveProject)).AsQueryable<Story>();
        }

        public IEnumerable<Story> FindByProjectId(MongoDB.Bson.ObjectId projectId)
        {
            return collection.FindAs<Story>(Query<Story>.Where(s => s.ProjectId == projectId));
        }
    }
}
