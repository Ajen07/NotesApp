import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Register, Landing, Error, ProtectedRoute, VerifyEmail } from "./pages";
import SharedLayout from "./pages/dashboard/SharedLayout";
import AllNotes from "./pages/dashboard/AllNotes";
import AddNotes from "./pages/dashboard/AddNotes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AllNotes />} />
          <Route path="add-note" element={<AddNotes />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
