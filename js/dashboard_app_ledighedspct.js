rf.StandaloneDashboard(function(db){

    addMyKpi({
        kpiObjectName: "Kpi1",
        key: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
        kpiIdPrefix: "kpi1",
        db: db,
        subject: "Ledighedspct"
    });

	addMyUniChart({
        db: db,
	    myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
	    mySheet: "Bruttoledighed UDV",
	    myQuery: "select I,C,E WHERE A='Tael' OR A<=23 ORDER BY A desc",
	    myChartWidth: 12,
	    myChartHeight: 4,
	    isStacked: false,
	    myShowLegend: true,
	    myChartType: "line",
	    myChartName: "chart1_1",
	    myCaption: "Andel af arbejdsstyrken",
	    myNumberDecimalPoints: 1
    });
    
});


