import './scss/App.scss';
import {Navigate, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import { appInitialize } from './redux/app-reducer';
import { FC, lazy, useEffect, useLayoutEffect } from 'react';
import Preloader from './components/common/Preloader/Preloader';
import withLAzy from './hoc/withLazy';
import { getIsAuth } from './redux/auth-selectors';
import { getActiveMenu, getInitialize, getProfileMount } from './redux/app-selectors';
import classNames from 'classnames';
import NotFound from './components/Not-found/NotFound'
import { AppStateType } from './redux/redux-store';
import { UsersWithRedirect } from './components/Users/Users';
import { DialogsWithRedirect } from './components/Dialogs/Dialogs';
import { HeaderWithRedirect } from './components/Header/Header';
import { InfoWithRedirect } from './components/Info/Info';
import { LoginPage } from './components/Login/LoginPage';
import { SitebarWithRedirect } from './components/Navbar/Sitebar';
import Settings from './components/Settings/Settings';
import Profile from './components/Prifile/Profile';
import FollowedUsers from './components/FollowedUsers/FollowedUsers';




const ChatPage = lazy(() => import('./pages/chat/ChatPage'));
const ChatPageLazy = withLAzy(ChatPage);



type PropsAppType = {
  initialize: boolean,
  isAuth: boolean,
  profileMoutn: boolean,
  activeMenu: boolean,
  appInitialize: () => void
}


const App = (props: PropsAppType) => {



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
      <div className={classNames('header', {'headerBurger': props.activeMenu})} ><HeaderWithRedirect /></div>
      <div className={classNames('app-page', {'app-pageBurger': props.activeMenu, 'app-pageLogin': !props.isAuth})}>
        <div className={classNames({'app-page__containerLogin': !props.isAuth, 'app-page__container': props.isAuth, 'app-page__containerProfile': props.profileMoutn, })} >
          <div className={classNames('app-page__sitebar', {'_activeSiteBar': props.activeMenu})}><SitebarWithRedirect /></div>
          <div className='app-page__main'>
            <Routes>
              <Route path='/' element={<Navigate to={'/profile'} />} />
              <Route path='/profile/:userId?/*' element={<Profile />} />
              <Route path='/dialogs/*' element={<DialogsWithRedirect />} />
              <Route path='/users' element={<UsersWithRedirect />} />
              <Route path='/followedUsers' element={<FollowedUsers />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/chat' element={<ChatPageLazy />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
          { <div className={classNames({'app-page__info': !props.profileMoutn, 'app-page__infoProfile': props.profileMoutn})}><InfoWithRedirect /></div>}
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
