using Projise.DomainModel.DataModels;
using Projise.DomainModel.Entities;
using Projise.DomainModel.Webservices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Projise.DomainModel
{
    public class ProjiseService
    {
        private CalendarEventRepository _repository;
        private GoogleCalendar _calendarService;
        private GoogleContacts _contactService;
        private UserWithSessionVars _user;

        public ProjiseService(UserWithSessionVars user)
        {
            var context = new ProjiseContext();
            _repository = new CalendarEventRepository(context, user);
            _calendarService = new GoogleCalendar(user);
            _contactService = new GoogleContacts(user);
            _user = user;
        }

        public async Task<IEnumerable<CalendarEvent>> Get()
        {
            var lastChanged = _repository.LastChanged();
            if (lastChanged != null && (DateTime.Now - lastChanged.CachedAt).Days < 0)
            {
                return _repository.Get();
            }
            else
            {
                try
                {
                    var events = await _calendarService.All();
                    if (events != null)
                    {
                        //var days = (DateTime.Now - lastChanged.CachedAt).TotalDays;
                        //if ((DateTime.Now - lastChanged.CachedAt).TotalDays < 30)
                        //{
                            _repository.ClearUserEvents();
                            UpdateBirthdays();
                        //}
                        _repository.AddUserEvents(events);
                        _repository.Save();
                    }
                }
                catch (Exception)
                {
                    //probably google access token not present or invalid, 
                    //just ignore error and present project data from repo
                }

                return _repository.Get();
            }
        }

        private void UpdateBirthdays()
        {
            var contacts = _contactService.Get();
            var contactsWithBirthday = contacts.Where(c => c.BirthDay.HasValue);
            var now = DateTime.Now;

            var birthdays = new List<CalendarEvent>();

            foreach (var contact in contactsWithBirthday)
            {
                var birthday = contact.BirthDay.Value;
                var thisYearBirthday = new DateTime(now.Year, birthday.Month, birthday.Day);
                if ((now - thisYearBirthday).TotalDays > 0.0)
                {
                    thisYearBirthday.AddYears(1);
                }
                var nextBirthday = thisYearBirthday;

                birthdays.Add(new CalendarEvent
                {
                    CachedAt = now,
                    Date = nextBirthday,
                    UserId = _user.Id.ToString(),
                    IsFullDay = true,
                    Description = string.Format("{0}'s birthday", contact.Name),
                });
            }

            _repository.AddUserEvents(birthdays);
        }
    }
}
