import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import Contact from './Pages/Contact';
import Services from './Pages/Services';
import Mission from './Pages/Mission';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Gallery from './Pages/Gallery';
import ParishDirectory from './Pages/ParishDirectory';
import Donation from './Pages/Donation';
import DonatorsList from './Pages/DonatorsList';
import AdminDashboard from './Components/AdminDashboard';
import UserNavbar from './Components/UserNavbar';
import UserHome from './Pages/UserHome';
import Settings from './Pages/Settings';
import Reports from './Pages/Reports';
import QuizForm from './Pages/QuizForm';
import AccountantNavbar from './Components/AccountantNavbar';
import AccountantHome from './Pages/AccountantHome';
import BalanceSheet from './Pages/BalanceSheet';
import ExpenseManagement from './Pages/Expensemanagement';
import IncomeStatements from './Pages/IncomeStatements';
import DonationTracking from './Pages/DonationTracking';
import BudgetPlanning from './Pages/BudgetPlanning';
import AdminLogin from './Pages/AdminLogin';
import ResetPassword from './Pages/ResetPassword';
import AccountantLogin from './Pages/AccountantLogin';
import HFooter from './Components/HFooter';
import Donation2 from './Pages/Donation2';
import AdminReports from './Pages/AdminReports';
import QuizResult from './Pages/QuizResult';
import AddPetition from './Pages/AddPetition';
import ViewPetitions from './Pages/ViewPetitions';
import MemberDetails from './Pages/MemberDetails';
import ImageGalleryUpload from './Pages/ImageGalleryUpload';
import VicarDashboard from './Components/VicarDashboard';
import VicarLogin from './Pages/VicarLogin';
import ParishList from './Pages/ParishList';
import QuizForms from './Pages/QuizForms';
import BloodDonationPage from './Pages/BloodDonationPage';
import FamilyUnitForm from './Pages/FamilyUnitForm';
import PastVicars from './Pages/Past Vicars.jsx';
import Profile from './Pages/Profile.jsx';
import ViewBloodDonationPage from './Pages/ViewBloodDonationPage.jsx';
import FamilyUnitView from './Pages/FamilyUnitView.jsx';
import FinancialReport from './Pages/FinancialReports';
import VerifyUsers from './Pages/VerifyUsers.jsx';
// import Virtualid from './Pages/VirtualID.jsx';
import Event from './Pages/Event.jsx';
import ViewEvents from './Pages/ViewEvents.jsx';
import ProfileForm from './Pages/ProfileForm.jsx';
import ViewExpense from './Pages/ViewExpense.jsx';
import ViewIncome from './Pages/ViewIncome.jsx';
import ViewBalanceSheet from './Pages/ViewBalanceSheet.jsx';
import Virtualid from './Pages/Virtualid.jsx';
import { useSelector } from 'react-redux';
// import EditFamilyUnitForm from './Pages/EditFamilyUnitForm.jsx';
import AddFamilyUnit from './Pages/AddFamilyUnit.jsx';
import ReceiptPage from './Pages/ReceiptPage.jsx';
// import Allfamily from './Pages/Allfamily.jsx';
import FamilyMemberView from './Pages/FamilyMemberView.jsx';
import DonationChart from './Pages/DonationChart.jsx';
// import Virtualid from './Pages/Virtualid.jsx';
// import ParishMemberPage from './Pages/ParishMemberPage.jsx';
// import BloodDonationList from './Pages/BloodDonationList';

// New Vicar Pages
// import VicarPetitions from './Pages/VicarPetitions';
// import VicarReports from './Pages/VicarReports';

