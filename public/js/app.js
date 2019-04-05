const weatherForm = document.querySelector('form')
const search = document.querySelector('input');
const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');
const weather = document.querySelector('#weather');
const about = document.querySelector('#about');
const help = document.querySelector('#help');


weather.className = "underlined";
if(window.location.pathname === "/"){
  weather.className = "underlined";
  about.className = "";
  help.className = "";
}else if(window.location.pathname === "/about"){
  weather.className = "";
  about.className = "underlined";
  help.className = "";
} else if(window.location.pathname === "/help"){
  weather.className = "";
  about.className = "";
  help.className = "underlined";
}


if(window.location.pathname === "/"){
weatherForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  const location = search.value
  fetch('/weather?address=' + location).then((response)=>{
  response.json().then((data)=>{
    if(data.error){
      messageOne.textContent = data.error
      messageTwo.textContent = ''
      
    }else {
      messageOne.textContent = data.location
      messageTwo.textContent = data.forecast

    }
    
  })
})
})
}
