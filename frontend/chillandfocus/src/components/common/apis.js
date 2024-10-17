import axios from "axios";

async function callAPIWithCredentials(url, method, data, callback) {
    /**
     * url: Đường dẫn API
     * method: Phương thức gửi dữ liệu (GET, POST, PUT, DELETE)
     * data: Dữ liệu gửi đi (nếu có)
     * callback: Hàm xử lý dữ liệu trả về
     */
    
    const response = await axios.post(
        url,
        data, // Đưa trực tiếp dữ liệu vào đây
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                "Content-Type": "application/json",
            },
            withCredentials: true, // Nếu cần truyền cookies
        }
    );

    return response;
}

export { callAPIWithCredentials };