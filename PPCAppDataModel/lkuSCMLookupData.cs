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
    
    public partial class lkuSCMLookupData
    {
        public int lngId { get; set; }
        public int lngLookupMasterId { get; set; }
        public string strCode { get; set; }
        public string strDescription { get; set; }
        public int intSequence { get; set; }
        public Nullable<bool> blnActive { get; set; }
    
        public virtual lkuSCMLookupMaster lkuSCMLookupMaster { get; set; }
    }
}