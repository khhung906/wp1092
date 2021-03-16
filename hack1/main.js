let input_box = document.getElementById("comment-input"); 
let comment_btn = document.getElementById("comment-button");
let cancel_btn = document.getElementById("cancel-button");
let btns = document.getElementById("comment-button-group");
let comment_num = document.getElementById("comment-num");
let count = 1;

btns.style.display = "none";

input_box.addEventListener("click", function(){
    btns.style.display = "flex";
});

input_box.addEventListener("keyup",function(e) {  
    comment_btn.style.backgroundColor = "#065fd4"; 
    if(input_box.value.trim() == ""){
        comment_btn.style.backgroundColor = "#cccccc"; 
    }
    else{
        comment_btn.style.backgroundColor = "#065fd4";   
    }
});
    
let comment_class = document.getElementById("comment-group");

comment_btn.addEventListener("click", function(){
    if(input_box.value.trim() == ""){
        comment.disabled = true;
    }
    else{
        var comment = document.createElement("div");
        comment.classList.add("comment");
        var img = document.createElement("img");
        img.classList.add("comment-img");
        img.src = "images/user-icon.jpg";
        var div_data = document.createElement("div");
        div_data.classList.add("comment-right");
        var div_words = document.createElement("div");
        var span1 = document.createElement("span");
        span1.classList.add("comment-name");
        span1.innerHTML = "Toby Chen";
        var span2 = document.createElement("span");
        span2.classList.add("comment-time");
        span2.innerHTML = "現在";
        var p = document.createElement("p");
        p.classList.add("comment-text");
        p.innerHTML = input_box.value.trim();
        comment_class.appendChild(comment);
        comment.appendChild(img);
        comment.appendChild(div_data);
        div_data.appendChild(div_words);
        div_data.appendChild(p);
        div_words.appendChild(span1);
        div_words.appendChild(span2);
        input_box.value = "";
        comment_btn.style.backgroundColor = "#cccccc";  
        count++;
        comment_num.innerHTML = count+"則留言";
        
    }
});

cancel_btn.addEventListener("click", function(){
    input_box.value = "";
    btns.style.display = "none";
});

