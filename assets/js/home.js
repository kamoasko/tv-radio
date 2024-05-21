"use strict";

// send response

const formBtn = document.getElementById("form_btn");
const backdrop = document.querySelector(".backdrop");
const closeBtn = document.querySelector(".modal__close");
const footer = document.querySelector("footer");

// function sendResponse() {
//     formBtn.addEventListener("click", () => {
//         backdrop.classList.add("opened");
//     });
// }

function closeModal() {
  backdrop.classList.remove("opened");
}

closeBtn.addEventListener("click", closeModal);

// form selects open

const responseSelects = document.querySelectorAll(".rff");

responseSelects.forEach((select) => {
  select.addEventListener("click", (e) => {
    if (!e.target.matches("input")) {
      responseSelects.forEach((s) => {
        if (s !== e.currentTarget && s.classList.contains("active")) {
          s.classList.remove("active");
          footer.classList.remove("footer_main");
        }
      });

      e.currentTarget.classList.toggle("active");
      footer.classList.add("footer_main");
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

// fetch channels datas

const apiUrl = "https://tvradio.coder.az/en/api";
const adsTypeOptions = document.getElementById("adTypeOptions");
const channels = document.getElementById("channels");
const timing = document.getElementById("timing");
let formCounter = 0;

document.addEventListener("DOMContentLoaded", () => {
  async function fetchData(endpoint, callback) {
    try {
      const res = await fetch(apiUrl + endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ACCESS_TOKEN",
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

  function renderChannels(datas, container) {
    datas.channels.forEach((channel) => {
      const div = document.createElement("div");
      div.classList.add("flex-center");
      div.setAttribute("data-id", channel.id);
      formCounter++;
      const uniqueChannelId = "ch" + formCounter + channel.id;
      div.innerHTML = `<label
                  class="flex align-items-center"
                  for="${uniqueChannelId}"
                >
                  <input
                    type="checkbox"
                    name="adstype"
                    id="${uniqueChannelId}"
                    data-id="${channel.pivot.ad_type_id}"
                  />${channel.title}
                </label>`;
      container.appendChild(div);
    });
  }

  function renderTiming(datas, container) {
    datas.times.forEach((time) => {
      const div = document.createElement("div");
      div.classList.add("flex-center");
      formCounter++;
      const uniqueTimeId = "t" + time.id + formCounter;
      div.innerHTML = `<label
                  class="flex align-items-center"
                  for="${uniqueTimeId}"
                >
                  <input
                    type="checkbox"
                    name="timing"
                    id="${uniqueTimeId}"
                  />${time.title}
                </label>`;
      container.insertAdjacentElement("afterbegin", div);
    });
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
  const resFormBtns = document.querySelector(".response__form-buttons");

  function createNewForm() {
    let newForm = `
            <button type="button" class="remove_btn flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M1.6 16L0 14.4L6.4 8L0 1.6L1.6 0L8 6.4L14.4 0L16 1.6L9.6 8L16 14.4L14.4 16L8 9.6L1.6 16Z" fill="#5B5757"/>
                </svg>
            </button>
            <div class="rff_new">
                <div class="response__form-field inp">
                    <input data-title="Şirkıtin adı ümumi" type="text" name="company" placeholder="Şirkət" />
                </div>
                <div class="response__form-field">
                    <input type="text" name="product" placeholder="Məhsul" />
                </div>
                <div class="response__form-field rff">
                    <div class="selected flex-center" value="Reklam növü">
                        <span>Reklam növü</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14 10" fill="none">
                            <path d="M1.5 1L6.9176 8.88014C6.95733 8.93794 7.04267 8.93794 7.0824 8.88014L12.5 1" stroke="#5D5858" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </div>
                    <div class="response__form-options flex flex-direct-col" id="adTypeOptions"></div>
                </div>
                <div class="response__form-field rff">
                    <div class="selected flex-center" value="Reklam növü">
                        <span>Kanalar</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14 10" fill="none">
                            <path d="M1.5 1L6.9176 8.88014C6.95733 8.93794 7.04267 8.93794 7.0824 8.88014L12.5 1" stroke="#5D5858" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </div>
                    <div class="response__form-options flex flex-direct-col rfo" id="channels"></div>
                </div>
                <div class="response__form-field rff">
                    <div class="selected flex-center">
                        <span>Xronometraj</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14 10" fill="none">
                            <path d="M1.5 1L6.9176 8.88014C6.95733 8.93794 7.04267 8.93794 7.0824 8.88014L12.5 1" stroke="#5D5858" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </div>
                    <div class="response__form-options rfo flex flex-direct-col" id="timing">
                        <div class="flex-center rfo1" value="Reklam növü">
                            <label class="flex align-items-center justify-content-between">
                                <span>Digər&ThickSpace;</span>
                                <span>|</span>
                                <input type="number" name="timing" placeholder="saniyə" />
                            </label>
                        </div>
                    </div>
                </div>
                <div class="response__form-field">
                    <input type="date" name="" id="myInp" placeholder="Period" value="" />
                </div>
                <div class="response__form-field">
                    <input type="text" name="badge" placeholder="Büdcə(AZN)" />
                </div>
            </div>
        `;

    footer.classList.add("footer_main");
    resForm.insertAdjacentHTML("afterend", newForm);

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
      footer.classList.remove("footer_main");
    });

    getFlatCalendar();
  }

  createBtn.addEventListener("click", createNewForm);

  function getFlatCalendar() {
    const config = {
      enableTime: false,
      dateFormat: "d-m-Y",
      mode: "range",
      minDate: "today",
      disableMobile: "true",
      onChange: function (selectedDates, dateStr, instance) {
        const dateInp = document.querySelectorAll("#myInp");
        dateInp.forEach((inp) => {
          inp.style.fontSize = "1.33rem";
        });
        console.log(dateStr);
      },
      onOpen: [
        function (selectedDates, dateStr, instance) {
          //...
        },
        function (selectedDates, dateStr, instance) {
          //...
        },
      ],
      onClose: function (selectedDates, dateStr, instance) {
        // ...
      },
    };

    flatpickr("#myInp", config);
  }

  getFlatCalendar();
});

// form submit

const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");

// form.addEventListener("submit", ()=>{
//   inputs.forEach(input => {
//     alert(input.value)
//   })
// })
