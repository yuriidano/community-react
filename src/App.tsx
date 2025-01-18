import './scss/App.scss';
import {Navigate, Route, Routes } from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import { connect } from 'react-redux';
import { appInitialize } from './redux/app-reducer';
import React, { FC, lazy, useEffect, useLayoutEffect } from 'react';
import Preloader from './components/common/Preloader/Preloader';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import withLAzy from './hoc/withLazy';
import InfoContainer from './components/Info/InfoContainer';
import { getIsAuth } from './redux/auth-selectors';
import { getActiveMenu, getInitialize, getProfileMount } from './redux/app-selectors';
import classNames from 'classnames';
import SitebarContainer from './components/Navbar/SitebarContainer';
import NotFound from './components/Not-found/NotFound'
import MusicContainer from './components/Music/MusicContainer';
import { AppStateType } from './redux/redux-store';
import LoginContainer from './components/Login/LoginContainer';



const ProfileContainer = lazy(() => import('./components/Prifile/ProfileContainer'));


const ProfileContainerLazy = withLAzy(ProfileContainer);


type PropsAppType = {
  initialize: boolean,
  isAuth: boolean,
  profileMoutn: boolean,
  activeMenu: boolean,
  appInitialize: () => void
}

type OwnAppPropsType = {};



const App:FC<PropsAppType> = (props) => {


  const catchAllUnhandledErrors = (e: PromiseRejectionEvent) => { }

  useEffect(() => {
    props.appInitialize();
    window.addEventListener("unhandledrejection", catchAllUnhandledErrors as any);
  }, []);

  useLayoutEffect(() => {
    window.removeEventListener("unhandledrejection", catchAllUnhandledErrors as any);
  }, []);

  if (!props.initialize) return <div className='preloader'><Preloader /></div> 



  return (
    <div className='wrapper'>
      <div className={classNames('header', {'headerBurger': props.activeMenu})} ><HeaderContainer /></div>
      <div className={classNames('app-page', {'app-pageBurger': props.activeMenu, 'app-pageLogin': !props.isAuth})}>
        <div className={classNames({'app-page__containerLogin': !props.isAuth, 'app-page__container': props.isAuth, 'app-page__containerProfile': props.profileMoutn, })} >
          <div className={classNames('app-page__sitebar', {'_activeSiteBar': props.activeMenu})}><SitebarContainer /></div>
          <div className='app-page__main'>
            <Routes>
              <Route path='/' element={<Navigate to={'/profile'} />} />
              <Route path='/profile/:userId?/*' element={<ProfileContainerLazy />} />
              <Route path='/dialogs/*' element={<DialogsContainer />} />
              <Route path='/users' element={<UsersContainer />} />
              <Route path='/login' element={<LoginContainer />} />
              <Route path='/music' element={<MusicContainer />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
          <div className={classNames({'app-page__info': !props.profileMoutn, 'app-page__infoProfile': props.profileMoutn})}><InfoContainer /></div>
        </div>
      </div>
    </div>
  );
};



type MapStatePropsType = {
  initialize: boolean,
  isAuth: boolean,
  profileMoutn: boolean,
  activeMenu: boolean
}
type mapDispatchType = {
  appInitialize: () => void
};

type OwnPropsType = {
  state: AppStateType
}

type PropsType = MapStatePropsType & mapDispatchType & OwnPropsType;




const AppContainer: FC<PropsType> = (props) => {

  return (
    <>
      <App {...props} />
    </>
  )
}



const mapStateToProps = (state: AppStateType) => {
  return {
    initialize: getInitialize(state),
    isAuth: getIsAuth(state),
    profileMoutn: getProfileMount(state),
    activeMenu: getActiveMenu(state)
  }
}

export default connect<MapStatePropsType, mapDispatchType, OwnPropsType, AppStateType>(mapStateToProps, {appInitialize}) (AppContainer);
