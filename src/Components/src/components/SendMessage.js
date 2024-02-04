import React, { useState } from "react";
import { auth, db } from "../../Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, getDocs, collection } from "firebase/firestore";


const SendMessage = ({ scroll }) => {
  const [message, setMessage] = useState("");
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
  let disName;

  const sendMessage = async (event) => {
    event.preventDefault();
    info.map((data)=> {
      if(data.uid === user.uid){
        disName = (data.firstname + data.lastName)
      }
    })
    
    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }
    const { uid, displayName, photoURL, phoneNumber} = auth.currentUser;
    
    console.log(auth.currentUser)
    if(displayName=== null){
      await addDoc(collection(db, "messages"), {
        text: message,
        name: disName,
        avatar: 'https://lh3.googleusercontent.com/a/ACg8ocII6eoYclP3nFLZUpFOB48Fe3aQdXIEn6FjAphi7X0b=s96-c',
        createdAt: Date.now(),
        uid,
      });
      setMessage("");
      scroll.current.scrollIntoView({ behavior: "smooth" });
    }
    else{
    await addDoc(collection(db, "messages"), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: Date.now(),
      uid,
    });
    setMessage("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  }
  };
 if(info !== null){
  return (
    <div>
      <form onSubmit={(event) => sendMessage(event)} className="send-message">
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{backgroundColor:"floralWhite", color:"black"}} 
      />
    {/* <span style={{backgroundColor:"black", border:"1px solid white "}} >
      {/* <InsertPhotoOutlinedIcon  fontSize='large' style={{color:"white"}} /> */}
      {/* <input type="file" onChange={uploadImage}  /> */}
      {/* <img src={file} /> */}
      {/* </span>  */}
      <button type="submit"  style={{backgroundColor:"black", color:"white"}} >Send</button>
    </form>
    
    </div>
  );
}
};

export default SendMessage;
