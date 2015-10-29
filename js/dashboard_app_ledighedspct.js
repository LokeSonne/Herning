rf.StandaloneDashboard(function(db){
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
            query.setQuery("select C,D,E WHERE B='Ledighedspct'");
            query.send(function processResponse(response) {

                var myData = response.getDataTable();

                myKpiObjectName.addKPI("KpiYd1", {
                    caption: String(myData.getValue(0, 0)),
                    value: Number(myData.getValue(0, 2)),
                    numberDecimalPoints: 1,
                    numberSuffix: " pct."
                    //numberPrefix: dateInput1.toLowerCase()
                });
                myKpiObjectName.addKPI("KpiYd2", {
                    caption: String(myData.getValue(1, 0)),
                    value: Number(myData.getValue(1, 2)),
                    numberDecimalPoints: 1,
                    numberSuffix: " pct."
                });

                // Don't forget to call unlock or the data won't be displayed
                myKpiObjectName.unlock();
                myKpiObjectName.setCaption("Nøgletal");// + numberLabels.toLowerCase());

                addTooltip({
                    kpiId: "KpiYd1",
                    dateInput: String(myData.getValue(0, 1)),
                    prefix: "Andel af arbejdsstyrken "
                });

                addTooltip({
                    kpiId: "KpiYd2",
                    dateInput: String(myData.getValue(1, 1)),
                    prefix: "Andel af arbejdsstyrken "
                });

            });

        };

        initialize();
    }
// ---------------------------------------------------------------------
	
	// Sætter parametre for dataudtræk og kører funktioner

	addMyKpi("Kpi1", "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw");

	addMyUniChart({
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


