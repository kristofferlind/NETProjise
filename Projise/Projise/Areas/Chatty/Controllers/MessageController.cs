using Projise.App_Infrastructure;
using Projise.DomainModel.ChattyBrightStarModel;    //Modelbinding failar?
using Projise.DomainModel.ChattyBrightStarModel.DataModels;
//using Projise.DomainModel.ChattyModel;    //Fungerar
//using Projise.DomainModel.ChattySchwabenModel;    //Saknar onSave
using Microsoft.AspNet.SignalR;
using Microsoft.Security.Application;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Net.Http.Formatting;

namespace Projise.Areas.Chatty.Controllers
{
    [System.Web.Http.Authorize]
    public class MessageController : ApiController
    {
        IMessageRepository messageRepository;

        public MessageController()
        {
            messageRepository = new MessageRepository();
            messageRepository.OnSave += messageRepository_OnSave;
        }

        // GET api/message
        public IEnumerable<ChatMessage> Get()
        {
            return messageRepository.All();
        }


        [System.Web.Mvc.AsyncTimeout(60), Route("api/message/poll"), HttpGet]
        public async Task<IEnumerable<ChatMessage>> Poll()
        {
            await _updated.Task;
            return messageRepository.All();
        }

        static TaskCompletionSource<ChatMessage> _updated = new TaskCompletionSource<ChatMessage>();

        void messageRepository_OnSave(object sender, ChatMessageEventArgs e)
        {
            _updated.SetResult(e.ChatMessage);
            _updated = new TaskCompletionSource<ChatMessage>();
            GlobalHost.ConnectionManager.GetHubContext<ChatHub>().Clients.All.receiveMessage(e.ChatMessage);
        }

        // GET api/message/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/message
        public void Post([System.Web.Mvc.Bind(Include = "Name, Message, Date")]ChatMessage chatMessage)   //Projise.DomainModel.ChattyModel.ChatMessage inputChatMessage) //ChatMessage chatMessage) //[System.Web.Mvc.Bind(Include="Name, Message, Date")]ChatMessage chatMessage)
        {
            //var chatMessage = new ChatMessage
            //{
            //    Name = "testName",
            //    Message = "this is a test",
            //    Date = DateTime.Now
            //};
            //var chatMessage = new ChatMessage();
            //chatMessage.Name = Encoder.HtmlEncode(inputChatMessage.Name);
            //chatMessage.Message = Encoder.HtmlEncode(inputChatMessage.Message);
            //chatMessage.Date = DateTime.Now;
            ////var chatMessage = new ChatMessage(jsonBody["Name"], jsonBody["Message"]); //new ChatMessage(formData["Name"], formData["Message"]);
            //chatMessage.Name = Encoder.HtmlEncode(chatMessage.Name);
            //chatMessage.Message = Encoder.HtmlEncode(chatMessage.Message);
            messageRepository.Add(chatMessage);
            messageRepository.SaveChanges();
        }

        // PUT api/message/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/message/5
        public void Delete(int id)
        {
        }
    }
}