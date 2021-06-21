import myExport from "./gallery-items.js";

const galleryList = document.querySelector('.js-gallery');
const modalWindow = document.querySelector('.js-lightbox');
const modalWindowCloseBtnEl = document.querySelector('.lightbox__button');
const lightboxOverlay = document.querySelector('.lightbox__overlay');
const bigImage = document.querySelector('.lightbox__image');

let index = 0;
let originalImagesArray = [];
const images = myExport.map((image) => {
    const listItemEl = document.createElement('li');
    const linkEl = document.createElement('a');
    const imgEl = document.createElement('img');
    listItemEl.classList.add('gallery__item');
    linkEl.classList.add('gallery__link');
    linkEl.href = image.original;
    linkEl.setAttribute("data-index", index += 1);
    imgEl.classList.add('gallery__image');
    imgEl.src = image.preview;
    imgEl.alt = image.description;
    originalImagesArray.push(image.original);
  
    linkEl.appendChild(imgEl);
  listItemEl.appendChild(linkEl);
  return listItemEl;
  });
galleryList.append(...images);
console.log(galleryList);

galleryList.addEventListener("click", onImageClick);

function onImageClick(event) {
  event.preventDefault();
  lightboxOverlay.addEventListener('click', closeTheOverlay);
  modalWindowCloseBtnEl.addEventListener('click', closeTheOverlay);
  document.addEventListener('keydown', isButtonPushed);
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  modalWindow.classList.add('is-open');
  bigImage.src = event.target.closest('.gallery__link').href;
  bigImage.alt = event.target.alt;
  console.log(modalWindow);
  console.log(event.target);
  console.log(bigImage);
};

function closeTheOverlay(event) {
  if (modalWindow.classList.contains('is-open')) {
  modalWindow.classList.remove('is-open');
  bigImage.src = '';
  lightboxOverlay.removeEventListener("click", closeTheOverlay);
  modalWindowCloseBtnEl.removeEventListener("click", closeTheOverlay);
  document.addEventListener('keydown', isButtonPushed);
  console.log(bigImage); 
  }
};

function isButtonPushed(event) {
  if (event.key == 'Escape') {
    closeTheOverlay();
  } else if (event.key == 'ArrowLeft') {
    const prerviousImageIndex = originalImagesArray.indexOf(bigImage.src) - 1;
    bigImage.src = originalImagesArray[prerviousImageIndex];
  } else if (event.key == 'ArrowRight') {
    const nextImageIndex = originalImagesArray.indexOf(bigImage.src) + 1;
    bigImage.src = originalImagesArray[nextImageIndex];
  }
};