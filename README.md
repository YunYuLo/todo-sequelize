# Todo List

使用Node.js, Express, MySQL 打造的 web app，最簡單直觀的待辦清單，使用者功能完整，可瀏覽、新增、刪除、編輯！

## Features
- 使用者可以瀏覽全部清單
- 可以點擊任一清單，查看詳細資訊
- 提供`排序功能`(可依`done`或`undone`)
- 使用者可以新增一筆待辦
- 使用者可以刪除一筆待辦
- 使用者可以修改一筆待辦
- 使用者註冊功能（本地及facebook)
- 使用者可登入並登出


## Quick view

![login page](https://raw.githubusercontent.com/YunYuLo/todo-sequelize/master/public/img/login.png)
![register page](https://raw.githubusercontent.com/YunYuLo/todo-sequelize/master/public/img/register.png)
![index page](https://raw.githubusercontent.com/YunYuLo/todo-sequelize/master/public/img/index.png)
![detail page](https://raw.githubusercontent.com/YunYuLo/todo-sequelize/master/public/img/detail.png)
![new page](https://raw.githubusercontent.com/YunYuLo/todo-sequelize/master/public/img/new.png)



## Environment set up
```json
"dependencies": {
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.19.0",
    "connect-flash": "^0.1.1",
    "dotenv": "^8.1.0",
    "express": "^4.17.1",
    "express-handlebars": "^3.1.0",
    "express-session": "^1.16.2",
    "method-override": "^3.0.0",
    "mysql2": "^1.7.0",
    "passport": "^0.4.0",
    "passport-facebook": "^3.0.0",
    "passport-local": "^1.0.0",
    "sequelize": "^5.19.2",
    "sequelize-cli": "^5.5.1"
  }
```
### Installation.
1. Clone 此專案至電腦

```
git clone https://github.com/YunYuLo/todo-sequelize.git
```

2. 開啟終端機(Terminal)，進入存放此專案的資料夾

```
$ [~] cd todo-sequelize
```

3. 安裝 npm 套件

```
$ [~/todo-sequelize]npm install <套件名稱>
```

4. 設定config/config.json如下
```
"development": {
  "username": "root",
  "password": "<YOUR_WORKBENCH_PASSWORD>",
  "database": "todo_sequelize",
  "host": "127.0.0.1",
  "dialect": "mysql",
  "operatorsAliases": false
}
```

5. 加入models
```
[~/todo-sequelize] $ npx sequelize db:migrate
```

6. 在根目錄導入.env
```
FACEBOOK_ID=xxxxxxxx
FACEBOOK_SECRET=xxxxxxxx
FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback
```

7. 啟動伺服器，執行 app.js 檔案

``` 
[~/todo-sequelize]$ npm run dev
```

現在，在瀏覽器輸入 [http://localhost:3000](http://localhost:3000) 開始使用囉！

