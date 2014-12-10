using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Projise.DomainModel.TrafficInfoModel;
using Projise.DomainModel.TrafficInfoModel.Webservices;

namespace Projise.Areas.Traffic.Controllers
{
    public class TrafficController : Controller
    {
        // GET: Traffic/Traffic
        public ActionResult Index()
        {
            //var trafficService = new SRTrafficWebservice();
            //var model = trafficService.GetTrafficData();
            //return View(model);
            return View();
        }
    }
}