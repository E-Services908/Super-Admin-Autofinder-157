import React from "react";

// import "./App.css";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Navbar from "./components/navbar/navbar";
import Signup from "./pages/signup/signup";
import Dashboard from "./pages/dashboard/dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserData from "./pages/dashboard/dashboardPages/userData/userData";
import ListItForYouData from "./pages/dashboard/dashboardPages/ListItForYou/listItForYouData";

import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import DashboardDefault from "./pages/dashboard/dashboardPages/dashboardDefault/dashboardDefault";
import ListItForYouPending from "./pages/dashboard/dashboardPages/ListItForYou/listItForYouPending";
import ListItForYouApproved from "./pages/dashboard/dashboardPages/ListItForYou/listItForYouApproved";
import CarInspectionData from "./pages/dashboard/dashboardPages/carInspectionRequest/carInspectionData";
import CarInspectionApproved from "./pages/dashboard/dashboardPages/carInspectionRequest/carInspectionApproved";
import CarInspectionPending from "./pages/dashboard/dashboardPages/carInspectionRequest/carInspectionPending";
import CarAdRequest from "./pages/dashboard/dashboardPages/carAdRequest/carAdRequest";
import DealerPackages from "./pages/dashboard/dashboardPages/dealerPackages/dealerPackages";
import DealerPackagesAdd from "./pages/dashboard/dashboardPages/dealerPackages/dealerPackagesAdd";
import DealerPackagesAll from "./pages/dashboard/dashboardPages/dealerPackages/dealerPackagesAll";
import DealerPackagesAllRequests from "./pages/dashboard/dashboardPages/dealerPackages/dealerPackagesAllRequests";
import DealerPackagesApprovedRequests from "./pages/dashboard/dashboardPages/dealerPackages/dealerPackagesApprovedRequests";
import BuyCarForMe from "./pages/dashboard/dashboardPages/buyCarForMe/buyCarForMe";
import BuyCarForMePending from "./pages/dashboard/dashboardPages/buyCarForMe/buyCarForMePending";
import BuyCarForMeApproved from "./pages/dashboard/dashboardPages/buyCarForMe/buyCarForMeApproved";
import CarInspectionReportAdd from "./pages/dashboard/dashboardPages/carInspectionRequest/carInspectionReportAdd";
import DataEntry from "./pages/dashboard/dashboardPages/dataEntry/dataEntry";
import Blogs from "./pages/dashboard/dashboardPages/blog/blog";
import PostBlog from "./pages/dashboard/dashboardPages/blog/postBlog";
import Videos from "./pages/dashboard/dashboardPages/videos/videos";
import PostVideo from "./pages/dashboard/dashboardPages/videos/postVideos";
import NewCars from "./pages/dashboard/dashboardPages/newCars/newCars";
import PostNewCar from "./pages/dashboard/dashboardPages/newCars/postNewCar";
import YearDataEntry from "./pages/dashboard/dashboardPages/dataEntry/yearDataEntry";
import CarBrandDataEntry from "./pages/dashboard/dashboardPages/dataEntry/carBrandDataEntry";
import CarModelDataEntry from "./pages/dashboard/dashboardPages/dataEntry/carModelEntry";
import CarVarientDataEntry from "./pages/dashboard/dashboardPages/dataEntry/carVarientDataEntry";
function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route path="" element={<DashboardDefault />} />
                <Route path="user-data" element={<UserData />} />
                <Route
                  path="list-it-for-you-data"
                  element={<ListItForYouData />}
                >
                  <Route path="pending" element={<ListItForYouPending />} />
                  <Route path="approved" element={<ListItForYouApproved />} />
                </Route>
                <Route
                  path="car-inspection-data"
                  element={<CarInspectionData />}
                >
                  <Route path="approved" element={<CarInspectionApproved />} />
                  <Route path="pending" element={<CarInspectionPending />} />
                  <Route path="add-report" element={<CarInspectionReportAdd/>}/>
                </Route>
                <Route path="car-ad-request" element={<CarAdRequest />}/>
                <Route path="dealer-packages" element={<DealerPackages/>} >
                  <Route path="add" element={<DealerPackagesAdd/>} />
                  <Route path="all" element={<DealerPackagesAll/>} />
                  <Route path="all-requests" element={<DealerPackagesAllRequests/>}/>
                  <Route path="approved-requests" element={<DealerPackagesApprovedRequests/>}/>
                </Route>
                <Route path="buy-car-for-me" element={<BuyCarForMe/>}>
                  <Route path="pending" element={<BuyCarForMePending/>}/>
                  <Route path="approved" element={<BuyCarForMeApproved/>}/>
                </Route>
                <Route path="data-entry" element={<DataEntry/>}>
                  <Route path="year" element={<YearDataEntry/>} />
                  <Route path="car-brand" element={<CarBrandDataEntry/>} />
                  <Route path="car-model" element={<CarModelDataEntry/>} />
                  <Route path="car-varient" element={<CarVarientDataEntry/>} />
                </Route>
                <Route path="blogs" element={<Blogs/>}>
                  <Route path="post" element={<PostBlog/>}></Route>
                </Route>
                <Route path="videos" element={<Videos/>}>
                  <Route path="post" element={<PostVideo/>}></Route>
                </Route>
                <Route path={"newCars"} element={<NewCars/>}>
                  <Route path="add" element={<PostNewCar/>}/>
                </Route>
                
              </Route>
            </Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

// LINK   "/"   HOME
// lINK '/LOGIN' LOGIN
