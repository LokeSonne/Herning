rf.StandaloneDashboard(function (db) {

    addMyKpi({
        kpiObjectName: "Kpi1",
        key: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
        kpiIdPrefix: "kpi1",
        db: db,
        subject: "Ress og reval"
    });

    addMyUniChart({
        db: db,
        myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
        mySheet: "Ressourceforløb og revalidering UDV",
        myQuery: "select B,C,E WHERE A='Tael' OR A<=12 ORDER BY A desc",
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
        mySheet: "UDV AFGANG",
        myQuery: "select B,S WHERE A='Tael' OR A<=12 ORDER BY A desc",
        myChartWidth: 6,
        myChartHeight: 3,
        isStacked: true,
        myShowLegend: true,
        myChartType: "column",
        myChartName: "chart1_2",
        myCaption: "Antal afsluttede ressourceforløb"
    });

    addMyUniChart({
        db: db,
        myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
        mySheet: "Ressourceforløb og revalidering UDV",
        myQuery: "select O,P,Q WHERE A='Tael' OR A<=12 ORDER BY A desc",
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
        mySheet: "Ressourceforløb og revalidering UDV",
        myQuery: "select R,S,T WHERE A='Tael' OR A<=12 ORDER BY A desc",
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