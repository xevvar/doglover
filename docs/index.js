document.addEventListener("DOMContentLoaded", function () {
    const baseURL = "https://api.thedogapi.com/";
    const api_key = "live_nYZH9vgM9WHddxXXIubuYxzPBhGJTkiDtZrYsCaZpwtRY3OybQRQ7nEy2t7itEYD";
    const dogName = document.getElementById('dog-name');
    const dogImage = document.getElementById('dog-image');
    const searchDog = document.getElementById('search-dog');


    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("x-api-key", api_key);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};
var link = baseURL + "v1/images/search?format=json&limit=100" 

fetch(link, requestOptions)
  .then(response => response.text())
//   .then(result => console.log(result))
  .then((result) => {
    const resultParsed = JSON.parse(result);
    // console.log(result);

    searchDog.innerHTML = '';
    resultParsed.forEach((main) => {
        const breeds = main.breeds;
        breeds.forEach((breed) => {
            console.log(breed.name);
            
            const opt = document.createElement('option');
        opt.textContent = breed.name;
        searchDog.appendChild(opt);

        })

        

        // li.addEventListener('click', function(){
        //     beerName.textContent = beer.name;
        //     beerImage.src = beer.image_url;
        //     beerImage.alt = beer.name;
        //     beerDescription.textContent = beer.description;
        //     reviewList.innerHTML = '';
        //     beer.reviews.forEach((review) => {
        //         const reviewLi = document.createElement('li');
        //         reviewLi.textContent = review;

        //         reviewList.appendChild(reviewLi);
        //     })

    
        // });

        // beerList.appendChild(li);
    })

})
  .catch(error => console.log('error', error));




    // fetch(`${baseURL}, {headers: {
    //     'x-api-key': `${api_key}`
    //   }}`)
    // .then((response) => response.text);
    // .then(())

//     var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");
// myHeaders.append("x-api-key", "{{YOUR-API-KEY}}");

// var requestOptions = {
//   method: 'GET',
//   headers: myHeaders,
//   redirect: 'follow'




function retrieve(path, id) {
    const endpoint = path;
    if (id !== undefined) {
        endpoint = `${path}/${id}`;
    }
    return fetch(`${baseURL}${endpoint}`, {
        headers: {
            "Content-Type": "appication/json"
        }
    }).then(response => {
        if (response.status == 200) return response.json();
        // throw new Error(response.statusText);
    }).then(result => console.log(result));

}

});








