"use strict";

const formBtn = document.getElementById("form_btn");
const backdrop = document.querySelector(".backdrop");
const closeBtn = document.querySelector(".modal__close");
const footer = document.querySelector("footer");
const htmlLang = document.querySelector("html").lang;

function closeModal() {
  backdrop.classList.remove("opened");
}

closeBtn.addEventListener("click", closeModal);

// Function to get form values
const formValues = [];
let formData;
function getFormValues() {
  const forms = document.querySelectorAll(".form_data");

  forms.forEach((form) => {
    // console.log(form)
    const company = form.querySelector('input[name="company"]')?.value;
    const product = form.querySelector('input[name="product"]')?.value;
    const adType = form.querySelector(".rff .selected > span")?.textContent;
    const channels = [...form.querySelectorAll("#channels input:checked")]?.map(
      (checkbox) => checkbox.value
    );
    const otherTiming =
      form.querySelector('.rfo input[name="otherTiming"]')?.value + " saniyə" ||
      null;
    const timing = [...form.querySelectorAll("#timing input:checked")]?.map(
      (checkbox) => checkbox.value
    );
    otherTiming !== " saniyə" ? timing.push(otherTiming) : "";
    const period = form.querySelector('input[name="period"]')?.value;
    const budget = form.querySelector('input[name="badge"]')?.value;

    formData = {
      company,
      product,
      adType,
      channels,
      timing,
      period,
      budget,
    };

    formValues.push(formData);
  });

  return formValues;
}

// Function to validate form inputs
function validateForm() {
  let isValid = true;
  const inputs = document.querySelectorAll('.form_data input[type="text"]');
  inputs.forEach((input) => {
    const errorSpan = input.parentElement?.querySelector(".error-message");
    if (!input.value && input.type !== "checkbox") {
      isValid = false;
      switch (htmlLang) {
        case "az":
          errorSpan.textContent = "Zəhmət olmazsa inputu doldurun!";
          break;

        case "en":
          errorSpan.textContent = "Please fill input!";

          break;

        case "ru":
          errorSpan.textContent = "Пожалуйста, заполните данные!";

          break;
        default:
          errorSpan.textContent = "Please fill input!";
          break;
      }
      errorSpan.style.display = "block";
    } else {
      errorSpan.style.display = "none";
    }
  });

  // Check if at least one checkbox is selected in each group
  const checkboxGroups = document.querySelectorAll(
    ".response__form-field.rff, .response__form-field.rfo"
  );
  checkboxGroups.forEach((group) => {
    const checkboxes = group.querySelectorAll('input[type="checkbox"]');
    const otherTimingInput = group.querySelector('.rfo1 input[type="number"]');
    const errorSpan = group.querySelector(".error-message");

    const isOtherTimingFilled =
      otherTimingInput && otherTimingInput.value.trim() !== "";

    if (
      checkboxes.length > 0 &&
      !Array.from(checkboxes).some((checkbox) => checkbox.checked) &&
      !isOtherTimingFilled
    ) {
      isValid = false;
      if (!errorSpan) {
        const error = document.createElement("span");
        error.className = "error-message";
        error.textContent = "Please select at least one option";
        group.appendChild(error);
      } else {
        switch (htmlLang) {
          case "az":
            errorSpan.textContent = "Zəhmət olmazsa, ən azı bir variant seçin!";
            break;

          case "en":
            errorSpan.textContent = "Please select at least one option!";

            break;

          case "ru":
            errorSpan.textContent =
              "Пожалуйста, выберите хотя бы один вариант!";

            break;
          default:
            errorSpan.textContent = "Please select at least one option!";
            break;
        }
        errorSpan.style.display = "block";
      }
    } else if (errorSpan) {
      errorSpan.style.display = "none";
    }
  });

  // Check if the dropdown in .rff has a selected option
  const dropdownGroups = document.querySelectorAll(".response__form-field.rff");
  dropdownGroups.forEach((group) => {
    if (!group.querySelector('input[type="checkbox"]')) {
      const selectedOption =
        group.querySelector(".selected > span")?.textContent;
      const errorSpan =
        group.querySelector(".error-message") || document.createElement("span");
      errorSpan.className = "error-message";

      if (selectedOption == "Reklamın tipi" || selectedOption == "Ad type") {
        isValid = false;
        switch (htmlLang) {
          case "az":
            errorSpan.textContent = "Zəhmət olmazsa, ən azı bir variant seçin!";
            break;

          case "en":
            errorSpan.textContent = "Please select at least one option!";

            break;

          case "ru":
            errorSpan.textContent =
              "Пожалуйста, выберите хотя бы один вариант!";

            break;
          default:
            errorSpan.textContent = "Please select at least one option!";
            break;
        }
        if (!group.contains(errorSpan)) {
          group.appendChild(errorSpan);
        }
        errorSpan.style.display = "block";
      } else {
        errorSpan.style.display = "none";
      }
    }
  });

  return isValid;
}

