using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Database;
using WebApi.Models;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController: ControllerBase
    {
        [HttpPost]
        public bool Login([Required] [FromBody] LoginModel model)
        {
            using (DatabaseContext context = new DatabaseContext())
            {
                return context.Users.First(x => x.Username == model.Username && x.Password == model.Password).Id > 0;
            }
        }
    }
}
