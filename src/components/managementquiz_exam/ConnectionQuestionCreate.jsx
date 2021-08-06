import { Field, ErrorMessage, FieldArray } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const ConnectionQuestionCreate = ({ values, setFieldValue }) => {
  return (
    <div className="container card p-2 shadow-sm">
      <div className="question">
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
              // setFieldValue("preQuestion", data);
              values.preQuestion = data;
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
        <div className="answerSort mt-1">
          <div className="answer answerText border card shadow mb-3 rounded p-2 mt-2">
            <h6>Đáp án (*)</h6>
            <ol type="1">
              <FieldArray name="answers">
                {({ insert, remove, push }) => (
                  <div className="container">
                    {values.answers.length > 0 &&
                      values.answers.map((answer, index) => (
                        <div
                          className="d-flex shadow justify-content-center mt-2 card"
                          key={index}
                        >
                          <div class="input-group border-top-0 connection">
                            <Field
                              name={`answers.${index}.contentLeft`}
                              placeholder="Cột trái..."
                              type="text"
                              className="form-control"
                              id="textAnswerLeft"
                              autoComplete="off"
                              required
                            />
                            <span class="input-group-addon">-</span>
                            <Field
                              name={`answers.${index}.contentRight`}
                              placeholder="Cột phải..."
                              type="text"
                              className="form-control"
                              id="textAnswerRight"
                              autoComplete="off"
                              required
                            />
                            <div class="input-group-append mr-1">
                              <button
                                type="button"
                                className="secondary mr-2"
                                onClick={() => remove(index)}
                                className="exit"
                              >
                                <img src="/image/cross.png"></img>
                              </button>
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
                            isQuestionAnswer: "",
                            contentRight: "",
                            contentLeft: "",
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
        {/* <button class="btn btn-addAnswer"><img src="/image/plus (3).png"> Thêm đáp án</button> */}
      </div>
    </div>
  );
};
export default ConnectionQuestionCreate;
