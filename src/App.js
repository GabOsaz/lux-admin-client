import React, {lazy, useContext, Suspense} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import './styles.css';
import './SCSS/adminSetting.scss';
import './SCSS/calender.scss';
import AppShell from './components/AppShell';
import { AuthProvider, AuthContext } from './context/AuthContext';
import FourOFour from './components/FourOFour';
import Login from './components/Login';
import Signup from './components/Signup';

const Dashboard = lazy(() => import('./components/Dashboard'));
const AddCenter = lazy(() => import('./components/AddCenter'));
const Settings = lazy(() => import('./components/Settings'));
const Calender = lazy(() => import('./components/Calender'));
const Bookings = lazy(() => import('./components/Bookings'));
const UploadImg = lazy(() => import('./components/UploadImg'));
const EventCenters = lazy(() => import('./components/EventCenters'));

const AuthenticatedRoute = ({ children, ...rest}) => {
  const authContext = useContext(AuthContext);
  return (
    <Route {...rest} render = {() =>
      authContext.isAuthenticated() ? 
      (<AppShell> { children } </AppShell>)
              : 
      (<Redirect to='/login' />)
    }>
    </Route>
  )
}

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>

        <AuthenticatedRoute path="/dashboard">
          <Dashboard />
        </AuthenticatedRoute>
        <AuthenticatedRoute path="/addCenter">
          <AddCenter />
        </AuthenticatedRoute>
        <AuthenticatedRoute path="/settings">
          <Settings />
        </AuthenticatedRoute>
        <AuthenticatedRoute path="/calender">
          <Calender />
        </AuthenticatedRoute>
        <AuthenticatedRoute path="/bookings">
          <Bookings />
        </AuthenticatedRoute>
        <AuthenticatedRoute path="/uploadImg">
          <UploadImg />
        </AuthenticatedRoute>
        <AuthenticatedRoute path="/eventCenters">
          <EventCenters />
        </AuthenticatedRoute>

        <Route path="*">
          <FourOFour />
        </Route>
      </Switch>
    </Suspense>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
          <div className="bg-gray-100">
            <AppRoutes />
          </div>
      </AuthProvider>
    </Router>
  );
}

export default App;