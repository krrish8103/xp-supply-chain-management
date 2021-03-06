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
using System.Data.Entity.Validation;

namespace PPCApp.Controllers
{
    [Authorize]
    public class MasterController : ApiController
    {
        private PPCEntities db = new PPCEntities();

        #region LookUpCategory
        public IHttpActionResult GetAllLookUpCategory()
        {
            var LookUpCategorys = from a in db.lkuSCMLookupMasters.AsNoTracking().OrderBy(a => a.strDescription)
                                  select new
                                  {
                                      a.lngId,
                                      a.strDescription
                                  };
            return Ok(LookUpCategorys);
        }

        [ResponseType(typeof(lkuSCMLookupMaster))]
        public IHttpActionResult PostLookUpCategory(lkuSCMLookupMaster LookUpCategory)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //LookUpCategory.AddedOn = DateTime.Now;
            //LookUpCategory.DelStatus = false;
            db.lkuSCMLookupMasters.Add(LookUpCategory);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = LookUpCategory.lngId }, LookUpCategory);
        }

        public IHttpActionResult PutLookUpCategory(int id, lkuSCMLookupMaster LookUpCategory)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != LookUpCategory.lngId)
            {
                return BadRequest();
            }

            db.Entry(LookUpCategory).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LookUpCategoryExists(id))
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
        private bool LookUpCategoryExists(int id)
        {
            return db.lkuSCMLookupMasters.Count(e => e.lngId == id) > 0;
        }

        #endregion

        #region LookUps
        public IHttpActionResult GetAllLookups(int Id)
        {
            var LookUps = from a in db.lkuSCMLookupDatas.AsNoTracking().OrderBy(a => a.strCode)
                          .Where(b => b.lngLookupMasterId == Id)
                          select new
                          {
                              a.lngId,
                              a.lngLookupMasterId,
                              a.strCode,
                              a.strDescription,
                              a.intSequence,
                              a.blnActive
                          };
            return Ok(LookUps);
        }

        [ResponseType(typeof(lkuSCMLookupData))]
        public IHttpActionResult PostLookUps(lkuSCMLookupData lookups)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //if (lookups.AddedBy == null || lookups.AddedBy < 0)
            //{
            //    uom.AddedBy = -1;
            //}
            //uom.AddedOn = DateTime.Now;
            //uom.LastUpBy = -1;
            //uom.LastUpOn = null;
            //uom.DelStatus = false;
            db.lkuSCMLookupDatas.Add(lookups);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = lookups.lngId }, lookups);
        }

        public IHttpActionResult PutLookups(int id, lkuSCMLookupData lookups)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != lookups.lngId)
            {
                return BadRequest();
            }

            db.Entry(lookups).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LookUpExists(id))
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
        private bool LookUpExists(int id)
        {
            return db.lkuSCMLookupDatas.Count(e => e.lngId == id) > 0;
        }

        #endregion

        #region UnioOfMeasureMaster
        public IHttpActionResult GetAllUnitOfMeasure()
        {
            var UOMs = from a in db.tblMasterUnitOfMeasures.AsNoTracking().OrderBy(a => a.UOMCode)
                       select new
                       {
                           a.Id,
                           a.UOMCode,
                           a.UOMDescription,
                           a.DelStatus,
                           a.AddedBy,
                           a.AddedOn,
                           a.LastUpBy,
                           a.LastUpOn
                       };
            return Ok(UOMs);
        }

        [ResponseType(typeof(tblMasterUnitOfMeasure))]
        public IHttpActionResult PostUnitOfMeasure(tblMasterUnitOfMeasure uom)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (uom.AddedBy == null || uom.AddedBy < 0)
            {
                uom.AddedBy = -1;
            }
            uom.AddedOn = DateTime.Now;
            uom.LastUpBy = -1;
            uom.LastUpOn = null;
            uom.DelStatus = false;
            db.tblMasterUnitOfMeasures.Add(uom);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = uom.Id }, uom);
        }

        public IHttpActionResult PutUnitOfMeasure(int id, tblMasterUnitOfMeasure uom)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != uom.Id)
            {
                return BadRequest();
            }

            if (uom.LastUpBy == null || uom.LastUpBy < 0)
            {
                uom.LastUpBy = -1;
            }
            uom.LastUpOn = DateTime.Now;
            db.Entry(uom).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UnitOfMeasureExists(id))
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
        private bool UnitOfMeasureExists(int id)
        {
            return db.tblMasterUnitOfMeasures.Count(e => e.Id == id) > 0;
        }

        #endregion

        #region ItemMaster

        public IHttpActionResult GetAllItem()
        {
            var Items = from a in db.tblMasterItems.AsNoTracking().OrderBy(a => a.ItemName)
                        orderby a.Id
                        select new
                        {
                            a.Id,
                            a.Identifier,
                            a.PartNumber,
                            a.ItemName,
                            CodeDesc = a.Identifier + " - " + a.ItemName,
                            a.ItemDescription,
                            a.MinStockLevel,
                            a.MaxStockLevel,
                            a.Reprocurement,
                            a.LeadTime,
                            a.LeadTimeUnit,
                            UOMCode = a.tblMasterUnitOfMeasure.UOMCode,
                            UOM = a.tblMasterUnitOfMeasure.Id,
                            Drawing = from d in a.tblMasterDrawings
                                      where d.Active == true
                                      select new
                                      {
                                          d.Id,
                                          d.Identifier,
                                          d.Description,
                                          d.Version,
                                          d.Drawing,
                                          d.ItemId,
                                          d.Active,
                                          d.DelStatus,
                                          d.AddedBY,
                                          d.AddedOn,
                                          d.LastUpBy,
                                          d.LastUpOn
                                      },
                            ItemCategory = a.tblMasterItemCategory.Id,
                            ItemCategoryDescription = a.tblMasterItemCategory.Description,
                            a.Buffer,
                            LocationBinBuffer = from d in a.tblLocationBinBuffers
                                                group d by d.lngLocationId into g
                                                select new
                                                {
                                                    LocationName = g.Select(f => f.tblMasterLocation.Name).FirstOrDefault(),
                                                    LocationBuffer = g.Sum(d => d.Buffer),
                                                    Bin = from h in g
                                                          select new
                                                          {
                                                              h.tblMasterBin,
                                                              h.Buffer//,
                                                              //GRNInfo=from i in h.tblMasterBin.tblLocationBinBuffers
                                                              //        select new
                                                              //        {
                                                              //           i.tblLocationBinBufferDetails,
                                                              //           GRN=from j in i.tblLocationBinBufferDetails
                                                              //               select new
                                                              //               {
                                                              //                   j.tblGoodReciptNote,
                                                              //                   tblGoodReciptNoteDetails = j.tblGoodReciptNote.tblGoodReciptNoteDetails
                                                              //               }
                                                              //        }
                                                          }
                                                }
                        };
            return Ok(Items);
        }

        public IHttpActionResult GetItemById(int itemId)
        {
            var items = from a in db.tblMasterItems
                  .Where(a => a.Id == itemId && a.DelStatus == false)
                        select new
                        {
                            a.Id,
                            a.Identifier,
                            a.PartNumber,
                            a.ItemName,
                            CodeDesc = a.Identifier + " - " + a.ItemName,
                            a.ItemDescription,
                            a.MinStockLevel,
                            a.MaxStockLevel,
                            a.Reprocurement,
                            a.LeadTime,
                            a.LeadTimeUnit,
                            UOMCode = a.tblMasterUnitOfMeasure.UOMCode,
                            UOM = a.tblMasterUnitOfMeasure.Id,
                            a.tblMasterDrawings,
                            a.tblMasterUnitOfMeasure,
                            LocationBinBuffer = from d in a.tblLocationBinBuffers
                                                group d by d.lngLocationId into g
                                                select new
                                                {
                                                    LocationName = g.Select(f => f.tblMasterLocation.Name).FirstOrDefault(),
                                                    LocationBuffer = g.Sum(d => d.Buffer),
                                                    Bin = from h in g
                                                          select new
                                                          {
                                                              h.tblMasterBin,
                                                              h.Buffer
                                                          }
                                                }
                        };
            // return db.tblMasterItems.AsNoTracking()
            //     .Include(a => a.tblMasterDrawings)
            //     .Include(a => a.tblMasterUnitOfMeasure)
            //.Where(a => a.Id == itemId && a.DelStatus == false);
            return Ok(items);
        }


        [ResponseType(typeof(tblMasterItem))]
        public IHttpActionResult PostItem(tblMasterItem item)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (item.AddedBy == null || item.AddedBy < 0)
            {
                item.AddedBy = -1;
            }
            item.AddedOn = DateTime.Now;
            item.LastUpBy = -1;
            item.LastUpOn = null;
            item.DelStatus = false;
            using (var dbContextTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    db.tblMasterItems.Add(item);
                    db.SaveChanges();
                    item.Identifier = "ITM" + item.Id;
                    db.Entry(item).State = EntityState.Modified;
                    db.SaveChanges();
                    dbContextTransaction.Commit();
                    return CreatedAtRoute("DefaultApi", new { id = item.Id }, item);
                }
                catch (Exception ex)
                {
                    dbContextTransaction.Rollback();
                    return NotFound();
                }
            }
        }

        public IHttpActionResult PutItem(int id, tblMasterItem item)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != item.Id)
            {
                return BadRequest();
            }

            db.Entry(item).State = EntityState.Modified;
            if (item.LastUpBy == null || item.LastUpBy < 0)
            {
                item.LastUpBy = -1;
            }
            item.LastUpOn = DateTime.Now;

            try
            {
                db.SaveChanges();
                return Ok(1);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            //return StatusCode(HttpStatusCode.NoContent);
        }
        private bool ItemExists(int id)
        {
            return db.tblMasterItems.Count(e => e.Id == id) > 0;
        }


        #endregion

        #region ItemDrawingMaster
        public IHttpActionResult GetAllItemDrawing(int itemId)
        {
            if (itemId > 0)
            {
                var ItemDrawings = from a in db.tblMasterDrawings.AsNoTracking()
                               .Where(a => a.ItemId == itemId)
                               .OrderBy(a => a.Identifier)
                                   select new
                                   {
                                       a.Id,
                                       a.Identifier,
                                       a.Description,
                                       a.Version,
                                       a.Drawing,
                                       a.ItemId,
                                       a.Active
                                   };
                return Ok(ItemDrawings);
            }
            else
            {
                var ItemDrawings = from a in db.tblMasterDrawings.AsNoTracking()
                               .OrderBy(a => a.Identifier)
                                   select new
                                   {
                                       a.Id,
                                       a.Identifier,
                                       a.Description,
                                       a.Version,
                                       a.Drawing,
                                       a.ItemId,
                                       a.Active
                                   };
                return Ok(ItemDrawings);
            }


        }

        [ResponseType(typeof(tblMasterDrawing))]
        public IHttpActionResult PostItemDrawing(tblMasterDrawing itemDrawing)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            bool isEdit = false;
            if (itemDrawing.Active == true)
            {
                var obj = db.tblMasterDrawings.Where(a => a.ItemId == itemDrawing.ItemId && a.Active == true && (itemDrawing.Id > 0 ? itemDrawing.Id != a.Id : true));
                foreach (var itemDwg in obj)
                {
                    itemDwg.Active = false;
                    db.Entry(itemDwg).State = EntityState.Modified;
                }
            }
            if (itemDrawing.Id > 0)
            {
                if (itemDrawing.AddedBY == null || itemDrawing.AddedBY < 0)
                {
                    itemDrawing.AddedBY = -1;
                }
                itemDrawing.AddedOn = DateTime.Now;
                itemDrawing.LastUpBy = -1;
                itemDrawing.LastUpOn = null;
                itemDrawing.DelStatus = false;
                isEdit = true;
                db.Entry(itemDrawing).State = EntityState.Modified;
            }
            else
            {
                isEdit = false;
                if (itemDrawing.LastUpBy == null || itemDrawing.LastUpBy < 0)
                {
                    itemDrawing.LastUpBy = -1;
                }
                itemDrawing.LastUpOn = DateTime.Now;
                db.Entry(itemDrawing).State = EntityState.Added;
            }

            //db.SaveChanges();
            try
            {
                db.SaveChanges();
                if (isEdit == true)
                {
                    return Ok(2);
                }
                else
                {
                    return Ok(1);
                }
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
            //return CreatedAtRoute("DefaultApi", new { id = itemDrawing.Id }, itemDrawing);
        }

        public IHttpActionResult PutItemDrawing(int id, tblMasterDrawing itemDrawing)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != itemDrawing.Id)
            {
                return BadRequest();
            }

            db.Entry(itemDrawing).State = EntityState.Modified;
            if (itemDrawing.LastUpBy == null || itemDrawing.LastUpBy < 0)
            {
                itemDrawing.LastUpBy = -1;
            }
            itemDrawing.LastUpOn = DateTime.Now;

            try
            {
                db.SaveChanges();
                return Ok(1);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemDrawingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            //return StatusCode(HttpStatusCode.NoContent);
        }
        private bool ItemDrawingExists(int id)
        {
            return db.tblMasterDrawings.Count(e => e.Id == id) > 0;
        }

        #endregion

        #region TaxMaster
        public IHttpActionResult GetAllTax()
        {
            var UOMs = from a in db.tblMasterTaxes.AsNoTracking().OrderBy(a => a.TaxCode)
                       select new
                       {
                           a.Id,
                           a.TaxCode,
                           a.TaxDescription,
                           a.DelStatus,
                           a.AddedBY,
                           a.AddedOn,
                           a.LastUpBy,
                           a.LastUpOn
                       };
            return Ok(UOMs);
        }

        [ResponseType(typeof(tblMasterTax))]
        public IHttpActionResult PostTax(tblMasterTax tax)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (tax.AddedBY == null || tax.AddedBY < 0)
            {
                tax.AddedBY = -1;
            }
            tax.AddedOn = DateTime.Now;
            tax.LastUpBy = -1;
            tax.LastUpOn = null;
            tax.DelStatus = false;
            db.tblMasterTaxes.Add(tax);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tax.Id }, tax);
        }

        public IHttpActionResult PutTax(int id, tblMasterTax tax)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tax.Id)
            {
                return BadRequest();
            }
            if (tax.LastUpBy == null || tax.LastUpBy < 0)
            {
                tax.LastUpBy = -1;
            }
            tax.LastUpOn = DateTime.Now;
            db.Entry(tax).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaxExists(id))
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
        private bool TaxExists(int id)
        {
            return db.tblMasterTaxes.Count(e => e.Id == id) > 0;
        }

        #endregion

        #region VendorMaster
        public IHttpActionResult GetAllVendor()
        {
            var Vendors = from a in db.tblMasterVendors.AsNoTracking().OrderBy(a => a.VendorCode)
                          select new
                          {
                              a.Id,
                              a.VendorCode,
                              a.VendorDescription,
                              a.DelStatus,
                              a.AddedBY,
                              a.AddedOn,
                              a.LastUpBy,
                              a.LastUpOn
                          };
            return Ok(Vendors);
        }

        [ResponseType(typeof(tblMasterVendor))]
        public IHttpActionResult PostVendor(tblMasterVendor vendor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            vendor.AddedOn = DateTime.Now;
            vendor.DelStatus = false;
            db.tblMasterVendors.Add(vendor);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = vendor.Id }, vendor);
        }

        public IHttpActionResult PutVendor(int id, tblMasterVendor vendor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != vendor.Id)
            {
                return BadRequest();
            }

            db.Entry(vendor).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VendorExists(id))
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
        private bool VendorExists(int id)
        {
            return db.tblMasterVendors.Count(e => e.Id == id) > 0;
        }

        #endregion

        #region DepartmentMaster
        public IHttpActionResult GetAllDepartment()
        {
            var Departments = from a in db.tblMasterDepartments.AsNoTracking().OrderBy(a => a.DepartmentCode)
                              select new
                              {
                                  a.Id,
                                  a.DepartmentCode,
                                  a.DepartmentDescription,
                                  a.DelStatus,
                                  a.AddedBY,
                                  a.AddedOn,
                                  a.LastUpBy,
                                  a.LastUpOn
                              };
            return Ok(Departments);
        }

        [ResponseType(typeof(tblMasterDepartment))]
        public IHttpActionResult PostDepartment(tblMasterDepartment Department)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Department.AddedOn = DateTime.Now;
            Department.DelStatus = false;
            db.tblMasterDepartments.Add(Department);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = Department.Id }, Department);
        }

        public IHttpActionResult PutDepartment(int id, tblMasterDepartment Department)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != Department.Id)
            {
                return BadRequest();
            }

            db.Entry(Department).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DepartmentExists(id))
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
        private bool DepartmentExists(int id)
        {
            return db.tblMasterDepartments.Count(e => e.Id == id) > 0;
        }

        #endregion

        #region DocumentTypeMaster
        public IHttpActionResult GetAllDocumentType()
        {
            var DocumentTypes = from a in db.tblMasterDocumentTypes.AsNoTracking().OrderBy(a => a.DocumentTypeCode)
                                select new
                                {
                                    a.Id,
                                    a.DocumentTypeCode,
                                    a.DocumentTypeDescription,
                                    a.DelStatus,
                                    a.AddedBY,
                                    a.AddedOn,
                                    a.LastUpBy,
                                    a.LastUpOn
                                };
            return Ok(DocumentTypes);
        }

        [ResponseType(typeof(tblMasterDocumentType))]
        public IHttpActionResult PostDocumentType(tblMasterDocumentType DocumentType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            DocumentType.AddedOn = DateTime.Now;
            DocumentType.DelStatus = false;
            db.tblMasterDocumentTypes.Add(DocumentType);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = DocumentType.Id }, DocumentType);
        }

        public IHttpActionResult PutDocumentType(int id, tblMasterDocumentType DocumentType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != DocumentType.Id)
            {
                return BadRequest();
            }

            db.Entry(DocumentType).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DocumentTypeExists(id))
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
        private bool DocumentTypeExists(int id)
        {
            return db.tblMasterDocumentTypes.Count(e => e.Id == id) > 0;
        }

        #endregion

        #region LocationMaster
        public IHttpActionResult GetAllLocation()
        {
            var Locations = from a in db.tblMasterLocations.AsNoTracking().OrderBy(a => a.Identifier)
                            select new
                            {
                                a.Id,
                                a.Identifier,
                                a.Name,
                                a.Description,
                                a.AddressLine1,
                                a.AddressLine2,
                                a.CityId,
                                City = a.tblCity.City,
                                State = a.tblCity.tblState.Id,
                                Country = a.tblCity.tblState.tblCountry.Id,
                                a.Zip,
                                a.IsActive,
                                a.AddedBY,
                                a.AddedOn,
                                a.LastUpBy,
                                a.LastUpOn,
                                a.DelStatus,
                                DefaultContact = from d in a.tblMasterLocationContacts
                                                 where d.IsDefault == true && d.IsActive == true
                                                 select new
                                                 {
                                                     d.tblUser.FirstName,
                                                     d.tblUser.LastName
                                                 },

                                LocationContact = from b in a.tblMasterLocationContacts
                                                  select new
                                                  {
                                                      b.Id,
                                                      b.EmployeeId,
                                                      b.LocationId,
                                                      b.IsDefault,
                                                      b.IsActive,
                                                      b.tblUser
                                                  }
                                //Buffer = (from b in db.tblLocationBinBuffers.AsNoTracking()
                                //          group b by b.lngItemId into g
                                //          select new
                                //          {
                                //              ItemId = g.Select(b => b.lngItemId),
                                //              TotalBuffer = g.Sum(b => b.Buffer)

                                //          })

                            };
            return Ok(Locations);
        }

        [ResponseType(typeof(tblMasterLocation))]
        public IHttpActionResult PostLocation(tblMasterLocation Location)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Location.AddedOn = DateTime.Now;
            Location.DelStatus = false;
            foreach (tblMasterLocationContact contact in Location.tblMasterLocationContacts)
            {
                if (contact.Id == 0)
                {
                    db.Entry(contact).State = EntityState.Added;
                }
                else
                {
                    db.Entry(contact).State = EntityState.Modified;
                }
            }

            db.tblMasterLocations.Add(Location);
            db.SaveChanges();
            Location.Identifier = "LOC" + Location.Id;
            db.Entry(Location).State = EntityState.Modified;
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = Location.Id }, Location);
        }

        public IHttpActionResult PutLocation(int id, tblMasterLocation Location)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != Location.Id)
            {
                return BadRequest();
            }
            foreach (tblMasterLocationContact contact in Location.tblMasterLocationContacts)
            {
                if (contact.Id == 0)
                {
                    db.Entry(contact).State = EntityState.Added;
                }
                else
                {
                    db.Entry(contact).State = EntityState.Modified;
                }
            }
            db.Entry(Location).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LocationExists(id))
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
        private bool LocationExists(int id)
        {
            return db.tblMasterLocations.Count(e => e.Id == id) > 0;
        }

        public IHttpActionResult GetAllCity()
        {
            var Locations = from a in db.tblCities.AsNoTracking()
                            .Where(a => a.StateId == 2181)
                            .OrderBy(a => a.Identifier)
                            select new
                            {
                                a.Id,
                                a.Identifier,
                                a.City,
                                a.StateId
                            };
            return Ok(Locations);
        }

        public IHttpActionResult GetAllUser()
        {
            var Users = from a in db.tblUsers.AsNoTracking().OrderBy(a => a.FirstName)

                        select new
                        {
                            a.Id,
                            a.FirstName,
                            a.MiddleName,
                            a.LastName,
                            a.Designation,
                            a.Cell1,
                            a.Cell2,
                            a.AddressLine1,
                            a.AddressLine2,
                            a.Photo
                        };
            return Ok(Users);
        }

        public IHttpActionResult GetAllLocationContact(int LocationId)
        {
            if (LocationId > 0)
            {
                var LocationContacts = from a in db.tblMasterLocationContacts.AsNoTracking()
                                        .Where(a => a.LocationId == LocationId)
                                        .OrderBy(a => a.LocationId)
                                       select new
                                       {
                                           a.Id,
                                           a.EmployeeId,
                                           a.LocationId,
                                           a.IsActive,
                                           a.IsDefault,
                                           Employee = a.tblUser
                                       };
                return Ok(LocationContacts);
            }
            else
            {
                var LocationContacts = from a in db.tblMasterLocationContacts.AsNoTracking()
                                       .OrderBy(a => a.LocationId)
                                       select new
                                       {
                                           a.Id,
                                           a.EmployeeId,
                                           a.LocationId,
                                           a.IsActive,
                                           a.IsDefault,
                                           Employee = a.tblUser
                                       };
                return Ok(LocationContacts);
            }
        }

        public IHttpActionResult GetLocationContactDetails(int LocationId)
        {
            if (LocationId > 0)
            {
                var LocationContacts = from a in db.tblMasterLocationContacts.AsNoTracking()
                                        .Where(a => a.LocationId == LocationId)
                                        .OrderBy(a => a.LocationId)
                                       select new
                                       {
                                           a.Id,
                                           a.EmployeeId,
                                           a.LocationId,
                                           a.IsActive,
                                           a.IsDefault,
                                           Employee = a.tblUser
                                       };
                return Ok(LocationContacts);
            }
            else
            {
                var LocationContacts = from a in db.tblMasterLocationContacts.AsNoTracking()
                                       .OrderBy(a => a.LocationId)
                                       select new
                                       {
                                           a.Id,
                                           a.EmployeeId,
                                           a.LocationId,
                                           a.IsActive,
                                           a.IsDefault,
                                           Employee = a.tblUser
                                       };
                return Ok(LocationContacts);
            }
        }

        #endregion

        #region BinMaster
        public IHttpActionResult GetAllBin()
        {
            var Bins = from a in db.tblMasterBins.AsNoTracking().OrderBy(a => a.BinIdentifier)
                       select new
                       {
                           a.Id,
                           a.BinIdentifier,
                           a.BinDescription,
                           a.LocationId,
                           a.IsActive,
                           a.BinCapacity,
                           a.AddedBY,
                           a.AddedOn,
                           a.LastUpBy,
                           a.LastUpOn,
                           a.DelStatus,
                           Location = a.tblMasterLocation.Name
                       };
            return Ok(Bins);
        }

        [ResponseType(typeof(tblMasterBin))]
        public IHttpActionResult PostBin(tblMasterBin Bin)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Bin.AddedOn = DateTime.Now;
            Bin.DelStatus = false;
            db.tblMasterBins.Add(Bin);
            db.SaveChanges();


            return CreatedAtRoute("DefaultApi", new { id = Bin.Id }, Bin);
        }

        public IHttpActionResult PutBin(int id, tblMasterBin Bin)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != Bin.Id)
            {
                return BadRequest();
            }

            db.Entry(Bin).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BinExists(id))
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
        private bool BinExists(int id)
        {
            return db.tblMasterBins.Count(e => e.Id == id) > 0;
        }

        public IHttpActionResult GetAllLocationForBin()
        {
            var Locations = from a in db.tblMasterLocations.AsNoTracking().OrderBy(a => a.Name)
                            where a.IsActive == true
                            select new
                            {
                                a.Id,
                                a.Identifier,
                                a.Name,
                                a.Description
                            };
            return Ok(Locations);
        }

        #endregion

        #region ItemCategory
        public IHttpActionResult GetAllItemCategory()
        {
            var ItemCategorys = from a in db.tblMasterItemCategories.AsNoTracking().OrderBy(a => a.Code)
                                select new
                                {
                                    a.Id,
                                    a.Code,
                                    a.Description,
                                    a.DelStatus,
                                    a.AddedBy,
                                    a.AddedOn,
                                    a.LastUpBy,
                                    a.LastUpOn
                                };
            return Ok(ItemCategorys);
        }

        [ResponseType(typeof(tblMasterItemCategory))]
        public IHttpActionResult PostItemCategory(tblMasterItemCategory ItemCategory)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            ItemCategory.AddedOn = DateTime.Now;
            ItemCategory.DelStatus = false;
            db.tblMasterItemCategories.Add(ItemCategory);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = ItemCategory.Id }, ItemCategory);
        }

        public IHttpActionResult PutItemCategory(int id, tblMasterItemCategory ItemCategory)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != ItemCategory.Id)
            {
                return BadRequest();
            }

            db.Entry(ItemCategory).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemCategoryExists(id))
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
        private bool ItemCategoryExists(int id)
        {
            return db.tblMasterItemCategories.Count(e => e.Id == id) > 0;
        }

        #endregion

        #region CustomerSupplierTypeMaster
        public IHttpActionResult GetAllCustomerSupplierType()
        {
            var UOMs = from a in db.tblMasterCustomerSupplierTypes.AsNoTracking().OrderBy(a => a.Identifier)
                       select new
                       {
                           a.Id,
                           a.Identifier,
                           a.Description,
                           a.DelStatus,
                           a.AddedBy,
                           a.AddedOn,
                           a.LastUpBy,
                           a.LastUpOn
                       };
            return Ok(UOMs);
        }

        [ResponseType(typeof(tblMasterCustomerSupplierType))]
        public IHttpActionResult PostCustomerSupplierType(tblMasterCustomerSupplierType customerSupplierType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (customerSupplierType.AddedBy == null || customerSupplierType.AddedBy < 0)
            {
                customerSupplierType.AddedBy = -1;
            }
            customerSupplierType.AddedOn = DateTime.Now;
            customerSupplierType.LastUpBy = -1;
            customerSupplierType.LastUpOn = null;
            customerSupplierType.DelStatus = false;
            db.tblMasterCustomerSupplierTypes.Add(customerSupplierType);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = customerSupplierType.Id }, customerSupplierType);
        }

        public IHttpActionResult PutcustomerSupplierType(int id, tblMasterCustomerSupplierType customerSupplierType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != customerSupplierType.Id)
            {
                return BadRequest();
            }
            if (customerSupplierType.LastUpBy == null || customerSupplierType.LastUpBy < 0)
            {
                customerSupplierType.LastUpBy = -1;
            }
            customerSupplierType.LastUpOn = DateTime.Now;
            db.Entry(customerSupplierType).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerSupplierTypeExists(id))
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
        private bool CustomerSupplierTypeExists(int id)
        {
            return db.tblMasterCustomerSupplierTypes.Count(e => e.Id == id) > 0;
        }

        #endregion

        #region CustomerMaster
        public IHttpActionResult GetAllCustomer()
        {
            var Customers = from a in db.tblMasterCustomers.AsNoTracking().OrderBy(a => a.LegalName)
                            orderby a.Id
                            select new
                            {
                                a.Id,
                                a.Identifier,
                                a.Name,
                                a.LegalName,
                                a.CustomerType,
                                a.AddressLine1,
                                a.AddressLine2,
                                a.City,
                                a.State,
                                a.Country,
                                a.Zip,
                                a.Phone,
                                a.Mobile1,
                                a.Mobile2,
                                a.Fax,
                                a.Email,
                                a.TINNumber,
                                a.ShippingAddressLine1,
                                a.ShippingAddressLine2,
                                a.ShippingCity,
                                a.ShippingState,
                                a.ShippingCountry,
                                a.ShippingZip,
                                a.LicenceNumber,
                                CustomerContact = a.tblMasterCustomerContacts.Where(b => b.IsDefault == true),
                                Contacts = a.tblMasterCustomerContacts,
                                CityInfo = a.tblCity,
                                StateInfo = a.tblState,
                                CountryInfo = a.tblCountry,
                                ShippingCityInfo = a.tblCity1
                            };
            return Ok(Customers);
        }

        [ResponseType(typeof(tblMasterCustomer))]
        public IHttpActionResult PostCustomer(tblMasterCustomer customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (customer.AddedBy == null || customer.AddedBy < 0)
            {
                customer.AddedBy = -1;
            }
            customer.AddedOn = DateTime.Now;
            customer.LastUpBy = -1;
            customer.LastUpOn = null;
            customer.DelStatus = false;
            using (var dbContextTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    foreach (tblMasterCustomerContact contact in customer.tblMasterCustomerContacts)
                    {
                        if (contact.Id == 0)
                        {
                            db.Entry(contact).State = EntityState.Added;
                        }
                        else
                        {
                            db.Entry(contact).State = EntityState.Modified;
                        }
                    }
                    db.tblMasterCustomers.Add(customer);
                    db.SaveChanges();
                    customer.Identifier = "CUST" + customer.Id;
                    db.Entry(customer).State = EntityState.Modified;
                    db.SaveChanges();
                    dbContextTransaction.Commit();
                    return CreatedAtRoute("DefaultApi", new { id = customer.Id }, customer);
                }
                catch (Exception ex)
                {
                    dbContextTransaction.Rollback();
                    return NotFound();
                }
            }
        }

        public IHttpActionResult PutCustomer(int id, tblMasterCustomer customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != customer.Id)
            {
                return BadRequest();
            }
            foreach (tblMasterCustomerContact contact in customer.tblMasterCustomerContacts)
            {
                if (contact.Id == 0)
                {
                    db.Entry(contact).State = EntityState.Added;
                }
                else
                {
                    db.Entry(contact).State = EntityState.Modified;
                }
            }

            db.Entry(customer).State = EntityState.Modified;
            if (customer.LastUpBy == null || customer.LastUpBy < 0)
            {
                customer.LastUpBy = -1;
            }
            customer.LastUpOn = DateTime.Now;
            try
            {
                db.SaveChanges();
                return Ok(1);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            //return StatusCode(HttpStatusCode.NoContent);
        }
        private bool CustomerExists(int id)
        {
            return db.tblMasterCustomers.Count(e => e.Id == id) > 0;
        }

        #endregion

        #region BOMOperationMaster
        public IHttpActionResult GetAllBOMOperation()
        {
            var UOMs = from a in db.tblMasterBOMOperations.AsNoTracking().OrderBy(a => a.strOperation)
                       select new
                       {
                           a.lngId,
                           a.strOperation,
                           a.Description,
                           a.intUnit,
                           a.DelStatus,
                           a.AddedBy,
                           a.AddedOn,
                           a.LastUpBy,
                           a.LastUpOn,
                           a.tblMasterUnitOfMeasure
                       };
            return Ok(UOMs);
        }

        [ResponseType(typeof(tblMasterBOMOperation))]
        public IHttpActionResult PostBOMOperation(tblMasterBOMOperation operation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (operation.AddedBy == null || operation.AddedBy < 0)
            {
                operation.AddedBy = -1;
            }
            operation.AddedOn = DateTime.Now;
            operation.LastUpBy = -1;
            operation.LastUpOn = null;
            operation.DelStatus = false;
            db.tblMasterBOMOperations.Add(operation);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = operation.lngId }, operation);
        }

        public IHttpActionResult PutBOMOperation(int id, tblMasterBOMOperation operation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != operation.lngId)
            {
                return BadRequest();
            }
            if (operation.LastUpBy == null || operation.LastUpBy < 0)
            {
                operation.LastUpBy = -1;
            }
            operation.LastUpOn = DateTime.Now;
            db.Entry(operation).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BOMOperationExists(id))
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


        private bool BOMOperationExists(int id)
        {
            return db.tblMasterBOMOperations.Count(e => e.lngId == id) > 0;
        }

        #endregion
        #region BOMLevelMaster
        public IHttpActionResult GetAllBOMLevel()
        {
            var UOMs = from a in db.tblMasterBOMLevels.AsNoTracking().OrderBy(a => a.Identifier)
                       select new
                       {
                           a.lngId,
                           a.Identifier,
                           a.Description,
                           a.DelStatus,
                           a.AddedBy,
                           a.AddedOn,
                           a.LastUpBy,
                           a.LastUpOn
                       };
            return Ok(UOMs);
        }

        [ResponseType(typeof(tblMasterBOMLevel))]
        public IHttpActionResult PostBOMLevel(tblMasterBOMLevel level)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (level.AddedBy == null || level.AddedBy < 0)
            {
                level.AddedBy = -1;
            }
            level.AddedOn = DateTime.Now;
            level.LastUpBy = -1;
            level.LastUpOn = null;
            level.DelStatus = false;
            db.tblMasterBOMLevels.Add(level);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = level.lngId }, level);
        }

        public IHttpActionResult PutBOMLevel(int id, tblMasterBOMLevel level)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != level.lngId)
            {
                return BadRequest();
            }
            if (level.LastUpBy == null || level.LastUpBy < 0)
            {
                level.LastUpBy = -1;
            }
            level.LastUpOn = DateTime.Now;
            db.Entry(level).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BOMLevelExists(id))
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
        private bool BOMLevelExists(int id)
        {
            return db.tblMasterBOMLevels.Count(e => e.lngId == id) > 0;
        }

        #endregion
        #region BOMOperationMaterials
        public IHttpActionResult GetAllBOMOperationMaterial()
        {
            var operationsMaterials = from a in db.tblBillOfMaterials.AsNoTracking()
                                      select new
                                      {
                                          a.lngId,
                                          a.strBOMNumber,
                                          a.lngItemId,
                                          a.strBOMDescription,
                                          a.strVersion,
                                          a.decBatchQty,
                                          a.intDiagramId,
                                          a.intDrawingNo,
                                          a.intLastUpBy,
                                          a.datLastUpOn,
                                          a.intCreatedBy,
                                          a.datCreatedOn,
                                          a.intApprovedBy,
                                          a.datApprovedOn,
                                          a.boolDelStatus,
                                          a.tblMasterItem,
                                          tblBillOfMaterialDetails = from b in a.tblBillOfMaterialDetails
                                                                     select new
                                                                     {
                                                                         b.lngId,
                                                                         b.lngBOMId,
                                                                         b.lngItemId,
                                                                         b.lngQuantity,
                                                                         b.lngLevelId,
                                                                         b.strNote,
                                                                         b.tblMasterBOMLevel,
                                                                         b.tblMasterItem,
                                                                         b.tblMasterItem.tblMasterUnitOfMeasure,
                                                                         tblMasterDrawings = b.tblMasterItem.tblMasterDrawings.Where(c => c.Active == true)
                                                                     },
                                          tblBOMOperations = from d in a.tblBOMOperations
                                                             select new
                                                             {
                                                                 d.lngId,
                                                                 d.lngOperationId,
                                                                 d.lngBOMId,
                                                                 d.decValue,
                                                                 d.tblMasterBOMOperation.tblMasterUnitOfMeasure
                                                             },
                                          a.tblMasterDrawing,
                                          a.tblMasterItem.tblMasterUnitOfMeasure,
                                          created = a.tblUser.FirstName + " " + a.tblUser.LastName,
                                          approved = a.tblUser1.FirstName + " " + a.tblUser1.LastName,
                                          a.lngDocStatus
                                      };
            return Ok(operationsMaterials);
        }
        public IHttpActionResult GetOperationsMaterialByItemId(int itemId)
        {
            var bom = from a in db.tblBillOfMaterials.AsNoTracking()
                      .Where(d => d.lngItemId == itemId && d.boolDelStatus == false)
                      select new
                      {
                          a.lngId,
                          a.strBOMNumber,
                          a.lngItemId,
                          a.strBOMDescription,
                          a.strVersion,
                          a.decBatchQty,
                          a.intDiagramId,
                          a.intDrawingNo,
                          a.intLastUpBy,
                          a.datLastUpOn,
                          a.intCreatedBy,
                          a.datCreatedOn,
                          a.intApprovedBy,
                          a.datApprovedOn,
                          a.boolDelStatus,
                          a.tblMasterItem,
                          a.tblMasterItem.tblMasterDrawings,
                          tblBillOfMaterialDetails = from b in a.tblBillOfMaterialDetails
                                                     select new
                                                     {
                                                         b.lngId,
                                                         b.lngBOMId,
                                                         b.lngItemId,
                                                         b.lngQuantity,
                                                         b.lngLevelId,
                                                         b.strNote,
                                                         b.tblMasterBOMLevel,
                                                         b.tblMasterItem,
                                                         b.tblMasterItem.tblMasterUnitOfMeasure,
                                                         tblMasterDrawings = b.tblMasterItem.tblMasterDrawings
                                                                        .Where(c => c.Active == true)
                                                     },
                          a.lngDocStatus
                      };
            return Ok(bom);

        }
        public IHttpActionResult PostBOMOperationMaterial(tblBillOfMaterial operationsMaterial)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            foreach (tblBillOfMaterialDetail bomdetail in operationsMaterial.tblBillOfMaterialDetails)
            {
                if (bomdetail.lngId == 0)
                {
                    db.Entry(bomdetail).State = EntityState.Added;
                }
                else
                {
                    db.Entry(bomdetail).State = EntityState.Modified;
                }
            }

            foreach (tblBOMOperation bomOperation in operationsMaterial.tblBOMOperations)
            {
                if (bomOperation.lngId == 0)
                {
                    db.Entry(bomOperation).State = EntityState.Added;
                }
                else
                {
                    db.Entry(bomOperation).State = EntityState.Modified;
                }
            }


            bool isEdit = false;
            if (operationsMaterial.lngId > 0)
            {
                //if (operationsMaterial.intCreatedBy == null || operationsMaterial.intCreatedBy < 0)
                //{
                //operationsMaterial.intCreatedBy = -1;
                //}
                operationsMaterial.datCreatedOn = DateTime.Now;
                //operationsMaterial.intLastUpBy = -1;
                operationsMaterial.datLastUpOn = null;
                operationsMaterial.boolDelStatus = false;
                isEdit = true;
                db.Entry(operationsMaterial).State = EntityState.Modified;
            }
            else
            {
                isEdit = false;
                if (operationsMaterial.intLastUpBy == null || operationsMaterial.intLastUpBy < 0)
                {
                    operationsMaterial.intLastUpBy = -1;
                }
                operationsMaterial.datLastUpOn = DateTime.Now;
                db.Entry(operationsMaterial).State = EntityState.Added;
            }
            using (var dbContextTransaction = db.Database.BeginTransaction())
            {
                try
                {

                    if (isEdit == true)
                    {
                        db.SaveChanges();
                        dbContextTransaction.Commit();
                        return CreatedAtRoute("DefaultApi", new { id = operationsMaterial.lngId }, operationsMaterial);
                        //return Ok(2);
                    }
                    else
                    {
                        db.SaveChanges();
                        operationsMaterial.strBOMNumber = "BOM" + operationsMaterial.lngId;
                        db.Entry(operationsMaterial).State = EntityState.Modified;
                        db.SaveChanges();
                        dbContextTransaction.Commit();
                        return CreatedAtRoute("DefaultApi", new { id = operationsMaterial.lngId }, operationsMaterial);
                    }
                }
                catch (DbUpdateConcurrencyException)
                {
                    dbContextTransaction.Rollback();
                    return NotFound();
                }
            }
        }
        public IHttpActionResult PutBOMOperationMaterialStatus(int lngId, tblBillOfMaterial operationsMaterial)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (lngId != operationsMaterial.lngId)
            {
                return BadRequest();
            }
            if (operationsMaterial.lngDocStatus == 3)
            {
                operationsMaterial.datApprovedOn = DateTime.Now;
            }
            db.Entry(operationsMaterial).State = EntityState.Modified;
            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        #endregion

        #region EmployeeMaster
        public IHttpActionResult GetAllEmployee()
        {
            var Employees = from a in db.tblUsers.AsNoTracking().OrderBy(a => a.FirstName)
                            orderby a.Id
                            select new
                            {
                                a.Id,
                                a.Identifier,
                                a.FirstName,
                                a.MiddleName,
                                a.LastName,
                                a.DOB,
                                a.Gender,
                                a.MarritalStatus,
                                a.Designation,
                                a.AddressLine1,
                                a.AddressLine2,
                                a.CityId,
                                a.ZIP,
                                a.Cell1,
                                a.Cell2,
                                a.Phone,
                                a.Email,
                                a.Photo,
                                a.AddedBy,
                                a.AddedOn,
                                a.LastUpBy,
                                a.LastUpOn,
                                CityInfo = a.tblCity
                            };
            return Ok(Employees);
        }

        [ResponseType(typeof(tblUser))]
        public IHttpActionResult PostEmployee(tblUser Employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (Employee.AddedBy == null || Employee.AddedBy < 0)
            {
                Employee.AddedBy = -1;
            }
            Employee.AddedOn = DateTime.Now;
            Employee.LastUpBy = -1;
            Employee.LastUpOn = null;
            Employee.DelStatus = false;
            using (var dbContextTransaction = db.Database.BeginTransaction())
            {
                try
                {

                    db.tblUsers.Add(Employee);
                    db.SaveChanges();
                    Employee.Identifier = "EMP" + Employee.Id;
                    db.Entry(Employee).State = EntityState.Modified;
                    db.SaveChanges();
                    dbContextTransaction.Commit();
                    return CreatedAtRoute("DefaultApi", new { id = Employee.Id }, Employee);
                }
                catch (Exception ex)
                {
                    dbContextTransaction.Rollback();
                    return NotFound();
                }
            }
        }

        public IHttpActionResult PutEmployee(int id, tblUser Employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != Employee.Id)
            {
                return BadRequest();
            }

            db.Entry(Employee).State = EntityState.Modified;
            if (Employee.LastUpBy == null || Employee.LastUpBy < 0)
            {
                Employee.LastUpBy = -1;
            }
            Employee.LastUpOn = DateTime.Now;
            try
            {
                db.SaveChanges();
                return Ok(1);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            //return StatusCode(HttpStatusCode.NoContent);
        }
        private bool EmployeeExists(int id)
        {
            return db.tblUsers.Count(e => e.Id == id) > 0;
        }

        #endregion

        public string GetServerDateTime() //get date by server
        {
            DateTime dt = db.Database.SqlQuery<DateTime>("Select GetDate()").FirstOrDefault<DateTime>();
            string vardate = dt.ToString("dd/MM/yyyy HH:mm");
            return vardate;
        }

        #region Indent
        public IHttpActionResult GetAllIndent()
        {
            var Indents = from a in db.tblIndents.AsNoTracking().OrderBy(a => a.strIndentNumber)
                          select new
                          {
                              a.lngId,
                              a.strIndentNumber,
                              a.datIndentDate,
                              a.strReference,
                              a.datReferenceDate,
                              a.strIndentDescription,
                              a.lngDepartmentId,
                              a.intAddedBy,
                              AddedBy = a.tblUser.FirstName + a.tblUser.LastName, //tblUser is for Added By
                              a.intApprovedBy,
                              ApprovedBy = a.tblUser1.FirstName + a.tblUser.LastName, //tbluser1 is for approved by 
                              a.intIndentStatus,
                              a.AddedOn,
                              a.lngDocStatus,
                              // Pull Detail table records
                              tblIndentItems = from b in a.tblIndentItems
                                               select new
                                               {
                                                   b.lngId,
                                                   b.lngIndentId,
                                                   strIndentNumber=a.strIndentNumber,
                                                   b.lngItemId,
                                                   b.intQty,
                                                   b.strNote,
                                                   b.datExpected,
                                                   b.tblMasterItem,
                                                   b.tblMasterItem.tblMasterUnitOfMeasure,
                                                   b.intReceivedQty,
                                                   b.intPOQty
                                               },

                          };
            return Ok(Indents);
        }
        public IHttpActionResult GetAllIndentForPO()
        {
            var Indents = from a in db.tblIndents.AsNoTracking().OrderBy(a => a.strIndentNumber)
                          select new
                          {
                              a.lngId,
                              a.strIndentNumber,
                              a.datIndentDate,
                              a.strReference,
                              a.datReferenceDate,
                              a.strIndentDescription,
                              a.lngDepartmentId,
                              a.intAddedBy,
                              AddedBy = a.tblUser.FirstName + a.tblUser.LastName, //tblUser is for Added By
                              a.intApprovedBy,
                              ApprovedBy = a.tblUser1.FirstName + a.tblUser.LastName, //tbluser1 is for approved by 
                              a.intIndentStatus,
                              a.AddedOn,
                              a.lngDocStatus,
                              // Pull Detail table records
                              tblIndentItems = from b in a.tblIndentItems
                                               .Where(b => b.intprovisionalPOQuantity == null ? true : b.intQty < b.intprovisionalPOQuantity)
                                               select new
                                               {
                                                   b.lngId,
                                                   b.lngIndentId,
                                                   strIndentNumber = a.strIndentNumber,
                                                   b.lngItemId,
                                                   b.intQty,
                                                   b.strNote,
                                                   b.datExpected,
                                                   b.tblMasterItem,
                                                   b.tblMasterItem.tblMasterUnitOfMeasure,
                                                   b.intReceivedQty,
                                                   b.intPOQty,
                                                   b.intprovisionalPOQuantity 
                                               },
                                               a.tblMasterDepartment
                          };

            return Ok(Indents);
        }
        public IHttpActionResult PostIndent(tblIndent indent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            foreach (tblIndentItem indentitem in indent.tblIndentItems)
            {
                if (indentitem.lngId == 0)
                {
                    db.Entry(indentitem).State = EntityState.Added;
                }
                else
                {
                    db.Entry(indentitem).State = EntityState.Modified;
                }
            }


            bool isEdit = false;
            if (indent.lngId > 0)
            {

                isEdit = true;
                db.Entry(indent).State = EntityState.Modified;
            }
            else
            {
                isEdit = false;
                indent.lngDocStatus = 1;
                indent.intIndentStatus = 1;
                //  indent.datIndentDate = DateTime.Now;
                indent.intApprovedDate = Convert.ToDateTime("1900-01-01");
                db.Entry(indent).State = EntityState.Added;
            }
            using (var dbContextTransaction = db.Database.BeginTransaction())
            {
                try
                {

                    if (isEdit == true)
                    {
                        db.SaveChanges();
                        dbContextTransaction.Commit();
                        return CreatedAtRoute("DefaultApi", new { id = indent.lngId }, indent);
                        //return Ok(2);
                    }
                    else
                    {
                        try
                        {
                            indent.intAddedBy = 1;
                            db.SaveChanges();
                            indent.strIndentNumber = "IND" + indent.lngId;
                            db.Entry(indent).State = EntityState.Modified;
                            db.SaveChanges();
                            dbContextTransaction.Commit();
                        }
                        catch (DbEntityValidationException ex)
                        {
                            var errorMessages = ex.EntityValidationErrors
                                  .SelectMany(x => x.ValidationErrors)
                                  .Select(x => x.ErrorMessage);

                            // Join the list to a single string.
                            var fullErrorMessage = string.Join("; ", errorMessages);

                            // Combine the original exception message with the new one.
                            var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                            // Throw a new DbEntityValidationException with the improved exception message.
                            throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
                            dbContextTransaction.Rollback();

                        }

                        return CreatedAtRoute("DefaultApi", new { id = indent.lngId }, indent);
                    }
                }
                catch (DbUpdateConcurrencyException)
                {
                    dbContextTransaction.Rollback();
                    return NotFound();
                }
            }
        }

        public IHttpActionResult PutIndentStatus(int lngId, tblIndent indent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (lngId != indent.lngId)
            {
                return BadRequest();
            }
            if (indent.lngDocStatus == 3)
            {
                indent.intApprovedDate = DateTime.Now;
            }
            db.Entry(indent).State = EntityState.Modified;
            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IndentExists(lngId))
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
        private bool IndentExists(int lngId)
        {
            return db.tblIndents.Count(e => e.lngId == lngId) > 0;
        }
        #endregion

        #region Supplier
        public IHttpActionResult GetAllSupplier()
        {
            var Suppliers = from a in db.tblMasterSuppliers.AsNoTracking().OrderBy(a => a.Identifier)
                            select new
                            {
                                a.lngId,
                                a.Identifier,
                                a.VendorDescription,
                                a.AddedBY,
                                a.AddedOn,
                                a.LastUpBy,
                                a.LastUpOn,
                                a.DelStatus

                            };
            return Ok(Suppliers);
        }



        #endregion

        #region DocumentNumberingPattern
        public IHttpActionResult GetAllDocuments()
        {
            var Documents = from a in db.tblDocNumberingPattern.AsNoTracking()
                            where a.tblMenu.ParentId != 0
                            select new
                            {
                                a.lngId,
                                a.lngMenuId,
                                a.Length,
                                a.Prefix,
                                a.Suffix,
                                a.Seedvalue,
                                DocumentName = a.tblMenu.MenuName

                            };
            return Ok(Documents);
        }

        public IHttpActionResult PutDocuments(int id, tblDocNumberingPattern Documents)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != Documents.lngId)
            {
                return BadRequest();
            }

            db.Entry(Documents).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {

            }

            return StatusCode(HttpStatusCode.NoContent);
        }


        #endregion

        #region MachineLog
        public IHttpActionResult GetAllMachineLog()
        {
            var MachineLogs = from a in db.tblMachineLogs.AsNoTracking().OrderBy(a => a.strMachineName)
                              select new
                              {
                                  a.lngID,
                                  a.strMachineName,
                                  a.blnStatus,
                                  a.decSetTemp,
                                  a.decCurrentTemp,
                                  a.decFlowGPM,
                                  a.decCurrentKWUsage,
                                  a.datOperationDate

                              };
            return Ok(MachineLogs);
        }



        public IHttpActionResult PutMachineLog(int lngID, tblMachineLog machineLog)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (lngID != machineLog.lngID)
            {
                return BadRequest();
            }

            machineLog.datOperationDate = DateTime.Now;
            db.Entry(machineLog).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                //if (!UnitOfMeasureExists(id))
                //{
                //    return NotFound();
                //}
                //else
                //{
                //    throw;
                //}
            }

            return StatusCode(HttpStatusCode.NoContent);
        }


        #endregion

        //#region TempData
        //public IHttpActionResult GetAllTempData1()
        //{
        //    var TempData = from a in db.tmpTable1.AsNoTracking().OrderBy(a => a.strMachineName)
        //                      select new
        //                      {
        //                          a.lngID,
        //                          a.strMachineName,
        //                          a.decData1,
        //                          a.decData2,
        //                          a.decData3,
        //                          a.decData4
        //                      };
        //    return Ok(TempData);
        //}
        //#endregion

        //#region HeatMap
        //public IHttpActionResult GetAllHeatMap()
        //{
        //    var HeatMap = from a in db.tblHeatMaps.AsNoTracking().OrderBy(a => a.strBatchNo)
        //                   select new
        //                   {
        //                       a.lngID,
        //                       a.strBatchNo,
        //                       a.strMachineNo,
        //                       a.blnPump1Status,
        //                       a.blnPump2Status,
        //                       a.blnMotorStatus,
        //                       a.decZone1SetTemp,
        //                       a.decZone2SetTemp,
        //                       a.decZone3SetTemp,
        //                       a.decSetFlowGPM,
        //                       a.decZone1CurrentTemp,
        //                       a.decZone2CurrentTemp,
        //                       a.decZone3CurrentTemp,
        //                       a.decCurrentFlowGPM,
        //                       a.datOperationDate
        //                   };
        //    return Ok(HeatMap);
        //}
        //#endregion

        #region ColorCodes
        public IHttpActionResult GetAllColorCodes()
        {
            var ColorCodes = from a in db.tblColorCodes.AsNoTracking().OrderBy(a => a.Value)
                          select new
                          {
                             a.lngId, 
                             a.Value, 
                             a.HexCode, 
                             a.ObjId, 
                             a.FontColor
                          };
            return Ok(ColorCodes);
        }
        #endregion



        #region Temp Work Order
        //public IHttpActionResult GetAllTempWO()
        //{
        //    var TempWO = from a in db.tblTempWorkOrders.AsNoTracking().OrderBy(a => a.strWONumber)
        //                  select new
        //                  {
        //                      a.lngID,
        //                      a.strWONumber,
        //                      a.decBatchQty,
        //                      a.decProdQty,
        //                      a.Delay,
        //                      a.datUpdatedDate
        //                  };
        //    return Ok(TempWO);
        //}
        #endregion

    }
}

