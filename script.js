(function(){
  const url = 'https://api.nasa.gov/planetary/apod?concept_tags=True&api_key=5mEjGP3nC3nhRVgEUPXuqhQxeyokBFZ0eGVSXc5S';
  const container = document.querySelector('#content');

  // const apod_img_id = document.getElementById('apod_img_id');
  // const apod_vid_id = document.getElementById('apod_vid_id');
  // const reqObject = document.getElementById('reqObject');
  // const returnObject = document.getElementById('returnObject');
  // const apod_explanation = document.getElementById('apod_explanation');
  // const apod_title = document.getElementById('apod_title');

  function loadXMLDoc() {
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let result = JSON.parse(this.response);

        console.log(result);

        // if (result.media_type === 'video') {
        //   apod_img_id.style.display = 'none';
        //   apod_vid_id.src = result.url;
        // } else {
        //   apod_vid_id.style.display = 'none';
        //   apod_img_id.src = result.url;
        // }
        // reqObject.innerText = url;
        // returnObject.innerText = JSON.stringify(result, null, 4);
        // apod_explanation.innerText = result.explanation;
        // apod_title.innerText = result.title;
      }
    };
    xhttp.open('GET', 'https://api.nasa.gov/planetary/apod?concept_tags=True&api_key=5mEjGP3nC3nhRVgEUPXuqhQxeyokBFZ0eGVSXc5S', true);
    xhttp.send();
  }

  loadXMLDoc();
})()
