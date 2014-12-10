using Projise.DomainModel.TrafficInfoModel;
using Projise.DomainModel.TrafficInfoModel.Webservices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Projise.Areas.Traffic.Controllers
{
    public class TrafficInfoController : ApiController
    {
        public IEnumerable<TrafficInfo> Get()
        {
            //var trafficService = new SRTrafficWebservice();
            //return trafficService.GetTrafficData();
            var service = new SRTrafficService();
            return service.All();
        }
    }
}
