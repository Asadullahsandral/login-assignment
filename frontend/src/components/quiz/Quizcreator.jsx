import React, { useState } from "react";

function Quizcreator() {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  //   useEffect(() => {
  // Fetch questions from your API or local state
  // Example:
  // fetch("https://your-api-url/questions")
  //  .then((response) => response.json())
  //  .then((data) => setQuestions(data));
  //   }, []);
  const handleChange = (event) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = event.target.value;
    setAnswers(newAnswers);
  };
  const handleNextQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };
  const handlePreviousQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion - 1);
  };
  const handleReset = () => {
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
  };
  const handleDeleteQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };
  const handleEditQuestion = (index) => {
    // Implement edit question functionality here
    // Example:
    // const updatedQuestion = {
    //   question: event.target.question.value,
    //   options: [...event.target.options],
    //   answer: event.target.answer.value,
    // };
    // const newQuestions = [...questions];
    // newQuestions[index] = updatedQuestion;
    // setQuestions(newQuestions);
  };
  const handleAddQuestion = () => {
    // Implement add question functionality here
    // Example:
    // const newQuestion = {
    //   question: event.target.question.value,
    //   options: [...event.target.options],
    //   answer: event.target.answer.value,
    // };
    // setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  };
  const handleSubmitQuiz = () => {
    // Implement submit quiz functionality here
    // Example:
    // const correctAnswers = questions.map((question) => question.answer);
    // const score = answers.filter((answer, index) =>
    //   answer === correctAnswers[index]
    // ).length;
    // setScore(score);
  };
  const handleDeleteAnswer = (index, questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.splice(index, 1);
    setQuestions(newQuestions);
  };
  //   const handleEditAnswer = (index, questionIndex) => {
  //     const newQuestions = [...questions];
  //     newQuestions[questionIndex].options[index] = event.target.value;
  //     setQuestions(newQuestions);
  //   };

  const handleAddAnswer = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push("");
    setQuestions(newQuestions);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newAnswers = answers.map((answer, index) =>
      index === event.target.answer.value
        ? questions[currentQuestion].answer
        : answer
    );
    setAnswers(newAnswers);
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    if (currentQuestion === questions.length) {
      setScore(
        answers.filter((answer) => answer === questions[currentQuestion].answer)
          .length
      );
    }
  };

  return (
    <div>
      {/* Add your quiz creator UI here */}
      <h1>Quiz Creator</h1>
      <form>
        {/* Add your question inputs and options here */}
        <input type="text" placeholder="Question" />
        <input type="text" placeholder="Option 1" />
        <input type="text" placeholder="Option 2" />
        <input type="text" placeholder="Option 3" />
        <input type="text" placeholder="Answer" />
        <button type="submit">Add Question</button>
      </form>
      <button
        onClick={() =>
          setQuestions((prevQuestions) => [
            ...prevQuestions,
            { question: "", options: [], answer: "" },
          ])
        }
      >
        Add New Question
      </button>
      <button onClick={() => setCurrentQuestion(0)}>Start Quiz</button>
      {questions[currentQuestion] && (
        <div>
          <h2>{questions[currentQuestion].question}</h2>
          <form onSubmit={handleSubmit}>
            {questions[currentQuestion].options.map((option, index) => (
              <div key={index}>
                <input type="radio" name="answer" value={option} />
                <label>{option}</label>
                {option}
              </div>
            ))}
            <button type="submit">Submit</button>
            {currentQuestion === questions.length - 1 && (
              <button onClick={() => setScore(0)}>See Results</button>
            )}
          </form>
        </div>
      )}
      ;
    </div>
  );
}

export default Quizcreator;
