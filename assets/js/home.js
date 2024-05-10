"use strict";

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

// create new response

const addBtn = document.querySelector(".add_btn");
const resForm = document.querySelector(
  ".response__form > form>div:first-child"
);

function createNewForm() {
  let newForm = `
  <button type="button" class="remove_btn flex">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M1.6 16L0 14.4L6.4 8L0 1.6L1.6 0L8 6.4L14.4 0L16 1.6L9.6 8L16 14.4L14.4 16L8 9.6L1.6 16Z"
      fill="#5B5757"
    />
  </svg>
</button>

  <div class="rff_new">
    <div class="response__form-field">
      <input type="text" name="product" id="" placeholder="Şirkət" />
    </div>
    <div class="response__form-field">
      <input type="text" name="product" id="" placeholder="Məhsul" />
    </div>

    <div class="response__form-field rff" name="" id="">
      <div class="selected flex-center" value="Reklam növü">
        <span>Reklam növü</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="10"
          viewBox="0 0 14 10"
          fill="none"
        >
          <path
            d="M1.5 1L6.9176 8.88014C6.95733 8.93794 7.04267 8.93794 7.0824 8.88014L12.5 1"
            stroke="#5D5858"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </div>
      <div class="response__form-options flex flex-direct-col">
        <div class="flex-center" value="Reklam növü">ATV</div>
        <div class="flex-center" value="Reklam növü">ARB</div>
        <div class="flex-center" value="Reklam növü">ARB 24</div>
        <div class="flex-center" value="Reklam növü">XƏZƏR TV</div>
        <div class="flex-center" value="Reklam növü">İCTİMAİ</div>
      </div>
    </div>

    <div class="response__form-field rff" name="" id="">
      <div class="selected flex-center" value="Reklam növü">
        <span>Kanalar</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="10"
          viewBox="0 0 14 10"
          fill="none"
        >
          <path
            d="M1.5 1L6.9176 8.88014C6.95733 8.93794 7.04267 8.93794 7.0824 8.88014L12.5 1"
            stroke="#5D5858"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </div>
      <div class="response__form-options flex flex-direct-col rfo">
        <div class="flex-center" value="Reklam növü">
          <label
            class="flex align-items-center justify-content-between"
            for="ch1"
          >
            <input type="checkbox" name="adstype" id="ch1" />AZTV
          </label>
        </div>
        <div class="flex-center" value="Reklam növü">
          <label
            class="flex align-items-center justify-content-between"
            for="ch2"
          >
            <input type="checkbox" name="adstype" id="ch2" />AZTV
          </label>
        </div>
        <div class="flex-center" value="Reklam növü">
          <label
            class="flex align-items-center justify-content-between"
            for="ch3"
          >
            <input type="checkbox" name="adstype" id="ch3" />AZTV
          </label>
        </div>
        <div class="flex-center" value="Reklam növü">
          <label
            class="flex align-items-center justify-content-between"
            for="ch4"
          >
            <input type="checkbox" name="adstype" id="ch4" />AZTV
          </label>
        </div>
        <div class="flex-center" value="Reklam növü">
          <label
            class="flex align-items-center justify-content-between"
            for="ch5"
          >
            <input type="checkbox" name="adstype" id="ch5" />AZTV
          </label>
        </div>
        <div class="flex-center" value="Reklam növü">
          <label
            class="flex align-items-center justify-content-between"
            for="adstype"
          >
            <input type="checkbox" name="adstype" id="adstype" />AZTV
          </label>
        </div>
      </div>
    </div>

    <div class="response__form-field rff" name="" id="">
      <div class="selected flex-center">
        <span>Xronometraj</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="10"
          viewBox="0 0 14 10"
          fill="none"
        >
          <path
            d="M1.5 1L6.9176 8.88014C6.95733 8.93794 7.04267 8.93794 7.0824 8.88014L12.5 1"
            stroke="#5D5858"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </div>
      <div class="response__form-options rfo flex flex-direct-col">
        <div class="flex-center" value="Reklam növü">
          <label
            class="flex align-items-center justify-content-between"
            for="1"
          >
            <input type="checkbox" name="timing" id="1" />10 saniyə
          </label>
        </div>
        <div class="flex-center" value="Reklam növü">
          <label
            class="flex align-items-center justify-content-between"
            for="2"
          >
            <input type="checkbox" name="timing" id="2" />15 saniyə
          </label>
        </div>
        <div class="flex-center" value="Reklam növü">
          <label
            class="flex align-items-center justify-content-between"
            for="3"
          >
            <input type="checkbox" name="timing" id="3" />20 saniyə
          </label>
        </div>
        <div class="flex-center" value="Reklam növü">
          <label
            class="flex align-items-center justify-content-between"
            for="4"
          >
            <input type="checkbox" name="timing" id="4" />30 saniyə
          </label>
        </div>
      </div>
    </div>

    <div class="response__form-field rff" name="" id="">
      <div class="selected flex-center" value="Reklam növü">
        <span>Period</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="10"
          viewBox="0 0 14 10"
          fill="none"
        >
          <path
            d="M1.5 1L6.9176 8.88014C6.95733 8.93794 7.04267 8.93794 7.0824 8.88014L12.5 1"
            stroke="#5D5858"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </div>
      <div class="response__form-options flex flex-direct-col">
        <div class="flex-center" value="Reklam növü">Reklam növü</div>
        <div class="flex-center" value="Reklam növü">Reklam növü</div>
      </div>
    </div>

    <div class="response__form-field">
      <input
        type="text"
        name="product"
        id=""
        placeholder="Büdcə(AZN)"
      />
    </div>
  </div>
    `;

  resForm.insertAdjacentHTML("afterend", newForm);

  // Get all newly created .rff elements
  const newResponseSelects = document.querySelectorAll(".rff_new > .rff");

  // Loop through each new .rff element and add event listeners
  newResponseSelects.forEach((select) => {
    select.addEventListener("click", (e) => {
      // Close any previously opened options
      newResponseSelects.forEach((s) => {
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

  // Add event listener for the remove button
  const removeBtn = document.querySelector(".remove_btn");
  removeBtn.addEventListener("click", () => {
    removeBtn.nextElementSibling.remove();
    removeBtn.remove();
  });
}

addBtn.addEventListener("click", createNewForm);
