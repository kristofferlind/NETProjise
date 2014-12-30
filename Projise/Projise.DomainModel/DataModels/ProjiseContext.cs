using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Projise.DomainModel.DataModels
{
    public class ProjiseContext : DbContext
    {
        public ProjiseContext() : base("SQL")
        {

        }

        public DbSet<CalendarEvent> CalendarEvents { get; set; }
        public DbSet<Contact> Contacts { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            base.OnModelCreating(modelBuilder);
        }
    }
}
