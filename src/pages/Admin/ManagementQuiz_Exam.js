import React, { Component } from "react";
import { Link } from "react-router-dom";
import HeaderAdmin2 from "../../components/admin/HeaderAdmin2";
import QuizHinhAnh from "../../components/quiz_exam/QuizHinhAnh";
import Quiz from "../../components/quiz_exam/Quiz";
import QuizSapXep from "../../components/quiz_exam/QuizSapXep";
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import Switch from 'react-switch';
const infoQuiz = {
    type: 'Quiz',
    title: '',
    description: '',
    level: '1',
}

const questions = {
    answersOne: [
        {
            textAnswer: '',
            checkAnswer: '',
        },
    ],
    answersThree: [
        {
            textAnswer: '',
            fileAnswer: '',
            imgAnswer: '',
            checkAnswer: '',
        },
    ],
    words: [
        {
            word: '',
        }

    ],
    fileQuestion: '',
    answerSort: '',
    titleQuestion: '',
    typeQuestion: 'Quiz',
    timeQuestion: "10",
    pointQuestion: "5",

};
class Thumb extends React.Component {
    state = {
        loading: false,
        thumb: undefined
    };

    componentWillReceiveProps(nextProps) {
        if (!nextProps.file) {
            return;
        }

        this.setState({ loading: true }, () => {
            let reader = new FileReader();

            reader.onloadend = () => {
                this.setState({ loading: false, thumb: reader.result });
            };

            reader.readAsDataURL(nextProps.file);
        });
    }

    render() {
        const { file } = this.props;
        const { loading, thumb } = this.state;

        if (!file) {
            return (
                <img
                    src="/image/picture (1).png"
                    alt="image"
                    className="display-ImgQuestion"
                />
            )
        }

        if (loading) {
            return <p>loading...</p>;
        }

        return (
            <img
                src={thumb}
                alt={file.name}
                className="display-ImgQuestion"
            />
        );
    }
}
class Thumb_Answer extends React.Component {
    state = {
        loading: false,
        thumbAnswer: undefined
    };

    componentWillReceiveProps(nextProps) {
        if (!nextProps.imgAnswer) {
            return;
        }

        this.setState({ loading: true }, () => {
            let reader = new FileReader();

            reader.onloadend = () => {
                this.setState({ loading: false, thumbAnswer: reader.result });
            };

            reader.readAsDataURL(nextProps.imgAnswer);
        });
    }

    render() {
        const { imgAnswer } = this.props;
        const { loading, thumbAnswer } = this.state;

        if (!imgAnswer) {
            return (
                <img
                    src="/image/picture (1).png"
                    alt="image"
                    className="display-ImgAnswer"
                />
            )
        }

        if (loading) {
            return <p>loading...</p>;
        }

        return (
            <img
                src={thumbAnswer}
                alt={imgAnswer.name}
                className="display-ImgAnswer"
            />
        );
    }
}
class ManagementQuiz_Exam extends Component {

    constructor(props) {
        super(props);
        this.state = {
            typeQuestion: '',
            isDispalyForm: true,
            check: 1,
            srcAnswer: '',
        }
    }

