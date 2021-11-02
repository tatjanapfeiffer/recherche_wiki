function throttle(callback, wait, immediate = false) {
  let timeout = null;
  let initialCall = true;

  return function () {
    const callNow = immediate && initialCall;
    const next = () => {
      callback.apply(this, arguments);
      timeout = null;
    };

    if (callNow) {
      initialCall = false;
      next();
    }

    if (!timeout) {
      timeout = setTimeout(next, wait);
    }
  };
}

const filterButton = document.querySelectorAll(".filter-button");
const alleButton = document.querySelector(".alle-button");

filterButton.forEach(function (button) {
  button.addEventListener("click", function () {
    filterButtonZuruecksetzen();
    removeSearch();
    document.querySelector(".Suche").value = "";
    alleButton.classList.remove("aktiv");

    filterAnwenden(button.dataset.tag);
    button.classList.add("aktiv");

    document.scrollingElement.scrollTop = 0;
  });
});

alleButton.addEventListener("click", function () {
  filterAufheben();
  alleButton.classList.add("aktiv");
});

function filterButtonZuruecksetzen() {
  filterButton.forEach(function (button) {
    button.classList.remove("aktiv");
  });
}

/**
 * Testen, ob element tag enthält.
 */
function elementHatTag(element, tag) {
  return element.classList.contains(`tag-${tag}`);
}

function filterAufheben() {
  filterButtonZuruecksetzen();
  document.querySelectorAll(".hide").forEach(function (element) {
    element.classList.remove("hide");
  });
}

function filterAnwenden(tag) {
  const tagClass = `tag-${tag}`;

  document.querySelectorAll(".begriff").forEach(function (begriff) {
    const begriffHatTag = elementHatTag(begriff, tag);
    const beispielHatTag = begriff.querySelectorAll(
      `.beispiel.${tagClass}`
    ).length;
    begriff.classList.toggle("hide", !begriffHatTag && !beispielHatTag);
  });

  document.querySelectorAll(".beispiel").forEach(function (beispiel) {
    const beispielHatTag = elementHatTag(beispiel, tag);
    beispiel.classList.toggle("hide", !beispielHatTag);
  });
}

[...document.links].forEach((link) => {
  if (link.hostname != window.location.hostname) link.target = "_blank";
});

document.querySelector(".Suche").addEventListener("change", (event) => {
  runSearch(event.target.value);
});

const observer = lozad();
observer.observe();
history.scrollRestoration = "manual";

document
  .querySelector("#close-filter-box")
  .addEventListener("click", function () {
    document.querySelector(".sidebar").classList.add("collapse");
  });

document
  .querySelector("#open-filter-box")
  .addEventListener("click", function () {
    document.querySelector(".sidebar").classList.remove("collapse");
  });

// document.querySelector(".heat-map-wrapper").style.height =
//   document.body.scrollHeight + "px";

// // create a heatmap instance
// const heatmap = h337.create({
//   container: document.querySelector(".heat-map"),
//   radius: 60,
// });

// document.body.addEventListener(
//   "mousemove",
//   throttle(function (event) {
//     heatmap.addData({
//       x: event.layerX,
//       y: event.layerY,
//     });
//   }, 500)
// );

document.body.addEventListener("click", function (event) {
  heatmap.addData({
    x: event.layerX,
    y: event.layerY,
  });
});

/*Zeile für css print*/
// document
//   .querySelectorAll(".lozad")
//   .forEach((el) => (el.src = el.getAttribute("data-src")));
