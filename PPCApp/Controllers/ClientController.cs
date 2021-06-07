using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.Security.Claims;
using PPCAppDataModel;
namespace PPCApp.Controllers
{
    public class ClientController : ApiController
    {
        private PPCEntities db = new PPCEntities();
        [HttpGet]
        [ResponseType(typeof(tblClient))]
        public IHttpActionResult GetClient()
        {
            tblClient clientInfo = db.tblClients.AsNoTracking()
                .SingleOrDefault();
            if (clientInfo != null)
            {
                return Ok(clientInfo);
            }
            else
            {
                return Ok(1);
            }
        }
    }
}
