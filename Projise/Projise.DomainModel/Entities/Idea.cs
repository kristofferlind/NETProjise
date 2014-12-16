using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Projise.DomainModel.Entities
{
    public class Idea : IEntity
    {
        public ObjectId Id { get; set; }
        public ObjectId ProjectId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        
        [BsonIgnoreIfNull]
        public List<ObjectId> UsersUp { get; set; }

        [BsonIgnoreIfNull]
        public List<ObjectId> UsersDown { get; set; }
        public int Score
        {
            get
            {
                int up = UsersUp != null ? UsersUp.Count : 0;
                int down = UsersDown != null ? UsersDown.Count : 0;
                return up - down;
            }
        }
    }
}
