import * as React from 'react';
import Button from '@mui/material/Button';
import { auth } from "../Firebase/Firebase";

export default function UserDetails() {
  const handleOpen = () => {
    auth.signOut();
  }

  return (
    <div>
      <Button onClick={handleOpen} style={{color:"black"}}>Logout</Button>
    </div>
  );
}
