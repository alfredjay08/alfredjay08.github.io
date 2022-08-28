"use strict";

const json = [
  {
    question: "What is the shape of the world?",
    answers: ["Oval", "Globe", "Flat", "Dinosaur"],
    correctAnswer: 1,
    hasFinished: false,
  },
  {
    question: "What is 1 + 1?",
    answers: ["21", "11", "2", "4"],
    correctAnswer: 2,
    hasFinished: false,
  },
  {
    question: "What is the color of a healthy three?",
    answers: ["Orange", "Red", "Green", "Black & White"],
    correctAnswer: 2,
    hasFinished: false,
  },
  {
    question: "What is 5 x 5?",
    answers: ["10", "15", "20", "25"],
    correctAnswer: 3,
    hasFinished: false,
  },
  {
    question: "What is life?",
    answers: ["Gift", "Turtore", "Something", "Dinosaur"],
    correctAnswer: 0,
    hasFinished: false,
  },
];

const petrosExamApp = function (obj) {
  const questions = obj;

  const clientData = {
    firstname: "",
    middleInitial: "",
    lastname: "",
    answers: [],
    points: 0,
  };

  const questionContainer = document.querySelector(".client--question-form");
  const clientNameContainer = document.querySelector(".client--name-form");
  const configContainer = document.querySelector(".config-container");
  const summaryContainer = document.querySelector(".client--summary-form");

  const loadQuestions = () => {
    questionContainer.innerHTML = "";
    questions.forEach((question, qi) => {
      if (!question.hasFinished) {
        const alph = ["A", "B", "C", "D"];
        let html = `
      <div class="card" data-question="${qi}">
        <div class="card-body">
          <p class="question-label">
            ${question.question}
          </p>
          <br />
          <div class="answers-container">
    `;

        question.answers.forEach((answer, ai) => {
          html += `
        <div class="answer">
          <input type="radio" class="answer--input" id="q${qi}-answer--${ai}" name="q${qi}-answer" value="${ai}" />
          <label for="q${qi}-answer--${ai}">${alph[ai]}. ${answer}</label>
        </div>
        `;
        });

        html += `
          </div>
        </div>
      </div>
    `;

        questionContainer.innerHTML += html;
      }
    });
  };

  const initExamForm = (e) => {
    const inputs = clientNameContainer.querySelectorAll('input[type="text"]');
    let error = false;
    inputs.forEach((input) => {
      if (!input.value) {
        error = true;
        input.closest(".card").classList.add("input--error");
      } else {
        input.closest(".card").classList.remove("input--error");
      }
    });

    if (error) return;

    questions.forEach((_) => {
      clientData.answers.push(null);
    });

    document.querySelector(".form--comment").textContent =
      "Choose the letter that corresponds to the correct answer.";
    e.target.classList.add("d-none");
    e.currentTarget.querySelector(".btn--submit").classList.remove("d-none");
    e.currentTarget.querySelector(".page--text").textContent = "Page 2 of 2";
    clientNameContainer.classList.add("d-none");
    questionContainer.classList.remove("d-none");
  };

  const submitExamForm = (e) => {
    let error = false;
    questions.forEach((_, i) => {
      if (clientData.answers[i] === null) {
        document
          .querySelector(`.card[data-question="${i}"]`)
          .classList.add("input--error");
        error = true;
      } else {
        document
          .querySelector(`.card[data-question="${i}"]`)
          ?.classList.remove("input--error");
      }
    });

    if (error) return;

    clientData.points = 0;

    questions.forEach((question, i) => {
      if (question.correctAnswer === clientData.answers[i]) {
        clientData.points++;
        question.hasFinished = true;
      }
    });

    setupClientSummary(clientData.points >= 4 ? "pass" : "fail");
  };

  const retakeExamForm = (e) => {
    loadQuestions();
    document.querySelector(".form--comment").textContent =
      "Choose the letter that corresponds to the correct answer.";
    e.target.classList.add("d-none");
    e.currentTarget.querySelector(".btn--submit").classList.remove("d-none");
    e.currentTarget.querySelector(".page--text").textContent = "Page 2 of 2";
    summaryContainer.classList.add("d-none");
    questionContainer.classList.remove("d-none");
  };

  const showSummaryResult = (e) => {
    questions.forEach((question, index) => {
      if (question.hasFinished)
        document
          .querySelector(`.card[data-question="${index}"]`)
          ?.classList.add("d-none");
      else
        document
          .querySelector(`.card[data-question="${index}"]`)
          .classList.add("input--error", "wrong--answer");
    });

    document.querySelector(".form--comment").textContent =
      "The following questions have wrong answers";
    e.target.classList.add("d-none");

    summaryContainer.classList.add("d-none");
    questionContainer.classList.remove("d-none");
  };

  const setupClientSummary = (result) => {
    questionContainer.classList.add("d-none");

    document.querySelector(".form--comment").textContent = "";

    const summaryNote =
      result === "pass"
        ? `
  <span class="text-success">Congratulations!</span> You have
              successfully passed the required rate of the Examination!
  `
        : `
  <span class="text-danger">Unfornately</span>, you have not passed the required rate of the Examination. <br/> <br /> You can retake the exam by clicking the retake button below
  `;

    summaryContainer.querySelector("img").src = `img/test-${result}.png`;
    summaryContainer.querySelector("p").innerHTML = summaryNote;

    configContainer.querySelectorAll("button").forEach((btn) => {
      btn.classList.add("d-none");
    });
    configContainer.querySelector(".page--text").textContent = "";

    if (result === "fail") {
      configContainer.querySelector(".btn--retake").classList.remove("d-none");
      configContainer
        .querySelector(".btn--show-summary")
        .classList.remove("d-none");
    }

    summaryContainer.classList.remove("d-none");
  };

  loadQuestions();

  configContainer.addEventListener("click", (e) => {
    e.preventDefault();

    if (e.target.classList.contains("btn--next")) {
      initExamForm(e);
    }

    if (e.target.classList.contains("btn--submit")) {
      submitExamForm(e);
    }

    if (e.target.classList.contains("btn--retake")) {
      retakeExamForm(e);
    }

    if (e.target.classList.contains("btn--show-summary")) {
      showSummaryResult(e);
    }
  });

  questionContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("answer--input")) {
      clientData.answers[parseInt(e.target.closest(".card").dataset.question)] =
        parseInt(e.target.value);
    }
  });

  clientNameContainer.addEventListener("change", (e) => {
    e.preventDefault();

    if (e.target.classList.contains("name--input")) {
      clientData[e.target.id] = e.target.value;
    }
  });
};

petrosExamApp(json);
