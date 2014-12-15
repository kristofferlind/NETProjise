using MongoDB.Bson;
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
    public class MessageRepository : RepositoryBase<Message>
    {
        private UserWithSessionVars user;

        public MessageRepository(UserWithSessionVars user)
        {
            this.user = user;
        }
        protected override IQueryable<Message> CollectionItems()
        {
            return collection.FindAs<Message>(Query<Message>.Where(m => m.ProjectId == user.ActiveProject)).AsQueryable<Message>();
        }
    }
}
