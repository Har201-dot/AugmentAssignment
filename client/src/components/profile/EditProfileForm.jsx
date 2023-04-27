import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import classes from "./EditProfileForm.module.scss";

function EditProfileForm() {
	const [user, setUser] = useState({
		name: "",
		email: "",
		phone: "",
		password: "",
	});

	useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.get("/api/users/user");
				setUser(data);
			} catch (err) {
				console.log(err);
			}
		})();
	}, []);

	const updateUserInfo = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	const updateProfile = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.put("/api/users/user", user);
			toast.success("Profile updated successfully");
			setUser(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<Link className={classes.backBtn} to="/">
				<BsArrowLeftShort />
				Home
			</Link>
			<div>
				<h1>Edit Profile</h1>
				<div style={{ marginTop: "10px" }}>
					<h3>
						(Enter the fields you want to change and you may leave rest of the
						fields empty)
					</h3>
				</div>
				<form className={classes.editForm} onSubmit={updateProfile}>
					<label htmlFor="name">
						Full Name:
						<input
							name="name"
							type="text"
							placeholder="Full Name"
							value={user.name}
							onChange={updateUserInfo}
						/>
					</label>
					<label htmlFor="email">
						email:
						<input
							name="email"
							type="email"
							placeholder="email"
							value={user.email}
							onChange={updateUserInfo}
						/>
					</label>
					<label htmlFor="password">
						password:
						<input
							name="password"
							type="password"
							placeholder="password"
							value={user.password}
							onChange={updateUserInfo}
						/>
					</label>
					<label htmlFor="phone">
						phone no:
						<input
							name="phone"
							type="tel"
							placeholder="numer"
							value={user.phone}
							onChange={updateUserInfo}
						/>
					</label>
					<button type="submit">Save</button>
				</form>
			</div>
		</div>
	);
}

export default EditProfileForm;
