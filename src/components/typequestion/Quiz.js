import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray, FormikProvider } from 'formik';
const question = {
    answers: [
        {
            content: '',
            isQuestionAnswer: false,
        },
    ],
    content: '',
    type: '',
    isAudioQuestion: false,
};
class Quiz extends Component {
    handleResetAnswer = (e) => {
        this.setState({
            srcAnswer: '',
        })
    }
    render() {
        return (
            <div id="wrapper">
                <div id="quiz">
                    <section className="main">
                        <Formik
                            initialValues={question}

                            onSubmit={(values, { resetForm }) => {
                                console.log(values);
                                const result = this.addQuestion(values);
                                // await new Promise((r) => setTimeout(r, 500));
                                if (result) {
                                    resetForm({});
                                    this.resetQuestionForm();
                                }
                            }}
                        >
                            {({ values, setFieldValue, resetForm }) => (
                                <Form>
                                    <div className="question">
                                        <div className="boxQuestion">
                                            <Field
                                                className="titleQuestion"
                                                placeholder="Nhập câu hỏi..."
                                                type="text"
                                                id="content"
                                                name="content"
                                                component="textarea"
                                                required
                                            />
                                            {/* <img src="/image/picture (1).png" alt="img-question" class="img-question"> */}
                                            <p>Là câu hỏi nghe:
                    <Field
                                                    type="checkbox"
                                                    className="file mt-3"
                                                    id="isAudioQuestion"
                                                    name="isAudioQuestion" />
                                            </p>
                                            <div className="answer answerText">
                                                <ol type="A">
                                                    <FieldArray name="answers">
                                                        {({ insert, remove, push }) => (
                                                            <div>
                                                                {values.answers.length > 0 &&
                                                                    values.answers.map((answer, index) => (
                                                                        <div className="itemAnswer" key={index}>
                                                                            <div className="row" >
                                                                                <div className="col-1">
                                                                                    <p className="textOrder"><li></li></p>

                                                                                </div>
                                                                                <div className="col-9">
                                                                                    <Field
                                                                                        name={`answers.${index}.content`}
                                                                                        placeholder="Nhập đáp án..."
                                                                                        type="text"
                                                                                        className="answerFile"
                                                                                        id="content"
                                                                                        required
                                                                                    />
                                                                                    <ErrorMessage
                                                                                        name={`answers.${index}.name`}
                                                                                        component="div"
                                                                                        className="field-error"
                                                                                    />
                                                                                </div>
                                                                                <div className="col-1">

                                                                                    <Field
                                                                                        name={`answers.${index}.isQuestionAnswer`}
                                                                                        className="radioAnswerFile"
                                                                                        type="checkbox"
                                                                                        id="isQuestionAnswer"
                                                                                        data-id={index}
                                                                                        onClick={(e) => this.checkAnswer(e, values)}
                                                                                    />
                                                                                    <ErrorMessage
                                                                                        name={`answers.${index}.name`}
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
                                                                    className="btn btn-addAnswer fa fa-plus"
                                                                    onClick={() => push({
                                                                        content: '', isQuestionAnswer: false, image: null,
                                                                        isAudioAnswer: false
                                                                    })}>
                                                                    Thêm đáp án
      </button>
                                                            </div>
                                                        )}
                                                    </FieldArray>
                                                </ol>
                                            </div>
                                        </div>
                                    </div>
                                </Form>)}
                        </Formik>
                    </section>
                </div>
            </div>
        )
    }
} export default Quiz;