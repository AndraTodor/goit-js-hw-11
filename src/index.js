import { fetchImages } from './api.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');

let page = 1;
let query = '';
let lightbox;

const onFormSubmit = e => {
  e.preventDefault();
  query = e.currentTarget.elements.searchQuery.value;
  console.log('Form submitted with query:', query);
  page = 1; // Reset page to 1 for a new search
  onSearch(query);
};

const onSearch = async query => {
  const images = await fetchImages(query, page); // Pass the current page
  console.log(images);
  renderGallery(images.hits, true); // Clear previous results for a new search
  if (images.hits.length < 20) {
    loadMoreButton.style.display = 'none'; // Hide the buuton if there are no more images to load
  } else {
    loadMoreButton.style.display = 'block'; //show the button
  }
  if (images.totalHits > 0) {
    Notify.success(`Hooray! We found ${images.totalHits} images.`);
  } else {
    Notify.failure('Sorry, no images found. Please try again.');
  }
  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('.gallery a');
  }
};

const loadMore = async () => {
  page++;
  const images = await fetchImages(query, page);
  renderGallery(images.hits, false); // Append new results to the gallery
  if (images.hits.length < 20) {
    loadMoreButton.style.display = 'none'; // Hide the button if there are no more images
  }
  if (lightbox) {
    lightbox.refresh();
  }
};

const renderGallery = (images, reset) => {
  if (reset) {
    gallery.innerHTML = ''; // Clear previous results only if it's a new search
  }
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
loadMoreButton.addEventListener('click', loadMore);
