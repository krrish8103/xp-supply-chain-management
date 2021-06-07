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
using PPCAppDataModel;

namespace PPCApp.Controllers
{
    public class RefreshTokensController : ApiController
    {
        private PPCEntities db = new PPCEntities();

        // GET: api/RefreshTokens
        [Authorize]
        public IQueryable<tblRefreshToken> GetRefreshTokens()
        {
            return db.tblRefreshTokens;
        }

        // GET: api/RefreshTokens/5
        [Authorize]
        [ResponseType(typeof(tblRefreshToken))]
        public IHttpActionResult GetRefreshToken(string id)
        {
            tblRefreshToken refreshToken = db.tblRefreshTokens.Find(id);
            if (refreshToken == null)
            {
                return NotFound();
            }

            return Ok(refreshToken);
        }

        // PUT: api/RefreshTokens/5
        [Authorize]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRefreshToken(string id, tblRefreshToken refreshToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != refreshToken.Id)
            {
                return BadRequest();
            }

            db.Entry(refreshToken).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RefreshTokenExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/RefreshTokens
        [Authorize]
        [ResponseType(typeof(tblRefreshToken))]
        public IHttpActionResult PostRefreshToken(tblRefreshToken refreshToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.tblRefreshTokens.Add(refreshToken);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (RefreshTokenExists(refreshToken.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = refreshToken.Id }, refreshToken);
        }

        // DELETE: api/RefreshTokens/5
        [AllowAnonymous]
        [ResponseType(typeof(tblRefreshToken))]
        public IHttpActionResult DeleteRefreshToken(string id)
        {
            string hashId = Helper.GetHash(id);
            tblRefreshToken refreshToken = db.tblRefreshTokens.Find(hashId);
            if (refreshToken == null)
            {
                return NotFound();
            }

            db.tblRefreshTokens.Remove(refreshToken);
            db.SaveChanges();

            return Ok(refreshToken);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RefreshTokenExists(string id)
        {
            return db.tblRefreshTokens.Count(e => e.Id == id) > 0;
        }
    }
}