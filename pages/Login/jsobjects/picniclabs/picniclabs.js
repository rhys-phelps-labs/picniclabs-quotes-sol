export default {
	supabase: { 
		url: 'https://jfbetozeonrhkwbmddkm.supabase.co',
 	},
	
	// When the page is visited force the user to login again.
	clearAuth: async () => {
		removeValue('access_token');
	},
	
	// post the user login, and store the successful result in temporary store.
	// then use that information to build a supabaseClient and store that in persistant cache
	// this supabaseClient will be used across the whole app, include refreshing token
	signIn: async () => {
		
		try {
			await SupabaseUserLogin.run();
			for(var i in SupabaseUserLogin.data) {
				delete SupabaseUserLogin.data.user;
				Object.keys(SupabaseUserLogin.data).forEach(i => {
					storeValue(i, SupabaseUserLogin.data[i], false);
				});		
			}
		
			const supabaseClient = await supabase.createClient(this.supabase.url, appsmith.store.access_token);
			storeValue('supabaseClient', supabaseClient, true);
			navigateTo('Quote Data');
			
		} catch (Error) {
			
			storeValue('login_error_message', 'Login credentials are invalid!', false);
			showAlert(Error, 'error');
			
		}
		
		return;
	}
}