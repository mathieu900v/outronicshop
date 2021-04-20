using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using OutronicShop.Backend.API.Extensions;
using OutronicShop.Backend.Database.Brand;
using OutronicShop.Backend.Database.Context;
using OutronicShop.Backend.Domain.Brand;

namespace OutronicShop.Backend.API
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();


            services.AddDbContext<WebContext>((provider, builder) =>
            {
                string dbConfig = provider.GetRequiredService<DatabaseConfiguration>().ToString();
                builder.UseNpgsql(dbConfig).ConfigureWarnings(s =>
                    s.Log((RelationalEventId.CommandExecuting, LogLevel.Debug),
                        (RelationalEventId.CommandExecuted, LogLevel.Debug)));
            });
            
            services.AddDbContextFactory<WebContext>((provider, builder) =>
            {
                string dbConfig = provider.GetRequiredService<DatabaseConfiguration>().ToString();
                builder.UseNpgsql(dbConfig).ConfigureWarnings(s =>
                    s.Log((RelationalEventId.CommandExecuting, LogLevel.Debug),
                        (RelationalEventId.CommandExecuted, LogLevel.Debug)));
            });

            services.AddSingleton<DatabaseConfiguration>();
            
            /*
             * Register Brand
             */
            services.TryAddMappedAsyncUuidRepository<BrandEntity, BrandDto>();
            services.AddTransient<IBrandDao, BrandDao>();
            
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo {Title = "OutronicShop.Api", Version = "v1"});
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "OutronicShop.API"));
            app.UseRouting();
            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}