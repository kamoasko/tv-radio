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
$(document).ready(function () {
  // Cache the number of options
  var $this = $("#lang"),
    numberOfOptions = $this.children("option").length;

  let allOptions = $this.children("option");
  let dataUrls = []; // To store the URLs

  allOptions.each(function () {
    let url = $(this).data("url");
    dataUrls.push(url);
  });

  // Hides the select element
  $this.addClass("s-hidden");

  $this.wrap('<div class="select"></div>');
  $this.after('<div class="styledSelect"></div>');
  var $styledSelect = $this.next("div.styledSelect");

  function setStyledSelectText() {
    let selectedOption = $this.children("option:selected").text();
    $styledSelect.text(selectedOption);
  }
  setStyledSelectText();

  var $list = $("<ul />", {
    class: "options",
  }).insertAfter($styledSelect);

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
    console.log($this.val());
    $list.hide();

    // Save the selected value to localStorage
    localStorage.setItem("selectedLang", $this.val());

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
  var savedLang = localStorage.getItem("selectedLang");
  if (savedLang) {
    $this.val(savedLang);
    setStyledSelectText();
  }
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
