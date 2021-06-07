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
    
    public partial class tblMasterLocation
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tblMasterLocation()
        {
            this.tblLocationBinBuffers = new HashSet<tblLocationBinBuffer>();
            this.tblMasterBins = new HashSet<tblMasterBin>();
            this.tblMasterLocationContacts = new HashSet<tblMasterLocationContact>();
        }
    
        public int Id { get; set; }
        public string Identifier { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public Nullable<int> CityId { get; set; }
        public string Zip { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<int> AddedBY { get; set; }
        public Nullable<System.DateTime> AddedOn { get; set; }
        public Nullable<int> LastUpBy { get; set; }
        public Nullable<System.DateTime> LastUpOn { get; set; }
        public Nullable<bool> DelStatus { get; set; }
    
        public virtual tblCity tblCity { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblLocationBinBuffer> tblLocationBinBuffers { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblMasterBin> tblMasterBins { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblMasterLocationContact> tblMasterLocationContacts { get; set; }
    }
}
