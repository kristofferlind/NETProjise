using Projise.DomainModel.ChattyBrightStarModel.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Projise.DomainModel.ChattyBrightStarModel
{
    public class ChatMessageEventArgs : EventArgs
    {
        private ChatMessage _chatMessage;
        public ChatMessage ChatMessage {
            get
            {
                return _chatMessage;
            }
        }
        public ChatMessageEventArgs(ChatMessage chatMessage)
        {
            _chatMessage = chatMessage;
        }
    }
}
