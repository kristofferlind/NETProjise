using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;

namespace Projise.DomainModel.Entities
{
    public class Story : IEntity
    {
        public ObjectId Id { get; set; }
        public ObjectId ProjectId { get; set; }
        public ObjectId SprintId { get; set; }
        public ObjectId UserId { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
        [Required]
        [MaxLength(250)]
        public string Description { get; set; }
        [MaxLength(250)]
        public string Tags { get; set; }
        public int Priority { get; set; }
        public int Points { get; set; }
        [MaxLength(50)]
        public string Status { get; set; }
    }
}
