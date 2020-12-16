import React, { Component } from "react";
import ModalDelete from "../modal/ModalDelete";
class CauHoi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalDelete: false,
        };
    }
    modalClose() {
        this.setState({
            modalDelete: false,
        });
    }
    modalOpenDelete() {
        this.setState({ modalDelete: true });
    }
    handleSubmitDelete(e) {
        this.setState({

        });
        this.modalClose();
    }
    render() {
        return (
            <tr>
                <td className="cauhoi-quiz">If you could please get back to me with your_______before the end of the day today, I will make sure that your order is processed in time for delivery by the end of the week.</td>
                <td>
                    prefer
                </td>
                <td>
                    preferred </td>
                <td>
                    preferred</td>
                <td>
                    preference
                </td>
                <td>Sau tính từ sở hữu YOUR ta cần một danh từ, nên ta chọn ngay D</td>
                <td>
                    <a href="#" className="btn btn-danger" onClick={e => this.modalOpenDelete(e)}><i className="fa fa-trash"  /></a>
                </td>
                <ModalDelete show={this.state.modalDelete} handleClose={e => this.modalClose(e)}>
                    <h3 className="title"> <img src="/image/trash.png"></img> Xác nhận xóa câu hỏi trong bài exam</h3>
                    <p className="content">
                        Bạn có chắc chắn muốn xóa câu hỏi này ra khỏi bài exam không?
                        </p>
                    <button onClick={e => this.handleSubmitDelete(e)} type="button" className="btn btn-info float-right">
                        Xác nhận
                        </button>
                </ModalDelete>
            </tr>
        );
    }
}
export default CauHoi;