const add_btn = document.querySelector(".add_btn");
const popup = document.querySelector(".popup_box");
const popup_box = document.querySelector(".popup");
const add_task = document.querySelector(".add_task");
const task_title1 = document.getElementById("popup_title");
const task_desc = document.getElementById("popup_desc");
const delete_all = document.querySelector(".close_all");
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

const notes = JSON.parse(localStorage.getItem("notes") || "[]");

notes.forEach((note) => {
  container = document.querySelector(".container");

  let task_box = document.createElement("div");
  task_box.classList.add("task");

  let task_header = document.createElement("div");
  task_header.classList.add("task_header");

  let title3 = document.createElement("h2");
  title3.innerText = note.title2;
  // title2 = "";

  task_header.appendChild(title3);

  // let desc = task_desc.value;
  // task_desc.value = "";
  let para = document.createElement("p");
  para.innerText = note.desc;

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
  task_update_menu.classList.add("task_update_menu", "none");

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

  popup_options(task_update);
});

delete_all.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

function open_popup() {
  popup.style.transform = "scale(1)";

  popup_box.style.opacity = 1;
  popup_box.style.transform = "translate(-50%, -50%) scale(1)";

  document.querySelector("body").style.overflow = "hidden";
  task_title1.focus();
  task_title1.value = "";
  task_desc.value = "";
}

function restore_changes() {
  add_task.removeEventListener("click", updation);
  add_task.addEventListener("click", add_task_btn);
  popup_header.innerText = "Add a new Task";

  add_task.innerText = "Add Task";

  popup_header = document.querySelector(".popup_header p");
}

function updation(e) {
  e.preventDefault();

  if (!task_title1.value) {
    alert("Title cannot be empty.");
  } 
  else {
    let found_index=notes.findIndex((item)=>item.title2===note_header_title.innerText);

    note_header_title.innerText = task_title1.value;

    if (task_desc.value) {
      note_header_desc.innerText = task_desc.value;
    }

    
  
    if(found_index!=-1){
      notes[found_index].title2=note_header_title.innerText;
      notes[found_index].desc=note_header_desc.innerText;

      localStorage.setItem("notes", JSON.stringify(notes));
      // location.reload();
    }

    else{
      console.error("Invalid found_index");
    }


    close_popup();
    restore_changes();
  }
}

function update_note(elem) {
  list = elem.children[0];
  items = list.children;
  list_items = Array.from(items);

  let note = elem.parentNode.parentNode.parentNode.parentNode;
  note_children = Array.from(note.children);

  note_header = note_children[0];
  note_header_title = Array.from(note_header.children)[0];
  note_header_desc = Array.from(note_header.children)[1];

  list_items[0].addEventListener("click", () => {
    popup.style.transform = "scale(1)";
    popup_box.style.opacity = 1;
    popup_box.style.transform = "translate(-50%, -50%) scale(1)";
    document.querySelector("body").style.overflow = "hidden";
    task_title1.value=note_header_title.innerText;
    task_desc.value=note_header_desc.innerText;
    task_title1.focus();

    popup_header = document.querySelector(".popup_header p");
    popup_header.innerText = "Update Task";

    add_task.innerText = "Save Changes";

    add_task.removeEventListener("click", add_task_btn);

    add_task.addEventListener("click", updation);
  });

  list_items[1].addEventListener("click", () => {
    let confirm_del = confirm("Are you sure you want to delete this note?");

    if (!confirm_del) return;

    else{
      
      let found_index=notes.findIndex((item)=>item.title2===note_header_title.innerText);
  
      if(found_index!=-1){
        notes.splice(found_index,1);
        localStorage.setItem("notes", JSON.stringify(notes));
        location.reload();
      }

      else{
        console.error("Invalid found_index");
      }
    }

    


    
  });
}

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

function popup_options(elem) {
  elem.addEventListener("click", () => {
    options = elem.querySelector(".options");
    options.style.display = "none";

    task_update_menu = elem.querySelector(".task_update_menu");
    task_update_menu.classList.remove("none");

    window.onclick=(event)=>{
      if(!event.target.matches("i"||"li")){
        task_update_menu.classList.add("none");
        options.style.display = "inline";
      }
    }

    

    update_note(task_update_menu);
  });
}

function add_task_btn(e) {
  e.preventDefault();
  let title2 = task_title1.value.trim();

  if (title2 === "") {
    alert("Title cannot be empty.");
  } else {
    close_popup();

    container = document.querySelector(".container");

    let task_box = document.createElement("div");
    task_box.classList.add("task");

    let task_header = document.createElement("div");
    task_header.classList.add("task_header");

    let title3 = document.createElement("h2");
    title3.innerText = title2;
    // title2 = "";

    task_header.appendChild(title3);

    let desc = task_desc.value;
    // task_desc.value = "";
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
    task_update_menu.classList.add("task_update_menu", "none");

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

    let task_info = { title2, desc, date: get_date() };
    notes.push(task_info);
    localStorage.setItem("notes", JSON.stringify(notes));

    popup_options(task_update);
  }
}

add_btn.addEventListener("click", open_popup);

close_btn = document.querySelector(".close_icon");
close_btn.addEventListener("click", () => {
  close_popup();
  task_title1.value = task_desc.value = "";
});

add_task.addEventListener("click", add_task_btn);

let hireme = document.getElementById("hireme");
hireme.addEventListener("click", () => {
  window.open("https://github.com/piyush5665", "_blank");
});


