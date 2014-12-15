using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Driver;

namespace Projise.DomainModel.Entities
{
    [BsonIgnoreExtraElements]
    public class Project : IEntity
    {
        public ObjectId Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        //public List<ObjectId> Users { get; set; }   //Lagra minimal user med email här?
        public List<User> Users { get; set; }
    }
}
