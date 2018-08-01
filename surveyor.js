/**
 * index.js
 * - All our useful JS goes here, awesome!
 */

class Surveyor {
  constructor(obj, root) {
    this.data = obj;

    let style = document.createElement("style");
    style.innerHTML = `.surveyor-content {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.surveyor-question, .surveyor-submit {
  font-size: 25px;
  padding: 15px;
  margin: 15px;
  box-shadow: 0px 2px 10px #999;
}

.surveyor-submit {
  display: none;
  cursor: pointer;
}

.surveyor-answer {
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  cursor: pointer;
}

.surveyor-answer:first-child {
  margin-top: 15px;
}`;
    document.querySelector('head').appendChild(style);

    let cont = document.createElement("div");
    cont.className = "surveyor-content";

    obj.forEach(question => {
      let ques = document.createElement("div");
      ques.className = "surveyor-question";
      ques.innerHTML = question.question;

      question.answers.forEach(answer => {
        let answ = document.createElement("div");
        answ.className = "surveyor-answer";
        answ.innerHTML = answer;
        ques.appendChild(answ);
      });
      cont.appendChild(ques);
    });

    let submit = document.createElement("div");
    submit.className = "surveyor-submit";
    submit.innerHTML = "Submit";
    cont.appendChild(submit);
    document.querySelector(root).appendChild(cont);

    let _this = this;

    [].slice
      .call(cont.querySelectorAll(".surveyor-question"))
      .forEach(question => {
        [].slice
          .call(question.querySelectorAll(".surveyor-answer"))
          .forEach(answer => {
            answer.addEventListener("click", () => {
              [].slice.call(answer.parentNode.children).forEach(ans => {
                ans.style.boxShadow = "";
              });
              answer.style.boxShadow = "0px 2px 10px #999";
              answer.parentNode.setAttribute("data-answered", "true");
              answer.parentNode.setAttribute("data-answer", answer.innerHTML);
              let questions = [].slice.call(
                answer.parentNode.parentNode.querySelectorAll(
                  ".surveyor-question"
                )
              );
              for (let i = 0; i < questions.length; i++) {
                if (questions[i].getAttribute("data-answered") !== "true") {
                  console.log("Not all questions answered!");
                  return;
                }
              }
              console.log("All questions answered!");
              if (_this.completed) {
                _this.completed();
              }
              cont.querySelector(".surveyor-submit").style.display = "flex";
            });
          });
      });
    cont.querySelector(".surveyor-submit").addEventListener("click", () => {
      let results = [];
      let i = 0;
      [].slice
        .call(cont.querySelectorAll(".surveyor-question"))
        .forEach(question => {
          results.push({
            question: this.data[i].question,
            answer: question.getAttribute("data-answer")
          });
          ++i;
        });
      _this.submitted(results);
    });
  }
}
