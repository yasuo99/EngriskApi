import React from 'react';
import HomePage from './pages/HomePage/HomePage';
import ThaoLuanPage from './pages/ThaoLuanPage/ThaoLuanPage';
import ThaoLuanChiTietPage from './pages/ThaoLuanPage/ThaoLuanChiTietPage';
import CuaHangPage from './pages/CuaHangPage/CuaHangPage';
import TuDienPage from './pages/XemThemPage/TuDienPage';
import TuVungPage from './pages/XemThemPage/TuVungPage';

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
];

export default routes;