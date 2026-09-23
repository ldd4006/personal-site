# 路东冬 · 个人站点（网络名片）

零依赖纯静态站点（HTML + CSS），部署于 Cloudflare Pages。护眼类文档双色主题，跟随系统暗色模式，支持中英双语切换。

## 目录结构

```
personal-site/
├── index.html        首页（名片）
├── about.html        关于
├── cv.html           简历（在线版，可打印/存 PDF）
├── projects.html     作品集（进行中 / 已完成 / 未来计划）
├── blog.html         文章（公众号镜像，列表 + 模板）
├── links.html        分享 & 资源（外链跳转 + 资源目录合并页）
├── contact.html      联系
├── privacy.html      隐私说明
├── 404.html          404
├── robots.txt        爬虫规则
└── assets/
    ├── style.css            主题样式
    ├── script.js            语言切换 + 页脚年份
    └── wechat-qrcode.jpeg   公众号二维码
```

> 博客文章：在 `blog/` 下新建独立 HTML 页，复制本站页面骨架，并在 `blog.html` 列表加一条链接即可（纯静态，无构建）。

## 本地预览

直接双击 `index.html` 用浏览器打开即可；或起一个本地服务：

```bash
cd personal-site
python -m http.server 8080
# 浏览器打开 http://localhost:8080
```

## 部署到 Cloudflare Pages

1. 把本目录推到 GitHub 仓库（用 GitHub Desktop 或 git 命令行）。
2. Cloudflare 控制台 → **创建 Pages 项目 → 连接 GitHub 仓库**。
3. 构建设置：**Framework preset = None（或无）**，**Build command 留空**，**Output directory = `/`**（根目录）。
4. 保存并部署，绑定你的域名。

## 中英双语

每页正文分 `.zh`（中文）与 `.en`（英文）两个容器，右上角按钮切换，选择记在浏览器本地。维护时改中文只动 `.zh`、改英文只动 `.en`。

## 隐私

- 站点不展示身份证号、手机号、精确住址、护照号、出生日期/年龄；简历页仅保留邮箱。
- 公开联系通道：邮箱 + 公众号二维码。
- `links.html` 仅做出站跳转，不嵌入、不转存第三方内容。

## 说明

采用零依赖静态站（HTML + CSS）：部署零构建、改内容只动 HTML，长期维护省心。如需 Markdown 流水线与博客自动化，可后续迁移到 Astro（结构已按页面拆分，迁移成本低）。
