export default {
	
	checkAuth: async () => {
		if(!appsmith.store.access_token) {
			navigateTo('Login');
		}
		return;
	}
}