const apikey = '2b0f2f81ce354dcfac0b216ed32b66b8';
const main = document.querySelector('#main');
const defaultSource = "aftenposten";

window.addEventListener('load',async e =>{
  'use strict';

 updateNews();
if('serviceWorker' in navigator){
  try{
      navigator.serviceWorker.register('./sw.js')
      console.log(`SW Registered`)
  }
  catch(error){
     console.log(`SW failed`)

  }
}

})

 async function updateNews(source = defaultSource){
  const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apikey}`);
  alert(res);
  const json = await res.json();
  alert(json)
  main.innerHTML = json.articles.map(createArticle).join("\n")
  
}


function createArticle(article){
  return `
  <div class = "article">
      <a href="${article.url}">
          <h2>${article.title}</h2>
          <img src="${article.urlToImage}" alt="${article.title}">
          <p>${article.description}</p>
      </a>
  </div>
  `;
};
