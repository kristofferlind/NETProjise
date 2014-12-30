using Google.Apis.Auth.OAuth2;
using Google.Apis.Auth.OAuth2.Flows;
using Google.Apis.Auth.OAuth2.Web;
using Google.Apis.Calendar.v3;
using Google.Apis.Calendar.v3.Data;
using Google.Apis.Http;
using Google.Apis.Services;
using Projise.DomainModel.DataModels;
using Projise.DomainModel.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Projise.DomainModel.Webservices
{
    public class GoogleCalendar
    {
        private UserWithSessionVars user;
        private CalendarService service;
        //private UserCredential credential;

        public GoogleCalendar(UserWithSessionVars user)
        {
            this.user = user;

            service = new CalendarService(new BaseClientService.Initializer
            {
                HttpClientInitializer = new CustomUserCredential(user.GoogleAccessToken),
                ApplicationName = "Projise"
            });
        }

        public async Task<IEnumerable<CalendarEvent>> All()
        {
            var calendarList = await service.CalendarList.List().ExecuteAsync();
            var calendars = calendarList.Items;
            var events = new List<CalendarEvent>();

            foreach (var item in calendars)
            {
                var calendar = service.Events.List(item.Id);
                calendar.TimeMin = DateTime.Now;
                calendar.TimeMax = DateTime.Now.AddMonths(1);
                var calendarItems = await calendar.ExecuteAsync();
                var items = calendarItems.Items;

                if (items.Count != 0)
                {
                    foreach (var calItem in items)
                    {
                        
                        events.Add(new CalendarEvent(calItem, user, item.Id));
                    }
                }
            }


            return events;
        }
    }


    //http://stackoverflow.com/questions/21528773/how-to-make-calendarservice-object-using-access-token
    public class CustomUserCredential : IHttpExecuteInterceptor, IConfigurableHttpClientInitializer
    {
        private string _accessToken;

        public CustomUserCredential(string accessToken)
        {
            _accessToken = accessToken;
        }

        public void Initialize(ConfigurableHttpClient httpClient)
        {
            httpClient.MessageHandler.ExecuteInterceptors.Add(this);
        }

        public async System.Threading.Tasks.Task InterceptAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _accessToken);
            request.Headers.Add("Cookie", string.Format(".AspNet.ApplicationCookie = {0}", _accessToken));
        }
    }
}
