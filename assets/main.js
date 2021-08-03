const filterButton = document.querySelectorAll(".filter-button");
const alleButton = document.querySelector(".alle-button");

filterButton.forEach(function (button) {
  button.addEventListener("click", function () {
    filterButtonZuruecksetzen();
    removeSearch();
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
    document.querySelector(".filter-box").classList.add("notshown");
    document.querySelector("#close-filter-box").style.display = "none";
    document.querySelector("#open-filter-box").style.display = "block";
    document.querySelector(".sidebar").classList.add("hidden-bar");
  });

document
  .querySelector("#open-filter-box")
  .addEventListener("click", function () {
    document.querySelector(".sidebar").classList.remove("hidden-bar");
    document.querySelector(".filter-box").classList.remove("notshown");
    document.querySelector("#close-filter-box").style.display = "block";
    document.querySelector("#open-filter-box").style.display = "none";
  });

/*Zeile für css print*/
document
  .querySelectorAll(".lozad")
  .forEach((el) => (el.src = el.getAttribute("data-src")));
