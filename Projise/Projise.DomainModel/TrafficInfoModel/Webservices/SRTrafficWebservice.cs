using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;

namespace Projise.DomainModel.TrafficInfoModel.Webservices
{
    public class SRResponseData
    {
        public string Copyright { get; set; }
        public IEnumerable<TrafficInfo> Messages { get; set; }
        public object Pagination { get; set; }
    }
    public class SRTrafficWebservice
    {
        public IEnumerable<TrafficInfo> GetTrafficData()
        {
            string json;

            //var requestUri = "http://api.sr.se/api/v2/traffic/messages?format=json&size=100&sort=id+desc";
            var requestUri = "http://api.sr.se/api/v2/traffic/messages?format=json&pagination=false";   //sort doesn't seem to work
            var request = WebRequest.CreateHttp(requestUri);
            
            using (var response = request.GetResponse()) 
            using (var reader = new StreamReader(response.GetResponseStream()) )
            {
                json = reader.ReadToEnd();
            }

            var data = JsonConvert.DeserializeObject<SRResponseData>(json);

            //Sorting, since it failed on api
            return data.Messages.OrderByDescending(ti => ti.CreatedDate).Take(100);
        }
    }
}