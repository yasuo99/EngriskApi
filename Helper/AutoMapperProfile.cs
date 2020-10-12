using AutoMapper;
using Engrisk.DTOs;
using Engrisk.Models;

namespace Engrisk.Helper
{
    public class AutoMapperProfile: Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Account,AccountDetailDTO>()
            .ForMember(account => account.Age, source => source.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<AccountDetailDTO,Account>();
            CreateMap<AccountAttendance, AttendanceDTO>()
            .ForMember(gift => gift.Type, options => options.MapFrom(src => src.Attendance.Type))
            .ForMember(gift => gift.Value, options => options.MapFrom(src => src.Attendance.Value));
            CreateMap<Question, QuestionDTO>();
            CreateMap<Quiz,ExamDTO>();
            CreateMap<QuizQuestion, QuestionDTO>()
            .ForMember(question => question.Id, options => options.MapFrom(src => src.Question.Id))
            .ForMember(question => question.A, options => options.MapFrom(src => src.Question.A))
            .ForMember(question => question.B, options => options.MapFrom(src => src.Question.B))
            .ForMember(question => question.C, options => options.MapFrom(src => src.Question.C))
            .ForMember(question => question.D, options => options.MapFrom(src => src.Question.D))
            .ForMember(question => question.Content, options => options.MapFrom(src => src.Question.Content))
            .ForMember(question => question.IsListeningQuestion, options => options.MapFrom(src => src.Question.IsListeningQuestion))
            .ForMember(question => question.Score, options => options.MapFrom(src => src.Question.Score));
        }
    }
}