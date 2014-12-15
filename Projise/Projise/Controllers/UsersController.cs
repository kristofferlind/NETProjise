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
using Projise.DomainModel.Entities;
using MongoDB.Bson;
using Projise.App_Infrastructure;
using Projise.DomainModel.Repositories;
using Microsoft.AspNet.SignalR;

namespace Projise.Controllers
{
    //[System.Web.Http.Authorize]
    public class UsersController : ApiControllerBase
    {
        private UserRepository userRepository;
        public UsersController()
        {
            userRepository = new UserRepository();
            userRepository.OnChange += userRepository_OnChange;
        }

        void userRepository_OnChange(object sender, DomainModel.Events.SyncEventArgs<UserWithSessionVars> e)
        {
            GlobalHost.ConnectionManager.GetHubContext<ProjectHub>().Clients.All.onChange(e.Operation, "user", e.Item);     //type will be wrong here, setting manually to "user"
        }

        [Route("api/users/me"), HttpGet]
        public UserWithSessionVars Me()
        {
            return SessionUser;
        }

        [HttpPut]
        [Route("api/users/me/activate/team/{id}")]
        public void ActivateTeam(string id)
        {
            var teamId = ObjectId.Parse(id);
            SessionUser.ActiveTeam = teamId;
            userRepository.Update(SessionUser);
        }

        [HttpPut]
        [Route("api/users/me/activate/project/{id}")]
        public void ActivateProject(string id)
        {
            var projectId = ObjectId.Parse(id);
            SessionUser.ActiveProject = projectId;
            userRepository.Update(SessionUser);
        }
    }
}
