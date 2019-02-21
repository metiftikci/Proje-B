using System;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlarmController : ControllerBase
    {
        [HttpGet]
        public bool Get()
        {
            return Program.ALARM_IS_ACTIVE;
        }
    }
}
