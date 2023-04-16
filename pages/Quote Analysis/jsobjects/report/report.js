export default {
		
	// generate an xls file containing the full quote details.
	
	createExcelReport: async () => {
		
		const workbook = new ExcelJS.Workbook();
		
		this.sheet_Summary(workbook);
		this.sheet_Quote(workbook);
		this.sheet_RiskData(workbook);
		this.sheet_Attritional(workbook);
		this.sheet_Large(workbook);
		this.sheet_Weather(workbook);
		this.sheet_CoverBasisCalcs(workbook);
		this.sheet_Reinsurer(workbook);
		this.sheet_3D_Maps(workbook);
		
		var data = await workbook.xlsx.writeBuffer();
    const blob = new Blob([data], {type: 'application/xlsx'});
    const url = URL.createObjectURL(blob);
		
		var filename = _.snakeCase(appsmith.store.current_quote.detail.name);
		
    await download(url, filename + '.xlsx', "application/xlsx");
	},
	
	sheet_Summary: (workbook) => {
		
		var font_TITLE = { size: 11, bold : true, color: {argb: 'ff391B45'} };
		var font_NORMAL = { size: 11 };
		var font_TABLE_HEADING = { size: 11, bold : true, color: {argb: 'ffFFFFFF'} };
		var fill_TABLE_HEADING = { type: 'pattern', pattern: 'solid', fgColor: {argb:'ff391B45'} };
		var fill_TABLE_ROW = { type: 'pattern',     pattern: 'solid', fgColor: {argb:'ffF2F2F2'} };
		var fill_HIGHLIGHTED = { type: 'pattern',    pattern: 'solid', fgColor: {argb:'ffEEF525'} };
		var numFmt_toFixed0 = '#,##0';
		
		var worksheet = workbook.addWorksheet('Summary');
		
		// set column widths
		worksheet.columns = [
			{width: 3},
			{width: 68},
			{width: 25},
			{width: 19},
			{width: 19},
			{width: 25},
			{width: 25},
			{width: 8},
			{width: 50},
			{width: 40},
			{width: 35}
		];
		
		// Contribution Details section
				
		worksheet.getCell('B2').value = 'Contribution Details';
		worksheet.getCell('B2').font = font_TITLE;
		
		worksheet.getCell('B3').value = 'Description';
		worksheet.getCell('B3').font = font_TABLE_HEADING;
		worksheet.getCell('B3').fill = fill_TABLE_HEADING
		
		worksheet.getCell('C3').value = 'Base Contribution';
		worksheet.getCell('C3').font = font_TABLE_HEADING;
		worksheet.getCell('C3').fill = fill_TABLE_HEADING;
		
		worksheet.getCell('B4').value = appsmith.store.current_quote.detail.product_name;
		worksheet.getCell('B5').value = 'GST';
		worksheet.getCell('B5').fill = fill_TABLE_ROW;
		worksheet.getCell('B6').value = 'Total Contribution';
		worksheet.getCell('B6').fill = fill_TABLE_ROW;
		worksheet.getCell('B7').value = 'MMA Fee North';
		worksheet.getCell('B7').fill = fill_TABLE_ROW;
		worksheet.getCell('B8').value = 'MMA Fee South';
		worksheet.getCell('B8').fill = fill_TABLE_ROW;
		worksheet.getCell('C4').value = appsmith.store.current_quote.detail.total_contribution_excl_gst;
		worksheet.getCell('C4').numFmt = numFmt_toFixed0;
		
		worksheet.getCell('C5').value = appsmith.store.current_quote.detail.gst;
		worksheet.getCell('C5').numFmt = numFmt_toFixed0;
		worksheet.getCell('C6').value = appsmith.store.current_quote.detail.total_contribution;
		worksheet.getCell('C6').numFmt = numFmt_toFixed0;
		worksheet.getCell('C7').value = appsmith.store.current_quote.detail.mgmt_fee_tropics_total - appsmith.store.current_quote.detail.mgmt_fee_gst_tropics_total;
		worksheet.getCell('C7').numFmt = numFmt_toFixed0;
		
		worksheet.getCell('C8').value = appsmith.store.current_quote.detail.mgmt_fee_nontropics_total - appsmith.store.current_quote.detail.mgmt_fee_gst_nontropics_total;
		worksheet.getCell('C8').numFmt = numFmt_toFixed0;
		
		worksheet.getCell('B11').value = 'Special Conditions';
		worksheet.getCell('B11').value = '';
		
		// Bill To section
		worksheet.getCell('E2').value = 'Bill To';
		worksheet.getCell('E2').font = font_TITLE;
		
		worksheet.getCell('E3').value = 'Contact Name';
		worksheet.getCell('E3').fill = fill_TABLE_ROW;
		worksheet.getCell('E4').value = 'Company Name';
		worksheet.getCell('E4').fill = fill_TABLE_ROW;
		worksheet.getCell('E5').value = 'Address';
		worksheet.getCell('E5').fill = fill_TABLE_ROW;
		worksheet.getCell('E6').value = 'Phone';
		worksheet.getCell('E6').fill = fill_TABLE_ROW;
		worksheet.getCell('E7').value = 'Email';
		worksheet.getCell('E7').fill = fill_TABLE_ROW;
		worksheet.getCell('E8').value = 'Quote Details';
		worksheet.getCell('E8').font = font_TITLE;
		worksheet.getCell('E9').value = 'Quote #';
		worksheet.getCell('E9').fill = fill_TABLE_ROW;
		worksheet.getCell('E10').value = 'Quote name';
		worksheet.getCell('E10').fill = fill_TABLE_ROW;	
		worksheet.getCell('E11').value = 'Date of Quote';
		worksheet.getCell('E11').fill = fill_TABLE_ROW;
		worksheet.getCell('E12').value = 'Valid Until';
		worksheet.getCell('E12').fill = fill_TABLE_ROW;
		worksheet.getCell('E13').value = 'Inception Date';
		worksheet.getCell('E13').fill = fill_TABLE_ROW;
		worksheet.getCell('E14').value = 'Expiry Date';
		worksheet.getCell('E14').fill = fill_TABLE_ROW;
		worksheet.getCell('E15').value = 'Claims Hurdle';
		worksheet.getCell('E15').fill = fill_TABLE_ROW;
		worksheet.getCell('E16').value = 'PDS';
		worksheet.getCell('E16').fill = fill_TABLE_ROW;
		worksheet.getCell('E17').value = 'Timezone';
		worksheet.getCell('E17').fill = fill_TABLE_ROW;
		worksheet.getCell('E18').value = 'Payment Due Date';
		
		
		worksheet.getCell('F3').value = appsmith.store.current_quote.detail.contact_name;
		worksheet.getCell('F4').value = appsmith.store.current_quote.detail.company_name;
		worksheet.getCell('F5').value = appsmith.store.current_quote.detail.address;
		worksheet.getCell('F6').value = appsmith.store.current_quote.detail.phone;
		worksheet.getCell('F7').value = appsmith.store.current_quote.detail.email;
		
		worksheet.getCell('F9').value = appsmith.store.current_quote.detail.quote_number;
		worksheet.getCell('F10').value = appsmith.store.current_quote.detail.name;
		worksheet.getCell('F11').value = appsmith.store.current_quote.detail.quote_date;
		worksheet.getCell('F12').value = appsmith.store.current_quote.detail.quote_expiry;
		worksheet.getCell('F13').value = appsmith.store.current_quote.detail.inception_date;
		worksheet.getCell('F14').value = appsmith.store.current_quote.detail.expiry_date;
		worksheet.getCell('F15').value = appsmith.store.current_quote.detail.hurdle;
		worksheet.getCell('F16').numFmt = numFmt_toFixed0;
		worksheet.getCell('F17').value = appsmith.store.current_quote.detail.product_name;
		worksheet.getCell('F18').value = '';
		worksheet.getCell('F19').value = '';
		
		// Aggregate Protection Section
		worksheet.getCell('I9').value = 'Aggregate Protection';
		worksheet.getCell('I9').font = font_TITLE;
		worksheet.getCell('I10').value = 'PROTECTION'; worksheet.getCell('I10').font = font_TABLE_HEADING;	worksheet.getCell('I10').fill = fill_TABLE_HEADING;
		worksheet.getCell('J10').value = 'DECLARED VALUE'; worksheet.getCell('J10').font = font_TABLE_HEADING;	worksheet.getCell('J10').fill = fill_TABLE_HEADING;
		worksheet.getCell('K10').value = 'LIMIT'; worksheet.getCell('K10').font = font_TABLE_HEADING;	worksheet.getCell('K10').fill = fill_TABLE_HEADING;
		
		worksheet.getCell('I11').value = 'Loss to your buildings';
		worksheet.getCell('I12').value = 'Contents (excluding personal effects & money)';
		worksheet.getCell('I13').value = 'Individual Items Listed';
		worksheet.getCell('I14').value = 'Consequential Loss';
		
		worksheet.getCell('J11').value = (appsmith.store.current_quote.detail.declared_total == 0) ? 'Nil' : appsmith.store.current_quote.detail.declared_total;
		worksheet.getCell('K11').value = (appsmith.store.current_quote.detail.declared_limit_total == 0) ? 'Refer to Schedule' : appsmith.store.current_quote.detail.declared_limit_total;
		worksheet.getCell('J12').value = (appsmith.store.current_quote.detail.declared_contents_total == 0) ? 'Nil' : appsmith.store.current_quote.detail.declared_contents_total;
		worksheet.getCell('K12').value = (appsmith.store.current_quote.detail.declared_contents_total == 0) ? 'Not Protected' : appsmith.store.current_quote.detail.declared_contents_total;
		//worksheet.getCell('J13').value = (appsmith.store.current_quote.detail.individually_listed_items == 0) ? 'Nil' : appsmith.store.current_quote.individually_listed_items;
		//worksheet.getCell('K13').value = (appsmith.store.current_quote.detail.individually_listed_items == 0) ? 'Not Protected' : appsmith.store.current_quote.individually_listed_items;
		worksheet.getCell('J14').value = (appsmith.store.current_quote.detail.declared_cons_loss_total == 0) ? 'Nil' : appsmith.store.current_quote.detail.declared_cons_loss_total;
		worksheet.getCell('K14').value = (appsmith.store.current_quote.detail.declared_cons_loss_total == 0) ? 'Not Protected' : appsmith.store.current_quote.detail.declared_cons_loss_total;
		
		
		// Protected Addreses section
		// set the headers in the cells
		worksheet.getCell('B21').value = 'Protected Assets';
		worksheet.getCell('B21').font = font_TITLE;
		
		worksheet.getCell('B22').value = 'Asset Name'; worksheet.getCell('B22').font = font_TABLE_HEADING;	worksheet.getCell('B22').fill = fill_TABLE_HEADING;
		worksheet.getCell('C22').value = 'Declared Value'; worksheet.getCell('C22').font = font_TABLE_HEADING;	worksheet.getCell('C22').fill = fill_TABLE_HEADING;
		worksheet.getCell('D22').value = 'Basis of Cover';  worksheet.getCell('D22').font = font_TABLE_HEADING;	worksheet.getCell('D22').fill = fill_TABLE_HEADING;
		worksheet.getCell('E22').value = 'Loss to Building';  worksheet.getCell('E22').font = font_TABLE_HEADING;	worksheet.getCell('E22').fill = fill_TABLE_HEADING;
		worksheet.getCell('F22').value = 'Loss to Contents';  worksheet.getCell('F22').font = font_TABLE_HEADING;	worksheet.getCell('F22').fill = fill_TABLE_HEADING;
		worksheet.getCell('G22').value = 'Consequential Loss';  worksheet.getCell('G22').font = font_TABLE_HEADING;	worksheet.getCell('G22').fill = fill_TABLE_HEADING;
		worksheet.getCell('H22').value = 'Flood';  worksheet.getCell('H22').font = font_TABLE_HEADING;	worksheet.getCell('H22').fill = fill_TABLE_HEADING;
		
		var asset_rows = [];
		for(var r in appsmith.store.current_quote.risks) {
			var row = [(+r + 1),
								 appsmith.store.current_quote.risks[r].data.building_name,
								 appsmith.store.current_quote.risks[r].data.building_sum_insured,
								 appsmith.store.current_quote.risks[r].data.replacement_basis,
								 (appsmith.store.current_quote.risks[r].data.replacement_basis == 'Full Replacement' ? 'Full Replacement' : appsmith.store.current_quote.risks[r].data.limit),
								 appsmith.store.current_quote.risks[r].data.contents_sum_insured,
								 appsmith.store.current_quote.risks[r].data.consequential_loss
								];
			asset_rows.push(row);
		}
		worksheet.addRows(asset_rows);		
		
	},
	
	
	sheet_Quote: (workbook) => {
		
		var font_TITLE = { size: 11, bold : true, color: {argb: 'ff391B45'} };
		var font_TABLE_HEADING = { size: 11, bold : true, color: {argb: 'ffFFFFFF'} };
		var fill_TABLE_HEADING = { type: 'pattern', pattern: 'solid', fgColor: {argb:'ff391B45'} };
		var fill_TABLE_ROW = { type: 'pattern',     pattern: 'solid', fgColor: {argb:'ffF2F2F2'} };
		var dec2places_format = '#,##0.00';
		var percentage_format = '0.00%';
		
		var worksheet = workbook.addWorksheet('Quote');
		
		// set column widths
		worksheet.columns = [
			{width: 26},
			{width: 23},
			{width: 22},
			{width: 22},
			{width: 17},
			{width: 17},
			{width: 35},
			{width: 17},
			{width: 17},
			{width: 17},
			{width: 17}
		];
		
		// assumptions section
		worksheet.getCell('A2').value = 'Assumptions';
		worksheet.getCell('A2').font = font_TITLE;
		worksheet.getCell('A3').value = 'GST';
		worksheet.getCell('A4').value = 'Loading/(Discount)';
		worksheet.getCell('A5').value = 'XOL premium Est.';
		worksheet.getCell('A6').value = 'Weight to claims experience';
		worksheet.getCell('A7').value = 'Mutual Profit margin';
		worksheet.getCell('A8').value = 'Marketing Fee';
		worksheet.getCell('A9').value = 'Estimated Longevity';
		worksheet.getCell('A10').value = 'Reinsurance Rate';
		worksheet.getCell('A11').value = 'Declared Value Adjustment Factor';
		worksheet.getCell('A12').value = 'Hurdle';
		worksheet.getCell('A13').value = 'Is Renewal';
		worksheet.getCell('A14').value = 'Flood applied';
		worksheet.getCell('A15').value = 'Payment Term / Loading';
		
		worksheet.getCell('B2').value = 'Value';
		worksheet.getCell('B2').font = font_TITLE;
		worksheet.getCell('B3').value = 10.0;
		worksheet.getCell('B4').value = appsmith.store.current_quote.detail.loading_discount;
		worksheet.getCell('B5').value = appsmith.store.current_quote.detail.xol_premium_est;
		worksheet.getCell('B6').value = appsmith.store.current_quote.detail.weight_claim_exp;
		worksheet.getCell('B7').value = appsmith.store.current_quote.detail.mutual_profit_margin;
		worksheet.getCell('B8').value = appsmith.store.current_quote.detail.marketing_fee_pct;
		worksheet.getCell('B9').value = 1;
		worksheet.getCell('B10').value = 0.24;

		worksheet.getCell('B11').value = appsmith.store.current_quote.detail.declared_building_val_adj;
		worksheet.getCell('B12').value = appsmith.store.current_quote.detail.claim_hurdle;
		worksheet.getCell('B13').value = appsmith.store.current_quote.detail.is_renewal;
		worksheet.getCell('B14').value = appsmith.store.current_quote.detail.asset_include_flood;
		worksheet.getCell('B15').value = appsmith.store.current_quote.detail.payment_term;
		worksheet.getCell('C15').value = appsmith.store.current_quote.detail.payment_term_loading;
		
		// build Up section
		worksheet.getCell('A17').value = 'Build Up';
		worksheet.getCell('A17').font = font_TITLE;
		worksheet.getCell('B17').value = 'Attritional';
		worksheet.getCell('B17').font = font_TABLE_HEADING;
		worksheet.getCell('B17').fill = fill_TABLE_HEADING;
		worksheet.getCell('C17').value = 'Large (non-natural peril)';
		worksheet.getCell('C17').font = font_TABLE_HEADING;
		worksheet.getCell('C17').fill = fill_TABLE_HEADING;
		worksheet.getCell('D17').value = 'Weather';
		worksheet.getCell('D17').font = font_TABLE_HEADING;
		worksheet.getCell('D17').fill = fill_TABLE_HEADING;
		worksheet.getCell('E17').value = 'Total';
		worksheet.getCell('E17').font = font_TABLE_HEADING;
		worksheet.getCell('E17').fill = fill_TABLE_HEADING;
		worksheet.getCell('F17').value = 'Weighted Total';
		worksheet.getCell('F17').font = font_TABLE_HEADING;
		worksheet.getCell('F17').fill = fill_TABLE_HEADING;
		worksheet.getCell('A18').value = 'Risk Premium Summary';
		worksheet.getCell('A18').fill = fill_TABLE_ROW;
		worksheet.getCell('A19').value = 'XOL Premium';
		worksheet.getCell('A19').fill = fill_TABLE_ROW;
		worksheet.getCell('A20').value = 'Profit Margin for Mutual';
		worksheet.getCell('A20').fill = fill_TABLE_ROW;
		
		worksheet.getCell('B18').value = appsmith.store.current_quote.detail.att_risk_total;
		worksheet.getCell('B18').numFmt = dec2places_format;
		worksheet.getCell('B19').value = appsmith.store.current_quote.detail.xol_att;
		worksheet.getCell('B19').numFmt = dec2places_format;
		worksheet.getCell('B20').value = appsmith.store.current_quote.detail.profit_att;
		worksheet.getCell('B20').numFmt = dec2places_format;
		worksheet.getCell('C18').value = appsmith.store.current_quote.detail.lrg_risk_total;
		worksheet.getCell('C18').numFmt = dec2places_format;
		worksheet.getCell('C19').value = appsmith.store.current_quote.detail.xol_lrg;
		worksheet.getCell('C19').numFmt = dec2places_format;
		worksheet.getCell('C20').value = appsmith.store.current_quote.detail.profit_lrg;
		worksheet.getCell('C20').numFmt = dec2places_format;
		worksheet.getCell('D18').value = appsmith.store.current_quote.detail.wea_risk_total;
		worksheet.getCell('D18').numFmt = dec2places_format;
		worksheet.getCell('D19').value = appsmith.store.current_quote.detail.xol_wea;
		worksheet.getCell('D19').numFmt = dec2places_format;
		worksheet.getCell('D20').value = appsmith.store.current_quote.detail.profit_wea;
		worksheet.getCell('D20').numFmt = dec2places_format;
		worksheet.getCell('E18').value = appsmith.store.current_quote.detail.risk_total;
		worksheet.getCell('E18').numFmt = dec2places_format;
		worksheet.getCell('E19').value = appsmith.store.current_quote.detail.xol_total;
		worksheet.getCell('E19').numFmt = dec2places_format;
		worksheet.getCell('E20').value = appsmith.store.current_quote.detail.profit_total;
		worksheet.getCell('E20').numFmt = dec2places_format;
		worksheet.getCell('F19').value = appsmith.store.current_quote.detail.xol_weighted_contribution;
		worksheet.getCell('F19').numFmt = dec2places_format;
		worksheet.getCell('F19').fill = fill_TABLE_ROW;
		worksheet.getCell('F20').value = appsmith.store.current_quote.detail.profit_weighted_contribution;
		worksheet.getCell('F20').numFmt = dec2places_format;
		worksheet.getCell('F20').fill = fill_TABLE_ROW;
		
		
		// Management Fee section 
		worksheet.getCell('A23').value = 'Management Fee';
		worksheet.getCell('A23').font = font_TITLE;
		worksheet.getCell('B23').value = 'Tropics';
		worksheet.getCell('B23').font = font_TABLE_HEADING;
		worksheet.getCell('B23').fill = fill_TABLE_HEADING;
		worksheet.getCell('C23').value = 'Non-tropics';
		worksheet.getCell('C23').font = font_TABLE_HEADING;
		worksheet.getCell('C23').fill = fill_TABLE_HEADING;
		worksheet.getCell('D23').value = 'Total';
		worksheet.getCell('D23').font = font_TABLE_HEADING;
		worksheet.getCell('D23').fill = fill_TABLE_HEADING;
		
		worksheet.getCell('A24').value = 'First Year';
		worksheet.getCell('A24').fill = fill_TABLE_ROW;
		worksheet.getCell('A25').value = 'Subsequent';
		worksheet.getCell('A25').fill = fill_TABLE_ROW;
		worksheet.getCell('A26').value = 'GST';
		worksheet.getCell('A26').fill = fill_TABLE_ROW;
		worksheet.getCell('A27').value = 'Management Fee Total incl GST';
		worksheet.getCell('A27').fill = fill_TABLE_ROW;
		worksheet.getCell('B24').value = appsmith.store.current_quote.detail.mgmt_fee_tropics_1_total;
		worksheet.getCell('B24').numFmt = dec2places_format;
		worksheet.getCell('C24').value = appsmith.store.current_quote.detail.mgmt_fee_nontropics_1_total;
		worksheet.getCell('C24').numFmt = dec2places_format;
		worksheet.getCell('D24').value = appsmith.store.current_quote.detail.mgmt_fee_1_total;
		worksheet.getCell('D24').numFmt = dec2places_format;
		worksheet.getCell('B25').value = appsmith.store.current_quote.detail.mgmt_fee_tropics_sub_total;
		worksheet.getCell('B25').numFmt = dec2places_format;
		worksheet.getCell('C25').value = appsmith.store.current_quote.detail.mgmt_fee_nontropics_sub_total;
		worksheet.getCell('C25').numFmt = dec2places_format;
		worksheet.getCell('D25').value = appsmith.store.current_quote.detail.mgmt_fee_sub_total;
		worksheet.getCell('D25').numFmt = dec2places_format;
		worksheet.getCell('D26').value = appsmith.store.current_quote.detail.mgmt_fee_gst_total;
		worksheet.getCell('D26').numFmt = dec2places_format;
		worksheet.getCell('D27').value = appsmith.store.current_quote.detail.mgmt_fee_total;
		worksheet.getCell('D27').numFmt = dec2places_format;
		
		// management fee bands
		worksheet.getCell('G23').value = 'Management Fee Bands (declared value)';
		worksheet.getCell('G23').font = font_TITLE;
		worksheet.getCell('H23').value = 'Tropics';
		worksheet.getCell('H23').font = font_TABLE_HEADING;
		worksheet.getCell('H23').fill = fill_TABLE_HEADING;
		worksheet.getCell('I23').value = 'Non-tropics';
		worksheet.getCell('I23').font = font_TABLE_HEADING;
		worksheet.getCell('I23').fill = fill_TABLE_HEADING;
		worksheet.getCell('J23').value = 'Total';
		worksheet.getCell('J23').font = font_TABLE_HEADING;
		worksheet.getCell('J23').fill = fill_TABLE_HEADING;
		
		worksheet.getCell('G24').value = 'First Year';
		worksheet.getCell('G24').fill = fill_TABLE_ROW;
		worksheet.getCell('G25').value = 'Subsequent';
		worksheet.getCell('G25').fill = fill_TABLE_ROW;
		
		worksheet.getCell('H24').value = appsmith.store.current_quote.detail.tropics_1_total;
		worksheet.getCell('H24').numFmt = dec2places_format;
		worksheet.getCell('I24').value = appsmith.store.current_quote.detail.nontropics_1_total;
		worksheet.getCell('I24').numFmt = dec2places_format;
		worksheet.getCell('J24').value = appsmith.store.current_quote.detail.tropics_sub_total;
		worksheet.getCell('J24').numFmt = dec2places_format;
		worksheet.getCell('H25').value = appsmith.store.current_quote.detail.nontropics_sub_total;
		worksheet.getCell('H25').numFmt = dec2places_format;
		worksheet.getCell('I25').value = appsmith.store.current_quote.detail.tropics_total;
		worksheet.getCell('I25').numFmt = dec2places_format;
		worksheet.getCell('J25').value = appsmith.store.current_quote.detail.nontropics_total;
		worksheet.getCell('J25').numFmt = dec2places_format;
		
		
		// Previous Claims AAL section
		worksheet.getCell('A30').value = 'Previous Claims AAL';
		worksheet.getCell('A30').font = font_TITLE;
		worksheet.getCell('B30').value = appsmith.store.current_quote.detail.claims_aal;
		worksheet.getCell('B30').numFmt = dec2places_format;
				
		// Quote section section 
		worksheet.getCell('A33').value = 'Quote';
		worksheet.getCell('A33').font = font_TITLE;
		worksheet.getCell('B33').value = 'Total';
		worksheet.getCell('B33').font = font_TITLE;
		worksheet.getCell('A34').value = 'Base Contribution';
		worksheet.getCell('A34').font = font_TITLE;
		worksheet.getCell('A35').value = 'Marketing Fee';
		worksheet.getCell('A35').font = font_TITLE;
		worksheet.getCell('A36').value = 'Total Contribution';
		worksheet.getCell('A36').font = font_TITLE;
		worksheet.getCell('A37').value = 'GST';
		worksheet.getCell('A37').font = font_TITLE;
		worksheet.getCell('A38').value = 'Total incl GST';
		worksheet.getCell('A38').font = font_TITLE;
		
		worksheet.getCell('B34').value = appsmith.store.current_quote.detail.base_contribution;
		worksheet.getCell('B34').numFmt = dec2places_format;
		worksheet.getCell('B35').value = appsmith.store.current_quote.detail.marketing_fee_amt;
		worksheet.getCell('B35').numFmt = dec2places_format;
		worksheet.getCell('B36').value = appsmith.store.current_quote.detail.total_contribution_excl_gst;
		worksheet.getCell('B36').numFmt = dec2places_format;
		worksheet.getCell('B37').value = appsmith.store.current_quote.detail.gst;
		worksheet.getCell('B37').numFmt = dec2places_format;
		worksheet.getCell('B38').value = appsmith.store.current_quote.detail.total_contribution;
		worksheet.getCell('B38').numFmt = dec2places_format;
		
		var premium_per_1000 = appsmith.store.current_quote.detail.total_contribution_excl_gst / (appsmith.store.current_quote.detail.declared_by_basis + appsmith.store.current_quote.detail.declared_contents_total + appsmith.store.current_quote.detail.declared_cons_loss_total) * 100;
		console.log(premium_per_1000);
		worksheet.getCell('A41').value = 'Premium per $1000 sum insured';
		worksheet.getCell('B41').value = premium_per_1000;
		worksheet.getCell('B41').numFmt = dec2places_format;
		
	},
	
	sheet_RiskData: (workbook) => {
	
		var font_TABLE_HEADING = { size: 11, bold : true, color: {argb: 'ffFFFFFF'} };
		var fill_TABLE_HEADING = { type: 'pattern', pattern: 'solid', fgColor: {argb:'ff391B45'} };
		
		var worksheet = workbook.addWorksheet('Risk Data');
		var column_titles = [
			'Building Name',
			'Building Declared Value',
			'Building Limit',
			'Contents Sum Insured',
			//'ROD',
			'Professional Fees',
			'Consequential Loss',
			//'Total Value S1&2 +  BI',
			'Total Protected Value',
			'Hurdle',
			'Basis ',
			'Address',
			'State',
			'Occupancy Code',
			//'Occupancy Name',
			'Structure',
			'Roof',
			'No Buildings',
			'No Levels',
			'Year Built',
			'GNAF',
			'Lat',
			'Long',
			'Fire Protection',
			'Security Protection',
			'Heritage Listed',
			'Asbestos',
			'EPS %',
			'Remote',
			'Include Flood',
			'FLOOD_DEPTH_20',
			'FLOOD_DEPTH_50',
			'FLOOD_DEPTH_100',
			'FLOOD_DEPTH_200',
			'FLOOD_DEPTH_500',
			'FLOOD_DEPTH_1000',
			'FLOOD_DEPTH_EXTREME',
			'FLOOD_ARI_GL',
			'BAL_CATEGORY',
			'WINDGUST_5YR_ARI',
			'WINDGUST_10YR_ARI',
			'WINDGUST_25YR_ARI',
			'WINDGUST_50YR_ARI',
			'WINDGUST_100YR_ARI',
			'WINDGUST_250YR_ARI',
			'WINDGUST_500YR_ARI',
			'WINDGUST_1000YR_ARI',
			'STS_RISK',
			'Building Type'
			//'Flood Function',
			//'FLOOD_DEPTH_20_dmg',
			//'FLOOD_DEPTH_50_dmg',
			//'FLOOD_DEPTH_100_dmg',
			//'FLOOD_DEPTH_200_dmg',
			//'FLOOD_DEPTH_500_dmg',
			//'FLOOD_DEPTH_1000_dmg',
			//'FLOOD_DEPTH_EXTREME_dmg',
			//'WINDGUST_5YR_ARI_dmg',
			//'WINDGUST_10YR_ARI_dmg',
			//'WINDGUST_25YR_ARI_dmg',
			//'WINDGUST_50YR_ARI_dmg',
			//'WINDGUST_100YR_ARI_dmg',
			//'WINDGUST_250YR_ARI_dmg',
			//'WINDGUST_500YR_ARI_dmg',
			//'WINDGUST_1000YR_ARI_dmg'
		];
		
		worksheet.addRow(column_titles);
		var header_row = worksheet.getRow(1);
		header_row.eachCell({includeEmpty: false}, function(cell, number) {
			cell.font = font_TABLE_HEADING;
			cell.fill = fill_TABLE_HEADING;
		});
		
		worksheet.columns = [
			{width: 50},
			{width: 15, style: { numFmt: '#,##0' }},
			{width: 15, style: { numFmt: '#,##0' }},
			{width: 15, style: { numFmt: '#,##0' }},
			{width: 15, style: { numFmt: '#,##0' }},
			{width: 15, style: { numFmt: '#,##0' }},
			{width: 15, style: { numFmt: '#,##0' }},
			{width: 15},
			{width: 15},
			{width: 50},
			{width: 15},
			{width: 15},
			{width: 15},
			{width: 15},
			{width: 15},
			{width: 15},
			{width: 15},
			{width: 20},
			{width: 15},
			{width: 15},
			{width: 15},
			{width: 15},
			{width: 15},
			{width: 15},
			{width: 15},
			{width: 25},
			{width: 15},
			{width: 15},
			{width: 15},
			{width: 15},
			{width: 15},
			{width: 15},
			{width: 15},
			{width: 15},
			{width: 15},
			{width: 15},
			{width: 15},
			{width: 15},
			{width: 15},
			{width: 15},
			{width: 15},
			{width: 15},
			{width: 15},
			{width: 15},
			{width: 15}
		];
	
		
		var risk_rows = [];
		for(var r in appsmith.store.current_quote.risks) {
			var row = [appsmith.store.current_quote.risks[r].data.building_name,
								 appsmith.store.current_quote.risks[r].data.building_sum_insured,
								 appsmith.store.current_quote.risks[r].data.limit,
								 appsmith.store.current_quote.risks[r].data.contents_sum_insured,
								 appsmith.store.current_quote.risks[r].data.professional_fees,
								 appsmith.store.current_quote.risks[r].data.consequential_loss,
								 appsmith.store.current_quote.risks[r].data.tsi,
								 appsmith.store.current_quote.risks[r].data.hurdle,
								 appsmith.store.current_quote.risks[r].data.replacement_basis,
								 appsmith.store.current_quote.risks[r].data.address,
								 appsmith.store.current_quote.risks[r].data.state,
								 appsmith.store.current_quote.risks[r].data.anzsic_code,
								 appsmith.store.current_quote.risks[r].data.walls,
								 appsmith.store.current_quote.risks[r].data.roof,
								 appsmith.store.current_quote.risks[r].data.no_of_buildings,
								 appsmith.store.current_quote.risks[r].data.no_levels,
								 appsmith.store.current_quote.risks[r].data.year_built,
								 appsmith.store.current_quote.risks[r].data.gnaf_pid,
								 appsmith.store.current_quote.risks[r].data.latitude,
								 appsmith.store.current_quote.risks[r].data.longitude,
								 appsmith.store.current_quote.risks[r].data.fire_protection,
								 appsmith.store.current_quote.risks[r].data.security_protection,
								 appsmith.store.current_quote.risks[r].data.heritage_listed,
								 appsmith.store.current_quote.risks[r].data.asbestos,
								 appsmith.store.current_quote.risks[r].data.eps_percentage,
								 appsmith.store.current_quote.risks[r].perils.remoteness_area,
								 appsmith.store.current_quote.risks[r].data.risk_include_flood,
								 appsmith.store.current_quote.risks[r].perils.flood_depth_20,
								 appsmith.store.current_quote.risks[r].perils.flood_depth_50,
								 appsmith.store.current_quote.risks[r].perils.flood_depth_100,
								 appsmith.store.current_quote.risks[r].perils.flood_depth_200,
								 appsmith.store.current_quote.risks[r].perils.flood_depth_500,
								 appsmith.store.current_quote.risks[r].perils.flood_depth_1000,
								 appsmith.store.current_quote.risks[r].perils.flood_depth_extreme,
								 appsmith.store.current_quote.risks[r].perils.flood_ari_gl,
								 appsmith.store.current_quote.risks[r].perils.bal_category,
								 appsmith.store.current_quote.risks[r].perils.windgust_5yr_ari,
								 appsmith.store.current_quote.risks[r].perils.windgust_10yr_ari,
								 appsmith.store.current_quote.risks[r].perils.windgust_25yr_ari,
								 appsmith.store.current_quote.risks[r].perils.windgust_50yr_ari,
								 appsmith.store.current_quote.risks[r].perils.windgust_100yr_ari,
								 appsmith.store.current_quote.risks[r].perils.windgust_250yr_ari,
								 appsmith.store.current_quote.risks[r].perils.windgust_500yr_ari,
								 appsmith.store.current_quote.risks[r].perils.windgust_1000yr_ari,
								 appsmith.store.current_quote.risks[r].perils.sts_risk,
								 appsmith.store.current_quote.risks[r].data.building_type								 
								];
			risk_rows.push(row);
		}
		worksheet.addRows(risk_rows);
		
	},
	
	sheet_Attritional: (workbook) => {
		
		var font_TABLE_HEADING = { size: 11, bold : true, color: {argb: 'ffFFFFFF'} };
		var fill_TABLE_HEADING = { type: 'pattern', pattern: 'solid', fgColor: {argb:'ff391B45'} };
		
		var worksheet = workbook.addWorksheet('Attritional');
		var column_titles = [
			'Building Name',
			'Base',
			'Occupancy',
			'Sum Insured',
			'Hurdle',
			'Year Built',
			'Fire Protection',
			'Security Protection',
			'Heritage Listed',
			'Asbestos',
			'EPS',
			'Remote',
			'Cover Basis',
			'Total Attritional Premium'
		];
		
		worksheet.addRow(column_titles);
		var header_row = worksheet.getRow(1);
		header_row.eachCell({includeEmpty: false}, function(cell, number) {
			cell.font = font_TABLE_HEADING;
			cell.fill = fill_TABLE_HEADING;
		});
		
		worksheet.columns = [
			{width: 50},
			{width: 15, style: { numFmt: '#,##0.00' }},
			{width: 15, style: { numFmt: '#,##0.00' }},
			{width: 15, style: { numFmt: '#,##0.00' }},
			{width: 15, style: { numFmt: '#,##0.00' }},
			{width: 15, style: { numFmt: '#,##0.00' }},
			{width: 15, style: { numFmt: '#,##0.00' }},
			{width: 15, style: { numFmt: '#,##0.00' }},
			{width: 15, style: { numFmt: '#,##0.00' }},
			{width: 15, style: { numFmt: '#,##0.00' }},
			{width: 15, style: { numFmt: '#,##0.00' }},
			{width: 15, style: { numFmt: '#,##0.00' }},
			{width: 15, style: { numFmt: '#,##0.00' }},
			{width: 15, style: { numFmt: '#,##0.00' }}
		];
		
		var att_rows = [];
		for(var r in appsmith.store.current_quote.risks) {
			var row = [appsmith.store.current_quote.risks[r].data.building_name,
								 appsmith.store.current_quote.risks[r].rating.att_base,
								 appsmith.store.current_quote.risks[r].rating.att_occupancy,
								 appsmith.store.current_quote.risks[r].rating.att_sum_insured,
								 appsmith.store.current_quote.risks[r].rating.att_hurdle,
								 appsmith.store.current_quote.risks[r].rating.att_year_built,
								 appsmith.store.current_quote.risks[r].rating.att_fire_protection,
								 appsmith.store.current_quote.risks[r].rating.att_security_protection,
								 appsmith.store.current_quote.risks[r].rating.att_heritage_listed,
								 appsmith.store.current_quote.risks[r].rating.att_asbestos,
								 appsmith.store.current_quote.risks[r].rating.att_eps,
								 appsmith.store.current_quote.risks[r].rating.att_remote,
								 appsmith.store.current_quote.risks[r].rating.att_cover_basis,
								 appsmith.store.current_quote.risks[r].rating.att_total
								];
			att_rows.push(row);
		}
		worksheet.addRows(att_rows);
	},
	
	sheet_Large: (workbook) => {
		
		var font_TABLE_HEADING = { size: 11, bold : true, color: {argb: 'ffFFFFFF'} };
		var fill_TABLE_HEADING = { type: 'pattern', pattern: 'solid', fgColor: {argb:'ff391B45'} };
		
		var worksheet = workbook.addWorksheet('Large');
		var column_titles = [
			'Building Name',
			'Base',
			'Occupancy',
			'Sum Insured',
			'Hurdle',
			'Year Built',
			'Fire Protection',
			'Security Protection',
			'Heritage Listed',
			'Asbestos',
			'EPS',
			'Remote',
			'Cover Basis',
			'Total Large Premium'
		];
		
		worksheet.addRow(column_titles);
		var header_row = worksheet.getRow(1);
		header_row.eachCell({includeEmpty: false}, function(cell, number) {
			cell.font = font_TABLE_HEADING;
			cell.fill = fill_TABLE_HEADING;
		});
		
		worksheet.columns = [
			{width: 50, style: { size: 11, bold : true, color: {argb: 'ffFFFFFF'}}},
			{width: 15, style: { size: 11, bold : true, color: {argb: 'ffFFFFFF'}}},
			{width: 15, style: { size: 11, bold : true, color: {argb: 'ffFFFFFF'}}},
			{width: 15, style: { size: 11, bold : true, color: {argb: 'ffFFFFFF'}}},
			{width: 15, style: { size: 11, bold : true, color: {argb: 'ffFFFFFF'}}},
			{width: 15, style: { size: 11, bold : true, color: {argb: 'ffFFFFFF'}}},
			{width: 15, style: { size: 11, bold : true, color: {argb: 'ffFFFFFF'}}},
			{width: 15, style: { size: 11, bold : true, color: {argb: 'ffFFFFFF'}}},
			{width: 15, style: { size: 11, bold : true, color: {argb: 'ffFFFFFF'}}},
			{width: 15, style: { size: 11, bold : true, color: {argb: 'ffFFFFFF'}}},
			{width: 15, style: { size: 11, bold : true, color: {argb: 'ffFFFFFF'}}},
			{width: 15, style: { size: 11, bold : true, color: {argb: 'ffFFFFFF'}}},
			{width: 15, style: { size: 11, bold : true, color: {argb: 'ffFFFFFF'}}},
			{width: 15, style: { size: 11, bold : true, color: {argb: 'ffFFFFFF'}}}
		];
		
		var lrg_rows = [];
		for(var r in appsmith.store.current_quote.risks) {
			var row = [appsmith.store.current_quote.risks[r].data.building_name,
								 appsmith.store.current_quote.risks[r].rating.lrg_base,
								 appsmith.store.current_quote.risks[r].rating.lrg_occupancy,
								 appsmith.store.current_quote.risks[r].rating.lrg_sum_insured,
								 appsmith.store.current_quote.risks[r].rating.lrg_hurdle,
								 appsmith.store.current_quote.risks[r].rating.lrg_year_built,
								 appsmith.store.current_quote.risks[r].rating.lrg_fire_protection,
								 appsmith.store.current_quote.risks[r].rating.lrg_security_protection,
								 appsmith.store.current_quote.risks[r].rating.lrg_heritage_listed,
								 appsmith.store.current_quote.risks[r].rating.lrg_asbestos,
								 appsmith.store.current_quote.risks[r].rating.lrg_eps,
								 appsmith.store.current_quote.risks[r].rating.lrg_remote,
								 appsmith.store.current_quote.risks[r].rating.lrg_cover_basis,
								 appsmith.store.current_quote.risks[r].rating.lrg_total
								];
			lrg_rows.push(row);
		}
		worksheet.addRows(lrg_rows);
	},
	
	
	sheet_Weather: (workbook) => {
		
		var font_TABLE_HEADING = { size: 11, bold : true, color: {argb: 'ffFFFFFF'} };
		var fill_TABLE_HEADING = { type: 'pattern', pattern: 'solid', fgColor: {argb:'ff391B45'} };
		
		var worksheet = workbook.addWorksheet('Weather');
		var column_titles = [
			'Building Name',
			'Base',
			'Flood',
			'Bushfire',
			'Wind',
			'Occupancy',
			'Sum Insured',
			'Hurdle',
			'Year Built',
			'Fire Protection',
			'Security Protection',
			'Heritage Listed',
			'Asbestos',
			'EPS',
			'Remote',
			'Cover Basis',
			'Total Weather Premium'
		];
		
		worksheet.addRow(column_titles);
		var header_row = worksheet.getRow(1);
		header_row.eachCell({includeEmpty: false}, function(cell, number) {
			cell.font = font_TABLE_HEADING;
			cell.fill = fill_TABLE_HEADING;
		});
		
		worksheet.columns = [
			{width: 50},
			{width: 15, style: { numFmt: '#,##0.00' }},
			{width: 15, style: { numFmt: '#,##0.00' }},
			{width: 15, style: { numFmt: '#,##0.00' }},
			{width: 15, style: { numFmt: '#,##0.00' }},
			{width: 15, style: { numFmt: '#,##0.00' }},
			{width: 15, style: { numFmt: '#,##0.00' }},
			{width: 15, style: { numFmt: '#,##0.00' }},
			{width: 15, style: { numFmt: '#,##0.00' }},
			{width: 15, style: { numFmt: '#,##0.00' }},
			{width: 15, style: { numFmt: '#,##0.00' }},
			{width: 15, style: { numFmt: '#,##0.00' }},
			{width: 15, style: { numFmt: '#,##0.00' }},
			{width: 15, style: { numFmt: '#,##0.00' }},
			{width: 15, style: { numFmt: '#,##0.00' }},
			{width: 15, style: { numFmt: '#,##0.00' }},
			{width: 15, style: { numFmt: '#,##0.00' }}
		];
		
		var wea_rows = [];
		for(var r in appsmith.store.current_quote.risks) {
			var row = [appsmith.store.current_quote.risks[r].data.building_name,
								 appsmith.store.current_quote.risks[r].rating.wea_base,
								 appsmith.store.current_quote.risks[r].rating.wea_flood,
								 appsmith.store.current_quote.risks[r].rating.wea_bushfire,
								 appsmith.store.current_quote.risks[r].rating.wea_wind,
								 appsmith.store.current_quote.risks[r].rating.wea_occupancy,
								 appsmith.store.current_quote.risks[r].rating.wea_sum_insured,
								 appsmith.store.current_quote.risks[r].rating.wea_hurdle,
								 appsmith.store.current_quote.risks[r].rating.wea_year_built,
								 appsmith.store.current_quote.risks[r].rating.wea_fire_protection,
								 appsmith.store.current_quote.risks[r].rating.wea_security_protection,
								 appsmith.store.current_quote.risks[r].rating.wea_heritage_listed,
								 appsmith.store.current_quote.risks[r].rating.wea_asbestos,
								 appsmith.store.current_quote.risks[r].rating.wea_eps,
								 appsmith.store.current_quote.risks[r].rating.wea_remote,
								 appsmith.store.current_quote.risks[r].rating.wea_cover_basis,
								 appsmith.store.current_quote.risks[r].rating.wea_total
								];
			wea_rows.push(row);
		}
		worksheet.addRows(wea_rows);
		
	},
	
	sheet_CoverBasisCalcs: (workbook) => {
		
		var font_TABLE_HEADING = { size: 11, bold : true, color: {argb: 'ffFFFFFF'} };
		var fill_TABLE_HEADING = { type: 'pattern', pattern: 'solid', fgColor: {argb:'ff391B45'} };
		
		var worksheet = workbook.addWorksheet('Cover Basis Calc');
		var column_titles = [
			'Building Name',
			'Building Declared Value',
			'Building Limit',
			'Large Limit',
			'Basis',
			'Ratio',
			'Mean',
			'St Dev',
			'P(x) - Attritional',
			'P(x) - Large',
			'P(x) - Weather'			
		];
		
		worksheet.addRow(column_titles);
		var header_row = worksheet.getRow(1);
		header_row.eachCell({includeEmpty: false}, function(cell, number) {
			cell.font = font_TABLE_HEADING;
			cell.fill = fill_TABLE_HEADING;
		});
		
		worksheet.columns = [
			{width: 50},
			{width: 15, style: { numFmt: '#,##0.00' }},
			{width: 15, style: { numFmt: '#,##0.00' }},
			{width: 15, style: { numFmt: '#,##0.00' }},
			{width: 25, style: { numFmt: '#,##0.00' }},
			{width: 15, style: { numFmt: '#,##0.00' }},
			{width: 15, style: { numFmt: '#,##0.00' }},
			{width: 15, style: { numFmt: '#,##0.00' }},
			{width: 15, style: { numFmt: '#,##0.00' }},
			{width: 15, style: { numFmt: '#,##0.00' }},
			{width: 15, style: { numFmt: '#,##0.00' }}
		];
		
		var wea_rows = [];
		for(var r in appsmith.store.current_quote.risks) {
			var row = [appsmith.store.current_quote.risks[r].data.building_name,
								 appsmith.store.current_quote.risks[r].data.building_sum_insured,
								 appsmith.store.current_quote.risks[r].data.limit,
								 500000,
								 appsmith.store.current_quote.risks[r].data.replacement_basis,
								 appsmith.store.current_quote.risks[r].rating.cbc_ratio,
								 appsmith.store.current_quote.risks[r].rating.cbc_mean,
								 appsmith.store.current_quote.risks[r].rating.cbc_st_dev,
								 appsmith.store.current_quote.risks[r].rating.cbc_px_att,
								 appsmith.store.current_quote.risks[r].rating.cbc_px_lrg,
								 appsmith.store.current_quote.risks[r].rating.cbc_px_wea
								];
			wea_rows.push(row);
		}
		worksheet.addRows(wea_rows);
	},
	
	sheet_Reinsurer: (workbook) => {
		
		var font_TABLE_HEADING = { size: 11, bold : true, color: {argb: 'ffFFFFFF'} };
		var fill_TABLE_HEADING = { type: 'pattern', pattern: 'solid', fgColor: {argb:'ff391B45'} };
		
		var worksheet = workbook.addWorksheet('Reinsurer');
		var column_titles = [
			'Opportunity Name',
			'Building Name',
			'Group',
			'Building Sum Insured',
			'Building Limit',
			'Contents Sum Insured',
			'Consequential Loss',
			'Sum Insured',
			'Hurdle',
			'Replacement Basis',
			'Address',
			'State',
			'ANZSIC Code',
			'GNAF PID',
			'Geo Location (Latitude)',
			'Geo Location (Longitude)',
			'Flood Depth 20',
			'Flood Depth 50',
			'Flood Depth 100',
			'Flood Depth 200',
			'Flood Depth 500',
			'Flood Depth 1000',
			'Flood Depth Extreme',
			'Flood ARI GL',
			'BAL Category',
			'Windgust 5yr ARI',
			'Windgust 10yr ARI',
			'Windgust 25yr ARI',
			'Windgust 50yr ARI',
			'Windgust 100yr ARI',
			'Windgust 250yr ARI',
			'Windgust 500yr ARI',
			'Windgust 1000yr ARI',
			'STS Risk',
			'Building Type',
			'Wall Type',
			'Roof Type',
			'No of Buildings',
			'No of Levels',
			'Year Built',
			'Heritage Listed',
			'Asbestos',
			'EPS Percentage',
			'Overland pct',
			'Riverine pct'
		];
		
		worksheet.addRow(column_titles);
		var header_row = worksheet.getRow(1);
		header_row.eachCell({includeEmpty: false}, function(cell, number) {
			cell.font = font_TABLE_HEADING;
			cell.fill = fill_TABLE_HEADING;
		});
		
		worksheet.columns = [
			{width: 40}, // Opportunity name
			{width: 50}, // building name
			{width: 40}, // group
			{width: 15, style: { numFmt: '#,##0.00' }}, // building sum 
			{width: 15, style: { numFmt: '#,##0.00' }}, // limit
			{width: 15, style: { numFmt: '#,##0.00' }}, // contents sum 
			{width: 15, style: { numFmt: '#,##0.00' }}, // sum insured
			{width: 15, style: { numFmt: '#,##0.00' }}, // hurdle
			{width: 15, style: { numFmt: '#,##0.00' }}, // replacement
			{width: 25}, // address
			{width: 50}, // state
			{width: 8}, // anzsic code
			{width: 8}, // gnaf pid
			{width: 15, style: { numFmt: '#,##0.00' }}, // latitude
			{width: 15, style: { numFmt: '#,##0.00' }}, // longitude
			{width: 15, style: { numFmt: '#,##0.00' }}, // flood depth 20
			{width: 15, style: { numFmt: '#,##0.00' }}, // flood depth 50
			{width: 15, style: { numFmt: '#,##0.00' }}, // flood depth 100
			{width: 15, style: { numFmt: '#,##0.00' }}, // flood depth 250
			{width: 15, style: { numFmt: '#,##0.00' }}, // flood depth 500
			{width: 15, style: { numFmt: '#,##0.00' }}, // flood depth 1000
			{width: 15, style: { numFmt: '#,##0.00' }}, // flood depth extreme
			{width: 15}, // flood ari gl
			{width: 15}, // bal category
			{width: 15, style: { numFmt: '#,##0.00' }}, // windgust 5yr
			{width: 15, style: { numFmt: '#,##0.00' }}, // windgust 10yr
			{width: 15, style: { numFmt: '#,##0.00' }}, // windgust 25yr
			{width: 15, style: { numFmt: '#,##0.00' }}, // windgust 50yr
			{width: 15, style: { numFmt: '#,##0.00' }}, // windgust 100yr
			{width: 15, style: { numFmt: '#,##0.00' }}, // windgust 250yr
			{width: 15, style: { numFmt: '#,##0.00' }}, // windgust 500yr
			{width: 15, style: { numFmt: '#,##0.00' }}, // windgust 1000yr
			{width: 8}, // sts risk
			{width: 25}, // building type
			{width: 10}, // wall
			{width: 10}, // roof
			{width: 10}, // no of buildings
			{width: 10}, // no of levels
			{width: 10}, // year built
			{width: 10}, // heritage
			{width: 10}, // asbestos
			{width: 10}, // eps
			{width: 10}, // overland
			{width: 10} // riverine
		];
		
		var ins_rows = [];
		for(var r in appsmith.store.current_quote.risks) {
			var row = [appsmith.store.current_quote.detail.name,
								 appsmith.store.current_quote.risks[r].data.building_name,
								 appsmith.store.current_quote.risks[r].data.group,
								 appsmith.store.current_quote.risks[r].data.building_sum_insured,
								 appsmith.store.current_quote.risks[r].data.limit,
								 appsmith.store.current_quote.risks[r].data.contents_sum_insured,
								 appsmith.store.current_quote.risks[r].data.consequential_loss,
								 appsmith.store.current_quote.risks[r].rating.total_sum_insured,
								 appsmith.store.current_quote.risks[r].data.hurdle,
								 appsmith.store.current_quote.risks[r].data.replacement_basis,
								 appsmith.store.current_quote.risks[r].data.address,
								 appsmith.store.current_quote.risks[r].data.state,
								 appsmith.store.current_quote.risks[r].data.anzsic_code,
								 appsmith.store.current_quote.risks[r].data.gnaf_pid,
								 appsmith.store.current_quote.risks[r].data.latitude,
								 appsmith.store.current_quote.risks[r].data.longitude,
								 appsmith.store.current_quote.risks[r].perils.flood_depth_20,
								 appsmith.store.current_quote.risks[r].perils.flood_depth_50,
								 appsmith.store.current_quote.risks[r].perils.flood_depth_100,
								 appsmith.store.current_quote.risks[r].perils.flood_depth_200,
								 appsmith.store.current_quote.risks[r].perils.flood_depth_500,
								 appsmith.store.current_quote.risks[r].perils.flood_depth_1000,
								 appsmith.store.current_quote.risks[r].perils.flood_depth_extreme,
								 appsmith.store.current_quote.risks[r].perils.flood_ari_gl,
								 appsmith.store.current_quote.risks[r].perils.bal_category,
								 appsmith.store.current_quote.risks[r].perils.windgust_5yr_ari,
								 appsmith.store.current_quote.risks[r].perils.windgust_10yr_ari,
								 appsmith.store.current_quote.risks[r].perils.windgust_25yr_ari,
								 appsmith.store.current_quote.risks[r].perils.windgust_50yr_ari,
								 appsmith.store.current_quote.risks[r].perils.windgust_100yr_ari,
								 appsmith.store.current_quote.risks[r].perils.windgust_250yr_ari,
								 appsmith.store.current_quote.risks[r].perils.windgust_500yr_ari,
								 appsmith.store.current_quote.risks[r].perils.windgust_1000yr_ari,
								 appsmith.store.current_quote.risks[r].perils.sts_risk,
								 appsmith.store.current_quote.risks[r].data.building_type,
								 appsmith.store.current_quote.risks[r].data.walls,
								 appsmith.store.current_quote.risks[r].data.roof,
								 appsmith.store.current_quote.risks[r].data.no_of_buildings,
								 appsmith.store.current_quote.risks[r].data.no_levels,
								 appsmith.store.current_quote.risks[r].data.year_built,
								 appsmith.store.current_quote.risks[r].data.heritage_listed,
								 appsmith.store.current_quote.risks[r].data.asbestos,
								 appsmith.store.current_quote.risks[r].data.eps_percentage,
								 appsmith.store.current_quote.risks[r].perils.overland_percentage,
								 appsmith.store.current_quote.risks[r].perils.riverine_percentage
								];
			ins_rows.push(row);
		}
		worksheet.addRows(ins_rows);
	},
	
	sheet_3D_Maps: (workbook) => {
		
		var font_TABLE_HEADING = { size: 11, bold : true, color: {argb: 'ffFFFFFF'} };
		var fill_TABLE_HEADING = { type: 'pattern', pattern: 'solid', fgColor: {argb:'ff391B45'} };
		
		var worksheet = workbook.addWorksheet('3D Maps');
		var column_titles = [
			'Building Name',
			'Sum Insured',
			'Geo Location (Latitude)',
			'Geo Location (Longitude)',
			'Flood Depth 100',
			'BAL Category',
			'STS Risk'
		];
		worksheet.addRow(column_titles);
		
		var header_row = worksheet.getRow(1);
		header_row.eachCell({includeEmpty: false}, function(cell, number) {
			cell.font = font_TABLE_HEADING;
			cell.fill = fill_TABLE_HEADING;
		});
		
		worksheet.columns = [
			{width: 50}, // building name
			{width: 15}, // sum indured
			{width: 15}, // lat
			{width: 15}, // long
			{width: 15}, // flood depth 100
			{width: 15}, // bal category
			{width: 15} // sts_risk
		];
		
		var map_rows = [];
		for(var r in appsmith.store.current_quote.risks) {
			var row = [appsmith.store.current_quote.risks[r].data.building_name,
								 appsmith.store.current_quote.risks[r].rating.total_sum_insured,
								 appsmith.store.current_quote.risks[r].data.latitude,
								 appsmith.store.current_quote.risks[r].data.longitude,
								 appsmith.store.current_quote.risks[r].perils.flood_depth_100,
								 appsmith.store.current_quote.risks[r].perils.bal_category,
								 appsmith.store.current_quote.risks[r].perils.sts_risk
								 ];
			map_rows.push(row);
		}
		worksheet.addRows(map_rows);
	},
	
}