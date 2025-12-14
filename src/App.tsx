import { Navigate, Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import NotificationPage from "./pages/NotificationPage"
import CallPage from "./pages/CallPage"
import ChatPage from "./pages/ChatPage"
import OnboardingPage from "./pages/OnboardingPage"
import  { Toaster } from "react-hot-toast"
import useAuthUser from "./hooks/useAuthUser"
import Layout from "./components/Layout"
import { useThemeStore } from "./store/useThemeStore"

function App() {
  const { authdata: authUser, isLoading:loading } = useAuthUser(); // make sure hook exposes loading
  const { theme }: any = useThemeStore();

  // Auth is only valid if it's not loading and we actually have a user
  const isAuthenticated = !loading && Boolean(authUser);

  if (loading) {
    // While auth check is happening, don’t show routes yet
    return <div className="flex justify-center py-12">Checking session...</div>;
  }

  return (
    <div data-theme={theme}>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Layout showSidebar={true}>
                <HomePage />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/signup"
          element={!isAuthenticated ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/notifications"
          element={isAuthenticated ? (
            <Layout showSidebar={true}>
                <NotificationPage />
              </Layout>
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route
          path="/call/:id"
          element={isAuthenticated ? (
            <CallPage />
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route
          path="/chat/:id"
          element={isAuthenticated ? (
            <Layout showSidebar={false}>
                <ChatPage />
              </Layout>
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route
          path="/onBoarding"
          element={isAuthenticated ? <OnboardingPage /> : <Navigate to="/login" />}
        />
        
      </Routes>

      <Toaster />
    </div>
  );
}

export default App
