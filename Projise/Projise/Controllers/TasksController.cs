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
    public class TasksController : ApiControllerBase
    {
        private TaskRepository taskRepository;

        public TasksController()
        {
            taskRepository = new TaskRepository(SessionUser);
            taskRepository.OnChange += SyncManager.OnChange;
        }


        // GET: api/Tasks
        public IEnumerable<Task> Get(string id)
        {
            //return taskRepository.All();
            var storyId = ObjectId.Parse(id);
            return taskRepository.FindByStoryId(storyId);
        }

        // POST: api/Tasks
        public void Post([FromBody]Task task)
        {
            taskRepository.Add(task);
        }

        // PUT: api/Tasks/5
        public void Put([FromBody]Task task)
        {
            taskRepository.Update(task);
        }

        // DELETE: api/Tasks/5
        public void Delete(string id)
        {
            var taskId = ObjectId.Parse(id);
            taskRepository.Remove(taskId);
        }
    }
}
