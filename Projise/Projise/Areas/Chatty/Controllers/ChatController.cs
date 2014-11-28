using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Projise.Areas.Chatty.Controllers
{
    public class ChatController : Controller
    {
        //
        // GET: /Dashboard/
        [Authorize]
        public ActionResult Index()
        {
            return View();
        }
    }
}