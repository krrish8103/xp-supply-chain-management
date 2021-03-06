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
    
    public partial class tblMenu
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tblMenu()
        {
            this.tblRoleMenus = new HashSet<tblRoleMenu>();
            this.tblDocNumberingPattern = new HashSet<tblDocNumberingPattern>();
        }
    
        public int Id { get; set; }
        public string MenuName { get; set; }
        public int ParentId { get; set; }
        public string Route { get; set; }
        public bool hasChildren { get; set; }
        public Nullable<decimal> MenuOrder { get; set; }
        public bool IsShow { get; set; }
        public Nullable<bool> IsLoginRequired { get; set; }
        public string MenuIcon { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblRoleMenu> tblRoleMenus { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblDocNumberingPattern> tblDocNumberingPattern { get; set; }
    }
}
