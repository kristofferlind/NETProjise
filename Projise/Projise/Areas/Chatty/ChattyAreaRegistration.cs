using System.Web.Mvc;

namespace Projise.Areas.Chatty
{
    public class ChattyAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "Chatty";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "Chatty_default",
                "Chatty/{controller}/{action}/{id}",
                new { controller = "Chat",  action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}