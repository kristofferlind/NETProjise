using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Projise.DomainModel.Entities
{
    public class Task : IEntity
    {
        public ObjectId Id { get; set; }
        public ObjectId StoryId { get; set; }
        public string Description { get; set; }
        public bool IsDone { get; set; }
    }
}
