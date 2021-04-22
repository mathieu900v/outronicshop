using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using OutronicShop.Backend.Database.Context;

namespace OutronicShop.Backend.API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            IHost web = CreateHostBuilder(args).Build();
            var tmp = web.Services.GetRequiredService<DatabaseConfiguration>();
            
            var temp = web.Services.GetRequiredService<IDbContextFactory<WebContext>>();
            await using WebContext context = temp.CreateDbContext();
            try
            {
                await context.Database.MigrateAsync();
            }
            finally
            {
                await web.StartAsync();
                await web.WaitForShutdownAsync();
            }
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}