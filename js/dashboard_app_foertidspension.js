function load() {
    rf.StandaloneDashboard(function (db) {

        addMyKpi({
            kpiObjectName: "Kpi1",
            key: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
            kpiIdPrefix: "kpi1",
            db: db,
            subject: "Foertidspension"
        });

        addMyUniChart({
            db: db,
            myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
            mySheet: "Foertidspension UDV",
            myQuery: "select B,C WHERE A='Tael' OR A<=12 ORDER BY A desc",
            myChartWidth: 4,
            myChartHeight: 4,
            isStacked: true,
            myShowLegend: true,
            myChartType: "area",
            myChartName: "chart1_1",
            myCaption: "Antal fuldtidspersoner"
        });
        addMyUniChart({
            db: db,
            myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
            mySheet: "Foertidspension UDV",
            myQuery: "select I,J WHERE A='Tael' OR A<=12 ORDER BY A desc",
            myChartWidth: 4,
            myChartHeight: 4,
            isStacked: true,
            myShowLegend: true,
            myChartType: "column",
            myChartName: "chart1_2",
            myCaption: "Antal nytilkendelser"
        });

        addMyUniChart({
            db: db,
            myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
            mySheet: "Foertidspension UDV",
            myQuery: "select F,G,H WHERE A='Tael' OR A<=12 ORDER BY A desc",
            myChartWidth: 4,
            myChartHeight: 4,
            isStacked: false,
            myShowLegend: true,
            myChartType: "line",
            myChartName: "chart1_3",
            myCaption: "Andel af befolkningen",
            myNumberDecimalPoints: 3
        });
    });
}
if (!google.charts || !google.visualization) {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(load);
} else {
    load
}