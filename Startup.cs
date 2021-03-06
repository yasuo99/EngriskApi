using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Engrisk.Data;
using Engrisk.Helper;
using Engrisk.Hubs;
using Engrisk.Models;
using Engrisk.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace Engrisk
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        // public void ConfigureDevelopmentServices(IServiceCollection services)
        // {
        //     services.AddDbContextPool<ApplicationDbContext>(options => options.UseLazyLoadingProxies().UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
        //     ConfigureServices(services);
        // }
        // public void ConfigureProductionServices(IServiceCollection services)
        // {
        //     services.AddDbContextPool<ApplicationDbContext>(options => options.UseLazyLoadingProxies().UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
        //     ConfigureServices(services);
        // }
        public void ConfigureServices(IServiceCollection services)
        {
            IdentityBuilder identityBuider = services.AddIdentityCore<Account>(opts =>
            {
                opts.Password.RequireDigit = false;
                opts.Password.RequiredLength = 8;
                opts.Password.RequireNonAlphanumeric = false;
                opts.Password.RequireUppercase = false;
            });
            identityBuider = new IdentityBuilder(identityBuider.UserType, typeof(Role), identityBuider.Services);
            identityBuider.AddEntityFrameworkStores<ApplicationDbContext>().AddDefaultTokenProviders();
            identityBuider.AddRoleValidator<RoleValidator<Role>>();
            identityBuider.AddRoleManager<RoleManager<Role>>();
            identityBuider.AddSignInManager<SignInManager<Account>>();
            // services.AddIdentity<Account,Role>().AddEntityFrameworkStores<ApplicationDbContext>().AddDefaultTokenProviders();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters()
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration.GetSection("AppSettings:TokenSecret").Value)),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                };
                options.SaveToken = true;
            }
            );
            // services.AddAuthorization(opts => {
            //     opts.
            //     opts.AddPolicy("RequireSuperadminRole", policy => policy.RequireRole("SUPERADMIN"));
            //     opts.AddPolicy("RequireManagerRole", policy => policy.RequireRole("MANAGER"));
            //     opts.AddPolicy("RequireForumRole", policy => policy.RequireRole("forumadmin","forummod"));
            // });
            services.AddDbContextPool<ApplicationDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddControllers(opts =>
            {
                // var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                // opts.Filters.Add(new AuthorizeFilter(policy));
            })
            .AddNewtonsoftJson(options => {
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });
            services.AddScoped<IAuthRepo, AuthRepo>();
            services.AddScoped<ICRUDRepo, CRUDRepo>();
            services.AddScoped<IAuthService, GoogleAuthService>();
            services.AddHttpClient<IAuthService, FacebookAuthService>();
            services.AddScoped<IAuthService, FacebookAuthService>();
            services.AddScoped<IUploadService,DropBoxService>();
            services.AddTransient<GoogleAuthService>();
            services.AddTransient<FacebookAuthService>();
            services.AddTransient<Func<ServiceEnum, IAuthService>>(serviceProvider => key =>
            {
                switch (key)
                {
                    case ServiceEnum.Google:
                        return serviceProvider.GetService<GoogleAuthService>();
                    case ServiceEnum.Facebook:
                        return serviceProvider.GetService<FacebookAuthService>();
                    default:
                        return null;
                }
            });
            services.AddAutoMapper(typeof(AuthRepo).Assembly).AddAutoMapper(typeof(ICRUDRepo).Assembly);
            services.Configure<CloudinarySettings>(Configuration.GetSection("CloudinarySettings"));
            services.Configure<GoogleAuthConfig>(Configuration.GetSection("Google"));
            services.Configure<FacebookAuthConfig>(Configuration.GetSection("Facebook"));
            services.Configure<DropBoxSettings>(Configuration.GetSection("Dropbox"));
            services.AddCors();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // app.UseHttpsRedirection();
            app.UseCors(options => options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
