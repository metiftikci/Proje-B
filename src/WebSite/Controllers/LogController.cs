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
    public class LogController : Controller
    {
        public IActionResult Index(int? raspberryId)
        {
            using (var db = new DatabaseContext())
            {
                if (raspberryId.HasValue)
                {
                    return View(db.Logs.Where(x => x.RaspberryId == raspberryId.Value).ToList());
                }

                return View(db.Logs.ToList());
            }
        }
    }
}
