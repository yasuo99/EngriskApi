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
import { toast } from 'react-toastify';
import parse from 'html-react-parser'
const ExamCreate = ({ }) => {
  const [questions, setQuestions] = useState([]);
  const [exam, setExam] = useState({
    title: '',
    detail: '',
    difficult: 'Easy',
    duration: 10,
    passScore: 0,
    questions: [],
  });
  const [modalCreate, setModalCreate] = useState(false);
  const [selectQuestion, setSelectQuestion] = useState({});
  const [selectQuestions, setSelectQuestions] = useState([]);
  const [selectPart, setSelectPart] = useState(ToeicParts.Part1);
  const { tempQuestions, setTempQuestions } = useState([])
  const [toeicPartQuestion, setToeicPartQuestion] = useState({
    Part1: [],
    Part2: [],
    Part3: [],
    Part4: [],
    Part5: [],
    Part6: [],
    Part7: [],
  });
  const [availableToeicQuestion, setAvailableToeicQuestion] = useState({
    Part1: [],
    Part2: [],
    Part3: [],
    Part4: [],
    Part5: [],
    Part6: [],
    Part7: [],
  });
  const { examId } = useParams();
  const [questionModal, setQuestionModal] = useState(false);
  useEffect(() => {
    async function fetchQuestions() {
      if (examId) {
        const result = await examApiv2.get(examId);
        setExam(result);
        setToeicPartQuestion({
          ...toeicPartQuestion,
          Part1: result.questions.filter((q) => q.toeic == ToeicParts.Part1),
          Part2: result.questions.filter((q) => q.toeic == ToeicParts.Part2),
          Part3: result.questions.filter((q) => q.toeic == ToeicParts.Part3),
          Part4: result.questions.filter((q) => q.toeic == ToeicParts.Part4),
          Part5: result.questions.filter((q) => q.toeic == ToeicParts.Part5),
          Part6: result.questions.filter((q) => q.toeic == ToeicParts.Part6),
          Part7: result.questions.filter((q) => q.toeic == ToeicParts.Part7),
        });
        const data = await questionApiV2.getFilter(QuestionTypes.Toeic);
        setAvailableToeicQuestion({
          ...availableToeicQuestion,
          Part1: data.filter(
            (q) => result.questions.find(val => val.id == q.id) == undefined && q.toeic == ToeicParts.Part1
          ),
          Part2: data.filter(
            (q) => result.questions.find(val => val.id == q.id) == undefined && q.toeic == ToeicParts.Part2
          ),
          Part3: data.filter(
            (q) => result.questions.find(val => val.id == q.id) == undefined && q.toeic == ToeicParts.Part3
          ),
          Part4: data.filter(
            (q) => result.questions.find(val => val.id == q.id) == undefined && q.toeic == ToeicParts.Part4
          ),
          Part5: data.filter(
            (q) => result.questions.find(val => val.id == q.id) == undefined && q.toeic == ToeicParts.Part5
          ),
          Part6: data.filter(
            (q) => result.questions.find(val => val.id == q.id) == undefined && q.toeic == ToeicParts.Part6
          ),
          Part7: data.filter(
            (q) => result.questions.find(val => val.id == q.id) == undefined && q.toeic == ToeicParts.Part7
          ),
        });
      }
      else {
        console.log('clm');
        const data = await questionApiV2.getFilter(QuestionTypes.Toeic);
        setAvailableToeicQuestion({
          ...availableToeicQuestion,
          Part1: data.filter(
            (q) => q.toeic == ToeicParts.Part1
          ),
          Part2: data.filter(
            (q) => q.toeic == ToeicParts.Part2
          ),
          Part3: data.filter(
            (q) => q.toeic == ToeicParts.Part3
          ),
          Part4: data.filter(
            (q) => q.toeic == ToeicParts.Part4
          ),
          Part5: data.filter(
            (q) => q.toeic == ToeicParts.Part5
          ),
          Part6: data.filter(
            (q) => q.toeic == ToeicParts.Part6
          ),
          Part7: data.filter(
            (q) => q.toeic == ToeicParts.Part7
          ),
        });
      }
    }
    fetchQuestions();
  }, [examId]);
  useEffect(() => {
    renderAvailableQuestions();
  }, [selectPart, availableToeicQuestion]);
  useEffect(() => {
    setToeicPartQuestion({
      ...toeicPartQuestion,
      Part1: exam.questions.filter((q) => q.toeic == ToeicParts.Part1),
      Part2: exam.questions.filter((q) => q.toeic == ToeicParts.Part2),
      Part3: exam.questions.filter((q) => q.toeic == ToeicParts.Part3),
      Part4: exam.questions.filter((q) => q.toeic == ToeicParts.Part4),
      Part5: exam.questions.filter((q) => q.toeic == ToeicParts.Part5),
      Part6: exam.questions.filter((q) => q.toeic == ToeicParts.Part6),
      Part7: exam.questions.filter((q) => q.toeic == ToeicParts.Part7),
    });
  }, [exam.questions])
  function renderAvailableQuestions() {
    setQuestions(availableToeicQuestion[selectPart]);
  }
  function reRenderAvailableQuestions() {
    setAvailableToeicQuestion({
      ...availableToeicQuestion,
      [selectPart]: questions
    });
  }
  function submitAdd() {
    setExam({
      ...exam,
      questions: [...exam.questions, ...selectQuestions]
    })
    console.log(selectQuestions);
    setSelectQuestion({});
    setAvailableToeicQuestion({
      ...availableToeicQuestion,
      [selectPart]: questions.filter(q => !selectQuestions.includes(q))
    });
    // switch (selectPart) {
    //   case ToeicParts.Part1:
    //     setAvailableToeicQuestion({
    //       ...availableToeicQuestion,
    //       part1: questions.filter(q => !selectQuestions.includes(q))
    //     });
    //     break;
    //   case ToeicParts.Part2:
    //     setAvailableToeicQuestion({
    //       ...availableToeicQuestion,
    //       part2: questions.filter(q => !selectQuestions.includes(q))
    //     });
    //     break;
    //   case ToeicParts.Part3:
    //     setAvailableToeicQuestion({
    //       ...availableToeicQuestion,
    //       part3: questions.filter(q => !selectQuestions.includes(q))
    //     });
    //     break;
    //   case ToeicParts.Part4:
    //     setAvailableToeicQuestion({
    //       ...availableToeicQuestion,
    //       part4: questions.filter(q => !selectQuestions.includes(q))
    //     });
    //     break;
    //   case ToeicParts.Part5:
    //     setAvailableToeicQuestion({
    //       ...availableToeicQuestion,
    //       part5: questions.filter(q => !selectQuestions.includes(q))
    //     });
    //     break;
    //   case ToeicParts.Part6:
    //     setAvailableToeicQuestion({
    //       ...availableToeicQuestion,
    //       part6: questions.filter(q => !selectQuestions.includes(q))
    //     });
    //     break;
    //   case ToeicParts.Part7:
    //     setAvailableToeicQuestion({
    //       ...availableToeicQuestion,
    //       part7: questions.filter(q => !selectQuestions.includes(q))
    //     });
    //     break;
    // }
    setSelectQuestions([])
  }
  function removeQuestion(question) {
    setExam({
      ...exam,
      questions: [...exam.questions.filter(q => q != question)]
    })
    setQuestions([...questions, question]);
    setAvailableToeicQuestion({
      ...availableToeicQuestion,
      [selectPart]: [...questions, question]
    })
  }
  function search(query) {
    if (query != '') {
      setQuestions([...questions.filter(q => q.content.includes(query.trim()))])
    } else {
      renderAvailableQuestions();
    }
  }
  async function submit() {
    if (examId) {
      const result = await examApiv2.edit(exam.id, exam);
      if (result.status == 200) {
        toast('🤩🤩 Thành công', { type: 'success', autoClose: 2000 })
      } else {
        if (result.status == 204) {
          toast('😑😑 Không thay đổi', { type: 'info', autoClose: 2000 })
        } else {
          toast('😥😥 Thất bại', { type: 'error', autoClose: 2000 })
        }

      }
    }
    else {
      const result = await examApiv2.create(exam, true);
      if (result.status == 200) {
        toast('Thành công', { type: 'success' })
      } else {
        toast('Thất bại', { type: 'error' })
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
                <div className='info-nav '>
                  <div>
                    <Link to="/admin/quan-ly-exam">Trở lại</Link>
                  </div>
                  <form className="row p-2 card">

                    <div className='form-group'>
                      <h6 className="mt-2">Tiêu đề</h6>
                      <input
                        className="form-control"
                        value={exam.title}
                        type='text'
                        onChange={(e) =>
                          setExam({ ...exam, title: e.target.value })
                        }
                        required
                      ></input>
                    </div>
                    <div>
                      <h6 className="mt-2">Mô tả</h6>
                      <input
                        className="form-control"
                        value={exam.detail}
                        type='text'
                        onChange={(e) =>
                          setExam({ ...exam, detail: e.target.value })
                        }
                        required
                      ></input>
                    </div>
                    <div>
                      <h6 className="mt-2">Điểm đậu</h6>
                      <input
                        className="form-control"
                        value={exam.passScore}
                        type='number'
                        onChange={(e) =>
                          setExam({ ...exam, passScore: e.target.value })
                        }
                        required
                      ></input>
                    </div>
                    <div>
                      <h6 className="mt-2">Thời gian làm</h6>
                      <input
                        className="form-control"
                        value={exam.duration || 10}
                        min={10}
                        type='number'
                        onChange={(e) =>
                          setExam({ ...exam, duration: e.target.value })
                        }
                        required
                      ></input>
                    </div>
                    <div>
                      <h6 className="mt-2">Độ khó</h6>
                      <select className="pagination-select" onChange={(e) => setExam({ ...exam, difficult: e.target.value })}>
                        <option value={Difficult.Easy}>Dễ</option>
                        <option value={Difficult.Medium}>Vừa</option>
                        <option value={Difficult.Hard}>Khó</option>
                      </select>
                    </div>
                  </form>
                </div>

                <div className='rounded card p-1 mt-4'>
                  <div className='card-header'>
                    <div className="d-flex justify-content-between">
                      <h5>Các phần trong bài thi toeic</h5>
                      <button onClick={() => setModalCreate(!modalCreate)} className="btn rounded-pill btn-question-add font-weight-bold">Tạo câu hỏi</button>
                    </div>
                  </div>
                  <div className='card-body'>
                    <Tabs
                      defaultActiveKey={ToeicParts.Part1}
                      id="controlled-tab-example"
                      transition={false}
                    >
                      <Tab
                        eventKey={ToeicParts.Part1}
                        title="Part 1"
                        tabClassName="font-weight-bold"
                      >
                        <div className='script-panel'>

                          <div className="d-flex justify-content-between">
                            <p className='mt-1 p-1'>Phần part 1 trong bài thi toeic. Đối với 1 bài thi toeic tiêu chuẩn phần này sẽ có 6 câu hỏi</p>
                            <button
                              className="btn btn-light rounded-circle mr-1"
                              onClick={() => {
                                setQuestionModal(!questionModal);
                                setSelectPart(ToeicParts.Part1);
                              }}
                            >
                              <i className="fa fa-cog"></i>
                            </button>
                          </div>
                          <ListGroup className="border exam">
                            {toeicPartQuestion.Part1.map((question, index) => (
                              <ListGroup.Item
                                className={`p-1 ${index == 0 ? "" : "mt-1"
                                  } border cursor-pointer ${selectQuestion == question
                                    ? "bg-primary text-white"
                                    : ""
                                  }`}
                                key={index}
                              >
                                <div className="d-flex justify-content-between align-items-middle">
                                  <p
                                    onClick={() => setSelectQuestion(question)}
                                    className={`p-2 col-10 reading ${selectQuestion == question ? "text-white" : ""
                                      }`}
                                  >
                                    {parse(question.preQuestion || '')}
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
                      </Tab>
                      <Tab
                        eventKey={ToeicParts.Part2}
                        title="Part 2"
                        tabClassName="font-weight-bold"
                      >
                        <div className='script-panel'>
                          <div className="d-flex justify-content-between">
                            <p className='mt-1 p-1'>Phần part 2 trong bài thi toeic. Đối với 1 bài thi toeic tiêu chuẩn phần này sẽ có 25 câu hỏi</p>
                            <button
                              className="btn btn-light rounded-circle mr-1"
                              onClick={() => {
                                setQuestionModal(!questionModal);
                                setSelectPart(ToeicParts.Part2);
                              }}
                            >
                              <i className="fa fa-cog"></i>
                            </button>
                          </div>
                          <ListGroup className="border exam">
                            {toeicPartQuestion.Part2.map((question, index) => (
                              <ListGroup.Item
                                className={`p-1 ${index == 0 ? "" : "mt-1"
                                  } border cursor-pointer ${selectQuestion == question
                                    ? "bg-primary text-white"
                                    : ""
                                  }`}
                                key={index}
                              >
                                <div className="d-flex justify-content-between align-items-middle">
                                  <p
                                    onClick={() => setSelectQuestion(question)}
                                    className={`p-2 ${selectQuestion == question ? "text-white" : ""
                                      }`}
                                  >
                                    {parse(question.preQuestion || 'Chọn đáp án đúng')}
                                    {parse(question.content || '')}
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
                      </Tab>
                      <Tab
                        eventKey={ToeicParts.Part3}
                        title="Part 3"
                        tabClassName="font-weight-bold"
                      >
                        <div className='script-panel'>
                          <div className="d-flex justify-content-between">
                            <p className='mt-1 p-1'>Phần part 3 trong bài thi toeic. Đối với 1 bài thi toeic tiêu chuẩn phần này sẽ có 39 câu hỏi</p>
                            <button
                              className="btn btn-light rounded-circle mr-1"
                              onClick={() => {
                                setQuestionModal(!questionModal);
                                setSelectPart(ToeicParts.Part3);
                              }}
                            >
                              <i className="fa fa-cog"></i>
                            </button>
                          </div>
                          <ListGroup className="border exam">
                            {toeicPartQuestion.Part3.map((question, index) => (
                              <ListGroup.Item
                                className={`p-1 ${index == 0 ? "" : "mt-1"
                                  } border cursor-pointer ${selectQuestion == question
                                    ? "bg-primary text-white"
                                    : ""
                                  }`}
                                key={index}
                              >
                                <div className="d-flex justify-content-between align-items-middle">
                                  <p
                                    onClick={() => setSelectQuestion(question)}
                                    className={`p-2 ${selectQuestion == question ? "text-white" : ""
                                      }`}
                                  >
                                    {parse(question.preQuestion || 'Chọn đáp án đúng')}
                                    {parse(question.content || '')}
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
                      </Tab>
                      <Tab
                        eventKey={ToeicParts.Part4}
                        title="Part 4"
                        tabClassName="font-weight-bold"
                      >
                        <div className='script-panel'>
                          <div className="d-flex justify-content-between">
                            <p className='mt-1 p-1'>Phần part 4 trong bài thi toeic. Đối với 1 bài thi toeic tiêu chuẩn phần này sẽ có 30 câu hỏi</p>
                            <button
                              className="btn btn-light rounded-circle mr-1"
                              onClick={() => {
                                setQuestionModal(!questionModal);
                                setSelectPart(ToeicParts.Part4);
                              }}
                            >
                              <i className="fa fa-cog"></i>
                            </button>
                          </div>
                          <ListGroup className="border exam">
                            {toeicPartQuestion.Part4.map((question, index) => (
                              <ListGroup.Item
                                className={`p-1 ${index == 0 ? "" : "mt-1"
                                  } border cursor-pointer ${selectQuestion == question
                                    ? "bg-primary text-white"
                                    : ""
                                  }`}
                                key={index}
                              >
                                <div className="d-flex justify-content-between align-items-middle">
                                  <p
                                    onClick={() => setSelectQuestion(question)}
                                    className={`p-2 ${selectQuestion == question ? "text-white" : ""
                                      }`}
                                  >
                                    {parse(question.preQuestion || 'Chọn đáp án đúng')}
                                    {parse(question.content || '')}
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
                      </Tab>
                      <Tab
                        eventKey={ToeicParts.Part5}
                        title="Part 5"
                        tabClassName="font-weight-bold"
                      >
                        <div className='script-panel'>
                          <div className="d-flex justify-content-between">
                            <p className='mt-1 p-1'>Phần part 5 trong bài thi toeic. Đối với 1 bài thi toeic tiêu chuẩn phần này sẽ có 30 câu hỏi</p>
                            <button
                              className="btn btn-light rounded-circle mr-1"
                              onClick={() => {
                                setQuestionModal(!questionModal);
                                setSelectPart(ToeicParts.Part5);
                              }}
                            >
                              <i className="fa fa-cog"></i>
                            </button>
                          </div>
                          <ListGroup className="border exam">
                            {toeicPartQuestion.Part5.map((question, index) => (
                              <ListGroup.Item
                                className={`p-1 ${index == 0 ? "" : "mt-1"
                                  } border cursor-pointer ${selectQuestion == question
                                    ? "bg-primary text-white"
                                    : ""
                                  }`}
                                key={index}
                              >
                                <div className="d-flex justify-content-between align-items-middle">
                                  <p
                                    onClick={() => setSelectQuestion(question)}
                                    className={`p-2 ${selectQuestion == question ? "text-white" : ""
                                      }`}
                                  >
                                    {parse(question.preQuestion || 'Chọn đáp án đúng')}
                                    {parse(question.content || '')}
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
                      </Tab>
                      <Tab
                        eventKey={ToeicParts.Part6}
                        title="Part 6"
                        tabClassName="font-weight-bold"
                      >
                        <div className='script-panel'>
                          <div className="d-flex justify-content-between">
                            <p className='mt-1 p-1'>Phần part 6 trong bài thi toeic. Đối với 1 bài thi toeic tiêu chuẩn phần này sẽ có 16 câu hỏi</p>
                            <button
                              className="btn btn-light rounded-circle mr-1"
                              onClick={() => {
                                setQuestionModal(!questionModal);
                                setSelectPart(ToeicParts.Part6);
                              }}
                            >
                              <i className="fa fa-cog"></i>
                            </button>
                          </div>
                          <ListGroup className="border exam">
                            {toeicPartQuestion.Part6.map((question, index) => (
                              <ListGroup.Item
                                className={`p-1 ${index == 0 ? "" : "mt-1"
                                  } border cursor-pointer ${selectQuestion == question
                                    ? "bg-primary text-white"
                                    : ""
                                  }`}
                                key={index}
                              >
                                <div className="d-flex justify-content-between align-items-middle">
                                  <p
                                    onClick={() => setSelectQuestion(question)}
                                    className={`p-2 ${selectQuestion == question ? "text-white" : ""
                                      }`}
                                  >
                                    {parse(question.preQuestion || 'Chọn đáp án đúng')}
                                    {parse(question.content || '')}
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
                      </Tab>
                      <Tab
                        eventKey={ToeicParts.Part7}
                        title="Part 7"
                        tabClassName="font-weight-bold"
                      >
                        <div className='script-panel'>
                          <div className="d-flex justify-content-between">
                            <p className='mt-1 p-1'>Phần part 7 trong bài thi toeic. Đối với 1 bài thi toeic tiêu chuẩn phần này sẽ có 29 câu hỏi</p>
                            <button
                              className="btn btn-light rounded-circle mr-1"
                              onClick={() => {
                                setQuestionModal(!questionModal);
                                setSelectPart(ToeicParts.Part7);
                              }}
                            >
                              <i className="fa fa-cog"></i>
                            </button>
                          </div>
                          <ListGroup className="border exam">
                            {toeicPartQuestion.Part7.map((question, index) => (
                              <ListGroup.Item
                                className={`p-1 ${index == 0 ? "" : "mt-1"
                                  } border cursor-pointer ${selectQuestion == question
                                    ? "bg-primary text-white"
                                    : ""
                                  }`}
                                key={index}
                              >
                                <div className="d-flex justify-content-between align-items-middle">
                                  <p
                                    onClick={() => setSelectQuestion(question)}
                                    className={`p-2 ${selectQuestion == question ? "text-white" : ""
                                      }`}
                                  >
                                    {parse(question.preQuestion || 'Chọn đáp án đúng')}
                                    {parse(question.content || '')}
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
                      </Tab>
                    </Tabs>
                  </div>
                </div>
                <br></br>
                <div className="form-group d-flex justify-content-end">
                  <Link className="btn btn-secondary rounded mr-1" to="/admin/quan-ly-quiz-exam">
                    Trở lại
                  </Link>
                  <button className="btn btn-primary rounded" onClick={() => submit()}>Lưu lại</button>
                </div>
              </div>
              <Modal
                show={questionModal}
                onHide={() => setQuestionModal(!questionModal)}
                animation
                size="lg"
                dialogClassName="modal-full-screen"
              >
                <Modal.Body className='modal-background'>
                  <h5>Danh sách câu hỏi khả dụng</h5>
                  <h6>Chọn một hoặc nhiều để thêm vào bài kiểm tra</h6>
                  <br></br>
                  <Search queryFunction={search} placeholder="Tìm kiếm theo câu hỏi và nội dung câu hỏi..."></Search>
                  <div className="row">
                    <div className="col-6">
                      <ListGroup className="border p-2 script-panel exam" style={{ overflowY: 'auto' }}>
                        {questions.map((question, index) => (
                          <ListGroup.Item
                            className={`p-1 ${index == 0 ? "" : "mt-2"
                              } border cursor-pointer ${selectQuestion == question
                                ? "bg-primary text-white"
                                : ""
                              }`}
                            key={index}
                          >
                            <div className="d-flex justify-content-between align-items-center">
                              <p

                                className={`col-11 p-2 ${selectQuestion == question ? "text-white" : ""
                                  }`}
                                onClick={() => setSelectQuestion(question)}
                              >
                                {parse(question.preQuestion || 'Chọn đáp án đúng')}
                                {parse(question.content || '')}
                              </p>
                              <input
                                id={`select${index}`}
                                className="form-check-input p-1"
                                type="checkbox"
                                checked={selectQuestions.includes(question)}
                                onChange={(e) => {
                                  if (e.currentTarget.checked) {
                                    setSelectQuestions([...selectQuestions, question])
                                  }
                                  else {
                                    setSelectQuestions([...selectQuestions.filter(q => q != question)])
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
                  <Button variant="primary" onClick={() => { submitAdd() }}>Lưu lại</Button>
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
                      <button className="" onClick={() => setModalCreate(!modalCreate)}>
                        <i className="fa fa-2x fa-times"></i>
                      </button>
                    </div>
                    <h3 className="text-dark">Chọn loại câu hỏi</h3>
                    <ul className="list-group list-group-flush question-categories-wrapper">
                      <li className="block-item list-group-item align-self-center">
                        <Link
                          to={{
                            pathname: "cau-hoi/toeic",
                            state: { fromDashboard: true },
                          }}
                        >
                          <svg
                            height="48px"
                            viewBox="0 -41 512 512"
                            width="48px"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="m297.242188 163.25c-8.285157 0-15-6.714844-15-15v-148.25h-52.484376v148.25c0 8.285156-6.714843 15-15 15h-214.757812v52.484375h214.757812c8.285157 0 15 6.714844 15 15v148.210937h52.484376v-148.210937c0-8.285156 6.714843-15 15-15h214.757812v-52.484375zm0 0" />
                            <path d="m312.242188 112.039062 110.8125-110.8125c-5.234376-.808593-10.597657-1.226562-16.054688-1.226562h-94.757812zm0 0" />
                            <path d="m333.453125 133.25h178.546875v-28.25c0-40.59375-23.15625-75.875-56.949219-93.34375zm0 0" />
                            <path d="m333.394531 245.734375 121.320313 121.730469c33.976562-17.40625 57.285156-52.792969 57.285156-93.519532v-28.210937zm0 0" />
                            <path d="m199.757812 112.039062v-112.039062h-94.757812c-5.457031 0-10.820312.417969-16.054688 1.226562zm0 0" />
                            <path d="m312.242188 267.007812v111.9375h94.757812c5.316406 0 10.539062-.398437 15.640625-1.164062zm0 0" />
                            <path d="m178.546875 133.25-121.597656-121.59375c-33.792969 17.464844-56.949219 52.75-56.949219 93.34375v28.25zm0 0" />
                            <path d="m178.546875 245.734375h-178.546875v28.210937c0 40.605469 23.167969 75.894532 56.976562 93.359376zm0 0" />
                            <path d="m199.757812 266.949219-110.777343 110.777343c5.222656.800782 10.574219 1.21875 16.019531 1.21875h15.582031l36.519531 46.332032c2.847657 3.609375 7.1875 5.714844 11.78125 5.714844s8.9375-2.105469 11.78125-5.714844l19.09375-24.222656zm0 0" />
                          </svg>
                          <br></br>
                          Toeic
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
export default ExamCreate;
