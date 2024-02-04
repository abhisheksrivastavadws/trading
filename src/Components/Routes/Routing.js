import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPageFound from '../NoPageFound/NoPageFound';
import Login from '../Login/Login';
import Dashboard from '../Dashboard/Dashboard'
import App from '../src/App'
import VideoPlayer from '../VideoPlayer/VideoPlayer'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db} from "../Firebase/Firebase";
import Registeration from '../Registeration/Registeration'
import Feed from '../Feed/Feed'
import AdminFeeds from '../Feed/AdminFeeds'
import RooneyRoy from '../RooneyRoy/RooneyRoy'

import { getDocs, collection } from "firebase/firestore";
export default function Routing () {

  const [userID] = useAuthState(auth);
  let newData = React.useState()
  const [info, setInfo] = React.useState(null);
  React.useEffect(()=>{
    fetchPost();
}, [])
const fetchPost = async () => {
   
    await getDocs(collection(db, "userdata"))
        .then((querySnapshot)=>{               
             newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
            setInfo(newData);    
})   
}
let count =0
let royCount =0
if(info !== null){
  info.map((data)=>{
    // console.log(data.phoneNumber)
    if(data.phoneNumber === '+919039292081' || '+919752123943'){
      count =1
    }
    if(data.phoneNumber === '+919039292081'){
      royCount =1
    }
  })
}if(royCount === 1){
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} >
      </Route>
      <Route path="/dashboard" element={<Dashboard />} >
    //  </Route>
    //  <Route path="/messages" element={<App/>} >
    //  </Route>
      <Route path="/course" element={<VideoPlayer/>} >
      </Route>
      <Route path="/register" element={<Registeration/>} >
      </Route>
      <Route path="/adminfeeds" element={<AdminFeeds/>} >
      </Route>
      <Route path="/feed" element={<Feed/>} >
      </Route>
      <Route path="/rooneyroy" element={<RooneyRoy/>} >
      </Route>
      <Route path="*" element={<NoPageFound />} />
    
    </Routes>
  </BrowserRouter>
  )
}
if(count === 1){
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} >
      </Route>
      <Route path="/dashboard" element={<Dashboard />} >
    //  </Route>
     // <Route path="/messages" element={<App/>} >
    //  </Route>
      <Route path="/course" element={<VideoPlayer/>} >
      </Route>
      <Route path="/register" element={<Registeration/>} >
      </Route>
      <Route path="/adminfeeds" element={<AdminFeeds/>} >
      </Route>
      <Route path="/feed" element={<Feed/>} >
      </Route>
      <Route path="*" element={<NoPageFound />} />
    
    </Routes>
  </BrowserRouter>
  )
}
else{
  return userID ? 
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} >
          </Route>
          <Route path="/dashboard" element={<Dashboard />} >
       //   </Route>
      //    <Route path="/messages" element={<App/>} >
       //   </Route>
          <Route path="/course" element={<VideoPlayer/>} >
          </Route>
          <Route path="/register" element={<Registeration/>} >
          </Route>
          <Route path="/feed" element={<Feed/>} >
          </Route>
          <Route path="*" element={<NoPageFound />} />
        
        </Routes>
      </BrowserRouter>
   :  <BrowserRouter>
   <Routes> <Route path="/" element={<Login />} ></Route>
   <Route path="*" element={<NoPageFound />} />
   </Routes>
      </BrowserRouter>
      }
    
}