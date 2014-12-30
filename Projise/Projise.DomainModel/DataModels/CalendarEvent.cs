using Google.Apis.Calendar.v3.Data;
using Projise.DomainModel.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Projise.DomainModel.DataModels
{
    public class CalendarEvent
    {
        public int Id { get; set; }     //Något onödig, men vill slippa trixa med att avvika från standard, åtminstone tillsvidare
        public string UserId { get; set; }
        public string ProjectId { get; set; }
        public string CalendarId { get; set; }
        public string EventId { get; set; }
        public DateTime? Start { get; set; }
        public DateTime? End { get; set; }
        public string Description { get; set; }
        public DateTime? LastChange { get; set; }
        public DateTime? Date { get; set; }
        public Boolean IsFullDay { get; set; }
        public string Location { get; set; }
        public DateTime CachedAt { get; set; }

        public CalendarEvent()
        {

        }

        public CalendarEvent(Event gEvent, UserWithSessionVars user, string calendarId)
        {
            UserId = user.Id.ToString();
            ProjectId = user.ActiveProject.ToString();
            CalendarId = calendarId;

            EventId = gEvent.Id;

            DateTime start;
            if (DateTime.TryParse(gEvent.Start.DateTimeRaw, out start))
            {
                Start = start;
            }

            DateTime end;
            if (DateTime.TryParse(gEvent.End.DateTimeRaw, out end))
            {
                End = end;
            }

            Description = gEvent.Description != null ? gEvent.Description : gEvent.Summary;

            DateTime lastChange;
            if (DateTime.TryParse(gEvent.UpdatedRaw, out lastChange))
            {
                LastChange = lastChange;
            }

            DateTime date;
            if (DateTime.TryParse(gEvent.End.Date, out date))
            {
                Date = date;
                IsFullDay = true;
            }
            else
            {
                IsFullDay = false;
            }

            Location = gEvent.Location;

            CachedAt = DateTime.Now;
        }
    }
}
