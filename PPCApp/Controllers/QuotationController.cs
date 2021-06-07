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
    public class QuotationController : ApiController
    {
        private PPCEntities db = new PPCEntities();
        #region Quotation
        public IHttpActionResult GetAllQuotation()
        {
            var quotations = from a in db.tblQuotations.AsNoTracking()
                             select new
                             {
                                 a.lngId,
                                 a.strQuotationNumber,
                                 a.datQuotationDate,
                                 a.lngSupplierId,
                                 a.tblMasterSupplier.VendorDescription,
                                 a.strNote,
                                 a.datQuoteValidity,
                                 a.TaxPercent,
                                 a.TaxAmount,
                                 a.DiscountPercent,
                                 a.DiscountAmount,
                                 a.TotalAmount,
                                 a.lngCreatedBy,
                                 a.datCreateDate,
                                 a.lngApprovedBy,
                                 a.datApprovedDate,
                                 tblQuotationDetails = from b in a.tblQuotationDetails
                                                       select new
                                                       {
                                                           b.lngId,
                                                           b.lngQuotationId,
                                                           b.lngItemId,
                                                           b.tblMasterItem,
                                                           b.tblMasterItem.tblMasterUnitOfMeasure,
                                                           b.Qty,
                                                           b.Rate,
                                                           b.TaxPercent,
                                                           b.TaxAmount,
                                                           b.DiscountPercent,
                                                           b.Discount,
                                                           b.Total,
                                                           b.strNote
                                                       }

                                 //created = a.tblUser.FirstName + " " + a.tblUser.LastName,
                                 //approved = a.tblUser1.FirstName + " " + a.tblUser1.LastName
                             };
            return Ok(quotations);
        }
        public IEnumerable<sprocGetQuotationsForPurchaseOrder_Result > GetQuotationForPurchaseOrder()
        {
            List<sprocGetQuotationsForPurchaseOrder_Result> quotations = new List<sprocGetQuotationsForPurchaseOrder_Result>();
            quotations = db.sprocGetQuotationsForPurchaseOrder().ToList();
            return quotations.ToList();
        }
        public IHttpActionResult PostQuotation(tblQuotation quotation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            foreach (tblQuotationDetail quotdetail in quotation.tblQuotationDetails)
            {
                if (quotdetail.lngId == 0)
                {
                    db.Entry(quotdetail).State = EntityState.Added;
                }
                else
                {
                    db.Entry(quotdetail).State = EntityState.Modified;
                }
            }


            bool isEdit = false;
            if (quotation.lngId > 0)
            {
                isEdit = true;
                db.Entry(quotation).State = EntityState.Modified;
            }
            else
            {
                isEdit = false;
                quotation.strQuotationNumber = "";
                //if (quotation.intLastUpBy == null || quotation.intLastUpBy < 0)
                //{
                //    quotation.intLastUpBy = -1;
                //}
                //quotation.datLastUpOn = DateTime.Now;
                db.Entry(quotation).State = EntityState.Added;
            }
            using (var dbContextTransaction = db.Database.BeginTransaction())
            {
                try
                {

                    if (isEdit == true)
                    {
                        db.SaveChanges();
                        dbContextTransaction.Commit();
                        return CreatedAtRoute("DefaultApi", new { id = quotation.lngId }, quotation);
                    }
                    else
                    {
                        try
                        {

                            db.SaveChanges();
                            quotation.strQuotationNumber = "QUOT" + quotation.lngId;
                            db.Entry(quotation).State = EntityState.Modified;
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
                        return CreatedAtRoute("DefaultApi", new { id = quotation.lngId }, quotation);
                    }
                }
                catch (DbUpdateConcurrencyException)
                {
                    dbContextTransaction.Rollback();
                    return NotFound();
                }
            }
        }
        #endregion
    }
}

