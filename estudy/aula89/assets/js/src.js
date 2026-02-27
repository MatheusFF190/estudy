// requisição HTTP AJAX
// XMLHttpRequest xhr

const { response } = require("express");

const request = obj =>{
const xhr = new XMLHttpRequest();
// passar qual o tipo da requisição, a url, se é async ou não true ou false
xhr.open(obj.method, obj.url, true);
xhr.send();

xhr.addEventListener('load', ()=>{
  if(xhr.status >= 200 && xhr.status < 300){
    obj.success(xhr.responseText);
  } 
  else{
    obj.error({
      code: xhr.status,
      msg: xhr.statusText
    })
  }
});
}

function carregaPagina(el){
  const href = el.getAttribute('href');
  request({
    method: 'GET',
    url: href,
    success(response){
      carregaResultado(response)
    },
    error(errorText){
      console.log(errorText)
    }
  })
}

function carregaResultado(response){
  const resultado = document.querySelector('.resultado');
  resultado.innerHTML = response
}

document.addEventListener('click', e =>{
  const el = e.target.closest('a');
  if (!el) return;

  e.preventDefault();
  // pegar o nome da tag do elemento
  const tag = el.tagName.toLowerCase();

  if( tag === 'a'){
    carregaPagina(el);
  }
})