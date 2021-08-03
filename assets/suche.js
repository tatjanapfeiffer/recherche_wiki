const nanoid = (t = 21) => {
  let e = "",
    r = crypto.getRandomValues(new Uint8Array(t));
  for (; t--; ) {
    let n = 63 & r[t];
    e +=
      n < 36
        ? n.toString(36)
        : n < 62
        ? (n - 26).toString(36).toUpperCase()
        : n < 63
        ? "_"
        : "-";
  }
  return e;
};

const escapeRegExp = (str) => str.replace(/([-.*+?^${}()|[\]\/\\])/g, "\\$1");

const addHighlights = (regExp, paragraph) => {
  // Replace tags first, then place them back after hightlight
  // replacement, to avoid destruction of tags.
  const tags = {};
  paragraph.innerHTML = paragraph.innerHTML
    .replace(/<[^>]+>/gi, (tag) => {
      // Make sure ids for replaced tags don't collide with search terms.
      let id;
      do {
        id = nanoid(16);
      } while (regExp.test(id));
      tags[id] = tag;
      return `###${id}###`;
    })
    .replace(regExp, '<span class="highlight">$1</span>')
    .replace(/###([^#]+)###/gi, (_, id) => tags[id]);

  const begriff = paragraph.closest(".begriff");
  begriff?.classList.add("has-highlights");

  const beispiel = paragraph.closest(".beispiel");
  beispiel?.classList.add("has-highlights");
};

const removeSearch = () => {
  document
    .querySelector(".begriffe")
    .classList.remove("display-search-results");

  document.querySelector(".begriffe").classList.remove("no-results");

  const highlights = Array.from(
    document.querySelectorAll(".begriffe .highlight")
  );
  for (const highlight of highlights) {
    const paragraph = highlight.closest("p");
    if (paragraph) {
      const begriff = paragraph.closest(".begriff");
      begriff?.classList.remove("has-highlights");

      const beispiel = paragraph.closest(".beispiel");
      beispiel?.classList.remove("has-highlights");

      removeHighlights(paragraph);
    }
  }
};

const removeHighlights = (paragraph) => {
  paragraph.innerHTML = paragraph.innerHTML.replace(
    /<span class="highlight">([^<]+)<\/span>/gi,
    (_, term) => term
  );
};

const runSearch = (term) => {
  document.scrollingElement.scrollTop = 0;
  removeSearch();
  let foundSomething = false;
  term = term.trim();
  const terms = term.length > 2 ? term.toLowerCase().split(/\s+/) : [];
  if (terms.length > 0) {
    document.querySelector(".begriffe").classList.add("display-search-results");
    const paragraphs = Array.from(document.querySelectorAll(".begriffe p"));
    // Escape terms for highlights RegExp:
    const regExp = new RegExp(`(${terms.map(escapeRegExp).join("|")})`, "gi");
    const matched = paragraphs.filter((p) => regExp.test(p.textContent));
    if (matched.length > 0) {
      foundSomething = true;
      for (const paragraph of matched) {
        addHighlights(regExp, paragraph);
      }
    }

    if (!foundSomething) {
      document.querySelector(".begriffe").classList.add("no-results");
    }
  }
};
