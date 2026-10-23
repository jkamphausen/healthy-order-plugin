(() => {
  const S = window.HEALTH_SCORES;
  const DEF = window.HEALTH_DEFAULT_SCORE;
  const STEP = window.HEALTH_DESAT_PER_POINT;

  // alias (normalised) → category ID
  const norm = (s) => String(s).trim().toLowerCase().replace(/\s+/g, " ");
  const ALIAS = new Map();
  for (const [id, names] of Object.entries(window.HEALTH_ALIASES)) names.forEach((n) => ALIAS.set(norm(n), id));

  const label = (el) => el.textContent.trim();
  const isItem = (el) => Boolean(el.querySelector("img"));

  // Language-independent key: the icon file name without extension (e.g. ".../v1/Salad.png" → "Salad").
  function imageKey(el) {
    const img = el.querySelector("img");
    const src = img && (img.getAttribute("src") || "");
    const file = src.split("?")[0].split("/").pop() || "";
    return file.replace(/\.[a-z0-9]+$/i, "");
  }

  // Category ID of an item, or null. The icon key is preferred over the (translated) label.
  function categoryId(el) {
    return ALIAS.get(norm(imageKey(el))) || ALIAS.get(norm(label(el))) || null;
  }

  // Unknown categories: default score, logged once per label so the alias table can be extended.
  const reported = new Set();
  function score(el) {
    const id = categoryId(el);
    if (id) return S[id];
    const l = label(el);
    if (!reported.has(l)) { reported.add(l); console.debug("[Healthy Order] unknown category:", l); }
    return DEF;
  }

  // Finds the category bar: a container with many children, at least 5 of them holding an icon of a known category.
  function findRow() {
    const seen = new Set();
    for (const img of document.querySelectorAll("img")) {
      let el = img;
      while (el.parentElement && el.parentElement !== document.body && el.parentElement.children.length < 5) el = el.parentElement;
      const row = el.parentElement;
      if (!row || row === document.body || seen.has(row)) continue;
      seen.add(row);
      const known = [...row.children].filter((c) => isItem(c) && categoryId(c)).length;
      if (known >= 5) return row;
    }
    return null;
  }

  function apply() {
    const row = findRow();
    if (!row) return;
    const kids = [...row.children];
    const slots = kids.map((c, i) => i).filter((i) => isItem(kids[i]));
    const items = slots.map((i) => kids[i]);
    const sorted = [...items].sort((a, b) => score(a) - score(b)); // stable: equal scores keep page order

    // Permute only the items among the item slots; spacers and other children stay where they are.
    if (sorted.some((it, i) => it !== items[i])) {
      const desired = kids.slice();
      slots.forEach((slot, j) => { desired[slot] = sorted[j]; });
      desired.forEach((el, i) => {
        if (row.children[i] !== el) row.insertBefore(el, row.children[i] || null);
      });
    }

    // The less healthy, the less saturation
    sorted.forEach((it) => {
      const sat = Math.max(0.05, 1 - score(it) * STEP).toFixed(2);
      const f = `saturate(${sat})`;
      it.querySelectorAll("img").forEach((img) => {
        if (img.style.filter !== f) {
          img.style.filter = f;
          img.style.transition = "filter .3s";
        }
      });
    });
  }

  // Uber Eats is a React app and re-renders → re-apply on DOM changes.
  // The observer is disconnected while apply() runs, so our own changes never trigger it again.
  let scheduled = false;
  const observer = new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      observer.disconnect();
      try { apply(); } catch (e) { console.warn("[Healthy Order]", e); }
      observer.observe(document.body, { childList: true, subtree: true });
      scheduled = false;
    });
  });

  apply();
  observer.observe(document.body, { childList: true, subtree: true });
})();
