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

const routes = [
    {
        path: '/',
        exact: true,
        main: () => <HomePage />
    },
    {
        path: '/thaoluan',
        exact: true,
        main: () => <ThaoLuanPage />
    },
    {
        path: '/thaoluanchitiet',
        exact: true,
        main: () => <ThaoLuanChiTietPage />
    },
    {
        path: '/cuahang',
        exact: true,
        main: () => <CuaHangPage />
    },
    {
        path: '/tudien',
        exact: true,
        main: () => <TuDienPage />
    },
    {
        path: '/tuvung',
        exact: true,
        main: () => <TuVungPage />
    },
    {
        path: '/hochinhanh',
        exact: true,
        main: () => <HocHinhAnh />
    },
    {
        path: '/hoc/:id',
        exact: true,
        main: () => <Hoc/>
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
];

export default routes;