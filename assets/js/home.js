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

// custom currency select option

$(document).ready(function () {
  // Cache the number of options
  var $this = $("#currency"),
    numberOfOptions = $this.children("option").length;

  let allOptions = $this.children("option");
  let dataUrls = []; // To store the URLs

  allOptions.each(function () {
    let url = $(this).data("url");
    dataUrls.push(url);
  });

  // Hides the select element
  $this.addClass("s-hidden");

  // Wrap the select element in a div
  $this.wrap('<div class="select"></div>');

  // Insert a styled div to sit over the top of the hidden select element
  $this.after('<div class="styledSelect select_currency"></div>');

  // Cache the styled div
  var $styledSelect = $this.next("div.styledSelect");

  // Function to set the styled select text based on the select element value
  function setStyledSelectText() {
    let selectedOption = $this.children("option:selected").text();
    $styledSelect.text(selectedOption);
  }

  // Set the initial styled select text
  setStyledSelectText();

  // Insert an unordered list after the styled div and also cache the list
  var $list = $("<ul />", {
    class: "options currency_opt",
  }).insertAfter($styledSelect);

  // Insert a list item into the unordered list for each select option
  for (var i = 0; i < numberOfOptions; i++) {
    $("<li />", {
      text: $this.children("option").eq(i).text(),
      rel: $this.children("option").eq(i).val(),
      "data-url": dataUrls[i], // Add the data-url attribute here
    }).appendTo($list);
  }

  // Cache the list items
  var $listItems = $list.children("li");

  // Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
  $styledSelect.click(function (e) {
    e.stopPropagation();
    if ($styledSelect.hasClass("active")) {
      $styledSelect.removeClass("active").next("ul.options").hide();
    } else {
      $("div.styledSelect.active").each(function () {
        $(this).removeClass("active").next("ul.options").hide();
      });
      $(this).addClass("active").next("ul.options").show();
    }
  });

  // Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
  // Updates the select element to have the value of the equivalent option
  $listItems.click(function (e) {
    e.stopPropagation();
    var selectedText = $(this).text();
    $styledSelect.text(selectedText).removeClass("active");
    $this.val($(this).attr("rel"));
    $list.hide();

    // Saving the selected value to localStorage
    localStorage.setItem("selectedCurrency", $this.val());

    var selectedUrl = $(this).data("url");
    if (selectedUrl) {
      window.location.href = selectedUrl;
    }
  });

  // Hides the unordered list when clicking outside of it
  $(document).click(function () {
    $styledSelect.removeClass("active");
    $list.hide();
  });

  // On page load, check localStorage for a saved value
  var savedCurrency = localStorage.getItem("selectedCurrency");
  if (savedCurrency) {
    $this.val(savedCurrency);
    setStyledSelectText();
  }
});

