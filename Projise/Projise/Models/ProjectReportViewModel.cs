using MongoDB.Bson;
using Projise.DomainModel.Entities;
using Projise.DomainModel.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Projise.Models
{
    public class ProjectReportViewModel
    {
        //private ObjectId projectId;
        private ProjectRepository projectRepository;
        private StoryRepository storyRepository;

        public Project Project;
        public IEnumerable<Story> Stories;
        //public IEnumerable<Story> Completed;
        //public IEnumerable<Story> InProgress;
        //public IEnumerable<Story> NotStarted;
        public List<string> Usernames;
        public string UsernameList;

        public ProjectReportViewModel(ObjectId projectId)
        {
            //this.projectId = projectId;
            projectRepository = new ProjectRepository();
            storyRepository = new StoryRepository();

            Project = projectRepository.FindById(projectId);
            Stories = storyRepository.FindByProjectId(projectId);
            Stories = Stories.OrderBy(s => s.Name).OrderBy(s => s.Status);

            //Completed = Stories.Where(s => s.Status == "completed");
            //InProgress = Stories.Where(s => s.Status == "in progress");
            //NotStarted = Stories.Where(s => s.Status == "not started");

            Usernames = new List<string>();
            foreach (var user in Project.Users)
            {
                Usernames.Add(user.UserName);                
            }

            UsernameList = string.Join(", ", Usernames);
        }

        public string GetClass(string status)
        {
            switch (status)
            {
                case "completed":
                    return "success";
                case "in progress":
                    return "warning";
                case "not started":
                    return "danger";
                default:
                    return "";
            }
        }
    }
}