add_btn=document.querySelector(".add_btn");

add_btn.addEventListener("click",()=>{

    popup=document.querySelector(".popup_box");
    popup.style.transform='scale(1)';

    popup_box=document.querySelector(".popup");
    popup_box.style.opacity=1;
    popup_box.style.transform="translate(-50%, -50%) scale(1)";

    document.querySelector("body").style.overflow = "hidden";




})

