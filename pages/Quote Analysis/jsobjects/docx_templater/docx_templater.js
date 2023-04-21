export default {
	
	downloadDocx: async () => { 
		await Edge_Generate_Doc.run();
		await download(Edge_Generate_Doc.data.signedUrl, Edge_Generate_Doc.data.path, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
	}
	
	
		
}