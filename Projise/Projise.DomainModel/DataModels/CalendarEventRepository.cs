using Projise.DomainModel.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Projise.DomainModel.DataModels
{
    public class CalendarEventRepository
    {
        private DbContext _context;
        private DbSet<CalendarEvent> _set;
        private UserWithSessionVars _user;
        private string _userId;
        private string _projectId;

        public CalendarEventRepository(DbContext context, UserWithSessionVars user)
        {
            _context = context;
            _set = _context.Set<CalendarEvent>();
            _user = user;
            _userId = user.Id.ToString();
            _projectId = user.ActiveProject.ToString();
        }

        public IEnumerable<CalendarEvent> Get()
        {
            return _set.Where(e => e.ProjectId == _projectId)
                       .Union(_set.Where(e => e.UserId == _userId));
        }

        public async Task<CalendarEvent> GetById(int id)
        {
            return await _set.FindAsync(id);
        }

        public void Add(CalendarEvent calendarEvent)
        {
            _set.Add(calendarEvent);
        }

        public void Update(CalendarEvent calendarEvent)
        {
            _set.Attach(calendarEvent);
            _context.Entry(calendarEvent).State = EntityState.Modified;
        }

        public async void Remove(int id)
        {
            var calendarEvent = await _set.FindAsync(id);
            _set.Remove(calendarEvent);
        }

        public void ClearUserEvents()
        {
            var userEvents = _set.Where(e => e.UserId == _userId).ToList();
            if (userEvents.Count != 0)
            {
                _set.RemoveRange(userEvents);
            }
        }

        public void AddUserEvents(IEnumerable<CalendarEvent> userEvents)
        {
            //ClearUserEvents();
            _set.AddRange(userEvents);
        }

        public CalendarEvent LastChanged()
        {
            var mostRecent = _set.Where(e => e.UserId == _userId).FirstOrDefault(); //.OrderByDescending(e => e.CachedAt).Take(1).SingleOrDefault();
            return mostRecent;
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
