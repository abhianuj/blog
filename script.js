const navbtn = document.getElementById('navbtn');
const navmain = document.getElementById('navmain');
const overlay = document.getElementById('overlay');
const nav = document.getElementById('nav');
const body = document.querySelector('body');
let i=0;
function navigation() {
    if(i==0){
        nav.style.left = "0vw";
        overlay.style.display= "block";
        i=1;
    } else {
        nav.style.left = "-77vw";
        overlay.style.display= "none";
        i=0;
    }
}
navbtn.addEventListener('click', navigation);
overlay.addEventListener('click', navigation);


//on scroll moto goes away
const moto = document.getElementById('moto');
window.onscroll = function() {
  let scrolled = window.scrollY;
  if(scrolled>48){
    moto.style.opacity = 0;
  }
  else{
    moto.style.opacity = 1;
  }
}

//fetching the blog details
let count = 0;
function addSblogs(){
  fetch('blog.json')
  .then(response => response.json())
  .then(addBlog)
  .catch(e => handleError(e));
  function addBlog(data) {
    for(let prop in data){
      count++;
      addBlogs(data[prop].date,data[prop].tag,data[prop].description,data[prop].logo,data[prop].url,count);
    }
  }
  function handleError(e){
    console.log("Error Occured" + e);
  }

  //adding blogs
  function addBlogs(date,tag,desc,logo,url,count){
    let sblog = document.createElement('div');
    sblog.setAttribute('id', "b" + count);
    sblog.innerHTML = '<div class="left"><div id="date">' + date + '</div><div id="tag">Tags: <span id="s1">'+ tag[0]+ '</span> <span id="s2">' + tag[1] + '</span></div><div id="desc">'+ desc + '</div><a id="url" href=" '+ url +' ">Read...</a></div><div class="right"><img id="logo" src=" ' + logo + ' " /></div>';
    body.appendChild(sblog);
  }
}

addSblogs();

//displaying the actual blog whwn read is clicked
let target = '';
body.addEventListener('click', function(e) {
  if(e.target.id == "url"){
    //preventing default action of anchor tag
    e.preventDefault();
    //adding main content of blogs
    target = e.target.parentElement.parentElement.id;
    console.log(target);
    //removing small blogs from page
    while(count!=0){
      if(count!=target.charAt(1)){
        sblog = document.getElementById('b'+count);
        body.removeChild(sblog);
      }
      count--;
    }
    mblog(e.target.href);
  }
});

function mblog(url) {
  //fetching the main blog
  fetch(url)
  .then(response => response.json())
  .then(addMblog)
  .catch(e => handleError(e));

  //converting sblog to mblog
  const b = document.getElementById(target);
  const right = document.querySelector('.right');
  right.innerHTML = "";
  const descrption = document.querySelector("#desc");
  description.innerHTML = "";
  b.setAttribute('id','mblog');

  //function to add the content of the main blogs
  function addMblog(data) {
    b.innerHTML = '<div id="date">' + data.date + '</div><div id="tag">Tags: <span id="s1">' + data.tag[0] + '</span> <span id="s2">' + data.tag[1] + '</span></div><div id="mcontent">' + data.content + '</div></br><a href="" id="back">Back...</a>';

    //back button
    const back = document.getElementById('back');
    back.addEventListener('click', function() {
      body.removeChild(b);
      addSblogs();
    })

    //topic displayed
    const moto = document.getElementById('moto');
    moto.textContent = data.topic;
  }
}
