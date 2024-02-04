import React from 'react'
import ReactPlayer from 'react-player'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Appbar from '../Appbar/Appbar'
import Footer from '../Footer/Footer'
import { getDocs, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db} from "../Firebase/Firebase";
// Render a YouTube video player
export default function VideoPlayer () {

  let newData = React.useState()
  let urls=[]
  const [info, setInfo] = React.useState(null);
  React.useEffect(()=>{
    fetchPost();
}, [])
const fetchPost = async () => {
   
    await getDocs(collection(db, "videoData"))
        .then((querySnapshot)=>{               
             newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
            setInfo(newData);    
})   
}

if(info !== null){
  info.map((data)=>{
    console.log(data.url)
    urls.push(data.url)
  })

 console.log(urls)
return (
    <div style={{backgroundColor:"black"}}>
			<Appbar />
			<Box style={{ align:"centre", backgroundColor:"black"}}
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
        //   width: 300,
        //   height: 300,
        },
      }}
    >
		
    
      <Paper elevation={3} style={{margin:"auto", textAlign:"center"  }} >
<ReactPlayer url= {urls}
playing='true'
muted={false}
controls={true}

/>
</Paper>
     
			

			
     </Box>
             <Footer />
             </div>
)

}
}