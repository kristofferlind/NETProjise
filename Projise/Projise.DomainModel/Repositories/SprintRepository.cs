using MongoDB.Driver.Builders;
using Projise.DomainModel.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Projise.DomainModel.Repositories
{
    public class SprintRepository : RepositoryBase<Sprint>
    {
        private UserWithSessionVars user;

        public SprintRepository(UserWithSessionVars user)
        {
            this.user = user;
        }
        protected override IQueryable<Sprint> CollectionItems()
        {
            return collection.FindAs<Sprint>(Query<Sprint>.Where(s => s.ProjectId == user.ActiveProject)).AsQueryable<Sprint>();
        }
    }
}
