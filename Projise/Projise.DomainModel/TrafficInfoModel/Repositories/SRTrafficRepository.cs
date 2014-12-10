using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Projise.DomainModel.TrafficInfoModel.Repositories
{
    class SRTrafficRepository
    {
        MongoCollection _messages;
        public SRTrafficRepository()
        {
            string connection = "mongodb://localhost:27017";
            var client = new MongoClient(connection);
            var server = client.GetServer();
            var database = server.GetDatabase("traffic", WriteConcern.Acknowledged);
            _messages = database.GetCollection<TrafficInfo>("messages");
        }

        public IEnumerable<TrafficInfo> All()
        {
            return _messages.FindAllAs<TrafficInfo>().OrderByDescending(t => t.CreatedDate).Take(100);
        }

        public void Clear()
        {
            _messages.RemoveAll();
        }

        public void AddBatch(IEnumerable<TrafficInfo> items)
        {
            _messages.InsertBatch(items);
        }
    }
}
