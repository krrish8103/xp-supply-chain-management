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
    public class ProductionPlanController : ApiController
    {
        private PPCEntities db = new PPCEntities();
        #region ProductionPlan
        public IHttpActionResult GetAllProductionPlans()
        {
            var productionPlans = from a in db.tblProductionPlan.AsNoTracking()
                                      select new
                                      {
                                          a.lngId,
                                          a.lngDocStatus,
                                          a.lngSalesPlan, 
                                          a.strProdPlanNumber,
                                          a.datProdPlanDate,
                                          a.datPlanStartDate,
                                          a.datPlanEndDate,
                                          a.lngApprovedBy,
                                          a.datApprovedDate,
                                          a.lngCreatedBy,
                                          a.datCreatedDate,
                                          a.blnDeleted,
                                           
                                          tblProductionPlanDetails = from b in a.tblProductionPlanDetails     
                                                                select new
                                                                {
                                                                  b.lngId,
                                                                  b.lngProdPlanId ,
                                                                  b.lngItemId, 
                                                                  UOM = b.tblMasterItem.tblMasterUnitOfMeasure.UOMCode,
                                                                  b.Qty,
                                                                  b.Days,
                                                                  b.datStartDate,
                                                                  b.datEndDate,
                                                                  b.strNote 

                                                                },
                                                            
                                        
                                          CreatedBy = a.tblUser.LastName + " " + a.tblUser.FirstName,
                                          ApprovedBy = a.tblUser1.LastName + " " + a.tblUser1.FirstName,
                                      };
            return Ok(productionPlans);
        }
      
        #endregion
    }
}
