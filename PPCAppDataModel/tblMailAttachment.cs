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
    
    public partial class tblMailAttachment
    {
        public int lngId { get; set; }
        public Nullable<int> lngMailCommunicationId { get; set; }
        public byte[] Attachment { get; set; }
    
        public virtual tblMailCommnication tblMailCommnication { get; set; }
    }
}
