let links = ["https://img.taste.com.au/DqTMY6Cz/taste/2018/08/smarties-chocolate-cake-139872-2.jpg",
"https://sugargeekshow.com/wp-content/uploads/2020/03/rainbow-cake-featured-scaled.jpg",
"https://storcpdkenticomedia.blob.core.windows.net/media/recipemanagementsystem/media/recipe-media-files/recipes/retail/desktopimages/rainbow-cake600x600_2.jpg?ext=.jpg",
"https://www.sainsburysmagazine.co.uk/media/10330/download/Honeycomb-cake.jpg?v=1",
"https://food.fnr.sndimg.com/content/dam/images/food/fullset/2009/4/5/1/IG1C17_30946_s4x3.jpg.rend.hgtvcom.826.620.suffix/1433541424559.jpeg"];

let pic = document.getElementById("display");
let pic_pos = 2;
pic.src = "./images/loading.gif";
pic.src = links[pic_pos];
//pic.background.src = "./images/loading.gif";
let url = document.getElementById("source");
url.href = links[pic_pos];
url.innerHTML = links[pic_pos];

let now_pos = document.getElementById("now_pos");
now_pos.innerHTML = "PIC COUNTS:"+(pic_pos+1)+"/5";

let input_box = document.getElementById("input_box");
input_box.addEventListener("keydown", function(e){
    if(e.code == 'Enter'){
        if(input_box.value > 5 || input_box.value < 1){
            alert("out of index");
        }
        else{
            pic_pos = input_box.value - 1;
            pic.src = links[pic_pos];
            url.href = links[pic_pos];
            url.innerHTML = links[pic_pos];
            now_pos.innerHTML = "PIC COUNT:"+(pic_pos+1)+"/5";
            if(pic_pos == 4){
                right.classList.add('disabled');
                left.classList.remove('disabled');
                right_dis = true;
            }
            else if(pic_pos == 0){
                left.classList.add('disabled');
                right.classList.remove('disabled');
                left_dis = true;
            }
            else{
                right.classList.remove('disabled');
                left.classList.remove('disabled');
            }
        } 
        input_box.value = "";
    }
});

let right_dis = false, left_dis = false;
let right = document.getElementById("next");
right.addEventListener("click", function(){
    if(left_dis){
        left_dis = false;
        left.classList.remove('disabled');
    }
    if(pic_pos <= 3){
        pic.src = "./images/loading.gif";
        pic_pos++;   
        pic.src = links[pic_pos];
        url.href = links[pic_pos];
        url.innerHTML = links[pic_pos];
    }
    if(pic_pos == 4){
        right.classList.add('disabled');
        right_dis = true;
    }
    now_pos.innerHTML = "PIC COUNT:"+(pic_pos+1)+"/5";
});


var left = document.getElementById("previous");
left.addEventListener("click", function(){
    if(right_dis){
        right_dis = false;
        right.classList.remove('disabled');
    }
    if(pic_pos >= 1){
        pic.src = "./images/loading.gif";
        pic_pos--;   
        pic.src = links[pic_pos];
        url.href = links[pic_pos];
        url.innerHTML = links[pic_pos];   
    }
    if(pic_pos == 0){
        left.classList.add('disabled');
        left_dis = true;
    }
    now_pos.innerHTML = "PIC COUNT:"+(pic_pos+1)+"/5";
});
