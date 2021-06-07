using System;
using System.Collections.Generic;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.Security.Claims;
using PPCAppDataModel;
namespace PPCApp.Controllers
{
    public class UserController : ApiController
    {
        private PPCEntities db = new PPCEntities();
        [HttpGet]
        [ResponseType(typeof(tblLoginInfo))]
        public IHttpActionResult GetLoginInfo(string uname, string pwd)
        {
            tblLoginInfo loginInfo = db.tblLoginInfoes.AsNoTracking()
                .Where(a => a.LoginName == uname && a.Password == pwd && a.DelStatus == false && a.IsActive == true).SingleOrDefault();
            if (loginInfo != null)
            {
                //var user = db.tblUsers
                //    .Include(a => a.tblLoginInfoes)
                //    .Where(a => a.Id == loginInfo.UserId).FirstOrDefault();
                var user = (from a in db.tblUsers.AsNoTracking()
                    .Where(a => a.Id == loginInfo.UserId)
                            select new
                            {
                                a.Id,a.FirstName,a.MiddleName,a.LastName,a.Designation,a.Cell1,a.Cell2,a.AddressLine1 , a.AddressLine2   ,a.Photo,
                                tblLoginInfo = (from b in a.tblLoginInfoes
                                                select new
                                               {
                                                   b.LoginId,
                                                   b.LoginName,
                                                   b.Email ,
                                                   b.LastLoginOn 
                                               }
                )
                            }).FirstOrDefault();
                if (user != null)
                {                    

                    return Ok(user);
                }
                else
                {
                    return Ok(1);
                }
            }
            else
            {
                return Ok(1);
            }
        }

        //[Authorize]
        //public IEnumerable<tblMenu> GetUserMenus(int LoginId)
        //{
        //    var roleMenu = db.tblRoleMenus
        //        .Include(a => a.tblRole.tblUserRoles.Any(b => b.LoginId == LoginId));
        //    List<tblMenu> menuList = new List<tblMenu>();
        //    foreach (var rm in roleMenu)
        //    {
        //        var menus = db.tblMenus.Where(a => a.Id == rm.MenuId).FirstOrDefault (); ;
        //        menuList.Add(menus);
        //    }
        //    return menuList.ToList();
            
        //}
        [HttpGet]
        public IEnumerable<tblMenu> GetUserMenus(int LoginId)
        {
            return db.tblMenus.AsNoTracking().OrderBy(a => a.MenuOrder).AsNoTracking().ToList();
                //.Where(o => o.Deleted == false && o.UserType == Type).ToList();
        }
    }
}
