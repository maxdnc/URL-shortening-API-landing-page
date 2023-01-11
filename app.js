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
      resultLink.innerHTML = `<div class="link-wrapper"><a class="yourlink" href="${originalLink}"> ${originalLink} </a>
      <div class="bar-link">
      <input style="opacity: 0; position: absolute; right: 1000px;" value="${shortLink}" ></input>
      <a class="ourlink" href="${shortLink}"> ${shortLink} </a>
      <button class="copybutton btn" type="button">Copy</button></div></div>`;

      const linkWrappers = document.querySelectorAll(".link-wrapper");
      // copy link button //
      linkWrappers.forEach((element) => {
        const button = element.querySelector(".copybutton");
        const link = element.querySelector(".ourlink");
        function eventListener() {
          fCopy(link);
          button.classList.add("active");
          button.innerText = "Copied!";
          setTimeout(() => {
            button.classList.remove("active");
            button.innerText = "Copy";
          }, "2000");
        }
        button.removeEventListener("click", eventListener);
        button.addEventListener("click", eventListener);
      });
    }
  });
}

//button shorton it //
const shorten = document.querySelector("#js-shorten");
const formShorten = document.querySelector("#link-shorten");

formShorten.addEventListener("submit", (e) => {
  e.preventDefault();
  checkURL();
});

const copybutton = document.querySelectorAll(".copybutton");
const copyText = document.querySelectorAll(".ourlink");

async function fCopy(element) {
  try {
    await navigator.clipboard.writeText(element.innerText);
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
  console.log(element.innerText);
}
