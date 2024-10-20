import './scss/App.scss';
import Sitebar from './components/Navbar/Sitebar';
import {Route, Routes } from 'react-router-dom';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginContainer from './components/Login/LoginContainer';
import { connect } from 'react-redux';
import { appInitialize } from './redux/app-reducer';
import React, { lazy, useEffect } from 'react';
import Preloader from './components/common/Preloader/Preloader';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import withLazyMy from './hoc/withLazyMy';

const ProfileContainer = lazy(() => import('./components/Prifile/ProfileContainer'));




const App = (props) => {


let LazyComponent = withLazyMy(ProfileContainer);



  useEffect(() => {
    props.appInitialize();
  }, [])

  if(!props.initialize) return <Preloader />

  return (
    <div className='app-wrapper'>
      <div className="app-container">
        <HeaderContainer />
        <div className='app-body'>
          <Sitebar state={props.state.sitebarPage} />
          <div className='app-content'>
            <Routes>
              <Route path='/profile/:userId?/*' element={<LazyComponent />} />
              <Route path='/dialogs/*' element={<DialogsContainer />} />
              <Route path='/news/*' element={<News />} />
              <Route path='/settings/*' element={<Settings />} />
              <Route path='/users' element={<UsersContainer />} />
              <Route path='/login' element={<LoginContainer />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};



let mapStateToProps = (state) => {
  return {
    initialize: state.app.initialize
  }
}

export default connect(mapStateToProps, {appInitialize}) (App);




