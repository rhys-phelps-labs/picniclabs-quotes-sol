export default {
	
	checkAuth: async () => {
		// if the user has not logged into the back end, then force them back to the login screen.
		if(!appsmith.store.access_token) {
			navigateTo('Login');
		}
		return;
	}
}