"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function fetchingData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("questions.json");
            const data = yield response.json();
            return data;
        }
        catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    });
}
fetchingData().then((data) => {
    for (let key in data) {
        const span = document.createElement("span");
        span.className = "bullet";
        const tspan = document.createTextNode(`${+key + 1}`);
        span.appendChild(tspan);
        document.querySelector(".bulletes").appendChild(span);
    }
    const bulletes = document.querySelectorAll(".bullet");
    bulletes[0].classList.add("currentQuestion");
    bulletes[0].classList.add("AfterCss");
    return { data, bulletes };
}).then(({ data, bulletes }) => {
    document.querySelector(".question").innerHTML = data[0].question;
    document.querySelector(".a").innerHTML = `${data[0].a}`;
    document.querySelector(".b").innerHTML = `${data[0].b}`;
    document.querySelector(".c").innerHTML = `${data[0].c}`;
    document.querySelector(".d").innerHTML = `${data[0].d}`;
    return { data, bulletes };
}).then(({ data, bulletes }) => {
    document.querySelector("button").addEventListener("click", () => {
        scorLogique(data, bulletes);
    });
    return { data, bulletes };
}).then(({ data, bulletes }) => {
    function startTime() {
        const idInterval = setInterval(() => {
            if (time === 0) {
                time = 20;
                scorLogique(data, bulletes, idInterval);
            }
            document.querySelector(".timer").innerHTML = `${time}s`;
            time--;
        }, 1000);
    }
    startTime();
}).catch((error) => {
    console.error("Error:", error);
});
let scor = 0;
let chosen;
let questionNumber = 0;
let time = 20;
const possibleAnswer = document.querySelectorAll(".p");
possibleAnswer.forEach((e) => {
    e.addEventListener("click", (ele) => {
        possibleAnswer.forEach((e) => {
            e.classList.remove("active");
        });
        ele.currentTarget.classList.add("active");
        chosen = ele.currentTarget.dataset.x || '';
    });
});
document.querySelector(".tryAgin").addEventListener("click", () => {
    window.location.reload();
});
function scorLogique(data, bulletes, idInterval) {
    time = 20;
    if (questionNumber !== data.length) {
        if (chosen === data[questionNumber].correctAnswer) {
            scor++;
            chosen = '';
        }
        questionNumber++;
        if (questionNumber !== data.length) {
            document.querySelector(".question").innerHTML = data[questionNumber].question;
            document.querySelector(".a").innerHTML = `${data[questionNumber].a}`;
            document.querySelector(".b").innerHTML = `${data[questionNumber].b}`;
            document.querySelector(".c").innerHTML = `${data[questionNumber].c}`;
            document.querySelector(".d").innerHTML = `${data[questionNumber].d}`;
            bulletes[questionNumber].classList.add("currentQuestion");
            if (questionNumber !== data.length - 1) {
                bulletes[questionNumber].classList.add("AfterCss");
            }
        }
        else {
            clearInterval(idInterval);
            document.querySelector(".bulletes").remove();
            document.querySelector(".question").remove();
            document.querySelector(".possibleAnswers").remove();
            document.querySelector("button").remove();
            document.querySelector(".timer").remove();
            document.querySelector(".theResult").style.display = "flex";
            document.querySelector(".theResult h1").innerHTML = `your Score is ${scor}/${data.length}`;
        }
    }
    possibleAnswer.forEach((e) => {
        e.classList.remove("active");
    });
}
//# sourceMappingURL=index.js.map