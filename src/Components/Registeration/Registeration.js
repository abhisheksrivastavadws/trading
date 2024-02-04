import React, {useState} from 'react';
import { TextField, Button, Container, Stack } from '@mui/material';
import { Link } from "react-router-dom"
import { auth, db } from "../Firebase/Firebase";
import { addDoc, getDocs, collection } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";

 
 
const Registration = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const { uid, displayName, photoURL, phoneNumber} = auth.currentUser;
    const [user] = useAuthState(auth);
    const [ userdata, setUserdata ] = useState("")
    const [info, setInfo] = React.useState(null);
    let newData = React.useState()
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
        console.log(firstName, lastName, email, dateOfBirth) 
        console.log(uid,user.uid)
        
        if(count === 0){
            
         addDoc(collection(db, "userdata"), {
            firstname: firstName,
            lastName: lastName,
            displayName: (firstName+lastName),
            email: email,
            createdAt: Date.now(),
            dateOfBirth:dateOfBirth,
            uid,
           phoneNumber,
          });
          setUserdata("");
          navigate('/')
        }
        else{
            navigate('/')
        }
    }
    if(info !== null){
        
info.map((data)=> {
    console.log("data.uid",data.uid,uid)
    if(data.uid === uid){
        count = 1
    }
})
console.log("count",count)
    return (
        <React.Fragment>
            <h2>Hello User </h2>
            <form onSubmit={handleSubmit} action={<Link to="/" />}>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="First Name"
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
                        fullWidth
                        required
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Last Name"
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}
                        fullWidth
                        required
                    />
                </Stack>
                 <TextField
                    type="email"
                    variant='outlined'
                    color='secondary'
                    label="Email"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    fullWidth
                    required
                    sx={{mb: 4}}
                />
              
                <TextField
                    type="date"
                    variant='outlined'
                    color='secondary'
                    label="Date of Birth"
                    onChange={e => setDateOfBirth(e.target.value)}
                    value={dateOfBirth}
                    fullWidth
                    required
                    sx={{mb: 4}}
                />
                <Button variant="outlined" color="secondary" type="submit">Register</Button>
            </form>
            <small>Already have an account? <Link to="/">Login Here</Link></small>
     
        </React.Fragment>
    )
    
}
}
 
export default Registration;