using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Database;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<Teacher>> Get()
        {
            DatabaseContext ctx = new DatabaseContext();

            return ctx.Teachers.ToList();
        }
    }
}
