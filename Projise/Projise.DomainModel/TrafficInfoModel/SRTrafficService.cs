using Projise.DomainModel.TrafficInfoModel.Repositories;
using Projise.DomainModel.TrafficInfoModel.Webservices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Projise.DomainModel.TrafficInfoModel
{
    public class SRTrafficService
    {
        SRTrafficWebservice _service;
        SRTrafficRepository _repository;
        public SRTrafficService()
        {
            _service = new SRTrafficWebservice();
            _repository = new SRTrafficRepository();
        }
        public IEnumerable<TrafficInfo> All()
        {
            var all = _repository.All();
            var first = all.FirstOrDefault();
            if ((first == null) || (DateTime.Now - all.First().Id.CreationTime).Minutes > 1)
            //if ((first == null) || (DateTime.Now - all.First().CreatedDate).Minutes > 30)  //Vore bättre att själv lagra när senaste kontroll gjorts, men inte särskilt troligt att det inte hänt något senaste 30min
            {
                all = _service.GetTrafficData();
                _repository.Clear();
                _repository.AddBatch(all);
            }
            return all;
        }
    }
}
