  //contact form
  const form = document.getElementById('contact-form');

  form.addEventListener('submit', formSend);

  function formSend(e) {
     

      let error = formValidate(form);
      let formData = new FormData(form);

      if (error === 0) {
          form.classList.add('_sending');

          fetch(form.getAttribute('action'), {
                  method: 'POST',
                  body: formData
              })
              .then(response => {
                  if (response.ok) {
                      form.reset();
                      form.classList.remove('_sending');
                  } else {
                      alert('Error submitting the form');
                      form.classList.remove('_sending');
                  }
              })
              .catch(error => {
                  console.error('Error during form submission:', error);
                  alert('Error submitting the form');
                  form.classList.remove('_sending');
              });
      } else {
          alert('Fill in all required fields');
      }
  }

  function formValidate(form) {
      let error = 0;
      let formReq = document.querySelectorAll('._req');
      let atLeastOneCheckboxChecked = false;

      for (let index = 0; index < formReq.length; index++) {
          const input = formReq[index];

          if (input.type === 'checkbox') {
              if (input.checked) {
                  atLeastOneCheckboxChecked = true;
              }
          } else {
              if (input.classList.contains('_email')) {
                  if (emailTest(input)) {
                      formAddError(input);
                      error++;
                  }
              } else {
                  if (input.value === '') {
                      formAddError(input);
                      error++;
                  }
              }
          }
      }

      if (!atLeastOneCheckboxChecked) {
          error++;
      }

      return error;
  }

  function formAddError(input) {
      input.parentElement.classList.add('_error');
      input.classList.add('_error');
  }

  function formRemoveError(input) {
      input.parentElement.classList.remove('_error');
      input.classList.remove('_error');
  }

  function emailTest(input) {
      return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }