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

for (const copy of ["九项视觉能力", "可用的好内容", "AI图像生成", "图像编辑", "AI虚拟模特", "AI电商产品图", "电商产品海报", "电子商务设计", "AI POD生成", "商品图生成", "产品样册生成", "功能案例"]) assert.ok(html.includes(copy), `missing copy: ${copy}`);
assert.ok(!html.includes("从一张好图，读懂提示词怎么写"), "homepage case heading should be removed");
assert.ok(!html.includes("视频生成平台"), "homepage metadata still describes a video platform");
for (const route of ["home", "image", "commerce", "studio"]) assert.match(html, new RegExp(`data-view="${route}"`));
for (const hook of ["reference-file", "generate-button", "result-preview", "app-modal"]) assert.ok(html.includes(`id="${hook}"`), `missing hook: ${hook}`);
assert.equal((html.match(/data-nav=/g) || []).length, 1, "navigation should contain exactly one home destination");
assert.equal((html.match(/data-nav-tool=/g) || []).length, 9, "navigation should contain all nine direct abilities");
for (const token of ["--canvas", "--accent", "--line", "--shadow"]) assert.ok(css.includes(token), `missing token: ${token}`);
assert.match(css, /@media \(max-width:820px\)/);
assert.match(css, /prefers-reduced-motion/);
for (const behavior of ["buildCatalog", "showView", "openStudio", "openModal", "URL.createObjectURL", "aria-busy"]) assert.ok(js.includes(behavior), `missing behavior: ${behavior}`);
assert.ok(js.includes('setAttribute("aria-current","page")'), "active navigation should expose aria-current=page");
for (const route of ["image", "commerce"]) assert.match(js, new RegExp(`${route}:`), `missing interactive catalog: ${route}`);
for (const tool of ["AI图像生成", "图像编辑", "AI虚拟模特", "AI电商产品图", "电商产品海报", "电子商务设计", "AI POD生成", "商品图生成", "产品样册生成"]) assert.ok(js.includes(`"${tool}"`), `missing approved tool: ${tool}`);
for (const tool of ["组图生成器", "背景替换", "商品精修", "通用抠图", "照片涂抹", "照片变清晰", "老照片上色", "照片编辑背景", "智能场景替换", "批量素材扩展"]) assert.ok(!html.includes(tool) && !js.includes(`"${tool}"`), `removed tool still present: ${tool}`);
assert.match(rootHtml, /href="\.\/user\/"/);
assert.match(rootHtml, /href="\.\/admin\/"/);
assert.ok(adminHtml.includes("管理端正在准备中"), "missing admin placeholder heading");
assert.match(adminHtml, /href="\.\.\/"/);
assert.ok(adminCss.includes(".notice-card"), "missing admin placeholder styles");
for (const copy of ["电商上新案例", "旅行箱包", "3C 电子", "珠宝礼赠", "运动小家电"]) assert.ok(js.includes(copy), `missing catalog case study copy: ${copy}`);
for (const copy of ["高冲击力耳机产品广告图", "烟熏柚子苏打氛围广告图", "护肤洁面产品六宫格详情页", "珠宝礼盒节日礼赠海报"]) assert.ok(html.includes(copy), `missing homepage case study copy: ${copy}`);
for (const hook of ["data-open-case=\"airpods\"", "data-open-case=\"gift\"", "data-open-case=\"airpodsMinimal\"", "data-open-case=\"lycheeGeometric\"", "data-open-case=\"laysSki\"", "data-open-case=\"duanYeJi\"", "data-open-case=\"casioConcept\"", "data-open-case=\"kirinWatermelon\"", "case-airpods-minimal.jpeg", "case-lychee-geometric.jpeg", "case-lays-ski.jpg", "case-duan-ye-ji-hero.jpg", "case-duan-ye-ji-system.jpg", "case-casio-concept.jpg", "case-kirin-watermelon.jpg", "@mehvishs25", "openPromptCase", "promptCases", "promptCaseChinese", "caseImages", "英文提示词", "中文提示词", "data-copy-case"]) assert.ok(html.includes(hook) || js.includes(hook), `missing prompt-case behavior: ${hook}`);
assert.equal((html.match(/data-open-case=/g) || []).length, 12, "homepage should contain all twelve supplied cases");
for (const selector of ["case-section", "case-grid", "case-card"]) assert.ok(css.includes(selector), `missing case-study style: ${selector}`);
for (const image of ["export-hero-suite.png", "export-image-generation.png", "export-commerce-a-plus.png", "export-virtual-model.png", "export-jewelry-gift.png", "export-tech-headphones.png"]) assert.ok(html.includes(image) || js.includes(image), `missing export ecommerce visual: ${image}`);
for (const oldImage of ["hero-commerce-suite.png", "product-source.png", "result-white-background.png", "product-campaign-blue.png", "product-campaign-coral.png", "product-model.jpg", "product-jewelry-lilac.png", "product-handbag-peach.png", "product-earbuds-blue.png", "result-lifestyle-ad.png", "premium-hero-suite.png", "premium-editorial-forms.png", "premium-handbag-campaign.png", "premium-fashion-model.png", "premium-jewelry-campaign.png", "premium-tech-headphones.png"]) assert.ok(!html.includes(oldImage) && !js.includes(oldImage), `legacy visual still referenced: ${oldImage}`);
console.log("smoke: user app, root entry points, and admin placeholder are present");
