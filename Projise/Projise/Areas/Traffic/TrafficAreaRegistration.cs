using System.Web.Mvc;

namespace Projise.Areas.Traffic
{
    public class TrafficAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "Traffic";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "Traffic_default",
                "Traffic/{controller}/{action}/{id}",
                new {controller = "Traffic", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}