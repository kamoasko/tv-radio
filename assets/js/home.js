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
let formIdCounter = 0;
const formValues = [];
let formData;
function getFormValues() {
  const forms = document.querySelectorAll(".form_data");
  formValues.length = 0;

  forms.forEach((form) => {
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
    const beginningPeriod = form.querySelector(
      'input[name="beginningPeriod"]'
    )?.value;
    const endingPeriod = form.querySelector(
      'input[name="endingPeriod"]'
    )?.value;
    const period = beginningPeriod + " - " + endingPeriod;
    const budget =
      form.querySelector('input[name="budget"]')?.value +
      " " +
      form.querySelector("select[name='currency']")?.value;

    formData = {
      formId: form.id,
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

  console.log(formValues);
  return formValues;
}

// Function to validate form inputs
function validateForm() {
  let isValid = true;
  const inputs = document.querySelectorAll('.form_data input[type="text"]');
  inputs.forEach((input) => {
    const errorSpan = input.parentElement?.querySelector(".error-message");
    if (input.parentElement.classList.contains("response__form-field")) {
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
        errorSpan.style.display = "inline";
      } else {
        errorSpan.style.display = "none";
      }
    }
  });

  const checkboxGroups = document.querySelectorAll(
    ".response__form-field.rff, .response__form-field.rfo"
  );
  checkboxGroups.forEach((group) => {
    const checkboxes = group.querySelectorAll('.rfot input[type="checkbox"]');
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
        errorSpan.style.display = "inline";
      }
    } else if (errorSpan) {
      errorSpan.style.display = "none";
    }
  });

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
        errorSpan.style.display = "inline";
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
const modal = document.querySelector(".modal");

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
      errorSpan.style.display = "inline";
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

    async function postFormValues() {
      try {
        modal.classList.add("loading");
        const res = await fetch(
          "https://mailapi.tvradio.coder.az/public/api/send-mail",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(allFormValues),
          }
        );

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await res.json();

        if (responseData.success) {
          modal.classList.add("success");
          setTimeout(() => {
            location.reload();
          }, 2000);
        }
        console.log("Success:", responseData);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        modal.classList.remove("loading");
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

function closeOtherFormFields(currentField) {
  const allFormFields = document.querySelectorAll(".response__form-field");
  allFormFields.forEach((field) => {
    if (field !== currentField && field.classList.contains("active")) {
      field.classList.remove("active");
    }
  });
}

// Event listeners for response select fields
const responseSelects = document.querySelectorAll(
  ".response__form-field.rff",
  ".response__form-field.rff_new"
);

responseSelects.forEach((select) => {
  select.addEventListener("click", (e) => {
    if (!e.target.matches("input")) {
      closeOtherFormFields(select);
      select.classList.toggle("active");
    }
  });
});

document.addEventListener("click", (e) => {
  responseSelects.forEach((select) => {
    if (!select.contains(e.target)) {
      select.classList.remove("active");
    }
  });
});

const options = document.querySelectorAll(".response__form-options");
const selectedOptionText = document.querySelectorAll(".selected > span");

options.forEach((option, index) => {
  option.addEventListener("click", (e) => {
    e.stopPropagation();
    if (e.target.classList.contains("flex-center")) {
      const optionText = e.target.textContent.trim();
      selectedOptionText[index].textContent = optionText;
    }
  });
});

function updateSelectedOptions(field) {
  const selectedSpan = field.querySelector(".selected > span");
  const selectedInput = field.querySelector(
    ".selected > input.selected_options"
  );
  const checkedOptions = field.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  let selectedValues = Array.from(checkedOptions).map(
    (checkbox) => checkbox.value
  );
  const adTypeSpan = field
    .closest(".form_data")
    ?.querySelector(".rff:nth-of-type(2) .selected > span");

  // if (adTypeSpan) {
  //     localStorage.setItem("default", adTypeSpan.textContent);
  // }

  if (field.querySelector("#timing")) {
    const otherTimingInput = field.querySelector('.rfo1 input[type="number"]');
    if (otherTimingInput && otherTimingInput.value.trim() !== "") {
      selectedValues.push(otherTimingInput.value);
    }
  }

  if (selectedValues.length > 0) {
    if (selectedInput) {
      selectedInput.value = selectedValues.join(", ");
      selectedInput.style.display = "block";
    }
    if (selectedSpan) {
      selectedSpan.style.display = "none";
    }
  } else {
    if (selectedInput) {
      selectedInput.value = "";
      selectedInput.style.display = "none";
    }
    if (selectedSpan) {
      selectedSpan.style.display = "block";
      if (adTypeSpan) {
        if (field.querySelector("#channels")) {
          if (adTypeSpan.textContent === "Radio (spot)") {
            switch (htmlLang) {
              case "az":
                selectedSpan.textContent = "Dalğa";
                break;
              case "ru":
                selectedSpan.textContent = "Волна";
                break;
              case "en":
                selectedSpan.textContent = "Wave";
                break;
              default:
                selectedSpan.textContent = "Dalğa";
                break;
            }
          } else {
            switch (htmlLang) {
              case "az":
                selectedSpan.textContent = "Kanal";
                break;
              case "ru":
                selectedSpan.textContent = "Канал";
                break;
              case "en":
                selectedSpan.textContent = "Channel";
                break;
              default:
                selectedSpan.textContent = "Kanal";
                break;
            }
          }
        } else if (field.querySelector("#timing")) {
          switch (htmlLang) {
            case "az":
              selectedSpan.textContent = "Xronometraj";
              break;
            case "ru":
              selectedSpan.textContent = "Хронометрай";
              break;
            case "en":
              selectedSpan.textContent = "Timing";
              break;
            default:
              selectedSpan.textContent = "Xronometraj";
              break;
          }
        }
      }
    }
  }
}

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
  container.innerHTML = "";
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

  const checkboxes = container.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      updateSelectedOptions(container.closest(".response__form-field"));
    });
  });

  container.addEventListener("change", () => {
    const checkedCheckboxes = container.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    if (checkedCheckboxes.length === 0) {
      updateSelectedOptions(container.closest(".response__form-field"));
    }
  });
}

