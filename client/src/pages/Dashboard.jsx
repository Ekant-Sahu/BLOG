import React, { useEffect } from 'react'
import {useLocation} from 'react-router-dom'
import { useState } from 'react'
import DashSidebar from '../componentes/DashSidebar';
import DashProfile from '../componentes/DashProfile';
import DashPost from '../componentes/DashPost';
import DashUsers from '../componentes/DashUsers';
import DashComments from '../componentes/DashComments';
import { Dash } from '../componentes/Dash';
export default function Dashboard() {
  const location = useLocation();
  const [tab,setTab] = useState('');
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if(tabFromUrl){
      setTab(tabFromUrl);
    };
  },[location.search]);
  return (
  <div className='relative'>
    <DashSidebar />
    {tab==='profile' && <DashProfile/>}
    {tab==='post' && <DashPost/>}
    {tab==='users' && <DashUsers/>}
    {tab==='comments' && <DashComments/>}
    {tab==='dashboard' && <Dash />}
  </div>
  )
}
