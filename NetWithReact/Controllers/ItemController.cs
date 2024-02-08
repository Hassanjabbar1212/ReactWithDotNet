using Microsoft.AspNetCore.Mvc;

namespace NetWithReact.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ItemController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
