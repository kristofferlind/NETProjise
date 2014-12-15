using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Bson.Serialization.Attributes;

namespace Projise.DomainModel.Entities
{
    [BsonIgnoreExtraElements]
    public class User : IEntity
    {
        public ObjectId Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        //public List<ObjectId> Projects { get; set; }      //Projects/Teams här skulle vara rejält mycket effektivare(prestandamässigt), men försvårar generiskt repo
        //public List<ObjectId> Teams { get; set; }         //Sätter index på arrayerna istället..
        //public ObjectId ActiveProject { get; set; }
        //public ObjectId ActiveTeam { get; set; }
    }

    [BsonIgnoreExtraElements]
    public class UserWithSessionVars : IEntity
    {
        public ObjectId Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        //public List<ObjectId> Projects { get; set; }      //Projects/Teams här skulle vara rejält mycket effektivare(prestandamässigt), men försvårar generiskt repo
        //public List<ObjectId> Teams { get; set; }         //Sätter index på arrayerna istället..
        public ObjectId ActiveProject { get; set; }
        public ObjectId ActiveTeam { get; set; }
    }
}
