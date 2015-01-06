using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;

namespace Projise.App_Infrastructure
{
    public class ManifestResult : FileResult
    {
        public string Version { get; set; }
        public IEnumerable<string> Cache { get; set; }
        public IEnumerable<string> Network { get; set; }
        public Dictionary<string, string> Fallback { get; set; }
        public IEnumerable<string> Bundles { get; set; }
        public ManifestResult(string version)
            : base("text/cache-manifest")
        {
            Version = version;
        }

        protected override void WriteFile(HttpResponseBase response)
        {
            var manifest = new StringBuilder();

            manifest.AppendLine("CACHE MANIFEST");
            manifest.AppendLine(string.Format("#V{0}", Version));

            manifest.AppendLine("CACHE:");
            foreach (var item in Cache)
            {
                manifest.AppendLine(item);
            }

            var optimized = bool.Parse(ConfigurationManager.AppSettings["BundleOptimization"]);


            foreach (var bundle in Bundles)
            {
                if (!optimized)
                {

                    foreach (var item in BundleResolver.Current.GetBundleContents(bundle))
                    {
                        manifest.AppendLine(Scripts.Url(item).ToString());
                    }
                }
                else
                {
                    manifest.AppendLine(Scripts.Url(bundle).ToString());
                }

            }

            manifest.AppendLine();

            manifest.AppendLine("NETWORK:");
            foreach (var item in Network)
            {
                manifest.AppendLine(item);
            }

            manifest.AppendLine();

            manifest.AppendLine("FALLBACK:");
            foreach (var item in Fallback)
            {
                manifest.AppendLine(string.Format("{0} {1}", item.Key, item.Value));
            }

#if DEBUG
            manifest.AppendLine();
            manifest.AppendLine(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss").Substring(0,18));
#endif

            response.Output.Write(manifest.ToString());
        }
    }
}