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
    
    public partial class tblMasterCustomer
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tblMasterCustomer()
        {
            this.tblMasterCustomerContacts = new HashSet<tblMasterCustomerContact>();
        }
    
        public int Id { get; set; }
        public string Identifier { get; set; }
        public string LegalName { get; set; }
        public string Name { get; set; }
        public Nullable<int> CustomerType { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public Nullable<int> City { get; set; }
        public Nullable<int> State { get; set; }
        public Nullable<int> Country { get; set; }
        public string Zip { get; set; }
        public string Phone { get; set; }
        public string Mobile1 { get; set; }
        public string Mobile2 { get; set; }
        public string Fax { get; set; }
        public string Email { get; set; }
        public string TINNumber { get; set; }
        public string ShippingAddressLine1 { get; set; }
        public string ShippingAddressLine2 { get; set; }
        public Nullable<int> ShippingCity { get; set; }
        public Nullable<int> ShippingState { get; set; }
        public Nullable<int> ShippingCountry { get; set; }
        public string ShippingZip { get; set; }
        public string LicenceNumber { get; set; }
        public Nullable<int> AddedBy { get; set; }
        public Nullable<System.DateTime> AddedOn { get; set; }
        public Nullable<int> LastUpBy { get; set; }
        public Nullable<System.DateTime> LastUpOn { get; set; }
        public Nullable<bool> DelStatus { get; set; }
    
        public virtual tblCity tblCity { get; set; }
        public virtual tblCity tblCity1 { get; set; }
        public virtual tblCountry tblCountry { get; set; }
        public virtual tblCountry tblCountry1 { get; set; }
        public virtual tblMasterCustomerSupplierType tblMasterCustomerSupplierType { get; set; }
        public virtual tblState tblState { get; set; }
        public virtual tblState tblState1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblMasterCustomerContact> tblMasterCustomerContacts { get; set; }
    }
}