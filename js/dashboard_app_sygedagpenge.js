rf.StandaloneDashboard(function(db){
    //db.setDashboardTitle('Herning: Forsikrede ledige og arbejdsmarkedsydelse');

	addMyKpi({
		kpiObjectName: "Kpi1",
		key: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
		kpiIdPrefix: "kpi1",
		db: db,
		subject: "Sdp og jobafkl"
	});

	addMyUniChart({
		db: db,
	    myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
	    mySheet: "Sygedagpenge og jobafklaring UDV",
	    myQuery: "select B, C, D, E, F, G, H, I, J, K,L,M WHERE A='Tael' OR A<=12 ORDER BY A desc",
	    myChartWidth: 6,
	    myChartHeight: 4,
	    isStacked: true,
	    myShowLegend: true,
	    myChartType: "area",
	    myChartName: "chart1_1",
	    myCaption: "Antal sygedagpengeforløb fordelt på varighed"
	});

	addMyUniChart({
		db: db,
	    myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
	    mySheet: "Sygedagpenge og jobafklaring UDV",
	    myQuery: "select N,O WHERE A='Tael' OR A<=12 ORDER BY A desc",
	    myChartWidth: 6,
	    myChartHeight: 4,
	    isStacked: false,
	    myShowLegend: true,
	    myChartType: "area",
	    myChartName: "chart1_2",
	    myCaption: "Antal jobafklaringsforløb"
	});

	addMyUniChart({
		db: db,
	    myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
	    mySheet: "Sygedagpenge og jobafklaring UDV",
	    myQuery: "select P,Q,R WHERE A='Tael' OR A<=12 ORDER BY A desc",
	    myChartWidth: 6,
	    myChartHeight: 3,
	    isStacked: false,
	    myShowLegend: true,
	    myChartType: "line",
	    myChartName: "chart1_3",
	    myCaption: "Andel af arbejdsstyrken",
	    myNumberDecimalPoints: 1
	});

	addMyUniChart({
		db: db,
	    myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
	    mySheet: "Sygedagpenge og jobafklaring UDV",
	    myQuery: "select S,T,U WHERE A='Tael' OR A<=12 ORDER BY A desc",
	    myChartWidth: 6,
	    myChartHeight: 3,
	    isStacked: false,
	    myShowLegend: true,
	    myChartType: "line",
	    myChartName: "chart1_4",
	    myCaption: "Andel af arbejdsstyrken",
	    myNumberDecimalPoints: 1
	});

});


