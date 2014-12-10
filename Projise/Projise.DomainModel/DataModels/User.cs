using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Driver;

namespace Projise.DomainModel.DataModels
{
    public class User
    {
        public ObjectId Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public List<ObjectId> Projects { get; set; }
    }
}
