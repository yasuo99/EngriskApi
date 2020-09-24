using System.Threading.Tasks;
using Engrisk.Data;
using Engrisk.Helper;
using Engrisk.Models;
using Microsoft.AspNetCore.Mvc;

namespace Engrisk.Controllers
{
    [ApiController]
    [Route("api/{Controller}")]
    public class LevelController : ControllerBase
    {
        private readonly ICRUDRepo _repo;
        public LevelController(ICRUDRepo repo)
        {
            _repo = repo;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll(SubjectParams subjectParams){
            var levels = await _repo.GetAll<Level>();
            
        }
    }
}