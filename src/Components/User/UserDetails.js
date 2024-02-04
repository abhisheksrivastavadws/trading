import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { getDocs, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db} from "../Firebase/Firebase";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function UserDetails() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [info, setInfo] = React.useState(null);
  const [user] = useAuthState(auth);
  React.useEffect(()=>{
    fetchPost();
}, [])
const fetchPost = async () => {
   
    await getDocs(collection(db, "userdata"))
        .then((querySnapshot)=>{               
        const     newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
            setInfo(newData);    
})
   
}

if(info !== null){
  
  return (
    
    <div>
      <Button onClick={handleOpen} style={{color:"black"}}>Profile</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {info.map((data)=> {
            
			if((data.uid) === user.uid){
        {console.log("",data.uid,user.uid, data.firstname)}
           return(
            <>
            <TextField disabled  margin="normal" fullWidth label={data.firstname} id="fullWidth"/>
          <TextField disabled  margin="normal" fullWidth label={data.lastName} id="fullWidth" />
          <TextField disabled  margin="normal" fullWidth label={data.email} id="fullWidth" />
          <TextField disabled  margin="normal" fullWidth label={data.dateOfBirth} id="fullWidth" />
          
          
          </>
           )
      }
          })}
        
       
        </Box>
      </Modal>
    </div>
  );
}
}
