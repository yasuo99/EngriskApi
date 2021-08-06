import { Field, ErrorMessage, FieldArray } from "formik";
import React, { useEffect, useRef, useState } from "react";
import ThumbAudio from "./ThumbAudio";
import ThumbImage from "./ThumbImage";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ToeicParts } from "../../constants/ToeicParts";
import ImageUpload from "image-upload-react";
//important for getting nice style.
import "image-upload-react/dist/index.css";
const part1 = [
  { content: "A", isQuestionAnswer: true },
  { content: "B", isQuestionAnswer: false },
  { content: "C", isQuestionAnswer: false },
  { content: "D", isQuestionAnswer: false },
];
const part2 = [
  { content: "A", isQuestionAnswer: true },
  { content: "B", isQuestionAnswer: false },
  { content: "C", isQuestionAnswer: false },
];
const ToeicQuestionCreate = ({ values, setFieldValue, checkAnswer }) => {
  const [toeic, setToeic] = useState(values.toeic || 1);
  const [imageSrc, setImageSrc] = useState();
  const handleImageSelect = (e) => {
    console.log(e);
    values.file = e.target.files[0];
    setImageSrc(URL.createObjectURL(e.target.files[0]));
  };
  useEffect(() => {
    if (values.file == "" && values.audio == "") {
      values.toeic = toeic;
      setImageSrc("");
      audioFileRef.current.value = "";
    }
  }, [values.file, values.audio]);
  useEffect(() => {
    values.toeic = toeic;
  }, [values]);
  // useEffect(() => {
  //   if(values.toeic == 2){
  //     values.answers = part1
  //   }
  //   if(values.toeic == 1){
  //     values.answers = part2
  //   }
  // },[toeic])
  const audioFileRef = useRef();
  return (
    <div className="container card shadow-sm p-2">
      <div className="question text-dark mt-2">
        Thuộc part
        <select
          value={toeic}
          onChange={(e) => {
            values.toeic = Number.parseInt(e.target.value);
            setToeic(e.target.value);
          }}
          className="ml-1 pagination-select"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
        </select>
        <div className="border card shadow rounded p-2 mt-2">
          <h6>Câu hỏi *</h6>
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
          <h6>Nội dung </h6>
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
                      "Save",
                      "NewPage",
                      "DocProps",
                      "Preview",
                      "Print",
                      "-",
                      "Templates",
                    ],
                  },
                  {
                    name: "clipboard",
                    items: [
                      "Cut",
                      "Copy",
                      "Paste",
                      "PasteText",
                      "PasteFromWord",
                      "-",
                      "Undo",
                      "Redo",
                    ],
                  },
                  {
                    name: "editing",
                    items: [
                      "Find",
                      "Replace",
                      "-",
                      "SelectAll",
                      "-",
                      "SpellChecker",
                      "Scayt",
                    ],
                  },
                  {
                    name: "forms",
                    items: [
                      "Form",
                      "Checkbox",
                      "Radio",
                      "TextField",
                      "Textarea",
                      "Select",
                      "Button",
                      "ImageButton",
                      "HiddenField",
                    ],
                  },
                  "/",
                  {
                    name: "basicstyles",
                    items: [
                      "Bold",
                      "Italic",
                      "Underline",
                      "Strike",
                      "Subscript",
                      "Superscript",
                      "-",
                      "RemoveFormat",
                    ],
                  },
                  {
                    name: "paragraph",
                    items: [
                      "NumberedList",
                      "BulletedList",
                      "-",
                      "Outdent",
                      "Indent",
                      "-",
                      "Blockquote",
                      "CreateDiv",
                      "-",
                      "JustifyLeft",
                      "JustifyCenter",
                      "JustifyRight",
                      "JustifyBlock",
                      "-",
                      "BidiLtr",
                      "BidiRtl",
                    ],
                  },
                  { name: "links", items: ["Link", "Unlink", "Anchor"] },
                  {
                    name: "insert",
                    items: [
                      "Image",
                      "Flash",
                      "Table",
                      "HorizontalRule",
                      "Smiley",
                      "SpecialChar",
                      "PageBreak",
                      "Iframe",
                    ],
                  },
                  "/",
                  {
                    name: "styles",
                    items: ["Styles", "Format", "Font", "FontSize"],
                  },
                  { name: "colors", items: ["TextColor", "BGColor"] },
                  {
                    name: "tools",
                    items: ["Maximize", "ShowBlocks", "-", "About"],
                  },
                ],
              },
              placeholder: "Nhập nội dung của câu hỏi ví dụ: We are Engrisk...",
            }}
            editor={ClassicEditor}
            data={values.content || ""}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setFieldValue("content", data);
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
        {(toeic < 5 || toeic == 7) && (
          <div className="border card shadow rounded p-2 mt-2">
            <h6>File</h6>
            <div className="row p-2">
              <div className="col-6">
                <p>File ảnh (800 X 400)</p>
                <ImageUpload
                  handleImageSelect={handleImageSelect}
                  imageSrc={imageSrc}
                  setImageSrc={setImageSrc}
                  style={{
                    width: 300,
                    height: 200,
                    marginTop: 0,
                  }}
                />
              </div>
              {toeic < 5 && (
                <div className="col">
                  <p>File audio</p>
                  <div className="form-group">
                    <div className="input-group mb-3">
                      <input
                        ref={audioFileRef}
                        type="file"
                        name=""
                        id="audio"
                        accept="audio/*"
                        className="form-control"
                        placeholder="Chọn file nghe"
                        onChange={(event) => {
                          setFieldValue("audio", event.currentTarget.files[0]);
                        }}
                      />
                      <div className="input-group-append">
                        <img
                          src="/image/delete1.png"
                          className="img-question"
                          style={{ width: "44px" }}
                          onClick={() => {
                            setFieldValue("audio", null);
                            audioFileRef.current.value = "";
                          }}
                        ></img>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {/* <img src="/image/picture (1).png" alt="img-question" class="img-question"> */}
        <div className="answer answerText border card shadow rounded p-2 mt-2 mb-3">
          <h6>Đáp án (*)</h6>
          <ol type="A">
            <FieldArray name="answers">
              {({ insert, remove, push }) => (
                <div>
                  {values.answers.length > 0 &&
                    values.answers.map((answer, index) => {
                      return (
                        <div
                          className="d-flex justify-content-center mt-1"
                          key={index}
                        >
                          <div className="itemAnswer answer-card shadow border">
                            <div className="row">
                              <div className="col-1 d-flex justify-content-center">
                                <li className="textOrder font-weight-bold"></li>
                              </div>
                              <div className="col-9">
                                <Field
                                  name={`answers.${index}.content`}
                                  placeholder="Nhập đáp án..."
                                  type="text"
                                  className={"answerFile w-100"}
                                  id={`content${index}`}
                                  required
                                  autoComplete="off"
                                />

                                <ErrorMessage
                                  name={`answers.${index}.required`}
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
                      );
                    })}
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
  );
};
export default ToeicQuestionCreate;
