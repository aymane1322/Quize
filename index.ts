interface QuizQuestion {
    question: string;
    a: string;
    b: string;
    c: string;
    d: string;
    correctAnswer: string;
}
async function fetchingData(): Promise<QuizQuestion[]> {
    try {
        const response :Response = await fetch("questions.json");
        const data:QuizQuestion[] = await response.json();
        return data; 
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; 
    }
}
fetchingData().then((data) => { //creat bulletes
    for (let key in data) {
        const span = document.createElement("span")
        span.className = "bullet"
        const tspan = document.createTextNode(`${+key+1}`)
        span.appendChild(tspan)
        document.querySelector(".bulletes")!.appendChild(span)
    }
    const bulletes = document.querySelectorAll(".bullet")
    bulletes[0].classList.add("currentQuestion") 
    bulletes[0].classList.add("AfterCss")
    return {data,bulletes }
}).then(({data,bulletes }) => { // displaying the first question
    document.querySelector(".question")!.innerHTML=data[0].question;
    document.querySelector(".a")!.innerHTML=`${data[0].a}`;
    document.querySelector(".b")!.innerHTML=`${data[0].b}`;
    document.querySelector(".c")!.innerHTML=`${data[0].c}`;
    document.querySelector(".d")!.innerHTML=`${data[0].d}`;
    return {data,bulletes }
}).then(({data,bulletes }) => { // displaying next question based on click Next Button
    document.querySelector("button")!.addEventListener("click", () => {
        scorLogique(data,bulletes) // scor logique function
    })
    return {data,bulletes }
}).then(({data,bulletes }) => { //set time logique
    function startTime() {
        const idInterval: number = setInterval(() => {
            if (time === 0) {
                time = 20;
                scorLogique(data, bulletes, idInterval);
            }
            (document.querySelector(".timer") as HTMLDivElement).innerHTML = `${time}s`;
            time--
        }, 1000)
    }
    startTime()
}).catch((error) => {
    console.error("Error:", error);
});
let scor :number = 0;
let chosen: string 
let questionNumber: number = 0
let time:number = 20
const possibleAnswer = document.querySelectorAll(".p") as unknown as HTMLSpanElement[]
possibleAnswer.forEach((e) => {
    e.addEventListener("click", (ele) => {
        possibleAnswer.forEach((e) => {
            e.classList.remove("active")
        });
        (ele.currentTarget as HTMLSpanElement).classList.add("active")
        chosen = (ele.currentTarget as HTMLSpanElement).dataset.x || ''
    })
});
(document.querySelector(".tryAgin") as HTMLDivElement).addEventListener("click", () => {
    window.location.reload()
})
function scorLogique(data:QuizQuestion[],bulletes:NodeListOf<Element>,idInterval?:number) {
    time = 20;
    if (questionNumber !== data.length) {
        if (chosen === data[questionNumber].correctAnswer) {//scor concept manepulation 
            scor++
            chosen=''
        }
        questionNumber++
        if (questionNumber !== data.length) {//index problem solved and end of question
            (document.querySelector(".question")as HTMLDivElement).innerHTML = data[questionNumber].question;
            (document.querySelector(".a")as HTMLSpanElement).innerHTML = `${data[questionNumber].a}`;
            (document.querySelector(".b")as HTMLSpanElement).innerHTML = `${data[questionNumber].b}`;
            (document.querySelector(".c")as HTMLSpanElement).innerHTML = `${data[questionNumber].c}`;
            (document.querySelector(".d")as HTMLSpanElement).innerHTML = `${data[questionNumber].d}`;
            bulletes[questionNumber].classList.add("currentQuestion");
        if (questionNumber !== data.length-1) {
            bulletes[questionNumber].classList.add("AfterCss")
        }
        } else {
            clearInterval(idInterval);
            (document.querySelector(".bulletes") as HTMLDivElement).remove();
            (document.querySelector(".question") as HTMLDivElement).remove();
            (document.querySelector(".possibleAnswers") as HTMLDivElement).remove();
            (document.querySelector("button") as HTMLButtonElement).remove();
            (document.querySelector(".timer") as HTMLDivElement).remove();
            (document.querySelector(".theResult") as HTMLElement).style.display = "flex";
            (document.querySelector(".theResult h1") as HTMLHeadingElement).innerHTML = `your Score is ${scor}/${data.length}`;
        }
    }
    possibleAnswer.forEach((e) => { // active class problem soleved
        e.classList.remove("active")
    }); 
}