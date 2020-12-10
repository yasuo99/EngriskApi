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
import Management from './pages/Admin/Management';
import HocHinhAnh from './pages/HocPage/HocHinhAnh';
import Hoc from './pages/HocPage/Hoc';
import CaiDatMatKhau from './pages/CaiDatPage/CaiDatMatKhau';
import CaiDatTaiKhoan from './pages/CaiDatPage/CaiDatTaiKhoan';
import LandingPage from './pages/LandingPage/LandingPage';
import NapTienPage from './pages/NapTienPage/NapTienPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import FlashCardPage from './pages/FlashCardPage/FlashCardPage';
import ManagementWord from './pages/Admin/ManagementWord';
import ThemBaiViet from './pages/ThaoLuanPage/ThemBaiViet';
import KetQuaTraCuu from './pages/XemThemPage/KetQuaTraCuu';
import DapAnSai from './pages/HocPage/DapAnSai';
import DapAnDung from './pages/HocPage/DapAnDung';
import ExamPage from './pages/Exam/ExamPage';
import Exam from './pages/Exam/Exam';

const routes = [
    {
        path: '/home',
        exact: true,
        main: () => <HomePage />
    },
    {
        path: '/',
        exact: true,
        main: () => <LandingPage />
    },
    {
        path: '/thao-luan',
        exact: true,
        main: () => <ThaoLuanPage />
    },
    {
        path: '/thao-luan/them-bai-viet',
        exact: true,
        main: () => <ThemBaiViet />
    },
    {
        path: '/thao-luan-chi-tiet',
        exact: true,
        main: () => <ThaoLuanChiTietPage />
    },
    {
        path: '/cua-hang',
        exact: true,
        main: () => <CuaHangPage />
    },
    {
        path: '/tu-dien',
        exact: true,
        main: () => <TuDienPage />
    },
    {
        path: '/ketquatracuu',
        exact: true,
        main: (location) => <KetQuaTraCuu location={location} />
    },
    {
        path: '/dapansai',
        exact: true,
        main: () => <DapAnSai />
    },
    {
        path: '/dapandung',
        exact: true,
        main: () => <DapAnDung />
    },
    {
        path: '/ketquatracuu',
        exact: true,
        main: () => <KetQuaTraCuu />
    },
    {
        path: '/tu-vung',
        exact: true,
        main: () => <TuVungPage />
    },
    {
        path: '/hochinhanh',
        exact: true,
        main: () => <HocHinhAnh />
    },
    {
        path: '/nap-tien',
        exact: true,
        main: () => <NapTienPage />
    },
    {
        path: '/flashcard',
        exact: true,
        main: () => <FlashCardPage />
    },
    {
        path: '/caidatmatkhau',
        exact: true,
        main: () => <CaiDatMatKhau />
    },
    {
        path: '/caidattaikhoan',
        exact: true,
        main: () => <CaiDatTaiKhoan />
    },
    {
        path: '/baihoc/:quizId',
        exact: true,
        main: (match) => <Hoc match={match}/>,
    },{
        path: '/exam',
        exact: true,
        main: () => <Exam/>
    }
    ,{
        path: '/exam/:examId',
        exact: true,
        main: (match) => <ExamPage match={match}/>
    },
    {
        path: '/signin',
        exact: true,
        main: () => <SignInPage />
    },
    {
        path: '/signup',
        exact: true,
        main: () => <SignUpPage />
    },
    {
        path: '/admin',
        exact: true,
        main: () => <Admin />
    },
    {
        path: '/management',
        exact: true,
        main: () => <Management />
    },
    {
        path: '/managementword',
        exact: true,
        main: () => <ManagementWord />
    },
    {
        path: '/loi',
        exact: false,
        main: () => <NotFoundPage />
    }
];

export default routes;