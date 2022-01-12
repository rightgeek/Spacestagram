(function(){
  const urlOfTheDay = 'https://api.nasa.gov/planetary/apod?api_key=5mEjGP3nC3nhRVgEUPXuqhQxeyokBFZ0eGVSXc5S';
  const urlRandom7 = 'https://api.nasa.gov/planetary/apod?api_key=5mEjGP3nC3nhRVgEUPXuqhQxeyokBFZ0eGVSXc5S&count=7';
  const container = document.querySelector('#content');
  let first = true;
  let template = '';
  let search = false;

  loadXMLDoc(urlOfTheDay);

  function seachImage () {
    event.preventDefault();
    const urlOfDate = `https://api.nasa.gov/planetary/apod?api_key=5mEjGP3nC3nhRVgEUPXuqhQxeyokBFZ0eGVSXc5S&date=${document.querySelector('#date').value}`;
    search = true;
    first = false;
    console.log(`https://api.nasa.gov/planetary/apod?api_key=5mEjGP3nC3nhRVgEUPXuqhQxeyokBFZ0eGVSXc5S&date=${document.querySelector('#date').value}`);
    loadXMLDoc(urlOfDate);
  }

  function loadXMLDoc(url) {
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let result = JSON.parse(this.response);

        if (first) {
          const title = result.title;
          const explanation = result.explanation;
          const date = result.date;
          const mediaUrl = result.url;
          const media = (result.media_type === 'video') ? `<iframe src="${mediaUrl}" alt="${title}" type="text/html"></iframe>` : `<img src="${mediaUrl}" alt="${title}">`;
          const firstClass = ` style="--of-the-day: 'Picture of the day (${date})';"`;

          template += `<div id="firstClass"><figure${firstClass}>${media}<figcaption><h4>${date} &#65293; ${title}</h4><p>${explanation}</p></figcaption></figure></div><div id="randomSeven"></div>`;

          container.innerHTML = template;
          first = false;

          if (!first) {
            loadXMLDoc(urlRandom7);
          }
        } else if (!search) {
          template = '';
          const container2 = document.querySelector('#randomSeven');

          result.forEach((item, i) => {
            const title = item.title;
            const explanation = item.explanation;
            const date = item.date;
            const mediaUrl = item.url;
            const media = (item.media_type === 'video') ? `<iframe src="${mediaUrl}" alt="${title}" type="text/html"></iframe>` : `<img src="${mediaUrl}" alt="${title}">`;

            template += `<figure>${media}<figcaption><h4>${date} &#65293; ${title}</h4><p>${explanation}</p></figcaption></figure>`;

            if (i == 6) {
              container2.innerHTML = template;
            }
          });
        } else if (search) {
          search = false;
          template = '';
          const container3 = document.querySelector('#firstClass');

          const title = result.title;
          const explanation = result.explanation;
          const date = result.date;
          const mediaUrl = result.url;
          const media = (result.media_type === 'video') ? `<iframe src="${mediaUrl}" alt="${title}" type="text/html"></iframe>` : `<img src="${mediaUrl}" alt="${title}">`;
          const firstClass = ` style="--of-the-day: 'Picture of your searched date (${date})';"`;

          template += `<figure${firstClass}>${media}<figcaption><h4>${date} &#65293; ${title}</h4><p>${explanation}</p></figcaption></figure>`;

          container3.innerHTML = template;
        }
      }
    };
    xhttp.open('GET', url, true);
    xhttp.send();
  }
})()
