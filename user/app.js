(() => {
  "use strict";

  const asset = (name) => `assets/${name}`;
  const categories = { image:"AI 图像", commerce:"AI 电商" };
  const modalCopy = {
    membership:["升级会员","会员开通、计费与素材额度需要接入你的正式账号服务。当前 HTML 原型已经保留入口与状态。"],
    notifications:["通知","暂无未读消息。生成完成、会员到账和任务失败通知将显示在这里。"],
    account:["账户设置","疯狂的狮子Li\n本地演示账户 · 已启用工作台预览"],
    language:["语言","当前语言：简体中文\n正式站点可在此切换到其他语言。"],
    export:["导出预览","当前为前端交互原型，已模拟生成结果。接入真实服务后可在此导出 PNG、JPG 或 WebP。"]
  };
  const viewNodes = [...document.querySelectorAll("[data-view]")];
  const modal = document.querySelector("#app-modal");
  const modalContent = document.querySelector("#modal-content");
  let activeTool = "AI电商产品图";
  let trigger = null;

  function buildCatalog(route) {
    const settings = route === "commerce"
      ? ["AI 电商创作平台：让商品视觉更快转化","从商品图到模特、场景、海报与 POD 素材，用统一的视觉工作流完成电商内容生产。","AI电商产品图",["AI虚拟模特","AI电商产品图","电商产品海报","电子商务自动设计","AI POD生成","商品图一键生成","产品样册一键生成","组图生成器","背景替换","商品精修"]]
      : ["一站式 AI 图片平台：重新定义你的视觉创作流","从生成、抠图、修复到风格化与商业物料，在同一条链路里完成上传、处理与导出。","AI图像生成",["AI图像生成","图像编辑","通用抠图","照片涂抹","照片变清晰","照片变清晰 Pro","老照片上色","照片编辑背景"]];
    const [title,intro,primaryTool,cardNames] = settings;
    const gallery = ["product-source.png","product-earbuds-blue.png","product-handbag-peach.png","product-jewelry-lilac.png","result-lifestyle-ad.png","product-campaign-coral.png"];
    return `<div class="catalog-hero"><p class="catalog-kicker">${categories[route]}工作台 · 预览页</p><h1>${title}</h1><p>${intro} 进入工作台即可调用对应的创作流程。</p><div class="catalog-actions"><button class="primary-action" type="button" data-open-tool="${primaryTool}">立即开始创作</button><button class="secondary-action" type="button" data-open-tool="${cardNames[1]}">打开示例工具</button></div></div><section class="catalog-section"><h2>能力矩阵</h2><div class="catalog-grid">${cardNames.map((name,index) => `<button class="catalog-card" type="button" data-open-tool="${name}"><span>0${index + 1}</span><b>${name}</b><small>进入创作工作台</small></button>`).join("")}</div></section><section class="catalog-section"><h2>见证 ${categories[route]} 的魔力</h2><div class="gallery">${gallery.map(image => `<img src="${asset(image)}" alt="${categories[route]}案例展示" loading="lazy">`).join("")}</div></section>`;
  }

  function showView(route) {
    const page = categories[route] || route === "studio" ? route : "home";
    if (categories[page]) document.querySelector(`[data-view="${page}"]`).innerHTML = buildCatalog(page);
    viewNodes.forEach(node => { node.hidden = node.dataset.view !== page; });
    document.querySelectorAll("[data-nav]").forEach(button => button.toggleAttribute("aria-current", button.dataset.nav === page));
    document.querySelector(".sidebar").classList.remove("is-open");
    document.body.classList.remove("nav-open");
    window.scrollTo({ top:0, behavior:"instant" });
  }

  function openStudio(tool) {
    activeTool = tool;
    document.querySelector("#studio-title").textContent = tool;
    document.querySelector("#studio-crumb").textContent = `${tool.includes("电商") || tool.includes("商品") || tool.includes("模特") || tool.includes("场景") ? "AI 电商" : "AI 图像"} / 创作工具`;
    document.querySelector("#studio-intro").textContent = `在 ${tool} 中输入描述、上传参考图并观察完整的生成交互。`;
    document.querySelector("#generation-status").textContent = "准备开始创作";
    document.querySelector("#result-preview").hidden = true;
    showView("studio");
  }

  function openModal(name, source) {
    trigger = source;
    const [title,copy] = modalCopy[name];
    modalContent.innerHTML = `<h2 class="modal-title" id="modal-title">${title}</h2><p class="modal-copy">${copy.replace(/\n/g,"<br>")}</p>${name === "notifications" ? "<ul class=\"modal-list\"><li>任务状态会在这里更新</li><li>可从账户设置管理通知偏好</li></ul>" : ""}`;
    modal.showModal();
  }

  document.addEventListener("click", (event) => {
    const route = event.target.closest("[data-route]");
    const tool = event.target.closest("[data-open-tool]");
    const modalButton = event.target.closest("[data-open-modal]");
    if (route) showView(route.dataset.route);
    if (tool) openStudio(tool.dataset.openTool);
    if (modalButton) openModal(modalButton.dataset.openModal, modalButton);
    if (event.target.closest("[data-close-modal]")) modal.close();
  });

  document.querySelector("[data-toggle-sidebar]").addEventListener("click", () => { document.querySelector(".sidebar").classList.toggle("is-open"); document.body.classList.toggle("nav-open"); });
  document.querySelector("[data-close-sidebar]").addEventListener("click", () => { document.querySelector(".sidebar").classList.remove("is-open"); document.body.classList.remove("nav-open"); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") { document.querySelector(".sidebar").classList.remove("is-open"); document.body.classList.remove("nav-open"); } });
  document.querySelectorAll(".studio-rail button").forEach(button => button.addEventListener("click", () => { document.querySelectorAll(".studio-rail button").forEach(item => item.classList.toggle("rail-active", item === button)); document.querySelector("#generation-status").textContent = `${button.textContent} 面板已切换`; }));
  modal.addEventListener("close", () => trigger?.focus());
  modal.addEventListener("click", (event) => { if (event.target === modal) modal.close(); });
  document.querySelector("#surprise-prompt").addEventListener("click", () => { document.querySelector("#prompt-input").value = "极简护肤品主图，浅紫色玻璃台面，柔和棚拍光线，适合跨境电商详情页"; });
  document.querySelector("#reference-file").addEventListener("change", (event) => {
    const [file] = event.target.files;
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 10 * 1024 * 1024) { document.querySelector("#generation-status").textContent = "请选择 10 MB 以内的 PNG、JPG 或 WebP 图片"; return; }
    const preview = document.querySelector("#reference-preview");
    preview.src = URL.createObjectURL(file);
    preview.hidden = false;
    document.querySelector("#generation-status").textContent = `已添加参考图：${file.name}`;
  });
  document.querySelector("#generate-button").addEventListener("click", (event) => {
    const button = event.currentTarget;
    const status = document.querySelector("#generation-status");
    button.setAttribute("aria-busy","true");
    status.textContent = "正在组织商品画面与视觉风格…";
    window.setTimeout(() => { status.textContent = "正在生成高清预览…"; }, 550);
    window.setTimeout(() => { document.querySelector("#result-image").src = asset(activeTool.includes("背景") || activeTool.includes("场景") ? "product-handbag-peach.png" : activeTool.includes("批量") ? "product-jewelry-lilac.png" : activeTool.includes("电商") || activeTool.includes("商品") ? "result-lifestyle-ad.png" : "product-earbuds-blue.png"); document.querySelector("#result-preview").hidden = false; status.textContent = "生成完成，可继续编辑或导出预览"; button.removeAttribute("aria-busy"); }, 1200);
  });
  showView("home");
})();
