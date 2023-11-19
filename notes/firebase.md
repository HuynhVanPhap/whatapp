[@] Set up
    [1] Tạo một firebase project
    [2] Tạo một firebase web app (Register app)
    [3] Add Firebase SDK vào trong config/firebase.js
-------------
[@] Đăng kí user bằng Email và Password với Firebase
    [1] Vào mục Build/Authentication chọn Add new providers
    [2] Vào Docs : https://firebase.google.com/docs/auth/web/password-auth sẽ có đoạn mã hỗ trợ đăng kí/đăng nhập/đăng xuất
-------------
[@] Upload image
    [+] Firebase cung cấp cloud storage để dễ dàng upload và quản lý file
    [1] Truy cập tài liệu : https://firebase.google.com/docs/storage/web/upload-files
[@] Firebase Database
    [1] Truy cập tài liệu : https://firebase.google.com/docs/firestore/manage-data/add-data
    [-] Có 2 mode
        [1] Native Mode
        [2] Datastore Mode
    [-] Tham khảo
        [+] https://cloud.google.com/datastore/docs/firestore-or-datastore#:~:text=Datastore%20mode%20can%20automatically%20scale,to%20millions%20of%20concurrent%20clients.

/**
* @keyword
* Sub Collection
*/

/**
* @doc()
* Lấy dữ liệu của một document
*
* @onSnapshot()
*/