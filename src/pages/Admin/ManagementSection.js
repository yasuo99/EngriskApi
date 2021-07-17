import React, { Component, useEffect, useState } from 'react'
import SubMenu from '../../components/admin/SubMenu'
import { Link } from "react-router-dom";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
import { QLListSection } from '../../components/managementsections/QLListSection';
import { Button, Tabs, Tab, Table, Modal, OverlayTrigger, Popover, Row, Col, Nav, Toast, ListGroup } from "react-bootstrap";
import sectionApiV2 from '../../api/2.0/sectionApi';
import Paginate from '../../components/pagination/Paginate';
import Search from '../../components/search/Search';
import { toast } from 'react-toastify';
import sectionApi from '../../api/sectionApi';
import GrammarScript from '../../components/script/GrammarScript';
import { ScriptTypes } from '../../constants/ScriptTypes';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import VocabularyScript from '../../components/script/VocabularyScript';
import WritingScript from '../../components/script/WritingScript';
import ConversationScript from '../../components/script/ConversationScript';
import ListeningScript from '../../components/script/ListeningScript';
import ReadingScript from '../../components/script/ReadingScript';
import MiniExamScript from '../../components/script/MiniExamScript';
import questionApiV2 from './../../api/2.0/questionApi';
const styles = {
    width: 250,
    display: 'inline-table',
    marginRight: 10
};
const ManagementSection = () => {
    const initSection = {
        sectionName: '',
        description: '',
        file: {}
    }
    const [sections, setSections] = useState({
        currentPage: 1,
        pageSize: 5,
        items: [],
        totalPages: 1
    });
    const [selectedSection, setSelectedSection] = useState({
        scripts: []
    })
    const [modalCreate, setModalCreate] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalScript, setModalScript] = useState(false);
    const [questionModal, setQuestionModal] = useState(false);
    const [vocabularyModal, setVocabularyModal] = useState(false);
    const [section, setSection] = useState({
        scripts: []
    })
    const [newSection, setNewSection] = useState(initSection)
    const [refresh, setRefresh] = useState(false)
    const [errors, setErrors] = useState({
        sectionName: '',
    })
    const [wasValidate, setWasValidate] = useState(false);
    const [renderImage, setRenderImage] = useState({})
    const [grammar, setGrammar] = useState({})
    const [writing, setWriting] = useState({})
    const [reading, setReading] = useState({})
    const [listening, setListening] = useState({})
    const [conversation, setConversation] = useState({})
    const [vocabulary, setVocabulary] = useState({})
    const [miniExam, setMiniExam] = useState({})
    const [query, setQuery] = useState('')
    function toggleQuestionModal() {
        setQuestionModal(!questionModal)
        setVocabularyModal(false);
    }
    function toggleVocabularyModal() {
        setVocabularyModal(!vocabularyModal)
        setQuestionModal(false)
    }
    function toggleModalCreate() {
        setModalCreate(!modalCreate)
    }
    function toggleModalEdit(section) {
        setModalEdit(!modalEdit);
        setSelectedSection(section);
    }
    function toggleModalDelete(section) {
        setModalDelete(!modalDelete)
        setSelectedSection(section)
    }
    async function toggleModalScript(section) {
        setModalScript(!modalScript);
        if (!modalScript) {
            const result = await getSectionScriptEdit(section);
            setSelectedSection(result)
        }else{
            setSelectedSection({})
        }
    }
    useEffect(async () => {
        const params = {
            currentPage: sections.currentPage,
            pageSize: sections.pageSize,
            search: query
        }
        const data = await sectionApiV2.getManage(params)
        setSections(data);
    }, [sections.pageSize, sections.currentPage, query])
    useEffect(async () => {
        if (refresh) {
            const params = {
                currentPage: sections.currentPage,
                pageSize: sections.pageSize
            }
            const data = await sectionApiV2.getManage(params)
            setSections(data);
            setRefresh(false)
        }
    }, [refresh])
    function paginationChange(currentPage, pageSize) {
        setSections({
            ...sections,
            currentPage: currentPage,
            pageSize: pageSize
        })
    }
    function querySearch(query) {
        setSections({
            ...sections,
            currentPage: 1
        })
        setQuery(query);
    }
    async function sumitDelete() {
        const result = await sectionApiV2.delete(selectedSection.id);
        if (result.status === 200) {
            toast('Thành công', { type: 'success' })
            setRefresh(true);
            toggleModalDelete({})
        } else {
            toast('Thất bại', { type: 'error' })
        }
    }
    async function submitCreate() {
        var formData = new FormData();
        formData.set('sectionName', newSection.sectionName);
        formData.set('description', newSection.description);
        formData.set('file', newSection.file);
        try {
            const data = await sectionApi.create(formData);
            if (data.status == 200) {
                toast('Thành công', { type: 'success' })
                setNewSection(initSection)
                toggleModalCreate()
                setRefresh(true);
                setErrors({
                    ...errors,
                    sectionName: ''
                })
                setRenderImage({})
            }
            else {
                toast('Thất bại', { type: 'error' })
            }
        } catch (error) {
            console.log(error.response);
            if (error.response.status === 409) {
                setErrors({
                    ...errors,
                    sectionName: error.response.data.error
                })
                toast('Thất bại', { type: 'error' })
            }
        }
        setWasValidate(true);
    }
    async function submitEdit() {
        var formData = new FormData();
        formData.set('sectionName', newSection.sectionName);
        formData.set('description', newSection.description);
        formData.set('file', newSection.file);
        try {
            const data = await sectionApi.update(selectedSection.id, formData);
            console.log(data);
            if (data.status == 200) {
                toast('Thành công', { type: 'success' })
                setNewSection(initSection)
                toggleModalEdit({})
                setRefresh(true);
                setErrors({
                    ...errors,
                    sectionName: ''
                })
                setRenderImage({})
            }
            else {
                toast('Thất bại', { type: 'error' })
            }
        } catch (error) {
            console.log(error.response);
            if (error.response.status === 409) {
                setErrors({
                    ...errors,
                    sectionName: error.response.data.error
                })
                toast('Thất bại', { type: 'error' })
            }
        }
        setWasValidate(true);
    }
    function vocabularyFilter(query) {

    }
    function questionFilter(value) {

    }
    async function submit() {
        console.log(conversation);
        console.log(listening);
        console.log(reading);
        console.log(grammar);
        console.log(writing);
        console.log(vocabulary);
        let scripts = [];
        scripts.push(conversation);
        scripts.push(listening);
        scripts.push(reading);
        scripts.push(writing);
        scripts.push(grammar);
        scripts.push(vocabulary);
        scripts.push(miniExam);
        const result = await sectionApiV2.editScripts(selectedSection.id, scripts);
        if (result.status == 200) {
            toast('Thành công', { type: 'success' })
            toggleModalScript({})
        } else {
            if (result.status == 204) {
                toast('Không có gì thay đổi', { type: 'info' })
            } else {
                toast('Thất bại', { type: 'error' })
            }

        }
        console.log(scripts);

    }
    async function getSectionScriptEdit(section) {
        return await sectionApiV2.getScriptEdit(section.id);
    }
    return (
        <div>
            <div id="wrapper">
                <SubMenu></SubMenu>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderAdmin></HeaderAdmin>
                        <div className="container-fluid">
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary">Quản lý bài học</h6>
                                </div>
                                <div className="card-body">
                                    <div className='d-flex justify-content-between'>
                                        <button className="btn btn-word mb-2" onClick={() => toggleModalCreate()}>
                                            <i className='fa fa-plus'></i> Thêm bài học
                                        </button>
                                        <Search queryFunction={querySearch}></Search>
                                    </div>

                                    <div className="table-responsive">
                                        <Table striped bordered hover responsive>
                                            <thead>
                                                <tr>
                                                    <th className="dokhoquiz">Tiêu đề</th>
                                                    <th className="table-image">Ảnh</th>
                                                    <th className="tenbaiquiz">Mô tả</th>
                                                    <th className="dokhoquiz">Thuộc lộ trình</th>
                                                    <th className="table-function" ></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {sections.items.map((section, index) =>
                                                    <tr key={index}>
                                                        <td>
                                                            {section.sectionName}
                                                        </td>
                                                        <td>
                                                            <img className='img-thumbnail' src={section.photoUrl || ''}></img>
                                                        </td>
                                                        <td>
                                                            {section.description}
                                                        </td>
                                                        <OverlayTrigger key={section.id} trigger={["hover", "focus"]} placement="top" overlay={
                                                            <Popover id="popover-basic">
                                                                <Popover.Title as="h3">{section.route?.title}</Popover.Title>
                                                                <Popover.Content>
                                                                    <div className='d-flex justify-content-center'>
                                                                        <img className='chat-avatar' src={section.route?.routeImage}></img>

                                                                    </div>
                                                                    <p>Mô tả: {section.route?.description}</p>
                                                                    <p>Ngày tạo: {section.route?.createdDate}</p>
                                                                </Popover.Content>
                                                            </Popover>}>
                                                            <td>
                                                                {section.route?.title || 'Free'}
                                                            </td>
                                                        </OverlayTrigger>
                                                        <td>
                                                            <button className='btn btn-primary btn-delete mr-1' onClick={() => toggleModalScript(section)}><i className='fa fa-bars'></i></button>
                                                            <button className='btn btn-primary btn-delete mr-1'><i className='fa fa-info'></i></button>
                                                            <button className='btn btn-success mr-1' onClick={() => toggleModalEdit(section)}><i className='fa fa-edit'></i></button>
                                                            <button className='btn btn-danger btn-delete' onClick={() => toggleModalDelete(section)}><i className='fa fa-trash'></i></button>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </Table>
                                        <Paginate currentPage={sections.currentPage} pageSize={sections.pageSize} totalPages={sections.totalPages} change={paginationChange}></Paginate>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Modal show={modalCreate} animation onHide={() => toggleModalCreate()} centered>
                            <Modal.Header closeButton onClick={() => toggleModalCreate()}>
                                <h5>Thêm bài học</h5>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="form-group">
                                    <div className="container">
                                        <div>
                                            <div className={`card-input mt-3 ${wasValidate ? 'was-validated' : ''}`}>
                                                <span>Tiêu đề</span>
                                                <input
                                                    required
                                                    type="text"
                                                    onChange={(e) => {
                                                        setNewSection({ ...newSection, sectionName: e.target.value })
                                                        setErrors({ ...errors, sectionName: '' })
                                                    }}
                                                />
                                                <div className="invalid-feedback">
                                                    {errors.sectionName}
                                                </div>
                                            </div>


                                            <div className="card-input mt-3">
                                                <span>Mô tả</span>
                                                <textarea placeholder="Nhập mô tả bài học..."
                                                    name="content"
                                                    onChange={(e) => setNewSection({ ...newSection, description: e.target.value })}
                                                />
                                            </div>
                                            <div className='row'>
                                                <div className="card-input mt-3 col-6">
                                                    <span>Hình ảnh</span>
                                                    <input type='file' accept="image/png, image/jpeg" onChange={(e) => {
                                                        setNewSection({ ...newSection, file: e.target.files[0] })
                                                        var image = URL.createObjectURL(e.target.files[0])
                                                        setRenderImage(image);
                                                    }}></input>
                                                </div>
                                                <div className='col-6'>
                                                    <span>Hình được chọn</span>
                                                    <img className="img-thumbnail" src={renderImage} alt='Chưa chọn'></img>
                                                </div>
                                            </div>


                                        </div>
                                    </div>


                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => toggleModalCreate()}>Trở lại</Button>
                                <Button variant="primary" onClick={(e) => submitCreate()}>Lưu lại</Button>
                            </Modal.Footer>
                        </Modal>
                        {/* Modal Scripts */}
                        {Object.keys(selectedSection).length > 1 && <Modal show={modalScript} animation backdrop='static' centered size="lg" dialogClassName='modal-full-screen'>
                            <Modal.Body>
                                <div id="content" style={{ overflow: "auto" }} className='modal-background'>
                                    <main id="scroll">
                                        <div className="mt-2">
                                            <div className="row">
                                                <div className="offset-md-11 col-1">
                                                    <button className="btn btn-light rounded-circle" onClick={() => toggleModalScript({})}>
                                                        <i className="fa fa-remove"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='nav d-flex flex-column'>
                                            <Tab.Container id="left-tabs-example" defaultActiveKey="grammar" className='h-100'>
                                                <Row title='Kịch bản' className='script-panel'>

                                                    <Col sm={2} title='Kịch bản' className='col sticky-top'>
                                                        <h5>Kịch bản</h5>
                                                        <Nav variant="pills" className="d-flex flex-column align-self-center">
                                                            <Nav.Item className='border rounded'>
                                                                <Nav.Link eventKey="grammar">Ngữ pháp</Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item className='border rounded mt-1'>
                                                                <Nav.Link eventKey="vocabulary">Từ vựng</Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item className='border rounded mt-1'>
                                                                <Nav.Link eventKey="conversation">Hội thoại</Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item className='border rounded mt-1'>
                                                                <Nav.Link eventKey="reading">Luyện đọc</Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item className='border rounded mt-1'>
                                                                <Nav.Link eventKey="listening">Luyện nghe</Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item className='border rounded mt-1'>
                                                                <Nav.Link eventKey="writing">Luyện viết</Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item className='border rounded mt-1'>
                                                                <Nav.Link eventKey="exam">Mini exam</Nav.Link>
                                                            </Nav.Item>
                                                        </Nav>
                                                    </Col>
                                                    <Col sm={10} className='col'>
                                                        <Tab.Content>
                                                            <Tab.Pane eventKey="grammar">
                                                                <GrammarScript setGrammar={setGrammar} script={selectedSection.scripts.find(script => script.type == ScriptTypes.GRAMMAR)} questionFilter={questionFilter} questionModal={questionModal} toggleQuestionModal={toggleQuestionModal}></GrammarScript>
                                                                <div className='d-flex justify-content-end'><p>(*) là phần bắt buộc</p></div>
                                                            </Tab.Pane>
                                                            <Tab.Pane eventKey="writing">
                                                                <WritingScript script={selectedSection.scripts.find(script => script.type == ScriptTypes.WRITING)} setWriting={setWriting}></WritingScript>
                                                            </Tab.Pane>
                                                            <Tab.Pane eventKey="reading">
                                                                <ReadingScript script={selectedSection.scripts.find(script => script.type == ScriptTypes.READING)} setReading={setReading}></ReadingScript>
                                                            </Tab.Pane>
                                                            <Tab.Pane eventKey="listening">
                                                                <ListeningScript script={selectedSection.scripts.find(script => script.type == ScriptTypes.LISTENING)} setListening={setListening}></ListeningScript>
                                                            </Tab.Pane>
                                                            <Tab.Pane eventKey="vocabulary">
                                                                <VocabularyScript script={selectedSection.scripts.find(script => script.type == ScriptTypes.VOCABULARY)} setVocabulary={setVocabulary}></VocabularyScript>
                                                            </Tab.Pane>
                                                            <Tab.Pane eventKey="conversation">
                                                                <ConversationScript script={selectedSection.scripts.find(script => script.type == ScriptTypes.CONVERSATION)} setConversation={setConversation}></ConversationScript>
                                                            </Tab.Pane>
                                                            <Tab.Pane eventKey="exam">
                                                                <MiniExamScript script={selectedSection.scripts.find(script => script.type == ScriptTypes.MINIEXAM)} setMiniExam={setMiniExam}></MiniExamScript>
                                                            </Tab.Pane>
                                                        </Tab.Content>
                                                    </Col>
                                                </Row>
                                            </Tab.Container>
                                            <div>
                                                <button className='btn btn-secondary rounded mr-2' onClick={() => toggleModalScript({})}>Hủy</button>
                                                <button className='btn btn-primary rounded' onClick={() => submit()}>Lưu lại</button>
                                            </div>
                                        </div>
                                    </main>
                                </div>
                            </Modal.Body>
                        </Modal>}
                        {/* Modal Question */}
                        {/* Modal delete */}
                        <Modal show={modalDelete} animation onHide={() => toggleModalDelete({})} centered size="lg">
                            <Modal.Header closeButton onClick={() => toggleModalDelete({})} className='bg-danger'>
                                <h5>Xóa bài học</h5>
                            </Modal.Header>
                            <Modal.Body>
                                <p>
                                    Bạn có chắc chắn muốn xóa bài học này!
                                    <br />
                                    Không thể hoàn tác
                                </p>

                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => toggleModalDelete({})}>Hủy</Button>
                                <Button variant="primary" onClick={(e) => sumitDelete()}>Xác nhận</Button>
                            </Modal.Footer>
                        </Modal>

                        {/* Modal edit */}
                        <Modal show={modalEdit} animation onHide={() => toggleModalEdit({})} centered size='lg'>
                            <Modal.Header closeButton onClick={() => toggleModalEdit({})} className='bg-success'>
                                <h5>Chỉnh sửa bài học</h5>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="form-group">
                                    <div className="container">
                                        <div className='row'>
                                            <div className='col-6'>
                                                <h6>Thông tin cũ</h6>
                                                <div className='card-input mt-3'>
                                                    <span>Tiêu đề</span>
                                                    <p>{selectedSection.sectionName}</p>
                                                </div>
                                                <div className='card-input mt-3'>
                                                    <span>Mô tả</span>
                                                    <p>{selectedSection.description}</p>
                                                </div>
                                                <div className='card-input mt-3'>
                                                    <span>Hình ảnh</span>
                                                    <img className='img-thumbnail' src={selectedSection.photoUrl}></img>
                                                </div>

                                            </div>
                                            <div className='col-6'>
                                                <h6>Thông tin mới</h6>
                                                <div className={`card-input mt-3 ${wasValidate ? 'was-validated' : ''}`}>
                                                    <span>Tiêu đề</span>
                                                    <input
                                                        required
                                                        type="text"
                                                        onChange={(e) => {
                                                            setNewSection({ ...newSection, sectionName: e.target.value })
                                                            setErrors({ ...errors, sectionName: '' })
                                                        }}
                                                    />
                                                    <div className="invalid-feedback">
                                                        {errors.sectionName}
                                                    </div>
                                                </div>


                                                <div className="card-input mt-3">
                                                    <span>Mô tả</span>
                                                    <textarea placeholder="Nhập mô tả bài học..."
                                                        name="content"
                                                        onChange={(e) => setNewSection({ ...newSection, description: e.target.value })}
                                                    />
                                                </div>
                                                <div className='row'>
                                                    <div className="card-input mt-3 col-6">
                                                        <span>Hình ảnh</span>
                                                        <input type='file' accept="image/png, image/jpeg" onChange={(e) => {
                                                            setNewSection({ ...newSection, file: e.target.files[0] })
                                                            var image = URL.createObjectURL(e.target.files[0])
                                                            setRenderImage(image);
                                                        }}></input>
                                                    </div>
                                                    <div className='col-6'>
                                                        <span>Hình được chọn</span>
                                                        <img className="img-thumbnail" src={renderImage} alt='Chưa chọn'></img>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => toggleModalEdit({})}>Hủy</Button>
                                <Button variant="primary" onClick={(e) => submitEdit()}>Xác nhận</Button>
                            </Modal.Footer>
                        </Modal>
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
export default ManagementSection;