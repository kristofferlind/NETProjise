using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Projise.Startup))]
namespace Projise
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
