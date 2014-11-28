using BrightstarDB.EntityFramework;
using Projise.DomainModel.ChattyBrightStarModel.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Projise.DomainModel.ChattyBrightStarModel
{
    public class MessageRepository : IMessageRepository
    {
        private ChattyDBContext _entities = new ChattyDBContext("Type=embedded;StoresDirectory=c:\\brightstardb;StoreName=test2");

        public event EventHandler<ChatMessageEventArgs> OnSave;
        protected virtual void Save(ChatMessageEventArgs e)
        {
            EventHandler<ChatMessageEventArgs> handler = OnSave;
            if (handler != null)
            {
                handler(this, e);
            }
        }

        public IEnumerable<ChatMessage> All()
        {
            var messages = from c in _entities.ChatMessages select c as ChatMessage;
            return messages.ToList();
            //return _entities.ChatMessages as IEnumerable<ChatMessage>;
            //return _entities.ChatMessages.ToList().AsEnumerable() as IEnumerable<ChatMessage>;
        }

        public ChatMessage Find(string id)
        {
            throw new NotImplementedException();
        }

        public void Add(ChatMessage chatMessage)
        {
            //var test = new ChatMessage
            //{
            //    Name = "testName",
            //    Message = "this is a test",
            //    Date = DateTime.Now
            //};
            //_entities.ChatMessages.Add(test);   //NullReferenceException här också.. fungerade efter identifier attribut

            _entities.ChatMessages.Add(chatMessage);
            //Save(new ChatMessageEventArgs(chatMessage));  //bortkommenterat för att skippa "Self referencing loop detected for property 'Context'"
        }

        public void Remove(string id)
        {
            throw new NotImplementedException();
        }

        public void Update(string id, ChatMessage chatMessage)
        {
            throw new NotImplementedException();
        }

        public void SaveChanges()
        {
            _entities.SaveChanges();
        }

        private bool _disposed = false;

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    _entities.Dispose();
                }
            }
        }
    }
}
