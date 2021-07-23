import React, { Component, useEffect, useRef, useState } from "react";
import SubMenu from "../../components/admin/SubMenu";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
import { Modal, Button, Table } from "react-bootstrap";
import Paginate from "../../components/pagination/Paginate";
import routeApi from "../../api/2.0/routeApi";
import { toast } from "react-toastify";
import Sections from "../../components/sections/Sections";
import { Link } from "react-router-dom";
import Search from "../../components/search/Search";

const ManagementRoutes = () => {
    const defaultData = {
        title: '',
        image: null,
        description: ''
    }
    const [modalCreate, setModalCreate] = useState(false)
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalSections, setModalSections] = useState(false);
    const [routes, setRoutes] = useState({
        currentPage: 1,
        pageSize: 5,
        totalPages: 1,
        items: []
    })
    const [route, setRoute] = useState({})
    const [data, setData] = useState(defaultData)
    const [query,setQuery] = useState('')
    const [isRefresh, setIsRefresh] = useState(false);
    const tempRoutes = useRef(null);

    async function fetchData(){
        const params = {
            currentPage: routes.currentPage,
            pageSize: routes.pageSize,
            search: query
        }
        const result = await routeApi.adminGetAll(params);
        setRoutes(result);
    }
    useEffect(() => {
        fetchData();
    }, [routes.currentPage,routes.pageSize, query])
    useEffect(() => {
        if (isRefresh) {
            fetchData();
            setIsRefresh(false);
        }
    }, [isRefresh])
    function toggleModalCreate() {
        setData(defaultData)
        setModalCreate(!modalCreate)
    }
    function toggleModalEdit(route) {
        setData(defaultData)
        setRoute(route)
        setModalEdit(!modalEdit)
    }
    function toggleModalDelete(route) {
        setData(defaultData)
        setRoute(route)
        setModalDelete(!modalDelete)
    }
    function toggleModalSections(route) {
        setRoute(route)
        setModalSections(!modalSections);
    }
    async function submitCreate() {
        console.log(data);
        var formData = new FormData();
        formData.set('title', data.title);
        formData.set('description', data.description);
        formData.set('image', data.image);
        const result = await routeApi.createRoute(formData);
        if (result.status == 200) {
            toast('Thêm thành công', { type: 'success' })
            setModalCreate(!modalCreate)
            setRoutes([...routes, result.route])
            setIsRefresh(true);
        } else {
            toast('Thêm thất bại', { type: 'error' })
        }
    }
    async function submitEdit() {
        setModalEdit(!modalEdit)
        var formData = new FormData();
        formData.set('title', data.title);
        formData.set('description', data.description);
        formData.set('image', data.image);
        const result = await routeApi.updateRoute(route.id, formData);
        if (result.status == 200) {
            toast('Cập nhật thành công', { type: 'success' })
            toggleModalEdit({})
            setIsRefresh(true);
        } else {
            toast('Cập nhật thất bại', { type: 'error' })
        }
    }
    async function submitDelete() {
        setModalDelete(!modalDelete)
        const result = await routeApi.deleteRoute(route.id);
        if (result.status == 200) {
            toast('Xóa thành công', { type: 'success' })
            toggleModalDelete({})
            setIsRefresh(true);
        } else {
            toast('Xóa thất bại', { type: 'error' })
        }
    }
    async function pageChange(currentPage, pageSize) {
        const params = {
            currentPage: currentPage,
            pageSize: pageSize,
        };
        setRoutes({
            ...routes,
            currentPage: params.currentPage,
            pageSize: params.pageSize
        })
    }
    function querySearch(query) {
        setQuery(query);
        setRoutes({
            ...routes,
            currentPage: 1
        })
    }
    return (
        <div id="wrapper">
            <SubMenu></SubMenu>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <HeaderAdmin></HeaderAdmin>
                    <div className="container-fluid">
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary">Quản lý lộ trình</h6>
                            </div>
                            <div className="card-body">
                                <div className='d-flex justify-content-between'>
                                    <button
                                        className="btn btn-primary mb-2"
                                        onClick={() => toggleModalCreate()}
                                    >
                                        Thêm lộ trình <i className='fa fa-plus'></i>
                                    </button>
                                    <Search queryFunction={querySearch}></Search>
                                </div>

                                <div className="table-responsive">
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Tiêu đề</th>
                                                <th>Ảnh</th>
                                                <th>Mô tả</th>
                                                <th>Số lượng bài học</th>
                                                <th>Chức năng</th>
                                            </tr>

                                        </thead>
                                        <tbody>
                                            {routes.items.map((route, index) =>
                                                <tr key={index}>
                                                    <th>{route.title}</th>
                                                    <th style={{width: '200px'}}>
                                                        <img
                                                            className="img-fluid"
                                                            src={route.routeImage}
                                                        />
                                                    </th>
                                                    <th>{route.description}</th>
                                                    <th>{route.sections.length}</th>
                                                    <th>
                                                        <button
                                                            className="btn btn-info ml-1 btn-delete"
                                                            onClick={() => toggleModalSections(route)}
                                                        >
                                                            <i className="fa fa-table"></i>
                                                        </button>
                                                        <button
                                                            className="btn btn-success ml-1"
                                                            onClick={() => toggleModalEdit(route)}
                                                        >
                                                            <i className="fa fa-edit"></i>
                                                        </button>
                                                        <button
                                                            className="btn btn-danger btn-delete ml-1"
                                                            onClick={() => toggleModalDelete(route)}
                                                        >
                                                            <i className="fa fa-trash"></i>
                                                        </button>
                                                    </th>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                    <div>
                                        <Paginate
                                            currentPage={routes.currentPage}
                                            totalPages={routes.totalPages}
                                            pageSize={routes.pageSize}
                                            change={pageChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal show={modalCreate} onHide={() => toggleModalCreate()} dialogClassName='sweet-alert-modal' contentClassName="modal-basic-content">
                    <Modal.Body>
                    <div className='text-center'>
                            <h3 className='text-info'> Thêm lộ trình mới</h3>
                        </div>
                        <div className="form-group">
                            <p className="titleInfo">Thông tin lộ trình</p>
                            <div className="card-input mt-3">
                                <span>Tiêu đề</span>
                                <input
                                    type="text"
                                    name="url"
                                    onChange={(e) => setData({ ...data, title: e.target.value })}
                                    required
                                    placeholder="Tiêu đề của lộ trình..."
                                />
                            </div>
                            <div className="card-input mt-3">
                                <span>Hình ảnh</span>
                                <input
                                    type="file"
                                    onChange={(e) => setData({ ...data, image: e.target.files[0] })}
                                    required
                                    accept="image/*"
                                    placeholder="Hình ảnh của lộ trình..."
                                />
                            </div>
                            <div className="card-input mt-3">
                                <span>Mô tả</span>
                                <input
                                    type="text"
                                    name="url"
                                    onChange={(e) => setData({ ...data, description: e.target.value })}
                                    required
                                    placeholder="Mô tả của lộ trình..."
                                />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => toggleModalCreate()}>
                            Hủy
                        </Button>
                        <Button variant="primary" onClick={(e) => submitCreate()}>
                            Thêm
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={modalSections} onHide={() => toggleModalSections({})} animation dialogClassName="modal-90w" contentClassName="modal-90w-content" scrollable={true}>
                    <Modal.Body>
                        <Sections sourceRoute={route} closeEdit={toggleModalSections} />
                    </Modal.Body>
                </Modal>
                <Modal show={modalEdit} onHide={() => toggleModalEdit({})} dialogClassName='sweet-alert-modal' contentClassName="modal-basic-content">
                    <Modal.Body>
                        <div className='text-center'>
                            <h3 className='text-info'> Cập nhật thông tin lộ trình</h3>
                        </div>
                        <div className="form-group">
                            <div className="container">
                                <div className="row">
                                    <div className="col-6">
                                        <p className="titleInfo">Thông tin cũ</p>
                                        <div className="card-input mt-3">
                                            <span>Tiêu đề</span>
                                            <input
                                                type="text"
                                                name="url"
                                                value={route.title}
                                                readOnly
                                            />
                                        </div>
                                        <div className="card-input mt-3">
                                            <span>Hình ảnh</span>
                                            <img
                                                className="img-thumbnail"
                                                src={route.routeImage}
                                            />
                                        </div>
                                        <div className="card-input mt-3">
                                            <span>Mô tả</span>
                                            <input
                                                type="text"
                                                name="url"
                                                value={route.description}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <p className="titleInfo">Thông tin mới</p>
                                        <div className="card-input mt-3">
                                            <span>Tên nhóm</span>
                                            <input
                                                type="text"
                                                name="url"
                                                onChange={(e) => setData({ ...data, title: e.target.value })}
                                            />
                                        </div>
                                        <div className="card-input mt-3">
                                            <span>Hình ảnh</span>
                                            <input
                                                type="file"
                                                onChange={(e) => setData({ ...data, image: e.target.files[0] })}
                                            />
                                        </div>
                                        <div className="card-input mt-3">
                                            <span>Mô tả</span>
                                            <input
                                                type="text"
                                                name="url"
                                                onChange={(e) => setData({ ...data, description: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => toggleModalEdit({})}>
                            Hủy
                        </Button>
                        <Button variant="primary" onClick={(e) => submitEdit()}>
                            Lưu
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={modalDelete} onHide={() => toggleModalDelete({})} dialogClassName='sweet-alert-modal rounded' contentClassName="modal-basic-content">
                    <Modal.Body>
                        <div className='text-center'>
                            <i className='fa fa-4x fa-warning text-danger'></i>
                            <br></br>
                            <br></br>
                            <h3 className='text-info'>Bạn có chắc muốn xóa lộ trình này</h3>
                            <p className='text-danger'>
                                Không thể hoàn tác
                            </p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => toggleModalDelete({})}>
                            Hủy
                        </Button>
                        <Button variant="danger" onClick={(e) => submitDelete()}>
                            Xác nhận
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div >
    )
}
export default ManagementRoutes;