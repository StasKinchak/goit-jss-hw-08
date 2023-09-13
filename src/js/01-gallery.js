import { galleryItems } from './gallery-items.js';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');

const markup = galleryItems
    .map(
    ({preview, original, description}) =>
`<li class="gallery__item">
<a class="gallery__link" href="${original}">
<img
class="gallery__image" 
src="${preview}"
alt="${description}"
title="${description}"
data-source="${original}"
/>
</a>
</li>`
)
.join('');

galleryContainer.insertAdjacentHTML('beforeend', markup);
galleryContainer.addEventListener('click', onCardClick);

let instance;

function onCardClick(event) {
    event.preventDefault();

    if (event.target.classList.contains('gallery')) {
        return;
    }

    instance = basicLightbox.create(
        `
        <img src="${event.target.dataset.source}">
        `,
        {
            onShow: instance => {
                document.addEventListener('keydown', modalClose);
            },
            onClose: instance => {
                document.removeEventListener('keydown', modalClose);
            },
        }
    );

    instance.show();

    function modalClose(event) {
        console.log(event.code);
        if (event.code === 'Escape') {
            instance.close();
        };
    };
};