import React from 'react';

const UserProfile = (props) => {
	console.log(props);

	const { user } = props;
	return (
		<div>
			<h1>{user.username}'s user page!</h1>
		</div>
	);
};

export default UserProfile;