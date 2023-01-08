const hamburger = document.querySelector("#hamburger");
const menu = document.querySelector("#menu");

// hamburger menu //
hamburger.addEventListener("click", () => {
  menu.classList.toggle("active");
  hamburger.classList.toggle("active");

  const ariaExpanded = hamburger.getAttribute("aria-expanded");

  if (ariaExpanded === "true") {
    hamburger.setAttribute("aria-expanded", false);
  } else {
    hamburger.setAttribute("aria-expanded", true);
  }
});

// valid url form //
const inputURL = document.querySelector("#link-input");

function isValidUrl(str) {
  const pattern = new RegExp(
    "^([a-zA-Z]+:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$", // fragment locator
    "i"
  );
  return pattern.test(str);
}
function checkURL() {
  const urlValue = inputURL.value.trim();
  const error = document.querySelector("#js-error-msg");
  const placeholder = document.querySelector(".link-input::placeholder");

  if (urlValue === "") {
    error.innerText = "Please add a link";
    error.classList.add("active");
    inputURL.classList.add("active");
    placeholder.classList.add("active");
  } else if (!isValidUrl(urlValue)) {
    error.innerText = "Link is not correct !";
    error.classList.add("active");
    inputURL.classList.add("active");
    placeholder.classList.add("active");
  } else {
    error.innerText = "";
    error.classList.remove("active");
    inputURL.classList.remove("active");
    placeholder.classList.remove("active");
  }
}

//button shorton it //
const shorten = document.querySelector("#js-shorten");
const formShorten = document.querySelector("#link-shorten");

formShorten.addEventListener("submit", (e) => {
  e.preventDefault();
  checkURL();
});
