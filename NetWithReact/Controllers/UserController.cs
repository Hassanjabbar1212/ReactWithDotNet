using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetWithReact.Data;
using NetWithReact.Model;
using System.Security.Claims;

namespace NetWithReact.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly dbcontext _context;

        public UserController(dbcontext context)
        {
            _context = context;
        }
        [HttpGet("Get")]
        public async Task<IActionResult> Get()
        {
            List<Userdata> users = await _context.userdata.ToListAsync();
            return Ok(users);
        }
        [HttpPost("CreateUser")]
        public async Task<IActionResult> CreateUser([FromBody] Userdata userData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Add the received user data to the database
            _context.userdata.Add(userData);
            await _context.SaveChangesAsync();

            return Ok(userData);
        }
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] Userdata model)
        {
            var user = await _context.userdata
                .FirstOrDefaultAsync(u => u.Username == model.Username && u.Password == model.Password);

            if (user != null)
            {
                //var userRole = await _context.userRoles
                //    .Include(ur => ur.Role)
                //    .FirstOrDefaultAsync(ur => ur.UserId == user.Id);

                //if (userRole != null)
                //{
                //var roleName = userRole.Role.RoleName;

                var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Username),
                new Claim(ClaimTypes.Sid, Convert.ToString(user?.Id)),
                // Add other claims as needed
            };

                var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                var authProperties = new AuthenticationProperties
                {
                    AllowRefresh = true,
                    IsPersistent = true,
                };

                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity), authProperties);
                return Ok();

            }
            else
            {
                return BadRequest(ModelState);
            }
           
        }
        [HttpGet("Edit/{id}")]
        public async Task<IActionResult> Edit(int id)
        {
            var existingItem = await _context.userdata.FindAsync(id);

            if (existingItem == null)
            {
                return NotFound();
            }
            // Return the updated item as response
            return Ok(existingItem);
        }
        [HttpPost("UpdateData")]
        public async Task<IActionResult> UpdateData(int id)
        {
            return Ok();
        }
    }
}
