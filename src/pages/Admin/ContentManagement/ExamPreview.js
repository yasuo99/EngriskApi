import ReactPlayer from "react-player";
const ExamPreview = ({ exam, closeReview }) => {
    return (
        <div id="wrapper" style={{ height: '700px' }}>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content" style={{ overflow: "hidden", height: "100vh" }}>
                    <main id="scroll">
                        <div className="mt-2 p-2">
                            <div className="row">
                                <div className='col-3'>
                                    <p>Độ khó</p>
                                    <select
                                        className="pagination-select"
                                        name="display"
                                    >
                                        <option className='item' value={5}>Dễ</option>
                                        <option className='item' value={10}>Vừa</option>
                                        <option className='item' value={15}>Khó</option>
                                    </select>
                                </div>
                                <div className="offset-md-8 col-1">
                                    <button className="btn btn-light rounded-circle" onClick={() => closeReview()}>
                                        <i className="fa fa-remove"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="container learning-layout">
                            <div id="ketquaexam" className="container">
                                {exam.questions && exam.questions.map((question, index) =>
                                    <div key={question.id} className="ketquacauhoi">
                                        <div className="cauhoi">
                                            {question.isListeningQuestion && <ReactPlayer url={question.audio} controls width="500px" height="30px" />}
                                            Câu hỏi {index+1}: {question.content}
                                        </div>
                                        <div className="dapan">
                                            Đáp án:
                                            <ol type="A" className="ml-4">
                                                {question.answers.map((answer, index) =>
                                                    <li>{answer.answer}</li>
                                                )}
                                            </ol>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}
export default ExamPreview;