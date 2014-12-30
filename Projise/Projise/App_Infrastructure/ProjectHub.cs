using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Projise.DomainModel.Entities;
using Projise.Models;
using Microsoft.AspNet.Identity.Owin;
using AspNet.Identity.MongoDB;
using Microsoft.AspNet.Identity;
using MongoDB.Bson;

namespace Projise.App_Infrastructure
{
    [Authorize]
    public class ProjectHub : Hub
    {
        private UserWithSessionVars user;

        private UserWithSessionVars SessionUser
        {
            get
            {
                if (user == null)
                {

                    var context = HttpContext.Current.GetOwinContext();
                    var userManager = OwinContextExtensions.GetUserManager<ApplicationUserManager>(context);

                    var userId = Context.User.Identity.GetUserId(); // User.Identity.GetUserId();
                    var applicationUser = userManager.FindById(userId);

                    user = new UserWithSessionVars
                    {
                        Id = ObjectId.Parse(applicationUser.Id),
                        UserName = applicationUser.UserName,
                        Email = applicationUser.Email,
                        ActiveProject = applicationUser.ActiveProject,
                        ActiveTeam = applicationUser.ActiveTeam,
                        GoogleAccessToken = applicationUser.GoogleAccessToken
                    };
                }

                return user;
            }
        }

        public override System.Threading.Tasks.Task OnConnected()
        {
            Groups.Add(Context.ConnectionId, SessionUser.ActiveProject.ToString());
            return base.OnConnected();
        }
    }
}