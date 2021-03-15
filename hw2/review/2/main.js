var myImage = document.getElementById("display");
var mySource = document.getElementById("source");
var switch_pre = document.getElementById("previous");
var switch_nex = document.getElementById("next");
var ar = ['https://i0.wp.com/pinkupost.com/wp-content/uploads/2020/06/%E6%96%B0%E5%9E%A3%E7%B5%90%E8%A1%A3%E5%85%85%E6%BB%BF%E9%9B%BB%EF%BC%8C%E5%90%91%E8%BA%AB%E9%82%8A%E4%BA%BA%E9%80%8F%E9%9C%B2%E6%83%B3%E5%9B%9E%E6%AD%B8%EF%BC%9F%EF%BC%81%E4%B8%8B%E9%83%A8%E5%8A%87%E6%9C%83%E6%98%AF......_.jpg?fit=1200%2C630',
'https://media.nownews.com/nn_media/thumbnail/2020/06/1593425167888-40fb9a44319342538711d380cdb25886-800x596.jpg?unShow=false',
'https://dvblobcdnjp.azureedge.net//Content/Upload/Popular/Images/2021-01/08da34ba-ee35-4fd8-9a35-14f27eb42c93_m.jpg',
'https://cc.tvbs.com.tw/img/_data/i/upload/2018/11/21/20181121142601-ca679b38-me.jpg',
'https://static.ctwant.com/images/content/32/86032/a0732d543e9736816cece0b4bce30424.jpg',
'https://media.tenor.com/images/a9adda18a785b1cb85eec04517d99178/tenor.gif'];
var index = 2;
switch_pre.onclick = function() {
    let mySrc = myImage.getAttribute('src');
    index -= 1;
    myImage.setAttribute ('src',ar[index]);
    mySource.innerHTML = ar[index];
    if (index === 0 ){
        switch_pre.classList.add("disabled");
    }
    if (index !== 5){
        switch_nex.classList.remove("disabled");
    }
}
switch_nex.onclick = function() {
    let mySrc = myImage.getAttribute('src');
    index += 1;
    myImage.setAttribute ('src',ar[index]);
    mySource.innerHTML = ar[index];
    if (index === 5 ){
        switch_nex.classList.add("disabled");
    }
    if (index !== 0){
        switch_pre.classList.remove("disabled");
    }
}
