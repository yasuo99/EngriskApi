import React, { Component } from 'react';
import { Link } from "react-browser-router";
import SubMenu from "../admin/SubMenu";
import HeaderAdmin from "../admin/HeaderAdmin";
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
const word = {
    vocabulary: '',
    typeOfWord: '',
    topic: 'Giao tiếp hàng ngày',
    synonym: '',
    mean:'',
}
const memory = {
    fileMemory: '',
    contentMemory: '',
}
class Word extends Component {

    render() {
        return (
            <div>
                <div id="wrapper">
                    <SubMenu></SubMenu>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <HeaderAdmin></HeaderAdmin>
                            <div className="container word">
                                <Link className="fa fa-chevron-left" to="/quanly-tuvung"> <i>Trở về</i></Link>
                                <div className="row p-LeftRight">
                                    <div className="col-4 border-wordLeft"></div>
                                    <div className="col-4 text-center title">
                                        <h4>THÔNG TIN TỪ VỰNG</h4>
                                    </div>
                                    <div className="col-4 border-wordRight"></div>
                                </div>
                                <div className="row">
                                    <div className="col-8">
                                        <Formik
                                            initialValues={word}
                                            onSubmit={async (values, { resetForm }) => {
                                                await new Promise((r) => setTimeout(r, 500));
                                                alert(JSON.stringify(values, null, 2));
                                                resetForm({})
                                            }}
                                        >
                                            {({ resetForm }) => (
                                                <Form className="content" >
                                                    <div className="vocabulary">
                                                        <label htmlFor="vocabulary">Từ vựng:</label>
                                                        <Field
                                                            type="text"
                                                            placeholder="Nhập từ vựng"
                                                            required
                                                            id="vocabulary"
                                                            name="vocabulary"></Field>
                                                    </div>
                                                    <div className="typeOfWord" >
                                                        <label htmlFor="typeOfWord">Loại từ:</label>
                                                        <Field
                                                            as="select"
                                                            name="typeOfWord"
                                                            id="typeOfWord">
                                                            <option value="Danh từ">Danh từ</option>
                                                            <option value="Tính từ">Tính từ</option>
                                                            <option value="Động từ">Động từ</option>
                                                            <option value="Trạng từ">Trạng từ</option>
                                                        </Field>
                                                    </div>
                                                    <div className="topic">
                                                        <label htmlFor="topic">Chủ đề:</label>
                                                        <Field
                                                            as="select"
                                                            name="topic"
                                                            id="topic">
                                                            <option value="Giao tiếp hằng ngày">Giao tiếp hằng ngày</option>
                                                            <option value="Toeic">Toeic</option>
                                                        </Field>
                                                    </div>
                                                    <div className="synonym">
                                                        <label htmlFor="synonym">Từ đồng nghĩa:</label>
                                                        <Field
                                                            type="text"
                                                            placeholder="Nhập từ đồng nghĩa"
                                                            name="synonym"
                                                            id="synonym"
                                                            required></Field> 
                                                    </div>
                                                    <div className="mean">
                                                        <label htmlFor="synonym">Nghĩa từ vựng:</label>
                                                        <Field
                                                            type="text"
                                                            placeholder="Nhập nghĩa của từ vựng"
                                                            name="mean"
                                                            id="mean"
                                                            required></Field>
                                                    </div>
                                                    <div className="row justify-content-center function">

                                                        <div className="col-md-2">
                                                            <button className="save" type="submit" >Lưu lại</button>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <button className="reset" onClick={() => resetForm(word)}>Làm mới</button>
                                                        </div>
                                                    </div>
                                                </Form>
                                            )}
                                        </Formik>

                                    </div>
                                    <div className="col-4 border-left">
                                        <h5 className="titleMemory text-center pt-3">TẠO THẺ GHI NHỚ</h5>
                                        <div>
                                            <Formik
                                                initialValues={memory}
                                                onSubmit={async (values, { resetForm }) => {
                                                    await new Promise((r) => setTimeout(r, 500));
                                                    alert(JSON.stringify(values, null, 2));
                                                    resetForm({})
                                                }}
                                            >
                                                {({ }) => (
                                                    <div>
                                                        <Form className="content" >
                                                            <div className="fileMemory">
                                                                <label htmlFor="fileMemory">Chọn file ảnh
                                                            <Field
                                                                        type="file"
                                                                        id="fileMemory"
                                                                        name="fileMemory" />
                                                                </label>
                                                            </div>
                                                            <div className="contentMemory">
                                                                <Field
                                                                    className="contentMemory"
                                                                    placeholder="Nhập nội dung thẻ nhớ"
                                                                    type="text"
                                                                    id="contentMemory"
                                                                    name="contentMemory"
                                                                    component="textarea"
                                                                    defaultValue={""} />
                                                            </div>

                                                            <div className="row function">
                                                                <button className="createMemory" type="submit" >TẠO THẺ</button>
                                                            </div>
                                                        </Form>
                                                        <div id="owl-carousel" className="carousel slide" data-ride="carousel">
                                                            <div className="carousel-inner">

                                                                <div className="carousel-item active" >
                                                                    <div className="row">
                                                                        <div className="col">
                                                                            <div className="cardMemory">
                                                                                <img src="/image/english (1).jpg" alt="imageMemory" className="imageMemory"></img>
                                                                                <p className="contentMemory">To cooperate with that company, he had to abide by the contract's conditions.</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="carousel-item" >
                                                                    <div className="row">
                                                                        <div className="col">
                                                                            <div className="cardMemory">
                                                                                <img src="/image/english (1).jpg" alt="imageMemory" className="imageMemory"></img>
                                                                                <p className="contentMemory">To cooperate with that company, he had to abide by the contract's conditions.</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <a className="carousel-control-prev" href="#owl-carousel" data-slide="prev"> <span className="fa fa-chevron-left" aria-hidden="true"></span></a> <a className="carousel-control-next" href="#owl-carousel" data-slide="next"> <span className="fa fa-chevron-right" aria-hidden="true"></span></a>
                                                            </div>

                                                        </div>
                                                    </div>
                                                )}
                                            </Formik>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Link className="scroll-to-top rounded" to="#page-top">
                    <i className="fa fa-angle-up" />
                </Link>
                <div className="modal fade" id="logoutModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Bạn có chắc chắn muốn đăng xuất không?</h5>
                                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">Chọn "Đăng xuất" bên dưới nếu bạn đã sẵn sàng kết thúc phiên hiện tại của mình.</div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" type="button" data-dismiss="modal">Hủy</button>
                                <Link className="btn btn-primary" to="login.html">Đăng xuất</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default Word;