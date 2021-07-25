import React, { Component, useEffect, useRef, useState } from "react";
import SubMenu from '../../components/admin/SubMenu'
import QLListTuVung from "../../components/managementwords/QLListTuVung";
import { Link } from "react-router-dom";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
import { Button, Tabs, Tab, Table, Modal } from "react-bootstrap";
import wordApiV2 from "../../api/2.0/wordApi";
import Paginate from "../../components/pagination/Paginate";
import Search from "../../components/search/Search";
import { toast } from "react-toastify";
import wordCategoryApi from './../../api/2.0/wordCategoryApi';
import { useForm } from "react-hook-form";
import CircleControls from "react-player-circle-controls";
import "react-player-circle-controls/dist/styles.css";
const ManagementWord = () => {
    const initWord = {
        eng: '',
        vie: '',
        spelling: '',
        engVoice: 'en-US',
        image: {}
    }
    const [modalAdd, setModalAdd] = useState(false);
    const [categories, setCategories] = useState([])
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [selectedWord, setSelectedWord] = useState({})
    const [tempImage, setTempImage] = useState({})
    const [word, setWord] = useState(initWord)
    const [words, setWords] = useState({
        currentPage: 1,
        pageSize: 5,
        items: [],
        totalPages: 1
    })
    const [wordCategories, setWordCategories] = useState([])
    const [query, setQuery] = useState('')
    const [isRefresh, setIsRefresh] = useState(false);
    const tempWords = useRef(null);
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset, unregister } = useForm();
    async function toggleModalAdd() {
        setModalAdd(!modalAdd);
        setCategories([])
        setTempImage({});
    }
    function toggleModalEdit(word) {
        reset();
        setModalEdit(!modalEdit);
        setSelectedWord(word)
        setTempImage({});
        setWord(word)
    }
    function toggleModalDelete(word) {
        setModalDelete(!modalDelete);
        setSelectedWord(word)
        setTempImage({});
    }
    function renderImage() {
        if (Object.keys(word.image).length > 0) {
            var url = URL.createObjectURL(word.image)
            console.log(url);
            return url;
        }
        return ''
    }
    async function fetchWords() {
        const params = {
            currentPage: words.currentPage,
            pageSize: words.pageSize,
            search: query
        }
        const result = await wordApiV2.getAll(params);
        tempWords.current = result.items
        setWords(result);
        const categories = await wordCategoryApi.getAllWithoutPaginate();
        setWordCategories(categories);
    }
    useEffect(() => {
        fetchWords()
    }, [words.currentPage, words.pageSize, query])
    useEffect(() => {
        if (isRefresh) {
            fetchWords()
            setIsRefresh(false);
        }
    }, [isRefresh])
    function wordsPaginationChange(currentPage, pageSize) {
        setWords({
            ...words,
            currentPage: currentPage,
            pageSize: pageSize
        })
    }
    function querySearch(query) {
        setWords({
            ...words,
            currentPage: 1
        })
        setQuery(query);
    }
    useEffect(() => {
        console.log((word.image?.name));
        if (word.image?.name) {

            const url = URL.createObjectURL(word.image);
            console.log(url);
            setTempImage(url)
        }
    }, [word.image])
    async function submitCreate(e) {
        e.preventDefault();
        const data = new FormData();
        data.set('eng', word.eng);
        data.set('vie', word.vie);
        data.set('spelling', word.spelling);
        data.set('engVoice', word.engVoice);
        data.set('image', word.image);
        categories.forEach((cate, index) => {
            data.append(`categories[${index}].id`, cate.id);
        })
        const result = await wordApiV2.createWord(data);
        if (result.status == 200) {
            toast('Thành công', { type: 'success' })
            setWord(initWord)
            setTempImage({});
            setCategories([])
            setIsRefresh(true)
        } else {
            if (result.status == 409) {
                toast('Trùng từ vựng', { type: 'warning' })
            } else {
                toast('Thất bại', { type: 'error' })
            }
        }
    }
    async function submitDelete() {
        const result = await wordApiV2.deleteWord(selectedWord.id);
        if (result.status == 204) {
            toast('Thành công', { type: 'success' })
            setWord(initWord)
            toggleModalDelete({});
            setTempImage({});
            setCategories([])
            setWords({
                ...words,
                currentPage: 1,
            })
            setQuery('')
            setIsRefresh(true);
        } else {
            if (result.status == 404) {
                toast('Không tìm thấy từ vựng', { type: 'warning' })
            } else {
                toast('Thất bại', { type: 'error' })
            }
        }
    }
    function selectCategory(e, category) {
        if (e.currentTarget.checked) {
            setCategories([...categories, category])
        } else {
            setCategories(categories.filter(cate => cate.id != category.id))
        }
    }
    function editCategory(e, category) {
        if (e.currentTarget.checked) {
            setSelectedWord({
                ...selectedWord,
                categories: [...selectedWord.categories, category]
            })
        } else {
            setSelectedWord({
                ...selectedWord,
                categories: [...selectedWord.categories.filter(cate => cate.id != category.id)]
            })
        }
    }
    const submit = async (data) => {
        console.log(data);
        const body = new FormData();
        body.set('eng', data.eng);
        body.set('vie', data.vie);
        body.set('spelling', data.spelling);
        body.set('engVoice', word.engVoice);
        body.set('image', word.image);
        categories.forEach((cate, index) => {
            body.append(`categories[${index}].id`, cate.id);
        })
        const result = await wordApiV2.createWord(body);
        if (result.status == 200) {
            toast('Thành công', { type: 'success' })
            setWord(initWord)
            setTempImage({});
            setCategories([])
            setIsRefresh(true)
            reset({
                eng: '',
                vie: '',
                file: {},
                spelling: ''
            });
            unregister('file');
        } else {
            if (result.status == 409) {
                toast('Trùng từ vựng', { type: 'warning' })
            } else {
                toast('Thất bại', { type: 'error' })
            }
        }
    }
    const submitEdit = async (data) => {
        const form = new FormData();
        form.set('eng', data.eng);
        form.set('vie', data.vie);
        form.set('spelling', data.spelling);
        form.set('engVoice', word.engVoice);
        form.set('image', word.image);
        selectedWord.categories.forEach((cate, index) => {
            form.append(`categories[${index}].id`, cate.id);
        })
        console.log(selectedWord.categories);
        const result = await wordApiV2.updateWord(selectedWord.id, form);
        if (result) {
            toast('Thành công', { type: 'success' })
            setWord(initWord)
            toggleModalEdit({});
            setTempImage({});
            setCategories([])
            setIsRefresh(true);
        } else {
            if (result.status == 409) {
                toast('Trùng từ vựng', { type: 'warning' })
            } else {
                toast('Thất bại', { type: 'error' })
            }
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
                                                    <th className="loaitu">Nghĩa</th>
                                                    <th className="loaitu">Từ loại</th>
                                                    <th className="chude">Phiên âm</th>
                                                    <th className='table-image'>Hình ảnh</th>
                                                    <th className="chucnang" />
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {words.items.map((word, index) =>
                                                    <tr key={index}>
                                                        <td>{word.eng}</td>
                                                        <td>{word.vie}</td>
                                                        <td>{word.class}</td>
                                                        <td>{word.spelling}</td>
                                                        <td className='table-image'>
                                                            <img className='img-fluid' src={word.wordImg}></img>
                                                        </td>
                                                        <td>
                                                            <Button variant="success" className="btn btn-edit btn-delete mr-2" onClick={() => toggleModalEdit(word)} ><i className="fa fa-edit"></i></Button>
                                                            <Button variant="primary" className="btn btn-delete mr-2"><Link to='/quiz-tuvung' className="fa fa-info" /></Button>
                                                            <Button variant="danger" className="btn btn-delete mr-2" onClick={() => toggleModalDelete(word)}><i className="fa fa-trash" /></Button>

                                                        </td>
                                                    </tr>
                                                )}

                                            </tbody>
                                        </Table>
                                        <Paginate currentPage={words.currentPage} pageSize={words.pageSize} totalPages={words.totalPages} change={wordsPaginationChange}></Paginate>
                                        <Modal centered show={modalAdd} onHide={() => toggleModalAdd()} animation size="lg" dialogClassName="modal-90w" contentClassName="modal-90w-content">
                                            <Modal.Body>
                                                <h5 className='text-center'>Thêm từ vựng</h5>
                                                <br></br>
                                                <form id="create-form" className="form-group card p-2" onSubmit={handleSubmit(submit)}>
                                                    <div className='form-row script-panel'>
                                                        <div className='col border-right'>
                                                            <div>Từ vựng</div>
                                                            <div className="wrap-input100 mb-3">
                                                                <input className="input100" name="cc" placeholder='Nhập từ vựng' {...register('eng',
                                                                    {
                                                                        required: 'Từ vựng không được để trống'
                                                                    })}
                                                                    type="text"
                                                                    id="eng"
                                                                    autoComplete="off"
                                                                ></input>
                                                                {errors.eng && <div className='invalid'>{errors.eng.message}</div>}
                                                            </div>
                                                            <div>Nghĩa</div>
                                                            <div className="wrap-input100 mb-3">
                                                                <input className="input100" name="cc" placeholder='Nhập nghĩa từ vựng' {...register('vie',
                                                                    {
                                                                        required: 'Nghĩa của từ vựng không được để trống'
                                                                    })}
                                                                    type="text"
                                                                    id="vie"
                                                                    autoComplete="off"
                                                                ></input>
                                                                {errors.vie && <div className='invalid'>{errors.vie.message}</div>}
                                                            </div>
                                                            <div>Phiên âm</div>
                                                            <div className="wrap-input100 mb-3">
                                                                <input className="input100" name="cc" placeholder='Nhập phiên âm' {...register('spelling',
                                                                    {
                                                                        required: 'Phiên âm của từ vựng không được để trống'
                                                                    })}
                                                                    type="text"
                                                                    id="spelling"
                                                                    autoComplete="off"
                                                                ></input>
                                                                {errors.spelling && <div className='invalid'>{errors.spelling.message}</div>}
                                                            </div>
                                                            <div>Ảnh minh họa</div>
                                                            <div className="d-flex justify-content-between">

                                                                <div>

                                                                    <input className="input100" name="cc" placeholder='Chọn ảnh'
                                                                        type="file"
                                                                        id="image"
                                                                        autoComplete="off"
                                                                        onChange={(e) => setWord({ ...word, image: e.target.files[0] })}
                                                                    ></input>
                                                                    {errors.file && <div className='invalid'>{errors.file.message}</div>}
                                                                </div>
                                                                <div>
                                                                    <div>Hình được chọn</div>
                                                                    <img className="img-thumbnail preview-image" src={tempImage} alt='Chưa chọn'></img>
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div className='col'>
                                                            <div>Nhóm từ</div>
                                                            <div className='card-input'>
                                                                <div className='categories-tab'>
                                                                    <ul className="list-group list-group-flush checkbox-wrapper">
                                                                        {wordCategories.map((category, index) =>
                                                                            <li className="list-group-item" key={index}>
                                                                                <div className="custom-control custom-checkbox">
                                                                                    <input type="checkbox" className="custom-control-input top" onChange={(e) => selectCategory(e, category)}></input>
                                                                                    <label className="custom-control-label">{category.categoryName}</label>
                                                                                </div>
                                                                            </li>
                                                                        )}
                                                                    </ul>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* <div className="card-input">
                                                        <span>Loại từ</span>
                                                        <select
                                                            value={categoryCreate}
                                                            onChange={e => this.handleChange(e)}
                                                            name="categoryCreate" required>
                                                            <option value="">- Chọn loại từ -</option>
                                                            <option value="Danh từ">Danh từ</option>
                                                            <option value="Tính từ">Tính từ</option>
                                                            <option value="Động từ">Động từ</option>
                                                            <option value="Trạng từ">Trạng từ</option>
                                                        </select>
                                                    </div> */}


                                                </form>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={() => toggleModalAdd()}>Hủy</Button>
                                                <Button variant="primary" form="create-form" type="submit">Lưu lại</Button>
                                            </Modal.Footer>
                                        </Modal>
                                        {Object.keys(selectedWord).length > 0 && <Modal centered show={modalEdit} onHide={() => toggleModalEdit({})} size="lg" dialogClassName="modal-90w" animation contentClassName="modal-90w-content">
                                            <Modal.Body>
                                                <div className='row script-panel'>
                                                    <div className='col-6'>
                                                        <h6>Thông tin cũ</h6>
                                                        <div className='form-group card p-2'>
                                                            <div className='card-input mt-3'>
                                                                <span>Từ vựng</span>
                                                                <p>{selectedWord.eng}</p>
                                                            </div>
                                                            <div className='card-input mt-3'>
                                                                <span>Nghĩa</span>
                                                                <p>{selectedWord.vie}</p>
                                                            </div>
                                                            <div className='card-input mt-3'>
                                                                <span>Phát âm</span>
                                                                <p>{selectedWord.spelling}</p>
                                                            </div>
                                                            <div className='card-input mt-3'>
                                                                <span>Hình ảnh</span>
                                                                <img className='img-thumbnail w-50' src={selectedWord.wordImg}></img>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-6'>
                                                        <h6>Thông tin mới</h6>
                                                        <form className="form-group card p-2" id="edit-form" onSubmit={handleSubmit(submitEdit)}>
                                                            <div>
                                                                <div>Từ vựng</div>
                                                                <div className="wrap-input100 mb-3">
                                                                    <input className="input100" name="eng" placeholder='Nhập từ vựng' {...register('eng',
                                                                        {
                                                                            required: 'Từ vựng không được để trống'
                                                                        })}
                                                                        type="text"
                                                                        id="eng"
                                                                        defaultValue={selectedWord.eng}
                                                                        autoComplete="off"
                                                                    ></input>
                                                                    {errors.eng && <div className='invalid'>{errors.eng.message}</div>}
                                                                </div>
                                                                <div>Nghĩa</div>
                                                                <div className="wrap-input100 mb-3">
                                                                    <input className="input100" name="vie" placeholder='Nhập nghĩa từ vựng' {...register('vie',
                                                                        {
                                                                            required: 'Nghĩa của từ vựng không được để trống'
                                                                        })}
                                                                        type="text"
                                                                        id="vie"
                                                                        defaultValue={selectedWord.vie}
                                                                        autoComplete="off"
                                                                    ></input>
                                                                    {errors.vie && <div className='invalid'>{errors.vie.message}</div>}
                                                                </div>
                                                                <div>Phiên âm</div>
                                                                <div className="wrap-input100 mb-3">
                                                                    <input className="input100" name="spelling" placeholder='Nhập phiên âm' {...register('spelling',
                                                                        {
                                                                            required: 'Phiên âm của từ vựng không được để trống'
                                                                        })}
                                                                        type="text"
                                                                        id="spelling"
                                                                        defaultValue={selectedWord.spelling}
                                                                        autoComplete="off"
                                                                    ></input>
                                                                    {errors.spelling && <div className='invalid'>{errors.spelling.message}</div>}
                                                                </div>
                                                                <div>Ảnh minh họa</div>
                                                                <div className="d-flex justify-content-between">
                                                                    <div>
                                                                        <input className="input100" name="file" placeholder='Chọn ảnh'
                                                                            type="file"
                                                                            id="image"
                                                                            autoComplete="off"
                                                                            defaultValue={null}
                                                                            onChange={(e) => setWord({ ...word, image: e.target.files[0] })}
                                                                        ></input>
                                                                    </div>
                                                                    <div>
                                                                        <div>Hình được chọn</div>
                                                                        <img className="img-thumbnail preview-image" src={tempImage} alt='Chưa chọn'></img>
                                                                    </div>

                                                                </div>
                                                                <div className='card-input p-2'>
                                                                    <h6>Nhóm từ</h6>
                                                                    <div className='categories-tab'>
                                                                        <ul className="list-group list-group-flush checkbox-wrapper">
                                                                            {wordCategories.map((category, index) =>
                                                                                <li className="list-group-item border-0" key={index}>
                                                                                    <div className="custom-control custom-checkbox">
                                                                                        <input type="checkbox" className="custom-control-input top" onChange={(e) => editCategory(e, category)} checked={selectedWord.categories.some(cate => cate.id == category.id)}></input>
                                                                                        <label className="custom-control-label">{category.categoryName}</label>
                                                                                    </div>
                                                                                </li>
                                                                            )}
                                                                        </ul>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <hr></hr>

                                                </div>

                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={() => toggleModalEdit({})}>
                                                    Hủy
                                                </Button>
                                                <Button variant="primary" type="submit" form="edit-form">
                                                    Lưu lại
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>}
                                        {Object.keys(selectedWord).length > 0 && <Modal centered show={modalDelete} onHide={() => toggleModalDelete({})} size="lg" dialogClassName='sweet-alert-modal'>
                                            <Modal.Body>
                                                <div className='text-center'>
                                                    <i className='fa fa-4x fa-warning text-danger'></i>
                                                    <br></br>
                                                    <br></br>
                                                    <h3 className='text-info'>Bạn có chắc muốn xóa từ vựng này không ?</h3>
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
                                                    Xóa
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>}
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