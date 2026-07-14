(() => {
  "use strict";

  const frame = document.querySelector("#app-frame");
  const status = document.querySelector("#qa-status");
  const output = document.querySelector("#qa-results");
  const requiredAppIds = [
    "product-file",
    "use-example-product",
    "dropzone",
    "file-error",
    "file-preview",
    "preview-image",
    "file-name",
    "file-size",
    "analysis-card",
    "analysis-title",
    "analysis-category",
    "analysis-logo",
    "analysis-package-text",
    "analysis-material",
    "analysis-color",
    "generate-button"
  ];

  function requiredElement(appDocument, id) {
    const element = appDocument.querySelector(`#${id}`);
    if (!element) throw new Error(`Real index.html is missing required #${id}`);
    return element;
  }

  function assertRealAppContract(appDocument) {
    if (!appDocument.location.pathname.endsWith("/user/index.html")) {
      throw new Error(`Harness loaded ${appDocument.location.pathname}, not the real user/index.html`);
    }
    if (!appDocument.querySelector('script[src="app.js"]')) {
      throw new Error("Real index.html does not load app.js");
    }
    requiredAppIds.forEach((id) => requiredElement(appDocument, id));
  }

  function loadFreshApp(caseName) {
    return new Promise((resolve, reject) => {
      const timeout = window.setTimeout(() => reject(new Error(`Timed out loading app for ${caseName}`)), 5000);
      frame.addEventListener("load", () => {
        window.clearTimeout(timeout);
        try {
          assertRealAppContract(frame.contentDocument);
          resolve(frame.contentDocument);
        } catch (error) {
          reject(error);
        }
      }, { once: true });
      frame.src = `../user/index.html?qa-invalid=${encodeURIComponent(caseName)}&t=${Date.now()}`;
    });
  }

  async function runRealInputCase({ name, file, expectedText }) {
    const appDocument = await loadFreshApp(name);
    const input = appDocument.querySelector("#product-file");
    const transfer = new DataTransfer();
    transfer.items.add(file);
    input.files = transfer.files;
    input.dispatchEvent(new Event("change", { bubbles: true }));

    const error = appDocument.querySelector("#file-error");
    const result = {
      name,
      fileName: input.files[0]?.name || "",
      fileType: input.files[0]?.type || "",
      fileSize: input.files[0]?.size || 0,
      errorVisible: !error.hidden,
      errorText: error.textContent.trim(),
      expectedText,
      previewHidden: appDocument.querySelector("#file-preview").hidden,
      analysisHidden: appDocument.querySelector("#analysis-card").hidden,
      generateDisabled: appDocument.querySelector("#generate-button").disabled,
      ariaInvalid: appDocument.querySelector("#dropzone").getAttribute("aria-invalid")
    };
    result.pass = result.errorVisible
      && result.errorText === expectedText
      && result.previewHidden
      && result.analysisHidden
      && result.generateDisabled
      && result.ariaInvalid === "true";
    return result;
  }

  function assignFile(input, file) {
    const transfer = new DataTransfer();
    transfer.items.add(file);
    input.files = transfer.files;
    input.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function raceObservation(appDocument) {
    return {
      fileName: requiredElement(appDocument, "file-name").textContent,
      errorText: requiredElement(appDocument, "file-error").textContent.trim(),
      errorVisible: !requiredElement(appDocument, "file-error").hidden,
      previewVisible: !requiredElement(appDocument, "file-preview").hidden,
      analysisTitle: requiredElement(appDocument, "analysis-title").textContent,
      generateDisabled: requiredElement(appDocument, "generate-button").disabled
    };
  }

  function waitForStableExpectedState(appDocument, expected, timeoutMs = 3000) {
    return new Promise((resolve, reject) => {
      const startedAt = performance.now();
      let stableSince = null;
      let lastSnapshot = "";
      const poll = () => {
        const observed = raceObservation(appDocument);
        const snapshot = JSON.stringify(observed);
        if (expected(observed)) {
          stableSince = snapshot === lastSnapshot ? stableSince ?? performance.now() : performance.now();
          if (performance.now() - stableSince >= 900) {
            resolve(observed);
            return;
          }
        } else {
          stableSince = null;
        }
        lastSnapshot = snapshot;
        if (performance.now() - startedAt >= timeoutMs) {
          reject(new Error(`Race result did not settle: ${snapshot}`));
          return;
        }
        window.setTimeout(poll, 40);
      };
      poll();
    });
  }

  async function runRaceCase({ name, secondAction, expected }) {
    const appDocument = await loadFreshApp(name);
    const input = appDocument.querySelector("#product-file");
    assignFile(input, new File([new Uint8Array(9 * 1024 * 1024)], "slow-valid.png", { type: "image/png" }));
    secondAction({ appDocument, input });
    const observed = await waitForStableExpectedState(appDocument, expected);
    return { name, observed, pass: true };
  }

  async function run() {
    try {
      const results = [];
      results.push(await runRealInputCase({
        name: "unsupported MIME",
        file: new File(["not an image"], "payload.txt", { type: "text/plain" }),
        expectedText: "无法使用“payload.txt”。请选择 PNG、JPG 或 WebP 图片。"
      }));
      results.push(await runRealInputCase({
        name: "oversized image",
        file: new File([new Uint8Array(10 * 1024 * 1024 + 1)], "oversized.png", { type: "image/png" }),
        expectedText: "“oversized.png”超过 10 MB，请选择更小的图片。"
      }));
      results.push(await runRaceCase({
        name: "valid image then unsupported file",
        secondAction: ({ input }) => assignFile(input, new File(["not an image"], "latest.txt", { type: "text/plain" })),
        expected: (observed) => observed.errorVisible
          && observed.errorText === "无法使用“latest.txt”。请选择 PNG、JPG 或 WebP 图片。"
          && !observed.previewVisible
          && observed.generateDisabled
      }));
      results.push(await runRaceCase({
        name: "valid image then example product",
        secondAction: ({ appDocument }) => appDocument.querySelector("#use-example-product").click(),
        expected: (observed) => observed.fileName === "示例商品 · 海玻璃绿套装"
          && !observed.errorVisible
          && observed.previewVisible
          && observed.analysisTitle === "示例属性：无品牌护肤泵瓶与包装盒"
          && !observed.generateDisabled
      }));

      const report = {
        harness: "same-origin iframe driving the real #product-file change handler",
        appPath: "../user/index.html",
        pass: results.every((result) => result.pass),
        results
      };
      window.QA_RESULTS = report;
      output.textContent = JSON.stringify(report, null, 2);
      status.textContent = report.pass ? "PASS" : "FAIL";
      status.dataset.complete = "true";
    } catch (error) {
      const report = { pass: false, error: error instanceof Error ? error.message : String(error) };
      window.QA_RESULTS = report;
      output.textContent = JSON.stringify(report, null, 2);
      status.textContent = "FAIL";
      status.dataset.complete = "true";
    }
  }

  run();
})();
