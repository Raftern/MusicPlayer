import React, { memo } from 'react';

import { MioAppHeaderDiv } from './css';
import MioSearchBar from '../base-frame/search-bar';
import MioAvatarBar from '../base-frame/avatar-bar';
import axios from 'axios';
import { getUserStatus } from '../../axios/server/userLogin';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserInform } from '../../store/slices/user-inform';

// 接受一个全局的 redux
const theme = 'dark';

const MioAppHeader = memo(() => {
  const dispatch = useDispatch();

  useEffect(() => {
    const cookie = localStorage.getItem('cookie');
    const isLogin = sessionStorage.getItem('login');
    // 如果有cookie 并且是未登录的状态 第一次打开页面
    if(cookie && isLogin!='true') {
      // 设置登录状态
      document.cookie = `MUSIC_U=${cookie.split('MUSIC_U=')[1].split(';')[0]};NMTID=${cookie.split('NMTID=')[1].split(';')[0]}`;
      sessionStorage.setItem('cookie',cookie);
      sessionStorage.setItem('login','true');
      const url = getUserStatus(cookie); 
      axios.get(url).then(res => {
        const id = res.data.data.profile.userId;
        const avatar = res.data.data.profile.avatarUrl;
        const nickname = res.data.data.profile.nickname;
        sessionStorage.setItem('userId',id);
        sessionStorage.setItem('userAvatar',avatar);
        sessionStorage.setItem('userNickname',nickname);
        dispatch(setUserInform({id,avatar,nickname}));
      })
    }
    // 如果有cookie 并且是登录状态 刷新页面 未关闭浏览器 
    if(cookie && isLogin =='true') {
      const id = sessionStorage.getItem('userId');
      const avatar = sessionStorage.getItem('userAvatar');
      const nickname = sessionStorage.getItem('userNickname');
      dispatch(setUserInform({id,avatar,nickname}));
    }
  },[])

  return (
    <MioAppHeaderDiv theme={theme}>
      <div className="header-left">
        <div className="header-left-img"></div>
        <span className='header-left-title'>AyayaMusic</span>
        <span className='header-left-last step'>{'<'}</span>
        <span className='header-left-next step'>{'>'}</span>
      </div>
      <div className="header-middle">
        <MioSearchBar />
      </div>
      <div className="header-right">
        <MioAvatarBar />
      </div>
    </MioAppHeaderDiv>
  )
})

export default MioAppHeader