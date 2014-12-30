using Google.Apis.Auth.OAuth2;
using Google.Apis.Auth.OAuth2.Flows;
using Google.Apis.Auth.OAuth2.Web;
using Google.Apis.Calendar.v3;
using Google.Apis.Calendar.v3.Data;
using Google.Apis.Util.Store;
using Projise.App_Infrastructure;
using Projise.DomainModel;
using Projise.DomainModel.DataModels;
using Projise.DomainModel.Entities;
using Projise.DomainModel.Webservices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;

namespace Projise.Controllers
{
    public class EventsController : ApiControllerBase
    {
        private ProjiseService service;

        public EventsController()
        {
            service = new ProjiseService(SessionUser);
        }

        // GET: api/Events
        public async Task<IEnumerable<CalendarEvent>> Get()
        {
            return await service.Get();
        }

        // GET: api/Events/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Events
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Events/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Events/5
        public void Delete(int id)
        {
        }
    }
}
