using Projise.DomainModel.Entities;
using Projise.DomainModel.Repositories;
using Projise.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using AspNet.Identity.MongoDB;
using MongoDB.Bson;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Microsoft.AspNet.SignalR;

namespace Projise.App_Infrastructure
{
    [System.Web.Http.Authorize]
    public class ApiControllerBase : ApiController
    {
        private ApplicationUserManager userManager;
        private UserWithSessionVars user;
        private IOwinContext context;
        protected SyncManager SyncManager;

        public User AppUser {
            get
            {
                var applicationUser = SessionUser;

                return new User
                {
                    Id = applicationUser.Id,
                    UserName = applicationUser.UserName,
                    Email = applicationUser.Email
                };
                
            }
        }

        public UserWithSessionVars SessionUser {
            get
            {
                if (user == null)
                {
                    var userId = User.Identity.GetUserId();
                    var applicationUser = userManager.FindById(userId);

                    user = new UserWithSessionVars
                    {
                        Id = ObjectId.Parse(applicationUser.Id),
                        UserName = applicationUser.UserName,
                        Email = applicationUser.Email,
                        ActiveProject = applicationUser.ActiveProject,
                        ActiveTeam = applicationUser.ActiveTeam,
                        //AccessToken = context.Request.Cookies.Where(c => c.Key == ".AspNet.ApplicationCookie").SingleOrDefault().Value,
                        //GoogleProviderKey = applicationUser.Logins.Where(l => l.LoginProvider == "Google").SingleOrDefault().ProviderKey
                        //GoogleAccessToken = applicationUser.Claims.FirstOrDefault(c => c.Type == "urn:tokens:googleplus:accesstoken").Value
                        GoogleAccessToken = applicationUser.GoogleAccessToken
                    };
                }

                return user;
            }
        }

        public ApiControllerBase()
        {
            context = HttpContext.Current.GetOwinContext();
            userManager = OwinContextExtensions.GetUserManager<ApplicationUserManager>(context);
            SyncManager = new SyncManager(SessionUser);
        }

        protected virtual void repository_OnChange(object sender, DomainModel.Events.SyncEventArgs<IEntity> e)
        {
            SyncManager.OnChange(sender, e);
        }
    }
}