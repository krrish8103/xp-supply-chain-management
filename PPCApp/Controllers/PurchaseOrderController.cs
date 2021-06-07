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
    public class PurchaseOrderController : ApiController
    {
        private PPCEntities db = new PPCEntities();
        #region PurchaseOrder
        public IHttpActionResult GetAllPurchaseOrders()
        {
            var purchaseOrders = from a in db.tblPurchaseOrders.AsNoTracking()
                                 select new
                                 {
                                     a.lngId,
                                     a.lngDocStatus,
                                     a.lngQuoteId,
                                     a.lngContractId,
                                     a.lngSupplierId,
                                     a.strPONumber,
                                     a.datPODate,
                                     a.strNote,
                                     a.TaxAmount,
                                     a.Freight,
                                     a.Discount,
                                     a.OtherAmount,
                                     a.OtherAmountSpecify,
                                     a.TotalAmount,
                                     a.lngCreatedBy,
                                     a.datCreatedDate,
                                     a.lngApprovedBy,
                                     a.datApprovedBy,
                                     a.lngPurchaseStatus,
                                     a.blnDeleted,

                                     tblPurchaseOrderDetail = from b in a.tblPurchaseOrderDetails
                                                              select new
                                                              {
                                                                  b.lngId,
                                                                  b.lngPOId,
                                                                  b.lngItemId,
                                                                  b.OrderQty,
                                                                  b.Rate,
                                                                  b.Tax,
                                                                  b.Amount,
                                                                  b.lngQuoteId_Ref,
                                                                  b.lngContractId_Ref,
                                                                  b.lngPOId_Ref,
                                                                  b.strNote,
                                                                  b.datExpectedDate,
                                                                  b.lngDeliverySchedule,

                                                                  ItemName = b.tblMasterItem.ItemName

                                                              },
                                     a.tblMasterSupplier

                                 };
            return Ok(purchaseOrders);
        }
        public IHttpActionResult GetAllPurchaseOrdersFromTransactionId(string transactionId)
        {
            var purchaseOrders = from a in db.tblPurchaseOrders.AsNoTracking()
                                 .Where(a => a.TransactionId == transactionId)
                                 select new
                                 {
                                     a.lngId,
                                     a.lngDocStatus,
                                     a.lngQuoteId,
                                     a.lngContractId,
                                     a.lngSupplierId,
                                     a.strPONumber,
                                     a.datPODate,
                                     a.strNote,
                                     a.TaxAmount,
                                     a.Freight,
                                     a.Discount,
                                     a.OtherAmount,
                                     a.OtherAmountSpecify,
                                     a.TotalAmount,
                                     a.lngCreatedBy,
                                     a.datCreatedDate,
                                     a.lngApprovedBy,
                                     a.datApprovedBy,
                                     a.lngPurchaseStatus,
                                     a.blnDeleted,
                                     tblPurchaseOrderDetail = from b in a.tblPurchaseOrderDetails
                                                              select new
                                                              {
                                                                  b.lngId,
                                                                  b.lngPOId,
                                                                  b.lngItemId,
                                                                  b.OrderQty,
                                                                  b.Rate,
                                                                  b.Tax,
                                                                  b.Amount,
                                                                  b.lngQuoteId_Ref,
                                                                  b.lngContractId_Ref,
                                                                  b.lngPOId_Ref,
                                                                  b.strNote,
                                                                  b.datExpectedDate,
                                                                  b.lngDeliverySchedule,
                                                                  b.lngIndentId,
                                                                  IndentNumber=b.tblIndent.strIndentNumber,
                                                                  //QuotNumber=b.tblQ
                                                                  ItemName = b.tblMasterItem.ItemName

                                                              },
                                     a.tblMasterSupplier
                                 };
            return Ok(purchaseOrders);
        }
        //public IHttpActionResult PostPurchaseOrder(tblPurchaseOrder[] purchaseOrderList)
        //{
        //    string poTransactionId = DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString() + DateTime.Now.Day.ToString() + DateTime.Now.Hour.ToString() + DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() + DateTime.Now.Millisecond.ToString();           
        //    foreach (tblPurchaseOrder  purchaseOrder in purchaseOrderList)
        //    {
        //        foreach (tblPurchaseOrderDetail podetail in purchaseOrder.tblPurchaseOrderDetails)
        //        {
        //            var indentDetails = db.tblIndentItems.Where(a => a.lngIndentId == podetail.lngIndentId && a.lngItemId == podetail.lngItemId).FirstOrDefault();
        //            decimal? intPOQty = 0;
        //            if (indentDetails.intPOQty != null)
        //            {
        //                intPOQty = indentDetails.intPOQty;
        //            }
        //            if(podetail.datExpectedDate==null || podetail.datExpectedDate == Convert.ToDateTime("1/1/0001"))
        //            {
        //                podetail.datExpectedDate = Convert.ToDateTime("01/01/1900");
        //            }
        //            if (podetail.lngId < 1)
        //            {
        //                db.Entry(podetail).State = EntityState.Added;

        //                if (indentDetails.intQty > intPOQty) {
        //                    indentDetails.intPOQty = intPOQty + podetail.OrderQty;
        //                    db.Entry(indentDetails).State = EntityState.Modified;
        //                }
        //            }
        //            else
        //            {
        //                var poOrigionaldetail = db.tblPurchaseOrderDetails.Where(b => b.lngId == podetail.lngId).FirstOrDefault();
        //                db.Entry(podetail).State = EntityState.Modified;
        //                if (indentDetails.intQty > intPOQty)
        //                {
        //                    indentDetails.intPOQty = intPOQty + (podetail.OrderQty - poOrigionaldetail.OrderQty);
        //                    //if (poOrigionaldetail.OrderQty > podetail.OrderQty)
        //                    //{
        //                    //    indentDetails.intPOQty = indentDetails.intPOQty - podetail.OrderQty;
        //                    //}

        //                    indentDetails.intPOQty = intPOQty + podetail.OrderQty;
        //                    db.Entry(indentDetails).State = EntityState.Modified;
        //                }

        //            }
        //        }

        //        bool isEdit = false;
        //        if (purchaseOrder.lngId > 0)
        //        {
        //            purchaseOrder.lngLastUpBy = -1;
        //            purchaseOrder.datLastUpOn = DateTime.Now;
        //            purchaseOrder.blnDeleted = false;
        //            isEdit = true;
        //            db.Entry(purchaseOrder).State = EntityState.Modified;
        //        }
        //        else
        //        {
        //            isEdit = false;
        //            purchaseOrder.TransactionId = poTransactionId;
        //            purchaseOrder.datCreatedDate = DateTime.Now;
        //            if (purchaseOrder.lngLastUpBy == null || purchaseOrder.lngLastUpBy < 1)
        //            {
        //                purchaseOrder.lngLastUpBy = -1;
        //            }
        //            purchaseOrder.datLastUpOn = Convert.ToDateTime("1900-01-01");
        //            db.Entry(purchaseOrder).State = EntityState.Added;
        //        }
        //        using (var dbContextTransaction = db.Database.BeginTransaction())
        //        {
        //            try
        //            {
        //                if (isEdit == true)
        //                {
        //                    db.SaveChanges();
        //                    dbContextTransaction.Commit();
        //                    //return CreatedAtRoute("DefaultApi", new { id = purchaseOrder.lngId }, purchaseOrder);
        //                    //return Ok(2);
        //                }
        //                else
        //                {
        //                    db.SaveChanges();
        //                    purchaseOrder.strPONumber  = "PO" + purchaseOrder.lngId;
        //                    db.Entry(purchaseOrder).State = EntityState.Modified;
        //                    db.SaveChanges();
        //                    dbContextTransaction.Commit();
        //                    //return CreatedAtRoute("DefaultApi", new { id = purchaseOrder.lngId }, purchaseOrder);
        //                }
        //            }
        //            catch (DbEntityValidationException ex)
        //            {
        //                var errorMessages = ex.EntityValidationErrors
        //                .SelectMany(x => x.ValidationErrors)
        //                .Select(x => x.ErrorMessage);

        //                // Join the list to a single string.
        //                var fullErrorMessage = string.Join("; ", errorMessages);

        //                // Combine the original exception message with the new one.
        //                var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

        //                // Throw a new DbEntityValidationException with the improved exception message.
        //                throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
        //                dbContextTransaction.Rollback();
        //                return NotFound();
        //            }

        //        }
        //    }
        //    return Ok(poTransactionId);
        //}

        public IHttpActionResult PostPurchaseOrder(tblPurchaseOrder[] purchaseOrderList)
        {
            string poTransactionId = DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString() + DateTime.Now.Day.ToString() + DateTime.Now.Hour.ToString() + DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() + DateTime.Now.Millisecond.ToString();
            using (var dbContextTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    foreach (tblPurchaseOrder purchaseOrder in purchaseOrderList)
                    {
                        foreach (tblPurchaseOrderDetail podetail in purchaseOrder.tblPurchaseOrderDetails)
                        {
                            var indentDetails = db.tblIndentItems.Where(a => a.lngIndentId == podetail.lngIndentId && a.lngItemId == podetail.lngItemId).FirstOrDefault();
                            decimal? intPOQty = 0;
                            if (indentDetails.intPOQty != null)
                            {
                                intPOQty = indentDetails.intPOQty;
                            }
                            if (podetail.datExpectedDate == null || podetail.datExpectedDate == Convert.ToDateTime("1/1/0001"))
                            {
                                podetail.datExpectedDate = Convert.ToDateTime("01/01/1900");
                            }
                            if (podetail.lngId < 1)
                            {
                                db.Entry(podetail).State = EntityState.Added;

                                if (indentDetails.intQty > intPOQty)
                                {
                                    indentDetails.intPOQty = intPOQty + podetail.OrderQty;
                                    db.Entry(indentDetails).State = EntityState.Modified;
                                }
                            }
                            else
                            {
                                var poOrigionaldetail = db.tblPurchaseOrderDetails.Where(b => b.lngId == podetail.lngId).FirstOrDefault();
                                db.Entry(podetail).State = EntityState.Modified;
                                if (indentDetails.intQty > intPOQty)
                                {
                                    indentDetails.intPOQty = intPOQty + (podetail.OrderQty - poOrigionaldetail.OrderQty);
                                    //if (poOrigionaldetail.OrderQty > podetail.OrderQty)
                                    //{
                                    //    indentDetails.intPOQty = indentDetails.intPOQty - podetail.OrderQty;
                                    //}

                                    indentDetails.intPOQty = intPOQty + podetail.OrderQty;
                                    db.Entry(indentDetails).State = EntityState.Modified;
                                }

                            }
                        }

                        bool isEdit = false;
                        if (purchaseOrder.lngId > 0)
                        {
                            purchaseOrder.lngLastUpBy = -1;
                            purchaseOrder.datLastUpOn = DateTime.Now;
                            purchaseOrder.blnDeleted = false;
                            isEdit = true;
                            db.Entry(purchaseOrder).State = EntityState.Modified;
                        }
                        else
                        {
                            isEdit = false;
                            purchaseOrder.TransactionId = poTransactionId;
                            purchaseOrder.datCreatedDate = DateTime.Now;
                            if (purchaseOrder.lngLastUpBy == null || purchaseOrder.lngLastUpBy < 1)
                            {
                                purchaseOrder.lngLastUpBy = -1;
                            }
                            purchaseOrder.datLastUpOn = Convert.ToDateTime("1900-01-01");
                            db.Entry(purchaseOrder).State = EntityState.Added;
                        }

                        if (isEdit == true)
                        {
                            db.SaveChanges();
                        }
                        else
                        {
                            db.SaveChanges();
                            purchaseOrder.strPONumber = "PO" + purchaseOrder.lngId;
                            db.Entry(purchaseOrder).State = EntityState.Modified;
                            db.SaveChanges();
                        }
                    }
                    dbContextTransaction.Commit();
                    return Ok(poTransactionId);
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
                    return NotFound();
                }
            }
        }
        #endregion
    }
}
