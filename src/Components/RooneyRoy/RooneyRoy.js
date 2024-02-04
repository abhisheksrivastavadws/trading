import React, { Component } from 'react'
import { auth, db } from "../Firebase/Firebase";
import { addDoc, getDocs, collection } from "firebase/firestore";
import { TextField, Button, Container, Stack } from '@mui/material';

export default function RooneyRoy () {
    const { uid, displayName, photoURL, phoneNumber} = auth.currentUser;
   const AddFeed = () => {
    console.log("clicked")
    addDoc(collection(db, "postdata"), {
        currentTimestamp: Date.now(),
        // description: "no data",
        // url: "url",
        // title: email,
        posttime: new Date().getFullYear()+'-'+(new Date().getMonth() + 1)+'-' + new Date().getDate(),
        // dateOfBirth:dateOfBirth,
        uid,
    //    phoneNumber,
      });
    addDoc(collection(db, "messages"), {
        // text: message,
        // name: disName,
        avatar: 'https://lh3.googleusercontent.com/a/ACg8ocII6eoYclP3nFLZUpFOB48Fe3aQdXIEn6FjAphi7X0b=s96-c',
        createdAt: Date.now(),
        uid,
      });
      addDoc(collection(db, "videoData"), {
        // text: message,
        // name: disName,
        avatar: 'https://lh3.googleusercontent.com/a/ACg8ocII6eoYclP3nFLZUpFOB48Fe3aQdXIEn6FjAphi7X0b=s96-c',
        createdAt: Date.now(),
        uid,
      });
      
   }
    return (
        <div>
            <Button variant="outlined" color="secondary" onClick={AddFeed} style={{marginLeft:"20%"}}>Delete PostData</Button>
        </div>
    )
}