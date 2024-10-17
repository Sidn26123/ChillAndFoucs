import "./App.css";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import Layer from './components/global/layer';
import { login } from './redux/slicers/userSlicer';



function App() {

    const dispatch = useDispatch();
    useEffect(() => {
        // Kiểm tra xem access token có trong localStorage hay không
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            // Nếu có token, coi như người dùng đã đăng nhập
            // Dispatch thông tin người dùng vào Redux store
            const user = JSON.parse(localStorage.getItem('user')); // Giả sử bạn lưu user vào localStorage
            var payload = {
                user: user,
                access: accessToken,
                refresh: localStorage.getItem('refreshToken'),
                isAuthenticated: true
            }
            dispatch(login(payload));
            
        } else {
            // Nếu không có token, điều hướng người dùng tới trang đăng nhập
        }
    }, []);

    return (
        <div className="App">
            {/* <Routes>
                <Route path="/" element={<Layer />} />

            </Routes> */}
            <Layer />
        </div>
    );
}
// function WrappedApp() {
//     return (
//         <Router>
//             <App />
//         </Router>
//     );
// }
export default App;
