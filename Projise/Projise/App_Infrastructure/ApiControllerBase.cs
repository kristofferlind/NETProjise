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

namespace Projise.App_Infrastructure
{
    [Authorize]
    public class ApiControllerBase : ApiController
    {
        private ApplicationUserManager userManager;
        private UserWithSessionVars user;

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
                        ActiveTeam = applicationUser.ActiveTeam
                    };
                }

                return user;
            }
        }

        public ApiControllerBase()
        {
            var context = HttpContext.Current.GetOwinContext();
            userManager = OwinContextExtensions.GetUserManager<ApplicationUserManager>(context);
        }
    }
}