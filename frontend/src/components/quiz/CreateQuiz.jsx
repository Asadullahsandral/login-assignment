import React, { useState } from "react";

function CreateQuiz() {
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [answer, setAnswer] = useState("");
  const handleClose = () => {
    // Add your logic to close the modal or return to the previous page
    // Example: navigate(-1)
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "question") {
      setQuestion(value);
    } else if (name === "option1") {
      setOption1(value);
    } else if (name === "option2") {
      setOption2(value);
    } else if (name === "option3") {
      setOption3(value);
    } else if (name === "option4") {
      setOption4(value);
    } else if (name === "answer") {
      setAnswer(value);
    }
  };
  const handleReset = () => {
    setQuestion("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setAnswer("");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your logic to save the quiz question, options, and answer to the database
    // Example: fetch("/api/quizzes", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    //   body: JSON.stringify({
    //     question,
    //     options: [option1, option2, option3, option4],
    //     answer,
    //   }),
    // });
    handleClose();
  };
  // const handleSubmit = (event) => {
  // event.preventDefault();
  // Add your logic to save the quiz question, options, and answer to the database
  // Example: fetch("/api/quizzes", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${token}`,
  //   },
  //   body: JSON.stringify({
  //     question,
  //     options: [option1, option2, option3, option4],
  //     answer,
  //   }),
  // });
  //     handleClose();
  //   };

  return (
    <div>
      <h1>Create Quiz</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Option 1"
          value={option1}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Option 2"
          value={option2}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Option 3"
          value={option3}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Option 4"
          value={option4}
          onChange={handleChange}
        />
        <select value={answer} onChange={handleChange} name="answer">
          <option value="">Select Answer</option>
          <option value={option1}>Option 1</option>
          <option value={option2}>Option 2</option>
          <option value={option3}>Option 3</option>
          <option value={option4}>Option 4</option>
        </select>

        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
        <button type="button" onClick={() => handleClose()}>
          Cancel
        </button>

        {/* Add your success message here */}
        <p>Quiz created successfully!</p>

        {/* Add your error message here */}
        <p className="text-danger">Error creating quiz</p>

        {/* Add your loading spinner here */}
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>

        {/* Add your success message here */}
        <p>Quiz created successfully!</p>
      </form>
    </div>
  );
}

export default CreateQuiz;
