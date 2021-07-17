import { Modal, Button, Table } from "react-bootstrap";
import SubMenu from "./../../components/admin/SubMenu";
import HeaderAdmin from "./../../components/admin/HeaderAdmin";
import { useEffect, useState } from "react";
import Paginate from "../../components/pagination/Paginate";
import postApiV2 from "../../api/2.0/postApi";
import Search from './../../components/search/Search';

const ManagementPost = ({}) => {
  const [posts, setPosts] = useState({
    currentPage: 1,
    totalPages: 1,
    pageSize: 5,
    items: [],
  });
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalLock, setModalLock] = useState(false);
  const [selectPost, setSelectPost] = useState({});
  const [query, setQuery] = useState("");
  async function fetchData() {
    const params = {
      currentPage: posts.currentPage,
      pageSize: posts.pageSize,
      search: query,
    };
    const result = await postApiV2.getManage(params);
    setPosts(result)
  }
  useEffect(() => {
    fetchData();
  }, [posts.currentPage, posts.pageSize, query]);
  function toggleModalDelete() {}
  function toggleModalEdit() {}
  function toggleModalLock() {}
  function search(query) {
    setQuery(query);
  }
  function pageChange(currentPage, pageSize) {
    setPosts({
      ...posts,
      currentPage: currentPage,
      pageSize: pageSize,
    });
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
                    Quản lý bài viết
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
                          <th className='nghia'>Tiêu đề bài viết</th>
                          <th className='w-50'>Nội dung bài viết</th>
                          <th>Người tạo</th>
                          <th>Số bình luận</th>
                          <th className='nghia'>Chức năng</th>
                        </tr>
                      </thead>
                      <tbody>
                        {posts.items.map((post, index) => (
                          <tr key={index}>
                            <td>{post.title}</td>
                            <td>{post.content}</td>
                            <td>{post.accountUserName}</td>
                            <td>{post.totalComment}</td>
                            <td>
                              {post.isLocked ?  <button
                                className="btn btn-primary btn-delete ml-1"
                                onClick={() => toggleModalDelete(post)}
                              >
                              <i className="fa fa-unlock"></i>
                              </button> :  <button
                                className="btn btn-primary btn-delete ml-1"
                                onClick={() => toggleModalDelete(post)}
                              >
                              <i className="fa fa-lock"></i>
                              </button>}
                             
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <div>
                      <Paginate
                        currentPage={posts.currentPage}
                        totalPages={posts.totalPages}
                        pageSize={posts.pageSize}
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
};
export default ManagementPost;
