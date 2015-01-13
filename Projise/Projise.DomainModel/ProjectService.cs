using MongoDB.Bson;
using Projise.DomainModel.Entities;
using Projise.DomainModel.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Projise.DomainModel
{
    public class ProjectService : IEntityService<Project>
    {
        private ProjectRepository projectRepository;
        private UserRepository userRepository;
        private TeamRepository teamRepository;

        public ProjectService(User user, ProjectRepository projectRepository)
        {
            this.projectRepository = projectRepository;
            userRepository = new UserRepository();
            teamRepository = new TeamRepository(user);
        }

        public IEnumerable<Project> All()
        {
            return projectRepository.All();
        }

        public Project FindById(ObjectId id)
        {
            return projectRepository.FindById(id);
        }

        public void Add(Project collectionItem, ObjectId parentId)
        {
            projectRepository.Add(collectionItem);
        }

        public void Remove(Project collectionItem)
        {
            projectRepository.Remove(collectionItem);
        }

        public void Update(Project collectionItem)
        {
            projectRepository.Update(collectionItem);
        }

        public void AddUser(ObjectId projectId, string email)
        {
            var user = userRepository.FindByEmail(email);

            if (user == null)
            {
                throw new ArgumentException("No such user found.");
            }
            //var project = projectRepository.FindById(projectId);
            //project.Users.Add(user);
            //project.Users = project.Users.Distinct().ToList();
            //projectRepository.Update(project);

            projectRepository.AddUser(projectId, user);     //Distinct, men specificerad..
        }

        public void AddTeam(ObjectId projectId, ObjectId teamId)
        {
            var team = teamRepository.FindById(teamId);
            //var project = projectRepository.FindById(projectId);
            //project.Users.AddRange(team.Users);
            //project.Users = project.Users.Distinct().ToList();
            //projectRepository.Update(project);

            projectRepository.AddTeam(projectId, team);
        }

        public void RemoveUser(ObjectId projectId, ObjectId userId)
        {
            //var project = projectRepository.FindById(projectId);
            //project.Users.RemoveAll(u => u.Id == userId);
            //projectRepository.Update(project);
            projectRepository.RemoveUser(projectId, userId);
        }
    }
}
