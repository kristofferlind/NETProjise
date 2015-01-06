using MongoDB.Bson;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Projise.DomainModel.Entities
{
    public class Message : IEntity
    {
        public ObjectId Id { get; set; }
        public ObjectId ProjectId { get; set; }
        [MaxLength(50)]
        public string Channel { get; set; }
        public User User { get; set; }
        public DateTime Date { get; set; }

        [JsonProperty(PropertyName = "message")]
        [MaxLength(500)]
        public string Text { get; set; }
    }
}
