const Questions = (props) => {
  return (
    <div className="mt-2">
      <h1
        className="text-2xl font-md text-center dark:text-gray-100"
        dangerouslySetInnerHTML={{ __html: props.question.question }}
      ></h1>
      <div className="mt-6 ml-3 text-lg flex items-start flex-col">
        {props.question.answers.map((answer, i) => (
          <button
            key={i}
            onClick={() => !props.showAnswer && props.handleAnswer(answer)}
            className={
              !props.showAnswer
                ? "w-full bg-gray-100 rounded-full mb-2 p-2 text-gray-600 hover:text-gray-500 transition-colors duration-200 focus:outline-none"
                : props.question.correct_answer === answer
                ? "w-full bg-gray-100 rounded-full mb-2 p-2 text-green-500 transition-colors duration-200 focus:outline-none"
                : "w-full bg-gray-100 rounded-full mb-2 p-2 text-red-500 transition-colors duration-200 focus:outline-none"
            }
            dangerouslySetInnerHTML={{ __html: answer }}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Questions;
