import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { auth, db} from "../Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDocs, collection } from "firebase/firestore";
import Appbar from '../Appbar/Appbar'
import Footer from '../Footer/Footer'


export default function Feed() {
  const [expanded, setExpanded] = React.useState(false);
  const [info, setInfo] = React.useState(null);
  let newData = React.useState()

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  React.useEffect(()=>{
    fetchPost();
}, [])
const fetchPost = async () => {
   
    await getDocs(collection(db, "postdata"))
        .then((querySnapshot)=>{               
             newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
            setInfo(newData);    
            

    
})
   
}
let sortedData;
 if(info !== null){
    // console.log("info",info)
   
 sortedData= info.sort((function (a, b) { 
                     return new Date(b.currentTimestamp) - new Date(a.currentTimestamp) 
                   }));
// console.log(sortedData);
  return (
    <div >
        <Appbar/>
        {sortedData.map((data)=> {
    return (
        <React.Fragment> 
           <div style={{marginLeft:"30%", marginBottom:"1%", marginTop:"1%"}}>
           <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              Yash
            </Avatar>
          }
          
          title={data.title}
          subheader={data.posttime}
        />
        <CardMedia
          component="img"
          height="194"
          image={data.url}
          alt="image"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {data.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            {/* <FavoriteIcon /> */}
            {/* {data.count} */}
          </IconButton>
        </CardActions>
      </Card>
           </div>
      </React.Fragment>
        );
  })}
        <Footer/>
    </div>
  )
  
 }
}