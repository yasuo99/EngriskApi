using System.Linq;
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
            .ForMember(account => account.Age, source => source.MapFrom(src => src.DateOfBirth.CalculateAge()))
            .ForMember(account => account.Roles, options => options.MapFrom(src => src.Roles.Select(r => r.Role.Name)));
            CreateMap<AccountDetailDTO,Account>();
            CreateMap<AccountForUpdateDTO, Account>();
            CreateMap<AccountAttendance, AttendanceDTO>()
            .ForMember(gift => gift.Type, options => options.MapFrom(src => src.Attendance.Type))
            .ForMember(gift => gift.Value, options => options.MapFrom(src => src.Attendance.Value));
            CreateMap<Question, QuestionDTO>();
            CreateMap<QuestionDTO,Question>();
            CreateMap<Quiz,ExamDTO>();
            CreateMap<QuizQuestion, QuestionDTO>()
            .ForMember(question => question.Id, options => options.MapFrom(src => src.Question.Id))
            .ForMember(question => question.A, options => options.MapFrom(src => src.Question.A))
            .ForMember(question => question.B, options => options.MapFrom(src => src.Question.B))
            .ForMember(question => question.C, options => options.MapFrom(src => src.Question.C))
            .ForMember(question => question.D, options => options.MapFrom(src => src.Question.D))
            .ForMember(question => question.Content, options => options.MapFrom(src => src.Question.Content))
            .ForMember(question => question.IsListeningQuestion, options => options.MapFrom(src => src.Question.IsListeningQuestion))
            .ForMember(question => question.PhotoUrl, opts => opts.MapFrom(src => src.Question.PhotoUrl));
            CreateMap<Post,PostDTO>()
            .ForMember(post => post.Rating, opts => opts.MapFrom(src => src.PostRatings.Sum(s => s.Rating)/(src.PostRatings.Count() == 0 ? 1 : src.PostRatings.Count())))
            .ForMember(post => post.TotalComment, opts => opts.MapFrom(src => src.Comments.Count()));
            CreateMap<Account,AdminAccountDTO>()
            .ForMember(account => account.Roles, options => options.MapFrom(src => src.Roles.Select(r => r.Role.Name)));
            CreateMap<Post,AccountPostDTO>();
            CreateMap<Comment,AccountCommentDTO>()
            .ForMember(cmt => cmt.AccountUsername,opts => opts.MapFrom(src => src.Account.UserName));
            CreateMap<PostRating,PostRatingDTO>().ForMember(rating => rating.PostTitle,options => options.MapFrom(src => src.Post.Title))
            .ForMember(upvote => upvote.TotalRating,opts => opts.MapFrom(src => src.Post.Rating));
            CreateMap<Group,GroupDTO>().ForMember(group => group.AccountUsername, opts => opts.MapFrom(src => src.Account.UserName));
            CreateMap<QuizDTO,Quiz>();
            CreateMap<WordDTO,Word>();
            CreateMap<WordExample,ExampleDTO>()
            .ForMember(example => example.Eng, opts => opts.MapFrom(src => src.Example.Eng))
            .ForMember(example => example.Vie,opts => opts.MapFrom(src => src.Example.Vie))
            .ForMember(example => example.Id,opts => opts.MapFrom(src => src.ExampleId))
            .ForMember(example => example.Inserted, opts => opts.MapFrom(src => src.Example.Inserted));
        }
    }
}