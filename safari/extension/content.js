(() => {
  const S = window.HEALTH_SCORES;
  const DEF = window.HEALTH_DEFAULT_SCORE;
  const STEP = window.HEALTH_DESAT_PER_POINT;
  const score = (label) => (label in S ? S[label] : DEF);
  const label = (el) => el.textContent.trim();

  // Finds the category bar: a container with many children that hold an image + a known category.
  function findRow() {
    const anchorLi = [...document.querySelectorAll("li")].find((li) => label(li) in S && li.querySelector("img"));
    if (!anchorLi) return null;
    let el = anchorLi;
    while (el.parentElement && el.parentElement !== document.body) {
      const p = el.parentElement;
      const known = [...p.children].filter((c) => c.querySelector("img") && label(c) in S).length;
      if (known >= 5) return p;
      el = p;
    }
    return null;
  }

  function apply() {
    const row = findRow();
    if (!row) return;
    const kids = [...row.children];
    const items = kids.filter((c) => c.querySelector("img"));
    const spacers = kids.filter((c) => !c.querySelector("img"));
    const sorted = [...items].sort((a, b) => score(label(a)) - score(label(b)));

    // Put the spacers (empty DIVs) back between the items
    const desired = [];
    sorted.forEach((it, i) => {
      desired.push(it);
      if (i < sorted.length - 1 && spacers[i]) desired.push(spacers[i]);
    });
    spacers.slice(Math.max(0, sorted.length - 1)).forEach((s) => desired.push(s));
    if (desired.some((el, i) => kids[i] !== el)) desired.forEach((el) => row.appendChild(el));

    // The less healthy, the less saturation
    sorted.forEach((it) => {
      const sat = Math.max(0.05, 1 - score(label(it)) * STEP).toFixed(2);
      const f = `saturate(${sat})`;
      it.querySelectorAll("img").forEach((img) => {
        if (img.style.filter !== f) {
          img.style.filter = f;
          img.style.transition = "filter .3s";
        }
      });
    });
  }

  // Uber Eats is a React app and re-renders → re-apply on DOM changes
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
