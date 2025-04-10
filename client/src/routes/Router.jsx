import { Routes, Route } from "react-router-dom";

//components import
import Navbar from "../components/Navbar"; 
import Home from "../pages/Home.jsx";

//pages import
import ResponseDetail from "../pages/ResponseDetail.jsx";
import Companies from "../pages/Companies.jsx";
import CompanyReviews from "../pages/CompanyReviews.jsx";
import Roles from "../pages/Roles.jsx";
import RolesDetails from "../pages/RolesDetails.jsx";  
import ProfilePage from "../pages/ProfilePage.jsx";
import SubmitExperiencePage from "../pages/submitExperience.jsx";

const AppRoutes = ({ darkMode, toggleDarkMode }) => {
    return (
      <>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experience/:id" element={<ResponseDetail />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/companies/:companyName" element={<CompanyReviews />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/role/:roleName" element={<RolesDetails />} />
          <Route path="/profiles" element={<ProfilePage />} /> 
          <Route path="/submit" element={<SubmitExperiencePage />} />

        </Routes>
      </>
    );
  };
  
  export default AppRoutes;
