using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Text.RegularExpressions;

namespace PPCApp.HelperClasses
{
    public class JsonToDataTable
    {
        public DataTable JsonStringToDataTable(string jsonString)
        {
            DataTable dt = new DataTable();
            string[] jsonStringArray = Regex.Split(jsonString.Replace("[", "").Replace("]", ""), "},{");
            List<string> ColumnsName = new List<string>();
            foreach (string jSA in jsonStringArray)
            {
                string[] jsonStringData = Regex.Split(jSA.Replace("{", "").Replace("}", ""), ",");
                foreach (string ColumnsNameData in jsonStringData)
                {
                    try
                    {
                        int idx = ColumnsNameData.IndexOf(":");
                        string ColumnsNameString = ColumnsNameData.Substring(0, idx - 1).Replace("\"", "");
                        if (!ColumnsName.Contains(ColumnsNameString))
                        {
                            ColumnsName.Add(ColumnsNameString);
                        }
                    }
                    catch (Exception ex)
                    {
                        throw new Exception(string.Format("Error Parsing Column Name : {0}", ColumnsNameData));
                    }
                }
                break; // TODO: might not be correct. Was : Exit For
            }
            foreach (string AddColumnName in ColumnsName)
            {
                dt.Columns.Add(AddColumnName);
            }
            foreach (string jSA in jsonStringArray)
            {
                string[] RowData__1 = Regex.Split(jSA.Replace("{", "").Replace("}", ""), ",");
                DataRow nr = dt.NewRow();
                foreach (string rowData__2 in RowData__1)
                {
                    try
                    {
                        int idx = rowData__2.IndexOf(":");
                        string RowColumns = rowData__2.Substring(0, idx - 1).Replace("\"", "");
                        string RowDataString = rowData__2.Substring(idx + 1).Replace("\"", "");
                        nr[RowColumns] = HttpUtility.UrlDecode(RowDataString);
                    }
                    catch (Exception ex)
                    {
                        //Continue Try
                    }
                }
                dt.Rows.Add(nr);
            }
            return dt;
        }

    }
}