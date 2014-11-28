using BrightstarDB.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Projise.DomainModel.ChattyBrightStarModel.DataModels
{
    [Entity]
    public interface IChatMessage
    {
        [Identifier("http://localhost/messages")]
        string Id { get; }
        string Name { get; set; }

        string Message { get; set; }

        DateTime Date { get; set; }
    }
}
