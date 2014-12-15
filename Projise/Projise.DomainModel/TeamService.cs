using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;
using Projise.DomainModel.Entities;
using Projise.DomainModel.Repositories;

namespace Projise.DomainModel
{
    public class TeamService : IEntityService<Team>
    {
        private UserRepository userRepository;
        private TeamRepository teamRepository;

        public TeamService(User user)
        {
            userRepository = new UserRepository();
            teamRepository = new TeamRepository(user);
        }

        public IEnumerable<Team> All()
        {
            return teamRepository.All();
        }

        public Team FindById(ObjectId id)
        {
            return teamRepository.FindById(id);
        }

        public void Add(Team collectionItem, ObjectId parentId)
        {
            teamRepository.Add(collectionItem);
        }

        public void Remove(Team collectionItem)
        {
            teamRepository.Remove(collectionItem);
        }

        public void Update(Team collectionItem)
        {
            teamRepository.Update(collectionItem);
        }

        public void AddUser(ObjectId teamId, string userEmail)
        {
            var user = userRepository.FindByEmail(userEmail);
            teamRepository.AddUser(teamId, user);
        }

        public void RemoveUser(ObjectId teamId, ObjectId userId)
        {
            teamRepository.RemoveUser(teamId, userId);
        }
    }
}
