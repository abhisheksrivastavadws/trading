import React, {useState} from 'react';
import { TextField, Button, Container, Stack } from '@mui/material';
import { Link } from "react-router-dom"
import { auth, db } from "../Firebase/Firebase";
import { addDoc, getDocs, collection } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
 
const PostModal = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const { uid, displayName, photoURL, phoneNumber} = auth.currentUser;
    const [user] = useAuthState(auth);
    const [ userdata, setUserdata ] = useState("")
    const [info, setInfo] = React.useState(null);
    let newData = React.useState()
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
      const [open, setOpen] = React.useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);
    let count = 0
    const navigate = useNavigate();
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


    function handleSubmit(event) {
        event.preventDefault();
        // console.log(firstName, lastName, email, new Date().getFullYear()+'-'+(new Date().getMonth() + 1)+'-' + new Date().getDate() ) 
        // console.log(uid,user.uid)
        
       
            
         addDoc(collection(db, "postdata"), {
            currentTimestamp: Date.now(),
            description: firstName,
            url: lastName,
            title: email,
            posttime: new Date().getFullYear()+'-'+(new Date().getMonth() + 1)+'-' + new Date().getDate(),
            // dateOfBirth:dateOfBirth,
            uid,
        //    phoneNumber,
          });
          setUserdata("");
          navigate('/feed')
        
       
    }

    return (
        <React.Fragment> 
            <Button onClick={handleOpen}> Post A Feed</Button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={style}>
            <h2>Lets Create a Feed</h2>
            <form onSubmit={handleSubmit} action={<Link to="/" />}>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Description"
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
                        fullWidth
                        required
                    />
                    {/* <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Last Name"
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}
                        fullWidth
                        required
                    /> */}
                </Stack>
                 <TextField
                    type="text"
                    variant='outlined'
                    color='secondary'
                    label="Title"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    fullWidth
                    required
                    sx={{mb: 4}}
                />
              
                <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Url Of Image"
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}
                        fullWidth
                        required
                    />
                <Button variant="outlined" color="secondary" type="submit">Register</Button>
            </form>
            </Box>
      </Modal>
            
     
        </React.Fragment>
    )
}
 
export default PostModal;