using Microsoft.AspNet.SignalR;
using Projise.DomainModel.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Projise.App_Infrastructure
{
    public class ChatHub : Hub
    {
        static ChatHub()
        {
            //var projectRepository = new ProjectRepository();
            //projectRepository.OnChange += repository_OnChange;
        }

        //static void repository_OnChange(object sender, DomainModel.Events.SyncEventArgs<DomainModel.Entities.Project> e)
        //{
        //    throw new NotImplementedException();
        //}
        public void SendMessage()
        {
            //messageservice.send()     //skapa, lägg till validering och liknande där..
        }
    }
}
