using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;

namespace Projise.DomainModel.Entities
{
    public class Document : IEntity
    {
        public ObjectId Id { get; set; }
        public ObjectId ProjectId { get; set; }
        [MaxLength(50)]
        public string Name { get; set; }
        [MaxLength(250)]
        public string Description { get; set; }
        public string Data { get; set; }        //Borde inte följa med förrän vid get av enskilt dokument 
                                                //(borde dessutom utnyttja ot och data kanske därmed vara en egen kollection)
    }

    //public class DocumentWithData : IEntity
    //{
    //    public ObjectId Id { get; set; }
    //    public ObjectId ProjectId { get; set; }
    //    public string Name { get; set; }
    //    public string Description { get; set; }
    //    public string Data { get; set; }
    //}
}
