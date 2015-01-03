using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Optimization;

namespace Projise.App_Infrastructure
{

    //Based on http://www.scottlogic.com/blog/2014/08/18/asp-angular-optimisation.html
    public class PartialsTransform : IBundleTransform
    {
        private readonly string _moduleName;
        public PartialsTransform(string moduleName)
        {
            _moduleName = moduleName;
        }

        public void Process(BundleContext context, BundleResponse response)
        {
            var strBundleResponse = new StringBuilder();
            // Javascript module for Angular that uses templateCache 
            strBundleResponse.AppendFormat(
                @"angular.module('{0}').run(['$templateCache',function(t){{",
                _moduleName);

            foreach (var file in response.Files)
            {
                string content;

                //Get content
                using (var stream = new StreamReader(file.VirtualFile.Open()))
                {
                    content = stream.ReadToEnd();
                }

                //Remove breaks and escape qoutes
                content = Regex.Replace(content, @"\r\n?|\n", "");
                content = content.Replace("'", "\\'");

                // Create insert statement with template
                strBundleResponse.AppendFormat(
                    @"t.put('{0}','{1}');", file.VirtualFile.VirtualPath.Substring(1), content);
            }
            strBundleResponse.Append(@"}]);");

            response.Files = new BundleFile[] { };
            response.Content = strBundleResponse.ToString();
            response.ContentType = "text/javascript";
        }
    }

    public class PartialsBundle : Bundle
    {
        public PartialsBundle(string moduleName, string virtualPath)
            : base(virtualPath, new[] { new PartialsTransform(moduleName) })
        {
        }
    }
}