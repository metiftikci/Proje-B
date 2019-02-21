using System;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnableAlarmController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get()
        {
            Program.ALARM_IS_ACTIVE = true;

            return Ok();
        }
    }
}
