using Microsoft.AspNetCore.Mvc;

namespace PaladinStats.Controllers
{
    [Route("api/[action]")]
    [ApiController]
    public class GetDataController : ControllerBase
    {
        private readonly PaladinsDev.PaladinsDotNET.API _context;

        public GetDataController(PaladinsDev.PaladinsDotNET.API context)
        {
            _context = context;
        }
        [HttpGet]
        [Route("{id}")]
        public IActionResult GetActiveMatchDetails(int id)
        {
            var match = _context.GetActiveMatchDetails(id);
            if (match == null)
            {
                return NotFound();
            }
            return Ok(match.ToString());
        }
        [HttpGet]
        public IActionResult GetChampions()
        {
            var champions = _context.GetChampions();
            if (champions == null)
            {
                return StatusCode(500);
            }
            return Ok(champions.ToString());
        }
        [HttpGet]
        public IActionResult GetDataUsage()
        {
            var data = _context.GetDataUsage();
            if (data == null)
            {
                return StatusCode(500); ;
            }
            return Ok(data.ToString());
        }
        [HttpGet]
        public IActionResult GetItems()
        {
            var items =  _context.GetItems();
            if (items == null)
            {
                return StatusCode(500);
            }
            return Ok(items.ToString());
        }
        [HttpGet]
        [Route("{id}")]
        public IActionResult GetMatchDetails(int id)
        {
            var match =  _context.GetMatchDetails(id);
            if (match == null)
            {
                return NotFound();
            }
            return Ok(match.ToString());
        }
        [HttpGet]
        [Route("{name}")]
        public IActionResult GetPlayer(string name)
        {
            var player = _context.GetPlayer(name);
            if(!player.HasValues)
            {
                return NotFound();
            }
            return Ok(player[0].ToString());
        }
        [HttpGet]
        [Route("{name}")]
        public IActionResult GetPlayerChampionRanks(string name)
        {
            var champions = _context.GetPlayerChampionRanks(name);
            if (!champions.HasValues)
            {
                return NotFound();
            }
            return Ok(champions.ToString());
        }
        [HttpGet]
        [Route("{name}")]
        public IActionResult GetPlayerMatchHistory(string name)
        {
            var matches = _context.GetPlayerMatchHistory(name);
            if (matches[0].Value<int>("Match") == 0)
            {
                return Ok("[]");
            }
            return Ok(matches.ToString());
        }
        [HttpGet]
        [Route("{name}/{queue}")]
        public IActionResult GetPlayerQueueStats(string name, int queue)
        {
            var queueStats = _context.GetPlayerQueueStats(name, queue);
            if (queueStats == null)
            {
                return NotFound();
            }
            return Ok(queueStats.ToString());
        }
        [HttpGet]
        [Route("{name}")]
        public IActionResult GetPlayerStatus(string name)
        {
            var status = _context.GetPlayerStatus(name);
            if (status == null)
            {
                return NotFound();
            }
            return Ok(status[0].ToString());
        }

        [HttpGet]
        [Route("{name}")]
        public IActionResult GetPlayerLoadouts(string name)
        {
            var loadouts = _context.GetPlayerLoadouts(name);
            if (loadouts == null)
            {
                return NotFound();
            }
            return Ok(loadouts.ToString());
        }
    }
}
