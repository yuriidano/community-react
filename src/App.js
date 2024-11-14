import './scss/App.scss';
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
import Music from './components/Music/Music'
import { getIsAuth } from './redux/auth-selectors';
import { getInitialize } from './redux/app-selectors';
import classNames from 'classnames';
import SitebarContainer from './components/Navbar/SitebarContainer';




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

  if (!props.initialize) return <div className='preloader'><Preloader /></div> 



  return (
    <div className='wrapper'>
      <div className='header' ><HeaderContainer /></div>
      <div className='app-page'>
        <div className={classNames({'app-page__containerLogin': !props.isAuth, 'app-page__container': props.isAuth})} >
          <div className='app-page__sitebar'><SitebarContainer /></div>
          <div className='app-page__main'>
            <Routes>
              <Route path='/' element={<Navigate to={'/profile'} />} />
              <Route path='/profile/:userId?/*' element={<ProfileContainerLazy />} />
              <Route path='/dialogs/*' element={<DialogsContainer />} />
              <Route path='/news/*' element={<News />} />
              <Route path='/settings/*' element={<Settings />} />
              <Route path='/users' element={<UsersContainer />} />
              <Route path='/music' element={<Music />} />
              <Route path='/login' element={<LoginContainer />} />
              <Route path='*' element={<div>404 NOT FOUND</div>} />
            </Routes>
          </div>
          <div className='app-page_info'><InfoContainer /></div>
        </div>
      </div>
    </div>
  );
};



const mapStateToProps = (state) => {
  return {
    initialize: getInitialize(state),
    isAuth: getIsAuth(state)
  }
}

export default connect(mapStateToProps, {appInitialize}) (App);




