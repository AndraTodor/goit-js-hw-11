import { fetchImages } from './api.js';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');

const onFormSubmit = e => {
  e.preventDefault();
  const query = e.currentTarget.elements.searchQuery.value;
  console.log('Form submitted with query:', query);
  onSearch(query);
};

const onSearch = async query => {
  const images = await fetchImages(query);
  console.log(images);
  renderGallery(images.hits);
};

const renderGallery = images => {
  gallery.innerHTML = ''; // Clear previous results
  const markup = images
    .map(
      ({
        id,
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div id="${id}" class="photo-card">
        <a href="${largeImageURL}" target="_blank">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes: ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views: ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads: ${downloads}</b>
          </p>
        </div>
      </div>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
};

form.addEventListener('submit', onFormSubmit);

console.log('Script loaded');
