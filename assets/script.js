(function(){
  const urlOfTheDay = 'https://api.nasa.gov/planetary/apod?api_key=5mEjGP3nC3nhRVgEUPXuqhQxeyokBFZ0eGVSXc5S';
  const urlRandom7 = 'https://api.nasa.gov/planetary/apod?api_key=5mEjGP3nC3nhRVgEUPXuqhQxeyokBFZ0eGVSXc5S&count=7';
  const container = document.querySelector('#content');
  let first = true;
  let template = '';

  function loadXMLDoc(url,first) {
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
          const firstClass = first ? ` style="--of-the-day: Picture of the day (${date});"` : '';

          template += `<figure${firstClass}>${media}<figcaption><h4>${date} &#65293; ${title}</h4><p>${explanation}</p></figcaption></figure>`;

          if (first) {
            container.innerHTML = template;
            first = false;
            if (!first) {
              first = true;
              loadXMLDoc(urlRandom7);
            }
          } else if (i == 6) {
            container.appendChild(template);
          }
        });
      }
    };
    xhttp.open('GET', url, true);
    xhttp.send();
  }

  loadXMLDoc(urlOfTheDay,first);
})()
