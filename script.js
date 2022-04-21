"use srict";
document.addEventListener("DOMContentLoaded", function () {
  const hamb = document.querySelector("#hamb");
  const popup = document.querySelector("#popup");
  const menu = document.querySelector("#menu").cloneNode(1);
  const body = document.body;
  const links = Array.from(menu.children);

  hamb.addEventListener("click", hambHandler);

  function hambHandler(e) {
    e.preventDefault();
    popup.classList.toggle("open");
    hamb.classList.toggle("active");
    body.classList.toggle("noscroll");
    renderPopap();
  }

  function renderPopap() {
    popup.appendChild(menu);
  }

  links.forEach((link) => {
    link.addEventListener("click", closeOnClick);
  });

  function closeOnClick() {
    popup.classList.remove("open");
    hamb.classList.remove("active");
    body.classList.remove("noscroll");
  }

  //Работа с формой
  const form = document.querySelector(".header__form");
  const btnModalClouse = document.querySelector(".madal-window__btn-clouse");
  const modal = document.querySelector(".modal-window");
  const btnModalOpen = document.querySelector(".header-title__button");
  form.addEventListener("submit", formSend);
  btnModalClouse.addEventListener("click", () => {
    modal.classList.add("none");
  });
  btnModalOpen.addEventListener("click", () => {
    modal.classList.remove("none");
  });

  async function formSend(e) {
    e.preventDefault();
    let error = formValidate(form);

    if (error === 0) {
      modal.classList.add('sending')
      const modalForm = document.querySelector(".modal-content");
      const modalResult = document.querySelector(".modal-content__result");
      const btnSendForm = document.querySelector(".btn__form");
      const inputs = document.querySelectorAll(".required");

      if (modalResult.classList.contains("none")) {
        modalResult.classList.remove("none");
        modalForm.classList.add("none");

        btnSendForm.addEventListener("click", () => {
          modalResult.classList.add("none");
          modalForm.classList.remove("none");
        });

        btnModalClouse.addEventListener("click", () => {
          modalResult.classList.add("none");
          modalForm.classList.remove("none");
          clearInput(inputs);
        });
      }
      let formData = new FormData(form)
      let responce = await fetch('sendmail.php' ,{
        method: 'POST',
        body: formData
      })
      if(responce.ok){
        let result =await responce.json()
        console.log(result.message);
        form.reset()
        modal.classList.remove('sending')
        
      }else{
        console.error('error server');
        modal.classList.remove('sending')
      }
    } 
  }
  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll(".required");
    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);
      if (input.classList.contains("email")) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else {
        if (input.value === "") {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }

  function formAddError(input) {
    input.parentElement.classList.add("error");
    input.classList.add("error");
  }
  function formRemoveError(input) {
    input.parentElement.classList.remove("error");
    input.classList.remove("error");
  }
  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }
  function clearInput(inputs) {
    inputs.forEach((item) => {
      item.value = "";
      return;
    });
  }
});
