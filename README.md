# 郭映彤 · 新媒体运营作品集

画廊式黑白基调的响应式个人作品集网站（纯静态 HTML / CSS / JS，无构建依赖）。

## 部署到 GitHub Pages

在本机（有网络的环境）打开 PowerShell，进入本目录后执行：

```powershell
git init
git add .
git commit -m "Deploy portfolio site"
git branch -M main
git remote add origin https://github.com/Eosephoros923/portfolio.git
git push -u origin main
```

推送成功后，在仓库 Settings → Pages 中把分支设为 `main`、目录选 `/ (root)` 并保存，稍等片刻即可通过
`https://Eosephoros923.github.io/portfolio/` 访问。

> 如果仓库里已有内容，请先确认是否需要保留；可直接在现有仓库中执行 `git add .` 覆盖更新。
