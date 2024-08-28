import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SueApp from './components/sue';
import Settings from './components/settings';
import SummaryView from './components/summarize';
import ImeldaApp from './components/imelda';
import FeedbackView from './components/feedback';
import AuthProvider from './context/AuthProvider';
import SignIn from './components/login';
import ErrorLogin from './components/invalid_login';
import VideoComponent from './components/sue_ddna'
import Test from './components/test';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<SignIn/>} />
        <Route path="invalid_login" element={<ErrorLogin/>} />
        <Route element={<ProtectedRoute/>}>
          <Route path="summarize" element={<SummaryView/>} />
          <Route path="settings" element={<Settings/>} />
          <Route path="imelda" element={<ImeldaApp/>} />
          <Route path="feedback" element={<FeedbackView/>} />
          <Route path="sue" element={<SueApp />} />
          <Route path="sue_ddna" element={<VideoComponent />} />
        </Route>
        <Route path="test" element={<Test />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
};
export default App;