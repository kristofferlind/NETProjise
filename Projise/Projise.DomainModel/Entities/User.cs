using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace Projise.DomainModel.Entities
{
    [BsonIgnoreExtraElements]
    public class User : IEntity
    {
        public ObjectId Id { get; set; }
        public string UserName { get; set; }
        
        [EmailAddress]
        public string Email { get; set; }
    }

    [BsonIgnoreExtraElements]
    public class UserWithSessionVars : IEntity
    {
        public ObjectId Id { get; set; }
        public string UserName { get; set; }

        [EmailAddress]
        public string Email { get; set; }
        public ObjectId ActiveProject { get; set; }
        public ObjectId ActiveTeam { get; set; }
        public string GoogleAccessToken { get; set; }
    }
}
