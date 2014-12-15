using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace Projise.DomainModel.Entities
{
    public class Story : IEntity
    {
        public ObjectId Id { get; set; }
        public ObjectId ProjectId { get; set; }
        public ObjectId SprintId { get; set; }
        public ObjectId UserId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Tags { get; set; }
        public int Priority { get; set; }
        public int Points { get; set; }
        public string Status { get; set; }
    }
}
