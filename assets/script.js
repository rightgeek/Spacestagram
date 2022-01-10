(function(){
  const url = 'https://api.nasa.gov/planetary/apod?api_key=5mEjGP3nC3nhRVgEUPXuqhQxeyokBFZ0eGVSXc5S&count=7';
  const container = document.querySelector('#content');
  let template = '';

  function loadXMLDoc() {
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let result = JSON.parse(this.response);

        result.forEach((item, i) => {
          const title = item.title;
          const explanation = item.explanation;
          const date = item.date;
          const mediaUrl = item.url;
          const media = (item.media_type === 'video') ? `<iframe src="${mediaUrl}" alt="${title}" type="text/html"></iframe>` : `<img src="${mediaUrl}" alt="${title}">`;

          template += `<figure>${media}<figcaption><h4>${date} - ${title}</h4><p>${explanation}</p></figcaption></figure>`;

          if (i == 6) {
            container.innerHTML = template;
            console.log(template);
          }
        });
      }
    };
    xhttp.open('GET', url, true);
    xhttp.send();
  }

  loadXMLDoc();
})()
