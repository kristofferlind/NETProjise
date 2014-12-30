using Google.Contacts;
using Google.GData.Client;
using Projise.DomainModel.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Projise.DomainModel;

namespace Projise.DomainModel.Webservices
{
    public class GoogleContacts
    {
        private ContactsRequest _contactsService;

        public GoogleContacts(UserWithSessionVars user)
        {
            RequestSettings requestSettings = new RequestSettings("Projise", user.GoogleAccessToken);
            _contactsService = new ContactsRequest(requestSettings);
        }

        public IEnumerable<DataModels.Contact> Get()
        {
            var entries = _contactsService.GetContacts().Entries;

            var parsedEntries = new List<DataModels.Contact>();
            foreach (var entry in entries)
            {
                if (entry.Name.FullName != null && entry.PrimaryEmail != null)
                {
                    parsedEntries.Add(new DataModels.Contact(entry));
                }
            }

            return parsedEntries;
        }
    }
}
