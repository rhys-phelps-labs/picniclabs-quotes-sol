export default {
	
	/*
	 On button press verify data. check the data rows and values within each cell.
	 Get the row that has an error and list all of the problems.
	*/
	verifyUploadData: async () => {
			storeValue('processing_stage', 'Verify', false);
			var bad_rows = [];
			var good_rows = [];
		
		for (var r in DataFilePicker.files[0].data) {
			
			var error_messages = [];
			
			// Building Name
			if(DataFilePicker.files[0].data[r]['Building Name'] == null) { 
				error_messages.push({ message: 'The Building Name must be populated.'});

			} else {
				if(typeof DataFilePicker.files[0].data[r]['Building Name'] != 'string') { 
					error_messages.push({ message: 'The Building Name must be a text value.'});
				}
				if(DataFilePicker.files[0].data[r]['Building Name'].length > 255) { 
					error_messages.push({ message: 'The Building Name must less than 255 characters long.'});
				}
			}
			
			// Group 
			if(DataFilePicker.files[0].data[r]['Group'] == null) { 
				error_messages.push({ message: 'The Group must be populated.'});
			}
			// Address 
			if(DataFilePicker.files[0].data[r]['Address'] == null) { 
				error_messages.push({ message: 'The Address must be populated.'});
			}
			
			// State 
			if(DataFilePicker.files[0].data[r]['State'] == null) { 
				error_messages.push({ message: 'The State must be populated.'});
			}
			var state_allowed_values = ['WA', 'SA', 'NT', 'ACT', 'NSW', 'QLD', 'VIC', 'TAS', 'OT'];
			var state_match = _.indexOf(state_allowed_values, DataFilePicker.files[0].data[r]['State']);
			if (state_match == -1) {
				error_messages.push({message: 'State (e.g. NSW) is invalid.'});
			}
			
			// Replacement Basis
			if(DataFilePicker.files[0].data[r]['Replacement Basis'] == null) { 
				error_messages.push({ message: 'The Replacement Basis must be populated.'});
			}
			var replacement_basis_allowed_values = ['Full Replacement', 'Fixed Limit', 'Contents Only', 'Make Safe'];
			var basis_match = _.indexOf(replacement_basis_allowed_values, DataFilePicker.files[0].data[r]['Replacement Basis']);
			if (basis_match == -1) {
				error_messages.push({message: 'Replacement Basis is invalid.'});
			}
			
			
			// Building Sum Insured Incl GST
			if(DataFilePicker.files[0].data[r]['Building Sum Insured Incl GST'] == null) { 
				error_messages.push({ message: 'The Building Sum Insured Incl GST must be populated.'});
			} else {
				if(typeof DataFilePicker.files[0].data[r]['Building Sum Insured Incl GST'] != 'number') {
					error_messages.push({ message: 'The Building Sum Insured Incl GST value is not a proper number.'});
				}
				if(DataFilePicker.files[0].data[r]['Building Sum Insured Incl GST'] < 0) {
					error_messages.push({ message: 'The Building Sum Insured Incl GST may not be negative'});
				}
			}
			// Contents Sum Insured incl GST
			if(DataFilePicker.files[0].data[r]['Contents Sum Insured incl GST'] == null) { 
				error_messages.push({ message: 'The Contents Sum Insured incl GST must be populated.'});
			} else {
				if(typeof DataFilePicker.files[0].data[r]['Contents Sum Insured incl GST'] != 'number') {
					error_messages.push({ message: 'The Contents Sum Insured incl GST value is not a proper number.'});
				}
				if(DataFilePicker.files[0].data[r]['Contents Sum Insured incl GST'] < 0) { 
				error_messages.push({ message: 'The Contents Sum Insured incl GST may not be negative.'});
			}
			}
			// Limit
			if(DataFilePicker.files[0].data[r]['Limit'] == null) { 
				error_messages.push({ message: 'The Limit must be populated.'});
			} else {
				if(typeof DataFilePicker.files[0].data[r]['Limit'] != 'number') {
					error_messages.push({ message: 'The Limit value is not a proper number.'});
				}
				if(DataFilePicker.files[0].data[r]['Limit'] < 0) {
					error_messages.push({ message: 'The Limit value must be greater than 0.'});
				}
			}
			// Professional Fees
			if(DataFilePicker.files[0].data[r]['Professional Fees'] == null) { 
				error_messages.push({ message: 'The Professional Fees must be populated.'});
			} else if(typeof DataFilePicker.files[0].data[r]['Professional Fees'] != 'number') { 
				error_messages.push({ message: 'The Professional Fees must be a proper number.'});
			}
			// BI incl GST
			if(DataFilePicker.files[0].data[r]['BI incl GST'] == null) { 
				error_messages.push({ message: 'The BI incl GST must be populated.'});
			} else if(typeof DataFilePicker.files[0].data[r]['BI incl GST'] != 'number') { 
				error_messages.push({ message: 'The BI incl GST is not a proper number.'});
			} else if(DataFilePicker.files[0].data[r]['BI incl GST'] < 0) {
				error_messages.push({ message: 'The BI incl GST must be greater than 0.'});
			}
			// Hurdle
			if(DataFilePicker.files[0].data[r]['Hurdle'] == null) { 
				error_messages.push({ message: 'The Hurdle must be populated.'});
			} else if(typeof DataFilePicker.files[0].data[r]['Hurdle'] != 'number') {
				error_messages.push({ message: 'The Hurdle must be a proper number.'});
			}
			// ANZSIC Code
			if(DataFilePicker.files[0].data[r]['ANZSIC Code'] == null) { 
				error_messages.push({ message: 'The ANZSIC Code must be populated.'});
			}
			// No of Buildings
			if(DataFilePicker.files[0].data[r]['No of Buildings'] == null) { 
				error_messages.push({ message: 'The No of Buildings must be populated.'});
			}
			// No Levels
			if(DataFilePicker.files[0].data[r]['No Levels'] == null) { 
				error_messages.push({ message: 'The No Levels must be populated.'});
			}
			// Walls
			if(DataFilePicker.files[0].data[r]['Walls'] == null) { 
				error_messages.push({ message: 'The Walls must be populated.'});
			}
			var walls_allowed_values = ['Fibro','Brick','Concrete','Metal','EPS','Stone','Timber'];
			var walls_match = _.indexOf(walls_allowed_values, DataFilePicker.files[0].data[r]['Walls']);
			if (walls_match == -1) {
				error_messages.push({message: 'Walls text is not one of our valid classifications.'});
			}
			
			
			// Roof
			if(DataFilePicker.files[0].data[r]['Roof'] == null) { 
				error_messages.push({ message: 'The Roof must be populated.'});
			}
			var roof_allowed_values = ['Tiles','Iron','Fibro','Timber','Concrete','Slate'];
			var roof_match = _.indexOf(roof_allowed_values, DataFilePicker.files[0].data[r]['Roof']);
			if (roof_match == -1) {
				error_messages.push({message: 'Roof text is not one of our valid classifications.'});
			}
			
			// Year Built
			if(DataFilePicker.files[0].data[r]['Year Built'] == null) { 
				error_messages.push({ message: 'The Year Built must be populated.'});
			}
			// Fire Protection
			if(DataFilePicker.files[0].data[r]['Fire Protection'] == null) { 
				error_messages.push({ message: 'The Fire Protection must be populated.'});
			}
			if(DataFilePicker.files[0].data[r]['Fire Protection'] < 0 || DataFilePicker.files[0].data[r]['Fire Protection'] > 3) { 
				error_messages.push({ message: 'The Fire Protection is not within acceptable range, 0-3.'});
			}
			
			// Security Protection
			if(DataFilePicker.files[0].data[r]['Security Protection'] == null) { 
				error_messages.push({ message: 'The Security Protection must be populated.'});
			}
			if(DataFilePicker.files[0].data[r]['Security Protection'] < 0 || DataFilePicker.files[0].data[r]['Security Protection'] > 3) { 
				error_messages.push({ message: 'The Security Protection is not within acceptable range, 0-3.'});
			}
			// Heritage Listed
			if(DataFilePicker.files[0].data[r]['Heritage Listed'] == null) { 
				error_messages.push({ message: 'The Heritage Listed must be populated.'});
			}
			var truth_values = [true, false];
			var truth_match = _.indexOf(truth_values, DataFilePicker.files[0].data[r]['Heritage Listed']);
			if(truth_match == -1) { 
				error_messages.push({ message: 'The Heritage Listed must be either TRUE or FALSE.'});
			}
			
			// Asbestos
			if(DataFilePicker.files[0].data[r]['Asbestos'] == null) { 
				error_messages.push({ message: 'The Asbestos must be populated.'});
			}
			truth_match = _.indexOf(truth_values, DataFilePicker.files[0].data[r]['Asbestos']);
			if(truth_match == -1) { 
				error_messages.push({ message: 'The Asbestos must be either TRUE or FALSE.'});
			}
			
			// EPS Percentage
			if(DataFilePicker.files[0].data[r]['EPS Percentage'] == null) { 
				error_messages.push({ message: 'The EPS Percentage must be populated.'});
			}
			if(DataFilePicker.files[0].data[r]['EPS Percentage'] < 0) { 
				error_messages.push({ message: 'The EPS Percentage may not be a negative.'});
			}
			if(DataFilePicker.files[0].data[r]['EPS Percentage'] > 100) { 
				error_messages.push({ message: 'The EPS Percentage maximum is 100 percent.'});
			}
			// Building Type
			if(DataFilePicker.files[0].data[r]['Building Type'] == null) { 
				error_messages.push({ message: 'The Building Type must be populated.'});
			}
			var building_types_allowed = ['Commercial', 'Residential'];
			var building_type_match = _.indexOf(building_types_allowed,DataFilePicker.files[0].data[r]['Building Type'] );
			if(building_type_match == -1) {
				error_messages.push({ message: 'The Building Type may be Commercial or Residential, only.'});
			}
			
			// Flood Included
			if(DataFilePicker.files[0].data[r]['Include Flood'] == null) { 
				error_messages.push({ message: 'The Include Flood must be populated.'});
			}
			truth_match = _.indexOf(truth_values, DataFilePicker.files[0].data[r]['Include Flood']);
			if(truth_match == -1) { 
				error_messages.push({ message: 'The Include Flood must be either TRUE or FALSE.'});
			}
			
			if(DataFilePicker.files[0].data[r]['Building Sum Insured Incl GST'] == 0 && 
				 DataFilePicker.files[0].data[r]['Contents Sum Insured incl GST'] == 0 && 
				 DataFilePicker.files[0].data[r]['Limit'] == 0 &&
				 DataFilePicker.files[0].data[r]['BI incl GST'] == 0) { 
				error_messages.push({ message: 'The Protected Address has no value. Enter a declared value, contents, BI incl GST and Limit.'});
			}
			
			if(error_messages.length > 0) {
				bad_rows.push({row: r, Error: error_messages, data: DataFilePicker.files[0].data[r] });
			} else {
				good_rows.push({ row: r, data : DataFilePicker.files[0].data[r] });
			}
			
	
		}

		storeValue('bad_rows', bad_rows, false);
		storeValue('good_rows', good_rows, false);
	},
	
	fixDataError: async () => {
		var good_values = {
			'Building Name': errBuildingName.inputText,
			'Group': errGroup.inputText,
			'Address': errAddress.inputText,
			'State': errState.inputText,
			'Replacement Basis': errReplacementBasis.inputText,
			'Building Sum Insured Incl GST': errBuildingSum.value,
			'Contents Sum Insured incl GST': errContentsSum.value,
			'Limit': errLimit.value,
			'Professional Fees':	errProfFees.value,
			'BI incl GST': ErrBI.value,
			'Hurdle': errHurdle.value,
			'ANZSIC Code': errANZSIC.inputText,
			'No of Buildings': errNoBuildings.inputText,
			'No Levels': errNoLevels.inputText,
			'Walls': errWalls.inputText,
			'Roof': errRoof.inputText,
			'Year Built': errYearBuilt.inputText,
			'Fire Protection': errFire.inputText,
			'Security Protection': errSecurity.inputText,
			'Heritage Listed': errHeritage.inputText,
			'Asbestos': errAsbestos.inputText,
			'EPS Percentage': errEPS.inputText,
			'Building Type': errBuildingType.inputText,
			'Include Flood': errIncludeFlood.inputText,
			'building_make_safe': errLimit.value * 0.20,
			'contents_make_safe': errContentsSum.value * 0.10
		};
		
		var good_rows = appsmith.store.good_rows;
		good_rows.push({ row: Bad_Rows.selectedRow.row, data: good_values});
		storeValue('good_rows', good_rows, false);
		
		var bad_rows = appsmith.store.bad_rows;
		bad_rows.splice(Bad_Rows.selectedRowIndex, 1);
		storeValue('bad_rows', bad_rows, false);
	},
	
	deleteBadRow: (idx) => {
		
		var bad_rows = appsmith.store.bad_rows;
		var removed_rows = _.remove(bad_rows, function(o,i) { return i == idx});
		storeValue('bad_rows', bad_rows, false);
		
	},
	
	moveGoodRowToBadRow: (idx) => {
		// move a row from good set back to bad set. 
		// helps with reversing a mistake when fixing a bad row
		var bad_rows = appsmith.store.bad_rows;
		var good_rows = appsmith.store.good_rows;
		var removed_row = _.remove(good_rows, function(o,i) { return i == idx});
		removed_row[0]['Error'] = [{message: 'Added to bad rows by user'}];
		bad_rows.push(removed_row[0]);
		storeValue('bad_rows', bad_rows, false);
		storeValue('good_rows', good_rows, false);
		
	},
	
	
	prepareInsertData: (quote_id) => {
		// build an array of insert statements, that will be later chunked for insert query
		var good_rows = appsmith.store.good_rows;
		var insert_rows = [];
		for (var r in good_rows) {
			var row = good_rows[r];
			var qstr = "(" + quote_id + "," +
					"E'" + row.data['Building Name'].replace(/[\\"']/g, '\\$&') + "'," +
					"E'" + row.data['Group'].replace(/[\\"']/g, '\\$&') + "'," +
					"E'" + row.data['Address'].replace(/[\\"']/g, '\\$&') + "'," +
					"'" + row.data.Perils.state + "'," +
					"'" + row.data['Replacement Basis'] + "'," +
					row.data['Building Sum Insured Incl GST'] + "," +
					row.data['Contents Sum Insured incl GST'] + "," +
					row.data['Limit'] + "," +
					row.data['Professional Fees'] + "," +
					row.data['BI incl GST'] + "," +
					row.data['Hurdle'] + "," +
					"'" + row.data['ANZSIC Code'] + "'," +
					row.data['No of Buildings'] + "," +
					row.data['No Levels'] + "," +
					"'" + row.data['Walls'] + "'," +
					"'" + row.data['Roof'] + "'," +
					row.data['Year Built'] + "," +
					row.data['Fire Protection'] + "," +
					row.data['Security Protection'] + "," +
					"'" + row.data['Heritage Listed'] + "'," +
					"'" + row.data['Asbestos'] + "'," +
					row.data['EPS Percentage'] + "," +
					"'" + row.data['Building Type'] + "'," + 
					"'" + appsmith.user.email + "'," +
					row.data.Perils.latitude  + "," +
    			row.data.Perils.longitude + "," +
					"'" + row.data.Perils.gc_flag + "'," +
					row.data.Perils.flood_depth_20 + "," +
					row.data.Perils.flood_depth_50 + "," +
					row.data.Perils.flood_depth_100 + "," +
					row.data.Perils.flood_depth_200 + "," +
					row.data.Perils.flood_depth_500 + "," +
					row.data.Perils.flood_depth_1000 + "," +
					row.data.Perils.flood_depth_extreme + "," +
					row.data.Perils.flood_ari_gl + "," +
					row.data.Perils.flood_ari_gl1m + "," +
					row.data.Perils.flood_ari_gl2m + "," +
					row.data.Perils.riverine_percentage + "," +
					row.data.Perils.overland_percentage + "," +
					row.data.Perils.elevation + "," +
					"'" + row.data.Perils.ga_catchment + "'," +
					"'" + row.data.Perils.resolution + "'," +
					row.data.Perils.levee_information + "," +
					"'" + row.data.Perils.notes_id1 + "'," +
					"'" + row.data.Perils.notes_id2 + "'," +
					"'" + row.data.Perils.wfm_coverage_flag + "'," +
					row.data.Perils.fdi + "," +
					"'" + row.data.Perils.veg_type + "'," +
					row.data.Perils.distance + "," +
					row.data.Perils.bushfire_attack_level + "," +
					row.data.Perils.bal_category + "," +
					row.data.Perils.surroundedness + "," +
					row.data.Perils.windgust_5yr_ari + "," +
					row.data.Perils.windgust_10yr_ari + "," +
					row.data.Perils.windgust_25yr_ari + "," +
					row.data.Perils.windgust_50yr_ari + "," +
					row.data.Perils.windgust_100yr_ari + "," +
					row.data.Perils.windgust_250yr_ari + "," +
					row.data.Perils.windgust_500yr_ari + "," +
					row.data.Perils.windgust_1000yr_ari + "," +
					row.data.Perils.adjusted + "," +
					row.data.Perils.sts_risk + "," +
					row.data.Perils.ot + "," +
					row.data.Perils.radar + "," +
					row.data.Perils.reanalysis + "," +
					row.data.Perils.obs_size_100 + "," +
					row.data.Perils.dist_coast + "," +
					"'" + row.data.Perils.terrain_location + "'," +
					"'" + row.data.Perils.terrain_resolution + "'," +
					"'" + row.data['GNAF PID'] + "'," +
					row.data['Accurate'] + "," +
					"'" + row.data['Loqate Id'] + "'," +
					"'" + row.data.Perils.remoteness_area_name + "'," + 
					row.data['Include Flood'] + "," +
					row.data['building_make_safe'] + "," + 
					row.data['contents_make_safe'] + ")";
			console.log(qstr);
			insert_rows.push(qstr);
		}
		return insert_rows;
	},
	
	finishProcess: async () => {
		
		if(appsmith.store.bad_rows.length > 0) {
			showAlert('Please clear the Bad Rows before saving. Unwanted rows may be delete from Bad Rows.', 'warning');
		} else {
			try {
			
				await Create_Quote.run();
				var quote_id = Create_Quote.data[0].id;
				var insert_data = await this.prepareInsertData(quote_id); // an array of insert statements
				// batch the insert statements
				console.log(insert_data);
				var batches = _.chunk(insert_data, 100);
				console.log(batches);
				var insert_qry = "";
				for (var b in batches) {
					var batch = batches[b];
					for (var i in batch) {
						insert_qry = insert_qry + batch[i] + ',';
					}
					
					// remove the comma
					insert_qry = _.trimEnd(insert_qry, ',');
					// dont wait, just commit the batch
					await Insert_Quote_Risks.run({value_set: insert_qry});
					insert_qry = "";
				}
				
				// clear good and bad rows
				storeValue('good_rows', [], false);
				storeValue('bad_rows', [], false);
				
				
			} catch (error) {
				console.log('Quote Data Error has occured: ' + error);
				showAlert('Something has gone wrong. Contact Tech Support : ' + JSON.stringify(error));				
			}
			
		}
	},
	
		
	getWillisData: async (batch) => {
		const calls = batch.map(risk => Get_Perils_GNAF_PID.run({gnaf_pid : risk.data['GNAF PID']}));	
		return Promise.allSettled(calls);
	},
	
	loqateBatchCheck: (batch) => {
		const calls = batch.map(risk => Loqate_Find_Service.run({search_address : risk.data.Address}));	
		return Promise.allSettled(calls);
	},
	
	checkAddressAccuracy: async () => {
		var batch_size = 5;
		var good_rows = appsmith.store.good_rows;
		var bad_rows = [];
		var new_good_rows = [];
		var risk = {};
		var batches = _.chunk(good_rows, batch_size);
		var total_progress = good_rows.length;
		var completed_progress = 0;
		var progress_increment = 50/total_progress;
		GNAFProgress.progress = 0;
		
		// for each batch
		for(var b in batches) {
			var batch = batches[b];
			var resp = await this.loqateBatchCheck(batch);
			console.log(resp);
			
			// for each Response, the batch idx matches the resp idx
			for (var r in resp) {
				var loqate = resp[r];
				console.log(loqate);
				// is loqate status == 'SUCCESS'
				if(loqate.value) {
					if(loqate.value.status == 'SUCCESS') {
						if(loqate.value.payload.length == 0) {
							// is the payload empty, no matches found, none
							risk = batch[r];
							risk.data['Accurate'] = false;
							risk.data['GNAF PID'] = 'Unkown';
							risk['Error'] = [{ message: 'No results returned for this address'}];
							bad_rows.push(risk);
						}
						if(loqate.value.payload.length > 1) {
							// is the payload full of responses
							// we have more than one match. store the values and let the user decide
							risk = batch[r];
							risk.data['Accurate'] = false;
							risk.data['GNAF PID'] = 'Unkown';
							risk['Error'] = [{ message: 'Too many results for an exact match'}];
							bad_rows.push(risk);
						}
						if(loqate.value.payload.length == 1) {
							// is there only one eact match
							risk = batch[r];
							risk.data['Accurate'] = true;
							risk.data['GNAF PID'] = loqate.value.payload[0].id.split('|')[2];
							new_good_rows.push(risk);
						}
					} else {
						showAlert('Loqate Interface has a failure. Contact Tech Support.' + JSON.stringify(loqate.value.messages), 'warning');	
					}
				} else {
					showAlert('Loqate Interface has a failure. Contact Tech Support.'+ JSON.stringify(loqate.value.messages), 'warning');
				}
				completed_progress += progress_increment;
				GNAFProgress.progress = completed_progress;
			}
		}
		
		// now we batch process all of the accurate addresses with perils data.
		if(new_good_rows.length == 0) {
			progress_increment = 50;
		} else {
			progress_increment = 50 / new_good_rows.length;
		}
		completed_progress = 50;
		var peril_batches = _.chunk(new_good_rows, batch_size);
		var peril_good_rows = [];
		
		for(var pb in peril_batches) {
			var peril_batch = peril_batches[pb];
			var pb_resp = await this.getWillisData(peril_batch);
			console.log(pb_resp);
			
			for(var x in pb_resp) {
				var willis = pb_resp[x];
				risk = peril_batch[x];
				
				if(willis.value.length == 1) {
					risk['data']['Perils'] = willis.value[0];
					console.log(risk);
					peril_good_rows.push(risk);
				} else {
					risk['Error'] = [ { message: 'No Perils data found!'}];
					bad_rows.push(risk);
				}
				completed_progress += progress_increment;
				GNAFProgress.progress = completed_progress;
			}
		}
		
		// finally store the value for each table, good and bad
		storeValue('good_rows', peril_good_rows, false);
		storeValue('bad_rows', bad_rows, false);
		storeValue('processing_stage', 'GNAF', false);		
	},
	
	getGNAFPIDs: async () => {
		storeValue('processing_stage', 'GNAF', false);
		// for every good row, search the address, and get a match from loqate
		// if only one results is returned, then we have an exact match. So update accurate = true and set gnaf_pid and loqate id
		// if mutliple matches are returned, then move the row to Bad_Rows.selectedRow
		var total_progress = appsmith.store.good_rows.length;
		var completed_progress = 0;
		var progress_increment = 100/total_progress;
		GNAFProgress.progress = 0;
		
	
		var good_rows = [];
		var bad_rows = [];
				
		for (var r in appsmith.store.good_rows) {
			
			console.log(appsmith.store.good_rows[r]);
			var search_address = appsmith.store.good_rows[r].data.Address;
			console.log(search_address);
			
			await Loqate_Find_Service.run((res)=>{
			
					console.log(res);
					var row = appsmith.store.good_rows[r];
					
					if(res) {
						if(res.payload.length == 1) {
							// we have an exact match
							row.data['Accurate'] = true;
							row.data['Loqate Id'] = res.payload[0].id;
							row.data['GNAF PID'] = res.payload[0].id.split('|')[2];
							good_rows.push(row);

						} else {
							// we have more than one match. store the values and let the user decide
							row.data['Accurate'] = false;
							row.data['GNAF PID'] = 'Unkown';
							row['Error'] = [{ message: 'Too many results for an exact match'}];
							bad_rows.push(row);

						}
					} else {
						// didnt find any rows
						row.data['Accurate'] = false;
						row.data['GNAF PID'] = 'Unkown';
						row['Error'] = [{ message: 'Too many results for an exact match'}];
						bad_rows.push(row);
					}
					completed_progress += progress_increment;
					GNAFProgress.progress = completed_progress;			
				
			}, () => {}, { search_address: search_address }); 
							
		}
		storeValue('good_rows', good_rows, false);
		storeValue('bad_rows', bad_rows, false);
	},

	fixGNAFData: async (input) => {
		var fix_row = appsmith.store.bad_rows[input.badRowId];
		console.log(fix_row);
		
		fix_row.data['Description'] = 'Fixed Address: ' + fix_row.data['Addresss'];
		fix_row.data['Address'] = input.newAddress;
		fix_row.data['GNAF PID'] = input.newGNAF;
		fix_row.data['Accurate'] = true;
		await Get_Perils_GNAF_PID.run({gnaf_pid : fix_row.data['GNAF PID']});
		
		if(Get_Perils_GNAF_PID.data[0]) {
		
			fix_row.data['Perils'] = Get_Perils_GNAF_PID.data[0];
			fix_row.data['State'] = Get_Perils_GNAF_PID.data[0].state;
			
			var bad_rows = appsmith.store.bad_rows
			bad_rows.splice(input.badRowId, 1);
			await storeValue('bad_rows', bad_rows, false);

			var good_rows = appsmith.store.good_rows;
			good_rows.push({ row: fix_row.row, data: fix_row.data});
			await storeValue('good_rows', good_rows, false);

			Loqate_Find_Service.clear();
			closeModal('FixGNAFModal');
			
		} else {
			showAlert('There is no Peril data associated with the GNAF PID. Please change address, and try again.', 'warning');
		}
		
	},
	
	
	showModalForProcessingStage: () => {

		if(appsmith.store.processing_stage == 'Verify') { showModal('FixDataErrorsModal');}
		if(appsmith.store.processing_stage == 'GNAF') { showModal('FixGNAFModal');}
		if(appsmith.store.processing_stage == 'Perils') { showModal('FixPerilsModal');}
	},
	
	getPerils: async () => {
		
		storeValue('processing_stage', 'Perils', false);
		var total_progress = appsmith.store.good_rows.length;
		var completed_progress = 0;
		var progress_increment = 100/total_progress;
		PerilsProgress.progress = 0;
		
		var good_rows = [];
		var bad_rows = [];
				
		for (var r in appsmith.store.good_rows) {
			
			console.log(appsmith.store.good_rows[r]);
			var search_gnaf_pid = appsmith.store.good_rows[r].data['GNAF PID'];
			console.log(search_gnaf_pid);
		
			await Get_Perils_GNAF_PID.run((res) => { 
				console.log(res);
				var row = appsmith.store.good_rows[r];
				
				if(res) {
					row['data']['Perils'] = res[0];
					good_rows.push(row);
				} else {
					row['Errors'] = [ { message: 'No Perils data found!'}];
					bad_rows.push(row);
				}

			}, () => {}, { gnaf_pid : search_gnaf_pid});
			
		completed_progress += progress_increment;
		PerilsProgress.progress = completed_progress;			
		}

		storeValue('good_rows', good_rows, false);
		storeValue('bad_rows', bad_rows, false);
	},
	
	loadRatingFactors: async () => {
		// load the whole rating factors into a cache and then search the cache for rating.
		await Get_Rating_Factors.run();
		storeValue('rating_factors', Get_Rating_Factors.data);		
	}
	
}