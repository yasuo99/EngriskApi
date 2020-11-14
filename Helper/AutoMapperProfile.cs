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
            CreateMap<Post,PostDTO>()
            .ForMember(post => post.PostUpvotes, options => options.MapFrom(src => src.PostUpvotes.Select(u => new UpvoteDTO(){Id = u.AccountId,Username = u.Account.UserName})))
            .ForMember(post => post.AccountUserName, opts => opts.MapFrom(src => src.Account.UserName));
            CreateMap<Account,AdminAccountDTO>()
            .ForMember(account => account.Roles, options => options.MapFrom(src => src.Roles.Select(r => r.Role.Name)));
            CreateMap<Post,AccountPostDTO>();
            CreateMap<Comment,AccountCommentDTO>()
            .ForMember(cmt => cmt.AccountUsername,opts => opts.MapFrom(src => src.Account.UserName));
            CreateMap<PostUpvote,PostUpvoteDTO>().ForMember(upvote => upvote.PostTitle,options => options.MapFrom(src => src.Post.Title))
            .ForMember(upvote => upvote.TotalUpvote,opts => opts.MapFrom(src => src.Post.UpVote));
            CreateMap<Group,GroupDTO>().ForMember(group => group.AccountUsername, opts => opts.MapFrom(src => src.Account.UserName));
        }
    }
}