using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using Projise.DomainModel.Entities;
using Projise.DomainModel.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Projise.DomainModel.Repositories
{
    public class UserRepository
    {
        protected MongoDatabase database;
        protected MongoCollection collection;

        public UserRepository()
        {
            var client = new MongoClient(System.Configuration.ConfigurationManager.ConnectionStrings["Mongo"].ConnectionString);
            database = client.GetServer().GetDatabase("NETProjise");
            collection = database.GetCollection<User>("users");
        }

        public event EventHandler<SyncEventArgs<UserWithSessionVars>> OnChange;
        protected virtual void Sync(SyncEventArgs<UserWithSessionVars> e)
        {
            EventHandler<SyncEventArgs<UserWithSessionVars>> handler = OnChange;
            if (handler != null)
            {
                handler(this, e);
            }
        }

        public void Update(UserWithSessionVars user)
        {
            collection.FindAndModify(new FindAndModifyArgs
            {
                Query = Query<UserWithSessionVars>.EQ(e => e.Id, user.Id),
                Update = Update<UserWithSessionVars>.Set(e => e.ActiveProject, user.ActiveProject)
                                                    .Set(e => e.ActiveTeam, user.ActiveTeam)
                                                    .Set(e => e.GoogleAccessToken, user.GoogleAccessToken)
            });
            Sync(new SyncEventArgs<UserWithSessionVars>("save", user));
        }

        public void SetGoogleToken(UserWithSessionVars user)
        {
            collection.FindAndModify(new FindAndModifyArgs
            {
                Query = Query<UserWithSessionVars>.EQ(e => e.Id, user.Id),
                Update = Update<UserWithSessionVars>.Set(e => e.GoogleAccessToken, user.GoogleAccessToken)
            });
        }

        public User FindByEmail(string email)   //internal?
        {
            return collection.FindAs<User>(Query<User>.Where(u => u.Email == email)).SingleOrDefault();
        }
    }
}
