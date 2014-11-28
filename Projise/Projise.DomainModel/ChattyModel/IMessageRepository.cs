using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Projise.DomainModel.ChattyModel
{
    public interface IMessageRepository
    {
        event EventHandler<ChatMessageEventArgs> OnSave;
        IEnumerable<ChatMessage> All();
        ChatMessage Find(string id);
        void Add(ChatMessage chatMessage);
        void Remove(string id);
        void Update(string id, ChatMessage chatMessage);
    }
}