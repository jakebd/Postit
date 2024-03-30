import '../css/signin.css';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        if(authService.isSignedIn()){
            authService.logout((success) => {
            if (success) {
                navigate('/');//main.jsx
            }
            });
        }
    };

  return (
    <button className="btn" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;