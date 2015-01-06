using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Projise.DomainModel.Entities
{
    [BsonIgnoreExtraElements]
    public class Team : IEntity
    {
        public ObjectId Id { get; set; }
        [MaxLength(50)]
        public string Name { get; set; }
        [MaxLength(250)]
        public string Description { get; set; }
        public List<User> Users { get; set; }
    }
}
