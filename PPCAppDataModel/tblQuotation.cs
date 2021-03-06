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
    
    public partial class tblQuotation
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tblQuotation()
        {
            this.tblQuotationDetails = new HashSet<tblQuotationDetail>();
        }
    
        public int lngId { get; set; }
        public string strQuotationNumber { get; set; }
        public System.DateTime datQuotationDate { get; set; }
        public int lngSupplierId { get; set; }
        public string strNote { get; set; }
        public Nullable<System.DateTime> datQuoteValidity { get; set; }
        public Nullable<decimal> TaxPercent { get; set; }
        public Nullable<decimal> TaxAmount { get; set; }
        public Nullable<decimal> DiscountPercent { get; set; }
        public Nullable<decimal> DiscountAmount { get; set; }
        public Nullable<decimal> TotalAmount { get; set; }
        public int lngCreatedBy { get; set; }
        public System.DateTime datCreateDate { get; set; }
        public Nullable<int> lngApprovedBy { get; set; }
        public Nullable<System.DateTime> datApprovedDate { get; set; }
    
        public virtual tblUser tblUser { get; set; }
        public virtual tblUser tblUser1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblQuotationDetail> tblQuotationDetails { get; set; }
        public virtual tblMasterSupplier tblMasterSupplier { get; set; }
    }
}
