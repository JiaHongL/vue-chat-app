#!/usr/bin/env sh

# 當發生錯誤時終止腳本
set -e

# 建構
npm run build

# 進入建構資料夾
cd dist

# 如果你要部署到自訂網域
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果你要部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果你要部署到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:JiaHongL/vue-chat-app.git master:gh-pages

cd -