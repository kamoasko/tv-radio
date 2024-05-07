"use strict";

// mobile navbar dropdown open and close

const navbarMenu = document.querySelector(".navbar__menu");
const navbarMenuLis = document.querySelectorAll(".navbar__menu > li");
const dropdown = document.querySelector(".dropdown");

function openDropdown(e) {
  const clickedElement = e.target;
  const parentLi = clickedElement.closest("li");
  const dropdown = parentLi.querySelector(".dropdown");

  if (parentLi && dropdown) {
    navbarMenu.querySelectorAll(".opened").forEach((li) => {
      if (li !== parentLi) {
        li.classList.remove("opened");
      }
    });
    parentLi.classList.toggle("opened");
  }
}

navbarMenu.addEventListener("click", openDropdown);

// open and close hamburger menu

const hamburger = document.querySelector(".navbar__hamburger");
const closeHamburger = document.querySelector(".close_menu > button");

function openNavMenu() {
  navbarMenu.classList.add("active");
}

function closeNavMenu() {
  navbarMenu.classList.remove("active");
  navbarMenuLis.forEach((li) => {
    li.classList.remove("opened");
  });
}

hamburger.addEventListener("click", openNavMenu);
closeHamburger.addEventListener("click", closeNavMenu);

// default language change
// Iterate over each select element
$("#lang").each(function () {
  // Cache the number of options
  var $this = $(this),
    numberOfOptions = $(this).children("option").length;

  let allOptions = $(this).children("option");
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
  $this.after('<div class="styledSelect"></div>');

  // Cache the styled div
  var $styledSelect = $this.next("div.styledSelect");

  // Show the first select option in the styled div
  $styledSelect.text($this.children("option").eq(0).text());

  // Insert an unordered list after the styled div and also cache the list
  var $list = $("<ul />", {
    class: "options",
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
    $styledSelect.text($(this).text()).removeClass("active");
    $this.val($(this).attr("rel"));
    $list.hide();

    var selectedUrl = $(this).data("url");
    if (selectedUrl) {
      window.location.href = selectedUrl;
    }
    /* alert($this.val()); Uncomment this for demonstration! */
  });

  // Hides the unordered list when clicking outside of it
  $(document).click(function () {
    $styledSelect.removeClass("active");
    $list.hide();
  });
});

// mobile labguage change

let mobLangChange = document.querySelectorAll(".lang_option");

mobLangChange.forEach((option) => {
  option.addEventListener("click", (e) => {
    const dataUrl = e.target.getAttribute("data-url");

    if (dataUrl) {
      window.location.href = dataUrl;
    }
  });
});

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
