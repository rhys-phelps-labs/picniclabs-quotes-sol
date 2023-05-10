export default {
	
	quoteSelected: () => {
		
		// get the data, and then store the data, turn on the visibility of each chart
		this.chartratepertsi();
		this.chartbushfire();
		this.chartstormrisk();
		
		
	},
	
		
	chartratepertsi: async () => {
		
		var chart = {
			"type": "scatter",
			"dataSource": {
				"chart": {
					"caption": "Rate per 100 sum insured Analysis",
					"xAxisName": "Sum Insured",
					"yAxisName": "Rate",
					"theme": "fusion",
					"alignCaptionWithCanvas": 1,
					"captionFontSize": "24",
					"captionAlignment": "center",
					"captionPadding": "20",
					"captionFontColor": "#231F20",
					"legendIconSides": "4",
					"legendIconBgAlpha": "100",
					"legendIconAlpha": "100",
					"legendPosition": "top",
					"canvasPadding": "0",
					"chartLeftMargin": "20",
					"chartTopMargin": "10",
					"chartRightMargin": "40",
					"chartBottomMargin": "10",
					"xAxisNameFontSize": "14",
					"labelFontSize": "12",
					"labelFontColor": "#716e6e",
					"xAxisNameFontColor": "#716e6e",
					"yAxisNameFontSize": "14",
					"yAxisValueFontSize": "12",
					"yAxisValueFontColor": "#716e6e",
					"yAxisNameFontColor": "#716e6e",
					"xAxisMinValue": "0.00",
					"xAxisMaxValue": "1.00",
					"palettecolors": "042A2B,5EB1BF,CDEDF6,EF7B45,D84727"
				}
			}
		};
		
		await Rate_Per_TSI.run({quote_id: appsmith.store.quote_id});
		
		var dataset = [];
		Rate_Per_TSI.data.forEach( r => {
			var data = r.data;
			dataset.push( { seriesname: r.seriesname, data });
		});
		chart.dataSource.dataset = dataset;
		
		chart.dataSource.dataset = dataset;
		await storeValue('chart_ratepertsi', chart, false);
		ChartRatePerTSI.isVisible = true;
	},
	
	chartbushfire: async () => {
		
		var chart = {
			"type": "column2d",
			"dataSource": {
				"chart": {
					"caption": "Bushfire Risk Analysis",
					"xAxisName": "BAL Category",
					"yAxisName": "Property Count",
					"theme": "fusion",
					"alignCaptionWithCanvas": 1,
					"captionFontSize": "24",
					"captionAlignment": "center",
					"captionPadding": "20",
					"captionFontColor": "#231F20",
					"legendIconSides": "4",
					"legendIconBgAlpha": "100",
					"legendIconAlpha": "100",
					"legendPosition": "top",
					"canvasPadding": "0",
					"chartLeftMargin": "20",
					"chartTopMargin": "10",
					"chartRightMargin": "40",
					"chartBottomMargin": "10",
					"xAxisNameFontSize": "14",
					"labelFontSize": "12",
					"labelFontColor": "#716e6e",
					"xAxisNameFontColor": "#716e6e",
					"yAxisNameFontSize": "14",
					"yAxisValueFontSize": "12",
					"yAxisValueFontColor": "#716e6e",
					"yAxisNameFontColor": "#716e6e",
					"palettecolors": "042A2B,5EB1BF,CDEDF6,EF7B45,D84727"
				}
			}
		};
		
		await BAL_Category_Count.run({quote_id: appsmith.store.quote_id});
		
		var data = [];
		BAL_Category_Count.data.forEach( r => {
			data.push( { label: ' '+ r.bal_category, value: r.count });
		});
		chart.dataSource.data = data;
		await storeValue('chart_bushfire', chart, false);
		ChartBushFire.isVisible = true;
	},
	
	
	chartstormrisk: async () => {
		
		var chart = {
			"type": "scatter",
			"dataSource": {
				"chart": {
					"caption": "Storm Risk Analysis",
					"xAxisName": "Sum Insured",
					"yAxisName": "STS Risk",
					"theme": "fusion",
					"alignCaptionWithCanvas": 1,
					"captionFontSize": "24",
					"captionAlignment": "center",
					"captionPadding": "20",
					"captionFontColor": "#231F20",
					"legendIconSides": "4",
					"legendIconBgAlpha": "100",
					"legendIconAlpha": "100",
					"legendPosition": "top",
					"canvasPadding": "0",
					"chartLeftMargin": "20",
					"chartTopMargin": "10",
					"chartRightMargin": "40",
					"chartBottomMargin": "10",
					"xAxisNameFontSize": "14",
					"labelFontSize": "12",
					"labelFontColor": "#716e6e",
					"xAxisNameFontColor": "#716e6e",
					"yAxisNameFontSize": "14",
					"yAxisValueFontSize": "12",
					"yAxisValueFontColor": "#716e6e",
					"yAxisNameFontColor": "#716e6e",
					"xAxisMinValue": "0.00",
					"xAxisMaxValue": "1.00",
					"palettecolors": "042A2B,5EB1BF,CDEDF6,EF7B45,D84727"
				}
			}
		};
		
		await STS_Risk_Spread.run({quote_id: appsmith.store.quote_id});
		
		var data = [];
		STS_Risk_Spread.data.forEach( r => {
			data.push( { x: ' '+ r.tsi, y: r.sts, tooltext: r.tooltext +"{br}" + r.sts });
		});
		var dataset = [];
		var series = { seriesname: "Storm Risk", data};
		dataset[0] = series;
		chart.dataSource.dataset = dataset;
		await storeValue('chart_stormrisk', chart, false);
		ChartStormRisk.isVisible = true;
	},
	
	
	chartfloodrisk: async () => {
		
		var chart = {
			"type": "stackedcolumn2d",
			"dataSource": {
				"chart": {
					"caption": "Flood Risk Analysis",
					"xAxisName": "Sum Insured",
					"yAxisName": "Flood Risk",
					"theme": "fusion",
					"alignCaptionWithCanvas": 1,
					"captionFontSize": "24",
					"captionAlignment": "center",
					"captionPadding": "20",
					"captionFontColor": "#231F20",
					"legendIconSides": "4",
					"legendIconBgAlpha": "100",
					"legendIconAlpha": "100",
					"legendPosition": "top",
					"canvasPadding": "0",
					"chartLeftMargin": "20",
					"chartTopMargin": "10",
					"chartRightMargin": "40",
					"chartBottomMargin": "10",
					"xAxisNameFontSize": "14",
					"labelFontSize": "12",
					"labelFontColor": "#716e6e",
					"xAxisNameFontColor": "#716e6e",
					"yAxisNameFontSize": "14",
					"yAxisValueFontSize": "12",
					"yAxisValueFontColor": "#716e6e",
					"yAxisNameFontColor": "#716e6e",
					"xAxisMinValue": "0.00",
					"xAxisMaxValue": "1.00",
					"palettecolors": "042A2B,5EB1BF,CDEDF6,EF7B45,D84727"
				}
			},
		 "categories": [
        {
            "category": [
                {
                    "label": "Flood Depth 20"
                },
								{
                    "label": "Flood Depth 50"
                },
								{
                    "label": "Flood Depth 100"
                },
								{
                    "label": "Flood Depth 200"
                },
								{
                    "label": "Flood Depth 500"
                },
								{
                    "label": "Flood Depth 1000"
                },
								{
                    "label": "Flood Depth Extreme"
                }
            ]
        }
    ],
		};
		
		await STS_Risk_Spread.run({quote_id: appsmith.store.quote_id});
		
		var data = [];
		STS_Risk_Spread.data.forEach( r => {
			data.push( { x: ' '+ r.tsi, y: r.sts, tooltext: r.tooltext +"{br}" + r.sts });
		});
		var dataset = [];
		var series = { seriesname: "Storm Risk", data};
		dataset[0] = series;
		chart.dataSource.dataset = dataset;
		await storeValue('chart_stormrisk', chart, false);
		ChartStormRisk.isVisible = true;
	},

	
	
}