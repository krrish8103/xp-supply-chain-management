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
    
    public partial class tblMaterialRequisitionDetail
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tblMaterialRequisitionDetail()
        {
            this.tblTransaction = new HashSet<tblTransaction>();
        }
    
        public int lngId { get; set; }
        public int lngRequisitionId { get; set; }
        public int lngItemId { get; set; }
        public decimal Qty { get; set; }
        public string strNote { get; set; }
        public Nullable<int> lngWorkOrderId { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblTransaction> tblTransaction { get; set; }
        public virtual tblMasterItem tblMasterItem { get; set; }
        public virtual tblWorkOrder tblWorkOrder { get; set; }
    }
}
