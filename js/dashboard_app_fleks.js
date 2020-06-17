function load() {
	rf.StandaloneDashboard(function (db) {

		addMyKpi({
			kpiObjectName: "Kpi1",
			key: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
			kpiIdPrefix: "kpi1",
			db: db,
			subject: "Fleks og LY"
		});

		addMyUniChart({
			db: db,
			myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
			mySheet: "Fleksjob ledighedsydelse UDV",
			myQuery: "select B,C,D WHERE A='Tael' OR A<=12 ORDER BY A desc",
			myChartWidth: 6,
			myChartHeight: 3,
			isStacked: false,
			myShowLegend: true,
			myChartType: "line",
			myChartName: "chart1_1",
			myCaption: "Antal fuldtidspersoner"
		});

		addMyUniChart({
			db: db,
			myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
			mySheet: "Fleksjob ledighedsydelse UDV",
			myQuery: "select E,F,G,H,I,J,K,L WHERE A='Tael' OR A<=12 ORDER BY A desc",
			myChartWidth: 6,
			myChartHeight: 3,
			isStacked: true,
			myShowLegend: true,
			myChartType: "column",
			myChartName: "chart1_2",
			myCaption: "Antal afsluttede forløb - ledighedsydelse"
		});

		addMyUniChart({
			db: db,
			myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
			mySheet: "Fleksjob ledighedsydelse UDV",
			myQuery: "select N,O,P WHERE A='Tael' OR A<=12 ORDER BY A desc",
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
			mySheet: "Fleksjob ledighedsydelse UDV",
			myQuery: "select Q,R,S WHERE A='Tael' OR A<=12 ORDER BY A desc",
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
}
if (!google.charts || !google.visualization) {
	google.charts.load('current', { packages: ['corechart'] });
	google.charts.setOnLoadCallback(load);
} else {
	load
}


