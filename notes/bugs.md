/**
* # Firebase && Firestore
*
* # PERMISSION_DENIED: Missing or insufficient permissions
*
* @link
* https://stackoverflow.com/questions/46590155/firestore-permission-denied-missing-or-insufficient-permissions
*
*
* Firebase Storage: User does not have permission to access
*
* @why
* if request.time < timestamp.date(2023, 11, 15); -> request nếu vượt quá ngày 15/11/2023 thì sẽ không cho phép
*
* @link
* https://stackoverflow.com/questions/38671444/user-does-not-have-permission-to-access-this-object-firebase-storage-android
*/

[@] Hiển thị các phần tử theo chiều từ dưới lên trên (Stacking [Divs] from Bottom to Top)
	[Sol-1] Sử dụng display: flex; (https://stackoverflow.com/questions/6401869/stacking-divs-from-bottom-to-top)
	[*] Nhưng việc sử dụng flex <justify-content: flex-end;> lại làm hỏng đi sự kiện scroll, thanh sroll sẽ không hiện nếu tràn viền
	[Sol-2] Sử dụng "margin-top: auto;" cho phần tử đầu (https://stackoverflow.com/questions/36130760/use-justify-content-flex-end-and-to-have-vertical-scrollbar)
	[*] Dùng cùng với "display: flex;"

/**
* # Không viết câu query tìm kiếm theo "displayName" tại bảng userChats
*
* @reason Cấu trúc userChats không phù hợp (Không có cách nào để truy cập id field map)
* @keySearch : How can I query map object which is the document ID in firebase?
* @link : https://stackoverflow.com/questions/58296892/how-can-i-query-map-object-which-is-the-document-id-in-firebase
*/

/**
* # Khi tải tin nhắn cũ nếu thao tác scroll nhanh và giữ thanh scroll đủ lâu -> dữ liệu bị trùng lặp 
*
* @guest
* Lỗi chỉ xuất hiện khi thanh scroll di chuyển nhanh và bị giữ lại lâu
* Trong quá trình quan sát và so sánh, lỗi có vẻ xuất phát vì component chưa kịp render |
* thì việc load tin nhắn cũ lại được thực thi -> bị trùng lặp dữ liệu
*
* @solution
* Triển khai Debounce/throttle
* Khi load dữ liệu mới, kiểm tra xem đã load lần nào chưa để tránh load trùng. Có thể dùng biến kiểm tra hoặc lưu vào state
* Sử dụng kỹ thuật load dữ liệu từng phần nhỏ một thay vì load tròn 1 lần
* Optimize lại chu trình render của component để nhanh hơn khi cuộn
*/

/**
* # react-dom.development.js:22839 Uncaught DOMException: Failed to execute 'querySelector' on |
* # 'Element': '#81273206-7ad2-4e92-941b-33de126919ec' is not a valid selector.
*
* @reasion
* Gặp lỗi khi sử dụng querySelector trong React với một selector không hợp lệ.
* Selector không tồn tại vì component chưa kịp render xong
*/