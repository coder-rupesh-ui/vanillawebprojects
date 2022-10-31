const slides = document.querySelectorAll(".slide");

slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${index*100}%)`;
});

let curr = 0;
let max = slides.length;

const dotSelectors = document.querySelector(".dot-selectors");
for(let i=0;i<max;i++) {
    const span = document.createElement('span');
    span.setAttribute("data-id", i);
    span.classList.add('selector');
    dotSelectors.appendChild(span);
}

const selectors = document.querySelectorAll('.selector');
activateSelector(0);

const next = document.querySelector('.btn-next');
next.addEventListener("click", () => {
    nextHandler();
});

function nextHandler() {
    if(curr < max) {
        curr++;
        prev.classList.remove('disabled');
        activateSelector(curr);
    }
    if(curr === max -1){
        next.classList.add('disabled');
    }
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${100* (index-curr)}%)`
    });
}

const prev = document.querySelector(".btn-prev");
prev.classList.add('disabled');
prev.addEventListener("click", () => {
    prevHandler();
});

function prevHandler() {
    if(curr > 0) {
        curr--;
        next.classList.remove('disabled');
        activateSelector(curr);
    }
    if(curr <= 0){
        prev.classList.add('disabled');
    }
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${100* (index-curr)}%)`
    });
}

function activateSelector(index) {
    selectors.forEach(selector => selector.classList.remove('active'));
    selectors[index].classList.add('active');
}

dotSelectors.addEventListener("click", function(event) {
    console.log(event);
    const nextId = event.target.getAttribute('data-id');
    let count = Math.abs(curr - nextId);
    if(curr < nextId) {
        for(let i=0;i<count;i++){
            nextHandler();
        }
    } else if(curr > nextId) {
        for(let i=0;i<count;i++){
            prevHandler();
        }
    }
});