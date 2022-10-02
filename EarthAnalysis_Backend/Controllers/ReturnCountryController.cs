using Microsoft.AspNetCore.Mvc;
using EarthAnalysis_Backend.Models;

namespace EarthAnalysis_Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReturnCountryController : Controller
    {
        private readonly ILogger<ReturnCountryController> _logger;
        public ReturnCountryController(ILogger<ReturnCountryController> logger)
        {
            _logger = logger;
        }

        [HttpPut("{CountryName")]
        public IEnumerable<AtomicStation> Get(string CountryName)
        {
            return DBActions.GetParticularCountry(CountryName);
        }
    }
}
