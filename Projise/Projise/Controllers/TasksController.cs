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
            taskRepository.OnChange += taskRepository_OnChange;
        }

        void taskRepository_OnChange(object sender, DomainModel.Events.SyncEventArgs<Task> e)
        {
            GlobalHost.ConnectionManager.GetHubContext<ProjectHub>().Clients.All.onChange(e.Operation, e.Type, e.Item);
        }

        // GET: api/Tasks
        public IEnumerable<Task> Get(string id)
        {
            //return taskRepository.All();
            var storyId = ObjectId.Parse(id);
            return taskRepository.FindByStoryId(storyId);
        }

        // GET: api/Tasks/5
        //public Task Get(string id)
        //{
        //    var taskId = ObjectId.Parse(id);
        //    return taskRepository.FindById(taskId);
        //}

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
