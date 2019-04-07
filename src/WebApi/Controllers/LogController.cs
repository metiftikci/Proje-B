using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Database;
using WebApi.Models;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LogController: ControllerBase
    {
        [HttpGet]
        public IEnumerable<Log> Log([FromQuery] int? raspberryId)
        {
            using (DatabaseContext context = new DatabaseContext())
            {
                if (raspberryId.HasValue)
                {
                    return context.Logs.Include(x => x.Raspberry).Where(x => x.RaspberryId == raspberryId.Value).ToList();
                }
                else
                {
                    return context.Logs.Include(x => x.Raspberry).ToList();
                }
            }
        }
    }
}
