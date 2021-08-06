import { useEffect, useRef, useState } from "react";
import { Tabs, Tab, ListGroup, Modal, Button } from "react-bootstrap";
import { Link } from "react-browser-router";
import { useParams } from "react-router-dom";
import examApiv2 from "../../api/2.0/examApi";
import questionApiV2 from "../../api/2.0/questionApi";
import HeaderClient from "../../components/client/HeaderClient";
import QuestionPreview from "../../components/question/QuestionPreview";
import Search from "../../components/search/Search";
import { Difficult } from "../../constants/Difficult";
import { QuestionTypes } from "../../constants/QuestionTypes";
import { ToeicParts } from "../../constants/ToeicParts";
import { toast } from "react-toastify";
import quizApi from "../../api/2.0/quizApi";
import QuizPreview from "./../Admin/ContentManagement/QuizPreview";

const QuizCreate = ({}) => {
  const [questions, setQuestions] = useState([]);
  const [quiz, setQuiz] = useState({
    quizName: "",
    difficultLevel: "Easy",
    duration: 10,
    questions: [],
  });
  const [selectQuestion, setSelectQuestion] = useState({});
  const [selectQuestions, setSelectQuestions] = useState([]);
  const [availableQuestions, setAvailableQuestions] = useState([]);
  const { quizId } = useParams();
  const [questionModal, setQuestionModal] = useState(false);
  const [isBusy, setIsBusy] = useState(true);
  const [type, setType] = useState(QuestionTypes.Quiz);
  const [quizInspectModal, setQuizInspectModal] = useState(false);
  const [modalCreate, setModalCreate] = useState(false);
  useEffect(() => {
    async function fetchQuiz() {
      if (quizId) {
        const result = await quizApi.get(quizId);
        setQuiz(result);
        setIsBusy(false);

        // const data = await questionApiV2.getFilter(type);
        // setAvailableQuestions(data.filter((q) => !result.questions.includes(q)));
      }
    }
    fetchQuiz();
  }, [quizId]);
  useEffect(() => {
    async function fetchQuestions() {
      const data = await questionApiV2.getFilter(type);
      setAvailableQuestions(
        data.filter(
          (q) => quiz.questions.find((value) => value.id == q.id) == undefined
        )
      );
    }
    if (!isBusy) {
      fetchQuestions();
    }
  }, [type, isBusy]);
  function submitAdd() {
    setQuiz({
      ...quiz,
      questions: [...quiz.questions, ...selectQuestions],
    });
    setAvailableQuestions(
      availableQuestions.filter((q) => !selectQuestions.includes(q))
    );
    setSelectQuestions([]);
  }
  function removeQuestion(question) {
    setQuiz({
      ...quiz,
      questions: [...quiz.questions.filter((q) => q != question)],
    });
    setAvailableQuestions([...availableQuestions, question]);
  }
  function search(query) {
    if (query != "") {
      setQuestions([
        ...questions.filter((q) => q.content.includes(query.trim())),
      ]);
    } else {
    }
  }
  async function submit() {
    if (quizId) {
      const result = await quizApi.edit(quiz.id, quiz);
      if (result.status == 200) {
        toast("Thành công", { type: "success" });
      } else {
        toast("Thất bại", { type: "error" });
      }
    } else {
      const result = await quizApi.create(quiz, true);
      if (result.status == 200) {
        toast("Thành công", { type: "success" });
      } else {
        toast("Thất bại", { type: "error" });
      }
    }
  }
  return (
    <div id="wrapper">
      <div id="content-wrapper" className="d-flex flex-column">
        {/* <SubMenuClient></SubMenuClient> */}
        <div id="quiz">
          <div id="content">
            <HeaderClient></HeaderClient>
            {/* header: bắt đầu */}
            {/* header: kết thúc */}
            <section className="main">
              <div className="container">
                <div>
                  <Link to="/admin/quan-ly-quiz">Trở lại</Link>
                </div>
                <div className="row">
                  <div className="col-5">
                    <h6 className="mt-2">Tiêu đề</h6>
                    <input
                      className="form-control"
                      value={quiz.quizName}
                      type="text"
                      onChange={(e) =>
                        setQuiz({ ...quiz, quizName: e.target.value })
                      }
                      required
                    ></input>
                  </div>
                  <div className="col-1">
                    <h6 className="mt-2">Độ khó</h6>
                    <select
                      className="pagination-select"
                      value={quiz.difficultLevel}
                      onChange={(e) =>
                        setQuiz({ ...quiz, difficultLevel: e.target.value })
                      }
                    >
                      <option value={Difficult.Easy}>Dễ</option>
                      <option value={Difficult.Medium}>Vừa</option>
                      <option value={Difficult.Hard}>Khó</option>
                    </select>
                  </div>
                </div>
                <br></br>
                <div className="rounded card p-1">
                  <div className="card-header d-flex justify-content-between">
                    <h5>Các câu hỏi trong bài quiz</h5>
                    <div>
                      <button
                        className="btn btn-success rounded-pill mr-2"
                        onClick={() => setQuizInspectModal(!quizInspectModal)}
                      >
                        <i className="fa fa-play-circle"></i>
                      </button>
                      <button
                        onClick={() => setModalCreate(!modalCreate)}
                        className="btn rounded-pill btn-question-add font-weight-bold"
                      >
                        Tạo câu hỏi
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-light rounded-circle mr-1"
                        onClick={() => {
                          setQuestionModal(!questionModal);
                        }}
                      >
                        <i className="fa fa-cog"></i>
                      </button>
                    </div>
                    <ListGroup className="border">
                      {quiz.questions.map((question, index) => (
                        <ListGroup.Item
                          className={`p-1 ${
                            index == 0 ? "" : "mt-1"
                          } border cursor-pointer ${
                            selectQuestion == question
                              ? "bg-primary text-white"
                              : ""
                          }`}
                          key={index}
                        >
                          <div className="d-flex justify-content-between align-items-middle">
                            <p
                              onClick={() => setSelectQuestion(question)}
                              className={`p-2 col-11 reading ${
                                selectQuestion == question ? "text-white" : ""
                              }`}
                            >
                              {`${
                                question.preQuestion
                                  ? question.preQuestion
                                  : "Chọn đáp án đúng"
                              }`}
                            </p>
                            <button
                              className="btn btn-light"
                              onClick={() => removeQuestion(question)}
                            >
                              {" "}
                              <i className="fa fa-remove text-danger"></i>
                            </button>
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </div>
                </div>
              </div>
              <br></br>
              <div className="container form-group d-flex justify-content-end">
                <Link
                  className="btn btn-secondary rounded mr-1"
                  to="/admin/quan-ly-quiz-exam"
                >
                  Hủy
                </Link>
                <button
                  className="btn btn-primary rounded"
                  onClick={() => submit()}
                >
                  Lưu lại
                </button>
              </div>
              <Modal
                show={questionModal}
                onHide={() => setQuestionModal(!questionModal)}
                animation
                size="lg"
                dialogClassName="modal-full-screen"
              >
                <Modal.Body className="modal-background">
                  <h5>Danh sách câu hỏi khả dụng</h5>
                  <h6>Chọn một hoặc nhiều để thêm vào bài kiểm tra</h6>
                  <br></br>
                  <Search queryFunction={search}></Search>
                  <div className="row">
                    <div className="col-6">
                      <ListGroup
                        className="border p-2 script-panel"
                        style={{ overflowY: "auto" }}
                      >
                        {availableQuestions.map((question, index) => (
                          <ListGroup.Item
                            className={`p-1 ${
                              index == 0 ? "" : "mt-2"
                            } border cursor-pointer ${
                              selectQuestion == question
                                ? "bg-primary text-white"
                                : ""
                            }`}
                            key={index}
                          >
                            <div className="d-flex justify-content-between align-items-center">
                              <p
                                className={`p-2 col-11 reading ${
                                  selectQuestion == question ? "text-white" : ""
                                }`}
                                onClick={() => setSelectQuestion(question)}
                              >
                                {`${
                                  question.preQuestion
                                    ? question.preQuestion
                                    : "Chọn đáp án đúng"
                                }`}
                              </p>
                              <input
                                id={`select${index}`}
                                className="form-check-input p-1"
                                type="checkbox"
                                checked={selectQuestions.includes(question)}
                                onChange={(e) => {
                                  if (e.currentTarget.checked) {
                                    setSelectQuestions([
                                      ...selectQuestions,
                                      question,
                                    ]);
                                  } else {
                                    setSelectQuestions([
                                      ...selectQuestions.filter(
                                        (q) => q != question
                                      ),
                                    ]);
                                  }
                                }}
                              ></input>
                            </div>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </div>
                    <div className="col-6 script-panel">
                      {Object.keys(selectQuestion).length == 0 ? (
                        <p>Chọn câu hỏi để xem</p>
                      ) : (
                        <QuestionPreview
                          question={selectQuestion}
                        ></QuestionPreview>
                      )}
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={() => submitAdd()}>
                    Lưu lại
                  </Button>
                </Modal.Footer>
              </Modal>
              <Modal
                show={quizInspectModal}
                onHide={() => setQuizInspectModal(!quizInspectModal)}
                dialogClassName="modal-90w"
                size="lg"
                animation
              >
                <Modal.Body>
                  <QuizPreview
                    quiz={quiz}
                    closeReview={() => setQuizInspectModal(!quizInspectModal)}
                  ></QuizPreview>
                </Modal.Body>
                <Modal.Footer bsPrefix="d-flex justify-content-end mb-2">
                  <Button
                    className="mr-4"
                    variant="secondary"
                    onClick={() => setQuizInspectModal(!quizInspectModal)}
                  >
                    Kết thúc preview
                  </Button>
                </Modal.Footer>
              </Modal>
              {modalCreate && (
                <Modal
                  show={modalCreate}
                  animation
                  onHide={() => setModalCreate(!modalCreate)}
                  size="lg"
                  dialogClassName="question-create-modal"
                >
                  <Modal.Body>
                    <div className="d-flex justify-content-end">
                      <button
                        className=""
                        onClick={() => setModalCreate(!modalCreate)}
                      >
                        <i className="fa fa-2x fa-times"></i>
                      </button>
                    </div>
                    <h3 className="text-dark">Chọn loại câu hỏi</h3>
                    <ul className="list-group list-group-flush question-categories-wrapper">
                      <li className="block-item list-group-item text-center">
                        <Link
                          to={{
                            pathname: "cau-hoi/basic",
                            state: { fromDashboard: false },
                          }}
                        >
                          <svg
                            version="1.1"
                            className="block-list__image"
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="48px"
                            height="48px"
                            viewBox="-12 -12 48 48"
                            enableBackground="new -12 -12 48 48"
                            xmlSpace="preserve"
                          >
                            <g>
                              <polygon points="30,1.4 30,3.6 -6,3.6 -6,1.4"></polygon>
                              <polygon points="-6,8.2 30,8.2 30,10.4 -6,10.4"></polygon>
                              <polygon points="-6,15 30,15 30,17 -6,17"></polygon>
                              <polygon points="-6,21.801 30,21.801 30,23.801 -6,23.801"></polygon>
                            </g>
                          </svg>
                          <br></br> Mặc định
                        </Link>
                      </li>
                      <li className="block-item list-group-item align-self-center">
                        <Link
                          to={{
                            pathname: "cau-hoi/fillout",
                            state: { fromDashboard: false },
                          }}
                        >
                          <svg
                            version="1.1"
                            className="block-list__image"
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="48px"
                            height="48px"
                            viewBox="-12 -12 48 48"
                            enableBackground="new -12 -12 48 48"
                            xmlSpace="preserve"
                          >
                            <g>
                              <polygon points="30,2.55 -6,2.55 -6,0.35 30,0.35 30,2.55 30,2.55"></polygon>
                              <polygon points="-6,7.15 -2.2,7.15 -2.2,9.15 -6,9.15"></polygon>
                              <polygon points="0,7.15 3.8,7.15 3.8,9.15 0,9.15"></polygon>
                              <polygon points="12.6,7.15 16.4,7.15 16.4,9.15 12.6,9.15"></polygon>
                              <polygon points="6.6,7.15 10.4,7.15 10.4,9.15 6.6,9.15"></polygon>
                              <polygon points="19.6,7.15 30,7.15 30,9.15 19.6,9.15"></polygon>
                              <polygon points="-6,13.75 30,13.75 30,16.15 -6,16.15"></polygon>
                              <polygon points="-6,20.549 30,20.549 30,22.949 -6,22.949"></polygon>
                            </g>
                          </svg>
                          <br></br> Điền
                        </Link>
                      </li>
                      <li className="block-item list-group-item align-self-center">
                        <Link
                          to={{
                            pathname: "cau-hoi/listening",
                            state: { fromDashboard: true },
                          }}
                        >
                          <svg
                            enableBackground="new 0 0 512 512"
                            height="48px"
                            viewBox="0 0 512 512"
                            width="48px"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g>
                              <path d="m256 313.652c-51.283 0-93.005 41.722-93.005 93.004 0 51.283 41.722 93.005 93.005 93.005 8.629 0 17.177-1.182 25.405-3.515 3.981-1.128 6.294-5.269 5.165-9.25-1.128-3.981-5.268-6.293-9.25-5.165-6.899 1.955-14.073 2.947-21.32 2.947-43.021 0-78.022-35-78.022-78.022 0-43.021 35.001-78.022 78.022-78.022s78.022 35 78.022 78.022c0 23.5-10.444 45.524-28.655 60.422-3.202 2.62-3.674 7.339-1.054 10.542s7.34 3.674 10.542 1.054c21.703-17.755 34.15-44.005 34.15-72.018 0-51.282-41.722-93.004-93.005-93.004z" />
                              <path d="m474.227 240.479v-9.914c0-120.331-97.896-218.226-218.227-218.226-30.81 0-60.615 6.324-88.586 18.795-27.008 12.042-50.962 29.181-71.198 50.941-2.817 3.03-2.645 7.77.384 10.587 3.029 2.818 7.769 2.646 10.587-.384 38.391-41.28 92.63-64.956 148.813-64.956 112.015 0 203.154 91.087 203.242 203.082-1.687-11.244-11.41-19.894-23.116-19.894h-19.079c-4.724-38.137-22.863-73.324-51.446-99.538-30.019-27.534-68.943-42.697-109.601-42.697-40.986 0-80.143 15.378-110.257 43.302-28.241 26.186-46.109 61.1-50.793 98.933h-19.076c-11.708 0-21.431 8.653-23.116 19.899.031-40.354 11.91-79.36 34.363-112.81 2.306-3.435 1.39-8.089-2.046-10.395-3.434-2.304-8.088-1.391-10.395 2.046-24.144 35.972-36.906 77.923-36.906 121.317v9.914c-21.061 1.383-37.774 18.948-37.774 40.353v120.017c0 22.306 18.147 40.454 40.454 40.454h12.045v6.494c0 12.89 10.486 23.376 23.376 23.376h32.599c12.89 0 23.376-10.487 23.376-23.376v-213.913c0-12.357-9.64-22.499-21.794-23.317 9.855-72.013 72.448-127.311 145.944-127.311 73.192 0 136.089 55.424 145.947 127.312-12.155.815-21.797 10.958-21.797 23.317v213.913c0 12.89 10.486 23.376 23.376 23.376h32.599c12.89 0 23.377-10.487 23.377-23.376v-6.494h12.044c22.307 0 40.454-18.148 40.454-40.454v-120.018c0-21.405-16.713-38.969-37.773-40.355zm-433.773 185.843c-14.044 0-25.471-11.426-25.471-25.471v-120.017c0-14.044 11.426-25.471 25.471-25.471h12.045v170.959zm76.412-192.436v213.913c0 4.628-3.765 8.393-8.393 8.393h-32.599c-4.628 0-8.393-3.765-8.393-8.393v-213.913c0-4.628 3.765-8.393 8.393-8.393h32.599c4.628 0 8.393 3.765 8.393 8.393zm380.151 166.965c0 14.044-11.426 25.471-25.471 25.471h-12.044v-116.921c0-4.137-3.354-7.491-7.491-7.491-4.138 0-7.491 3.354-7.491 7.491v138.398c0 4.628-3.765 8.393-8.394 8.393h-32.599c-4.628 0-8.393-3.765-8.393-8.393v-213.913c0-4.628 3.765-8.393 8.393-8.393h32.599c4.629 0 8.394 3.765 8.394 8.393v39.996c0 4.137 3.354 7.491 7.491 7.491 4.138 0 7.491-3.354 7.491-7.491v-18.519h12.044c14.044 0 25.471 11.426 25.471 25.471z" />
                              <path d="m196.049 273.929c4.138 0 7.491-3.354 7.491-7.491v-60.701c0-4.137-3.354-7.491-7.491-7.491-4.138 0-7.491 3.354-7.491 7.491v60.701c0 4.137 3.353 7.491 7.491 7.491z" />
                              <path d="m345.927 208.717c-4.138 0-7.491 3.354-7.491 7.491v39.758c0 4.137 3.354 7.491 7.491 7.491s7.491-3.354 7.491-7.491v-39.758c.001-4.137-3.353-7.491-7.491-7.491z" />
                              <path d="m233.516 283.299v-94.423c0-4.137-3.354-7.491-7.491-7.491s-7.491 3.354-7.491 7.491v94.423c0 4.137 3.354 7.491 7.491 7.491s7.491-3.353 7.491-7.491z" />
                              <path d="m263.491 274.869v-77.562c0-4.137-3.354-7.491-7.491-7.491s-7.491 3.354-7.491 7.491v77.562c0 4.137 3.354 7.491 7.491 7.491s7.491-3.354 7.491-7.491z" />
                              <path d="m323.443 283.299v-94.423c0-4.137-3.354-7.491-7.491-7.491s-7.491 3.354-7.491 7.491v94.423c0 4.137 3.354 7.491 7.491 7.491s7.491-3.353 7.491-7.491z" />
                              <path d="m293.467 245.495v-18.815c0-4.137-3.354-7.491-7.491-7.491s-7.491 3.354-7.491 7.491v18.815c0 4.137 3.354 7.491 7.491 7.491s7.491-3.353 7.491-7.491z" />
                              <path d="m173.565 245.495v-18.815c0-4.137-3.354-7.491-7.491-7.491-4.138 0-7.491 3.354-7.491 7.491v18.815c0 4.137 3.354 7.491 7.491 7.491 4.137.001 7.491-3.353 7.491-7.491z" />
                              <path d="m298.343 394.979-58.624-33.847c-4.222-2.438-9.263-2.438-13.485 0-4.222 2.437-6.742 6.803-6.742 11.678v67.694c0 4.875 2.521 9.24 6.742 11.678 4.222 2.438 9.263 2.438 13.485 0l58.624-33.847c4.222-2.438 6.742-6.804 6.742-11.679s-2.52-9.24-6.742-11.677zm-63.868 42.929v-62.503l54.129 31.252z" />
                            </g>
                          </svg>
                          <br></br> Nghe
                        </Link>
                      </li>
                      <li className="block-item list-group-item align-self-center">
                        <Link
                          to={{
                            pathname: "cau-hoi/reading",
                            state: { fromDashboard: true },
                          }}
                        >
                          <svg
                            version="1.1"
                            className="block-list__image"
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="48px"
                            height="48px"
                            viewBox="-12 -12 48 48"
                            enableBackground="new -12 -12 48 48"
                            xmlSpace="preserve"
                          >
                            <g>
                              <path d="M30-2.2V27H-6V-2.2H30L30-2.2z M-3.8-0.2v24.999h26.999V-0.2H-3.8L-3.8-0.2z M27-0.2h-1.4v24.999h2.201V-0.2H27L27-0.2z"></path>
                              <polygon points="16.4,4.8 16.4,6.6 -1.4,6.6 -1.4,4.399 16.4,4.399"></polygon>
                              <polygon points="9.6,11.199 9.6,13.4 -1.4,13.4 -1.4,11.199"></polygon>
                              <polygon points="21,18.199 21,20.199 -1.4,20.199 -1.4,18 21,18"></polygon>
                            </g>
                          </svg>
                          <br></br> Đọc
                        </Link>
                      </li>

                      <li className="block-item list-group-item align-self-center">
                        <Link
                          to={{
                            pathname: "cau-hoi/speaking",
                            state: { fromDashboard: true },
                          }}
                        >
                          <svg
                            enableBackground="new 0 0 512 512"
                            height="48px"
                            viewBox="0 0 512 512"
                            width="48px"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g>
                              <path d="m396 192h-55v-45c0-46.869-38.131-85-85-85s-85 38.131-85 85v45h-55c-8.284 0-15 6.716-15 15v60c0 80.407 61.545 146.702 140 154.272v60.728h-37.5c-8.284 0-15 6.716-15 15s6.716 15 15 15h105c8.284 0 15-6.716 15-15s-6.716-15-15-15h-37.5v-60.728c78.455-7.569 140-73.865 140-154.272v-60c0-8.284-6.716-15-15-15zm-195-45c0-30.327 24.673-55 55-55s55 24.673 55 55v120c0 30.327-24.673 55-55 55s-55-24.673-55-55zm180 120c0 68.925-56.075 125-125 125s-125-56.075-125-125v-45h40v45c0 46.869 38.131 85 85 85s85-38.131 85-85v-45h40z" />
                              <circle cx="377" cy="99.853" r="15" />
                              <path d="m430.033 46.82c-5.856-5.857-15.354-5.858-21.213 0-5.858 5.858-5.858 15.355 0 21.213 17.545 17.545 17.545 46.095 0 63.64-5.858 5.858-5.858 15.355 0 21.213 2.929 2.929 6.768 4.393 10.606 4.393s7.678-1.465 10.606-4.394c29.243-29.242 29.243-76.822.001-106.065z" />
                              <path d="m472.459 4.394c-5.857-5.858-15.355-5.858-21.213 0s-5.858 15.355 0 21.213c19.832 19.832 30.754 46.199 30.754 74.246s-10.922 54.415-30.754 74.247c-5.858 5.857-5.858 15.355 0 21.213 2.929 2.929 6.768 4.394 10.606 4.394s7.678-1.465 10.606-4.394c25.499-25.499 39.542-59.4 39.542-95.46s-14.043-69.961-39.541-95.459z" />
                              <circle cx="135" cy="99.853" r="15" />
                              <path d="m103.18 131.673c-17.545-17.545-17.545-46.095 0-63.64 5.858-5.858 5.858-15.355 0-21.213-5.857-5.857-15.355-5.857-21.213 0-29.241 29.243-29.241 76.823 0 106.066 2.929 2.929 6.768 4.394 10.606 4.394s7.678-1.465 10.606-4.393c5.859-5.858 5.859-15.356.001-21.214z" />
                              <path d="m30 99.853c0-28.046 10.922-54.414 30.754-74.246 5.858-5.857 5.858-15.355 0-21.213-5.856-5.857-15.354-5.858-21.213 0-25.498 25.498-39.541 59.399-39.541 95.459s14.043 69.961 39.541 95.459c2.929 2.929 6.768 4.394 10.606 4.394s7.678-1.464 10.606-4.394c5.858-5.858 5.858-15.355 0-21.213-19.831-19.832-30.753-46.199-30.753-74.246z" />
                            </g>
                          </svg>{" "}
                          <br></br> Phát âm
                        </Link>
                      </li>
                      <li className="block-item list-group-item align-self-center">
                        <Link
                          to={{
                            pathname: "cau-hoi/connection",
                            state: { fromDashboard: true },
                          }}
                        >
                          <svg
                            version="1.1"
                            className="block-list__image"
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="48px"
                            height="48px"
                            viewBox="-12 -12 48 48"
                            enableBackground="new -12 -12 48 48"
                            xmlSpace="preserve"
                          >
                            <g>
                              <polygon points="9.6,-4.45 9.6,4.55 -6,4.55 -6,-4.45"></polygon>
                              <polygon points="14.4,-4.45 30,-4.45 30,4.55 14.4,4.55"></polygon>
                              <polygon points="-6,6.95 9.6,6.95 9.6,9.149 -6,9.149"></polygon>
                              <polygon points="30,7.149 30,9.149 14.4,9.149 14.4,6.95 30,6.95"></polygon>
                              <polygon points="-6,15.95 9.6,15.95 9.6,24.749 -6,24.749"></polygon>
                              <polygon points="30,15.95 30,24.749 14.4,24.749 14.4,15.95"></polygon>
                              <polygon points="-6,27.149 9.6,27.149 9.6,29.351 -6,29.351"></polygon>
                              <polygon points="30,29.351 14.4,29.351 14.4,27.149 30,27.149"></polygon>
                            </g>
                          </svg>{" "}
                          <br></br> Nối từ
                        </Link>
                      </li>
                      <li className="block-item list-group-item align-self-center">
                        <Link
                          to={{
                            pathname: "cau-hoi/arrange",
                            state: { fromDashboard: true },
                          }}
                        >
                          <svg
                            version="1.1"
                            id="Capa_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            width="48px"
                            height="48px"
                            viewBox="0 0 307.333 307.333"
                            xmlSpace="preserve"
                          >
                            <g>
                              <path
                                d="M72.831,26.406c-16.114,0-29.224,13.11-29.224,29.224v5.395c-1.159,0.343-2.253,0.973-3.168,1.888
		c-2.929,2.929-2.929,7.678,0.001,10.607l5.36,5.36c0.176,0.176,0.361,0.343,0.554,0.501c0.085,0.07,0.175,0.13,0.262,0.195
		c0.108,0.081,0.214,0.165,0.327,0.241c0.107,0.071,0.217,0.133,0.326,0.198c0.101,0.06,0.199,0.124,0.303,0.179
		c0.112,0.06,0.228,0.111,0.343,0.165c0.106,0.05,0.212,0.104,0.322,0.149c0.111,0.046,0.225,0.083,0.338,0.124
		c0.118,0.042,0.234,0.087,0.355,0.124c0.112,0.034,0.226,0.059,0.339,0.087c0.124,0.031,0.246,0.066,0.373,0.091
		c0.13,0.026,0.262,0.041,0.393,0.06c0.111,0.016,0.221,0.037,0.332,0.048c0.246,0.024,0.493,0.037,0.74,0.037
		c0.247,0,0.494-0.013,0.74-0.037c0.111-0.011,0.221-0.032,0.332-0.048c0.131-0.019,0.263-0.034,0.393-0.06
		c0.127-0.025,0.249-0.06,0.373-0.091c0.113-0.028,0.226-0.053,0.339-0.087c0.121-0.037,0.238-0.082,0.356-0.125
		c0.112-0.04,0.226-0.077,0.337-0.123c0.11-0.046,0.216-0.1,0.323-0.15c0.114-0.054,0.23-0.104,0.342-0.164
		c0.103-0.056,0.202-0.119,0.303-0.179c0.109-0.065,0.22-0.126,0.326-0.198c0.113-0.076,0.219-0.16,0.327-0.241
		c0.087-0.066,0.177-0.126,0.262-0.195c0.192-0.158,0.378-0.325,0.554-0.501l5.36-5.36c2.93-2.929,2.93-7.678,0.001-10.607
		c-0.915-0.915-2.008-1.544-3.168-1.888V55.63c0-7.843,6.381-14.224,14.224-14.224c4.143,0,7.5-3.358,7.5-7.5
		C80.331,29.764,76.974,26.406,72.831,26.406z"
                              />
                              <path
                                d="M202.166,279.833c-4.143,0-7.5,3.358-7.5,7.5v5h-5c-4.143,0-7.5,3.358-7.5,7.5c0,4.142,3.357,7.5,7.5,7.5h12.5
		c4.143,0,7.5-3.358,7.5-7.5v-12.5C209.666,283.191,206.309,279.833,202.166,279.833z"
                              />
                              <path
                                d="M165.428,292.333h-24.238c-4.143,0-7.5,3.358-7.5,7.5c0,4.142,3.357,7.5,7.5,7.5h24.238c4.143,0,7.5-3.358,7.5-7.5
		C172.928,295.691,169.57,292.333,165.428,292.333z"
                              />
                              <path
                                d="M68.476,292.333H44.237c-4.143,0-7.5,3.358-7.5,7.5c0,4.142,3.357,7.5,7.5,7.5h24.238c4.143,0,7.5-3.358,7.5-7.5
		C75.976,295.691,72.618,292.333,68.476,292.333z"
                              />
                              <path
                                d="M116.952,292.333H92.714c-4.143,0-7.5,3.358-7.5,7.5c0,4.142,3.357,7.5,7.5,7.5h24.238c4.143,0,7.5-3.358,7.5-7.5
		C124.452,295.691,121.095,292.333,116.952,292.333z"
                              />
                              <path
                                d="M20,292.333h-5v-5c0-4.142-3.358-7.5-7.5-7.5c-4.143,0-7.5,3.358-7.5,7.5v12.5c0,4.142,3.357,7.5,7.5,7.5H20
		c4.142,0,7.5-3.358,7.5-7.5C27.5,295.691,24.142,292.333,20,292.333z"
                              />
                              <path
                                d="M7.5,270.595c4.142,0,7.5-3.358,7.5-7.5v-24.238c0-4.142-3.358-7.5-7.5-7.5c-4.143,0-7.5,3.358-7.5,7.5v24.238
		C0,267.237,3.357,270.595,7.5,270.595z"
                              />
                              <path
                                d="M7.5,222.119c4.142,0,7.5-3.358,7.5-7.5V190.38c0-4.142-3.358-7.5-7.5-7.5c-4.143,0-7.5,3.358-7.5,7.5v24.238
		C0,218.761,3.357,222.119,7.5,222.119z"
                              />
                              <path
                                d="M7.5,173.643c4.142,0,7.5-3.358,7.5-7.5v-24.238c0-4.142-3.358-7.5-7.5-7.5c-4.143,0-7.5,3.358-7.5,7.5v24.238
		C0,170.285,3.357,173.643,7.5,173.643z"
                              />
                              <path
                                d="M20,97.666H7.5c-4.143,0-7.5,3.358-7.5,7.5v12.5c0,4.142,3.357,7.5,7.5,7.5c4.142,0,7.5-3.358,7.5-7.5v-5h5
		c4.142,0,7.5-3.358,7.5-7.5C27.5,101.024,24.142,97.666,20,97.666z"
                              />
                              <path
                                d="M141.19,112.666h24.238c4.143,0,7.5-3.358,7.5-7.5c0-4.142-3.357-7.5-7.5-7.5H141.19c-4.143,0-7.5,3.358-7.5,7.5
		C133.69,109.309,137.048,112.666,141.19,112.666z"
                              />
                              <path
                                d="M68.477,97.666H44.238c-4.143,0-7.5,3.358-7.5,7.5c0,4.142,3.357,7.5,7.5,7.5h24.238c4.143,0,7.5-3.358,7.5-7.5
		C75.977,101.024,72.619,97.666,68.477,97.666z"
                              />
                              <path
                                d="M189.666,112.666h5v5c0,4.142,3.357,7.5,7.5,7.5c4.143,0,7.5-3.358,7.5-7.5v-12.5c0-4.142-3.357-7.5-7.5-7.5h-12.5
		c-4.143,0-7.5,3.358-7.5,7.5C182.166,109.309,185.523,112.666,189.666,112.666z"
                              />
                              <path
                                d="M202.166,134.404c-4.143,0-7.5,3.358-7.5,7.5v24.238c0,4.142,3.357,7.5,7.5,7.5c4.143,0,7.5-3.358,7.5-7.5v-24.238
		C209.666,137.762,206.309,134.404,202.166,134.404z"
                              />
                              <path
                                d="M202.166,231.356c-4.143,0-7.5,3.358-7.5,7.5v24.238c0,4.142,3.357,7.5,7.5,7.5c4.143,0,7.5-3.358,7.5-7.5v-24.238
		C209.666,234.714,206.309,231.356,202.166,231.356z"
                              />
                              <path
                                d="M299.833,0H105.167c-4.143,0-7.5,3.358-7.5,7.5v90.166h-4.953c-4.143,0-7.5,3.358-7.5,7.5c0,4.142,3.357,7.5,7.5,7.5h4.953
		v89.5c0,4.142,3.357,7.5,7.5,7.5h89.499v4.952c0,4.142,3.357,7.5,7.5,7.5c4.143,0,7.5-3.358,7.5-7.5v-4.952h90.167
		c4.142,0,7.5-3.358,7.5-7.5V7.5C307.333,3.358,303.975,0,299.833,0z M292.333,194.667h-82.667v-4.286c0-4.142-3.357-7.5-7.5-7.5
		c-4.143,0-7.5,3.358-7.5,7.5v4.286h-81.999v-82h4.285c4.143,0,7.5-3.358,7.5-7.5c0-4.142-3.357-7.5-7.5-7.5h-4.285V15h179.666
		V194.667z"
                              />
                            </g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                          </svg>
                          <br></br> Sắp xếp từ
                        </Link>
                      </li>
                      <li className="block-item list-group-item align-self-center">
                        <Link
                          to={{
                            pathname: "cau-hoi/conversation",
                            state: { fromDashboard: true },
                          }}
                        >
                          <svg
                            id="Layer_1"
                            enableBackground="new 0 0 512 512"
                            height="48px"
                            viewBox="0 0 512 512"
                            width="48px"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g>
                              <g>
                                <path d="m152.949 396.631c6.815-10.31 10.796-22.65 10.796-35.907 0-35.993-29.294-65.275-65.302-65.275s-65.301 29.282-65.301 65.275c0 13.258 3.982 25.598 10.797 35.909-25.903 10.73-43.932 36.443-43.932 65.371v39.996c0 5.523 4.477 10 10 10h176.873c5.523 0 10-4.477 10-10v-39.996c0-28.932-18.029-54.645-43.931-65.373zm-54.506-81.182c24.979 0 45.302 20.31 45.302 45.275 0 24.98-20.322 45.303-45.302 45.303-24.979 0-45.301-20.323-45.301-45.303 0-24.965 20.322-45.275 45.301-45.275zm78.437 176.551h-156.873v-29.996c0-23.42 16.48-43.905 38.965-49.302 10.972 8.353 24.649 13.325 39.471 13.325s28.5-4.972 39.472-13.325c22.485 5.393 38.965 25.879 38.965 49.302z" />
                                <path d="m468.034 396.63c6.814-10.31 10.795-22.649 10.795-35.906 0-35.993-29.294-65.275-65.301-65.275-35.992 0-65.273 29.282-65.273 65.275 0 13.254 3.978 25.592 10.788 35.901-25.913 10.725-43.951 36.443-43.951 65.379v39.996c0 5.523 4.477 10 10 10h176.902c5.523 0 10-4.477 10-10v-39.996c-.001-28.932-18.041-54.647-43.96-65.374zm-54.506-81.181c24.979 0 45.301 20.31 45.301 45.275 0 24.98-20.322 45.303-45.301 45.303-24.964 0-45.273-20.323-45.273-45.303 0-24.965 20.309-45.275 45.273-45.275zm78.465 176.551h-156.902v-29.996c0-23.424 16.487-43.913 38.979-49.305 10.968 8.354 24.641 13.328 39.458 13.328 14.822 0 28.5-4.973 39.472-13.326 22.501 5.395 38.992 25.881 38.992 49.303v29.996z" />
                                <path d="m413.806 264.238c1.638 1.049 3.512 1.578 5.392 1.578 1.618 0 3.239-.392 4.716-1.182 3.192-1.707 5.212-5.007 5.282-8.626l.578-30.176c26.49-6.495 46.137-30.715 46.137-58.682 0-29.262-20.919-53.723-48.585-59.232 1.423-6.332 2.155-12.799 2.155-19.344-.001-48.84-39.734-88.574-88.573-88.574h-68.227c-5.523 0-10 4.477-10 10s4.477 10 10 10h68.227c37.811 0 68.573 30.763 68.573 68.575 0 6.174-.835 12.261-2.47 18.176h-136.597c-29.896 0-54.774 21.839-59.555 50.399h-26.869c-2.261 0-4.455.766-6.225 2.173l-59.227 47.105-.771-39.785c-.099-5.111-4.037-9.325-9.13-9.769-35.092-3.057-62.581-33.058-62.581-68.301 0-37.81 30.774-68.573 68.601-68.573h68.227c5.523 0 10-4.477 10-10s-4.477-10-10-10h-68.227c-48.855 0-88.601 39.734-88.601 88.575 0 22.223 8.344 43.51 23.496 59.942 12.982 14.079 29.913 23.486 48.384 27.036l.997 51.487c.074 3.804 2.299 7.236 5.741 8.855 1.357.639 2.81.952 4.256.952 2.221 0 4.423-.739 6.226-2.173l72.325-57.523h23.378c4.781 28.56 29.659 50.399 59.555 50.399h86.077zm-183.79-97.088c0-22.276 18.123-40.399 40.398-40.399h145.099c22.275 0 40.398 18.123 40.398 40.399 0 20.762-16.184 38.437-36.845 40.238-5.094.444-9.032 4.659-9.129 9.771l-.395 20.602-44.733-28.635c-1.609-1.03-3.48-1.578-5.391-1.578h-89.004c-22.276.001-40.398-18.122-40.398-40.398z" />
                                <path d="m286.23 157.136c-5.523 0-10 4.491-10 10.014s4.477 10 10 10 10-4.477 10-10v-.028c0-5.523-4.477-9.986-10-9.986z" />
                                <path d="m342.977 157.136c-5.523 0-10 4.491-10 10.014s4.477 10 10 10 10-4.477 10-10v-.028c0-5.523-4.477-9.986-10-9.986z" />
                                <path d="m399.696 177.15c5.523 0 10-4.477 10-10v-.028c0-5.523-4.477-9.986-10-9.986s-10 4.491-10 10.014 4.477 10 10 10z" />
                                <path d="m227.782 20h.057c5.523 0 9.972-4.477 9.972-10s-4.505-10-10.028-10-10 4.477-10 10 4.476 10 9.999 10z" />
                              </g>
                            </g>
                          </svg>
                          <br></br>
                          Hội thoại
                        </Link>
                      </li>
                      <li className="block-item list-group-item align-self-center">
                        <Link
                          to={{
                            pathname: "cau-hoi/select",
                            state: { fromDashboard: true },
                          }}
                        >
                          <svg
                            id="_x31_px"
                            enableBackground="new 0 0 24 24"
                            height="48px"
                            viewBox="0 0 24 24"
                            width="48px"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="m18.677 23.994c-.974 0-2.102-.308-3.398-.923-1.446-.686-2.143-.662-2.604-.64-.371.011-.758.029-1.14-.353-.134-.134-.743-.864.454-2.061.597-.597 1.416-.769 2.127-.779l-4.146-4.146c-.275-.274-.427-.641-.426-1.03s.153-.754.429-1.029.641-.428 1.03-.429h.002c.388 0 .753.151 1.028.427l1.722 1.723c.069-.138.161-.265.273-.376.395-.396.961-.518 1.462-.362.07-.198.185-.385.343-.543.543-.544 1.411-.568 1.981-.075.068-.138.16-.266.274-.38.569-.569 1.492-.57 2.06-.003l2.7 2.7c1.695 1.694 1.506 4.15-.461 6.118-.004.004-.008.008-.013.013l-1.117 1.116c-.696.688-1.552 1.032-2.58 1.032zm-5.731-2.569c.546 0 1.385.09 2.762.742 2.985 1.417 4.195.729 4.847.086l1.126-1.126c.003-.004.007-.007.01-.01 1.192-1.206 2.009-3.137.459-4.687l-2.708-2.708c-.177-.177-.467-.175-.646.003-.178.178-.18.467-.004.645l.001.001.675.675c.098.098.146.226.146.354s-.049.256-.146.354c-.195.195-.512.195-.707 0l-1.575-1.575c-.177-.177-.467-.176-.646.003s-.18.468-.002.646l1.125 1.125c.098.098.146.226.146.354s-.049.256-.146.354c-.195.195-.512.195-.707 0l-1.575-1.575c-.177-.177-.466-.175-.646.003-.087.087-.135.203-.135.325 0 .121.047.235.132.32l1.125 1.125c.098.098.146.226.146.354s-.049.256-.146.354c-.195.195-.512.195-.707 0l-3.825-3.824c-.086-.086-.2-.134-.321-.134-.122.001-.237.049-.324.136s-.135.202-.136.324c0 .121.047.235.133.321l5.175 5.175c.162.161.193.412.076.608s-.354.288-.571.225c-.019-.005-1.81-.519-2.662.331-.387.388-.444.626-.434.679.042.029.052.04.374.027.093-.006.196-.01.311-.01zm5.498-8.053h.01z" />
                            <path d="m18.5 8h-15c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5h15c1.93 0 3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5zm-15-6c-1.378 0-2.5 1.121-2.5 2.5s1.122 2.5 2.5 2.5h15c1.378 0 2.5-1.121 2.5-2.5s-1.122-2.5-2.5-2.5z" />
                            <path d="m4.5 6c-.827 0-1.5-.673-1.5-1.5s.673-1.5 1.5-1.5 1.5.673 1.5 1.5-.673 1.5-1.5 1.5zm0-2c-.276 0-.5.225-.5.5s.224.5.5.5.5-.225.5-.5-.224-.5-.5-.5z" />
                            <path d="m9.5 6c-.827 0-1.5-.673-1.5-1.5s.673-1.5 1.5-1.5 1.5.673 1.5 1.5-.673 1.5-1.5 1.5zm0-2c-.276 0-.5.225-.5.5s.224.5.5.5.5-.225.5-.5-.224-.5-.5-.5z" />
                            <path d="m7.5 14h-4c-1.93 0-3.5-1.57-3.5-3.5 0-.934.364-1.812 1.026-2.474s1.541-1.026 2.474-1.026h15c1.93 0 3.5 1.57 3.5 3.5 0 .276-.224.5-.5.5s-.5-.224-.5-.5c0-1.379-1.122-2.5-2.5-2.5h-15c-.666 0-1.293.261-1.767.733s-.733 1.101-.733 1.767c0 1.379 1.122 2.5 2.5 2.5h4c.276 0 .5.224.5.5s-.224.5-.5.5z" />
                            <path d="m4.5 12c-.827 0-1.5-.673-1.5-1.5s.673-1.5 1.5-1.5 1.5.673 1.5 1.5-.673 1.5-1.5 1.5zm0-2c-.276 0-.5.225-.5.5s.224.5.5.5.5-.225.5-.5-.224-.5-.5-.5z" />
                            <path d="m9.5 12c-.827 0-1.5-.673-1.5-1.5s.673-1.5 1.5-1.5 1.5.673 1.5 1.5-.673 1.5-1.5 1.5zm0-2c-.276 0-.5.225-.5.5s.224.5.5.5.5-.225.5-.5-.224-.5-.5-.5z" />
                            <path d="m9.5 20h-6c-1.93 0-3.5-1.57-3.5-3.5 0-.934.364-1.812 1.026-2.474s1.541-1.026 2.474-1.026h4c.276 0 .5.224.5.5s-.224.5-.5.5h-4c-.666 0-1.293.261-1.767.733s-.733 1.101-.733 1.767c0 1.379 1.122 2.5 2.5 2.5h6c.276 0 .5.224.5.5s-.224.5-.5.5z" />
                            <path d="m4.5 18c-.827 0-1.5-.673-1.5-1.5s.673-1.5 1.5-1.5 1.5.673 1.5 1.5-.673 1.5-1.5 1.5zm0-2c-.276 0-.5.225-.5.5s.224.5.5.5.5-.225.5-.5-.224-.5-.5-.5z" />
                          </svg>{" "}
                          <br></br> Điền - chọn
                        </Link>
                      </li>
                    </ul>
                  </Modal.Body>
                </Modal>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
export default QuizCreate;
