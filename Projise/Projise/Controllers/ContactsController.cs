using Projise.App_Infrastructure;
using Projise.DomainModel.DataModels;
using Projise.DomainModel.Webservices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Projise.Controllers
{
    public class ContactsController : ApiControllerBase
    {
        // GET: api/Contacts
        public IEnumerable<Contact> Get()
        {
            GoogleContacts service = new GoogleContacts(SessionUser);
            return service.Get();
        }

        // GET: api/Contacts/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Contacts
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Contacts/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Contacts/5
        public void Delete(int id)
        {
        }
    }
}
