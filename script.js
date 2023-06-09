const add_btn = document.querySelector(".add_btn");
const popup = document.querySelector(".popup_box");
const popup_box = document.querySelector(".popup");
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function close_popup() {
  popup.style.transform = "scale(0)";
  popup_box.style.opacity = 0;
  popup_box.style.transform = "translate(-50%, -50%) scale(0.95)";
  document.querySelector("body").style.overflow = "auto";
}

function get_date() {
  let d = new Date();

  let day = d.getDate();

  day = day < 10 ? `0${day}` : day;

  let mo_th = d.getMonth();
  let month = months[mo_th];

  let year = d.getFullYear();

  let date_str = `${day} ${month}, ${year}`;

  return date_str;
}

function update_note(elem){
  elem.addEventListener("click",()=>{
    options=elem.querySelector(".options");
    options.style.display="none";

    task_update_menu=elem.querySelector(".task_update_menu");
    body_click(task_update_menu,options);


    // if(!task_update_menu.classList.contains("none")){
      
    //   document.addEventListener("click",(e)=>{
    //     if(e.target != elem){
    //       elem.parentElement.classList.add("none");
    //     }
    //   })

    // }

    
  })
}

function body_click(elem,elem2){

  elem.classList.remove("none");

  setTimeout(()=>{
    document.addEventListener("click", (e) => {
      if (e.target.tagName != "LI" || e.target != elem) {
        elem.classList.add("none");
        options.style.display="inline";

      }
    });
  },3000);

  


  // const parentContainer = elem.parentElement;
  // document.addEventListener("click",(e)=>{
  //   if(e.target != elem){
  //     elem.classList.add("none");
  //   }
  // })
}


add_btn.addEventListener("click", () => {
  popup.style.transform = "scale(1)";

  popup_box.style.opacity = 1;
  popup_box.style.transform = "translate(-50%, -50%) scale(1)";

  document.querySelector("body").style.overflow = "hidden";

  popup_title = document.getElementById("popup_title").focus();
});

const add_task = document.querySelector(".add_task");
const task_title1 = document.getElementById("popup_title");

const task_desc = document.getElementById("popup_desc");

close_btn = document.querySelector(".close_icon");
close_btn.addEventListener("click", () => {
  close_popup();
  task_title1.value = task_desc.value = "";
});




add_task.addEventListener("click", (e) => {
  e.preventDefault();
  let title2 = task_title1.value.trim();

  if (title2 === "") {
    alert("Title cannot be empty.");
  } else {
    close_popup();
    task_title1.value = "";

    container = document.querySelector(".container");

    let task_box = document.createElement("div");
    task_box.classList.add("task");
    

    let task_header = document.createElement("div");
    task_header.classList.add("task_header");

    let title3 = document.createElement("h2");
    title3.innerText = title2;
    title2="";

    task_header.appendChild(title3);

    let desc = task_desc.value;
    task_desc.value = "";
    let para = document.createElement("p");
    para.innerText = desc;

    task_header.appendChild(para);

    let task_footer = document.createElement("div");
    task_footer.classList.add("task_footer");

    let task_hr = document.createElement("div");
    task_hr.classList.add("task_hr");

    let task_time = document.createElement("div");
    task_time.classList.add("task_time");

    let task_date = document.createElement("div");
    task_date.classList.add("task_date");

    task_date.innerText = get_date();

    let task_update = document.createElement("div");
    task_update.classList.add("task_update");
    task_update.innerHTML = `<i class="uil uil-ellipsis-h options"></i>`;

    let task_update_menu = document.createElement("div");
    task_update_menu.classList.add("task_update_menu","none");

    task_update_menu.innerHTML = `<ul>
    <li> <i class="uil uil-pen"></i>Edit</li>
    <li><i class="uil uil-trash"></i>Delete</li></ul>`;

    task_update.appendChild(task_update_menu);

    task_time.appendChild(task_date);
    task_time.appendChild(task_update);
    task_footer.appendChild(task_hr);
    task_footer.appendChild(task_time);

    task_box.appendChild(task_header);
    task_box.appendChild(task_footer);

    container.appendChild(task_box);

    update_note(task_update);

  }
});













