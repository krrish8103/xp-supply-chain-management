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
    public class StoresCreditNoteController : ApiController
    {
        private PPCEntities db = new PPCEntities();
        #region StoreCredit
        public IHttpActionResult GetAllStoreCreditNotes()
        {
            var storeCreditNotes = from a in  db.tblStoreCredit.AsNoTracking() 
                                  select new 
                                  {
                                      a.lngId,
                                      a.lngDocStatus,
                                      a.lngDepartmentId,
                                      a.strSCNNumber,
                                      a.datSCNDate,
                                      a.strNote,
                                      a.blnDeleted,
                                      Department = a.tblMasterDepartment.DepartmentDescription,
                                      tblStoreCreditDetails = from b in a.tblStoreCreditDetails 
                                                              select new
                                                              {
                                                                  b.lngId,
                                                                  b.lngStoreCreditId,
                                                                  b.lngWorkOrderId,
                                                                  b.lngItemId,
                                                                  b.Qty,
                                                                  b.lngBinId,
                                                                  b.strNote,
                                                                  ItemName = b.tblMasterItem.ItemName,
                                                                  BinName = b.tblMasterBin.BinIdentifier,
                                                                  WONumber = b.tblWorkOrder.strWONumber + " - " + b.tblWorkOrder.decBatchQty
                                                              },


                                      CreatedBy = a.tblUser.LastName + " " + a.tblUser.FirstName,
                                      ApprovedBy = a.tblUser1.LastName + " " + a.tblUser1.FirstName,
                                  };
            return Ok(storeCreditNotes);
        }

        #endregion
    }
}
