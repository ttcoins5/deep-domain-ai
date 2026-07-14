import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [html, css, js, rootHtml, adminHtml, adminCss] = await Promise.all([
  readFile(new URL("../user/index.html", import.meta.url), "utf8"),
  readFile(new URL("../user/styles.css", import.meta.url), "utf8"),
  readFile(new URL("../user/app.js", import.meta.url), "utf8"),
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../admin/index.html", import.meta.url), "utf8"),
  readFile(new URL("../admin/styles.css", import.meta.url), "utf8")
]);

for (const copy of ["把一张商品图", "变成一整套", "商品图生成", "智能场景替换", "批量素材扩展", "AI 图像", "AI 电商", "商品图上新"]) assert.ok(html.includes(copy), `missing copy: ${copy}`);
for (const route of ["home", "image", "commerce", "studio"]) assert.match(html, new RegExp(`data-view="${route}"`));
for (const hook of ["reference-file", "generate-button", "result-preview", "app-modal"]) assert.ok(html.includes(`id="${hook}"`), `missing hook: ${hook}`);
assert.equal((html.match(/data-nav=/g) || []).length, 3, "navigation should contain exactly three primary destinations");
for (const token of ["--canvas", "--accent", "--line", "--shadow"]) assert.ok(css.includes(token), `missing token: ${token}`);
assert.match(css, /@media \(max-width:820px\)/);
assert.match(css, /prefers-reduced-motion/);
for (const behavior of ["buildCatalog", "showView", "openStudio", "openModal", "URL.createObjectURL", "aria-busy"]) assert.ok(js.includes(behavior), `missing behavior: ${behavior}`);
for (const route of ["image", "commerce"]) assert.match(js, new RegExp(`${route}:`), `missing interactive catalog: ${route}`);
assert.match(rootHtml, /href="\.\/user\/"/);
assert.match(rootHtml, /href="\.\/admin\/"/);
assert.ok(adminHtml.includes("管理端正在准备中"), "missing admin placeholder heading");
assert.match(adminHtml, /href="\.\.\/"/);
assert.ok(adminCss.includes(".notice-card"), "missing admin placeholder styles");
for (const copy of ["电商上新案例", "轻奢包袋", "3C 新品", "珠宝礼赠", "家居个护"]) assert.ok(js.includes(copy), `missing case study copy: ${copy}`);
for (const selector of ["case-section", "case-grid", "case-card"]) assert.ok(css.includes(selector), `missing case-study style: ${selector}`);
console.log("smoke: user app, root entry points, and admin placeholder are present");
