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
    
    public partial class spGetItems_Result
    {
        public Nullable<int> Id { get; set; }
        public string Identifier { get; set; }
        public string PartNumber { get; set; }
        public string ItemName { get; set; }
        public string ItemDescription { get; set; }
        public string ItemCategory { get; set; }
        public Nullable<decimal> MinStockLevel { get; set; }
        public Nullable<decimal> MaxStockLevel { get; set; }
        public string UOM { get; set; }
        public Nullable<decimal> Reprocurement { get; set; }
        public string ReprocurementUnit { get; set; }
        public Nullable<decimal> LeadTime { get; set; }
        public Nullable<int> AddedBy { get; set; }
        public Nullable<System.DateTime> AddedOn { get; set; }
        public Nullable<int> LastUpBy { get; set; }
        public Nullable<System.DateTime> LastUpOn { get; set; }
        public Nullable<bool> DelStatus { get; set; }
    }
}
