import React from 'react';
import HomePage from './pages/HomePage/HomePage';
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
import CaiDatMatKhau from './pages/CaiDatPage/CaiDatMatKhau';
import CaiDatTaiKhoan from './pages/CaiDatPage/CaiDatTaiKhoan';
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
import ManagementPost from './pages/Admin/ManagementPost';
import ManagementDoc from './pages/Admin/ManagementDoc';
import ManagementQuestion from './pages/Admin/ManagementQuestion';
import ManagementPayment from './pages/Admin/ManagementPayment';
import ManagementQuiz from './pages/Admin/ManagementQuiz';
import ManagementExam from './pages/Admin/ManagementExam';
import ManagementAccount from './pages/Admin/ManagementAccount';

const routes = [
    {
        path: '/home',
        exact: true,
        main: () => <HomePage />,
        guard: false,
        role: []
    },
    {
        path: '/',
        exact: true,
        main: () => <LandingPage />,
        guard: false,
        role: []
    },
    {
        path: '/thao-luan',
        exact: true,
        main: () => <ThaoLuanPage />,
        guard: false,
        role: []
    },
    {
        path: '/thao-luan/them-bai-viet',
        exact: true,
        main: () => <ThemBaiViet />,
        guard: true,
        role: []
    },
    {
        path: '/thao-luan-chi-tiet',
        exact: true,
        main: () => <ThaoLuanChiTietPage />,
        guard: false,
        role: []
    },
    {
        path: '/cua-hang',
        exact: true,
        main: () => <CuaHangPage />,
        guard: false,
        role: []
    },
    {
        path: '/tu-dien',
        exact: true,
        main: () => <TuDienPage />,
        guard: false,
        role: []
    },
    {
        path: '/ketquatracuu',
        exact: true,
        main: (location) => <KetQuaTraCuu location={location} />,
        guard: false,
        role: []
    },
    {
        path: '/dapansai',
        exact: true,
        main: () => <DapAnSai />,
        guard: false,
        role: []
    },
    {
        path: '/dapandung',
        exact: true,
        main: () => <DapAnDung />,
        guard: false,
        role: []
    },
    {
        path: '/tu-vung',
        exact: true,
        main: () => <TuVungPage />,
        guard: false,
        role: []
    },
    {
        path: '/hochinhanh',
        exact: true,
        main: () => <HocHinhAnh />,
        guard: false,
        role: []
    },
    {
        path: '/nap-tien',
        exact: true,
        main: () => <NapTienPage />,
        guard: false,
        role: []
    },
    {
        path: '/ketqua-exam/:examId',
        exact: true,
        main: (match) => <KetQuaExam match={match} />,
        guard: true,
        role: []
    },
    {
        path: '/flashcard',
        exact: true,
        main: () => <FlashCardPage />,
        guard: false,
        role: []
    },
    {
        path: '/caidatmatkhau',
        exact: true,
        main: () => <CaiDatMatKhau />,
        guard: true,
        role: []
    },
    {
        path: '/caidattaikhoan',
        exact: true,
        main: () => <CaiDatTaiKhoan />,
        guard: true,
        role: []
    },
    {
        path: '/baihoc/:quizId',
        exact: true,
        main: (match) => <Hoc match={match}/>,
        guard: false,
        role: []
    },{
        path: '/exam',
        exact: true,
        main: () => <Exam/>,
        guard: false,
        role: []
    }
    ,{
        path: '/exam/:examId',
        exact: true,
        main: (match) => <ExamPage match={match}/>,
        guard: true,
        role: []
    },
    {
        path: '/signin',
        exact: true,
        main: (location) => <SignInPage location={location}/>,
        guard: false,
        role: []
    },
    {
        path: '/signup',
        exact: true,
        main: () => <SignUpPage />,
        guard: false,
        role: []
    },
    {
        path: '/admin',
        exact: true,
        main: () => <Admin />,
        guard: true,
        role: []
    },
    {
        path: '/quanly-tuvung',
        exact: true,
        main: () => <ManagementWord />,
        guard: true,
        role: []
    },
    {
        path: '/quanly-thongbao',
        exact: true,
        main: () => <ManagementInfor />,
        guard: true,
        role: []
    },
    {
        path: '/quanly-tailieu',
        exact: true,
        main: () => <ManagementDoc />,
        guard: true,
        role: []
    },
    {
        path: '/quanly-cauhoi',
        exact: true,
        main: () => <ManagementQuestion />,
        guard: true,
        role: []
    },
    {
        path: '/quanly-naptien',
        exact: true,
        main: () => <ManagementPayment />,
        guard: true,
        role: []
    },
    {
        path: '/quanly-quiz',
        exact: true,
        main: () => <ManagementQuiz/>,
        guard: true,
        role: []
    },
    {
        path: '/quanly-exam',
        exact: true,
        main: () => <ManagementExam/>,
        guard: true,
        role: []
    },
    {
        path: '/quanly-taikhoan',
        exact: true,
        main: () => <ManagementAccount/>,
        guard: true,
        role: []
    },
    {
        path: '/quanly-baiviet',
        exact: true,
        main: () => <ManagementPost />,
        guard: true,
        role: []
    },
    {
        path: '/loi',
        exact: false,
        main: () => <NotFoundPage />,
        guard: false,
        role: []
    },
    {
        path: '/access-denied',
        exact: true,
        main: (location) => <QuyenTruyCap location={location}/>,
        guard: false,
        role: []
    },
];

export default routes;