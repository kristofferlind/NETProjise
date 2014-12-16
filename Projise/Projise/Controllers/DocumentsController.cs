using Microsoft.AspNet.SignalR;
using MongoDB.Bson;
using Projise.App_Infrastructure;
using Projise.DomainModel.Entities;
using Projise.DomainModel.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Projise.Controllers
{
    public class DocumentsController : ApiControllerBase
    {
        private DocumentRepository documentRepository;

        public DocumentsController()
        {
            documentRepository = new DocumentRepository(SessionUser);
            documentRepository.OnChange += documentRepository_OnChange;
        }

        void documentRepository_OnChange(object sender, DomainModel.Events.SyncEventArgs<Document> e)
        {
            GlobalHost.ConnectionManager.GetHubContext<ProjectHub>().Clients.All.onChange(e.Operation, e.Type, e.Item);
        }

        // GET: api/Documents
        public IEnumerable<Document> Get()
        {
            return documentRepository.All();
        }

        // GET: api/Documents/5
        public Document Get(string id)
        {
            var documentId = ObjectId.Parse(id);
            return documentRepository.FindById(documentId);
        }

        // POST: api/Documents
        public void Post([FromBody]Document document)
        {
            document.ProjectId = SessionUser.ActiveProject;
            documentRepository.Add(document);
        }

        // PUT: api/Documents/5
        public void Put([FromBody]Document document)
        {
            documentRepository.Update(document);
        }

        // DELETE: api/Documents/5
        public void Delete(string id)
        {
            var documentId = ObjectId.Parse(id);
            documentRepository.Remove(documentId);
        }
    }
}
