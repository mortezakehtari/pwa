const apikey = '2b0f2f81ce354dcfac0b216ed32b66b8';
const main = document.querySelector('#main');
const defaultSource = "aftenposten";

window.addEventListener('load',async e =>{
  'use strict';

 updateNews();
if('serviceWorker' in navigator){
  try{
      navigator.serviceWorker.register('./sw.js')
      console.log(`SW Registered`);
  }
  catch(error){
     console.log(`SW failed`);

  }
}

})
  function updateNews(source = defaultSource){
  // const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apikey}`);
  // const json = await res.json();
  // main.innerHTML = json.articles.map(createArticle).join("\n");
  // fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apikey}`)
  // .then(response => response.json())
  // .then(data => {
  //   main.innerHTML = data.articles.map(createArticle).join("\n")
  // });
            //     $.ajax({
            //         type: "POST",
            //         url: `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apikey}`,
            //         data: "{}",
            //         contentType: "application/json; charset=utf-8",
            //         dataType: "json",
            //         success: OnSuccess,
            //         failure: function (response) {
            //             alert("fail");
            //         },
            //         error: function (response) {
            //             alert("error");
            //         }
            //     });
            // function OnSuccess(response) {
            //     alert(response)
            //     }
            $.getJSON( `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apikey}`, function( data ) {
              var items =[];
              $.each( data, function() {
                main.innerHTML = data.articles.map(createArticle).join("\n")
              });
            })
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
