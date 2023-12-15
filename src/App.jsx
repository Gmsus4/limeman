import { Navigate, Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/HomePage/HomePage"
import { AuthPage } from "./pages/AuthPage/AuthPage"
import { PageLayout } from "./Layouts/PageLayout/PageLayout"
import { ProfilePage } from "./pages/ProfilePage/ProfilePage"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "./firebase/firebase"

function App() {
  const [authUser] = useAuthState(auth);
  return (
    <PageLayout>
      <Routes>
        {/* Si el usuario está login entonces muestra el HomePage, si no lo está entonces lo manda a el auth */}
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/auth'/>} /> 

        {/* Si el usuario no esta login entonces lo manda a iniciar sesion, si si lo esta, lo manda al homePage */}
        <Route path='/auth' element={!authUser ? <AuthPage /> : <Navigate to='/'/>} /> 


        <Route path='/:username' element={<ProfilePage />}/>
      </Routes>
    </PageLayout>
  )
}

export default App