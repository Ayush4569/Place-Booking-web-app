import "./App.css";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Layout from "./Layout";
import Index from "./components/Index";
import Login from "./components/Login";
import Signup from "./components/SIgnup";
import { UserContextProvider } from "./context/UserContext";
import ProfilePage from "./components/ProfilePage";
import Places from "./components/Places";
import PlacesFormPage from "./components/PlacesFormPage";
import PlacesPage from "./components/PlacesPage";
import MyBookings from "./components/MyBookings";
import BookedPage from "./components/BookedPage";
import { MessageContextProvider } from "./context/Message";
import { LoadingContextProvider } from "./context/Loading";
function App() {
  axios.defaults.baseURL = "http://localhost:4000";
  axios.defaults.withCredentials = true;
  return (
    <LoadingContextProvider>
      <UserContextProvider>
        <MessageContextProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Signup />} />
              <Route path="/account" element={<ProfilePage />} />
              <Route path="/account/places" element={<Places />} />
              <Route path="/account/places/new" element={<PlacesFormPage />} />
              <Route path="/account/places/:id" element={<PlacesFormPage />} />
              <Route path="/places/:id" element={<PlacesPage />} />
              <Route path="/account/bookings" element={<MyBookings />} />
              <Route path="/account/bookings/:id" element={<BookedPage />} />
            </Route>
          </Routes>
        </MessageContextProvider>
      </UserContextProvider>
    </LoadingContextProvider>
  );
}

export default App;
