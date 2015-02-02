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
            SetCsrfCookie();
            return View();
        }

        private void SetCsrfCookie()
        {
            var authCookie = Request.Cookies.Get(".AspNet.ApplicationCookie");
            if (authCookie != null)
            {
                var csrfToken = new CSRFToken().GenerateCsrfTokenFromAuthToken(authCookie.Value);
                var csrfCookie = new HttpCookie("XSRF-TOKEN", csrfToken) { HttpOnly = false };
                HttpContext.Response.Cookies.Add(csrfCookie);
            }
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
                    //Fallback needed, but all api requests fail when this is present..
                    //{ Url.Action("Index", "Home"), Url.Action("Index", "Dashboard", new {area = "Dashboard"}) }
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