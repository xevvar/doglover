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
        const dog = {};
        dog.image = main.url;
        breeds.forEach((breed) => {
          // console.log(breed.name);
          if (populatedNames.includes(breed.name)) {

          } else {


            dog.name = breed.name;
            dog.breedFor = breed.bred_for;
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
        
        //populate data of first dog in the generated dropdown
        dogName.textContent = populatedData[0].name;
        dogImage.src = populatedData[0].image;
        dogImage.alt = populatedData[0].name;
        breedGroup.textContent = populatedData[0].breedGroup;
        breedFor.textContent = populatedData[0].breedFor;
        temperament.textContent = populatedData[0].temperament;
        lifespan.textContent = populatedData[0].life_span;

      })

      submitBtn.addEventListener('click', function () {
        dogName.textContent = populatedData[searchDog.value].name;
        dogImage.src = populatedData[searchDog.value].image;
        dogImage.alt = populatedData[searchDog.value].name;
        breedGroup.textContent = populatedData[searchDog.value].breedGroup;
        breedFor.textContent = populatedData[searchDog.value].breedFor;
        temperament.textContent = populatedData[searchDog.value].temperament;
        lifespan.textContent = populatedData[searchDog.value].life_span;

      });

    }).catch(error => console.log('error', error));

  reviewForm.addEventListener('submit', function (event) {
    event.preventDefault();


    const review = document.getElementById('review').value;

    const reviewItem = document.createElement('li');
    reviewItem.innerHTML = `${review}`;

    reviewList.appendChild(reviewItem);
    reviewList.style.display = 'block';

    reviewForm.reset();

  });

});

