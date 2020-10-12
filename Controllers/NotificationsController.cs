using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Engrisk.Data;
using Engrisk.DTOs;
using Engrisk.Helper;
using Engrisk.Models;
using Microsoft.AspNetCore.Mvc;

namespace Engrisk.Controllers
{
    [ApiController]
    [Route("api/v1/[Controller]")]
    public class NotificationsController : ControllerBase
    {
        private readonly ICRUDRepo _repo;
        private readonly IMapper _mapper;
        public NotificationsController(ICRUDRepo repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] SubjectParams subjectParams)
        {
            var notifications = await _repo.GetAll<Notification>(subjectParams);
            var returnNotifications = notifications.OrderByDescending(noti => noti.PublishedDate);
            Response.AddPaginationHeader(notifications.CurrentPage, notifications.PageSize, notifications.TotalItems, notifications.TotalPages);
            return Ok(returnNotifications);
        }
        [HttpPost]
        public async Task<IActionResult> CreateNotify(NotificationCreateDTO notification)
        {
            var notify = _mapper.Map<Notification>(notification);
            notify.IsPublish = false;
            _repo.Create(notification);
            if (await _repo.SaveAll())
            {
                return Ok();
            }
            return BadRequest("Error on creating");
        }
        [HttpPut("edit/{id}")]
        public async Task<IActionResult> UpdateNotify(int id, NotificationCreateDTO notification)
        {
            var notificationFromDb = await _repo.GetOneWithCondition<Notification>(notify => notify.Id == id);
            if (notificationFromDb == null)
            {
                return NotFound();
            }
            _mapper.Map(notificationFromDb, notification);
            if(await _repo.SaveAll()){
                return Ok();
            }
            return BadRequest("Error on updating notification");
        }
        [HttpPut("publish/{id}")]
        public async Task<IActionResult> Publish(int id)
        {
            var notificationFromDb = await _repo.GetOneWithCondition<Notification>(noti => noti.Id == id);
            notificationFromDb.PublishedDate = DateTime.Now;
            notificationFromDb.IsPublish = notificationFromDb.IsPublish? false : true;
            if(await _repo.SaveAll()){
                return Ok();
            }
            return BadRequest("Error on publishing");
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNotify(int id)
        {
            var notificationFromDb = await _repo.GetOneWithCondition<Notification>(noti => noti.Id == id);
            if(notificationFromDb == null)
            {
                return NotFound();
            }
            _repo.Delete(notificationFromDb);
            if(await _repo.SaveAll()){
                return Ok();
            }
            return BadRequest();
        }
    }
}