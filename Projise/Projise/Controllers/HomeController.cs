using Projise.App_Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Projise.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        //public ActionResult About()
        //{
        //    ViewBag.Message = "Your application description page.";

        //    return View();
        //}

        //public ActionResult Contact()
        //{
        //    ViewBag.Message = "Your contact page.";

        //    return View();
        //}

        public ActionResult Manifest()
        {
            return new ManifestResult("4")
            {
                Cache = new List<string>()
                {
                    //Url.Action("Index", "Home"),
                    //Url.Action("Index", "Dashboard", new {area = "Dashboard"}),
                    "http://fonts.googleapis.com/css?family=Roboto:400,700",
                    "http://fonts.gstatic.com/s/roboto/v14/fg2nPs59wPnJ0blURyMU3PesZW2xOQ-xsNqO47m55DA.woff2",
                    "http://netdna.bootstrapcdn.com/font-awesome/4.1.0/fonts/fontawesome-webfont.woff?v=4.1.0"
                },
                Network = new List<string>() 
                {
                    "*"
                },
                Fallback = new Dictionary<string, string>() 
                {
                    { Url.Action("Index", "Home"), Url.Action("Index", "Dashboard", new {area = "Dashboard"}) }
                },
                Bundles = new List<string>()
                {
                    //"~/bundles/jquery",
                    //"~/bundles/jqueryval",
                    //"~/bundles/modernizr",
                    //"~/bundles/bootstrap",
                    //"~/Content/css",
                    "~/bundles/app",
                    "~/bundles/style",
                    "~/bundles/partials"    //only works in release mode
                }
            };
        }
    }
}