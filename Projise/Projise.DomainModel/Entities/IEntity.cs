using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Projise.DomainModel.Entities
{
    public interface IEntity
    {
        [BsonId]
        [JsonProperty(PropertyName = "_id")]
        ObjectId Id { get; set; }
    }
}
