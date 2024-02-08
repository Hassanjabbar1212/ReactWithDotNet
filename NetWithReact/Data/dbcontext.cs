using System.Collections.Generic;
using NetWithReact.Model;
using Microsoft.EntityFrameworkCore;
namespace NetWithReact.Data
{
    public class dbcontext : DbContext
    {
        public dbcontext(DbContextOptions<dbcontext> options)
         : base(options)
        {
        }
        public DbSet<ItemModel> Items { get; set; }  
        public DbSet<Userdata>  userdata  { get; set; }


       
    }
}
