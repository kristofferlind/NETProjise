using MongoDB.Bson;
using Projise.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Projise.Controllers
{
    public class ProjectReportController : Controller
    {
        // GET: ProjectReport
        public ActionResult Index(string id)
        {
            var projectId = ObjectId.Parse(id);
            var model = new ProjectReportViewModel(projectId);

            return View(model);
        }
    }
}
