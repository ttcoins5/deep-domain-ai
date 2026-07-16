# 项目协作说明

## GitHub Pages 发布

- 用户端线上地址：<https://ttcoins5.github.io/deep-domain-ai/user/>
- 管理端线上地址：<https://ttcoins5.github.io/deep-domain-ai/admin/>
- 发布工作流：`.github/workflows/deploy-pages.yml`
- 触发方式：将变更推送到 `main` 分支，或在 GitHub Actions 中手动运行 `Deploy GitHub Pages`。
- 发布内容：工作流会将仓库根目录作为静态站点上传，因此入口、`user/`、`admin/` 及其素材都会随提交发布。

### 发布前检查

在项目根目录执行：

```sh
node tests/smoke.mjs
node --check user/app.js
git diff --check
```

如有页面或样式改动，还应在浏览器中确认用户端和管理端入口、响应式布局及关键交互。

### 发布后验证

确认 GitHub Actions 的 `Deploy GitHub Pages` 任务成功，并检查：

```sh
curl -I -L https://ttcoins5.github.io/deep-domain-ai/user/
curl -I -L https://ttcoins5.github.io/deep-domain-ai/admin/
```

返回 `HTTP 200` 后，再在浏览器打开线上地址确认资源路径和图片加载正常。页面缓存可能需要等待几分钟刷新。

### 提交说明

提交信息应简洁说明页面行为或视觉改动。发布完成后，在交付说明中记录线上地址、提交哈希、主要改动和验证结果。
