import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(onFormInput), 500);
form.addEventListener('submit', onFormSubmit);
window.addEventListener('load', saveData);

function saveData() {
  if (localStorage.getItem('feedback-form-state')) {
    form.elements.email.value =
      JSON.parse(localStorage.getItem('feedback-form-state')).email ?? '';
    form.elements.message.value =
      JSON.parse(localStorage.getItem('feedback-form-state')).message ?? '';
  }
}

// const formValues = {};

function onFormInput() {
  // console.log(event.target);
  // formValues[event.target.name] = event.target.value;

  const email = form.elements.email.value;
  const message = form.elements.message.value;

  const formValues = {
    email,
    message,
  };

  localStorage.setItem('feedback-form-state', JSON.stringify(formValues));
}

function onFormSubmit(event) {
  event.preventDefault();

  if (
    !form.elements.email.value.length ||
    !form.elements.message.value.length
  ) {
    alert('All fields must be filled!');
  } else {
    const object = localStorage.getItem('feedback-form-state');
    form.reset();
    console.log(JSON.parse(object));
  }

  localStorage.removeItem('feedback-form-state');
}
