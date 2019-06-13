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
    public class UserController : Controller
    {
        public IActionResult Index()
        {
            using (var db = new DatabaseContext())
            {
                return View(db.Users.ToList());
            }
        }

        public IActionResult Create()
        {
            return View();
        }

        public IActionResult Edit(int id)
        {
            if (id <= 0) return BadRequest();

            using (var db = new DatabaseContext())
            {
                return View(db.Users.FirstOrDefault(x => x.Id == id));
            }
        }

        public IActionResult Delete(int id)
        {
            if (id <= 0) return BadRequest();

            using (var db = new DatabaseContext())
            {
                var user = db.Users.FirstOrDefault(x => x.Id == id);

                db.Users.Remove(user);

                db.SaveChanges();

                return RedirectToAction("Index");
            }
        }

        [HttpPost]
        public IActionResult Create(User user)
        {
            ModelState.Remove("Id");

            if (ModelState.IsValid)
            {
                using (var db = new DatabaseContext())
                {
                    db.Users.Add(user);

                    db.SaveChanges();

                    return RedirectToAction("Index");
                }
            }
            else
            {
                return View(user);
            }
        }

        [HttpPost]
        public IActionResult Edit(User user)
        {
            if (ModelState.IsValid)
            {
                using (var db = new DatabaseContext())
                {
                    User currentUser = db.Users.FirstOrDefault(x => x.Id == user.Id);

                    currentUser.Name = user.Name;
                    currentUser.Surname = user.Surname;
                    currentUser.Username = user.Username;
                    currentUser.Password = user.Password;

                    db.SaveChanges();

                    return RedirectToAction("Index");
                }
            }
            else
            {
                return View(user);
            }
        }
    }
}
