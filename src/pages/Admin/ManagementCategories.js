import { Button, Modal } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { Table } from "react-bootstrap";
import wordCategoryApi from "../../api/2.0/wordCategoryApi";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
import SubMenu from "../../components/admin/SubMenu";
import { toast } from "react-toastify";
import Paginate from "../../components/pagination/Paginate";
import Search from "../../components/search/Search";

const ManagementCategories = () => {
  const [category, setCategory] = useState({});
  const [modalCreate, setModalCreate] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState({});
  const [categories, setCategories] = useState({
    currentPage: 1,
    pageSize: 5,
    totalPages: 1,
    items: []
  });
  const [isRefresh, setIsRefresh] = useState(false);
  const [query, setQuery] = useState('')
  async function fetchCategories() {
    const params = {
      currentPage: categories.currentPage,
      pageSize: categories.pageSize,
      search: query
    }
    const result = await wordCategoryApi.getAll(params);
    setCategories(result);
  }
  useEffect(() => {
    fetchCategories();
  }, [categories.currentPage, categories.pageSize, query]);
  useEffect(() => {
    if (isRefresh) {
      fetchCategories();
      setIsRefresh(false);
    }
  }, [isRefresh])
  function toggleModalCreate() {
    modalCreate ? setModalCreate(false) : setModalCreate(true);
  }
  async function create() {
    console.log(name, " ", image);
    var formData = new FormData();
    formData.set("CategoryName", name);
    formData.set("Image", image);
    const result = await wordCategoryApi.createWordCategory(formData);
    console.log(result);
    switch (result.status) {
      case 200:
        toast("Thêm thành công", { type: "success" });
        setIsRefresh(true)
        break;
      case 409:
        toast("Tài nguyên trùng", { type: "warning" });
        break;
      default:
        toast("Thêm thất bại", { type: "error" });
        break;
    }
    setName("");
    setImage({});
    toggleModalCreate();
  }
  function toggleModalEdit(category) {
    modalEdit ? setModalEdit(false) : setModalEdit(true);
    setCategory(category);
  }
  async function edit() {
    var formData = new FormData();
    formData.set("CategoryName", name || category.categoryName);
    formData.set("Image", image);
    const result = await wordCategoryApi.updateWordCategory(
      category.id,
      formData
    );
    switch (result.status) {
      case 200:
        toast("Cập nhật thành công", { type: "info" });
        setIsRefresh(true)
        break;
      case 404:
        toast("Không tìm thấy tài nguyên", { type: "warning" });
        break;
      case 409:
        toast("Tài nguyên trùng", { type: "warning" });
        break;
      default:
        toast("Cập nhật thất bại", { type: "error" });
        break;
    }
    setName("");
    setImage({});
    toggleModalEdit({});
  }
  function toggleModalDelete(category) {
    modalDelete ? setModalDelete(false) : setModalDelete(true);
    setCategory(category);
  }
  async function submitDelete() {
    const result = await wordCategoryApi.deleteWordCategory(category.id);
    switch (result.status) {
      case 404:
        toast("Không tìm thấy tài nguyên", { type: "warning" });
        break;
      default:
        toast("Xóa thành công", { type: "success" });
        break;
    }
    setCategories(categories.filter((cate) => cate.id != category.id));
    setName("");
    setImage({});
    toggleModalDelete({});
  }
  async function pageChange(currentPage, pageSize) {
    setCategories({
      ...categories,
      currentPage: currentPage,
      pageSize: pageSize
    })
  }
  function search(query){
    setQuery(query);
    setCategories({
      ...categories,
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
                    Quản lý phân nhóm từ vựng
                  </h6>
                </div>
                <div className="card-body">
                  <div className='d-flex justify-content-between'>
                    <button
                      className="btn btn-primary mb-2"
                      onClick={toggleModalCreate}
                    >
                      Thêm nhóm từ vựng
                    </button>
                    <Search queryFunction={search}></Search>
                  </div>

                  <div className="table-responsive">
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Tên nhóm</th>
                          <th className="table-image">Ảnh</th>
                          <th>Số lượng từ vựng</th>
                          <th>Chức năng</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories.items.map((category, index) => (
                          <tr key={index}>
                            <td>{category.categoryName}</td>
                            <td>
                              <img
                                className="img-fluid"
                                src={category.categoryImage}
                              />
                            </td>
                            <td>{category.words.length}</td>
                            <td>
                              <button
                                className="btn btn-success"
                                onClick={() => toggleModalEdit(category)}
                              >
                                <i className="fa fa-edit"></i>
                              </button>
                              <button
                                className="btn btn-danger btn-delete ml-1"
                                onClick={() => toggleModalDelete(category)}
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
                        currentPage={categories.currentPage}
                        totalPages={categories.totalPages}
                        pageSize={categories.pageSize}
                        change={pageChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal show={modalCreate} onHide={() => toggleModalCreate()} contentClassName="modal-basic-content">
          <Modal.Header closeButton onClick={() => toggleModalCreate()}>
            <Modal.Title>Thêm nhóm từ vựng</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <p className="titleInfo">Thông tin thông báo</p>
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => toggleModalCreate()}>
              Trở lại
            </Button>
            <Button variant="primary" onClick={(e) => create()}>
              Lưu lại
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={modalEdit} onHide={() => toggleModalEdit({})} contentClassName="modal-basic-content">
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
                        value={category.categoryName}
                        readOnly
                      />
                    </div>
                    <div className="card-input mt-3">
                      <span>Hình ảnh</span>
                      <img
                        className="img-thumbnail"
                        src={category.categoryImage}
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
        <Modal show={modalDelete} onHide={() => toggleModalDelete({})} contentClassName="modal-basic-content">
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
        </Modal>
      </div>
    </div>
  );
};
export default ManagementCategories;
