import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Field, ErrorMessage, FieldArray } from "formik";
const SelectQuestionCreate = ({ values, setFieldValue, checkAnswer }) => {
  return (
    <div>
      <div className="container border card p-2 shadow-sm">
        <div className="question">
          <div className="boxQuestion">
            <div className="border card shadow rounded p-2 mt-1">
              <h6>Câu hỏi (*)</h6>
              <CKEditor
                config={{
                  ckfinder: {
                    // Upload the images to the server using the CKFinder QuickUpload command
                    // You have to change this address to your server that has the ckfinder php connector
                    toolbar: [
                      {
                        name: "document",
                        items: [
                          "Source",
                          "-",
                          "NewPage",
                          "Preview",
                          "-",
                          "Templates",
                        ],
                      }, // Defines toolbar group with name (used to create voice label) and items in 3 subgroups.
                      [
                        "Cut",
                        "Copy",
                        "Paste",
                        "PasteText",
                        "PasteFromWord",
                        "-",
                        "Undo",
                        "Redo",
                      ], // Defines toolbar group without name.
                      "/", // Line break - next group will be placed in new line.
                      { name: "basicstyles", items: ["Bold", "Italic"] },
                    ],
                  },
                  placeholder:
                    "Nhập câu hỏi ví dụ: Điền vào chỗ trống/ Chọn đáp án đúng...",
                }}
                editor={ClassicEditor}
                data={values.preQuestion || ""}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setFieldValue("preQuestion", data);
                }}
                event={(editor) => {
                  editor.on("fileUploadResponse", (data) => {
                    console.log(data);
                  });
                }}
                onUpload={(event, edito) => {
                  console.log(event);
                }}
              />
            </div>
            <div className="border card shadow rounded p-2 mt-2">
              <h6>Nội dung * <small className="text-info">(Sử dụng cặp {`<p></p>`} để chọn ví trí ẩn vd: {`<p></p>. How are you?`})</small></h6>
              <Field
                type="text"
                name="content"
                className="form-control"
                autoComplete="off"
              ></Field>
            </div>
          </div>
          <div className="border card shadow rounded p-2 mt-2 mb-3">
            <h6>
              Đáp án *{" "}
              <small className="text-info">(Tối thiểu 2 đáp án)</small>
            </h6>
            <div className="answer answerText">
              <ol type="A">
                <FieldArray name="answers">
                  {({ insert, remove, push }) => (
                    <div>
                      {values.answers.length > 0 &&
                        values.answers.map((answer, index) => (
                          <div
                            className="d-flex justify-content-center mt-1"
                            key={index}
                          >
                            <div className="itemAnswer answer-card shadow-sm border">
                              <div className="row">
                                <div className="col-1 d-flex justify-content-center">
                                  <p className="textOrder font-weight-bold">
                                    <li></li>
                                  </p>
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
                                    onClick={(e) => checkAnswer(e, values)}
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
                                  >
                                    <img src="/image/cross.png"></img>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      <div className="d-flex justify-content-center">
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill mt-2"
                          onClick={() =>
                            push({
                              content: "",
                              isQuestionAnswer: false,
                              image: null,
                              isAudioAnswer: false,
                            })
                          }
                        >
                          Thêm đáp án <i className="fa fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  )}
                </FieldArray>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SelectQuestionCreate;
