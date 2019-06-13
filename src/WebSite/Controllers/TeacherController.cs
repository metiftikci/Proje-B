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
    public class TeacherController : Controller
    {
        public IActionResult Index()
        {
            using (var db = new DatabaseContext())
            {
                return View(db.Teachers.ToList());
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
                return View(db.Teachers.FirstOrDefault(x => x.Id == id));
            }
        }

        public IActionResult Delete(int id)
        {
            if (id <= 0) return BadRequest();

            using (var db = new DatabaseContext())
            {
                var teacher = db.Teachers.FirstOrDefault(x => x.Id == id);

                db.Teachers.Remove(teacher);

                db.SaveChanges();

                return RedirectToAction("Index");
            }
        }

        [HttpPost]
        public IActionResult Create(Teacher teacher)
        {
            ModelState.Remove("Id");

            if (ModelState.IsValid)
            {
                using (var db = new DatabaseContext())
                {
                    db.Teachers.Add(teacher);

                    db.SaveChanges();

                    return RedirectToAction("Index");
                }
            }
            else
            {
                return View(teacher);
            }
        }

        [HttpPost]
        public IActionResult Edit(Teacher teacher)
        {
            if (ModelState.IsValid)
            {
                using (var db = new DatabaseContext())
                {
                    Teacher currentTeacher = db.Teachers.FirstOrDefault(x => x.Id == teacher.Id);

                    currentTeacher.AdSoyad = teacher.AdSoyad;
                    currentTeacher.Email = teacher.Email;
                    currentTeacher.Telefon = teacher.Telefon;

                    db.SaveChanges();

                    return RedirectToAction("Index");
                }
            }
            else
            {
                return View(teacher);
            }
        }
    }
}
