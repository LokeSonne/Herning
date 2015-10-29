rf.StandaloneDashboard(function (db) {
    //db.setDashboardTitle('Herning: Forsikrede ledige og arbejdsmarkedsydelse');
    // ----------------- Dette er til én KPIgruppe -------------------------

    function addMyKpi(myKpiObjectName, myKey) {
        var myKpiObjectName = new KPIGroupComponent();
        var myKpiObjectName = new KPIGroupComponent();
        var myKey = String(myKey);
        myKpiObjectName.setDimensions(12, 2);
        myKpiObjectName.lock();
        db.addComponent(myKpiObjectName);

        function initialize() {
            // The URL of the spreadsheet to source data from.
            var query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/" + myKey + "/gviz/tq?sheet=KPI");
            query.setQuery("select C,D,E WHERE B='Foertidspension'");
            query.send(function processResponse(response) {

                var myData = response.getDataTable();

                myKpiObjectName.addKPI("KpiYd1", {
                    caption: String(myData.getValue(0, 0)),
                    value: Number(myData.getValue(0, 2)),
                    //numberPrefix: dateInput1.toLowerCase()
                });
                myKpiObjectName.addKPI("KpiYd2", {
                    caption: String(myData.getValue(1, 0)),
                    value: Number(myData.getValue(1, 2)),
                    // numberSuffix: " pct."
                });
                myKpiObjectName.addKPI("KpiYd3", {
                    caption: String(myData.getValue(2, 0)),
                    value: Number(myData.getValue(2, 2)),
                });
                myKpiObjectName.addKPI("KpiYd4", {
                    caption: String(myData.getValue(3, 0)),
                    value: Number(myData.getValue(3, 2)),
                    numberDecimalPoints: 2,
                    numberSuffix: " pct."
                });
                myKpiObjectName.addKPI("KpiYd5", {
                    caption: String(myData.getValue(4, 0)),
                    value: Number(myData.getValue(4, 2)),
                    numberDecimalPoints: 2,
                    numberSuffix: " pct."
                });

                // Don't forget to call unlock or the data won't be displayed
                myKpiObjectName.unlock();
                myKpiObjectName.setCaption("Nøgletal");// + numberLabels.toLowerCase());

                addTooltip({
                    kpiId: "KpiYd1",
                    dateInput: String(myData.getValue(0, 1)),
                    prefix: "Fuldtidspersoner "
                });

                addTooltip({
                    kpiId: "KpiYd2",
                    dateInput: String(myData.getValue(1, 1)),
                    prefix: "Antal personer "
                });

                addTooltip({
                    kpiId: "KpiYd3",
                    dateInput: String(myData.getValue(2, 1)),
                    prefix: "Antal personer "
                });

                addTooltip({
                    kpiId: "KpiYd4",
                    dateInput: String(myData.getValue(3, 1)),
                    prefix: "Andel af befolkningen "
                });

                addTooltip({
                    kpiId: "KpiYd5",
                    dateInput: String(myData.getValue(4, 1)),
                    prefix: "Andel af befolkningen "
                });

            });

        };

        initialize();
    }

    // Sætter parametre for dataudtræk og kører funktioner
    addMyKpi("Kpi1", "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw");

    addMyUniChart({
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
        myNumberDecimalPoints: 2
    });
});