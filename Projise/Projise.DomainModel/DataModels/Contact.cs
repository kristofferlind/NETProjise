using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Projise.DomainModel.DataModels
{
    public class Contact
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public DateTime? BirthDay { get; set; }

        public Contact()
        {

        }

        public Contact(Google.Contacts.Contact contact)
        {
            Name = contact.Name.FullName;
            if (!string.IsNullOrWhiteSpace(contact.PrimaryEmail.Value)) {
                Email = contact.PrimaryEmail.Value;
            }
            else
            {
                Email = contact.Emails.FirstOrDefault().Address;
            }

            if (contact.ContactEntry.Birthday != null)
            {
                BirthDay = DateTime.Parse(contact.ContactEntry.Birthday);
            }
        }
    }
}
