function load() {
	rf.StandaloneDashboard(function (db) {

		addMyKpi({
			kpiObjectName: "Kpi1",
			key: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
			kpiIdPrefix: "kpi1",
			db: db,
			subject: "Kth og udd"
		});

		addMyUniChart({
			db: db,
			myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
			mySheet: "Kontanthjaelp og uddannelseshjaelp UDV",
			myQuery: "select B,C,E,G,I,K,M,AJ WHERE A='Tael' OR A<=12 ORDER BY A desc",
			myChartWidth: 6,
			myChartHeight: 4,
			isStacked: true,
			myShowLegend: true,
			myChartType: "area",
			myChartName: "chart1_1",
			myCaption: "Antal personer"
		});

		addMyUniChart({
			db: db,
			myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
			mySheet: "Kontanthjaelp og uddannelseshjaelp UDV",
			//myQuery: "select H,I,J,K,L,M,N,O WHERE A='Tael' OR A<=12 ORDER BY A desc",
			myQuery: "select N,O,P,Q,R,S,T,U WHERE A='Tael' OR A<=12 ORDER BY A desc",
			myChartWidth: 6,
			myChartHeight: 4,
			isStacked: true,
			myShowLegend: true,
			myChartType: "column",
			myChartName: "chart1_2",
			myCaption: "Antal afsluttede forløb fordelt på varighed"
		});

		addMyUniChart({
			db: db,
			myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
			mySheet: "Kontanthjaelp og uddannelseshjaelp UDV",
			//kth: Herning og hele landet
			myQuery: "select W, X, Y WHERE A='Tael' OR A<=12 ORDER BY A desc",
			myChartWidth: 4,
			myChartHeight: 4,
			isStacked: false,
			myShowLegend: true,
			myChartType: "line",
			myChartName: "chart1_5",
			myCaption: "Andel af arbejdsstyrken",
			myNumberDecimalPoints: 1
		});

		addMyUniChart({
			db: db,
			myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
			mySheet: "Kontanthjaelp og uddannelseshjaelp UDV",
			//udv: Herning og hele landet
			myQuery: "select Z, AA, AB WHERE A='Tael' OR A<=12 ORDER BY A desc",
			myChartWidth: 4,
			myChartHeight: 4,
			isStacked: false,
			myShowLegend: true,
			myChartType: "line",
			myChartName: "chart1_6",
			myCaption: "Andel af arbejdsstyrken",
			myNumberDecimalPoints: 1
		});

		addMyUniChart({
			db: db,
			myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
			mySheet: "Kontanthjaelp og uddannelseshjaelp UDV",
			//kth og udd samlet: Herning og hele landet
			myQuery: "select AF, AK, AH WHERE A='Tael' OR A<=12 ORDER BY A desc",
			myChartWidth: 4,
			myChartHeight: 4,
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