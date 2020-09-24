using AutoMapper;
using Engrisk.DTOs;
using Engrisk.Models;

namespace Engrisk.Helper
{
    public class AutoMapperProfile: Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Account,AccountDetailDTO>().ForMember(account => account.Age, source => source.MapFrom(src => src.DateOfBirth.CalculateAge()));
        }
    }
}