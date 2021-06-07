using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using PPCApp;
using PPCAppDataModel;
namespace PPCApp.Providers
{
    public class AuthRepository : IDisposable
    {
        private PPCEntities   _ctx;

        private UserManager<IdentityUser> _userManager;

        public AuthRepository()
        {
            _ctx = new PPCEntities();
            _userManager = new UserManager<IdentityUser>(new UserStore<IdentityUser>(_ctx));
        }

        public tblClient FindClient(string clientId)
        {
            var client = _ctx.tblClients.Where(x => x.Name == clientId).SingleOrDefault();
            return client;
        }
        public tblLoginInfo FindUser(string userName, string password)
        {

            tblLoginInfo user = _ctx.tblLoginInfoes.Where(a => a.LoginName == userName && a.Password  == password && a.DelStatus == false).SingleOrDefault();
            return user;
        }
      

        public tblRefreshToken FindRefreshToken(string refreshTokenId)
        {
            tblRefreshToken refreshToekn = _ctx.tblRefreshTokens.Where(x => x.Id == refreshTokenId).SingleOrDefault();
            return refreshToekn;
        }
        public List<tblRefreshToken> GetAllRefreshToken()
        {
            return _ctx.tblRefreshTokens.ToList();
        }
        public bool AddRefreshToken(tblRefreshToken token)
        {
            var currentToken = _ctx.tblRefreshTokens.Where(r => r.Subject == token.Subject && r.ClientId == token.ClientId).SingleOrDefault();
            if (currentToken != null)
            {
                var result = RemoveRefreshToken(currentToken);
            }
            _ctx.tblRefreshTokens.Add(token);
            return _ctx.SaveChanges() > 0;
        }

        public bool RemoveRefreshToken(tblRefreshToken refreshToken)
        {
            _ctx.tblRefreshTokens.Remove(refreshToken);
            return _ctx.SaveChanges() > 0;
        }

        public bool RemoveRefreshToken(string refreshTokenId)
        {
            var refreshToken = _ctx.tblRefreshTokens.Where(r => r.Id == refreshTokenId).SingleOrDefault();
            if (refreshToken != null)
            {
                _ctx.tblRefreshTokens.Remove(refreshToken);
                return _ctx.SaveChanges() > 0;
            }
            return false;
        }
        public void Dispose()
        {
            _ctx.Dispose();

        }
    }
}