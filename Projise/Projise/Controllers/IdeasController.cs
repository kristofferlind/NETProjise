using Microsoft.AspNet.SignalR;
using MongoDB.Bson;
using Projise.App_Infrastructure;
using Projise.DomainModel.Entities;
using Projise.DomainModel.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Projise.Controllers
{
    public class IdeasController : ApiControllerBase
    {
        private IdeaRepository ideaRepository;
        public IdeasController()
        {
            ideaRepository = new IdeaRepository(SessionUser);
            ideaRepository.OnChange += ideaRepository_OnChange;
        }

        void ideaRepository_OnChange(object sender, DomainModel.Events.SyncEventArgs<DomainModel.Entities.Idea> e)
        {
            GlobalHost.ConnectionManager.GetHubContext<ProjectHub>().Clients.All.onChange(e.Operation, e.Type, e.Item);
        }

        // GET: api/Ideas
        public IEnumerable<Idea> Get()
        {
            return ideaRepository.All();
        }

        // GET: api/Ideas/5
        public Idea Get(string id)
        {
            var ideaId = ObjectId.Parse(id);
            return ideaRepository.FindById(ideaId);
        }

        // POST: api/Ideas
        public void Post([FromBody]Idea idea)
        {
            idea.ProjectId = SessionUser.ActiveProject;
            ideaRepository.Add(idea);
        }

        // PUT: api/Ideas/5
        public void Put(string id, [FromBody]Idea idea)
        {
            ideaRepository.Update(idea);
        }

        // DELETE: api/Ideas/5
        public void Delete(string id)
        {
            var ideaId = ObjectId.Parse(id);
            ideaRepository.Remove(ideaId);
        }

        [HttpPut]
        [Route("api/ideas/{id}/up")]
        public void VoteUp(string id)
        {
            var ideaId = ObjectId.Parse(id);
            ideaRepository.VoteUp(ideaId, SessionUser.Id);
        }

        [HttpPut]
        [Route("api/ideas/{id}/down")]
        public void VoteDown(string id)
        {
            var ideaId = ObjectId.Parse(id);
            ideaRepository.VoteDown(ideaId, SessionUser.Id);
        }
    }
}