function App() {
  const userRole = useSelector((state)=>state.auth.role)
  
  
  return (
    <BrowserRouter>
    {userRole==="Normal User"?(
      <Routes>
        {/* <Route path="/signup" element={<><Navbar/><SignUp /><Footer/></>} /> */}
        {/* <Route path="/gallery" element={<><Navbar/><Gallery /><Footer/></>} /> */}
        <Route path="/image" element={<><Navbar/><ImageGalleryUpload /><Footer/></>} />
        <Route path="/parish-directory" element={<><UserNavbar/><ParishDirectory /><Footer/></>} />
        <Route path="/parish-list" element={<><ParishList /></>} />
        <Route path="/donation" element={<><Navbar/><Donation /><Footer/></>} />


        {/* <Route path="/parish-member" element={<><ParishMemberPage /></>} /> */}


        {/* <Route path="/past-vicars" element={<><Navbar/><PastVicars /><Footer/></>} /> */}




        <Route path="/member/:id" element={<MemberDetails/>} />
        <Route path="/donation" element={<><Navbar/><Donation /><Footer/></>} />
        <Route path="/donators-list" element={<><UserNavbar/><DonatorsList /><Footer/></>} />
        <Route path="/Donation2" element={<><UserNavbar/><Donation2/><Footer/></>} />
        <Route path="/blood-donation" element={<><UserNavbar/><BloodDonationPage/><Footer/></>} />
        {/* <Route path="/blood-donationlist" element={<><UserNavbar/><BloodDonationList/><Footer/></>} /> */}

        <Route path="/view-blooddonation" element={<><UserNavbar/><ViewBloodDonationPage/><Footer/></>} />



        {/* User Routes */}
        <Route path="/user-home" element={<><UserNavbar/><UserHome /><Footer/></>} />
        <Route path="/profile" element={<><UserNavbar/><Profile/><Footer/></>} />
        <Route path="/settings" element={<><UserNavbar/><Settings/><Footer/></>} />
        <Route path="/virtualid" element={<><UserNavbar/><Virtualid/><Footer/></>} />
        <Route path="/reports" element={<><UserNavbar/><Reports/><Footer/></>} />
        <Route path="/quiz-form" element={<><UserNavbar/><QuizForm/><Footer/></>} />
        <Route path="/quiz-forms" element={<><UserNavbar/><QuizForms/><Footer/></>} />
        <Route path="/add-familyunit" element={<><UserNavbar/><AddFamilyUnit/><Footer/></>} />

        {/* <Route path="/gallery" element={<><UserNavbar/><Gallery /><Footer/></>} /> */}


        {/* <Route path="/adminreports" element={<><UserNavbar/><AdminReports/><Footer/></>} /> */}
        <Route path="/quiz-result" element={<><QuizResult/></>} />
        <Route path="/add" element={<><UserNavbar/><AddPetition /><Footer/></>} />
        <Route path="/view" element={<><UserNavbar/><ViewPetitions /><Footer/></>} />
        <Route path="/view-events" element={<><UserNavbar/><ViewEvents /><Footer/></>} />
        <Route path="/profile-form" element={<><UserNavbar/><ProfileForm /><Footer/></>} />
        <Route path='*' element={<>404 Not Found</>}/>
        </Routes>
      ):userRole === "Admin"?
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/family-unit" element={<FamilyUnitForm />} />
        <Route path="/view-family-unit" element={<FamilyUnitView />} />
        <Route path="/verify-users" element={<VerifyUsers />} />

        <Route path="/view-expense" element={<ViewExpense />} />
        <Route path="/view-income" element={<ViewIncome />} />
        <Route path="/view-balancesheet" element={<ViewBalanceSheet />} />
        <Route path="/adminreports" element={<><UserNavbar/><AdminReports/><Footer/></>} />
        {/* <Route path="/edit-family-unit" element={<><UserNavbar/><EditFamilyUnitForm/><Footer/></>} /> */}
        <Route path="/editfamilymembers" element={<FamilyMemberView />} />



        <Route path='*' element={<>404 Not Found</>}/>
      </Routes>
      :userRole ==="Accountant"?
      <Routes>

        {/* Accountant Routes */}
        
        <Route path="/accountant-home" element={<><AccountantNavbar/><AccountantHome/><Footer/></>} />
        <Route path="/balance-sheet" element={<><AccountantNavbar/><BalanceSheet/><Footer/></>} />
        <Route path="/expense-management" element={<><AccountantNavbar/><ExpenseManagement/><Footer/></>} />
        <Route path="/income-statements" element={<><AccountantNavbar/><IncomeStatements/><Footer/></>} />
        <Route path="/financial-reports" element={<><AccountantNavbar/><FinancialReport/><Footer/></>} />
        <Route path="/donation-tracking" element={<><AccountantNavbar/><DonationTracking/><Footer/></>} />
        <Route path="/budget-planning" element={<><AccountantNavbar/><BudgetPlanning/><Footer/></>} />
        <Route path='*' element={<>404 Not Found</>}/>
      </Routes>
      :userRole==="Vicar"?
      <Routes>
        {/* Vicar Routes */}
        <Route path="/vicar-dashboard" element={<VicarDashboard />} />
        <Route path="/view" element={<ViewPetitions />} />
        <Route path="/event" element={<Event />} />
        <Route path="/parish-list" element={<><ParishList /></>} />
        <Route path="/donation-chart" element={<><DonationChart /></>} />




        
        {/* <Route path="/allfamily" element={<><Allfamily /></>} /> */}




        <Route path='*' element={<>404 Not Found</>}  />   
        </Routes>
        :<Routes>
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/" element={<><Navbar/><Home /><HFooter/></>} />
          <Route path="/contact" element={<><Navbar/><Contact /><Footer/></>} />
          <Route path="/services" element={<><Navbar/><Services /><Footer/></>} />
          <Route path="/mission" element={<><Navbar/><Mission /><Footer/></>} />
          <Route path="/gallery" element={<><Navbar/><Gallery /><Footer/></>} />
          <Route path="/donation" element={<><Navbar/><Donation /><Footer/></>} />
          <Route path="/receipt" element={<><ReceiptPage /></>} />


          <Route path="/past-vicars" element={<><Navbar/><PastVicars /><Footer/></>} />
          <Route path="/login" element={<><Navbar/><Login /><Footer/></>} />
          <Route path="/vicar-login" element={<VicarLogin />} />
          <Route path="/accountant-login" element={<AccountantLogin />} />
          <Route path="/signup" element={<><Navbar/><SignUp /><Footer/></>} />



          <Route path='*' element={<><Navbar/><Login /><Footer/></>} />
          </Routes>}
          
    </BrowserRouter>
    
        
  );
  
}

export default App;
