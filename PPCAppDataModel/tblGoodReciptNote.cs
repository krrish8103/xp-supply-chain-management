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
    
    public partial class tblGoodReciptNote
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tblGoodReciptNote()
        {
            this.tblGoodReciptNoteDetail = new HashSet<tblGoodReciptNoteDetail>();
        }
    
        public int Id { get; set; }
        public int lngDocStatus { get; set; }
        public string strGRNNumber { get; set; }
        public System.DateTime datGRNDate { get; set; }
        public string GRNDescription { get; set; }
        public Nullable<System.DateTime> datCreatedDate { get; set; }
        public int lngCreatedBy { get; set; }
        public int lngApprovedBy { get; set; }
        public Nullable<System.DateTime> datApprovedDate { get; set; }
        public int PurchaseOrderNo { get; set; }
        public int DocumentTypeId { get; set; }
    
        public virtual tblUser tblUser { get; set; }
        public virtual tblUser tblUser1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblGoodReciptNoteDetail> tblGoodReciptNoteDetail { get; set; }
    }
}