// Event listener for form button
formBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (validateForm()) {
    backdrop.classList.add("opened");
    getFormValues();
  }
});

const modalSendBtn = document.querySelector(".modal__form-btn");

function getFormModalValues() {
  const modalInputs = document.querySelectorAll(".modal__form-input > input");
  let isFormValid = true;

  modalInputs.forEach((input) => {
    const errorSpan = input.parentElement?.querySelector(".error-message");
    if (!input.value) {
      isFormValid = false;
      switch (htmlLang) {
        case "az":
          errorSpan.textContent = "Zəhmət olmazsa inputu doldurun!";
          break;

        case "en":
          errorSpan.textContent = "Please fill input!";
          break;

        case "ru":
          errorSpan.textContent = "Пожалуйста, заполните данные!";
          break;
        default:
          errorSpan.textContent = "Please fill input!";
          break;
      }
      errorSpan.style.display = "block";
    } else {
      errorSpan.style.display = "none";
    }
  });

  if (isFormValid) {
    const relatedPerson = document.querySelector(
      ".modal__form-input > input[name='name']"
    ).value;
    const phone = document.querySelector(
      ".modal__form-input > input[name='tel']"
    ).value;
    const email = document.querySelector(
      ".modal__form-input > input[name='email']"
    ).value;

    const allFormValues = {
      relatedPerson,
      phone,
      email,
      formDatas: formValues,
    };
    console.log(allFormValues);

    async function postFormValues() {
      try {
        const res = await fetch("https://tvradio.coder.az/api/mail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(allFormValues),
        });

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await res.json();
        const modal = document.querySelector(".modal");

        if (responseData.success) {
          modal.classList.add("success");
          setTimeout(() => {
            location.reload();
          }, 2000);
        }
        console.log("Success:", responseData);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    postFormValues();
  }
}

modalSendBtn.addEventListener("click", (e) => {
  e.preventDefault();

  getFormModalValues();
});

let formCounter = 0;

// form selects open

const responseSelects = document.querySelectorAll(".rff");

responseSelects.forEach((select) => {
  select.addEventListener("click", (e) => {
    if (!e.target.matches("input")) {
      responseSelects.forEach((s) => {
        if (s !== e.currentTarget && s.classList.contains("active")) {
          s.classList.remove("active");
        }
      });

      e.currentTarget.classList.toggle("active");
    }
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

// Function to render ads type
function renderAdsType(datas, container) {
  datas.ads.forEach((data) => {
    const option = document.createElement("div");
    option.classList.add("flex-center");
    option.setAttribute("value", data.name);
    option.setAttribute("data-id", data.id);
    option.textContent = data.name;
    container.appendChild(option);
  });
}

// Function to render channels
function renderChannels(datas, container) {
  datas.channels.forEach((channel) => {
    const div = document.createElement("div");
    div.classList.add("flex-center");
    div.setAttribute("data-id", channel.id);
    formCounter++;
    const uniqueChannelId = "ch" + formCounter + channel.id;
    div.innerHTML = `<label class="flex align-items-center" for="${uniqueChannelId}">
                            <input type="checkbox" name="adstype" id="${uniqueChannelId}" data-id="${channel.ad_type_id}" value="${channel.title}" />${channel.title}
                         </label>`;
    container.appendChild(div);
  });
}

// Function to render timing
function renderTiming(datas, container) {
  datas.times.forEach((time) => {
    const div = document.createElement("div");
    div.classList.add("flex-center");
    formCounter++;
    const uniqueTimeId = "t" + time.id + formCounter;
    div.innerHTML = `<label class="flex align-items-center" for="${uniqueTimeId}">
                            <input type="checkbox" name="timing" id="${uniqueTimeId}" value="${time.title}" />${time.title}
                         </label>`;
    container.insertAdjacentElement("afterbegin", div);
  });
}

// Fetch data from API
document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = `https://tvradio.coder.az/${htmlLang}/api`;
  const adsTypeOptions = document.getElementById("adTypeOptions");
  const channels = document.getElementById("channels");
  const timing = document.getElementById("timing");

  async function fetchData(endpoint, callback) {
    try {
      const res = await fetch(apiUrl + endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const datas = await res.json();
      callback(datas);
    } catch (err) {
      console.error("There was a problem fetching the data:", err);
    } finally {
      console.log("Fetch attempt finished.");
    }
  }

  // Initial fetch calls
  fetchData("/ads", (datas) => renderAdsType(datas, adsTypeOptions));
  fetchData("/channels?type=4", (datas) => renderChannels(datas, channels));
  fetchData("/times", (datas) => renderTiming(datas, timing));

  // Event listener for adsTypeOptions
  adsTypeOptions.addEventListener("click", (e) => {
    if (e.target.classList.contains("flex-center")) {
      let adsTypeId = e.target.getAttribute("data-id");
      channels.innerHTML = "";
      fetchData(`/channels?type=${adsTypeId}`, (datas) =>
        renderChannels(datas, channels)
      );
    }
  });

  // Function to create new form
  const createBtn = document.querySelector(".add_btn");
  const resForm = document.querySelector(
    ".response__form > form > div:nth-of-type(n+1)"
  );

  function createNewForm() {
    async function getTranslates() {
      const res = await fetch(
        `https://tvradio.coder.az/api/translates?lang=${htmlLang}`
      );
      const data = await res.json();

      const company = data.company;
      const product = data.product;
      const adType = data.ad_type;
      const channels = data.channels;
      const badge = data.badge;
      const period = data.period;
      const timing = data.timing;
      const second = data.seconds;

      // console.log(data)
      let newForm = `
            <button type="button" class="remove_btn flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M1.6 16L0 14.4L6.4 8L0 1.6L1.6 0L8 6.4L14.4 0L16 1.6L9.6 8L16 14.4L14.4 16L8 9.6L1.6 16Z" fill="#5B5757"/>
                </svg>
            </button>
            <div class="form_data rff_new">
                <div class="response__form-field inp">
                    <input data-title="Şirkıtin adı ümumi" type="text" name="company" placeholder="${company}" />
                    <span class="error-message"></span>
                </div>
                <div class="response__form-field">
                    <input type="text" name="product" placeholder="${product}" />
                    <span class="error-message"></span>
                </div>
                <div class="response__form-field rff">
                <span class="error-message"></span>
                    <div class="selected flex-center" value="Reklam növü">
                        <span>${adType}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14 10" fill="none">
                            <path d="M1.5 1L6.9176 8.88014C6.95733 8.93794 7.04267 8.93794 7.0824 8.88014L12.5 1" stroke="#5D5858" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </div>
                    <div class="response__form-options flex flex-direct-col" id="adTypeOptions"></div>
                </div>
                <div class="response__form-field rff">
                <span class="error-message"></span>
                    <div class="selected flex-center" value="${channels}">
                        <span>${channels}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14 10" fill="none">
                            <path d="M1.5 1L6.9176 8.88014C6.95733 8.93794 7.04267 8.93794 7.0824 8.88014L12.5 1" stroke="#5D5858" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </div>
                    <div class="response__form-options flex flex-direct-col rfo" id="channels"></div>
                </div>
                <div class="response__form-field rff">
                    <div class="selected flex-center">
                        <span>${timing}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14 10" fill="none">
                            <path d="M1.5 1L6.9176 8.88014C6.95733 8.93794 7.04267 8.93794 7.0824 8.88014L12.5 1" stroke="#5D5858" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </div>
                    <span class="error-message"></span>
                    <div class="response__form-options rfo flex flex-direct-col" id="timing">
                        <div class="flex-center rfo1" value="">
                            <label class="flex align-items-center justify-content-between">
                                <span>Digər&ThickSpace;</span>
                                <span>|</span>
                                <input type="number" name="otherTiming" placeholder="${second}" />
                            </label>
                        </div>
                    </div>
                </div>
                <div class="response__form-field">
                    <input type="date" name="period" id="myInp" placeholder="${period}" value="" />
                    <span class="error-message"></span>
                </div>
                <div class="response__form-field">
                    <input type="number" name="badge" placeholder="${badge}(AZN)" />
                    <span class="error-message"></span>
                </div>
            </div>
        `;

      resForm.insertAdjacentHTML("afterend", newForm);
      footer.classList.add("footer_main");
      const newFormElement = resForm.parentElement.querySelector(".rff_new");

      // Apply event listeners and fetch logic to the new form
      const newAdTypeOptions = newFormElement.querySelector("#adTypeOptions");
      const newChannels = newFormElement.querySelector("#channels");
      const newTiming = newFormElement.querySelector("#timing");
      fetchData("/ads", (datas) => renderAdsType(datas, newAdTypeOptions));
      fetchData("/channels?type=4", (datas) =>
        renderChannels(datas, newChannels)
      );
      fetchData("/times", (datas) => renderTiming(datas, newTiming));

      newAdTypeOptions.addEventListener("click", (e) => {
        if (e.target.classList.contains("flex-center")) {
          let adsTypeId = e.target.getAttribute("data-id");
          newChannels.innerHTML = "";
          fetchData(`/channels?type=${adsTypeId}`, (datas) =>
            renderChannels(datas, newChannels)
          );
        }
      });

      // Event listener for new selects
      const newResponseSelects = newFormElement.querySelectorAll(".rff");

      newResponseSelects.forEach((select) => {
        select.addEventListener("click", (e) => {
          if (!e.target.matches("input")) {
            newResponseSelects.forEach((s) => {
              if (s !== e.currentTarget && s.classList.contains("active")) {
                s.classList.remove("active");
              }
            });
            e.currentTarget.classList.toggle("active");
          }
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

      const removeBtn = document.querySelector(".remove_btn");
      removeBtn.addEventListener("click", () => {
        removeBtn.nextElementSibling.remove();
        removeBtn.remove();
      });

      getFlatCalendar();
    }

    getTranslates();
  }

  createBtn.addEventListener("click", createNewForm);

  function getFlatCalendar() {
    const dateInputs = document.querySelectorAll('input[name="period"]');
    dateInputs.forEach((inp) => {
      const config = {
        enableTime: false,
        dateFormat: "d-m-Y",
        mode: "range",
        minDate: "today",
        disableMobile: "true",
        onChange: function (selectedDates, dateStr, instance) {
          inp.style.fontSize = "1.33rem";
        },
        onOpen: [
          function (selectedDates, dateStr, instance) {
            responseSelects.forEach((select) => {
              select.classList.remove("active");
            });
          },
          function (selectedDates, dateStr, instance) {
            //...
          },
        ],
        onClose: function (selectedDates, dateStr, instance) {
          // ...
        },
      };

      flatpickr(inp, config);
    });
  }

  getFlatCalendar();
});
