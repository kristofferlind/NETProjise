using Microsoft.AspNet.SignalR;
using MongoDB.Bson;
using Projise.App_Infrastructure;
using Projise.DomainModel.Entities;
using Projise.DomainModel.Events;
using Projise.DomainModel.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Projise.Controllers
{
    public class SprintsController : ApiControllerBase
    {
        private SprintRepository sprintRepository;
        public SprintsController()
        {
            sprintRepository = new SprintRepository(SessionUser);
            sprintRepository.OnChange += sprintRepository_OnChange;
        }

        void sprintRepository_OnChange(object sender, SyncEventArgs<Sprint> e)
        {
            GlobalHost.ConnectionManager.GetHubContext<ProjectHub>().Clients.All.onChange(e.Operation, e.Type, e.Item);
        }
        // GET: api/Sprint
        public IEnumerable<Sprint> Get()
        {
            return sprintRepository.All();
        }

        //// GET: api/Sprint/5
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST: api/Sprint
        public void Post([FromBody]Sprint sprint)
        {
            sprint.ProjectId = SessionUser.ActiveProject;
            sprintRepository.Add(sprint);
        }

        // PUT: api/Sprint/5
        public void Put([FromBody]Sprint sprint)
        {
            sprint.ProjectId = SessionUser.ActiveProject;
            sprintRepository.Update(sprint);
        }

        // DELETE: api/Sprint/5
        public void Delete(string id)
        {
            var sprintId = ObjectId.Parse(id);
            sprintRepository.Remove(sprintId);
        }
    }
}
