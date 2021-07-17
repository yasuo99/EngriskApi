import { useEffect, useState } from "react";
import SubMenu from './../../components/admin/SubMenu';
import HeaderAdmin from './../../components/admin/HeaderAdmin';
import Search from './../../components/search/Search';
import { Table } from 'react-bootstrap';
import Paginate from './../../components/pagination/Paginate';
import categoryTagApi from "../../api/2.0/categoryTagApi";

const ManagementcategoryTag = ({ }) => {
    const [tags, setTags] = useState({
        currentPage: 1,
        totalPages: 1,
        pageSize: 5,
        items: [],
    });
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalLock, setModalLock] = useState(false);
    const [selectTag, setSelectTag] = useState({})
    const [query,setQuery] = useState('')
    const [isBusy,setIsBusy] = useState(true);
    const [isRefresh,setIsRefresh] = useState(false);
    async function fetchData(){
        const params = {
            currentPage: tags.currentPage,
            pageSize: tags.pageSize,
            search: query
        }
        const result = await categoryTagApi.getAll(params);
        setTags(result)
    }
    useEffect(() => {
        fetchData();
        setIsBusy(false);
    },[tags.currentPage,tags.pageSize,query])
    function toggleModalDelete() {

    }
    function toggleModalEdit() {

    }
    function toggleModalLock() {

    }
    function pageChange(currentPage,pageSize){
        setTags({
            ...tags,
            currentPage: currentPage,
            pageSize: pageSize
        })
    }
    function search(query){
        setQuery(query);
        setTags({
            ...tags,
            currentPage: 1
        })
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
                                    <h6 className="m-0 font-weight-bold text-primary">
                                        Quản lý tag
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <div className="d-flex justify-content-end">
                                        <Search queryFunction={search}></Search>
                                    </div>

                                    <div className="table-responsive">
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Tên thẻ</th>
                                                    <th>Chức năng</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tags.items.map((tag, index) => (
                                                    <tr key={index}>
                                                        <td>{tag.tag}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-success"
                                                                onClick={() => toggleModalEdit(tag)}
                                                            >
                                                                <i className="fa fa-edit"></i>
                                                            </button>
                                                            <button
                                                                className="btn btn-danger btn-delete ml-1"
                                                                onClick={() => toggleModalDelete(tag)}
                                                            >
                                                                <i className="fa fa-trash"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                        <div>
                                            <Paginate
                                                currentPage={tags.currentPage}
                                                totalPages={tags.totalPages}
                                                pageSize={tags.pageSize}
                                                change={pageChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Modal
              show={modalEdit}
              onHide={() => toggleModalEdit({})}
              contentClassName="modal-basic-content"
            >
              <Modal.Header closeButton onClick={() => toggleModalEdit({})}>
                <Modal.Title>Thêm nhóm từ vựng</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="form-group">
                  <div className="container">
                    <div className="row">
                      <div className="col-6">
                        <p className="titleInfo">Thông tin cũ</p>
                        <div className="card-input mt-3">
                          <span>Tên nhóm</span>
                          <input
                            type="text"
                            name="url"
                            value={selectPost.categoryName}
                            readOnly
                          />
                        </div>
                        <div className="card-input mt-3">
                          <span>Hình ảnh</span>
                          <img
                            className="img-thumbnail"
                            src={selectPost.categoryImage}
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
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="card-input mt-3">
                          <span>Hình ảnh</span>
                          <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => toggleModalEdit({})}>
                  Trở lại
                </Button>
                <Button variant="primary" onClick={(e) => edit()}>
                  Lưu lại
                </Button>
              </Modal.Footer>
            </Modal>
            <Modal
              show={modalDelete}
              onHide={() => toggleModalDelete({})}
              contentClassName="modal-basic-content"
            >
              <Modal.Header closeButton onClick={() => toggleModalDelete({})}>
                <Modal.Title>Xác nhận xóa nhóm từ vựng</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Bạn có chắc chắn muốn xóa nhóm từ vựng này không?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => toggleModalDelete({})}>
                  Trở lại
                </Button>
                <Button variant="primary" onClick={(e) => submitDelete()}>
                  Lưu lại
                </Button>
              </Modal.Footer>
            </Modal> */}
            </div>
        </div>
    );
}
export default ManagementcategoryTag;