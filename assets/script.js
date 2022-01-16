const urlOfTheDay = 'https://api.nasa.gov/planetary/apod?api_key=5mEjGP3nC3nhRVgEUPXuqhQxeyokBFZ0eGVSXc5S';
const urlRandom7 = 'https://api.nasa.gov/planetary/apod?api_key=5mEjGP3nC3nhRVgEUPXuqhQxeyokBFZ0eGVSXc5S&count=7';
const container = document.querySelector('#content');
let first = true;
let template = '';
let search = false;
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
const heartColor = (favorites.length > 0) ? function() {
  document.querySelector('.favorites').classList.add('content');
} : function() {
  document.querySelector('.favorites').classList.remove('content');
};

(function(){
  anyLikes();
  loadXMLDoc(urlOfTheDay);
})()

function loadXMLDoc(url) {
  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      document.querySelector('.errorMessage').style.display = 'none';
      let result = JSON.parse(this.response);

      if (first) {
        const title = result.title;
        const explanation = result.explanation;
        const date = result.date;
        const mediaUrl = result.url;
        const mediaType = result.media_type;
        const media = (mediaType === 'video') ? `<iframe id="ytplayer" type="text/html" width="640" height="360" src="${mediaUrl}" frameborder="0" alt="${title}"></iframe>` : `<img src="${mediaUrl}" alt="${title}">`;
        const firstClass = ` style="--of-the-day: 'Picture of the day (${date})';"`;

        template += `<div id="firstClass"><figure${firstClass}>${media}<figcaption><h4>${date} &#65293; ${title}</h4><p>${explanation}</p><div class="loveWrapper"><i class="love" id="${date}" data-media="${mediaUrl}" data-type="${mediaType}" data-title="${title}" data-explanation="${explanation}" title="Add to likes"></i><span>liked!</span></div></figcaption></figure></div><div id="randomSeven"></div>`;

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
          const mediaType = item.media_type;
          const media = (mediaType === 'video') ? `<iframe id="ytplayer" type="text/html" width="640" height="360" src="${mediaUrl}" frameborder="0" alt="${title}"></iframe>` : `<img src="${mediaUrl}" alt="${title}">`;

          template += `<figure>${media}<figcaption><h4>${date} &#65293; ${title}</h4><p>${explanation}</p><div class="loveWrapper"><i class="love" id="${date}" data-media="${mediaUrl}" data-type="${mediaType}" data-title="${title}" data-explanation="${explanation}" title="Add to likes"></i><span>liked!</span></div></figcaption></figure>`;

          if (i == 6) {
            container2.innerHTML = template;
            likeImage();
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
        const mediaType = result.media_type;
        const media = (mediaType === 'video') ? `<iframe id="ytplayer" type="text/html" width="640" height="360" src="${mediaUrl}" frameborder="0" alt="${title}"></iframe>` : `<img src="${mediaUrl}" alt="${title}">`;
        const firstClass = ` style="--of-the-day: 'Picture of your date &#65293; ${date}';"`;

        template += `<figure${firstClass}>${media}<figcaption><h4>${date} &#65293; ${title}</h4><p>${explanation}</p><div class="loveWrapper"><i class="love" id="${date}" data-media="${mediaUrl}" data-type="${mediaType}" data-title="${title}" data-explanation="${explanation}" title="Add to likes"></i><span>liked!</span></div></figcaption></figure>`;

        container3.innerHTML = template;
        likeImage();

        document.querySelector('#randomSeven').style.opacity = 0;
        setTimeout(function(){
          document.querySelector('#randomSeven').style.display = 'none';
        },300);
      }
    } else if (this.status === 400) {
      document.querySelector('.errorMessage').style.display = 'block';
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function anyLikes() {
  const likes =  document.querySelector('.favorites');
  likes.setAttribute("style",`--data-count: '${favorites.length}';`);

  if (favorites.length > 0) {
    likes.classList.remove('empty');
  } else {
    likes.classList.add('empty');
  }
}

function renderLikes() {
  if (favorites.length > 0) {

    container.innerHTML = '<div class="loading-overlay__spinner"><svg aria-hidden="true" focusable="false" role="presentation" class="spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle class="path" fill="none" stroke-width="6" cx="33" cy="33" r="30"></circle></svg></div>';

    template = '';
    let num = 1;

    favorites.forEach((item, i) => {
      const title = item.title;
      const explanation = item.explanation;
      const date = item.id;
      const mediaUrl = item.media;
      const mediaType = item.type;
      const media = (mediaType === 'video') ? `<iframe id="ytplayer" type="text/html" width="640" height="360" src="${mediaUrl}" frameborder="0" alt="${title}"></iframe>` : `<img src="${mediaUrl}" alt="${title}">`;
      const firstClass = (i == 0) ? ` style="--of-the-day: 'Your likes';"` : '';

      num += i;
      template += `<figure${firstClass}>${media}<figcaption><h4>${date} &#65293; ${title}</h4><p>${explanation}</p><div class="loveWrapper"><i class="love press" id="${date}" data-media="${mediaUrl}" data-type="${mediaType}" data-title="${title}" data-explanation="${explanation}" title="Add to likes"></i><span>liked!</span></div></figcaption></figure>`;

      setTimeout(function(){
        if (num == favorites.length) {
          container.innerHTML = template;
          likeImage();
        }
      }, 2000);
    });

  } else {
    return;
  }
}

function likeImage() {
  document.querySelectorAll( '.love' ).forEach((like, i) => {

    const thisId = like.getAttribute('id');
    // const thisIndex = favorites.indexOf(thisId);
    const thisIndex = favorites.findIndex(function (favorite) {
      return favorite.id === thisId;
    });

    if (thisIndex >= 0) {
      like.classList.add('press');
    }

    like.addEventListener('click', function(e) {
      for (let sibling of this.parentNode.children) {
        sibling.classList.toggle('press');
      }

      const like = {
        id: this.getAttribute('id'),
        title: this.dataset.title,
        media: this.dataset.media,
        type: this.dataset.type,
        explanation: this.dataset.explanation
      };

      // const index = favorites.indexOf(id);

      const index = favorites.findIndex(function (favorite) {
        return favorite.id === like.id;
      });

      if (!like) return;

      if (index == -1) {
        favorites.push(like);
      } else {
        favorites.splice(index, 1);
      }

      localStorage.setItem('favorites', JSON.stringify(favorites));
      // document.querySelector('.favorites').removeAttribute('style');
      anyLikes();
    })
  });
}

function seachImage() {
  event.preventDefault();
  const urlOfDate = `https://api.nasa.gov/planetary/apod?api_key=5mEjGP3nC3nhRVgEUPXuqhQxeyokBFZ0eGVSXc5S&date=${document.querySelector('#date').value}`;
  search = true;
  first = false;
  loadXMLDoc(urlOfDate);
}
