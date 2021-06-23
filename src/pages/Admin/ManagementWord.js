import React, { Component, useEffect, useRef, useState } from "react";
import SubMenu from '../../components/admin/SubMenu'
import QLListTuVung from "../../components/managementwords/QLListTuVung";
import { Link } from "react-router-dom";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
import { Button, Tabs, Tab, Table, Modal } from "react-bootstrap";
import wordApiV2 from "../../api/2.0/wordApi";
import Paginate from "../../components/pagination/Paginate";
import Search from "../../components/search/Search";
const ManagementWord = () => {
    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [selectedWord, setSelectedWord] = useState({})
    const [words, setWords] = useState({
        currentPage: 1,
        pageSize: 5,
        items: [],
        totalPages: 1
    })
    const tempWords = useRef(null);
    function toggleModalAdd() {
        setModalAdd(!modalAdd);
    }
    function toggleModalEdit(word) {
        setModalEdit(!modalEdit);
        setSelectedWord(word)
    }
    function toggleModalDelete(word) {
        setModalEdit(!modalDelete);
        setSelectedWord(word)
    }
    useEffect(async () => {
        const params = {
            currentPage: words.currentPage,
            pageSize: words.pageSize
        }
        const result = await wordApiV2.getAll(params);
        tempWords.current = result.items
        setWords(result);
    }, [words.currentPage, words.pageSize])
    function wordsPaginationChange(currentPage, pageSize) {
        setWords({
            ...words,
            currentPage: currentPage,
            pageSize: pageSize
        })
    }
    function querySearch(query){
        if(query == ''){
            setWords({
                ...words,
                items: [...tempWords.current]
            })
        }else{
            console.log(query);
            setWords({
                ...words,
                items: [...words.items.filter((word) => word.eng?.toLowerCase().includes(query.toLowerCase()) || word.vie?.toLowerCase().includes(query.toLowerCase()))]
            })
        }
    }
    return (
        <div>
            <div id="wrapper">
                <SubMenu></SubMenu>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderAdmin></HeaderAdmin>
                        <div className="container-fluid ql_word">
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary">Quản lý từ vựng</h6>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <div className='d-flex justify-content-between'>
                                            <button variant="primary" className="btn btn-word mr-2 mb-3" onClick={() => toggleModalAdd()}><i className="fa fa-plus" /> Thêm từ vựng</button>
                                            <Search queryFunction={querySearch}></Search>
                                        </div>

                                        {/* <Link variant="primary" className="btn btn-quizWord mr-2 mb-3" to="/quiz-tuvung"><i className="fa fa-plus" /> Thêm bài kiểm tra</Link> */}
                                        {/* <Button variant="primary" className="btn btn-success mr-2 mb-3"  ><i className="fa fa-plus" /> </Button> */}
                                        <Table striped bordered hover responsive>
                                            <thead>
                                                <tr>
                                                    <th className="tuvung">Từ vựng</th>
                                                    <th className="loaitu">Loại từ</th>
                                                    <th className="chude">Phát âm</th>
                                                    <th className="tudongnghia">Từ đồng nghĩa</th>
                                                    <th className="nghia">Nghĩa từ vựng</th>
                                                    <th className="chucnang" />
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {words.items.map((word, index) =>
                                                    <tr key={index}>
                                                        <td>{word.eng}</td>
                                                        <td>{word.vie}</td>
                                                        <td>{word.spelling}</td>
                                                        <td>Hi</td>
                                                        <td>Xin chào</td>
                                                        <td>
                                                            <Button variant="primary" className="btn btn-edit mr-2" ><Link to='/tuvung' className="fa fa-edit"></Link></Button>
                                                            <Button variant="primary" className="btn btn-delete mr-2"><Link to='/quiz-tuvung' className="fa fa-info" /></Button>
                                                            <Button variant="danger" className="btn btn-delete mr-2"><i className="fa fa-trash" /></Button>

                                                        </td>
                                                    </tr>
                                                )}

                                            </tbody>
                                        </Table>
                                        <Paginate currentPage={words.currentPage} pageSize={words.pageSize} totalPages={words.totalPages} change={wordsPaginationChange}></Paginate>
                                        <Modal show={modalAdd} onHide={() => toggleModalAdd()} size="lg">
                                            <Modal.Body>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={() => toggleModalAdd()}>
                                                    Từ chối
                                                </Button>
                                                <Button variant="primary" onClick={(e) => toggleModalAdd()}>
                                                    Phê duyệt
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                        <Modal show={modalEdit} onHide={() => toggleModalEdit()} size="lg">
                                            <Modal.Body>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={() => toggleModalEdit()}>
                                                    Từ chối
                                                </Button>
                                                <Button variant="primary" onClick={(e) => toggleModalEdit()}>
                                                    Phê duyệt
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                        <Modal show={modalDelete} onHide={() => toggleModalDelete()} size="lg">
                                            <Modal.Body>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={() => toggleModalDelete()}>
                                                    Từ chối
                                                </Button>
                                                <Button variant="primary" onClick={(e) => toggleModalDelete()}>
                                                    Phê duyệt
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
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

        </div>
    )
}
export default ManagementWord;