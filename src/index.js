import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import 'slim-select/dist/slimselect.css';
import SlimSelect from 'slim-select'
import { Report } from 'notiflix/build/notiflix-report-aio';
    
const ref = {
  select: document.querySelector(".breed-select"),
  catInfo: document.querySelector(".cat-info"),
  error: document.querySelector(".error"),
  loader: document.querySelector(".loader"),
};

document.addEventListener("DOMContentLoaded", () => { 
    ref.error.style.display = 'none';
    function listSelectOptionsBreed() {
    ref.loader.style.display = 'block';
        fetchBreeds()
            .then(breeds => {
                addNewOptionsInSelect(breeds);
        })
            .catch((err) => {
                console.log(err);
                Report.failure('Oops! Something went wrong!', 'Try reloading the page!','Okay',);
            })
        .finally(() => ref.loader.style.display = 'none')
    };

    function updateInfoOfCat(selectedBreedId) {
        ref.loader.style.display = 'block';
        fetchCatByBreed(selectedBreedId)
            .then(dataCat => {
            createMarkupOfBreeds(dataCat)
            ref.catInfo.style.display = 'block';
        })
        .catch((err) => { console.log(err) })
            .finally(() => { ref.loader.style.display = 'none'; });

    }
    
    listSelectOptionsBreed();

    ref.select.addEventListener("change", () => {
        const selectedBreedId = ref.select.value;
        updateInfoOfCat(selectedBreedId);
    });

});

function addNewOptionsInSelect(CatBreeds) {
    const optionArr = CatBreeds.map((breed) => {
            const option = document.createElement("option");
            option.value = breed.id;
            option.textContent = breed.name;
            return option
            })
            ref.select.append(...optionArr)
            new SlimSelect({
                select: ref.select,
            }); 
}

function createMarkupOfBreeds(cats) {
    const cat = cats[0];
            ref.catInfo.innerHTML = `
            <img src="${cat.url}" alt="cat">
            <h2>${cat.breeds[0].name}</h2>
            <p>${cat.breeds[0].description}</p>
            <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>`;
}