// Function to validate form inputs
function validateForm() {
  let isValid = true;
  const inputs = document.querySelectorAll(
    '.form_data input[type="text"], .form_data input[type="date"], .form_data input[type="number"]'
  );
  inputs.forEach((input) => {
    const errorSpan = input.parentElement?.querySelector(".error-message");
    if (input.parentElement.classList.contains("response__form-field")) {
      if (!input.value && input.type !== "checkbox") {
        isValid = false;
        switch (input.name) {
          case "company":
            switch (htmlLang) {
              case "az":
                errorSpan.textContent = "Şirkətin adını qeyd edin!";
                break;
              case "en":
                errorSpan.textContent = "Please fill the company name!";
                break;
              case "ru":
                errorSpan.textContent =
                  "Пожалуйста, заполните название компании!";
                break;
              default:
                errorSpan.textContent = "Please fill the company name!";
                break;
            }
            break;
          case "product":
            switch (htmlLang) {
              case "az":
                errorSpan.textContent = "Məhsulun adını qeyd edin!";
                break;
              case "en":
                errorSpan.textContent = "Please fill the product name!";
                break;
              case "ru":
                errorSpan.textContent =
                  "Пожалуйста, заполните название продукта!";
                break;
              default:
                errorSpan.textContent = "Please fill the product name!";
                break;
            }
            break;
          case "beginningPeriod":
          case "endingPeriod":
            switch (htmlLang) {
              case "az":
                errorSpan.textContent = "Reklam müddətini qeyd edin!";
                break;
              case "en":
                errorSpan.textContent = "Please fill the advertisement period!";
                break;
              case "ru":
                errorSpan.textContent = "Пожалуйста, заполните период рекламы!";
                break;
              default:
                errorSpan.textContent = "Please fill the advertisement period!";
                break;
            }
            break;
          case "budget":
            switch (htmlLang) {
              case "az":
                errorSpan.textContent = "Büdcəni qeyd edin!";
                break;
              case "en":
                errorSpan.textContent = "Please fill the budget!";
                break;
              case "ru":
                errorSpan.textContent = "Пожалуйста, заполните бюджет!";
                break;
              default:
                errorSpan.textContent = "Please fill the budget!";
                break;
            }
            break;
          default:
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
            break;
        }
        errorSpan.style.display = "inline";
      } else {
        errorSpan.style.display = "none";
      }
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

      if (selectedOption == "Reklamın növü" || selectedOption == "Ad type") {
        isValid = false;
        switch (htmlLang) {
          case "az":
            errorSpan.textContent = "Reklam növünü seçin!";
            break;
          case "en":
            errorSpan.textContent = "Please select the advertisement type!";
            break;
          case "ru":
            errorSpan.textContent = "Пожалуйста, выберите тип рекламы!";
            break;
          default:
            errorSpan.textContent = "Please select the advertisement type!";
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

  const timingGroups = document.querySelectorAll(
    ".response__form-field.rff:nth-of-type(5)"
  );
  timingGroups.forEach((group) => {
    const checkboxes = group.querySelectorAll('.rfot input[type="checkbox"]');
    const otherTimingInput = group.querySelector('.rfo1 input[type="number"]');
    const errorSpan = group.querySelector(".error-message");

    const isOtherTimingFilled =
      otherTimingInput && otherTimingInput.value.trim() !== "";

    console.log(
      checkboxes.length > 0 &&
        !Array.from(checkboxes).some((checkbox) => checkbox.checked) &&
        !isOtherTimingFilled
    );

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
            errorSpan.textContent = "Xronometrajı qeyd edin!";
            break;
          case "en":
            errorSpan.textContent = "Please fill the timing!";
            break;
          case "ru":
            errorSpan.textContent = "Пожалуйста, заполните хронометраж!";
            break;
          default:
            errorSpan.textContent = "Please fill the timing!";
            break;
        }
        errorSpan.style.display = "inline";
      }
    } else if (errorSpan) {
      errorSpan.style.display = "none";
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

// Regular expression for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
    } else if (input.type === "email" && !emailRegex.test(input.value)) {
      // Check if the email format is valid
      isFormValid = false;
      switch (htmlLang) {
        case "az":
          errorSpan.textContent = "Zəhmət olmazsa düzgün email daxil edin!";
          break;

        case "en":
          errorSpan.textContent = "Please enter a valid email address!";
          break;

        case "ru":
          errorSpan.textContent = "Пожалуйста, введите корректный email!";
          break;
        default:
          errorSpan.textContent = "Please enter a valid email address!";
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
      ".modal__form-input > input[name='phone']"
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
    if (e.target.parentElement.id !== "adTypeOptions") {
      e.stopPropagation();
    }
    if (e.target.classList.contains("flex-center")) {
      const optionText = e.target.textContent.trim();
      selectedOptionText[index].textContent = optionText;
    }
  });
});

function updateSelectedOptions(field) {
  const selectedSpan = field.querySelector(".selected > span:nth-child(2)");
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

  if (field.querySelector("#timing")) {
    const otherTimingInput = field.querySelector('.rfo1 input[type="number"]');
    if (otherTimingInput && otherTimingInput.value.trim() !== "") {
      switch (htmlLang) {
        case "az":
          selectedValues.push(otherTimingInput.value + " saniyə");
          break;
        case "en":
          selectedValues.push(otherTimingInput.value + " second");
          break;
        case "ru":
          selectedValues.push(otherTimingInput.value + " секунды");
          break;
      }
    }

    // Check if selectedValues is not empty and contains expected patterns
    if (selectedValues.length > 0) {
      const numericParts = selectedValues
        .map((value) => value.match(/\d+/))
        .filter((part) => part !== null);
      if (numericParts.length > 0) {
        const joinedNumericParts = numericParts
          .map((part) => part[0])
          .join("-");
        const unitMatch = selectedValues[0].match(/[a-zA-Zə]+$/);
        if (unitMatch) {
          const unit = unitMatch[0];
          const joinedTiming = joinedNumericParts + " " + unit;

          if (selectedInput) {
            selectedInput.value = joinedTiming;
            selectedInput.style.display = "block";
          }
          if (selectedSpan) {
            selectedSpan.style.display = "none";
          }
        }
      }
    } else {
      // No checkboxes are checked, reset the display styles
      if (selectedInput) {
        selectedInput.value = "";
        selectedInput.style.display = "none";
      }
      if (selectedSpan) {
        selectedSpan.style.display = "block";
      }
    }
  } else {
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

      if (e.target.parentElement.id !== "adTypeOptions") {
        e.stopPropagation();
      }

      e.currentTarget
        .closest(".rff")
        .querySelector(".selected > span").textContent = adsTypeName;

      const channelsField = channels.closest(".rff");
      const channelSpan = channelsField.querySelector(
        ".selected > span:nth-child(2)"
      );
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
        dateFormat: "d.m.y",
        locale: {
          firstDayOfWeek: 1,
        },
        minDate: "today",
        disableMobile: "true",
        onChange: function (selectedDates, dateStr, instance) {
          inp.style.fontSize = "1.33rem";

          if (index === 0) {
            const endDateInput = dateInputs[1];
            if (endDateInput && endDateInput._flatpickr) {
              endDateInput._flatpickr.set(
                "minDate",
                selectedDates[0]
                  ? new Date(selectedDates[0].getTime() + 24 * 60 * 60 * 1000)
                  : "today"
              );
            }
          }
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
        <div class="form_data rff_new" data-form-index="${
          formValues.length
        }" id="${formId}">
            <div class="response__form-field input_title">
                <input data-title="Şirkıtin adı ümumi" type="text" name="company" placeholder="${company}" tabindex="${
      formIdCounter * 10 + 1
    }" />
                <span></span>
                <span class="error-message"></span>
            </div>
            <div class="response__form-field input_title">
                <input type="text" name="product" placeholder="${product}" tabindex="${
      formIdCounter * 10 + 2
    }"/>
                <span></span>
                <span class="error-message"></span>
            </div>
            <div class="response__form-field rff" tabindex="${
              formIdCounter * 10 + 3
            }">
                <span class="error-message"></span>
                <div class="selected flex-center" value="${ad_type}">
                    <span>${ad_type}</span>
                    <i class="fa-solid fa-chevron-down"></i>
                </div>
                <div><div class="response__form-options flex flex-direct-col" id="adTypeOptions"></div></div>
            </div>
            <div class="response__form-field rff" tabindex="${
              formIdCounter * 10 + 4
            }">
                <span class="error-message"></span>
                <div class="selected input_title flex-center" value="${channels}">
                    <span></span>
                    <span>${channels}</span>
                    <input type="text" class="selected_options" value="" readonly="readonly">
                    <i class="fa-solid fa-chevron-down"></i>
                </div>
                <div><div class="response__form-options flex flex-direct-col rfo " id="channels"></div></div>
            </div>
            <div class="response__form-field rff" tabindex="${
              formIdCounter * 10 + 5
            }">
                <span class="error-message"></span>
                <div class="selected flex-center">
                    <input type="text" class="selected_options" value="" readonly="readonly">
                    <span>${timing}</span>
                    <i class="fa-solid fa-chevron-down"></i>
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
            <div class="response__form-field rff_date flex-center">
                <input type="date" name="beginningPeriod" id="myInp" placeholder="${period}" value="" tabindex="${
      formIdCounter * 10 + 6
    }" />
                <input type="date" name="endingPeriod" id="myInp" placeholder="${period}" value="" tabindex="${
      formIdCounter * 10 + 7
    }"/>
                <span class="error-message"></span>
            </div>
            <div class="response__form-field budget_inp flex align-items-center">
                    <input type="number" name="budget" placeholder="${badge}" tabindex="${
      formIdCounter * 10 + 8
    }"/>
                    <select name="currency" id="currency">
                        <option value="AZN">AZN</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                    </select>
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

    const newCurrencySelect = newFormElement.querySelector("#currency");
    customCurrencySelect(newCurrencySelect);
  }

  function customCurrencySelect(select) {
    var $this = $(select),
      numberOfOptions = $this.children("option").length;

    let allOptions = $this.children("option");
    let dataUrls = [];

    allOptions.each(function () {
      let url = $(this).data("url");
      dataUrls.push(url);
    });

    $this.addClass("s-hidden");
    $this.wrap('<div class="select"></div>');

    $this.after('<div class="styledSelect select_currency"></div>');
    var $styledSelect = $this.next("div.styledSelect");

    function setStyledSelectText() {
      let selectedOption = $this.children("option:selected").text();
      $styledSelect.text(selectedOption);
    }

    setStyledSelectText();

    var $list = $("<ul />", {
      class: "options currency_opt",
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
      $("<li />", {
        text: $this.children("option").eq(i).text(),
        rel: $this.children("option").eq(i).val(),
        "data-url": dataUrls[i], // Add the data-url attribute here
      }).appendTo($list);
    }

    var $listItems = $list.children("li");

    $styledSelect.click(function (e) {
      e.stopPropagation();
      if ($styledSelect.hasClass("active")) {
        $styledSelect.removeClass("active").next("ul.options").hide();
      } else {
        $("div.styledSelect.active").each(function () {
          $(this).removeClass("active").next("ul.options").hide();
        });
        $(this).addClass("active").next("ul.options").show();
      }
    });

    $listItems.click(function (e) {
      e.stopPropagation();
      var selectedText = $(this).text();
      $styledSelect.text(selectedText).removeClass("active");
      $this.val($(this).attr("rel"));
      $list.hide();

      localStorage.setItem("selectedCurrency", $this.val());

      var selectedUrl = $(this).data("url");
      if (selectedUrl) {
        window.location.href = selectedUrl;
      }
    });

    $(document).click(function () {
      $styledSelect.removeClass("active");
      $list.hide();
    });

    var savedCurrency = localStorage.getItem("selectedCurrency");
    if (savedCurrency) {
      $this.val(savedCurrency);
      setStyledSelectText();
    }
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

        if (e.target.parentElement.id !== "adTypeOptions") {
          e.stopPropagation();
        }

        e.currentTarget
          .closest(".rff")
          .querySelector(".selected > span").textContent = adsTypeName;

        const channelsField = newChannels.closest(".rff");
        const channelSpan = channelsField.querySelector(
          ".selected > span:nth-child(2)"
        );
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
        if (e.target.parentElement.id !== "adTypeOptions") {
          e.stopPropagation();
        }
        if (!e.target.matches("input")) {
          closeOtherFormFields(select);
          select.classList.toggle("active");
        }
      });

      const options = select.querySelector(".response__form-options");
      const selectedOptionText = select.querySelector(".selected > span");

      options.addEventListener("click", (e) => {
        if (e.target.parentElement.id !== "adTypeOptions") {
          e.stopPropagation();
        }
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
