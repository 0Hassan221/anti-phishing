import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'; // تم استيراد createRoot هنا
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../css/index.css';
import Welcome from './Pages/Welcome';
import AuthPage from './Pages/Auth/AuthPage';
import PhishingCheck from './Pages/UrlCheck/PhishingCheck';
import UserProfile from './Pages/Profile/Profile';

const rootElement = document.getElementById('root');

if (!rootElement) {
    console.error("❌ Root element not found! تأكد من index.html");
} else {
    // استخدام createRoot مباشرةً بدلًا من ReactDOM.createRoot
    const root = createRoot(rootElement);

    root.render(
        <StrictMode> {/* تم استيراده كـ StrictMode بدون React. */}
            <Router>
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/login" element={<AuthPage />} />
                    <Route path="/checkUrl" element={<PhishingCheck />} />
                    <Route path="/profile" element={<UserProfile />} />
                </Routes>
            </Router>
        </StrictMode>
    );
}