using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<Data>> Get()
        {
            List<Data> data = new List<Data>()
            {
                new Data() {
                    AdSoyad = "Muhamemd Emin TİFTİKÇİ",
                    Telefon = "+90 506 140 92 83",
                    Email = "muhammedtiftikci@outlook.com"
                },
                new Data() {
                    AdSoyad = "Keml AKYOL",
                    Telefon = "+90 530 341 1309",
                    Email = "kemalakyol48@gmail.com"
                },
            };

            return data;
        }
    }
}
