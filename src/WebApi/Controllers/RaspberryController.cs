
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using WebApi.Database;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RaspberryController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<Raspberry>> Get()
        {
            DatabaseContext ctx = new DatabaseContext();
            
            return ctx.Raspberries.ToList();
        }
        
        [HttpGet("{id}")]
        public ActionResult<Raspberry> Get(int id)
        {
            DatabaseContext ctx = new DatabaseContext();
            
            return ctx.Raspberries.FirstOrDefault(x => x.Id == id);
        }

        [HttpPut("{id}/status/{status}")]
        public ActionResult Update(int id, Status status)
        {
            DatabaseContext ctx = new DatabaseContext();
            
            Raspberry raspberry = ctx.Raspberries.FirstOrDefault(x => x.Id == id);

            if (raspberry == null)
            {
                return StatusCode((int)HttpStatusCode.BadRequest);
            }

            raspberry.Status = status;

            Log log = new Log()
            {
                RaspberryId = raspberry.Id,
                Status = status
            };

            ctx.Logs.Add(log);

            try
            {
                ctx.SaveChanges();
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex);
            }

            return Ok();
        }
    }
}
