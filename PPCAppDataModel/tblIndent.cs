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
    
    public partial class tblIndent
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tblIndent()
        {
            this.tblIndentItems = new HashSet<tblIndentItem>();
            this.tblPurchaseOrderDetails = new HashSet<tblPurchaseOrderDetail>();
        }
    
        public int lngId { get; set; }
        public int lngDocStatus { get; set; }
        public string strIndentNumber { get; set; }
        public System.DateTime datIndentDate { get; set; }
        public string strIndentDescription { get; set; }
        public string strReference { get; set; }
        public Nullable<System.DateTime> datReferenceDate { get; set; }
        public int intAddedBy { get; set; }
        public System.DateTime AddedOn { get; set; }
        public int intIndentStatus { get; set; }
        public int lngDepartmentId { get; set; }
        public Nullable<int> intApprovedBy { get; set; }
        public Nullable<System.DateTime> intApprovedDate { get; set; }
        public bool blnDeleted { get; set; }
    
        public virtual tblMasterDepartment tblMasterDepartment { get; set; }
        public virtual tblUser tblUser { get; set; }
        public virtual tblUser tblUser1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblIndentItem> tblIndentItems { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblPurchaseOrderDetail> tblPurchaseOrderDetails { get; set; }
    }
}