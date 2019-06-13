using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebSite.Database;
using WebSite.Models;

namespace WebSite.Controllers
{
    [Authorize]
    public class RaspberryController : Controller
    {
        public IActionResult Index()
        {
            using (var db = new DatabaseContext())
            {
                return View(db.Raspberries.ToList());
            }
        }

        public IActionResult Edit(int id)
        {
            if (id <= 0) return BadRequest();

            using (var db = new DatabaseContext())
            {
                return View(db.Raspberries.FirstOrDefault(x => x.Id == id));
            }
        }

        [HttpPost]
        public IActionResult Edit(Raspberry raspberry)
        {
            if (ModelState.IsValid)
            {
                using (var db = new DatabaseContext())
                {
                    Raspberry currentRaspberry = db.Raspberries.FirstOrDefault(x => x.Id == raspberry.Id);

                    currentRaspberry.Name = raspberry.Name;
                    currentRaspberry.Status = raspberry.Status;

                    db.SaveChanges();

                    return RedirectToAction("Index");
                }
            }
            else
            {
                return View(raspberry);
            }
        }
    }
}
