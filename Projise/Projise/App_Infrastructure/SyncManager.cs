using Microsoft.AspNet.SignalR;
using Projise.DomainModel.Entities;
using Projise.DomainModel.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Projise.App_Infrastructure
{
    public class SyncManager
    {
        private UserWithSessionVars user;
        public SyncManager(UserWithSessionVars user)
        {
            this.user = user;
        }

        public void OnChange(object sender, DomainModel.Events.SyncEventArgs<IEntity> e)
        {
            //No need for keeping track of the following, signalr solves it using buffering
            //Might need it for clients that are disconnected for a long time
                //Check which users are currently connected (needs a list of users that should be here?)
                //save operations for users that are not connected and send at reconnect?
            GlobalHost.ConnectionManager.GetHubContext<ProjectHub>().Clients.Group(user.ActiveProject.ToString()).onChange(e.Operation, e.Type, e.Item);
        }
    }
}