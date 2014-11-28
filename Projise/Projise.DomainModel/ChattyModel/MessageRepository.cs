using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Projise.DomainModel.ChattyModel
{
    public class MessageRepository : IMessageRepository
    {
        MongoServer _server;
        MongoDatabase _database;
        MongoCollection _messages;

        public event EventHandler<ChatMessageEventArgs> OnSave;

        protected virtual void Save(ChatMessageEventArgs e)
        {
            EventHandler<ChatMessageEventArgs> handler = OnSave;
            if (handler != null)
            {
                handler(this, e);
            }
        } 

        public MessageRepository()
        {
            string connection = "mongodb://localhost:27017";
            _server = MongoServer.Create(connection);
            _database = _server.GetDatabase("Chatty", WriteConcern.Acknowledged);
            _messages = _database.GetCollection<ChatMessage>("Messages");
        }

        public IEnumerable<ChatMessage> All()
        {
            return _messages.FindAllAs<ChatMessage>();
        }

        public ChatMessage Find(string id)
        {
            return _messages.FindOneAs<ChatMessage>();
        }

        public void Add(ChatMessage chatMessage)
        {
            chatMessage.Id = ObjectId.GenerateNewId().ToString();
            _messages.Insert<ChatMessage>(chatMessage);
            Save(new ChatMessageEventArgs(chatMessage));
        }

        public void Remove(string id)
        {
            throw new NotImplementedException();
        }

        public void Update(string id, ChatMessage chatMessage)
        {
            throw new NotImplementedException();
        }
    }
}