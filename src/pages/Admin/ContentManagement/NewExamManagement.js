import React, { Component, useEffect, useState } from "react";
import SubMenu from '../../../components/admin/SubMenu'
import { Link } from "react-router-dom";
import HeaderAdmin from "../../../components/admin/HeaderAdmin";
// import ManagementQuiz_Exam from "./ManagementQuiz_Exam";
import { Button, Tabs, Tab, Table, Modal, Badge } from "react-bootstrap";
import Paginate from "../../../components/pagination/Paginate";
import DifficultRender from "../../../components/utils/DifficultRender";
import ExamPreview from ".././ContentManagement/ExamPreview";
import { MapPublishStatus, MapPublishStatusToBool, PublishStatus } from "../../../constants/PublishStatus";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import examApiv2 from "../../../api/2.0/examApi";
import { AiOutlineBarChart } from 'react-icons/ai'
import Search from "../../../components/search/Search";
const NewExamManagement = ({ }) => {
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset, unregister } = useForm();
    const [quizModalDelete, setQuizModalDelete] = useState(false)
    const [exams, setExams] = useState({
        currentPage: 1,
        pageSize: 5,
        totalPages: 1,
        items: []
    })
    const [examInspectModal, setExamInspectModal] = useState(false);
    const [examQuery, setExamQuery] = useState('')
    const [selectedExam, setSelectedExam] = useState({});
    const [examModalCreate, setExamModalCreate] = useState(false)
    const [examModalDelete, setExamModalDelete] = useState(false)
    const [examModalPublish, setExamModalPublish] = useState(false);
    const [examRefresh, setExamRefresh] = useState(false);
    const [base, setBase] = useState("")
    const [isBusy, setIsBusy] = useState(true);
    async function fetchExamData() {
        const params = {
            currentPage: exams.currentPage,
            pageSize: exams.pageSize,
            search: examQuery,
            status: 'Nope'
        }
        const result = await examApiv2.getAll(params)
        setExams(result)
    }
    useEffect(() => {
        fetchExamData();
    }, [exams.currentPage, exams.pageSize, examQuery])
    useEffect(() => {
        if (examRefresh) {
            fetchExamData();
            setExamRefresh(false);
        }
    }, [examRefresh])
    function toggleExamModalDelete(exam) {
        setSelectedExam(exam);
        setExamModalDelete(!examModalDelete);
    }
    function toggleExamModalCreate() {
        reset();
        setExamModalCreate(!examModalCreate);
    }
    function examSearch(query) {
        setExamQuery(query);
        setExams({
            ...exams,
            currentPage: 1
        })
    }
    function examPaginationChange(currentPage, pageSize) {
        setExams({
            ...exams,
            currentPage: currentPage,
            pageSize: pageSize
        })
    }
    function toggleModalExamPublish(exam) {
        setSelectedExam(exam);
        setExamModalPublish(!examModalPublish);
    }
    async function submitExamDelete() {
        const result = await examApiv2.delete(selectedExam.id);
        if (result.status == 200) {
            toast('Thành công', { type: 'success', autoClose: 2000 })
            toggleExamModalDelete({})
            setExamRefresh(true);
        }
        else {
            toast('Thất bại', { type: 'error', autoClose: 2000 })
        }
    }
    async function submitExamPublishChange() {
        const status = selectedExam.publishStatus == PublishStatus.PUBLISHED ? PublishStatus.UNPUBLISHED : PublishStatus.PUBLISHED;
        const params = {
            status: status
        }
        const result = await examApiv2.publishChange(selectedExam.id, params);
        if (result.status == 200) {
            toast('Thành công', { type: 'success', autoClose: 2000 })
            toggleModalExamPublish({});
            setExamRefresh(true);
        }
        else {
            toast('Thất bại', { type: 'error', autoClose: 2000 })
        }
    }
    async function submitExamCreate(data) {
        console.log(data);
        const result = await examApiv2.create(data);
        if (result.status == 200) {
            toast('Thành công', { type: 'success', autoClose: 2000 })
            toggleExamModalCreate();
            setExamRefresh(true);
        } else {
            toast('Thất bại', { type: 'error', autoClose: 2000 })
        }
    }
    return (
        <div>
            <div id="wrapper">
                <SubMenu></SubMenu>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderAdmin></HeaderAdmin>
                        <div className="container-fluid ql_quiz">

                            <div className="card shadow mb-4">
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <div className='d-flex justify-content-between mt-1'>
                                            <Search placeholder='Tìm kiếm theo tên, mô tả....'></Search>
                                            <Button variant="primary" className="btn btn-quiz mr-2 mb-3 rounded-pill" onClick={() => toggleExamModalCreate()}><i className="fa fa-plus" /> Thêm exam</Button>
                                        </div>
                                        {/* <Button variant="primary" className="btn btn-success mr-2 mb-3"  ><i className="fa fa-plus" /> </Button> */}
                                        <Table striped bordered hover responsive>
                                            <thead>
                                                <tr>
                                                    <th className="tenbaiquiz">Tên bài</th>
                                                    <th className="motaquiz">Mô tả</th>
                                                    <th className="dokhoquiz">Thời gian làm</th>
                                                    <th className="dokhoquiz">Số câu hỏi</th>
                                                    <th className="dokhoquiz">Độ khó</th>
                                                    <th className="dokhoquiz">Mục đích</th>
                                                    <th className="status">Trạng thái</th>
                                                    <th style={{ width: '170px' }} />
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {exams.items.map((exam, index) =>
                                                    <tr key={index}>
                                                        <td style={{ width: '100px' }}>{exam.title}</td>
                                                        <td className='cell-4'><span className='text-overflow'>{exam.detail}</span></td>
                                                        <td>{exam.duration} phút</td>
                                                        <td>{exam.questions.length}</td>
                                                        <td><DifficultRender difficult={exam.difficult}></DifficultRender></td>
                                                        <td> {exam.forScript ? 'Bài học' : 'Kiểm tra'}</td>
                                                        <td> <h5><Badge variant={MapPublishStatus(exam.publishStatus).variant}>{MapPublishStatus(exam.publishStatus).text}</Badge></h5> </td>
                                                        <td>
                                                            <Link className={`btn btn-primary btn-delete btn-delete mr-2 ${exam.publishStatus == PublishStatus.PUBLISHED ? 'disabled' : ''}`} to={`/admin/quan-ly-exam/${exam.id}/cai-dat`}>
                                                                <i className="fa fa-edit"></i></Link>
                                                            <Link className={`btn btn-primary btn-delete btn-delete mr-2`} to={`/admin/quan-ly-exam/${exam.id}/overview`}>
                                                                <AiOutlineBarChart style={{ fontSize: '20px' }}></AiOutlineBarChart></Link>
                                                            <Button disabled={exam.publishStatus == PublishStatus.PUBLISHED} onClick={() => toggleExamModalDelete(exam)} variant="danger" className="btn btn-delete"><i className="fa fa-trash" /></Button>
                                                            <button
                                                                className="btn btn-primary btn-delete ml-1"
                                                                onClick={() => toggleModalExamPublish(exam)}
                                                                title="Chuyển trạng thái"
                                                            >
                                                                {exam.publishStatus == PublishStatus.UNPUBLISHED ? <i className="fa fa-upload"></i> : <i className="fa fa-download"></i>}
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )}

                                            </tbody>
                                        </Table>
                                        <Paginate currentPage={exams.currentPage} pageSize={exams.pageSize} totalPages={exams.totalPages} change={examPaginationChange}></Paginate>
                                    </div>
                                    {examModalCreate && <Modal show={examModalCreate} animation onHide={() => toggleExamModalCreate()} size="lg">
                                        <Modal.Body>
                                            <div className='text-center'>
                                                <h3 className='text-dark'> Thêm exam</h3>
                                            </div>
                                            <form id="create-quiz-form" className="form-group" onSubmit={handleSubmit(submitExamCreate)}>
                                                <div className="container text-dark">
                                                    <div>
                                                        <div>Tên bài exam *</div>
                                                        <div className="wrap-input100 mb-3">
                                                            <input className="input100" name="title" placeholder='Nhập tên' {...register('title',
                                                                {
                                                                    required: 'Tên exam không được để trống',
                                                                })}
                                                                type="text"
                                                                id="title"
                                                                autoComplete="off"
                                                            ></input>
                                                            {errors.title && <div className='invalid'>{errors.title.message}</div>}
                                                        </div>
                                                        <div>Mô tả *</div>
                                                        <div className="wrap-input100 mb-3">
                                                            <input className="input100" name="title" placeholder='Nhập mô tả' {...register('detail',
                                                                {
                                                                    required: 'Mô tả không được để trống',
                                                                })}
                                                                type="text"
                                                                id="title"
                                                                autoComplete="off"
                                                            ></input>
                                                            {errors.detail && <div className='invalid'>{errors.detail.message}</div>}
                                                        </div>
                                                        <div>Thời gian làm bài *</div>
                                                        <div className="wrap-input100 mb-3">
                                                            <input className="input100" name="duration" placeholder='Nhập thời gian làm' {...register('duration',
                                                                {
                                                                    required: 'Mô tả không được để trống',
                                                                    min: { value: 10, message: 'Thời gian làm bài tối thiểu 10 phút' },
                                                                    max: { value: 120, message: 'Thời gian làm bài tối đa 120 phút' }
                                                                })}
                                                                type="number"
                                                                id="title"
                                                                autoComplete="off"
                                                                defaultValue={10}
                                                            ></input>
                                                            {errors.duration && <div className='invalid'>{errors.duration.message}</div>}
                                                        </div>
                                                    </div>

                                                </div>
                                            </form>
                                        </Modal.Body>
                                        <div className="d-flex">
                                            <Button variant="light" className="btn-cancel rounded-0 modal-btn" onClick={() => toggleExamModalCreate()}>Trở lại</Button>
                                            <Button variant="primary" className="rounded-0 modal-btn" form="create-quiz-form" type="submit">Lưu lại</Button>
                                        </div>
                                    </Modal>}
                                    {Object.keys(selectedExam).length > 0 && <Modal show={examModalPublish} onHide={() => toggleModalExamPublish({})} dialogClassName='sweet-alert-modal rounded' contentClassName="modal-basic-content">
                                        <Modal.Body>
                                            <div className='text-center'>
                                                <i className='fa fa-4x fa-warning text-info'></i>
                                                <br></br>
                                                <br></br>
                                                <h3 className='text-primary'>
                                                    {!MapPublishStatusToBool(selectedExam.publishStatus) ? 'Bạn có chắc muốn công khai quiz này' : 'Bạn có chắc muốn ngừng công khai quiz này'}
                                                </h3>
                                                <p className='text-info'>
                                                    {`Người dùng sẽ ${!MapPublishStatusToBool(selectedExam.publishStatus) ? 'thấy và sử dụng được' : 'không thấy'}  quiz này`}
                                                </p>
                                            </div>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={() => toggleModalExamPublish({})}>
                                                Hủy
                                            </Button>
                                            <Button variant="primary" onClick={(e) => submitExamPublishChange()}>
                                                Xác nhận
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>}
                                </div>
                                <Modal show={examInspectModal} onHide={() => setExamInspectModal(!examInspectModal)} dialogClassName="modal-90w" size="lg">
                                    <Modal.Body>
                                        {Object.keys(selectedExam) && <ExamPreview exam={selectedExam} closeReview={() => setExamInspectModal(!examInspectModal)} />}
                                    </Modal.Body>
                                    <Modal.Footer bsPrefix='d-flex justify-content-end mb-2'>
                                        <Button className='mr-4' variant="secondary" onClick={() => setExamInspectModal(!examInspectModal)}>
                                            Kết thúc preview
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                                <Modal
                                    show={examModalDelete}
                                    onHide={() => toggleExamModalDelete({})}
                                    contentClassName="modal-basic-content"
                                    dialogClassName='sweet-alert-modal'
                                    animation
                                >
                                    <Modal.Body>
                                        <div className='text-center'>
                                            <i className='fa fa-4x fa-warning text-danger'></i>
                                            <br></br>
                                            <br></br>
                                            <h3>Bạn có chắc muốn xóa bài exam này không ?</h3>
                                            <p className='text-danger'>
                                                Không thể hoàn tác
                                            </p>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => toggleExamModalDelete({})}>
                                            Hủy
                                        </Button>
                                        <Button variant="danger" onClick={(e) => submitExamDelete()}>
                                            Xóa
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NewExamManagement;