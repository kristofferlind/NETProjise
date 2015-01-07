using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;

namespace Projise.App_Infrastructure
{
    //http://stackoverflow.com/questions/15574486/angular-against-asp-net-webapi-implement-csrf-on-the-server
    public class CheckCSRFAttribute : AuthorizeAttribute
    {
        protected override bool IsAuthorized(HttpActionContext context)
        {
            // get auth token from cookie
            var authCookie = HttpContext.Current.Request.Cookies[".AspNet.ApplicationCookie"];
            //var authCookie = HttpContext.Current.Request.Cookies[".ASPXAUTH"];

            if (authCookie == null)
            {
                return false;
            }
            var authToken = authCookie.Value;

            // get csrf token from header
            var csrfToken = context.Request.Headers.GetValues("X-XSRF-TOKEN").FirstOrDefault();
            if (String.IsNullOrEmpty(csrfToken))
            {
                return false;
            }

            // Verify that csrf token was generated from auth token
            return new CSRFToken().DoesCsrfTokenMatchAuthToken(csrfToken, authToken);
        }
    }
}