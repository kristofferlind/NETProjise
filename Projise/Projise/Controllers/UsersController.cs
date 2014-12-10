using Microsoft.AspNet.Identity;
using AspNet.Identity.MongoDB;
using Projise.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Principal;
using System.Web;
using System.Web.Http;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;

namespace Projise.Controllers
{
    [Authorize]
    public class UsersController : ApiController
    {
        private ApplicationUserManager userManager;

        public UsersController()
        {
            var context = HttpContext.Current.GetOwinContext();
            userManager = OwinContextExtensions.GetUserManager<ApplicationUserManager>(context);
        }

        [Route("api/users/me"), HttpGet]
        public async Task<ApplicationUser> Me()
        {
            var userId = User.Identity.GetUserId();
            var user = await userManager.FindByIdAsync(userId);
            return user;
        }
    }
}
