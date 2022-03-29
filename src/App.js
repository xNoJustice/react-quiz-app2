import logo from "./logo.svg";
import "./logo.css";
import { useEffect, useState } from "react";
import Questions from "./components/Questions";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const API_URL = "https://opentdb.com/api.php?amount=10&type=multiple";

  useEffect(() => {
    async function fetchQuestions() {
      fetch(API_URL)
        .then((res) => res.json())
        .then((data) => {
          setQuestions(
            data.results.map((question) => ({
              ...question,
              answers: [
                question.correct_answer,
                ...question.incorrect_answers,
              ].sort(() => Math.random() - 0.5),
            }))
          );
        });
    }
    fetchQuestions();
  }, []);

  const handleAnswer = (answer) => {
    if (answer === questions[currentIndex].correct_answer) {
      setScore(score + 1);
    }

    setShowAnswer(true);
  };

  const handleNext = () => {
    setShowAnswer(false);
    setCurrentIndex(currentIndex + 1);
  };

  const handleFinish = () => {
    setShowScore(true);
  };

  const NewGame = () => {
    setScore(0);
    setCurrentIndex(0);
    setShowAnswer(false);
    setShowScore(false);
  };
  return (
    <section className="w-full h-auto min-h-screen overflow-hidden">
      <div className="container mx-auto">
        <div>
          <div className="flex mt-20 items-center justify-center">
            <h2 className="text-lg font-bold text-center text-black dark:text-gray-100 uppercase transition duration-500 ease-in-out transform hover:text-gray-400">
              <img src={logo} alt="logo" className="logo" />
            </h2>
          </div>
          <h1 className="text-center mt-2 mb-4 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            React Quiz App
          </h1>
        </div>
        {showScore ? (
          <div className="flex flex-col justify-center items-center mt-20">
            <h1 className="mt-2 mb-4 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Your score is {score}
            </h1>
            <button
              onClick={() => NewGame()}
              className="py-2 px-4 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-32 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg "
            >
              Play Again
            </button>
          </div>
        ) : questions.length === 0 ? (
          <div>Loading ...</div>
        ) : (
          <div className="flex justify-center items-center mt-12">
            <div className="w-full max-w-lg px-4 py-4 rounded-lg shadow bg-indigo-500 sm:px-6 md:px-8 lg:px-10">
              <div>
                <div className="w-32 mx-auto text-center text-white rounded-full py-2 px-2 bg-green-500">
                  <span>
                    Question{" "}
                    {currentIndex > questions.length
                      ? questions.length + "/" + questions.length
                      : currentIndex + 1 + "/" + questions.length}
                  </span>
                </div>
                <div className="self-center mb-6 text-center text-md font-light text-gray-600 sm:text-lg dark:text-white"></div>
                <Questions
                  question={questions[currentIndex]}
                  handleAnswer={handleAnswer}
                  showAnswer={showAnswer}
                />
                {showAnswer &&
                  (questions.length === currentIndex + 1 ? (
                    <button
                      className="px-2 py-3 float-right bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-32 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg "
                      onClick={() => handleFinish()}
                    >
                      Finish Quiz
                    </button>
                  ) : (
                    <button
                      className="px-2 py-3 float-right bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-32 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg "
                      onClick={() => handleNext()}
                    >
                      Next Question
                    </button>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default App;
