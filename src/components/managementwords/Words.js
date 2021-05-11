import React, { Component } from 'react';
import { Link } from "react-browser-router";
import SubMenu from "../admin/SubMenu";
import HeaderAdmin3 from "../admin/HeaderAdmin3";
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
const word = {
    vocabulary: '',
    typeOfWord: '',
    topic: 'Giao tiếp hàng ngày',
    synonym: '',
    mean: '',
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
                            <HeaderAdmin3></HeaderAdmin3>
                            <div className="container word">
                                <Link className="fa fa-chevron-left" to="/quanly-tuvung"> <i>Trở về</i></Link>
                                <div className="row p-LeftRight">
                                    <div className="col-md-4 border-wordLeft"></div>
                                    <div className="col-md-4 text-center title">
                                        <h4>THÔNG TIN TỪ VỰNG</h4>
                                    </div>
                                    <div className="col-md-4 border-wordRight"></div>
                                </div>
                                <div className="row">
                                    <div className="col-md-8">
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
                                                        <div className="row">
                                                            <div className="col-md-4 text-right pt-2">
                                                                <label htmlFor="vocabulary">Từ vựng:</label>
                                                            </div>
                                                            <div className="col-8">
                                                                <Field
                                                                    type="text"
                                                                    placeholder="Nhập từ vựng"
                                                                    required
                                                                    id="vocabulary"
                                                                    name="vocabulary"></Field>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="typeOfWord" >
                                                        <div className="row">
                                                            <div className="col-md-4 text-right pt-2">
                                                                <label htmlFor="typeOfWord">Loại từ:</label>
                                                            </div>
                                                            <div className="col-md-8">
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
                                                        </div>
                                                    </div>
                                                    <div className="topic">
                                                        <div className="row">
                                                            <div className="col-md-4 text-right pt-2">
                                                                <label htmlFor="topic">Chủ đề:</label>
                                                            </div>
                                                            <div className="col-md-8">
                                                                <Field
                                                                    as="select"
                                                                    name="topic"
                                                                    id="topic">
                                                                    <option value="Giao tiếp hằng ngày">Giao tiếp hằng ngày</option>
                                                                    <option value="Toeic">Toeic</option>
                                                                </Field>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="synonym">
                                                        <div className="row">
                                                            <div className="col-md-4 text-right pt-2">
                                                                <label htmlFor="synonym">Từ đồng nghĩa:</label>
                                                            </div>
                                                            <div className="col-md-8">
                                                                <Field
                                                                    type="text"
                                                                    placeholder="Nhập từ đồng nghĩa"
                                                                    name="synonym"
                                                                    id="synonym"
                                                                    required></Field>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mean"><div className="row">
                                                        <div className="col-md-4 text-right pt-2">
                                                            <label htmlFor="synonym">Nghĩa từ vựng:</label>
                                                        </div>
                                                        <div className="col-md-8">
                                                            <Field
                                                                type="text"
                                                                placeholder="Nhập nghĩa của từ vựng"
                                                                name="mean"
                                                                id="mean"
                                                                required></Field>
                                                        </div>
                                                    </div>
                                                    </div>
                                                    <div className="row function">
                                                        <div className="col-md-8 offset-md-4">
                                                            <button className="save" type="submit" >Lưu lại</button>
                                                            <button className="reset" onClick={() => resetForm(word)}>Làm mới</button>
                                                        </div>
                                                    </div>
                                                </Form>
                                            )}
                                        </Formik>

                                    </div>
                                    <div className="col-md-4 border-left">
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