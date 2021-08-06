import { useEffect, useRef, useState } from "react";
import { Field, ErrorMessage, FieldArray } from "formik";
import { Modal } from "react-bootstrap";
import ConversationQuestion from "../question/ConversationQuestion";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const ConversationQuestionCreate = ({ values, setFieldValue }) => {
  const [firstLines, setFirstLines] = useState([]);
  const [secondLines, setSecondLines] = useState([]);
  const [modalDemo, setModalDemo] = useState(false);
  const [firstUser, setFirstUser] = useState("");
  const [secondUser, setSecondUser] = useState("");
  const audioFileRef = useRef();
  useEffect(() => {
    audioFileRef.current.value = "";
  },[values])
  const demoQuestion = {
    content: "",
    preQuestion: "",
    answers: [
      {
        answer: JSON.stringify({
          firstLine: "I <p>am</p> Thanh (0)",
          secondLine: "We <p>are</p> Engrisk (1)",
        }),
      },
    ],
  };
  function addFirstLine(value, index) {}
  function addSecondLine(value, index) {
    console.log(value);
  }
  return (
    <div className="container card shadow-sm p-2">
      <div className="d-flex justify-content-end">
        <button
          onClick={(e) => {
            e.preventDefault();
            setModalDemo(!modalDemo);
          }}
        >
          <i className="fa fa-question"></i>
        </button>
      </div>
      <Modal
        animation={true}
        show={modalDemo}
        onHide={() => setModalDemo(!modalDemo)}
        size="lg"
      >
        <Modal.Body>
          <div>
            <h5>Hướng dẫn:</h5>{" "}
            <p>
              {" "}
              Sử dụng cặp thẻ {`<p></p>`} để chọn phần dữ liệu điền khuyết
              <br></br>
              Ví dụ: {`I <p>am</p> Thanh`} <br></br> {`We <p>are</p> Engrisk`}
            </p>
            Phần hiển thị sẽ là:{" "}
            <ConversationQuestion
              isReviewing={true}
              question={demoQuestion}
            ></ConversationQuestion>
          </div>
        </Modal.Body>
      </Modal>
      <div className="border card shadow rounded p-2">
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
        <h6>File * (audio)</h6>
        <div className="form-group">
          <div class="input-group mb-3">
            <input
              ref={audioFileRef}
              type="file"
              name=""
              id=""
              accept="audio/*"
              className="form-control"
              onChange={(event) => {
                setFieldValue("audio", event.currentTarget.files[0]);
              }}
            />
            <div class="input-group-append">
              <img
                src="/image/delete1.png"
                className="img-question"
                onClick={() => {
                  setFieldValue("audio", null);
                  audioFileRef.current.value = "";
                }}
                style={{ width: "44px" }}
              ></img>
            </div>
          </div>
        </div>
      </div>
      <div className="border card shadow rounded p-2 mt-2 mb-3 conversation">
        <h6>Thoại *</h6>
        <FieldArray name="answers">
          {({ insert, remove, push }) => (
            <div>
              <div className="d-flex justify-content-between">
                <Field
                  placeholder="Tên người A"
                  className="form-control input-conversation"
                  name="firstUser"
                  autoComplete="off"
                ></Field>
                <Field
                  placeholder="Tên người B"
                  className="form-control input-conversation"
                  name="secondUser"
                  autoComplete="off"
                ></Field>
              </div>

              {values.answers.map((answer, index) => (
                <div key={index} className="mt-4 border rounded p-2">
                  <div className="d-flex justify-content-start">
                    <img
                      src="https://www.w3schools.com/howto/img_avatar.png"
                      className="chat-avatar mr-1"
                    ></img>

                    <Field
                      type="text"
                      placeholder="Câu thoại..."
                      className="form-control input-conversation"
                      name={`answers.${index}.firstLine`}
                      id="scriptFirst"
                      autoComplete="off"
                    ></Field>
                  </div>
                  <div className="d-flex justify-content-end">
                    <Field
                      className="form-control input-conversation"
                      placeholder="Câu thoại..."
                      name={`answers.${index}.secondLine`}
                      id="scriptSecond"
                      autoComplete="off"
                    ></Field>

                    <img
                      src="https://www.w3schools.com/howto/img_avatar.png"
                      className="chat-avatar ml-1"
                    ></img>
                  </div>
                  <div className="d-flex justify-content-center mb-1">
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
              ))}
              <div className="d-flex justify-content-center">
                <button
                  type="button"
                  className="btn btn-primary rounded-pill mt-2"
                  onClick={() =>
                    push({
                      content: "",
                      firstLine: "",
                      secondLine: "",
                      isQuestionAnswer: true,
                      isAudioAnswer: false,
                      image: null,
                    })
                  }
                >
                  Thêm câu thoại <i className="fa fa-plus"></i>
                </button>
              </div>
            </div>
          )}
        </FieldArray>
      </div>
    </div>
  );
};
export default ConversationQuestionCreate;
