document.addEventListener("DOMContentLoaded", function () {
  const baseURL = "https://api.thedogapi.com/";
  const api_key = "live_nYZH9vgM9WHddxXXIubuYxzPBhGJTkiDtZrYsCaZpwtRY3OybQRQ7nEy2t7itEYD";
  const dogName = document.getElementById('dog-name');
  const dogImage = document.getElementById('dog-image');
  const searchDog = document.getElementById('search-dog');
  const submitBtn = document.getElementById('submitBtn');
  const reviewList = document.getElementById('review-list');
  const reviewForm = document.getElementById('review-form');
  const breedGroup = document.getElementById('breed-group');
  const breedFor = document.getElementById('breed-for');
  const temperament = document.getElementById('temperament');
  const lifespan = document.getElementById('lifespan');




  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("x-api-key", api_key);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  var link = baseURL + "v1/images/search?format=json&limit=100"
  const populatedNames = [];
  const populatedData = [];
  fetch(link, requestOptions)
    .then(response => response.text())
    //   .then(result => console.log(result))
    .then((result) => {
      const resultParsed = JSON.parse(result);
      // console.log(result);

      searchDog.innerHTML = '';
      resultParsed.forEach((main) => {
        const breeds = main.breeds;
        var dog = {};
        dog.image = main.url;
        breeds.forEach((breed) => {
          console.log(breed.name);
          if (populatedNames.includes(breed.name)) {

          } else {

          
            dog.name = breed.name;
            dog.breedFor = breed.bred_for;
            

            console.log(breed.url);
            dog.temperament = breed.temperament;
            dog.life_span = breed.life_span;
            dog.breedGroup = breed.breed_group;

            populatedData.push(dog);

            const opt = document.createElement('option');
            opt.textContent = breed.name;
            opt.value = populatedData.length - 1;
            searchDog.appendChild(opt);
            populatedNames.push(breed.name);
          }

        })
      })
      
      submitBtn.addEventListener('click', function () {
        dogName.textContent = populatedData[searchDog.value].name;
        console.log(populatedData[searchDog.value].image);
        dogImage.src = populatedData[searchDog.value].image;
        dogImage.alt = populatedData[searchDog.value].name;
        breedGroup.textContent = populatedData[searchDog.value].breed_group;
        breedFor.textContent = populatedData[searchDog.value].bred_for;
        temperament.textContent = populatedData[searchDog.value].temperament;
        lifespan.textContent = populatedData[searchDog.value].life_span;




/*
        fetch(link, requestOptions)
          .then(response => response.text())
          .then((result) => {
            const resultParsed = JSON.parse(result);
            breedGroup.innerHTML = '';
            breedFor.innerHTML = '';
            lifespan.innerHTML = '';
            temperament.innerHTML = '';
            resultParsed.forEach((main) => {
              const breeds = main.breeds;

              breeds.forEach((breed) => {
                if (breed.name == searchDog.value) {
                  dogImage.src = breed.url;
                  dogImage.alt = breed.name;
                  breedGroup.textContent = breed.breed_group;
                  breedFor.textContent = breed.bred_for;
                  temperament.textContent = breed.temperament;
                  lifespan.textContent = breed.life_span;
                }
              })
            })
          })
          */

        //     beerImage.src = beer.image_url;
        //     beerImage.alt = beer.name;
        //     beerDescription.textContent = beer.description;

        //     beer.reviews.forEach((review) => {
        //         

        //         
        //     })

      });

      // reviewList.innerHTML = '';
      // const reviewLi = document.createElement('li');
      // reviewLi.textContent = review;
      // reviewList.appendChild(reviewLi);



    }).catch(error => console.log('error', error));

  reviewForm.addEventListener('submit', function (event) {
    event.preventDefault();


    const review = document.getElementById('review').value;

    const reviewItem = document.createElement('li');
    reviewItem.innerHTML = `${review}`;

    reviewList.appendChild(reviewItem);

    reviewForm.reset();

  });

});

