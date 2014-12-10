using Microsoft.AspNet.Identity.Owin;
using Projise.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using AspNet.Identity.MongoDB;
using System.Threading.Tasks;
using Projise.DomainModel.DataModels;
using Projise.DomainModel.Repositories;
using MongoDB.Bson;
using Microsoft.AspNet.SignalR;
using Projise.App_Infrastructure;

namespace Projise.Controllers
{
    public class ProjectsController : ApiController
    {

        private ApplicationUserManager userManager;
        private IProjectRepository projectRepository;
        private User user;

        public User AppUser {
            get
            {
                if (user == null)
                {
                    var userId = User.Identity.GetUserId();
                    var applicationUser = userManager.FindById(userId);

                    user = new User
                    {
                        Id = ObjectId.Parse(applicationUser.Id),
                        UserName = applicationUser.UserName,
                        Email = applicationUser.Email,
                        Projects = applicationUser.Projects
                    };
                }

                return user;
            }
        }

        public ProjectsController()
        {
            var context = HttpContext.Current.GetOwinContext();
            userManager = OwinContextExtensions.GetUserManager<ApplicationUserManager>(context);
            projectRepository = new MongoProjectRepository();
            projectRepository.OnChange += projectRepository_OnChange;
        }

        void projectRepository_OnChange(object sender, DomainModel.Events.SyncEventArgs<Project> e)
        {
            GlobalHost.ConnectionManager.GetHubContext<ProjectHub>().Clients.All.OnChange(e.Operation, e.Type, e.Item);
        }

        // GET: api/Project
        public async Task<IEnumerable<Project>> Get()
        {
            IEnumerable<Project> projects = null;
            if (AppUser.Projects != null)
            {
                projects = projectRepository.All(AppUser);
            }

            return projects;
        }

        // GET: api/Project/5
        public Project Get(string id)
        {
            var objectId = ObjectId.Parse(id);
            return projectRepository.Find(objectId);
        }

        // POST: api/Project
        public void Post([FromBody]Project project)
        {
            projectRepository.Add(project, AppUser);
        }

        // PUT: api/Project/5
        public void Put(ObjectId id, [FromBody]Project project)
        {
            projectRepository.Update(id, project);
        }

        // DELETE: api/Project/5
        public void Delete(ObjectId id)
        {
            var project = projectRepository.Find(id);
            projectRepository.Remove(project, AppUser);
        }
    }
}
