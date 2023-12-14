import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import { useShowToast } from './useShowToast';

export const useLogout = () => {
    const [signOut, isLogginOut, error] = useSignOut(auth);
    const showToast = useShowToast();

    const handleLogout = async() => {
      try {
        await signOut();
        localStorage.removeItem('user-info')
        console.log('LOGOUT');
      } catch (error) {
        showToast('error', error.message, 'error')
      }
    }
  return {handleLogout, isLogginOut, error}
}
