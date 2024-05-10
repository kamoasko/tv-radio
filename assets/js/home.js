"use strict"

// form selects open

const responseSelects = document.querySelectorAll(".rff");

responseSelects.forEach((select) => {
  select.addEventListener("click", (e) => {
    // Close any previously opened options
    responseSelects.forEach((s) => {
      if (s !== e.currentTarget && s.classList.contains("active")) {
        s.classList.remove("active");
      }
    });

    // Toggle the "active" class for the clicked option
    e.currentTarget.classList.toggle("active");
  });

  const options = select.querySelector(".response__form-options");
  const selectedOptionText = select.querySelector(".selected > span");

  options.addEventListener("click", (e) => {
    if (e.target.classList.contains("flex-center")) {
      const optionText = e.target.textContent.trim();
      selectedOptionText.textContent = optionText;
    }
  });
});

// send response

const formBtn = document.getElementById("form_btn");
const backdrop = document.querySelector(".backdrop");
const closeBtn = document.querySelector(".modal__close");

function sendResponse() {
  formBtn.addEventListener("click", () => {
    backdrop.classList.add("opened");
  });
}

function closeModal() {
  backdrop.classList.remove("opened");
}

closeBtn.addEventListener("click", closeModal);
