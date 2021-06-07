using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
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
    public class CountryStateCityController : ApiController
    {
        private PPCEntities db = new PPCEntities();

        #region Country
        public IHttpActionResult GetAllCountry()
        {
            var UOMs = from a in db.tblCountries.AsNoTracking().OrderBy(a => a.Country)
                       select new
                       {
                           a.Id,
                           a.Identifier,
                           a.Country                            
                       };
            return Ok(UOMs);
        }

        [ResponseType(typeof(tblCountry))]
        public IHttpActionResult PostCountry(tblCountry country)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            db.tblCountries.Add(country);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = country.Id }, country);
        }

        public IHttpActionResult PutCountry(int id, tblCountry country)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != country.Id)
            {
                return BadRequest();
            }            
            db.Entry(country).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CountryExists(id))
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
        private bool CountryExists(int id)
        {
            return db.tblCountries.Count(e => e.Id == id) > 0;
        }

        #endregion

        #region State
        public IHttpActionResult GetState(int countryId)
        {
            var State = from a in db.tblStates .AsNoTracking().OrderBy(a => a.State)
                       where a.CountryId == countryId
                       select new
                       {
                           a.Id,
                           a.Identifier,
                           a.State
                       };
            return Ok(State);
        }

        [ResponseType(typeof(tblState))]
        public IHttpActionResult PostState(tblState state)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.tblStates.Add(state);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = state.Id }, state);
        }

        public IHttpActionResult PutState(int id, tblCountry state)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != state.Id)
            {
                return BadRequest();
            }
            db.Entry(state).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StateExists(id))
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
        private bool StateExists(int id)
        {
            return db.tblStates.Count(e => e.Id == id) > 0;
        }

        #endregion

        #region City
        public IHttpActionResult GetCity(int stateId)
        {
            var city = from a in db.tblCities.AsNoTracking().OrderBy(a => a.City)
                       where a.StateId == stateId
                       select new
                       {
                           a.Id,
                           a.Identifier,
                           a.City
                       };
            return Ok(city);
        }

        [ResponseType(typeof(tblCity))]
        public IHttpActionResult PostCity(tblCity  city)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.tblCities .Add(city);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = city.Id }, city);
        }

        public IHttpActionResult PutCity(int id, tblCity city)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != city.Id)
            {
                return BadRequest();
            }
            db.Entry(city).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CityExists(id))
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
        private bool CityExists(int id)
        {
            return db.tblCities.Count(e => e.Id == id) > 0;
        }

        #endregion
    }
}
