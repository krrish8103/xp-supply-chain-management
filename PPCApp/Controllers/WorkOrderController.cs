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
using PPCApp.HelperClasses;

namespace PPCApp.Controllers
{
    public class WorkOrderController : ApiController
    {
        private PPCEntities db = new PPCEntities();
        #region WorkOrder
        public IHttpActionResult GetAllWorkOrder()
        {
            var workOrders = from a in db.tblWorkOrders.AsNoTracking()
                                      select new
                                      {
                                          a.lngId,
                                          a.lngItemId,
                                          a.tblMasterItem,
                                          tblWorkOrderDetails = from b in a.tblWorkOrderDetails
                                                                select new
                                                                {
                                                                    b.lngId,
                                                                    b.lngWOId,
                                                                    b.lngItemId,
                                                                    b.tblMasterItem,
                                                                    b.lngQuantity,
                                                                    b.intPhase,
                                                                    b.strNote,
                                                                    b.tblMasterItem.tblMasterUnitOfMeasure,
                                                                    tblMasterDrawings = b.tblMasterItem.tblMasterDrawings.Where(c => c.Active == true)
                                                                },
                                          a.strWONumber,
                                          a.datExpectedDateOfCompletation,
                                          a.decBatchQty,
                                          a.tblMasterDepartment,
                                          a.intBOMId,
                                          a.tblBillOfMaterial.strBOMNumber,
                                          a.intProductionPlanId,
                                          a.intSalesForecastId,
                                          a.intCustomerOrderId,                                          
                                          a.strWODescription,
                                          a.intCreatedBy,
                                          a.datCreatedDate,
                                          a.intApprovedBy,
                                          a.datApprovedDate,
                                          a.intAssignedTo,
                                          a.datAssignedDate,
                                          a.intLastUpBy,
                                          a.datLastUpOn,
                                          a.boolDelStatus,                                          
                                          a.lngDocStatus,                                          
                                          a.tblMasterItem.tblMasterUnitOfMeasure,
                                          created = a.tblUser.FirstName + " " + a.tblUser.LastName,
                                          approved = a.tblUser1.FirstName + " " + a.tblUser1.LastName
                                      };
            return Ok(workOrders);
        }
        public IEnumerable<sprocGetSuggestionsToReleaseWorkOrder_Result> GetSuggestionsToReleaseWorkOrder(int itemId, decimal qty)
        {
            List<sprocGetSuggestionsToReleaseWorkOrder_Result> suggestion = new List<sprocGetSuggestionsToReleaseWorkOrder_Result>();
            suggestion = db.sprocGetSuggestionsToReleaseWorkOrder(qty, itemId).ToList();
            return suggestion.ToList();
        }

        public IHttpActionResult PostWorkOrder(tblWorkOrder workOrder)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            foreach (tblWorkOrderDetail wodetail in workOrder.tblWorkOrderDetails)
            {
                if (wodetail.lngId == 0)
                {
                    db.Entry(wodetail).State = EntityState.Added;
                }
                else
                {
                    db.Entry(wodetail).State = EntityState.Modified;
                }
            }


            bool isEdit = false;
            if (workOrder.lngId > 0)
            {                
                isEdit = true;
                workOrder.datLastUpOn = DateTime.Now;
                workOrder.boolDelStatus = false;
                db.Entry(workOrder).State = EntityState.Modified;
            }
            else
            {
                isEdit = false;
                if (workOrder.intLastUpBy == null || workOrder.intLastUpBy < 0)
                {
                    workOrder.datCreatedDate = DateTime.Now;
                    workOrder.datLastUpOn = null;                    
                    workOrder.boolDelStatus = false;
                    workOrder.lngDocStatus = 1;//1-Working Draft
                }
                workOrder.datLastUpOn = DateTime.Now;
                db.Entry(workOrder).State = EntityState.Added;
            }
            using (var dbContextTransaction = db.Database.BeginTransaction())
            {
                try
                {

                    if (isEdit == true)
                    {
                        db.SaveChanges();
                        dbContextTransaction.Commit();
                        return CreatedAtRoute("DefaultApi", new { id = workOrder.lngId }, workOrder);                        
                    }
                    else
                    {
                        db.SaveChanges();
                        workOrder.strWONumber = "WO" + workOrder.lngId;
                        db.Entry(workOrder).State = EntityState.Modified;
                        db.SaveChanges();
                        dbContextTransaction.Commit();
                        return CreatedAtRoute("DefaultApi", new { id = workOrder.lngId }, workOrder);
                    }
                }
                catch (DbUpdateConcurrencyException)
                {
                    dbContextTransaction.Rollback();
                    return NotFound();
                }
            }
        }

       
        public IHttpActionResult PutWorkOrderStatus(int lngId, tblWorkOrder workOrder)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (lngId != workOrder.lngId)
            {
                return BadRequest();
            }
            if (workOrder.lngDocStatus == 3)
            {
                workOrder.datApprovedDate = DateTime.Now;
            }
            db.Entry(workOrder).State = EntityState.Modified;
            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WorkOrderExists(lngId))
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
        private bool WorkOrderExists(int lngId)
        {
            return db.tblWorkOrders.Count(e => e.lngId == lngId) > 0;
        }
        #endregion
    }

    public class SaveWorkOrderStructure
    {
        public string releaseWorkOrderJSON { get; set; }
        //public int lngWODetailsId { get; set; }
        //public int lngWOID { get; set; }
        //public int lngItemId { get; set; }
        //public decimal totalIssueQty { get; set; }
        //public int lngLocationId { get; set; }
        //public decimal issueLocationQty { get; set; }
        //public int lngBinId { get; set; }
        //public decimal issueBinQty { get; set; }
        //public int lngGRNId { get; set; }

    }
}
