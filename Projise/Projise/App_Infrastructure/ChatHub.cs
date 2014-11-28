using Microsoft.AspNet.SignalR;
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
        }
        public void SendMessage()
        {
            //messageservice.send()     //skapa, lägg till validering och liknande där..
        }
    }
}
