add_btn=document.querySelector(".add_btn");
popup=document.querySelector(".popup_box");
popup_box=document.querySelector(".popup");

function close_popup(){
    popup.style.transform="scale(0)";
    popup_box.style.opacity=0;
    popup_box.style.transform="translate(-50%, -50%) scale(0.95)";
    document.querySelector("body").style.overflow = "auto";
}

add_btn.addEventListener("click",()=>{

    
    popup.style.transform='scale(1)';

    
    popup_box.style.opacity=1;
    popup_box.style.transform="translate(-50%, -50%) scale(1)";

    document.querySelector("body").style.overflow = "hidden";

    popup_title=document.getElementById("popup_title").focus();
    



})



close_btn=document.querySelector(".close_icon");
close_btn.addEventListener("click",()=>{

    close_popup();


}
)

add_task=document.querySelector(".add_task");
task_title1=document.getElementById("popup_title");



task_desc=document.getElementById("popup_desc");
// task=document.querySelector(".task");
// const task_header = document.querySelector('.task_header h2');
// const task_para = document.querySelector('.task_header p');


add_task.addEventListener("click",()=>{
    
    let title2=task_title1.value.trim();
    if(title2===''){alert('nk')}    
    else{
        close_popup();
        task_title1.value="";

        

        container=document.querySelector(".container");

        let task_box=document.createElement("div");
        task_box.classList.add("task");

        let task_header=document.createElement("div");
        task_header.classList.add("task_header");

        let title3=document.createElement("h2");
        title3.innerText=title2;

        // console.log(title2);

        task_header.appendChild(title3);

        let desc=task_desc.value;
        task_desc.value="";
        let para=document.createElement("p");
        para.innerText=desc;

        // console.log(desc);

        task_header.appendChild(para);

        task_box.appendChild(task_header);


        container.appendChild(task_box);
        





       



    }




})