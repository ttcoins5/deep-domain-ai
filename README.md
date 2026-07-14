# 深域万象

静态演示站点，包含独立的用户端与管理端入口。

## 在线入口

- 用户端：`https://ttcoins5.github.io/deep-domain-ai/user/`
- 管理端：`https://ttcoins5.github.io/deep-domain-ai/admin/`

## 目录

- `user/`：现有 AI 电商商品视觉用户端与本地素材。
- `admin/`：管理端建设中占位页。
- `index.html`：站点入口页。

## 本地预览与检查

```sh
python3 -m http.server 4173
node tests/smoke.mjs
node --check user/app.js
```

访问 `http://localhost:4173/` 后，可分别进入用户端和管理端。
