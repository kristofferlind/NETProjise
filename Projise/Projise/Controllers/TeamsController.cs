using Microsoft.AspNet.Identity.Owin;
using Microsoft.AspNet.SignalR;
using MongoDB.Bson;
using Projise.App_Infrastructure;
using Projise.DomainModel.Entities;
using Projise.DomainModel.Repositories;
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
using Projise.DomainModel;

namespace Projise.Controllers
{
    public class TeamsController : ApiControllerBase
    {
        private TeamRepository teamRepository;
        private TeamService teamService;

        public TeamsController()
        {
            teamRepository = new TeamRepository(AppUser);
            teamService = new TeamService(AppUser);
            teamRepository.OnChange += teamRepository_OnChange;
        }

        private void teamRepository_OnChange(object sender, DomainModel.Events.SyncEventArgs<Team> e)
        {
            GlobalHost.ConnectionManager.GetHubContext<ProjectHub>().Clients.All.onChange(e.Operation, e.Type, e.Item);
        }

        // GET: api/Team
        public IEnumerable<Team> Get()
        {
            return teamRepository.All();
        }

        // GET: api/Team/5
        public Team Get(string id)
        {
            return teamRepository.FindById(ObjectId.Parse(id));
        }

        // POST: api/Team
        public void Post([FromBody]Team team)
        {
            teamRepository.Add(team);
        }

        // PUT: api/Team/5
        public void Put(string id, [FromBody]Team team)
        {
            teamRepository.Update(team);
        }

        // DELETE: api/Team/5
        public void Delete(string id)
        {
            var team = teamRepository.FindById(ObjectId.Parse(id));
            teamRepository.Remove(team);
        }

        [HttpPut]
        [Route("api/teams/users/")]
        public void AddUser([FromBody]User user)
        {
            teamService.AddUser(SessionUser.ActiveTeam, user.Email);
        }

        [HttpDelete]
        [Route("api/teams/users/{id}")]
        public void RemoveUser(string pId, string uId)
        {
            var userId = ObjectId.Parse(uId);
            teamService.RemoveUser(SessionUser.ActiveTeam, userId);
        }
    }
}
