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
    
    public partial class tblMasterBin
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tblMasterBin()
        {
            this.tblLocationBinBuffers = new HashSet<tblLocationBinBuffer>();
            this.tblStoreCreditDetails = new HashSet<tblStoreCreditDetails>();
            this.tblMaterialReturnDetails = new HashSet<tblMaterialReturnDetails>();
        }
    
        public int Id { get; set; }
        public string BinIdentifier { get; set; }
        public string BinDescription { get; set; }
        public Nullable<int> LocationId { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public string BinCapacity { get; set; }
        public Nullable<decimal> Buffer { get; set; }
        public Nullable<int> AddedBY { get; set; }
        public Nullable<System.DateTime> AddedOn { get; set; }
        public Nullable<int> LastUpBy { get; set; }
        public Nullable<System.DateTime> LastUpOn { get; set; }
        public Nullable<bool> DelStatus { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblLocationBinBuffer> tblLocationBinBuffers { get; set; }
        public virtual tblMasterBin tblMasterBin1 { get; set; }
        public virtual tblMasterBin tblMasterBin2 { get; set; }
        public virtual tblMasterLocation tblMasterLocation { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblStoreCreditDetails> tblStoreCreditDetails { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblMaterialReturnDetails> tblMaterialReturnDetails { get; set; }
    }
}