using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace Projise.App_Infrastructure
{
    //http://stackoverflow.com/questions/15574486/angular-against-asp-net-webapi-implement-csrf-on-the-server
    public class CSRFToken
    {
        private const string ConstantSalt = "s@Lt1ngA11T3hth1Ng5";

        public string GenerateCsrfTokenFromAuthToken(string authToken)
        {
            return GenerateCookieFriendlyHash(authToken);
        }

        public bool DoesCsrfTokenMatchAuthToken(string csrfToken, string authToken)
        {
            return csrfToken == GenerateCookieFriendlyHash(authToken);
        }

        private static string GenerateCookieFriendlyHash(string authToken)
        {
            using (var sha = SHA256.Create())
            {
                var computedHash = sha.ComputeHash(Encoding.Unicode.GetBytes(authToken + ConstantSalt));
                var cookieFriendlyHash = HttpServerUtility.UrlTokenEncode(computedHash);
                return cookieFriendlyHash;
            }
        }
    }
}