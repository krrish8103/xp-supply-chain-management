//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace PPCAppDataModel
{
    using System;
    using System.Collections.Generic;
    
    public partial class tblBillOfMaterialDetail
    {
        public int lngId { get; set; }
        public Nullable<int> lngBOMId { get; set; }
        public Nullable<int> lngItemId { get; set; }
        public Nullable<decimal> lngQuantity { get; set; }
        public Nullable<int> lngLevelId { get; set; }
        public string strNote { get; set; }
    
        public virtual tblBillOfMaterial tblBillOfMaterial { get; set; }
        public virtual tblMasterBOMLevel tblMasterBOMLevel { get; set; }
        public virtual tblMasterItem tblMasterItem { get; set; }
    }
}