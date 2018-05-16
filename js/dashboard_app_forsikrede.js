rf.StandaloneDashboard(function(db){

	addMyKpi({
		kpiObjectName: "Kpi1",
		key: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
		kpiIdPrefix: "kpi1",
		db: db,
		subject: "Forsikrede Amydelse"
	});

	addMyUniChart({
		db: db,
	    myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
	    mySheet: "Forsikrede Amydelse UDV",
	    myQuery: "select B,C,E WHERE A='Tael' OR A<=12 ORDER BY A desc",
	    myChartWidth: 4,
	    myChartHeight: 4,
	    isStacked: true,
	    myShowLegend: true,
	    myChartType: "area",
	    myChartName: "chart1_4",
	    myCaption: "Antal fuldtidspersoner"
	});

	addMyUniChart({
		db: db,
	    myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
	    mySheet: "Forsikrede Amydelse UDV",
	    myQuery: "select F,G,H,I,J,K,L,M WHERE A='Tael' OR A<=12 ORDER BY A desc",
	    myChartWidth: 4,
	    myChartHeight: 4,
	    isStacked: true,
	    myShowLegend: true,
	    myChartType: "column",
	    myChartName: "chart1_5",
	    myCaption: "Antal afsluttede forløb - forsikrede"
	});

	addMyUniChart({
		db: db,
	    myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
	    mySheet: "Forsikrede Amydelse UDV",
	    myQuery: "select O,P,Q,R WHERE A='Tael' OR A<=12 ORDER BY A desc",
	    myChartWidth: 4,
	    myChartHeight: 4,
	    isStacked: false,
	    myShowLegend: true,
	    myChartType: "line",
	    myChartName: "chart1_6",
	    myCaption: "Andel af arbejdsstyrken",
	    myNumberDecimalPoints: 1
	});

});


