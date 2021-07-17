import React, { Component, useEffect, useState } from "react";
import SubMenu from "../../components/admin/SubMenu";
import QLListCauHoi from "../../components/managementquestions/QLListCauHoi";
import { Link } from "react-router-dom";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
import questionApiV2 from "../../api/2.0/questionApi";
import { QuestionTypes } from "../../constants/QuestionTypes";
import { Table } from "react-bootstrap";
import Paginate from "../../components/pagination/Paginate";
import parse from "html-react-parser";
import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaUp } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import { FaRedo, FaSave } from "react-icons/fa";
import Search from "../../components/search/Search";
import QuestionCreate from "../../components/question/QuestionCreate";
import { Formik, Field, Form } from "formik";
import { toast } from "react-toastify";
import QuestionPreview from "../../components/question/QuestionPreview";
const initial = {
  content: "",
  preQuestion: "",
  answers: [
    {
      content: "",
      contentLeft: "",
      contentRight: "",
      firstLine: "",
      secondLine: "",
      isQuestionAnswer: true,
    },
  ],
  file: null,
  audio: null,
  type: QuestionTypes.Basic,
  isMultipleAnswer: false,
  firstUser: "",
  secondUser: "",
};
const ManagementQuestion = ({}) => {
  const [questions, setQuestions] = useState({
    currentPage: 1,
    pageSize: 5,
    totalPages: 1,
    items: [],
  });
  const [analystic, setAnalystic] = useState({});
  const [filter, setFilter] = useState({
    type: QuestionTypes.Basic,
    grammar: "",
  });
  const [sort, setSort] = useState({
    ascending: true,
  });
  const [modalCreate, setModalCreate] = useState(false);
  const [modalPreview, setModalPreview] = useState(false);
  const [selectQuestion, setSelectQuestion] = useState({});
  const [livePrview, setLivePreview] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [query, setQuery] = useState("");
  async function fetchData() {
    const params = {
      currentPage: questions.currentPage,
      pageSize: questions.pageSize,
      type: filter.type,
    };
    console.log(params);
    const result = await questionApiV2.getManage(params, filter.grammar, query);
    const analysticResult = await questionApiV2.getAnalystic();
    setAnalystic(analysticResult);
    setQuestions(result);
  }
  useEffect(() => {
    fetchData();
  }, [
    questions.currentPage,
    questions.pageSize,
    filter.type,
    filter.grammar,
    query,
  ]);
  useEffect(() => {
    if (isRefresh) {
      fetchData();
      setIsRefresh(false);
    }
  }, [isRefresh]);
  function paginationChange(currentPage, pageSize) {
    setQuestions({
      ...questions,
      currentPage: currentPage,
      pageSize: pageSize,
    });
  }
  function querySearch(query) {
    setQuestions({
      ...questions,
      currentPage: 1,
    });
    setQuery(query);
  }
  function sortByAnswerCount() {
    if (!sort.ascending) {
      setQuestions({
        ...questions,
        itesm: [
          ...questions.items.sort((a, b) =>
            a.answers.length > b.answers.length ? 1 : -1
          ),
        ],
      });
      setSort({
        ...sort,
        ascending: true,
      });
    } else {
      setQuestions({
        ...questions,
        itesm: [
          ...questions.items.sort((a, b) =>
            a.answers.length < b.answers.length ? 1 : -1
          ),
        ],
      });
      setSort({
        ...sort,
        ascending: false,
      });
    }
  }
  function typeChange(e) {
    setFilter({
      ...filter,
      type: e.target.value,
    });
  }
  async function submitCreate(values) {
    const preProcessQuestion = createQuestion(values);
    console.log(preProcessQuestion);
    if (Object.keys(preProcessQuestion).length > 0) {
      let question = new FormData();
      question.set("preQuestion", preProcessQuestion.preQuestion);
      question.set("content", preProcessQuestion.content);
      question.set("image", preProcessQuestion.file);
      question.set("toeic", preProcessQuestion.toeic || 0);
      question.set("audio", preProcessQuestion.audio);
      question.set("type", preProcessQuestion.type);
      question.set("explaination", preProcessQuestion.explaination || "");
      preProcessQuestion.answers.forEach((answer, index) => {
        question.append(`answers[${index}].content`, answer.content);
        question.append(
          `answers[${index}].isQuestionAnswer`,
          answer.isQuestionAnswer
        );
      });

      const result = await questionApiV2.createQuestion(question);
    }
  }
  const createQuestion = (values) => {
    const question = {
      content: values.content,
      preQuestion: values.preQuestion,
      type: values.type,
      image: values.file,
      audio: values.audio,
      explaination: values.explaination,
    };
    switch (values.type) {
      case QuestionTypes.Basic:
        question.answers = values.answers.map((answer, index) => {
          if (answer.content != "") {
            return {
              content: answer.content,
              isQuestionAnswer: answer.isQuestionAnswer,
            };
          }
        });
        break;
      case QuestionTypes.Connection:
        question.answers = values.answers.map((answer, index) => ({
          content: `<p>${answer.contentLeft.trim()}</p><p>${answer.contentRight.trim()}</p>`,
          isQuestionAnswer: true,
        }));
        break;
      case QuestionTypes.Conversation:
        const newAnswers = [];
         values.firstUser = values.firstUser || 'Engrisk'
          values.secondUser = values.secondUser || 'Thanh'
        values.answers.map((answer, index) => {
         
          if (answer.firstLine != "" || answer.secondLine != "") {
            const firstLine = {
              content: `${values.firstUser}: ${answer.firstLine.trim()}`,
              isQuestionAnswer: true,
            };
            const secondLine = {
              content: `${answer.secondLine.trim()} :${values.secondUser}`,
              isQuestionAnswer: true,
            };
            newAnswers.push(firstLine);
            newAnswers.push(secondLine);
          }
        });
        question.answers = newAnswers.map((ans, index) => ({
          content: `${ans.content} (${index})`,
          isQuestionAnswer: true,
        }));
        break;
      case QuestionTypes.FillOut:
        question.answers = values.answers.map((answer, index) => {
          if (answer.content != "") {
            return {
              content: answer.content,
              isQuestionAnswer: true,
            };
          }
        });
        break;
      case QuestionTypes.Select:
        if (!question.content.includes("<p></p>")) {
          toast("Câu hỏi thiếu cặp thẻ <p></p> ở vị trí điền khuyết", {type: 'warning'});
          return {};
        }
        if (values.answers.length == 0 || values.answers.length == 1) {
          toast("Câu hỏi điền dạng 1 phải có tối thiểu 2 đáp án" , {type: 'warning'});
          return {};
        }
        question.answers = values.answers.map((answer, index) => {
          if (answer.content != "") {
            return {
              content: answer.content,
              isQuestionAnswer: answer.isQuestionAnswer,
            };
          }
        });

        break;
      case QuestionTypes.Toeic:
        question.toeic = values.toeic
        question.answers = values.answers.map((answer, index) => {
          if (answer.content != "") {
            return {
              content: answer.content,
              isQuestionAnswer: answer.isQuestionAnswer,
            };
          }
        });
        break;
    }
    console.log(question);
    return question;
  };
  function createPreview(values) {
    const question = {
      content: values.content,
      preQuestion: values.preQuestion,
      type: values.type,
      image: values.file,
      audio: values.audio,
      explaination: values.explaination,
    };
    console.log(question);
    switch (values.type) {
      case QuestionTypes.Basic:
        question.answers = values.answers.map((answer, index) => {
          return {
            answer: answer.content,
            isQuestionAnswer: answer.isQuestionAnswer,
          };
        });
        break;
      case QuestionTypes.Connection:
        question.answers = values.answers.map((answer, index) => ({
          answer: `<p>${answer.contentLeft.trim()}</p><p>${answer.contentRight.trim()}</p>`,
          isQuestionAnswer: true,
        }));
        break;
      case QuestionTypes.Conversation:
        const newAnswers = [];
        values.firstUser = values.firstUser || 'Engrisk'
        values.secondUser = values.secondUser || 'Thanh'
        values.answers.map((answer, index) => {
          if (answer.firstLine != "" || answer.secondLine != "") {
            const firstLine = {
              content: `${values.firstUser}: ${answer.firstLine.trim()}`,
              isQuestionAnswer: true,
            };
            if (answer.firstLine == "") {
              firstLine.content = `<hidden></hidden>`;
            }
            newAnswers.push(firstLine);
            const secondLine = {
              content: `${answer.secondLine.trim()} :${values.secondUser}`,
              isQuestionAnswer: true,
            };
            if (answer.secondLine == "") {
              secondLine.content = `<hidden></hidden>`;
            }
            newAnswers.push(secondLine);
          }
        });
        question.answers = newAnswers.map((ans, index) => ({
          answer: `${ans.content}(${index})`,
          isQuestionAnswer: true,
        }));
        break;
      case QuestionTypes.FillOut:
        question.answers = values.answers.map((answer, index) => {
          if (answer.content != "") {
            return {
              answer: answer.content,
              isQuestionAnswer: true,
            };
          }
        });
        break;
      case QuestionTypes.Select:
        if (!question.content.includes("<p></p>")) {
          toast("Câu hỏi thiếu cặp thẻ <p></p> ở vị trí điền khuyết", {type: 'warning'});
          return {};
        }
        if (values.answers.length == 0 || values.answers.length == 1) {
          toast("Câu hỏi điền dạng 1 phải có tối thiểu 2 đáp án", {type: 'warning'});
          return {};
        }
        question.answers = values.answers.map((answer, index) => {
          return {
            answer: answer.content,
            isQuestionAnswer: answer.isQuestionAnswer,
          };
        });
        break;
      case QuestionTypes.Toeic:
        question.toeic = values.toeic
        question.answers = values.answers.map((answer, index) => {
          return {
            answer: answer.content,
            isQuestionAnswer: answer.isQuestionAnswer,
          };
        });
        break;
      case QuestionTypes.Arrange:
        question.answers = [];
        break;
    }
    console.log(question);
    return question;
  }
  return (
    <div>
      <div id="wrapper">
        <SubMenu></SubMenu>
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <HeaderAdmin></HeaderAdmin>
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-10 col-md-10 col-10">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3">
                      <div className="d-flex justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">
                          Quản lý câu hỏi
                        </h6>
                        <button
                          className="btn btn-light rounded-btn"
                          onClick={() => setIsRefresh(true)}
                        >
                          <FaRedo></FaRedo>
                        </button>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <button
                          className="btn btn-word mt-1 h-50"
                          onClick={() => setModalCreate(!modalCreate)}
                        >
                          <i className="fa fa-plus"></i> Thêm câu hỏi
                        </button>

                        <Search queryFunction={querySearch}></Search>
                      </div>
                      <div className="table-responsive">
                        <Table striped bordered hover responsive>
                          <thead>
                            <tr>
                              <th className="dokhoquiz pointer-card">
                                Câu hỏi
                              </th>
                              <th className="table-image pointer-card">
                                Nội dung
                              </th>
                              <th className="tenbaiquiz pointer-card">
                                Loại câu hỏi
                              </th>
                              <th
                                className="dokhoquiz pointer-card"
                                onClick={() => sortByAnswerCount()}
                              >
                                Số đáp án{" "}
                                {sort.ascending ? (
                                  <FaSortAlphaDown></FaSortAlphaDown>
                                ) : (
                                  <FaSortAlphaUp></FaSortAlphaUp>
                                )}
                              </th>
                              <th className="table-function"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {questions.items.map((question, index) => (
                              <tr key={index}>
                                <td>{parse(question.preQuestion || "")}</td>
                                <td>{parse(question.content || "")}</td>
                                <td>{question.type}</td>
                                <td>{question.answers.length}</td>
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-success btn-delete mr-1"
                                    onClick={() => {
                                      setSelectQuestion(question);
                                      setModalPreview(!modalPreview);
                                    }}
                                  >
                                    <i className="fa fa-play-circle"></i>
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-primary mr-1"
                                  >
                                    <i className="fa fa-edit"></i>
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-danger btn-delete "
                                  >
                                    <i className="fa fa-trash"></i>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                        <Paginate
                          currentPage={questions.currentPage}
                          pageSize={questions.pageSize}
                          change={paginationChange}
                          totalPages={questions.totalPages}
                        ></Paginate>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-2 col-2">
                  <div className="card">
                    <div className="card-header">
                      <h6>Phân loại</h6>
                    </div>
                    <div className="card-body">
                      <form className="form-group">
                        <input
                          type="radio"
                          name="type"
                          value={QuestionTypes.Basic}
                          checked={filter.type == QuestionTypes.Basic}
                          onChange={(e) => typeChange(e)}
                        ></input>{" "}
                        <span className="mr-1">{QuestionTypes.Basic}</span>
                        <br></br>
                        <input
                          type="radio"
                          name="type"
                          value={QuestionTypes.Connection}
                          checked={filter.type == QuestionTypes.Connection}
                          onChange={(e) => typeChange(e)}
                        ></input>{" "}
                        <span className="mr-1">{QuestionTypes.Connection}</span>
                        <br></br>
                        <input
                          type="radio"
                          name="type"
                          value={QuestionTypes.Select}
                          checked={filter.type == QuestionTypes.Select}
                          onChange={(e) => typeChange(e)}
                        ></input>{" "}
                        <span className="mr-1">{QuestionTypes.Select}</span>
                        <br></br>
                        <input
                          type="radio"
                          name="type"
                          value={QuestionTypes.FillOut}
                          checked={filter.type == QuestionTypes.FillOut}
                          onChange={(e) => typeChange(e)}
                        ></input>{" "}
                        <span className="mr-1">{QuestionTypes.FillOut}</span>
                        <br></br>
                        <input
                          type="radio"
                          name="type"
                          value={QuestionTypes.Conversation}
                          checked={filter.type == QuestionTypes.Conversation}
                          onChange={(e) => typeChange(e)}
                        ></input>{" "}
                        <span className="mr-1">
                          {QuestionTypes.Conversation}
                        </span>
                        <br></br>
                        <input
                          type="radio"
                          name="type"
                          value={QuestionTypes.Toeic}
                          checked={filter.type == QuestionTypes.Toeic}
                          onChange={(e) => typeChange(e)}
                        ></input>{" "}
                        <span className="mr-1">{QuestionTypes.Toeic}</span>
                        <br></br>
                        <input
                          type="radio"
                          name="type"
                          value={QuestionTypes.Arrange}
                          checked={filter.type == QuestionTypes.Arrange}
                          onChange={(e) => typeChange(e)}
                        ></input>{" "}
                        <span className="mr-1">{QuestionTypes.Arrange}</span>
                        <br></br>
                      </form>
                    </div>
                  </div>
                  <br></br>
                  <div className="card">
                    <div className="card-header">
                      <h6>Thống kê</h6>
                    </div>
                    <div className="card-body">
                      <p>Chưa sử dụng: {analystic.free}</p>
                      <p>Sử dụng cho quiz: {analystic.quizUsing}</p>
                      <p>Sử dụng cho exam: {analystic.examUsing}</p>
                      <p>Sử dụng cho script: {analystic.scriptUsing}</p>
                      <p></p>
                    </div>
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
      {modalCreate && (
        <Modal
          show={modalCreate}
          animation
          backdrop="static"
          centered
          size="lg"
          dialogClassName="modal-90w question-create-modal"
        >
          <Modal.Body>
            <div
              id="content"
              style={{ overflowY: "auto", overflowX: "hidden" }}
              className="modal-background"
            >
              <main id="scroll">
                <div className="mt-2">
                  <div className="row">
                    <div className="offset-md-11 col-1">
                      <button
                        className="btn btn-light rounded-circle"
                        onClick={() => setModalCreate(!modalCreate)}
                      >
                        <i className="fa fa-remove"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </main>
              <div>
                <Formik
                  initialValues={initial}
                  onSubmit={(values, { resetForm }) => {
                    console.log(values);
                    submitCreate(values);
                  }}
                >
                  {({ values, setFieldValue, errors, touched, resetForm }) => (
                    <Form>
                      <QuestionCreate
                        values={values}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        touched={touched}
                      ></QuestionCreate>
                      <div className="fixed-bottom">
                        <button
                          type="button"
                          className="btn btn-secondary btn-delete rounded ml-1 mr-1"
                          onClick={(e) => {
                            e.preventDefault();
                            resetForm(initial);
                          }}
                        >
                          <FaRedo></FaRedo>
                        </button>
                        <button
                          className="btn btn-success btn-delete rounded ml-1 mr-1"
                          onClick={(e) => {
                            e.preventDefault();
                            setLivePreview(!livePrview);
                            setSelectQuestion(createPreview(values));
                          }}
                        >
                          <i className="fa fa-play-circle"></i>
                        </button>
                        <button
                          className="btn btn-primary btn-delete rounded"
                          type="submit"
                        >
                          <FaSave></FaSave>
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
      <div>
        {livePrview && Object.keys(selectQuestion).length > 0 && (
          <Modal
            show={livePrview}
            animation
            backdrop="static"
            size="lg"
            centered
          >
            <Modal.Body>
              <div
                id="content"
                style={{ overflowY: "auto", overflowX: "hidden" }}
                className="modal-background"
              >
                <main id="scroll">
                  <div className="mt-2">
                    <div className="row">
                      <div className="offset-md-11 col-1">
                        <button
                          className="btn btn-light rounded-circle"
                          onClick={() => setLivePreview(!livePrview)}
                        >
                          <i className="fa fa-remove"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <QuestionPreview
                      question={selectQuestion}
                    ></QuestionPreview>
                  </div>
                </main>
                <div></div>
              </div>
            </Modal.Body>
          </Modal>
        )}
        {Object.keys(selectQuestion).length > 0 && (
          <Modal
            animation
            size="lg"
            show={modalPreview}
            onHide={() => setModalPreview(!modalPreview)}
          >
            <Modal.Body>
              <div
                id="content"
                style={{ overflowY: "auto", overflowX: "hidden" }}
                className="modal-background"
              >
                <main id="scroll">
                  <div className="row">
                    <div className="offset-md-11 col-1">
                      <button
                        className="btn btn-light rounded-circle"
                        onClick={() => setModalPreview(!modalPreview)}
                      >
                        <i className="fa fa-remove"></i>
                      </button>
                    </div>
                  </div>
                  <div className="p-2">
                    <QuestionPreview
                      question={selectQuestion}
                    ></QuestionPreview>
                  </div>
                </main>
              </div>
            </Modal.Body>
          </Modal>
        )}
      </div>
    </div>
  );
};
export default ManagementQuestion;
