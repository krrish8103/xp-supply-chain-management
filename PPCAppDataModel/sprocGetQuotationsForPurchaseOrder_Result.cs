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
    
    public partial class sprocGetQuotationsForPurchaseOrder_Result
    {
        public Nullable<int> lngId { get; set; }
        public string strQuotationNumber { get; set; }
        public Nullable<int> lngSupplierId { get; set; }
        public string strNote { get; set; }
        public Nullable<System.DateTime> datQuoteValidity { get; set; }
        public Nullable<decimal> TaxPercent { get; set; }
        public Nullable<decimal> TaxAmount { get; set; }
        public Nullable<decimal> DiscountPercent { get; set; }
        public Nullable<decimal> DiscountAmount { get; set; }
        public Nullable<decimal> TotalAmount { get; set; }
        public Nullable<int> intQuotationDetailsId { get; set; }
        public Nullable<int> lngItemId { get; set; }
        public Nullable<decimal> Rate { get; set; }
        public string SupplierName { get; set; }
    }
}