function renderTiming(datas, container) {
  // container.innerHTML = '';
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

  const checkboxes = container.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      updateSelectedOptions(container.closest(".response__form-field"));
    });
  });

  const otherTimingInput = container.querySelector(
    '.rfo1 input[type="number"]'
  );
  if (otherTimingInput) {
    otherTimingInput.addEventListener("input", () => {
      updateSelectedOptions(container.closest(".response__form-field"));
    });
  }
}

// Fetch data from API
document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll(".input_title > input");

  inputs.forEach((input) => {
    const span = input.parentElement.querySelector("span:first-of-type");

    input.addEventListener("mouseover", (e) => {
      if (input.value.trim() !== "") {
        span.textContent = input.value;
        span.style.opacity = 1;
        span.style.visibility = "visible";
      } else {
        span.style.opacity = 0;
        span.style.visibility = "hidden";
      }
    });

    input.addEventListener("mouseout", () => {
      span.style.opacity = 0;
      span.style.visibility = "hidden";
    });
  });

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

  function saveInitialChannelText(field) {
    const selectedSpan = field.querySelector(".selected > span");
    const formId = field.closest(".form_data").id;
    const key = `initialChannelText_${formId}`;
    localStorage.setItem(key, selectedSpan.textContent);
  }

  const initialChannelsField = document.querySelector(
    ".response__form-field.rff:nth-of-type(3)"
  );
  saveInitialChannelText(initialChannelsField);

  // Event listener for adsTypeOptions
  adsTypeOptions.addEventListener("click", (e) => {
    if (e.target.classList.contains("flex-center")) {
      let adsTypeId = e.target.getAttribute("data-id");
      let adsTypeName = e.target.textContent.trim();
      e.stopPropagation();

      e.currentTarget
        .closest(".rff")
        .querySelector(".selected > span").textContent = adsTypeName;

      const channelsField = channels.closest(".rff");
      const channelSpan = channelsField.querySelector(".selected > span");
      const formId = channelsField.closest(".form_data").id;
      const key = `initialChannelText_${formId}`;

      if (adsTypeName === "Radio (spot)") {
        switch (htmlLang) {
          case "az":
            channelSpan.textContent = "Dalğa";
            break;
          case "ru":
            channelSpan.textContent = "Волна";
            break;
          case "en":
            channelSpan.textContent = "Wave";
            break;
          default:
            channelSpan.textContent = "Dalğa";
            break;
        }
      } else {
        const initialText = localStorage.getItem(key);
        if (initialText) {
          channelSpan.textContent = initialText;
        } else {
          switch (htmlLang) {
            case "az":
              channelSpan.textContent = "Kanal";
              break;
            case "ru":
              channelSpan.textContent = "Канал";
              break;
            case "en":
              channelSpan.textContent = "Channel";
              break;
            default:
              channelSpan.textContent = "Kanal";
              break;
          }
        }
      }

      channels.innerHTML = "";
      fetchData(`/channels?type=${adsTypeId}`, (datas) =>
        renderChannels(datas, channels)
      );
    }
  });

  function getSelectedDates() {
    const dateInputs = document.querySelectorAll('input[id="myInp"]');
    const selectedDates = [];

    dateInputs.forEach((input) => {
      const flatpickrInstance = input._flatpickr;
      if (flatpickrInstance) {
        selectedDates.push(flatpickrInstance.selectedDates);
      } else {
        selectedDates.push([]);
      }
    });

    return selectedDates;
  }

  function getFlatCalendar(selectedDates = []) {
    const dateInputs = document.querySelectorAll('input[id="myInp"]');

    dateInputs.forEach((inp, index) => {
      const config = {
        enableTime: false,
        dateFormat: "d/m/Y",
        // locale: htmlLang,
        // mode: "range",
        minDate: "today",
        disableMobile: "true",
        onChange: function (selectedDates, dateStr, instance) {
          inp.style.fontSize = "1.33rem";
        },
        onOpen: function () {
          responseSelects.forEach((select) => {
            if (select.classList.contains("active")) {
              select.classList.remove("active");
            }
          });
        },
        onClose: function () {
          // ...
        },
      };

      flatpickr(inp, config);

      if (selectedDates[index] && selectedDates[index].length > 0) {
        inp._flatpickr.setDate(selectedDates[index], true);
      }
    });
  }

  // Function to create new form
  const createBtn = document.querySelector(".add_btn");
  const resForm = document.querySelector(
    ".response__form > form > div:nth-of-type(n+1)"
  );

  async function getTranslates() {
    try {
      const res = await fetch(
        `https://tvradio.coder.az/api/translates?lang=${htmlLang}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("There was a problem fetching the data:", err);
    }
  }

  function createNewForm(data) {
    const selectedDates = getSelectedDates();
    const {
      company,
      product,
      ad_type,
      channels,
      badge,
      period,
      timing,
      seconds,
    } = data;
    formIdCounter++;
    const formId = `form-${formIdCounter}`;

    let newForm = `
        <button type="button" class="remove_btn flex" data-form-id="${formId}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1.6 16L0 14.4L6.4 8L0 1.6L1.6 0L8 6.4L14.4 0L16 1.6L9.6 8L16 14.4L14.4 16L8 9.6L1.6 16Z" fill="#5B5757"/>
            </svg>
        </button>
        <div class="form_data rff_new" data-form-index="${formValues.length}" id="${formId}">
            <div class="response__form-field input_title">
                <input data-title="Şirkıtin adı ümumi" type="text" name="company" placeholder="${company}" />
                <span></span>
                <span class="error-message"></span>
            </div>
            <div class="response__form-field input_title">
                <input type="text" name="product" placeholder="${product}" />
                <span></span>
                <span class="error-message"></span>
            </div>
            <div class="response__form-field rff">
                <span class="error-message"></span>
                <div class="selected flex-center" value="${ad_type}">
                    <span>${ad_type}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14 10" fill="none">
                        <path d="M1.5 1L6.9176 8.88014C6.95733 8.93794 7.04267 8.93794 7.0824 8.88014L12.5 1" stroke="#5D5858" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </div>
                <div><div class="response__form-options flex flex-direct-col" id="adTypeOptions"></div></div>
            </div>
            <div class="response__form-field rff">
                <span class="error-message"></span>
                <div class="selected flex-center" value="${channels}">
                    <span>${channels}</span>
                    <input type="text" class="selected_options" value="" readonly="readonly">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14 10" fill="none">
                        <path d="M1.5 1L6.9176 8.88014C6.95733 8.93794 7.04267 8.93794 7.0824 8.88014L12.5 1" stroke="#5D5858" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </div>
                <div><div class="response__form-options flex flex-direct-col rfo " id="channels"></div></div>
            </div>
            <div class="response__form-field rff">
                <span class="error-message"></span>
                <div class="selected flex-center">
                    <span>${timing}</span>
                    <input type="text" class="selected_options" value="" readonly="readonly">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14 10" fill="none">
                        <path d="M1.5 1L6.9176 8.88014C6.95733 8.93794 7.04267 8.93794 7.0824 8.88014L12.5 1" stroke="#5D5858" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </div>
                <div>
                    <div class="response__form-options rfo flex flex-direct-col rfot" id="timing">
                        <div class="flex-center rfo1" value="">
                            <label class="flex align-items-center justify-content-between">
                                <span>Digər&ThickSpace;</span>
                                <span>|</span>
                                <input type="number" name="otherTiming" placeholder="${seconds}" />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="response__form-field flex-center">
                <input type="date" name="beginningPeriod" id="myInp" placeholder="${period}" value="" />
                <input type="date" name="endingPeriod" id="myInp" placeholder="${period}" value="" />
                <span class="error-message"></span>
            </div>
            <div class="response__form-field budget_inp">
                <div class="flex align-items-center">
                    <input type="number" name="budget" placeholder="${badge}" />
                    <select name="currency" id="">
                        <option value="AZN">AZN</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                    </select>
                </div>
                <span class="error-message"></span>
            </div>
        </div>
    `;

    const resFormBtn = document.querySelector(".response__form-buttons");
    resFormBtn.insertAdjacentHTML("beforebegin", newForm);

    const newFormElement = resForm.parentElement.querySelector(`#${formId}`);
    const channelsField = newFormElement.querySelector(
      ".response__form-field.rff:nth-of-type(4)"
    );
    saveInitialChannelText(channelsField);

    attachEventListeners(newFormElement);

    getFlatCalendar(selectedDates);
  }

  function attachEventListeners(newFormElement) {
    const newInputs = newFormElement.querySelectorAll(".input_title > input");
    newInputs.forEach((input) => {
      const span = input.parentElement.querySelector("span:first-of-type");

      input.addEventListener("mouseover", () => {
        if (input.value.trim() !== "") {
          span.textContent = input.value;
          span.style.opacity = 1;
          span.style.visibility = "visible";
        } else {
          span.style.opacity = 0;
          span.style.visibility = "hidden";
        }
      });

      input.addEventListener("mouseout", () => {
        span.style.opacity = 0;
        span.style.visibility = "hidden";
      });
    });

    const newAdTypeOptions = newFormElement.querySelector("#adTypeOptions");
    const newChannels = newFormElement.querySelector("#channels");
    const newTiming = newFormElement.querySelector("#timing");

    fetchData("/ads", (datas) => renderAdsType(datas, newAdTypeOptions));
    fetchData("/channels?type=4", (datas) => {
      renderChannels(datas, newChannels);
      updateSelectedOptions(newChannels.closest(".response__form-field"));

      newChannels.addEventListener("change", () => {
        const checkedCheckboxes = newChannels.querySelectorAll(
          'input[type="checkbox"]:checked'
        );
        if (checkedCheckboxes.length === 0) {
          updateSelectedOptions(newChannels.closest(".response__form-field"));
        }
      });
    });
    fetchData("/times", (datas) => {
      renderTiming(datas, newTiming);
      updateSelectedOptions(newTiming.closest(".response__form-field"));
    });

    newAdTypeOptions.addEventListener("click", (e) => {
      if (e.target.classList.contains("flex-center")) {
        let adsTypeId = e.target.getAttribute("data-id");
        let adsTypeName = e.target.textContent.trim();
        e.stopPropagation();

        e.currentTarget
          .closest(".rff")
          .querySelector(".selected > span").textContent = adsTypeName;

        const channelsField = newChannels.closest(".rff");
        const channelSpan = channelsField.querySelector(".selected > span");
        const formId = channelsField.closest(".form_data").id;
        const key = `initialChannelText_${formId}`;

        if (adsTypeName === "Radio (spot)") {
          switch (htmlLang) {
            case "az":
              channelSpan.textContent = "Dalğa";
              break;
            case "ru":
              channelSpan.textContent = "Волна";
              break;
            case "en":
              channelSpan.textContent = "Wave";
              break;
            default:
              channelSpan.textContent = "Dalğa";
              break;
          }
        } else {
          // Retrieve the initial text from localStorage
          const initialText = localStorage.getItem(key);
          if (initialText) {
            channelSpan.textContent = initialText;
          } else {
            // Fallback to default values if localStorage is empty
            switch (htmlLang) {
              case "az":
                channelSpan.textContent = "Kanal";
                break;
              case "ru":
                channelSpan.textContent = "Канал";
                break;
              case "en":
                channelSpan.textContent = "Channel";
                break;
              default:
                channelSpan.textContent = "Kanal";
                break;
            }
          }
        }

        newChannels.innerHTML = "";
        fetchData(`/channels?type=${adsTypeId}`, (datas) =>
          renderChannels(datas, newChannels)
        );
      }
    });

    const newResponseSelects = newFormElement.querySelectorAll(
      ".response__form-field.rff"
    );
    newResponseSelects.forEach((select) => {
      select.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!e.target.matches("input")) {
          closeOtherFormFields(select);
          select.classList.toggle("active");
        }
      });

      const options = select.querySelector(".response__form-options");
      const selectedOptionText = select.querySelector(".selected > span");

      options.addEventListener("click", (e) => {
        e.stopPropagation();
        if (e.target.classList.contains("flex-center")) {
          const optionText = e.target.textContent.trim();
          selectedOptionText.textContent = optionText;
        }
      });
    });

    document.addEventListener("click", (e) => {
      newResponseSelects.forEach((select) => {
        if (!select.contains(e.target)) {
          select.classList.remove("active");
        }
      });
    });

    const removeBtn = newFormElement.previousElementSibling;
    removeBtn.addEventListener("click", () => {
      const formId = removeBtn.getAttribute("data-form-id");
      removeForm(formId);
      removeBtn.nextElementSibling.remove();
      removeBtn.remove();
    });

    function removeForm(formId) {
      const index = formValues.findIndex((form) => form.formId === formId);
      if (index !== -1) {
        formValues.splice(index, 1);
      }
    }
  }

  createBtn.addEventListener("click", async () => {
    footer.classList.add("footer_main");
    const translates = await getTranslates();
    createNewForm(translates);
  });

  getFlatCalendar();
});
