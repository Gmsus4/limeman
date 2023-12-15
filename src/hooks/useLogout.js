import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import { useShowToast } from './useShowToast';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';


export const useLogout = () => {
    const [signOut, isLogginOut, error] = useSignOut(auth);
    const showToast = useShowToast();
    const logoutUser = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    const handleLogout = async() => {
      try {
        await signOut();
        localStorage.removeItem('user-info');
        logoutUser();
        navigate('/auth');
      } catch (error) {
        showToast('error', error.message, 'error');
      }
    }
  return {handleLogout, isLogginOut, error}
}
