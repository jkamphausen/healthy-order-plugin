// Onboarding / options page: collects user ID, gender and age range with consent,
// stores them in chrome.storage.local only. No network, no page content.
(() => {
  const STORAGE_KEY = "participant";
  const GENDERS = ["male", "female", "diverse"];
  const AGE_RANGES = ["18-29", "30-44", "45-59", "60+"];
  const LABELS = {
    gender: { male: "Male", female: "Female", diverse: "Diverse" },
    ageRange: { "18-29": "18–29", "30-44": "30–44", "45-59": "45–59", "60+": "60 or older" },
  };

  const $ = (id) => document.getElementById(id);
  const views = { form: $("view-form"), summary: $("view-summary"), stored: $("view-stored") };
  const form = $("form");
  let pending = null; // validated values waiting for confirmation

  // --- validation -----------------------------------------------------------

  // Returns { ok: true, value } or { ok: false, message }. Never corrects input.
  function validateUserId(raw) {
    const s = String(raw).trim();
    if (s === "") return { ok: false, message: "Please enter your user ID." };
    if (!/^[0-9]+$/.test(s)) return { ok: false, message: "The user ID must contain digits only (no letters, spaces or signs)." };
    if (!/^[1-9][0-9]*$/.test(s)) return { ok: false, message: "The user ID must be a positive whole number greater than 0, without leading zeros." };
    const n = Number(s);
    if (!Number.isSafeInteger(n)) return { ok: false, message: "The user ID is too large." };
    return { ok: true, value: n };
  }

  function validateChoice(raw, allowed, what) {
    if (raw == null || raw === "") return { ok: false, message: `Please select your ${what}.` };
    if (!allowed.includes(raw)) return { ok: false, message: `Invalid ${what}. Please choose one of the given options.` };
    return { ok: true, value: raw };
  }

  // Checks a record loaded from storage. Returns the record or null if it is unusable.
  function validRecord(r) {
    if (!r || typeof r !== "object") return null;
    const id = Number.isSafeInteger(r.userId) && r.userId > 0;
    const g = GENDERS.includes(r.gender);
    const a = AGE_RANGES.includes(r.ageRange);
    return id && g && a ? { userId: r.userId, gender: r.gender, ageRange: r.ageRange } : null;
  }

  // --- storage --------------------------------------------------------------

  async function load() {
    const data = await chrome.storage.local.get(STORAGE_KEY);
    return data[STORAGE_KEY];
  }
  const save = (record) => chrome.storage.local.set({ [STORAGE_KEY]: record });
  const remove = () => chrome.storage.local.remove(STORAGE_KEY);

  // --- UI -------------------------------------------------------------------

  function show(name) {
    for (const [k, el] of Object.entries(views)) el.hidden = k !== name;
    $("storage-error").textContent = "";
  }

  function setError(field, message) {
    const p = document.querySelector(`[data-error-for="${field}"]`);
    p.textContent = message || "";
    const inputs = form.querySelectorAll(`[name="${field}"]`);
    inputs.forEach((i) => i.classList.toggle("invalid", Boolean(message)));
  }

  function clearErrors() {
    ["consent", "userId", "gender", "ageRange"].forEach((f) => setError(f, ""));
    $("form-error").textContent = "";
  }

  function renderValues(dl, record) {
    dl.textContent = "";
    const rows = [
      ["User ID", String(record.userId)],
      ["Gender", LABELS.gender[record.gender]],
      ["Age range", LABELS.ageRange[record.ageRange]],
    ];
    for (const [k, v] of rows) {
      const dt = document.createElement("dt");
      const dd = document.createElement("dd");
      dt.textContent = k;
      dd.textContent = v;
      dl.append(dt, dd);
    }
  }

  function fillForm(record) {
    form.reset();
    if (!record) return;
    form.userId.value = String(record.userId);
    form.querySelectorAll(`[name="gender"]`).forEach((r) => (r.checked = r.value === record.gender));
    form.querySelectorAll(`[name="ageRange"]`).forEach((r) => (r.checked = r.value === record.ageRange));
  }

  function showStored(record, notice) {
    renderValues($("stored-values"), record);
    const n = $("stored-notice");
    n.textContent = notice || "";
    n.hidden = !notice;
    $("delete-confirm").hidden = true;
    show("stored");
  }

  function showForm(record, isEdit) {
    clearErrors();
    fillForm(record);
    $("cancel-edit").hidden = !isEdit;
    show("form");
    form.consent.focus();
  }

  // --- events ---------------------------------------------------------------

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();
    const fd = new FormData(form);
    let ok = true;

    if (!form.consent.checked) {
      setError("consent", "Consent is required. Without it nothing is stored.");
      ok = false;
    }
    const id = validateUserId(fd.get("userId") ?? "");
    if (!id.ok) { setError("userId", id.message); ok = false; }
    const gender = validateChoice(fd.get("gender"), GENDERS, "gender");
    if (!gender.ok) { setError("gender", gender.message); ok = false; }
    const age = validateChoice(fd.get("ageRange"), AGE_RANGES, "age range");
    if (!age.ok) { setError("ageRange", age.message); ok = false; }

    if (!ok) {
      $("form-error").textContent = "Please correct the highlighted fields.";
      return;
    }
    pending = { userId: id.value, gender: gender.value, ageRange: age.value };
    renderValues($("summary-values"), pending);
    show("summary");
  });

  $("back").addEventListener("click", () => show("form"));

  $("save").addEventListener("click", async () => {
    if (!pending) return show("form");
    try {
      await save(pending);
      const saved = pending;
      pending = null;
      showStored(saved, "Saved. The data is stored in this browser only.");
    } catch (err) {
      $("storage-error").textContent = `Could not save: ${err && err.message ? err.message : err}`;
    }
  });

  $("edit").addEventListener("click", async () => {
    const record = validRecord(await load());
    showForm(record, true);
  });

  $("cancel-edit").addEventListener("click", async () => {
    const record = validRecord(await load());
    if (record) showStored(record);
    else showForm(null, false);
  });

  $("delete").addEventListener("click", () => { $("delete-confirm").hidden = false; });
  $("delete-no").addEventListener("click", () => { $("delete-confirm").hidden = true; });
  $("delete-yes").addEventListener("click", async () => {
    try {
      await remove();
      showForm(null, false);
      $("form-error").textContent = "All stored data has been deleted.";
    } catch (err) {
      $("storage-error").textContent = `Could not delete: ${err && err.message ? err.message : err}`;
    }
  });

  // --- start ----------------------------------------------------------------

  (async () => {
    try {
      const raw = await load();
      const record = validRecord(raw);
      if (record) showStored(record);
      else if (raw !== undefined) {
        // Something is stored but not in the expected form: do not guess, let the user re-enter or delete.
        await remove();
        showForm(null, false);
        $("form-error").textContent = "Stored data was invalid and has been removed. Please enter your data again.";
      } else showForm(null, false);
    } catch (err) {
      show("form");
      $("storage-error").textContent = `Could not read storage: ${err && err.message ? err.message : err}`;
    }
  })();
})();
