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
    
    public partial class tblQuotationDetail
    {
        public int lngId { get; set; }
        public int lngQuotationId { get; set; }
        public int lngItemId { get; set; }
        public decimal Rate { get; set; }
        public decimal Qty { get; set; }
        public Nullable<decimal> TaxPercent { get; set; }
        public Nullable<decimal> TaxAmount { get; set; }
        public Nullable<decimal> DiscountPercent { get; set; }
        public Nullable<decimal> Discount { get; set; }
        public Nullable<decimal> Total { get; set; }
        public string strNote { get; set; }
    
        public virtual tblMasterItem tblMasterItem { get; set; }
        public virtual tblQuotation tblQuotation { get; set; }
    }
}
