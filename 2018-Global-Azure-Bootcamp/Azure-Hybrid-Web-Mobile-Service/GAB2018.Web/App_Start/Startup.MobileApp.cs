using GAB2018.Web.Models;
using Microsoft.Azure.Mobile.Server;
using Microsoft.Azure.Mobile.Server.Authentication;
using Microsoft.Azure.Mobile.Server.Config;
using Microsoft.Azure.Mobile.Server.Tables.Config;
using Owin;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Tracing;

namespace GAB2018.Web
{
    public partial class Startup
    {
        public static void ConfigureMobileApp(IAppBuilder app)
        {
            HttpConfiguration config = new HttpConfiguration();

            //For more information on Web API tracing, see http://go.microsoft.com/fwlink/?LinkId=620686 
            config.EnableSystemDiagnosticsTracing();

            new MobileAppConfiguration()
                .MapApiControllers()
                .AddTables(
                    new MobileAppTableConfiguration()
                        .MapTableControllers()
                        .AddEntityFramework()
                    )
                .ApplyTo(config);
            //.UseDefaultConfiguration()
            //.ApplyTo(config);

            // Use Entity Framework Code First to create database tables based on your DbContext
            // Database.SetInitializer(new GABMauritiusInitializer());
            var migrator = new DbMigrator(new Migrations.Configuration()); migrator.Update();

            // To prevent Entity Framework from modifying your database schema, use a null database initializer
            // Database.SetInitializer<GABMauritiusContext>(null);

            MobileAppSettingsDictionary settings = config.GetMobileAppSettingsProvider().GetMobileAppSettings();

            if (string.IsNullOrEmpty(settings.HostName))
            {
                // This middleware is intended to be used locally for debugging. By default, HostName will
                // only have a value when running in an App Service application.
                app.UseAppServiceAuthentication(new AppServiceAuthenticationOptions
                {
                    SigningKey = ConfigurationManager.AppSettings["SigningKey"],
                    ValidAudiences = new[] { ConfigurationManager.AppSettings["ValidAudience"] },
                    ValidIssuers = new[] { ConfigurationManager.AppSettings["ValidIssuer"] },
                    TokenHandler = config.GetAppServiceTokenHandler()
                });
            }
            app.UseWebApi(config);
        }
    }

    public class GABMauritiusInitializer : CreateDatabaseIfNotExists<GABMauritiusContext>
    {
        protected override void Seed(GABMauritiusContext context)
        {
            base.Seed(context);
        }
    }
}