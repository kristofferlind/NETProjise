using Projise.App_Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Projise.Areas.Dashboard.Controllers
{
    public class DashboardController : Controller
    {
        // GET: Dashboard/Dashboard
        [Authorize]
        public ActionResult Index()
        {
            SetCsrfCookie();
            return View();
        }

        private void SetCsrfCookie()
        {
            var cookie1 = Request.Cookies.Get(".AspNet.ApplicationCookie");
            //var cookie2 = Response.Cookies.Get(".AspNet.ApplicationCookie");
            //var cookie3 = ControllerContext.RequestContext.HttpContext.Response.Headers;
            //var cookie4 = HttpContext.GetOwinContext().Response.Cookies;
            //var cookie5 = HttpContext.GetOwinContext().Request.Cookies;
            //var cookie6 = HttpContext.GetOwinContext().Response.Headers;
            //var cookie7 = HttpContext.GetOwinContext().Request.Headers;

            var authCookie = cookie1;

            var csrfToken = new CSRFToken().GenerateCsrfTokenFromAuthToken(authCookie.Value);
            var csrfCookie = new HttpCookie("XSRF-TOKEN", csrfToken) { HttpOnly = false };
            HttpContext.Response.Cookies.Add(csrfCookie);
        }
    }
}