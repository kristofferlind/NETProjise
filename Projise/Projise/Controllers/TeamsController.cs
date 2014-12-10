using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Projise.Controllers
{
    public class TeamsController : ApiController
    {
        // GET: api/Team
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Team/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Team
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Team/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Team/5
        public void Delete(int id)
        {
        }
    }
}
