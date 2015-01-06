using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;

namespace Projise.DomainModel.Entities
{
    public class Sprint : IEntity
    {
        public ObjectId Id { get; set; }
        public ObjectId ProjectId { get; set; }
        [MaxLength(50)]
        public string Name { get; set; }
        [MaxLength(250)]
        public string Goal { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
