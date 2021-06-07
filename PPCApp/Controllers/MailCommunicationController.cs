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
    public class MailCommunicationController : ApiController
    {
        private PPCEntities db = new PPCEntities();
        public IHttpActionResult GetMail(int lngUserId, int intMailFolder)
        {
            var mail=db.tblMailCommnications.AsNoTracking()
                .Include(a => a.tblMailAttachments )
                .Include(a => a.tblUser)
                .Where(a => a.tblUser.Id == lngUserId && a.intMailFolder==intMailFolder  && a.boolDelStatus == false);
            
            return Ok(mail);
        }
    }
}
