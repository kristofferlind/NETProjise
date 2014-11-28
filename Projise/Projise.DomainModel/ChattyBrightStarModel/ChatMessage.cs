using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Projise.DomainModel.ChattyBrightStarModel;

namespace Projise.DomainModel.ChattyBrightStarModel.DataModels
{
    [MetadataType(typeof(ChatMessage_Metadata))]
    public partial class ChatMessage
    {
        public ChatMessage(string name, string message) : base()
        {
            Name = name;
            Message = message;
            Date = DateTime.Now;
        }
    }
}