    handleResetAnswer = (e) => {
        this.setState({
            srcAnswer: '',
        })
    }
    handleImgQuestion = (e) => {
        this.setState({
            src: e.target.value,
        })

    }
    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     var { typeAdd, titleAdd, descriptionAdd, levelAdd } = this.state;
    //     var formData = new FormData();
    //     formData.append("type", typeAdd);
    //     formData.append("title", titleAdd);
    //     formData.append("description", descriptionAdd);
    //     formData.append("level", levelAdd);
    //     console.log(formData.get("description"));
    //     document.getElementById("addInfoQuizForm").reset();
    // }
    // handleReset = (e) => {
    //     e.preventDefault();
    //     document.getElementById("addInfoQuizForm").reset();
    // }(
    ToToggleForm = (e) => {

        if (e.target.value === "Quiz") {
            this.setState({
                check: 1,
            })
        }
        else if (e.target.value === "QuizHinhAnh") {
            this.setState({
                check: 2,
            })
        }
        else if (e.target.value === "QuizSapXep") {
            this.setState({
                check: 3
            })
        }
    }
    render() {
        // var srcc = this.state.src.replace("C:\\fakepath\\", "/image/");
        // var srcAnswer = this.state.srcAnswer.replace("C:\\fakepath\\", "/image/");
        var { check } = this.state;
        return (
            <div>
                <div id="quiz">
                    {/* header: bắt đầu */}
                    <HeaderAdmin2></HeaderAdmin2>
                    {/* header: kết thúc */}
                    <section className="main">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-3 kedoc">
                                    {/* Thông tin quiz/exam: bắt đầu */}
                                    <div className="info-quiz">
                                        <div className="info">
                                            <h5 className="title-info">THÔNG TIN BÀI QUIZ/EXAM</h5>
                                        </div>
                                        <Formik
                                            initialValues={infoQuiz}
                                            onSubmit={async (values, { resetForm }) => {
                                                await new Promise((r) => setTimeout(r, 500));
                                                alert(JSON.stringify(values, null, 2));
                                                resetForm({})
                                            }}
                                        >
                                            {({ resetForm }) => (
                                                <Form className="content" >
                                                    <div className="type">
                                                        <label htmlFor="type">Loại bài</label>
                                                        <Field
                                                            as="select"
                                                            name="type"
                                                            id="type">
                                                            <option value="Quiz">Quiz</option>
                                                            <option value="Exam">Exam</option>
                                                        </Field>
                                                    </div>
                                                    <div className="title">
                                                        <label htmlFor="title">Tên bài</label>
                                                        <Field
                                                            type="text"
                                                            placeholder="Nhập tên bài..."
                                                            required
                                                            id="title"
                                                            name="title"></Field>
                                                    </div>
                                                    <div className="description">
                                                        <label htmlFor="description">Mô tả</label>
                                                        <Field
                                                            type="text"
                                                            placeholder="Nhập mô tả..."
                                                            name="description"
                                                            id="description"
                                                            required></Field>
                                                    </div>
                                                    <div className="level">
                                                        <label htmlFor="level">Độ khó</label>
                                                        <Field
                                                            as="select"
                                                            id="level"
                                                            name="level">
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                        </Field>
                                                    </div>
                                                    <div className="row justify-content-end function">
                                                        <div className="col-md-3">
                                                            <p className="f1" onClick={() => resetForm(infoQuiz)}>Cài lại</p>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <button className="f2" type="submit" >Lưu lại</button>
                                                        </div>
                                                    </div>
                                                </Form>
                                            )}
                                        </Formik>

                                    </div>
                                    {/* Thông tin quiz/exam: kết thúc */}
                                    <div className="item-question">
                                        <ol type="1">
                                            <div className="card">
                                                <p className="order">Câu hỏi <li></li></p>
                                                <div className="card bg-light">
                                                    <div className="card-body">
                                                        <div className="card-title text-center">
                                                            <p className="question">Đây là đất nước nào?</p>
                                                            <img src="/image/english (1).jpg" />
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <p className="answerTrue">Anh quốc</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p className="answer">Anh quốc</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p className="answer">Anh quốc</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p className="answer">Anh quốc</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card">
                                                <p className="order">Câu hỏi <li></li></p>
                                                <div className="card bg-light">
                                                    <div className="card-body">
                                                        <div className="card-title text-center">
                                                            <p className="question">Đây là đất nước nào?</p>
                                                            <img src="/image/english (1).jpg" />
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <p className="answerTrue">Anh quốc</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p className="answer">Anh quốc</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p className="answer">Anh quốc</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p className="answer">Anh quốc</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <button className="btn btn-add" type="submit"><img src="/image/plus (1).png" /> Thêm câu hỏi</button> */}
                                            <a className="exit" href="#">Quay lại</a>
                                        </ol>
                                    </div>

                                </div>
                                <div className="col-md-9">
                                    <Formik
                                        initialValues={questions}

                                        onSubmit={async (values, { resetForm }) => {
                                            await new Promise((r) => setTimeout(r, 500));
                                            alert(JSON.stringify({ imgQuestion: values.file.name, imgAnswer: values.imgAnswer.name, values }, null, 5));
                                            console.log(values.imgQuestion)
                                            resetForm({});

                                        }}
                                    >
                                        {({ values, setFieldValue, resetForm }) => (
                                            <Form>
                                                <div className="row">
                                                    {check === 2 ? (
                                                        <div className="col-md-8 kedoc">
                                                            <div className="question">
                                                                <Field
                                                                    className="titleQuestion"
                                                                    placeholder="Nhập câu hỏi..."
                                                                    type="text"
                                                                    id="titleQuestion"
                                                                    name="titleQuestion"
                                                                    component="textarea"
                                                                    defaultValue={""} />
                                                                <div className="boxImg">
                                                                    <Thumb file={values.file} />
                                                                    <div className="itemImg">
                                                                        <Field type="file"
                                                                            accept="image/png, image/jpeg"
                                                                            className="item-question fa fa-camera "
                                                                            id="imgQuestion"
                                                                            name="imgQuestion"
                                                                            onChange={(event) => {
                                                                                setFieldValue("file", event.currentTarget.files[0]);
                                                                            }}
                                                                        />
                                                                        <img src="/image/delete1.png" className="img-question"
                                                                            onClick={() => {
                                                                                setFieldValue("file", null);
                                                                            }}></img>
                                                                    </div>
                                                                </div>

                                                                <p>Chọn file nghe:
                                                                    <Field
                                                                        type="file"
                                                                        className="file mt-3"
                                                                        id="fileQuestion"
                                                                        name="fileQuestion" /></p>
                                                                <div className="answer answerHinhAnh">
                                                                    <ol type="A">
                                                                        <FieldArray name="answersThree">
                                                                            {({ insert, remove, push }) => (
                                                                                <div>
                                                                                    {values.answersThree.length > 0 &&
                                                                                        values.answersThree.map((answer, index) => (
                                                                                            <div className="itemAnswer">
                                                                                                <div className="row" key={index}>
                                                                                                    <div className="col-1 kedoc">
                                                                                                        <p className="textOrderThree"><li></li></p>
                                                                                                    </div>
                                                                                                    <div className="col-9 kedoc">
                                                                                                        <div className="row">
                                                                                                            <div className="col-8">
                                                                                                                <Field name={`answersThree.${index}.textAnswer`} type="text" placeholder="Nhập đáp án..." className="answerTextThree" />
                                                                                                                <Field name={`answersThree.${index}.fileAnswer`} type="file" className="answerFile" />
                                                                                                            </div>
                                                                                                            <div className="col-4">
                                                                                                                <div className="boxImgAnswer">
                                                                                                                    <Thumb_Answer imgAnswer={values.imgAnswer} />
                                                                                                                    <div className="itemImg">
                                                                                                                        <Field name={`answersThree.${index}.imgAnswer`} type="file"
                                                                                                                            accept="image/png, image/jpeg"
                                                                                                                            className="item-answer fa fa-camera "
                                                                                                                            onChange={(event) => {
                                                                                                                                setFieldValue("imgAnswer", event.currentTarget.files[0]);
                                                                                                                            }}
                                                                                                                            id="imgAnswer"
                                                                                                                        />
                                                                                                                        <img src="/image/delete1.png" className="img-answer"
                                                                                                                            onClick={() => {
                                                                                                                                setFieldValue("imgAnswer", null);
                                                                                                                            }} ></img>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="col-1">
                                                                                                        <Field type="checkbox" name={`answersThree.${index}.checkAnswer`} className="radioAnswerThree" />
                                                                                                    </div>
                                                                                                    <div className="col-1">
                                                                                                        <button
                                                                                                            type="button"
                                                                                                            className="secondary"
                                                                                                            onClick={() => remove(index)}
                                                                                                            className="exitThree"
                                                                                                        ><img src="/image/cross.png"></img>
                                                                                                        </button>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        ))}
                                                                                    <button
                                                                                        type="button"
                                                                                        className="btn btn-addAnswer"

                                                                                        onClick={() => push({ textAnswer: '', fileAnswer: '', imgAnswer: '', checkAnswer: '' })}>
                                                                                        <img src="/image/plus.png" /> Thêm đáp án
                                                      </button>
                                                                                </div>
                                                                            )}
                                                                        </FieldArray>
                                                                    </ol>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (check === 3 ? (
                                                        <div className="col-md-8 kedoc">
                                                            <div className="question">
                                                                <Field
                                                                    className="titleQuestion"
                                                                    placeholder="Nhập câu hỏi..."
                                                                    type="text"
                                                                    id="titleQuestion"
                                                                    name="titleQuestion"
                                                                    component="textarea"
                                                                    defaultValue={""} />
                                                                {/* <img src="/image/picture (1).png" alt="img-question" class="img-question"> */}
                                                                <p>Chọn file nghe:
                                                                    <Field
                                                                        type="file"
                                                                        className="file mt-3"
                                                                        id="fileQuestion"
                                                                        name="fileQuestion" />
                                                                </p>
                                                                <div className="boxWord">
                                                                    <FieldArray name="words">
                                                                        {({ remove, push }) => (
                                                                            <div className="words">
                                                                                {values.words.length > 0 &&
                                                                                    values.words.map((word, index) => (
                                                                                        <div key="index" className="word">
                                                                                            <Field type="text" id="word" name={`words.${index}.word`} placeholder="Nhập từ" onBlur={() => push({ word: "" })}>

                                                                                            </Field>
                                                                                            <button
                                                                                                type="button"
                                                                                                className="secondary"
                                                                                                onClick={() => remove(index)}
                                                                                                className="exitThree"
                                                                                            ><img src="/image/cross.png"></img>
                                                                                            </button>
                                                                                        </div>

                                                                                    ))}
                                                                            </div>)}
                                                                    </FieldArray>

                                                                </div>
                                                                <div className="answerSort">
                                                                    <h5>ĐÁP ÁN:</h5>
                                                                    <Field component="textarea" name="answerSort" id="answerSort" type="text" placeholder="Nhập đáp án..." className="textareaSort" defaultValue={""} />
                                                                </div>
                                                                {/* <button class="btn btn-addAnswer"><img src="/image/plus (3).png"> Thêm đáp án</button> */}
                                                            </div>
                                                        </div>
                                                    ) :
                                                        (
                                                            <div className="col-md-8 kedoc">
                                                                <div className="question">
                                                                    <Field
                                                                        className="titleQuestion"
                                                                        placeholder="Nhập câu hỏi..."
                                                                        type="text"
                                                                        id="titleQuestion"
                                                                        name="titleQuestion"
                                                                        component="textarea"
                                                                        defaultValue={""} />
                                                                    {/* <img src="/image/picture (1).png" alt="img-question" class="img-question"> */}
                                                                    <p>Chọn file nghe:
                                                                    <Field
                                                                            type="file"
                                                                            className="file mt-3"
                                                                            id="fileQuestion"
                                                                            name="fileQuestion" />
                                                                    </p>
                                                                    <div className="answer answerText">
                                                                        <ol type="A">
                                                                            <FieldArray name="answersOne">
                                                                                {({ insert, remove, push }) => (
                                                                                    <div>
                                                                                        {values.answersOne.length > 0 &&
                                                                                            values.answersOne.map((answer, index) => (
                                                                                                <div className="itemAnswer">
                                                                                                    <div className="row" key={index}>
                                                                                                        <div className="col-1">
                                                                                                            <p className="textOrder"><li></li></p>

                                                                                                        </div>
                                                                                                        <div className="col-9">
                                                                                                            <Field
                                                                                                                name={`answersOne.${index}.textAnswer`}
                                                                                                                placeholder="Nhập đáp án..."
                                                                                                                type="text"
                                                                                                                className="answerFile"
                                                                                                            />
                                                                                                            <ErrorMessage
                                                                                                                name={`answersOne.${index}.name`}
                                                                                                                component="div"
                                                                                                                className="field-error"
                                                                                                            />
                                                                                                        </div>
                                                                                                        <div className="col-1">

                                                                                                            <Field
                                                                                                                name={`answersOne.${index}.checkAnswer`}
                                                                                                                className="radioAnswerFile"
                                                                                                                type="checkbox"

                                                                                                            />
                                                                                                            <ErrorMessage
                                                                                                                name={`answersOne.${index}.name`}
                                                                                                                component="div"
                                                                                                                className="field-error"
                                                                                                            />

                                                                                                        </div>
                                                                                                        <div className="col-1">
                                                                                                            <button
                                                                                                                type="button"
                                                                                                                className="secondary"
                                                                                                                onClick={() => remove(index)}
                                                                                                                className="exit"
                                                                                                            ><img src="/image/cross.png"></img>
                                                                                                            </button>
                                                                                                        </div>

                                                                                                    </div>
                                                                                                </div>
                                                                                            ))}
                                                                                        <button
                                                                                            type="button"
                                                                                            className="btn btn-addAnswer"
                                                                                            onClick={() => push({ textAnswer: '', checkAnswer: '' })}>
                                                                                            <img src="/image/plus.png" /> Thêm đáp án
                                                      </button>
                                                                                    </div>
                                                                                )}
                                                                            </FieldArray>
                                                                        </ol>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        ))}
                                                    <div className="col-md-4">
                                                        <div className="info-question">
                                                            <div className="content">
                                                                <div className="type">
                                                                    <p><img src="/image/info.png" /> Loại câu hỏi</p>
                                                                    <Field
                                                                        id="typeQuestion"
                                                                        component="select"
                                                                        name="typeQuestion"
                                                                        value={values.typeQuestion}
                                                                        onClick={this.ToToggleForm}

                                                                    >
                                                                        <option value="Quiz">Quiz</option>
                                                                        <option value="QuizHinhAnh" >Quiz hình ảnh</option>
                                                                        <option value="QuizSapXep" >Sắp xếp từ vựng</option>
                                                                    </Field>
                                                                </div>
                                                                <div className="time mt-2">
                                                                    <p><img src="/image/clock (1).png" /> Thời gian trả lời câu hỏi</p>
                                                                    <Field
                                                                        as="select"
                                                                        id="timeQuestion"
                                                                        name="timeQuestion">
                                                                        <option value="10">10 giây</option>
                                                                        <option value="30">30 giây</option>
                                                                        <option value="45">45 giây</option>
                                                                        <option value="60">60 giây</option>
                                                                        <option value="90">90 giây</option>
                                                                    </Field>
                                                                </div>
                                                                <div className="point mt-2">
                                                                    <p><img src="/image/surprise.png" /> Số điểm đạt được</p>
                                                                    <Field
                                                                        id="pointQuestion"
                                                                        name="pointQuestion"
                                                                        as="select">
                                                                        <option value="5">5 điểm</option>
                                                                        <option value="10">10 điểm</option>
                                                                        <option value="15">15 điểm</option>
                                                                        <option value="20">20 điểm</option>
                                                                    </Field>
                                                                </div>
                                                                <div className="typeAnswer">
                                                                    <p className="mb-2"><img src="/image/info.png" /> Loại đáp án</p>
                                                                    <div className="card ">
                                                                        <div className="row">
                                                                            <div className="col-6">Chữ</div>
                                                                            <div className="col-6 text-right">
                                                                                <div className="toggle-switch">
                                                                                    <input type="checkbox" id="toggleSwitch"
                                                                                        name="toggleSwitch"
                                                                                        id="toggleSwitch1"
                                                                                        defaultChecked />
                                                                                    <label htmlFor="toggleSwitch1" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-6">Hình ảnh</div>
                                                                            <div className="col-6 text-right">
                                                                                <div className="toggle-switch">
                                                                                    <input type="checkbox"
                                                                                        name="toggleSwitch"
                                                                                        id="toggleSwitch2" />
                                                                                    <label htmlFor="toggleSwitch2" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-6">Âm thanh</div>
                                                                            <div className="col-6 text-right">
                                                                                <div className="toggle-switch">
                                                                                    <input type="checkbox"
                                                                                        name="toggleSwitch"
                                                                                        id="toggleSwitch3" />
                                                                                    <label htmlFor="toggleSwitch3" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row functionQuestion">
                                                                <div className="col-md-4">
                                                                    <p className="btn btn-danger"><img src="/image/delete1.png" /> Xóa</p>
                                                                </div>
                                                                <div className="col-md-8 text-right">
                                                                    {/* <p className="btn btn-warning"><img src="/image/duplicate.png" /> Sao chép</p> */}
                                                                    <button className="btn btn-add" type="submit"><img src="/image/plus (1).png" /> Thêm câu hỏi</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}
export default ManagementQuiz_Exam;