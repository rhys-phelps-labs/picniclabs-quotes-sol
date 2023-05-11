export default {
	
	downloadDocx: async () => { 
		
		// save any address changes to the quote
		await Upd_Quote_Address_Detail.run();
		
		await Edge_Generate_Doc.run({ id: gdSelectDocType.selectedOptionValue, entity_id: appsmith.store.current_quote.quote_id});
		await download(Edge_Generate_Doc.data.signedUrl, Edge_Generate_Doc.data.path, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
	}
	
	
		
}