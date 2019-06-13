using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using WebSite.Database;
using WebSite.Models;

namespace WebSite.Controllers
{
    public class SystemController: Controller
    {
        public ActionResult Login()
        {
            return View();
        }
        
        public async Task<ActionResult> Logout()
        {
            await HttpContext.SignOutAsync();

            return RedirectToAction("Index", "Raspberry");
        }

        [HttpPost]
        public async Task<ActionResult> Login(LoginModel model)
        {
            if (CheckUser(model))
            {
                var claims = new List<Claim>()
                {
                    new Claim(ClaimTypes.Name, model.Username)
                };

                var userIdentity = new ClaimsIdentity(claims, "login");

                ClaimsPrincipal principal = new ClaimsPrincipal(userIdentity);

                await HttpContext.SignInAsync(principal);

                return RedirectToAction("Index", "Raspberry");
            }

            return View(model);
        }

        private bool CheckUser(LoginModel user)
        {
            using (var db = new DatabaseContext())
            {
                return db.Users.FirstOrDefault(x => x.Username == user.Username && x.Password == user.Password) != null;
            }
        }
    }
}
