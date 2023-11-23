const parallax_el = document.querySelectorAll(".parallax");
const main = document.querySelector("main");

let xValue = 0 , yValue = 0 ; 
let rotateDegree = 0;

function update (cursorPosition){
   parallax_el.forEach(el => {
      let speedx = el.dataset.speedx;
      let speedy = el.dataset.speedy;
      let speedz = el.dataset.speedz;
      let rotationSpeed = el.dataset.rotation;

      const forTest = document.querySelectorAll(".maintower .light .pillars .pLight")
      let zValue = (cursorPosition - parseFloat(getComputedStyle(el).left)) * 0.2;
      // let isInLeft =  parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1; 


      el.style.transform = `translateX(calc(-50% + ${-xValue * speedx}px)) rotateY(${rotateDegree * rotationSpeed}deg) translateY(calc(-50% + ${yValue * speedy}px  )) perspective(2300px) translateZ(${zValue * speedz}px)`;
   })
}

update(0);

window.addEventListener("mousemove",  (e)=> {
   xValue = e.clientX - window.innerWidth / 2;
   yValue = e.clientY - window.innerHeight / 2; 
   if(timeline.isActive()) return;

   rotateDegree = (xValue / (window.innerWidth/ 2)) * 20; 

   update(e.clientY);
});

if(window.innerWidth >= 725){
   main.style.maxHeight= `${window.innerWidth * .6}px`;
}else{
   main.style.maxHeight= `${window.innerWidth * 1.6}px`;
}

// GSAP Animation

let timeline = gsap.timeline();

Array.from(parallax_el)
.filter(el => !el.classList.contains("text"))
.forEach(el => {
   timeline.from(
      el,
      {
         top: `${el.offsetHeight / 2 + + el.dataset.distance}px`,
         duration: 2,
         ease: "power3.out",
      },
      "0"
   );
});

timeline.from(".text h1", 
 {
   y:
   window.innerHeight - document.querySelector(".text h1").getBoundingClientRect().top + 200,
   duration: 2,
 },
 "1.5"
).from(".text h2",
{
   y: -150,
   opacity: 0,
   duration: 1.5,
}, "2")

timeline.from(".hide", {
   opacity: 0,
   duration: 1,
},
"1"
)
