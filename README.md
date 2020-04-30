# JLPT-Learning-Server
### Run : 
1. npm install
2. tạo file .env và cài đặt biến môi trường(inbox Tiệp)
3. Run: npm run dev
## DataBase EER : https://bit.ly/JLPT-EER-Database
## Endpoint và các chức năng

### Practice : luyện tập
1. GET : /practice/:level : lấy tất cả các practice có level là level
2. GET : /practice/:level/:type : lấy tất cả các practice có level là level và id type là type(kanji,...)
3. GET: /practice/:level/:type/:id : lấy tất cả các practice theo level, type và id
4. POST : /practice : thêm 1 bài luyện tập với các thông tin tương ứng
5. DELETE : /practice : Xóa 1 practice tương ứng

### Auth : xác thực tài khoản

1. POST:/login : login
2. POST: /create : them 1 account
 
### User 
1. GET : /users/:id : lấy thông tin người dùng theo id
2. PUT : /users/update : update thông tin người dùng
3. POST : /users/checkPassword : kiểm tra mật khẩu người dùng có đúng k
### Upload
1. POST : /file : upload 1 file
2. GET: /file/:type/:name : lay 1 file có kiểu type(video/radio/image), và có tên name
### Exam
1. GET : /exams/:id : lấy exam có id là id
2. POST : /exams/add : tạo 1 exam mới
3. DELETE : /exams/:id : xóa 1 exam có id là id
4. GET : /exams : Lấy ra tất cả exam
### Admin
