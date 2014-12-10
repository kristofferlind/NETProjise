using MongoDB.Bson;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Projise.DomainModel.TrafficInfoModel
{
    [JsonObject(MemberSerialization.OptOut)]
    public class TrafficInfo
    {
        [JsonIgnore]
        public ObjectId Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public int Priority { get; set; }
        public string Category { get; set; }
        public string SubCategory { get; set; }
        public DateTime CreatedDate { get; set; }

        public bool ShouldSerializeId()
        {
            return false;
        }

        //public TrafficInfo(Newtonsoft.Json.Linq.JToken trafficInfo)
        //{
        //    //Felkontroller för lat, lon och prio behövs
        //    Title = trafficInfo["messages"]["title"].ToString();
        //    Description = trafficInfo["messages"]["description"].ToString();
        //    Latitude = double.Parse(trafficInfo["messages"]["latitude"].ToString());
        //    Longitude = double.Parse(trafficInfo["messages"]["longitude"].ToString());
        //    Priority = int.Parse(trafficInfo["messages"]["priority"].ToString());
        //    Category = trafficInfo["messages"]["subcategory"].ToString();
        //}
    }
}
