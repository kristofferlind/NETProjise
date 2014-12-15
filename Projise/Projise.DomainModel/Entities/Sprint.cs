using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace Projise.DomainModel.Entities
{
    public class Sprint : IEntity
    {
        public ObjectId Id { get; set; }
        public ObjectId ProjectId { get; set; }
        public string Name { get; set; }
        public string Goal { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
