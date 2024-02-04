// Filename - login.js
import React, { useState } from "react";
import { firebase, auth } from "../Firebase/Firebase";
import { useNavigate } from "react-router-dom";
import Appbar from '../Appbar/Appbar'
import Footer from '../Footer/Footer'
import PhoneInput from 'react-phone-number-input'
import OtpInput from 'react-otp-input';
import 'react-phone-number-input/style.css'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const Login = () => {
	const navigate = useNavigate();
	// Inputs
	const [mynumber, setnumber] = useState("");
	// const [otp, setotp] = useState("");
	const [show, setshow] = useState(false);
	const [final, setfinal] = useState("");
	const [value, setValue] = useState()
	const [otp, setOtp] = useState('');

	// Sent OTP
	const signin = () => {
		if (value === "" || value.length === 10) return;

		let verify = new firebase.auth.RecaptchaVerifier(
			"recaptcha-container"
		);
		auth.signInWithPhoneNumber(value, verify)
			.then((result) => {
				setfinal(result);
				alert("code sent");
				setshow(true);
			})
			.catch((err) => {
				alert(err);
				alert(value)
				window.location.reload();
			});
	};

	// Validate OTP
	const ValidateOtp = () => {
		if (otp === null || final === null) return;
		final
			.confirm(otp)
			.then((result) => {
				console.log("Successfully login ", result)
				navigate("/dashboard")
			})
			.catch((err) => {
				alert("Wrong code");
			});
	};

	return (
		<div style={{backgroundColor:"black"}}>
			<Appbar />
			<Box style={{ align:"centre", backgroundColor:"black"}}
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 300,
          height: 300,
        },
      }}
    >
		
    
      <Paper elevation={3} style={{margin:"auto", textAlign:"center"  }} >
		
	  <div >
				<center>
					<div
						style={{
							display: !show ? "block" : "none",
						}}
					>
						{/* <input
						value={mynumber}
						onChange={(e) => {
							setnumber(e.target.value);
						}}
						placeholder="phone number"
					/> */}
						<div style={{ marginRight: "20%", marginLeft: "20%" , marginTop:"20%"}}>
							<PhoneInput
								defaultCountry="IN"
								placeholder="Enter phone number"
								value={value}
								onChange={setValue}

							/>
						</div>
						<br />
						<br />
						<div id="recaptcha-container"></div>
						<Button  variant="outlined" color="success" onClick={signin}>
							Send OTP
						</Button>
					</div>
					<div
						style={{
							display: show ? "block" : "none",
						}}
					>
						{/* <input
						type="text"
						placeholder={"Enter your OTP"}
						onChange={(e) => {
							setotp(e.target.value);
						}}
					></input> */}
					<div style={{ marginRight: "20%", marginLeft: "20%" , marginTop:"20%"}}>
						<OtpInput
						
							value={otp}
							onChange={setOtp}
							numInputs={6}
							renderSeparator={<span>-</span>}
							placeholder="******"
							inputType="tel"
							renderInput={(props) => <input {...props} />}
						/>
						
					</div>
						<br />
						<br />
						<button onClick={ValidateOtp}>
							Verify
						</button>
					</div>
				</center>
			</div>
	  </Paper>
     
			

			
    </Box>
			<Footer />
		</div>
	);
};

export default Logins;
