using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.OData;
using Microsoft.Azure.Mobile.Server;
using GAB2018.Web.DataObjects;
using GAB2018.Web.Models;

namespace GAB2018.Web.Controllers
{
    public class SessionController : TableController<Session>
    {
        protected override void Initialize(HttpControllerContext controllerContext)
        {
            base.Initialize(controllerContext);
            GABMauritiusContext context = new GABMauritiusContext();
            DomainManager = new EntityDomainManager<Session>(context, Request);
        }

        // GET tables/Session
        public IQueryable<Session> GetAllSession()
        {
            return Query(); 
        }

        // GET tables/Session/48D68C86-6EA6-4C25-AA33-223FC9A27959
        public SingleResult<Session> GetSession(string id)
        {
            return Lookup(id);
        }

        // PATCH tables/Session/48D68C86-6EA6-4C25-AA33-223FC9A27959
        public Task<Session> PatchSession(string id, Delta<Session> patch)
        {
             return UpdateAsync(id, patch);
        }

        // POST tables/Session
        public async Task<IHttpActionResult> PostSession(Session item)
        {
            Session current = await InsertAsync(item);
            return CreatedAtRoute("Tables", new { id = current.Id }, current);
        }

        // DELETE tables/Session/48D68C86-6EA6-4C25-AA33-223FC9A27959
        public Task DeleteSession(string id)
        {
             return DeleteAsync(id);
        }
    }
}
