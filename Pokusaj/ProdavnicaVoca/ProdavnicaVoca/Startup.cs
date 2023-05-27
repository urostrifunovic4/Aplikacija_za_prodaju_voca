using BusinessLayer;
using DataAccessLayer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProdavnicaVoca
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

         /*     services.AddControllers();
              services.AddSwaggerGen(c =>
              {
                  c.SwaggerDoc("v1", new OpenApiInfo { Title = "ProdavnicaVoca", Version = "v1" });
              }); */
            services.AddCors(c =>
            {
                c.AddPolicy("AllowOrign", option => option.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            });

            services.AddControllers();

            //dodato

            // services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
            services.AddScoped<IKupacRepository, KupacRepository>();
            services.AddScoped<IKupacBusiness, KupacBusiness>();
            services.AddScoped<IAdminBusiness, AdminBusiness>();
            services.AddScoped<IAdminRepository, AdminRepository>();
            services.AddScoped<IVockaRepository, VockaRepository>();
            services.AddScoped<IVockaBusiness, VockaBusiness>();

            services.AddScoped<IKorpaRepository, KorpaRepository>();
            services.AddScoped<IKorpaBusiness, KorpaBusiness>();
            services.AddScoped<IContactRepository, ContactRepository>();
            services.AddScoped<IContactBusiness, ContactBusiness>();

            services.AddScoped<IListaZeljaRepository, ListaZeljaRepository>();
            services.AddScoped<IListaZeljaBusiness, ListaZeljaBusiness>();

            services.AddScoped<IVockaVrstaRepository, VockaVrstaRepository>();
            services.AddScoped<IVockaVrstaBusiness, VockaVrstaBusiness>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            /*  if (env.IsDevelopment())
              {
                  app.UseDeveloperExceptionPage();
                  app.UseSwagger();
                  app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "ProdavnicaVoca v1"));
              }

              app.UseHttpsRedirection();

              app.UseRouting();

              app.UseAuthorization();

              app.UseEndpoints(endpoints =>
              {
                  endpoints.MapControllers();
              });*/
            app.UseCors(option => option.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());


            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
