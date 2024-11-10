import './scss/App.scss';
import Sitebar from './components/Navbar/Sitebar';
import {Navigate, Route, Routes } from 'react-router-dom';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginContainer from './components/Login/LoginContainer';
import { connect } from 'react-redux';
import { appInitialize } from './redux/app-reducer';
import React, { lazy, useEffect, useLayoutEffect } from 'react';
import Preloader from './components/common/Preloader/Preloader';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import withLAzy from './hoc/withLazy';
import InfoContainer from './components/Info/InfoContainer';


const ProfileContainer = lazy(() => import('./components/Prifile/ProfileContainer'));



const ProfileContainerLazy = withLAzy(ProfileContainer);




const App = (props) => {


  const catchAllUnhandledErrors = (reason, promise) => { }

  useEffect(() => {
    props.appInitialize();
    window.addEventListener("unhandledrejection", catchAllUnhandledErrors);
  }, []);

  useLayoutEffect(() => {
    window.removeEventListener("unhandledrejection", catchAllUnhandledErrors);
  }, []);

  if (!props.initialize) return <Preloader />




  return (
    <div className='wrapper'>
      <div className='header' ><HeaderContainer /></div>
      
      <div className='app-page'>
        <div className='app-page__container' >
          <div className='app-page__sitebar'><Sitebar state={props.state.sitebarPage} /></div>
          <div className='app-page__main'>
            <Routes>
              <Route path='/' element={<Navigate to={'/profile'} />} />
              <Route path='/profile/:userId?/*' element={<ProfileContainerLazy />} />
              <Route path='/dialogs/*' element={<DialogsContainer />} />
              <Route path='/news/*' element={<News />} />
              <Route path='/settings/*' element={<Settings />} />
              <Route path='/users' element={<UsersContainer />} />
              <Route path='/login' element={<LoginContainer />} />
              <Route path='*' element={<div>404 NOT FOUND</div>} />
            </Routes>
          </div>
          <div className='app-page_info'><InfoContainer /></div>
        </div>
      </div>

      <div>Footer</div>
    </div>
  );
};



const mapStateToProps = (state) => {
  return {
    initialize: state.app.initialize
  }
}

export default connect(mapStateToProps, {appInitialize}) (App);




