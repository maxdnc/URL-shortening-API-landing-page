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
/*
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
}*/

function checkURL() {
  const urlValue = inputURL.value.trim();
  const error = document.querySelector("#js-error-msg");
  const shortenLink = async () => {
    const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${urlValue}`);
    const data = await res.json();
    return data;
  };

  shortenLink().then((data) => {
    if (data.error_code === 1) {
      error.innerText = "No url parameter set";
      error.classList.add("active");
      inputURL.classList.add("active");
    } else if (data.error_code > 1) {
      error.innerText = "Invalid URL submitted";
      error.classList.add("active");
      inputURL.classList.add("active");
    } else {
      inputURL.value = "";
      error.innerText = "";
      error.classList.remove("active");
      inputURL.classList.remove("active");
      const shortLink = data.result.short_link;
      const originalLink = data.result.original_link;
      const sectionLink = document.querySelector("#result-link");
      const resultLink = document.createElement("div");
      resultLink.setAttribute("class", "shortened-link");
      sectionLink.appendChild(resultLink);
      // add html code for box for link //
      resultLink.innerHTML = ` <a class="yourlink" href="${originalLink}"> ${originalLink} </a>
      <div class="bar-link">
      <input style="opacity: 0; position: absolute; right: 1000px;" value="${shortLink}" ></input>
      <a class="ourlink" href="${shortLink}"> ${shortLink} </a>
      <button  class="copybutton btn" type="button">Copy</button></div>`;

      copybutton.forEach((element) => {
        element.addEventListener("click", () => {
          fCopy();
          console.log("hello");
          element.classList.add("active");
          element.innerText = "Copied!";
          setTimeout(() => {
            element.classList.remove("active");
            element.innerText = "Copy";
          }, "2000");
        });
      });
    }
  });
}

// button copy function //
const copybutton = document.querySelectorAll(".copybutton");
const copyText = document.querySelectorAll(".ourlink");

async function fCopy() {
  for (element of copyText) {
    try {
      await navigator.clipboard.writeText(element.innerText);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
    console.log(element.innerText);
  }
}

//button shorton it //
const shorten = document.querySelector("#js-shorten");
const formShorten = document.querySelector("#link-shorten");

formShorten.addEventListener("submit", (e) => {
  e.preventDefault();
  checkURL();
});

/*
function fCopy() {
  const copybutton = document.querySelectorAll(".copybutton");
  const copyText = document.querySelectorAll(".ourlink");
  const shorterCopy = copyText.previousElementSibling;
  for (element of copyText) {
    element.innerText.select();
    document.execCommand("copy");
    console.log(shorterCopy);
  }
}*/
