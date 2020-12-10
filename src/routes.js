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
        main: () => <KetQuaTraCuu />
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
        path: '/ketqua-exam',
        exact: true,
        main: () => <KetQuaExam />
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
        path: '/quanly-tuvung',
        exact: true,
        main: () => <ManagementWord />
    },
    {
        path: '/quanly-thongbao',
        exact: true,
        main: () => <ManagementInfor />
    },
    {
        path: '/quanly-tailieu',
        exact: true,
        main: () => <ManagementDoc />
    },
    {
        path: '/quanly-cauhoi',
        exact: true,
        main: () => <ManagementQuestion />
    },
    {
        path: '/quanly-naptien',
        exact: true,
        main: () => <ManagementPayment />
    },
    {
        path: '/quanly-quiz',
        exact: true,
        main: () => <ManagementQuiz/>
    },
    {
        path: '/quanly-exam',
        exact: true,
        main: () => <ManagementExam/>
    },
    {
        path: '/quanly-taikhoan',
        exact: true,
        main: () => <ManagementAccount/>
    },
    {
        path: '/quanly-baiviet',
        exact: true,
        main: () => <ManagementPost />
    },
    {
        path: '/loi',
        exact: false,
        main: () => <NotFoundPage />
    },
    {
        path: '/quyentruycap',
        exact: true,
        main: () => <QuyenTruyCap />
    },
];

export default routes;