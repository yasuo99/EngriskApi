using System;
using System.Linq;
using AutoMapper;
using Engrisk.DTOs;
using Engrisk.DTOs.Account;
using Engrisk.DTOs.Comment;
using Engrisk.DTOs.Exam;
using Engrisk.DTOs.Post;
using Engrisk.DTOs.Question;
using Engrisk.DTOs.Quiz;
using Engrisk.DTOs.Section;
using Engrisk.DTOs.Word;
using Engrisk.Models;

namespace Engrisk.Helper
{
    public class AutoMapperProfile: Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Account,AccountDetailDTO>()
            .ForMember(account => account.Age, source => source.MapFrom(src => src.DateOfBirth.CalculateAge()))
            .ForMember(account => account.Roles, options => options.MapFrom(src => src.Roles.Select(r => r.Role.Name)))
            .ForMember(acc => acc.RefreshToken, opts => opts.MapFrom(src => src.RefreshTokens.Count() > 0 ? src.RefreshTokens.Last().Token : "" ))
            .ForMember(acc => acc.IsBanned, opts => opts.MapFrom(src => src.Locked > DateTime.Now))
            .ForMember(acc => acc.IsVerified, opts => opts.MapFrom(sourceMember=> sourceMember.EmailConfirmed));
            CreateMap<Account,AccountBlogDTO>()
            .ForMember(account => account.Age, source => source.MapFrom(src => src.DateOfBirth.CalculateAge()))
            .ForMember(acc => acc.IsBanned, opts => opts.MapFrom(src => src.Locked > DateTime.Now))
            .ForMember(acc => acc.WordLearned, opts => opts.MapFrom(src => src.Learned.Count()))
            .ForMember(acc => acc.ExamDone, opts => opts.MapFrom(src => src.ExamHistories.Count()))
            .ForMember(acc => acc.QuizDone, opts => opts.MapFrom(src => src.Sections.Select(s => s.QuizDoneCount).Sum()));    
            CreateMap<AccountDetailDTO,Account>().ForAllMembers(opts => opts.Condition((src,dest,srcMember) => srcMember != null));
            CreateMap<AccountForUpdateDTO, Account>().ForAllMembers(opts => opts.Condition((src,dest,srcMember) => srcMember != null));
            CreateMap<AccountAttendance, AttendanceDTO>()
            .ForMember(gift => gift.Type, options => options.MapFrom(src => src.Attendance.Type))
            .ForMember(gift => gift.Value, options => options.MapFrom(src => src.Attendance.Value));
            CreateMap<Question, QuestionDTO>();
            CreateMap<Question,QuestionDetailDTO>();
            CreateMap<QuestionDTO,Question>().ForAllMembers(opts => opts.Condition((src,dest,srcMember) => srcMember != null));
            CreateMap<QuestionCreateDTO, Question>().ForAllMembers(opts => opts.Condition((src,dest,srcMember) => srcMember != null));
            CreateMap<Exam,ExamDTO>()
            .ForMember(exam => exam.IsNew, opts => opts.MapFrom(src => DateTime.Now.Subtract(src.Create_At).Days < 3 ? true : false));
            CreateMap<ExamCreateDTO,Exam>().ForAllMembers(opts => opts.Condition((src,dest,srcMember) => srcMember != null));
            CreateMap<Quiz,QuizDTO>();
            CreateMap<QuizQuestion, QuestionDTO>()
            .ForMember(question => question.Id, options => options.MapFrom(src => src.Question.Id))
            .ForMember(question => question.A, options => options.MapFrom(src => src.Question.A))
            .ForMember(question => question.B, options => options.MapFrom(src => src.Question.B))
            .ForMember(question => question.C, options => options.MapFrom(src => src.Question.C))
            .ForMember(question => question.D, options => options.MapFrom(src => src.Question.D))
            .ForMember(question => question.Audio, opts => opts.MapFrom(src => src.Question.Audio))
            .ForMember(question => question.Content, options => options.MapFrom(src => src.Question.Content))
            .ForMember(question => question.IsListeningQuestion, options => options.MapFrom(src => src.Question.IsListeningQuestion))
            .ForMember(question => question.IsFillOutQuestion, options => options.MapFrom(src => src.Question.IsFillOutQuestion))
            .ForMember(question => question.PhotoUrl, opts => opts.MapFrom(src => src.Question.PhotoUrl));
            CreateMap<Post,PostDTO>()
            .ForMember(post => post.Rating, opts => opts.MapFrom(src => src.PostRatings.Sum(s => s.Rating)/(src.PostRatings.Count() == 0 ? 1 : src.PostRatings.Count())))
            .ForMember(post => post.TotalComment, opts => opts.MapFrom(src => src.Comments.Count()))
            .ForMember(post => post.AccountPhotoUrl, opts => opts.MapFrom(src => src.Account.PhotoUrl));
            CreateMap<Account,AdminAccountDTO>()
            .ForMember(account => account.Roles, options => options.MapFrom(src => src.Roles.Select(r => r.Role.Name)));
            CreateMap<Post,AccountPostDTO>();
            CreateMap<Comment,AccountCommentDTO>()
            .ForMember(cmt => cmt.AccountUsername,opts => opts.MapFrom(src => src.Account.UserName));
            CreateMap<PostRating,PostRatingDTO>().ForMember(rating => rating.PostTitle,options => options.MapFrom(src => src.Post.Title))
            .ForMember(upvote => upvote.TotalRating,opts => opts.MapFrom(src => src.Post.Rating));
            CreateMap<Group,GroupDTO>()
            .ForMember(group => group.AccountUsername, opts => opts.MapFrom(src => src.Account.UserName));
            CreateMap<QuizDTO,Quiz>();
            CreateMap<QuizCreateDTO, Quiz>().ForAllMembers(opts => opts.Condition((src,dest,srcMember) => srcMember != null));
            CreateMap<Quiz, QuizDetailDTO>().ForMember(q => q.TotalQuestion, opts => opts.MapFrom(src => src.Questions.Count()))
            .ForMember(q => q.SectionName, opts => opts.MapFrom(src => src.Section.SectionName));
            CreateMap<WordDTO,Word>().ForAllMembers(opts => opts.Condition((src,dest,srcMember) => srcMember != null));
            CreateMap<WordGroup,WordDTO>()
            .ForMember(w => w.Id, opts => opts.MapFrom(src => src.WordId))
            .ForMember(w => w.Eng,opts => opts.MapFrom(src => src.Word.Eng))
            .ForMember(w => w.Vie, opts => opts.MapFrom(src => src.Word.Vie))
            .ForMember(w => w.WordCategory, opts => opts.MapFrom(src => src.Word.WordCategory))
            .ForMember(w => w.WordImg, opts => opts.MapFrom(src => src.Word.WordImg))
            .ForMember(w => w.Spelling, opts => opts.MapFrom(src => src.Word.Spelling))
            .ForMember(w => w.WordVoice, opts => opts.MapFrom(src => src.Word.WordVoice))
            .ForMember(w => w.Examples, opts => opts.MapFrom(src => src.Word.Examples));
            CreateMap<Word,WordDTO>();
            CreateMap<Word, WordDetailDTO>();
            CreateMap<WordExample,ExampleDTO>()
            .ForMember(example => example.Eng, opts => opts.MapFrom(src => src.Example.Eng))
            .ForMember(example => example.Vie,opts => opts.MapFrom(src => src.Example.Vie))
            .ForMember(example => example.Id,opts => opts.MapFrom(src => src.ExampleId))
            .ForMember(example => example.Inserted, opts => opts.MapFrom(src => src.Example.Inserted));
            CreateMap<Section,SectionDTO>()
            .ForMember(s => s.TotalQuizzes, opts => opts.MapFrom(src => src.Quizzes.Count()));
            CreateMap<SectionDTO,Section>().ForAllMembers(opts => opts.Condition((src,dest,srcMember) => srcMember != null));
            CreateMap<SectionCreateDTO,Section>().ForAllMembers(opts => opts.Condition((src,dest,srcMember) => srcMember != null));
            CreateMap<SectionUpdateDTO,Section>().ForAllMembers(opts => opts.Condition((src,dest,srcMember) => srcMember != null));
            CreateMap<ExamQuestion, QuestionDTO>()
            .ForMember(question => question.Id, options => options.MapFrom(src => src.Question.Id))
            .ForMember(question => question.A, options => options.MapFrom(src => src.Question.A))
            .ForMember(question => question.B, options => options.MapFrom(src => src.Question.B))
            .ForMember(question => question.C, options => options.MapFrom(src => src.Question.C))
            .ForMember(question => question.D, options => options.MapFrom(src => src.Question.D))
            .ForMember(question => question.Audio, opts => opts.MapFrom(src => src.Question.Audio))
            .ForMember(question => question.Content, options => options.MapFrom(src => src.Question.Content))
            .ForMember(question => question.IsListeningQuestion, options => options.MapFrom(src => src.Question.IsListeningQuestion))
            .ForMember(question => question.IsFillOutQuestion, options => options.MapFrom(src => src.Question.IsFillOutQuestion))
            .ForMember(question => question.PhotoUrl, opts => opts.MapFrom(src => src.Question.PhotoUrl))
            .ForMember(question => question.ToeicPart, opts => opts.MapFrom(src => src.Question.ToeicPart));
            CreateMap<ExamHistory, ExamHistoryDTO>().ForMember(h => h.ExamTitle, opts => opts.MapFrom(src => src.Exam.Title)).ForAllMembers(opts => opts.Condition((src,dest,srcMember) => srcMember != null));
            CreateMap<Exam,ExamAnswerDTO>();
            CreateMap<ExamQuestion,QuestionAnswerDTO>()
            .ForMember(question => question.Id, options => options.MapFrom(src => src.Question.Id))
            .ForMember(question => question.A, options => options.MapFrom(src => src.Question.A))
            .ForMember(question => question.B, options => options.MapFrom(src => src.Question.B))
            .ForMember(question => question.C, options => options.MapFrom(src => src.Question.C))
            .ForMember(question => question.D, options => options.MapFrom(src => src.Question.D))
            .ForMember(question => question.Audio, opts => opts.MapFrom(src => src.Question.Audio))
            .ForMember(question => question.Content, options => options.MapFrom(src => src.Question.Content))
            .ForMember(question => question.Answer, opts => opts.MapFrom(src => src.Question.Answer))
            .ForMember(question => question.Explaination, opts => opts.MapFrom(src => src.Question.Explaination))
            .ForMember(question => question.IsListeningQuestion, options => options.MapFrom(src => src.Question.IsListeningQuestion))
            .ForMember(question => question.IsFillOutQuestion, options => options.MapFrom(src => src.Question.IsFillOutQuestion))
            .ForMember(question => question.PhotoUrl, opts => opts.MapFrom(src => src.Question.PhotoUrl))
            .ForMember(question => question.ToeicPart, opts => opts.MapFrom(src => src.Question.ToeicPart));
            CreateMap<WordCreateDTO,Word>().ForAllMembers(opts => opts.Condition((src,dest,srcMember) => srcMember != null));
            CreateMap<QuestionCreateDTO,Question>().ForAllMembers(opts => opts.Condition((src,dest,srcMember) => srcMember != null));
            CreateMap<NotificationCreateDTO,Notification>().ForAllMembers(opts => opts.Condition((src,dest,srcMember) => srcMember != null));
            CreateMap<Post,PostDetailDTO>()
            .ForMember(post => post.AccountVerified, opts => opts.MapFrom(src => src.Account.EmailConfirmed))
            .ForMember(post => post.AccountPhotoUrl, opts => opts.MapFrom(src => src.Account.PhotoUrl))
            .ForMember(post => post.Rating, opts => opts.MapFrom(src => src.PostRatings.Sum(s => s.Rating)/(src.PostRatings.Count() == 0 ? 1 : src.PostRatings.Count())))
            .ForMember(post => post.AccountUsername, opts => opts.MapFrom(src => src.Account.UserName))
            .ForMember(post => post.PostRatings, opts => opts.MapFrom(src => src.PostRatings.Select(r => new RatingDTO(){Id = r.PostId,AccountId = r.AccountId, AccountUsername = r.Account.UserName, Rating = r.Rating })));
            CreateMap<Comment,CommentDTO>().ForMember(c => c.AccountUsername, opts => opts.MapFrom(src => src.Account.UserName))
            .ForMember(c => c.Comment, opts => opts.MapFrom(src => src.Content))
            .ForMember(c => c.AccountPhotoUrl, opts => opts.MapFrom(src => src.Account.PhotoUrl))
            .ForMember(c => c.IsVerified, opts => opts.MapFrom(src => src.Account.EmailConfirmed));
            CreateMap<WordLearnt,WordLearntDTO>().ForMember(w => w.WordCategory, opts => opts.MapFrom(src => src.Word.WordCategory))
            .ForMember(w => w.Eng, opts => opts.MapFrom(src => src.Word.Eng));
            CreateMap<History,QuizHistoryDTO>().ForMember(h => h.SectionName,opts => opts.MapFrom(src => src.Quiz.QuizName))
            .ForMember(h => h.SectionName, opts => opts.MapFrom(src => src.Quiz.Section.SectionName));
            CreateMap<PostUpdateDTO, Post>().ForAllMembers(all => all.Condition((src,dest, srcMember) => srcMember != null));
            CreateMap<CommentReply, ReplyDTO>().ForMember(c => c.Comment, otps => otps.MapFrom(src => src.Reply.Content))
            .ForMember(c => c.Like, opts => opts.MapFrom(src => src.Reply.Like))
            .ForMember(c => c.Dislike, opts => opts.MapFrom(src => src.Reply.Dislike))
            .ForMember(c => c.AccountPhotoUrl, opts => opts.MapFrom(src => src.Reply.Account.PhotoUrl))
            .ForMember(c => c.AccountUsername, opts => opts.MapFrom(src => src.Reply.Account.UserName))
            .ForMember(c => c.AccountVerified, opts => opts.MapFrom(src => src.Reply.Account.EmailConfirmed))
            .ForMember(c => c.AccountId, opts => opts.MapFrom(src => src.Reply.AccountId));
        }
    }
}