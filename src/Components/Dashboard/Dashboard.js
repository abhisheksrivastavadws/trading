import React from 'react'
import { auth, db} from "../Firebase/Firebase";
import Footer from '../Footer/Footer'
import Appbar from '../Appbar/Appbar';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { getDocs, collection } from "firebase/firestore";
import Button from '@mui/material/Button';
import PostModal from '../Feed/PostModal';

export default function Dashboard () {
    const navigate = useNavigate();
	const [user] = useAuthState(auth);
	console.log("user",user.uid)
	let uid = user.uid;
	const [info, setInfo] = React.useState(null);
	let count = 0;
	let newData = React.useState()
    const logout = () => {
		auth.signOut();
        // navigate("/")
	};
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
	if(info !== null){
		info.map((data)=> {
			console.log("newroy",data.uid, uid)
			if(data.uid === uid){
				count = 1
				
			}
		})
	if(count >0){
		
		return(
			<div>
				{info.map((data)=> {
			if((data.uid) === user.uid){
				if(data.phoneNumber === '+919039292081' || '+919752123943'){
				return (
					<React.Fragment>
						<Appbar/>
						<div 
						// style={{ marginTop: 250 }}
						>
						<center>
							<h3>
								Welcome
								{" "+data.firstname+" "+ data.lastName}
							</h3>
							<button
								style={{ marginLeft: "20px" }}
								onClick={logout}
							>
								Logout
							</button>
						</center>
					</div>
					<div>
						<Button variant="outlined" color="secondary" style={{marginLeft:"20%"}}><PostModal/></Button>
					</div>
					<Footer/>
					</React.Fragment>
				)
				}
				else{
					return (
						<React.Fragment>
							<Appbar/>
							<div 
							// style={{ marginTop: 250 }}
							>
							<center>
								<h3>
									Welcome
									{" "+data.firstname+" "+ data.lastName}
								</h3>
								<button
									style={{ marginLeft: "20px" }}
									onClick={logout}
								>
									Logout
								</button>
							</center>
						</div>
						<Footer/>
						</React.Fragment>
					)
				}
			}

			
		})}
	
			</div>
		)
	}
	else{
		navigate('/register')
	}
}
}