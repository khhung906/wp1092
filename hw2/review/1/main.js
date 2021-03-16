let current = 1;
let next = document.getElementById('next');
let back = document.getElementById('previous');
let url = document.getElementsByTagName("span")[0];
let img = document.getElementById('display');
const source = ["https://images.wondershare.com/filmora/article-images/i-look-cute-meme.JPG","https://i.imgur.com/BBfWoevh.jpg","https://sayingimages.com/wp-content/uploads/i-will-eat-your-soul-cute-memes.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMvcqE53ZC2XwD8ACHwoZYC1nL0zUdYyKJYQ&usqp=CAU","https://images.wondershare.com/filmora/article-images/i-can-fly-meme.JPG"]
img.src = source[current-1];
function changeImage(dir){ //true --> forward
	let add = dir? 1 : -1; 
	if ((current+add) <= 5 && (current+add)>0) {
		img.src = "images/loading.gif";
		current += add;
		if (current==5) {
			next.classList.add("disabled");
		}else if(current==1){
			back.classList.add("disabled");
		}else{
			next.classList.remove("disabled");
			back.classList.remove("disabled");
		}
		img.src = source[current-1];
		url.innerHTML = "<p id='source'>source: </p> \n <a href='"+source[current-1]+"'>"+source[current-1]+"</a>";
	}


}