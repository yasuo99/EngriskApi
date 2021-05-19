import React from 'react';
import HomePage from './pages/HomePage/Home';
import ThaoLuanPage from './pages/ThaoLuanPage/ThaoLuanPage';
import ThaoLuanChiTietPage from './pages/ThaoLuanPage/ThaoLuanChiTietPage';
import CuaHangPage from './pages/CuaHangPage/CuaHangPage';
import TuDienPage from './pages/XemThemPage/TuDienPage';
import TuVungPage from './pages/XemThemPage/TuVungPage';
import SignInPage from './pages/AuthPage/SignInPage';
import SignUpPage from './pages/AuthPage/SignUpPage';
import Admin from './pages/Admin/Admin';
import ManagementWord from './pages/Admin/ManagementWord';
import HocHinhAnh from './pages/HocPage/HocHinhAnh';
import Hoc from './pages/HocPage/Hoc';
// import CaiDatMatKhau from './pages/CaiDatPage/CaiDatMatKhau';
// import CaiDatTaiKhoan from './pages/CaiDatPage/CaiDatTaiKhoan';
import LandingPage from './pages/LandingPage/LandingPage';
import NapTienPage from './pages/NapTienPage/NapTienPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import FlashCardPage from './pages/FlashCardPage/FlashCardPage';
import ThemBaiViet from './pages/ThaoLuanPage/ThemBaiViet';
import KetQuaTraCuu from './pages/XemThemPage/KetQuaTraCuu';
import DapAnSai from './pages/HocPage/DapAnSai';
import DapAnDung from './pages/HocPage/DapAnDung';
import ExamPage from './pages/Exam/ExamPage';
import Exam from './pages/Exam/Exam';
import KetQuaExam from './pages/HocPage/KetQuaExam';
import QuyenTruyCap from './pages/NotFoundPage/QuyenTruyCap';
import ManagementInfor from './pages/Admin/ManagementInfor';
import ManagementDoc from './pages/Admin/ManagementDoc';
import ManagementQuestion from './pages/Admin/ManagementQuestion';
import ManagementPayment from './pages/Admin/ManagementPayment';
import ManagementQuiz from './pages/Admin/ManagementQuiz';
import ManagementExam from './pages/Admin/ManagementExam';
import ManagementAccount from './pages/Admin/ManagementAccount';
import ManagementScore from './pages/Admin/ManagementScore';
import HistroriesExam from './pages/HistoryPage/HistroriesExam';
import HistoriesTopup from './pages/HistoryPage/HistoriesTopup';
import QuenMatKhau from './pages/CaiDatPage/QuenMatKhau';
import CaiDatChung from './pages/CaiDatPage/CaiDatChung';
import DanhSachThongBao from './pages/ThongBao/DanhSachThongBao';
import ListQuiz from './pages/HocPage/ListQuiz';
import DatLaiMatKhau from './pages/CaiDatPage/DatLaiMatKhau';
import ManagementSection from './pages/Admin/ManagementSection';
import Blog from './pages/CaiDatPage/Blog';
import RankingExam from './pages/RankingPage/RankingExam'
import RankingWord from './pages/RankingPage/RankingWord'
import XacNhanEmail from './pages/CaiDatPage/XacNhanEmail';
import ManagementQuiz_Exam from './pages/Admin/ManagementQuiz_Exam';
import ManagementRole from './pages/Admin/ManagementRole';
import FlashCard from './pages/FlashCard/FlashCard';
import FlashCardDetail from './pages/FlashCard/FlashCardDetail';
import Learn from './pages/LearnPage/Learn';
import Progress from './pages/Progress/Progress';
import Quiz_Exam from "./components/managementquiz_exam/Quiz_Exam";
import Word from './components/managementwords/Words';
import Quiz_Word from './components/managementquiz_exam/Quiz_Word';
import QuizExam_User from './components/managementquiz_exam/QuizExam_User';
import QuizExamPage from './pages/QuizExamPage/QuizExamPage';
import SectionPage from './pages/SectionPage/SectionPage';
import Section from './components/managementsections/Section';
import ManagementGroupWord from './pages/Admin/ManagementGroupWord';
import GroupWord from './components/managementgroup_word/GroupWord';
import ProgressWord from './pages/ProgressWord/ProgressWord';
const routes = [
    {
        path: '/home',
        exact: true,
        main: () => <HomePage />,
        guard: false,
        roles: []
    },
    {
        path: '/progressword',
        exact: true,
        main: () => <ProgressWord />,
        // guard: false,
        // roles: []
    },
    {
        path: '/user/quanly-section',
        exact: true,
        main: () => <SectionPage />,
        // guard: false,
        // roles: []
    },
    {
        path: '/user/section',
        exact: true,
        main: () => <Section />,
        // guard: false,
        // roles: []
    },
    {
        path: '/blog',
        exact: true,
        main: (location) => <Blog location={location} />,
        guard: false,
        roles: []
    },
    {
        path: '/ranking-exam',
        exact: true,
        main: () => <RankingExam />,
        // guard: false,
        // roles: []
    },
    {
        path: '/ranking-word',
        exact: true,
        main: () => <RankingWord />,
        guard: false,
        roles: []
    },
    {
        path: '/list-quiz',
        exact: true,
        main: () => <ListQuiz />,
        guard: false,
        roles: []
    },
    {
        path: '/xacnhan-email',
        exact: true,
        main: () => <XacNhanEmail />,
        guard: false,
        roles: []
    },
    {
        path: '/',
        exact: true,
        main: () => <LandingPage />,
        guard: false,
        roles: []
    },
    {
        path: '/thao-luan',
        exact: true,
        main: () => <ThaoLuanPage />,
        guard: false,
        roles: []
    },
    {
        path: '/thao-luan/them-bai-viet',
        exact: true,
        main: () => <ThemBaiViet />,
        // guard: true,
        // roles: []
    },
    {
        path: '/thao-luan-chi-tiet/:postId',
        exact: true,
        main: (match) => <ThaoLuanChiTietPage match={match} />,
        guard: false,
        roles: []
    },
    {
        path: '/cua-hang',
        exact: true,
        main: () => <CuaHangPage />,
        guard: false,
        roles: []
    },
    {
        path: '/tu-dien',
        exact: true,
        main: () => <TuDienPage />,
        guard: false,
        roles: []
    },
    {
        path: '/ketquatracuu',
        exact: true,
        main: (location) => <KetQuaTraCuu location={location} />,
        guard: false,
        roles: []
    },
    {
        path: '/dapansai',
        exact: true,
        main: () => <DapAnSai />,
        guard: false,
        roles: []
    },
    {
        path: '/dapandung',
        exact: true,
        main: () => <DapAnDung />,
        guard: false,
        roles: []
    },
    {
        path: '/tu-vung',
        exact: true,
        main: () => <TuVungPage />,
        guard: false,
        roles: []
    },
    {
        path: '/hochinhanh',
        exact: true,
        main: () => <HocHinhAnh />,
        guard: false,
        roles: []
    },
    {
        path: '/nap-tien',
        exact: true,
        main: () => <NapTienPage />,
        guard: false,
        roles: []
    },
    {
        path: '/lichsu-naptien',
        exact: true,
        main: () => <HistoriesTopup />,
        guard: false,
        roles: []
    },
    {
        path: '/ketqua-exam/:examId',
        exact: true,
        main: (match) => <KetQuaExam match={match} />,
        guard: true,
        roles: []
    },
    {
        path: '/flashcard',
        exact: true,
        main: () => <FlashCardPage />,
        // guard: false,
        // roles: []
    },
    {
        path: '/card',
        exact: true,
        main: () => <FlashCard />,
        // guard: false,
        // roles: []
    },
    {
        path: '/card-detail/:cardId',
        exact: true,
        main: (match) => <FlashCardDetail match={match}/>,
        // guard: false,
        // roles: []
    },
    {
        path: '/learn',
        exact: true,
        main: () => <Learn />,
        // guard: false,
        // roles: []
    },
    // {
    //     path: '/caidatmatkhau',
    //     exact: true,
    //     main: () => <CaiDatMatKhau />,
    //     guard: true,
    //     roles: []
    // },
    // {
    //     path: '/caidattaikhoan',
    //     exact: true,
    //     main: () => <CaiDatTaiKhoan />,
    //     guard: true,
    //     roles: []
    // },
    {
        path: '/caidatchung',
        exact: true,
        main: () => <CaiDatChung />,
        // guard: true,
        // roles: []
    },
    {
        path: '/reset-password',
        exact: true,
        main: () => <DatLaiMatKhau />,
        guard: false,
        roles: []
    },
    {
        path: '/thongbao',
        exact: true,
        main: () => <DanhSachThongBao />,
        // guard: true,
        // roles: []
    },
    {
        path: '/quenmatkhau',
        exact: true,
        main: () => <QuenMatKhau />,
        guard: false,
        roles: []
    },
    {
        path: '/progress',
        exact: true,
        main: () => <Progress/>,
        guard: true,
        roles: []
    },
    {
        path: '/sections/:sectionId/do',
        exact: true,
        main: (match) => <Hoc match={match} />,
        guard: false,
        roles: []
    },
    ,
    {
        path: '/practice',
        exact: true,
        main: (match) => <Hoc match={match} />,
        guard: true,
        roles: []
    },
    {
        path: '/exam',
        exact: true,
        main: () => <Exam />,
        guard: false,
        roles: []
    },
    {
        path: '/lichsu-exam',
        exact: true,
        main: () => <HistroriesExam />,
        guard: false,
        roles: []
    },
    {
        path: '/exam/:examId',
        exact: true,
        main: (location) => <ExamPage location={location}/>,
        guard: true,
        roles: []
    },
    {
        path: '/signin',
        exact: true,
        main: (location) => <SignInPage location={location} />,
        guard: false,
        roles: []
    },
    {
        path: '/signup',
        exact: true,
        main: (location) => <SignUpPage location={location} />,
        guard: false,
        roles: []
    },
    {
        path: '/user/quanly-quiz_exam',
        exact: true,
        main: () => <QuizExamPage />,
        // guard: true,
        // roles: ["superadmin", "manager"]
    },
    {
        path: '/user/quiz_exam',
        exact: true,
        main: () => <QuizExam_User />,
        // guard: true,
        // roles: ["superadmin", "manager"]
    },
    {
        path: '/user-quiz_exam',
        exact: true,
        main: () => <QuizExamPage />,
        // guard: true,
        // roles: ["superadmin", "manager"]
    },
    {
        path: '/admin',
        exact: true,
        main: () => <Admin />,
        guard: true,
        roles: ["superadmin","manager"]
    },
    {
        path: '/tuvung',
        exact: true,
        main: () => <Word />,
        // guard: true,
        // roles: ["superadmin", "manager"]
    },
    {
        path: '/quanly-tuvung',
        exact: true,
        main: () => <ManagementWord />,
        // guard: true,
        // roles: ["superadmin", "manager"]
    },
    {
        path: '/quanly-groupword',
        exact: true,
        main: () => <ManagementGroupWord />,
        // guard: true,
        // roles: ["superadmin", "manager"]
    },
    {
        path: '/groupword',
        exact: true,
        main: () => <GroupWord />,
        // guard: true,
        // roles: ["superadmin", "manager"]
    },
    {
        path: '/quiz-tuvung',
        exact: true,
        main: () => <Quiz_Word />,
        // guard: true,
        // roles: ["superadmin", "manager"]
    },
    {
        path: '/quanly-thongbao',
        exact: true,
        main: () => <ManagementInfor />,
        // guard: true,
        // roles: ["superadmin", "manager"]
    },
    {
        path: '/quanly-tailieu',
        exact: true,
        main: () => <ManagementDoc />,
        guard: true,
        roles: ["superadmin", "manager"]
    },
    {
        path: '/quanly-cauhoi',
        exact: true,
        main: () => <ManagementQuestion />,
        guard: true,
        roles: ["superadmin", "manager"]
    },
    {
        path: '/quanly-naptien',
        exact: true,
        main: () => <ManagementPayment />,
        guard: true,
        roles: ["superadmin", "manager"]
    },
    {
        path: '/quanly-quiz',
        exact: true,
        main: () => <ManagementQuiz />,
        // guard: true,
        // roles: ["superadmin", "manager"]
    },
    {
        path: '/quanly-quiz_exam',
        exact: true,
        main: () => <ManagementQuiz_Exam />,
        // guard: true,
        // roles: ["superadmin", "manager"]
    },
    {
        path: '/quiz_exam',
        exact: true,
        main: () => <Quiz_Exam />,
        // guard: true,
        // roles: ["superadmin", "manager"]
    },
    {
        path: '/quanly-exam',
        exact: true,
        main: () => <ManagementExam />,
        guard: true,
        roles: ["superadmin", "manager"]
    },
    {
        path: '/quanly-section',
        exact: true,
        main: () => <ManagementSection />,
        guard: true,
        roles: ["superadmin", "manager"]
    },
    {
        path: '/quanly-taikhoan',
        exact: true,
        main: () => <ManagementAccount />,
        // guard: true,
        // roles: ["superadmin"]
    },
    {
        path: '/quanly-bangdiem',
        exact: true,
        main: () => <ManagementScore />,
        guard: true,
        roles: ["superadmin", "manager"]
    }, {
        path: '/quanly-phanquyen',
        exact: true,
        main: () => <ManagementRole />,
        // guard: true,
        // roles: ["superadmin"]
    }
    ,
    {
        path: '/loi',
        exact: false,
        main: () => <NotFoundPage />,
        guard: false,
        roles: []
    },
    {
        path: '/access-denied',
        exact: true,
        main: (location) => <QuyenTruyCap location={location} />,
        guard: false,
        roles: []
    },
    {
        main: () => <NotFoundPage />
    }
];

export default routes;