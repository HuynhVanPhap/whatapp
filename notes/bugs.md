[@] Firestore: PERMISSION_DENIED: Missing or insufficient permissions
    [-] Tham khảo
        [+] https://stackoverflow.com/questions/46590155/firestore-permission-denied-missing-or-insufficient-permissions
[@] Hiển thị các phần tử theo chiều từ dưới lên trên (Stacking [Divs] from Bottom to Top)
	[Sol-1] Sử dụng display: flex; (https://stackoverflow.com/questions/6401869/stacking-divs-from-bottom-to-top)
	[*] Nhưng việc sử dụng flex <justify-content: flex-end;> lại làm hỏng đi sự kiện scroll, thanh sroll sẽ không hiện nếu tràn viền
	[Sol-2] Sử dụng "margin-top: auto;" cho phần tử đầu (https://stackoverflow.com/questions/36130760/use-justify-content-flex-end-and-to-have-vertical-scrollbar)
	[*] Dùng cùng với "display: flex;"

/**
* @problem Không viết câu query tìm kiếm theo "displayName" tại bảng userChats
* @reason Cấu trúc userChats không phù hợp (Không có cách nào để truy cập id field map)
* @keySearch : How can I query map object which is the document ID in firebase?
* @link : https://stackoverflow.com/questions/58296892/how-can-i-query-map-object-which-is-the-document-id-in-firebase
*/
