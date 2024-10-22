## 通过一个简单todolist例子，熟悉和测试GraphQL的语法

前提：安装并运行docker，跑一个mysql的server在3306端口，创建一个名为todolist的数据库
使用：
1. 在backend目录下，pnpm i && nest start -w
2. 新开一个终端，在frontend目录下，pnpm i && pnpm dev即可
3. 默认页面会调用graphql的查询，可以点击新增，输入新的待办后确定，这时会调用graphql的新增和再次查询
