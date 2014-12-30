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
    public class StoriesController : ApiControllerBase
    {
        private StoryRepository storyRepository;

        public StoriesController()
        {
            storyRepository = new StoryRepository(SessionUser);
            storyRepository.OnChange += SyncManager.OnChange;
        }

        // GET: api/Stories
        public IEnumerable<Story> Get()
        {
            return storyRepository.All();
        }

        // GET: api/Stories/5
        public Story Get(string id)
        {
            var storyId = ObjectId.Parse(id);
            return storyRepository.FindById(storyId);
        }

        // POST: api/Stories
        public void Post([FromBody]Story story)
        {
            story.ProjectId = SessionUser.ActiveProject;
            storyRepository.Add(story);
        }

        // PUT: api/Stories/5
        public void Put([FromBody]Story story)
        {
            storyRepository.Update(story);
        }

        // DELETE: api/Stories/5
        public void Delete(string id)
        {
            var storyId = ObjectId.Parse(id);
            storyRepository.Remove(storyId);
        }
    }
}
