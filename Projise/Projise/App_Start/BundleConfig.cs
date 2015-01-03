using Projise.App_Infrastructure;
using System.Configuration;
using System.Web;
using System.Web.Optimization;

namespace Projise
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            //Ignore files used for testing
            bundles.IgnoreList.Ignore("*.spec.js", OptimizationMode.Always);
            bundles.IgnoreList.Ignore("*.mock.js", OptimizationMode.Always);

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                "~/Scripts/jquery-1.10.2.js",
                "~/Scripts/jquery.signalR-2.1.2.js",
                "~/signalr/hubs",
                "~/Areas/Dashboard/Views/Dashboard/bower_components/es5-shim/es5-shim.js",
                "~/Areas/Dashboard/Views/Dashboard/bower_components/angular/angular.js",
                "~/Areas/Dashboard/Views/Dashboard/bower_components/json3/lib/json3.js",
                "~/Areas/Dashboard/Views/Dashboard/bower_components/angular-resource/angular-resource.js",
                "~/Areas/Dashboard/Views/Dashboard/bower_components/angular-cookies/angular-cookies.js",
                "~/Areas/Dashboard/Views/Dashboard/bower_components/angular-sanitize/angular-sanitize.js",
                "~/Areas/Dashboard/Views/Dashboard/bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
                "~/Areas/Dashboard/Views/Dashboard/bower_components/lodash/dist/lodash.compat.js",
                "~/Areas/Dashboard/Views/Dashboard/bower_components/angular-ui-router/release/angular-ui-router.js",
                "~/Areas/Dashboard/Views/Dashboard/bower_components/angular-markdown-directive/markdown.js",
                "~/Areas/Dashboard/Views/Dashboard/bower_components/showdown/src/showdown.js",
                "~/Areas/Dashboard/Views/Dashboard/app/app.js")
                .IncludeDirectory("~/Areas/Dashboard/Views/Dashboard/app", "*.js", true)
                .IncludeDirectory("~/Areas/Dashboard/Views/Dashboard/components", "*.js", true)
            );

            /*
             * Compiled outside vs, web essentials compiler crashes (works for about half of my files)
             * Errors point to syntax errors but for one of the files that crashed I removed stuff until it compiled and then just adding a selector worked, but adding any property to it made it crash again
             * ie "body {}" worked but "body { background-color: #000000; }" crashed it
            */
            bundles.Add(new StyleBundle("~/bundles/style").Include("~/Areas/Dashboard/Views/Dashboard/app/app.min.css"));

            //put html pages in templatecache
            bundles.Add(new PartialsBundle("projiSeApp", "~/bundles/partials")
                .IncludeDirectory("~/Areas/Dashboard/Views/Dashboard/app", "*.html", true)
                .IncludeDirectory("~/Areas/Dashboard/Views/Dashboard/components", "*.html", true));

            BundleTable.EnableOptimizations = true; //bool.Parse(ConfigurationManager.AppSettings["BundleOptimisation"]);
        }
    }
}
