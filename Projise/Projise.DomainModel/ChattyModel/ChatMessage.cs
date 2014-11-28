using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Projise.DomainModel.ChattyModel
{
    public class ChatMessage
    {
        [BsonId]
        public string Id { get; set; }
        
        [Required]
        public string Name { get; set; }

        [Required]
        public string Message { get; set; }

        public DateTime Date { get; set; }
    }
}