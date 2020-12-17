import React, { Component } from "react";
import { Link } from "react-browser-router"
import wordApi from "../../api/wordApi";
import ModalDelete from "../modal/ModalDelete";
import ModalEdit from "../modal/ModalEdit";
class QLTuVung extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalEdit: false,
            modalDelete: false,
            modalInputEnglish: "",
            modalInputVietNam: "",
            modalInputSpelling: "",
            modalInputLoaiTu: "",
            modalInputHinhAnh: null,
            words: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
        this.isComponentMounted = false;
    }
    async componentDidMount() {
        this.isComponentMounted = true;
        var result = await this.fetchWords();
        console.log(result);
        if (this.isComponentMounted) {
            this.setState({
                words: result
            })
        }
    }
    onFileChange = event => {
        this.setState({ modalInputHinhAnh: event.target.files[0] });

    };
    handleChange(e) {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }
    fetchWords = async () => {
        return await wordApi.getAll();
    }
    handleSubmitEdit(e) {
        this.setState({
            english: this.state.modalInputEnglish,
            vietnam: this.state.modalInputVietNam,
            exeng: this.state.modalInputExEng,
            exvn: this.state.modalInputExVN,
        });
        this.modalClose();
    }

    modalOpen() {
        this.setState({ modalEdit: true });
    }
    modalClose() {
        this.setState({
            modalInputEnglish: "",
            modalInputVietNam: "",
            modalEdit: false,
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
        var { modalInputEnglish, modalInputVietNam, modalInputLoaiTu, modalInputSpelling, modalInputHinhAnh } = this.state;
        const renderWords = this.state.words.map((word) =>
            <tr key={word.id}>
                <td>{word.eng}</td>
                <td>{word.wordCategory}</td>
                <td>{word.vie}</td>
                <td>{word.examples.map((example) =>
                    <p key={example.id}>{example.eng} / {example.vie}</p>
                )}</td>
                <td><img width="50px" height="50px" src={word.wordImg}></img></td>

                <td>
                    <a href="#" className="btn btn-primary mr-2" onClick={e => this.modalOpen(e)}><i className="fa fa-edit" /></a>
                    <a href="#" className="btn btn-danger" onClick={e => this.modalOpenDelete(e)}><i className="fa fa-trash" /></a>
                </td>
            </tr>
        );
        return (
            <tbody>
                {renderWords}
            </tbody>
        );
    }
    componentWillUnmount() {
        this.isComponentMounted = false;
    }
}
export default QLTuVung;