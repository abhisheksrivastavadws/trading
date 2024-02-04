import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SubjectOutlinedIcon from '@mui/icons-material/SubjectOutlined';

import FeedIcon from '@mui/icons-material/Feed';

import Paper from '@mui/material/Paper';
import MessageIcon from '@mui/icons-material/Message';
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);
  const navigate = useNavigate();
  const valueArray = ['course', 'feed', 'recents', 'messages']
  const handleClick = (valueClicked) => {
    if(valueArray.includes(valueClicked)){
      console.log("valueClicked",valueClicked)
    
    navigate('/'+valueClicked)
    }
  }
  

  return (
    <Box sx={{ pb: 7 }} ref={ref}  >
      {/* <CssBaseline /> */}
    
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3} style={{backgroundColor:"black"}}>
        <BottomNavigation 
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          style={{backgroundColor:"black"}}
        >
       <BottomNavigationAction
        label="Recents"
        value="recents"
        style={{color:"white"}}
        icon={<RestoreIcon  onClick={handleClick(value)}></RestoreIcon>}
      />
      <BottomNavigationAction
        label="Course"
        value="course"
        style={{color:"white"}}
        icon={<SubjectOutlinedIcon onClick={handleClick(value)}> </SubjectOutlinedIcon>}
      />
      <BottomNavigationAction
        label="Feed"
        value="feed"
        style={{color:"white"}}
        icon={<FeedIcon onClick={handleClick(value)}/>}
        
      />
      <BottomNavigationAction label="messages" value="messages" style={{color:"white"}} icon={<MessageIcon onClick={handleClick(value)} />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}


