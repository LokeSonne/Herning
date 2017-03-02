google.load('visualization',
                    '1',
                    //{ callback: function() {self.initialize(); },
                        //Behøver ikke at loade nedenstående packages, da google.charts ikke benyttes
                       {
                           packages: ['table', 'map', 'corechart']
                       });

//google.charts.load('41', { packages: ['corechart'] });

    rf.StandaloneDashboard(function (tdb) {
        var _ = rf._;
        tdb.setDashboardTitle('Herning: Beskæftigelsesområdet');

        // ----------------- Dette er til én KPIgruppe -------------------------

        // -----------------------------------------------------------------------------------------------------------
        // -----------------------Dashboard 1-------------------------------------------------------------------------
        // -----------------------------------------------------------------------------------------------------------
        var db = new Dashboard();
        db.setDashboardTitle("Table In Razorfow");

        function addMyDoubleKpi(myKpiObjectName, myKey) {
            myKpiObjectName = new KPIGroupComponent();
            myKey = String(myKey);
            myKpiObjectName.setDimensions(12, 2);
            myKpiObjectName.lock();
            db.addComponent(myKpiObjectName);

            var myKpiObjectName2 = myKpiObjectName + "2";
            myKpiObjectName2 = new KPIGroupComponent();
            myKpiObjectName2.setDimensions(12, 2);
            myKpiObjectName2.lock();
            db.addComponent(myKpiObjectName2);


            function initialize() {
                // The URL of the spreadsheet to source data from.
                var query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/" + myKey + "/gviz/tq?sheet=KPI");
                query.setQuery("select C,D,E WHERE B='Oversigt'");
                query.send(function processResponse(response) {

                    var myData = response.getDataTable();

                    myKpiObjectName.addKPI("KpiYd1", {
                        caption: String(myData.getValue(0, 0)),
                        value: Number(myData.getValue(0, 2))
                        //numberPrefix: dateInput1.toLowerCase()
                    });
                    myKpiObjectName.addKPI("KpiYd2", {
                        caption: String(myData.getValue(1, 0)),
                        value: Number(myData.getValue(1, 2))
                        // numberSuffix: " pct."
                    });
                    myKpiObjectName.addKPI("KpiYd3", {
                        caption: String(myData.getValue(2, 0)),
                        value: Number(myData.getValue(2, 2))
                        // numberSuffix: " pct."
                    });
                    myKpiObjectName.addKPI("KpiYd4", {
                        caption: String(myData.getValue(3, 0)),
                        value: Number(myData.getValue(3, 2))
                        // numberSuffix: " pct."
                    });
                    myKpiObjectName2.addKPI("KpiYd5", {
                        caption: String(myData.getValue(4, 0)),
                        value: Number(myData.getValue(4, 2))
                        // numberSuffix: " pct."
                    });
                    myKpiObjectName2.addKPI("KpiYd6", {
                        caption: String(myData.getValue(5, 0)),
                        value: Number(myData.getValue(5, 2))
                        // numberSuffix: " pct."
                    });
                    myKpiObjectName2.addKPI("KpiYd7", {
                        caption: String(myData.getValue(6, 0)),
                        value: Number(myData.getValue(6, 2)),
                        numberDecimalPoints: 1,
                        numberSuffix: " pct."
                    });
                    myKpiObjectName2.addKPI("KpiYd8", {
                        caption: String(myData.getValue(7, 0)),
                        value: Number(myData.getValue(7, 2)),
                        numberDecimalPoints: 1,
                        numberSuffix: " pct."
                    });
                    // Don't forget to call unlock or the data won't be displayed
                    myKpiObjectName.unlock();
                    myKpiObjectName.setCaption("Nøgletal");// + numberLabels.toLowerCase());

                    myKpiObjectName2.unlock();
                    myKpiObjectName2.setCaption("Nøgletal");// + numberLabels.toLowerCase());
                    // Dette er kode til hyperlinks på Kpi. Koden gentages for hver Kpi.
                    $('#dbTarget').on('click', '#KpiYd1', function (e) {
                        e.stopPropagation();
                        window.location.assign("forsikrede.html");
                        return false;
                    });
                    $("#KpiYd1").addClass("KPIGroupComponentLink");

                    //// Dette er kode til hyperlinks på Kpi. Koden gentages for hver Kpi.
                    $('#dbTarget').on('click', '#KpiYd2', function (e) {
                        e.stopPropagation();
                        window.location.replace("sygedagpenge.html");
                        return false;
                    });
                    $("#KpiYd2").addClass("KPIGroupComponentLink");

                    $('#dbTarget').on('click', '#KpiYd3', function (e) {
                        e.stopPropagation();
                        window.location.replace("kontanthjaelp.html");
                        return false;
                    });
                    $("#KpiYd3").addClass("KPIGroupComponentLink");

                    $('#dbTarget').on('click', '#KpiYd4', function (e) {
                        e.stopPropagation();
                        window.location.replace("fleks.html");
                        return false;
                    });
                    $("#KpiYd4").addClass("KPIGroupComponentLink");

                    $('#dbTarget').on('click', '#KpiYd5', function (e) {
                        e.stopPropagation();
                        window.location.replace("ressource.html");
                        return false;
                    });
                    $("#KpiYd5").addClass("KPIGroupComponentLink");

                    $('#dbTarget').on('click', '#KpiYd6', function (e) {
                        e.stopPropagation();
                        window.location.replace("foertidspension.html");
                        return false;
                    });
                    $("#KpiYd6").addClass("KPIGroupComponentLink");

                    $('#dbTarget').on('click', '#KpiYd7', function (e) {
                        e.stopPropagation();
                        window.location.replace("ledighedspct.html");
                        return false;
                    });
                    $("#KpiYd7").addClass("KPIGroupComponentLink");

                    $('#dbTarget').on('click', '#KpiYd8', function (e) {
                        e.stopPropagation();
                        window.location.replace("ledighedspct.html");
                        return false;
                    });
                    $("#KpiYd8").addClass("KPIGroupComponentLink");

                    addTooltip({
                        kpiId: "KpiYd1",
                        dateInput: String(myData.getValue(0, 1)),
                        prefix: "Fuldtidspersoner "
                    });

                    addTooltip({
                        kpiId: "KpiYd2",
                        dateInput: String(myData.getValue(1, 1)),
                        prefix: "Fuldtidspersoner "
                    });

                    addTooltip({
                        kpiId: "KpiYd3",
                        dateInput: String(myData.getValue(2, 1)),
                        prefix: "Fuldtidspersoner "
                    });

                    addTooltip({
                        kpiId: "KpiYd4",
                        dateInput: String(myData.getValue(3, 1)),
                        prefix: "Fuldtidspersoner "
                    });

                    addTooltip({
                        kpiId: "KpiYd5",
                        dateInput: String(myData.getValue(4, 1)),
                        prefix: "Fuldtidspersoner "
                    });

                    addTooltip({
                        kpiId: "KpiYd6",
                        dateInput: String(myData.getValue(5, 1)),
                        prefix: "Fuldtidspersoner "
                    });
                    addTooltip({
                        kpiId: "KpiYd7",
                        dateInput: String(myData.getValue(6, 1)),
                        prefix: "Andel af arbejdsstyrken "
                    });
                    addTooltip({
                        kpiId: "KpiYd8",
                        dateInput: String(myData.getValue(7, 1)),
                        prefix: "Andel af arbejdsstyrken "
                    });

                });

            }


            initialize();

        }

        function addMyUniChart1(options) {
            var myChartType = options.myChartType || 'line';
            var isStacked = options.isStacked || false;
            var myChartHeight = options.myChartHeight || 4;
            var myChartWidth = options.myChartWidth || 4;
            var myKey = options.myKey;
            var mySheet = options.mySheet;
            var myQuery = options.myQuery;
            var myChartName = options.myChartName;
            var myCaption = options.myCaption;
            var myShowLegend = options.myShowLegend || true;

            myChartName = new ChartComponent();
            myChartName.setCaption(myCaption);
            myChartName.setDimensions(myChartWidth, myChartHeight);
            myChartName.setOption('showLegendFlag', myShowLegend);
            myChartName.lock();
            db.addComponent(myChartName);
            var whatId = myChartName.getID();

            function initialize() {
                // The URL of the spreadsheet to source data from.
                var query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/" + myKey + "/gviz/tq?sheet=" + mySheet);
                query.setQuery(myQuery);
                query.send(function processResponse(response) {
                    var myData = response.getDataTable();

                    var arrayLabels = [];
                    var arrayHeadings = [];

                    var myNumberOfDataColumns = myData.getNumberOfColumns(0) - 1;
                    var myNumberOfRows = myData.getNumberOfRows(0);

                    var arrayInput = [];
                    for (var x = 1; x <= myNumberOfDataColumns; x++) {
                        var arrayElement = "arrayInput" + x;
                        arrayInput[arrayElement] = [];
                        for (var e = 0; e < myNumberOfRows; e++) {
                            arrayInput[arrayElement].push(myData.getValue(e, x));
                        }
                    }

                    for (var i = 0; i < myNumberOfRows; i++) {
                        arrayLabels.push(myData.getValue(i, 0));
                    }

                    for (var h = 1; h <= myNumberOfDataColumns; h++) {
                        arrayHeadings.push(myData.getColumnLabel(h));
                    }

                    myChartName.setLabels(arrayLabels);


                    myChartName.addSeries("deakljoi1", arrayHeadings[0], arrayInput["arrayInput1"], {
                        seriesStacked: isStacked,
                        seriesDisplayType: myChartType
                        //seriesColor: "#5a9bd4"
                    });

                    if (myNumberOfDataColumns >= 2) {
                        myChartName.addSeries("deakljoi2", arrayHeadings[1], arrayInput["arrayInput2"], {
                            seriesStacked: isStacked,
                            seriesDisplayType: myChartType
                            //seriesColor: "#7ac36a"
                        });
                    }

                    if (myNumberOfDataColumns >= 3) {
                        myChartName.addSeries("deakljoi3", arrayHeadings[2], arrayInput["arrayInput3"], {
                            seriesStacked: isStacked,
                            seriesDisplayType: myChartType
                            //seriesColor: "#f15a60"
                        });
                    }

                    if (myNumberOfDataColumns >= 4) {
                        myChartName.addSeries("deakljoi4", arrayHeadings[3], arrayInput["arrayInput4"], {
                            seriesStacked: isStacked,
                            seriesDisplayType: myChartType
                            //seriesColor: "#faa65b"
                        });
                    }
                    if (myNumberOfDataColumns >= 5) {
                        myChartName.addSeries("deakljoi5", arrayHeadings[4], arrayInput["arrayInput5"], {
                            seriesStacked: isStacked,
                            seriesDisplayType: myChartType
                            //seriesColor: "#9e67ab"
                        });
                    }
                    if (myNumberOfDataColumns >= 6) {
                        myChartName.addSeries("deakljoi6", arrayHeadings[5], arrayInput["arrayInput6"], {
                            seriesStacked: isStacked,
                            seriesDisplayType: myChartType,
                            seriesColor: "#d77fb4"
                        });
                    }
                    if (myNumberOfDataColumns >= 7) {
                        myChartName.addSeries("deakljoi7", arrayHeadings[6], arrayInput["arrayInput7"], {
                            seriesStacked: false,
                            seriesDisplayType: "line",
                            seriesColor: "#ce7058"
                        });
                    }
                    if (myNumberOfDataColumns >= 8) {
                        myChartName.addSeries("deakljoi8", arrayHeadings[7], arrayInput["arrayInput8"], {
                            seriesStacked: isStacked,
                            seriesDisplayType: myChartType,
                            seriesColor: "#9e67ab"
                        });
                    }
                    if (myNumberOfDataColumns >= 9) {
                        myChartName.addSeries("deakljoi9", arrayHeadings[8], arrayInput["arrayInput9"], {
                            seriesStacked: isStacked,
                            seriesDisplayType: myChartType,
                            seriesColor: '#6CDEC7'
                        });
                    }
                    // Don't forget to call unlock or the data won't be displayed
                    myChartName.unlock();
                });
            }
            initialize();
        }

        function addMyDrillDownChart1(options) {
            var myKey = options.myKey;
            var mySheet = options.mySheet;
            var mySelect = options.mySelect;
            var myChartName = options.myChartName;
            var myCaption = options.myCaption;
            var callback = options.callback;

            var myKeyDrill = options.myKeyDrill || options.myKey;
            var mySheetDrill = options.mySheetDrill || options.mySheet;
            var mySelectDrill = options.mySelectDrill || options.mySelect;
            var myChartNameDrill = options.myChartNameDrill || options.myChartName;
            var myCaptionDrill = options.myCaptionDrill || options.myCaption;

            myChartName = new ChartComponent();
            myChartName.setCaption(myCaption);
            myChartName.setDimensions(5, 3);
            myChartName.lock();
            db.addComponent(myChartName);

            //function loadApi() {
            //  google.load("visualization", "1", {"callback" : initialize});
            //}
            function initialize() {
                // The URL of the spreadsheet to source data from.
                var spreadsheetUrl = String("https://docs.google.com/spreadsheets/d/" + myKey + "/gviz/tq?sheet=" + mySheet);
                var query = new google.visualization.Query(spreadsheetUrl);
                query.setQuery(mySelect);
                query.send(function processResponse(response) {

                    if (response.isError()) {
                        alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage() + ' ' + response.getReasons());
                        return;
                    }

                    var myData = response.getDataTable();

                    var mySeriesName1 = new String();
                    var mySeriesName2 = new String();
                    var mySeriesName3 = new String();
                    var mySeriesName4 = new String();
                    var mySeriesName5 = new String();
                    var mySeriesName6 = new String();
                    var mySeriesName7 = new String();
                    var mySeriesName8 = new String();
                    var mySeriesName9 = new String();
                    var mySeriesName10 = new String();
                    //var mySeriesName11 = new String();

                    var arrayLabels = new Array();
                    var arrayInput1 = new Array();
                    var arrayInput2 = new Array();
                    var arrayInput3 = new Array();
                    var arrayInput4 = new Array();
                    var arrayInput5 = new Array();
                    var arrayInput6 = new Array();
                    var arrayInput7 = new Array();
                    var arrayInput8 = new Array();
                    var arrayInput9 = new Array();
                    var arrayInput10 = new Array();
                    //var arrayInput11 = new Array();

                    mySeriesName1 = myData.getValue(0, 0);
                    mySeriesName2 = myData.getValue(1, 2);
                    mySeriesName3 = myData.getValue(2, 4);
                    mySeriesName4 = myData.getValue(3, 6);
                    mySeriesName5 = myData.getValue(4, 8);
                    mySeriesName6 = myData.getValue(5, 10);
                    mySeriesName7 = myData.getValue(6, 12);
                    mySeriesName8 = myData.getValue(7, 14);
                    mySeriesName9 = myData.getValue(8, 16);
                    mySeriesName10 = myData.getValue(9, 18);
                    //mySeriesName11 = myData.getValue(10, 20);

                    for (var i = 1; i < myData.getNumberOfColumns(0); i += 2) {
                        arrayLabels.push(myData.getColumnLabel(i, 0));
                    }

                    for (var e = 0; e < myData.getNumberOfRows(0); e++) {
                        arrayInput1.push(myData.getValue(e, 1));
                        arrayInput2.push(myData.getValue(e, 3));
                        arrayInput3.push(myData.getValue(e, 5));
                        arrayInput4.push(myData.getValue(e, 7));
                        arrayInput5.push(myData.getValue(e, 9));
                        arrayInput6.push(myData.getValue(e, 11));
                        arrayInput7.push(myData.getValue(e, 13));
                        arrayInput8.push(myData.getValue(e, 15));
                        arrayInput9.push(myData.getValue(e, 17));
                        arrayInput10.push(myData.getValue(e, 19));
                        //arrayInput11.push(myData.getValue(e, 21));
                    }

                    // myChartComponentObject = myChartName;
                    myChartName.setLabels(arrayLabels);
                    myChartName.addSeries("pb1", mySeriesName1, arrayInput1, {
                        seriesStacked: true,
                        seriesDisplayType: "column",
                        seriesColor: '#5a9bd4'
                    });
                    myChartName.addSeries("pb2", mySeriesName2, arrayInput2, {
                        seriesStacked: true,
                        seriesDisplayType: "column",
                        seriesColor: '#5a9bd4'
                    });
                    myChartName.addSeries("pb3", mySeriesName3, arrayInput3, {
                        seriesStacked: true,
                        seriesDisplayType: "column",
                        seriesColor: '#5a9bd4'
                    });
                    myChartName.addSeries("pb4", mySeriesName4, arrayInput4, {
                        seriesStacked: true,
                        seriesDisplayType: "column",
                        seriesColor: '#5a9bd4'
                    });
                    myChartName.addSeries("pb5", mySeriesName5, arrayInput5, {
                        seriesStacked: true,
                        seriesDisplayType: "column",
                        seriesColor: '#5a9bd4'
                    });
                    myChartName.addSeries("pb6", mySeriesName6, arrayInput6, {
                        seriesStacked: true,
                        seriesDisplayType: "column",
                        seriesColor: '#5a9bd4'
                    });
                    myChartName.addSeries("pb7", mySeriesName7, arrayInput7, {
                        seriesStacked: true,
                        seriesDisplayType: "column",
                        seriesColor: '#5a9bd4'
                    });
                    myChartName.addSeries("pb8", mySeriesName8, arrayInput8, {
                        seriesStacked: true,
                        seriesDisplayType: "column",
                        seriesColor: '#5a9bd4'
                    });
                    myChartName.addSeries("pb9", mySeriesName9, arrayInput9, {
                        seriesStacked: true,
                        seriesDisplayType: "column",
                        seriesColor: '#5a9bd4'
                    });
                    myChartName.addSeries("pb10", mySeriesName10, arrayInput10, {
                        seriesStacked: true,
                        seriesDisplayType: "column",
                        seriesColor: '#5a9bd4'
                    });
                    myChartName.setOption('showLegendFlag', false);
                    // Don't forget to call unlock or the data won't be displayed
                    myChartName.unlock();
                });
            }
            initialize();
            //google.setOnLoadCallback(initialize);
            myChartName.addDrillStep(function (done, params) {
                var myWhereCond = "\"" + params.label + "\"";
                var columnNam = "";
                if (params.label === "Forsikrede") {
                    columnName = "B,C";
                }
                //if (params.label === "Arbejdsmarkedsyd.") {
                //    columnName = "B,E";
                //}
                if (params.label === "Kontanthjælp") {
                    columnName = "F,G";
                }
                if (params.label === "Uddannelseshjælp") {
                    columnName = "H,I";
                }
                if (params.label === "Sygedagpenge") {
                    columnName = "J,K";
                }
                if (params.label === "Jobafklaring") {
                    columnName = "J,M";
                }
                if (params.label === "Fleksjob") {
                    columnName = "N,O";
                }
                if (params.label === "Ledighedsyd.") {
                    columnName = "P,Q";
                }
                if (params.label === "Ressourceforløb") {
                    columnName = "T,S";
                }
                if (params.label === "Førtidspension") {
                    columnName = "T,U";
                }
                if (params.label === "Revalidering") {
                    columnName = "V,W";
                }

                function initialize2() {
                    // The URL of the spreadsheet to source data from.
                    var query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/" + myKey + "/gviz/tq?sheet=" + mySheetDrill);
                    query.setQuery("select " + columnName + " ORDER BY A desc ");
                    query.send(function processResponse(response) {
                        var myData = response.getDataTable();
                        var arrayLabels = new Array();
                        var arrayInput1 = new Array();
                        var arrayLabels_ny = new Array();
                        var arrayInput1_ny = new Array();
                        var arrayInput2 = new Array();

                        for (var i = 12; i <= 23; i++) {
                            arrayLabels.push(myData.getValue(i, 0));
                            arrayInput1.push(myData.getValue(i, 1));
                        }
                        for (var e = 0; e <= 11; e++) {
                            arrayInput2.push(myData.getValue(e, 1));
                        }
                        // myChartComponentObject = myChartName;
                        myChartName.setLabels(arrayLabels);
                        myChartName.setOption('showLegendFlag', true);

                        myChartName.addSeries("rate1", "seneste 12 mdr.", arrayInput1, {
                            seriesStacked: false,
                            seriesDisplayType: "line"
                        });
                        myChartName.addSeries("rate2", "forrige 12 mdr.", arrayInput2, {
                            seriesStacked: false,
                            seriesDisplayType: "line"
                        });

                        // Don't forget to call unlock or the data won't be displayed
                        done();
                    });
                }
                initialize2();
            });

        }
        // Sætter parametre for dataudtræk og kører funktioner
        addMyDoubleKpi("Kpi2", "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw");

        addMyUniChart1({
            myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
            mySheet: "Fuldtids UDV",
            myQuery: "select B, C+D, E+F+O, G+H, I+J, K+M, L, C+D+E+F+O+G+H+I+J+K+M+L WHERE A='Tael' OR A<=12 ORDER BY A desc label B 'Dato', C+D 'Forsikrede og yd. efter opbrugt dagp.',E+F+O 'Kont.hjælp,udd.hjælp og integrationsydelse', G+H 'Sygedagpenge og jobafklaring', I+J 'Fleksjob og ledighedsyd.', K+M 'Ressourceforløb og revalidering', L 'Førtidspension', C+D+E+F+O+G+H+I+J+K+M+L 'Total'",
            myChartWidth: 7,
            myChartHeight: 6,
            isStacked: true,
            myShowLegend: true,
            myChartType: "area",
            myChartName: "chart1_1",
            myCaption: "Antal fuldtidspersoner"
        });


        addMyDrillDownChart1({
            myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
            mySheet: "TILGANG",
            mySheetDrill: "UDV TILGANG",
            mySelect: "select B,C, D,E ,F,G, H,I, J,K, L,M, N,O, P,Q, R,S, T,U WHERE A=0 label B 'Dato', C 'Forsikrede', D 'Dato', E 'Kontanthjælp', F 'Date', G 'Uddannelseshjælp', H 'Date', I 'Sygedagpenge', J 'Date', K 'Jobafklaring', L 'Date', M 'Fleksjob', N 'Date', O 'Ledighedsyd.', P 'Date', Q 'Ressourceforløb', R 'Date', S 'Førtidspension', T 'Date', U 'Revalidering'",
            myChartName: "chart1_2",
            myCaption: "Antal påbegyndte forløb"
        });

        addMyDrillDownChart1({
            myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
            mySheet: "AFGANG",
            mySheetDrill: "UDV AFGANG",
            mySelect: "select B,C, D,E ,F,G, H,I, J,K, L,M, N,O, P,Q, R,S, T,U WHERE A=0 label B 'Dato', C 'Forsikrede', D 'Dato', E 'Kontanthjælp', F 'Date', G 'Uddannelseshjælp', H 'Date', I 'Sygedagpenge', J 'Date', K 'Jobafklaring', L 'Date', M 'Fleksjob', N 'Date', O 'Ledighedsyd.', P 'Date', Q 'Ressourceforløb', R 'Date', S 'Førtidspension', T 'Date', U 'Revalidering'",
            myChartName: "chart1_3",
            myCaption: "Antal afsluttede forløb"
        });
	
        // -----------------------------------------------------------------------------------------------------------
        // -----------------------Dashboard 2-------------------------------------------------------------------------
        // -----------------------------------------------------------------------------------------------------------

        
        var db2 = new Dashboard();
        db2.setDashboardTitle("Politisk mål: Unge under 25 år");

        function addMyKpi2(myKpiObjectName, myKey) {
            myKpiObjectName = new KPIGroupComponent();
            myKey = String(myKey);
            myKpiObjectName.setDimensions(12, 2);
            myKpiObjectName.lock();
            db2.addComponent(myKpiObjectName);

            function initialize() {
                // The URL of the spreadsheet to source data from.
                var query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/" + myKey + "/gviz/tq?sheet=KPI");
                query.setQuery("select C,D,E WHERE B='Unge' ORDER BY K LIMIT 3");
                query.send(function processResponse(response) {

                    var myData = response.getDataTable();

                    var numberInput1 = new Number();
                    var numberInput2 = new Number();
                    var numberInput3 = new Number();

                    var captionInput1 = new String();
                    var captionInput2 = new String();
                    var captionInput3 = new String();

                    var dateInput1 = new String();
                    var dateInput2 = new String();
                    var dateInput3 = new String();

                    numberInput1 = Number(myData.getValue(0, 2));
                    numberInput2 = Number(myData.getValue(1, 2));
                    numberInput3 = Number(myData.getValue(2, 2));

                    captionInput1 = String(myData.getValue(0, 0));
                    captionInput2 = String(myData.getValue(1, 0));
                    captionInput3 = String(myData.getValue(2, 0));

                    dateInput1 = String(myData.getValue(0, 1));
                    dateInput2 = String(myData.getValue(1, 1));
                    dateInput3 = String(myData.getValue(2, 1));

                    myKpiObjectName.addKPI("KpiYd1_2", {
                        caption: captionInput1,
                        value: numberInput1.toFixed(1)
                        //numberDecimalPoints: 2,
                        //numberSuffix: " pct."
                    });
                    myKpiObjectName.addKPI("KpiYd2_2", {
                        caption: captionInput2,
                        value: numberInput2.toFixed(1),
                        //numberDecimalPoints: 1,
                        numberSuffix: " pct."
                    });
                    myKpiObjectName.addKPI("KpiYd3_2", {
                        caption: captionInput3,
                        value: numberInput3.toFixed(1),
                        //numberDecimalPoints: 1,
                        numberSuffix: " pct."
                    });

                    // Don't forget to call unlock or the data won't be displayed
                    myKpiObjectName.unlock();
                    myKpiObjectName.setCaption("Nøgletal");// + numberLabels.toLowerCase());

                    addTooltip({
                        kpiId: "KpiYd1_2",
                        dateInput: dateInput1,
                        prefix: "Fuldtidspersoner "
                    });

                    addTooltip({
                        kpiId: "KpiYd2_2",
                        dateInput: dateInput2,
                        prefix: "Andel "
                    });

                    addTooltip({
                        kpiId: "KpiYd3_2",
                        dateInput: dateInput3,
                        prefix: "Andel "
                    });

                });

            }

            initialize();
        }

        function addMyDrillDownChart2(options) {
            var myKey = options.myKey;
            var mySheet = options.mySheet;
            var mySelect = options.mySelect;
            var myChartName = options.myChartName;
            var myCaption = options.myCaption;
            var callback = options.callback;

            var myKeyDrill = options.myKeyDrill || options.myKey;
            var mySheetDrill = options.mySheetDrill || options.mySheet;
            var mySelectDrill = options.mySelectDrill || options.mySelect;
            var myChartNameDrill = options.myChartNameDrill || options.myChartName;
            var myCaptionDrill = options.myCaptionDrill || options.myCaption;

            myChartName = new ChartComponent();
            myChartName.setCaption(myCaption);
            myChartName.setDimensions(6, 4);
            myChartName.lock();
            db2.addComponent(myChartName);

            //function loadApi() {
            //  google.load("visualization", "1", {"callback" : initialize});
            //}
            function initialize() {
                // The URL of the spreadsheet to source data from.
                var spreadsheetUrl = String("https://docs.google.com/spreadsheets/d/" + myKey + "/gviz/tq?sheet=" + mySheet);
                var query = new google.visualization.Query(spreadsheetUrl);
                query.setQuery(mySelect);
                query.send(function processResponse(response) {

                    if (response.isError()) {
                        alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage() + ' ' + response.getReasons());
                        return;
                    }

                    var myData = response.getDataTable();

                    var mySeriesName1 = new String();
                    var mySeriesName2 = new String();
                    var mySeriesName3 = new String();
                    var mySeriesName4 = new String();
                    var mySeriesName5 = new String();
                    var mySeriesName6 = new String();

                    var arrayLabels = new Array();
                    var arrayInput1 = new Array();
                    var arrayInput2 = new Array();
                    var arrayInput3 = new Array();
                    var arrayInput4 = new Array();
                    var arrayInput5 = new Array();
                    var arrayInput6 = new Array();

                    mySeriesName1 = myData.getValue(0, 0);
                    mySeriesName2 = myData.getValue(1, 2);
                    mySeriesName3 = myData.getValue(2, 4);
                    mySeriesName4 = myData.getValue(3, 6);
                    mySeriesName5 = myData.getValue(4, 8);
                    mySeriesName6 = myData.getValue(5, 10);

                    for (var i = 1; i < myData.getNumberOfColumns(0); i += 2) {
                        arrayLabels.push(myData.getColumnLabel(i, 0));
                    }

                    for (var e = 0; e < myData.getNumberOfRows(0); e++) {
                        arrayInput1.push(myData.getValue(e, 1));
                        arrayInput2.push(myData.getValue(e, 3));
                        arrayInput3.push(myData.getValue(e, 5));
                        arrayInput4.push(myData.getValue(e, 7));
                        arrayInput5.push(myData.getValue(e, 9));
                        arrayInput6.push(myData.getValue(e, 11));
                    }

                    // myChartComponentObject = myChartName;
                    myChartName.setLabels(arrayLabels);
                    myChartName.addSeries("pb1", mySeriesName1, arrayInput1, {
                        seriesStacked: true,
                        seriesDisplayType: "column",
                        seriesColor: '#5a9bd4'
                    });
                    myChartName.addSeries("pb2", mySeriesName2, arrayInput2, {
                        seriesStacked: true,
                        seriesDisplayType: "column",
                        seriesColor: '#7ac36a'
                    });
                    myChartName.addSeries("pb3", mySeriesName3, arrayInput3, {
                        seriesStacked: true,
                        seriesDisplayType: "column",
                        seriesColor: '#5a9bd4'
                    });
                    myChartName.addSeries("pb4", mySeriesName4, arrayInput4, {
                        seriesStacked: true,
                        seriesDisplayType: "column",
                        seriesColor: '#7ac36a'
                    });
                    myChartName.addSeries("pb5", mySeriesName5, arrayInput5, {
                        seriesStacked: true,
                        seriesDisplayType: "column",
                        seriesColor: '#5a9bd4'
                    });
                    myChartName.addSeries("pb6", mySeriesName6, arrayInput6, {
                        seriesStacked: true,
                        seriesDisplayType: "column",
                        seriesColor: '#7ac36a'
                    });
                    myChartName.setOption('showLegendFlag', false);
                    // Don't forget to call unlock or the data won't be displayed
                    myChartName.unlock();
                });
            }
            initialize();
            //google.setOnLoadCallback(initialize);
            myChartName.addDrillStep(function (done, params) {
                var myWhereCond = "\"" + params.label + "\"";
                var columnName = "";
                if (params.label === "Tilgang - forsikrede") {
                    columnName = "B,C";
                }
                if (params.label === "Afgang - forsikrede") {
                    columnName = "D,E";
                }
                if (params.label === "Tilgang - udd.hjælp - udd.parate") {
                    columnName = "F,G";
                }
                if (params.label === "Afgang - udd.hjælp -udd.parate") {
                    columnName = "H,I";
                }
                if (params.label === "Tilgang - udd.hjælp - aktivitetsparate") {
                    columnName = "J,K";
                }
                if (params.label === "Afgang - udd.hjælp - aktivitetsparate") {
                    columnName = "L,M";
                }

                function initialize2() {
                    // The URL of the spreadsheet to source data from.
                    var query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/" + myKey + "/gviz/tq?sheet=" + mySheetDrill);
                    query.setQuery("select " + columnName + " ORDER BY A desc ");
                    query.send(function processResponse(response) {
                        var myData = response.getDataTable();
                        var arrayLabels = new Array();
                        var arrayInput1 = new Array();
                        var arrayLabels_ny = new Array();
                        var arrayInput1_ny = new Array();
                        var arrayInput2 = new Array();
                        for (var i = 12; i <= 23; i++) {
                            arrayLabels.push(myData.getValue(i, 0));
                            arrayInput1.push(myData.getValue(i, 1));
                        }
                        for (var e = 0; e <= 11; e++) {
                            arrayInput2.push(myData.getValue(e, 1));
                        }
                        // myChartComponentObject = myChartName;
                        myChartName.setLabels(arrayLabels);
                        myChartName.setOption('showLegendFlag', true);

                        myChartName.addSeries("rate1", "seneste 12 mdr.", arrayInput1, {
                            seriesStacked: false,
                            seriesDisplayType: "line"
                        });
                        myChartName.addSeries("rate2", "forrige 12 mdr.", arrayInput2, {
                            seriesStacked: false,
                            seriesDisplayType: "line"
                        });

                        // Don't forget to call unlock or the data won't be displayed
                        done();
                    });
                }
                initialize2();
            });

        }

        function addMyDrillDownChart3(options) {
            var myKey = options.myKey;
            var mySheet = options.mySheet;
            var mySelect = options.mySelect;
            var myChartName = options.myChartName;
            var myCaption = options.myCaption;
            var callback = options.callback;

            var myKeyDrill = options.myKeyDrill || options.myKey;
            var mySheetDrill = options.mySheetDrill || options.mySheet;
            var mySelectDrill = options.mySelectDrill || options.mySelect;
            var myChartNameDrill = options.myChartNameDrill || options.myChartName;
            var myCaptionDrill = options.myCaptionDrill || options.myCaption;

            myChartName = new ChartComponent();
            myChartName.setCaption(myCaption);
            myChartName.setDimensions(6, 4);
            myChartName.setOption('showLegendFlag', true);
            myChartName.lock();
            db2.addComponent(myChartName);

            //function loadApi() {
            //  google.load("visualization", "1", {"callback" : initialize});
            //}
            function initialize() {
                // The URL of the spreadsheet to source data from.
                var spreadsheetUrl = String("https://docs.google.com/spreadsheets/d/" + myKey + "/gviz/tq?sheet=" + mySheet);
                var query = new google.visualization.Query(spreadsheetUrl);
                query.setQuery(mySelect);
                query.send(function processResponse(response) {

                    if (response.isError()) {
                        alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage() + ' ' + response.getReasons());
                        return;
                    }

                    var myData = response.getDataTable();

                    var mySeriesName1 = "";
                    var mySeriesName2 = "";
                    var mySeriesName3 = "";
                    var mySeriesName4 = "";
                    var mySeriesName5 = "";
                    var mySeriesName6 = "";
                    var mySeriesName7 = "";

                    var arrayLabels = [];
                    var arrayInput1 = [];
                    var arrayInput2 = [];
                    var arrayInput3 = [];
                    var arrayInput4 = [];
                    var arrayInput5 = [];
                    var arrayInput6 = [];
                    var arrayInput7 = [];

                    mySeriesName1 = myData.getColumnLabel(1,0);
                    mySeriesName2 = myData.getColumnLabel(2,0);
                    mySeriesName3 = myData.getColumnLabel(3,0);
                    mySeriesName4 = myData.getColumnLabel(4,0);
                    mySeriesName5 = myData.getColumnLabel(5,0);
                    mySeriesName6 = myData.getColumnLabel(6,0);
                    mySeriesName7 = myData.getColumnLabel(7,0);

                    for (var e = 0; e < myData.getNumberOfRows(0); e++) {
                        arrayLabels.push(myData.getValue(e, 0));
                        arrayInput1.push(myData.getValue(e, 1));
                        arrayInput2.push(myData.getValue(e, 2));
                        arrayInput3.push(myData.getValue(e, 3));
                        arrayInput4.push(myData.getValue(e, 4));
                        arrayInput5.push(myData.getValue(e, 5));
                        arrayInput6.push(myData.getValue(e, 6));
                        arrayInput7.push(myData.getValue(e, 7));
                    }

                    // myChartComponentObject = myChartName;
                    myChartName.setLabels(arrayLabels);
                    myChartName.addSeries("pb1", mySeriesName1, arrayInput1, {
                        seriesStacked: true,
                        seriesDisplayType: "column"                   
                    });
                    myChartName.addSeries("pb2", mySeriesName2, arrayInput2, {
                        seriesStacked: true,
                        seriesDisplayType: "column"
                    });
                    myChartName.addSeries("pb3", mySeriesName3, arrayInput3, {
                        seriesStacked: true,
                        seriesDisplayType: "column"
                    });
                    myChartName.addSeries("pb4", mySeriesName4, arrayInput4, {
                        seriesStacked: true,
                        seriesDisplayType: "column"
                    });
                    myChartName.addSeries("pb5", mySeriesName5, arrayInput5, {
                        seriesStacked: true,
                        seriesDisplayType: "column"
                    });
                    myChartName.addSeries("pb6", mySeriesName6, arrayInput6, {
                        seriesStacked: true,
                        seriesDisplayType: "column"
                    });
                    // Don't forget to call unlock or the data won't be displayed
                    myChartName.unlock();
                });
            }
            initialize();
            //google.setOnLoadCallback(initialize);
            myChartName.addDrillStep(function (done, params) {
                var columnName = "";

                if (params.label === "Forsikrede") {
                    columnName = "B,C,D,E,F,G,H,I";
                }
                if (params.label === "Uddannelseshjælp - åbenlyst udd.parate") {
                    columnName = "B,C,D,E,F,G,H,I";
                }
                if (params.label === "Uddannelseshjælp - udd.parate") {
                    columnName = "B,C,D,E,F,G,H,I";
                }
                if (params.label === "Uddannelseshjælp - aktivitetsparate") {
                    columnName = "B,C,D,E,F,G,H,I";
                }

                function initialize2() {
                    // The URL of the spreadsheet to source data from.
                    var query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/" + myKey + "/gviz/tq?sheet=" + mySheetDrill);
                    query.setQuery("select " + columnName + " WHERE J = \'" + params.label + "\' ORDER BY A desc ");
                    query.send(function processResponse(response) {
                        var myData = response.getDataTable();
                        var arrayLabels = [];
                        var arrayInput1 = [];
                        var arrayLabels_ny = [];
                        var arrayInput1_ny = [];
                        var arrayInput2 = [];
                        var arrayInput3 = [];
                        var arrayInput4 = [];
                        var arrayInput5 = [];
                        var arrayInput6 = [];
                        var arrayInput7 = [];

                        for (var i = 0; i <= 12; i++) {
                            arrayLabels.push(myData.getValue(i, 0));
                            arrayInput1.push(myData.getValue(i, 1));
                            arrayInput2.push(myData.getValue(i, 2));
                            arrayInput3.push(myData.getValue(i, 3));
                            arrayInput4.push(myData.getValue(i, 4));
                            arrayInput5.push(myData.getValue(i, 5));
                            arrayInput6.push(myData.getValue(i, 6));
                            arrayInput7.push(myData.getValue(i, 7));
                        }
                        // myChartComponentObject = myChartName;
                        myChartName.setLabels(arrayLabels);
                        myChartName.setOption('showLegendFlag', true);

                        myChartName.addSeries("rate1", "under 2 uger", arrayInput1, {
                            seriesStacked: true,
                            seriesDisplayType: "column"
                        });
                        myChartName.addSeries("rate2", "2-4 uger", arrayInput2, {
                            seriesStacked: true,
                            seriesDisplayType: "column"
                        });
                        myChartName.addSeries("rate3", "5-13 uger", arrayInput3, {
                            seriesStacked: true,
                            seriesDisplayType: "column"
                        });
                        myChartName.addSeries("rate4", "14-26 uger", arrayInput4, {
                            seriesStacked: true,
                            seriesDisplayType: "column"
                        });
                        myChartName.addSeries("rate5", "27-39 uger", arrayInput5, {
                            seriesStacked: true,
                            seriesDisplayType: "column"
                        });
                        myChartName.addSeries("rate6", "40-52 uger", arrayInput6, {
                            seriesStacked: true,
                            seriesDisplayType: "column"
                        });
                        myChartName.addSeries("rate7", "over 52 uger", arrayInput7, {
                            seriesStacked: true,
                            seriesDisplayType: "column"
                        });
                        

                        // Don't forget to call unlock or the data won't be displayed
                        done();
                    });
                }
                initialize2();
            });

        }


        // addMyUniChart er en function, der viser et chart. Den er paremtriseret, så den kan anvendes til de fleste charts
        // - dog ikke med drillstep eller pie-charts. For at fungere skal den query, der henter data fra Spreadsheet have 
        // kategoriaksen som første element.
        // OBS - virker kun hvis funktionen Dashboard har navnet "db"
        function addMyUniChart2(myOptions) {
            var myChartType = myOptions.myChartType || 'line';
            var isStacked = myOptions.isStacked || false;
            var myChartHeight = myOptions.myChartHeight || 4;
            var myChartWidth = myOptions.myChartWidth || 4;
            var myKey = myOptions.myKey;
            var mySheet = myOptions.mySheet;
            var myQuery = myOptions.myQuery;
            var myChartName = myOptions.myChartName;
            var myCaption = myOptions.myCaption;
            var myShowLegend = myOptions.myShowLegend || true;

            myChartName = new ChartComponent();
            myChartName.setCaption(myCaption);
            myChartName.setDimensions(myChartWidth, myChartHeight);
            myChartName.setOption('showLegendFlag', myShowLegend);
            myChartName.lock();
            db2.addComponent(myChartName);
            var whatId = myChartName.getID();

            function initialize() {
                // The URL of the spreadsheet to source data from.
                var query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/" + myKey + "/gviz/tq?sheet=" + mySheet);
                query.setQuery(myQuery);
                query.send(function processResponse(response) {
                    var myData = response.getDataTable();

                    var arrayLabels = [];
                    var arrayHeadings = [];

                    var myNumberOfDataColumns = myData.getNumberOfColumns(0) - 1;
                    var myNumberOfRows = myData.getNumberOfRows(0);

                    var arrayInput = [];
                    for (var x = 1; x <= myNumberOfDataColumns; x++) {
                        var arrayElement = "arrayInput" + x;
                        arrayInput[arrayElement] = [];
                        for (var e = 0; e < myNumberOfRows; e++) {
                            arrayInput[arrayElement].push(myData.getValue(e, x).toFixed(1));
                        }
                    }

                    for (var i = 0; i < myNumberOfRows; i++) {
                        arrayLabels.push(myData.getValue(i, 0));
                    }

                    for (var h = 1; h <= myNumberOfDataColumns; h++) {
                        arrayHeadings.push(myData.getColumnLabel(h));
                    }

                    myChartName.setLabels(arrayLabels);


                    myChartName.addSeries("deakljoi1", arrayHeadings[0], arrayInput["arrayInput1"], {
                        seriesStacked: isStacked,
                        seriesDisplayType: myChartType
                    });

                    if (myNumberOfDataColumns >= 2) {
                        myChartName.addSeries("deakljoi2", arrayHeadings[1], arrayInput["arrayInput2"], {
                            seriesStacked: isStacked,
                            seriesDisplayType: myChartType
                        });
                    }

                    if (myNumberOfDataColumns >= 3) {
                        myChartName.addSeries("deakljoi3", arrayHeadings[2], arrayInput["arrayInput3"], {
                            seriesStacked: isStacked,
                            seriesDisplayType: myChartType
                        });
                    }

                    if (myNumberOfDataColumns >= 4) {
                        myChartName.addSeries("deakljoi4", arrayHeadings[3], arrayInput["arrayInput4"], {
                            seriesStacked: isStacked,
                            seriesDisplayType: myChartType
                        });
                    }
                    if (myNumberOfDataColumns >= 5) {
                        myChartName.addSeries("deakljoi5", arrayHeadings[4], arrayInput["arrayInput5"], {
                            seriesStacked: isStacked,
                            seriesDisplayType: myChartType
                        });
                    }
                    if (myNumberOfDataColumns >= 6) {
                        myChartName.addSeries("deakljoi6", arrayHeadings[5], arrayInput["arrayInput6"], {
                            seriesStacked: isStacked,
                            seriesDisplayType: myChartType,
                            seriesColor: "#d77fb4"
                        });
                    }
                    if (myNumberOfDataColumns >= 7) {
                        myChartName.addSeries("deakljoi7", arrayHeadings[6], arrayInput["arrayInput7"], {
                            seriesStacked: isStacked,
                            seriesDisplayType: myChartType,
                            seriesColor: "#ce7058"
                        });
                    }
                    if (myNumberOfDataColumns >= 8) {
                        myChartName.addSeries("deakljoi8", arrayHeadings[7], arrayInput["arrayInput8"], {
                            seriesStacked: isStacked,
                            seriesDisplayType: myChartType,
                            seriesColor: "#c7c8ca"
                        });
                    }
                    if (myNumberOfDataColumns >= 9) {
                        myChartName.addSeries("deakljoi9", arrayHeadings[8], arrayInput["arrayInput9"], {
                            seriesStacked: isStacked,
                            seriesDisplayType: myChartType,
                            seriesColor: '#6CDEC7'
                        });
                    }
                    if (myNumberOfDataColumns >= 10) {
                        myChartName.addSeries("deakljoi10", arrayHeadings[9], arrayInput["arrayInput10"], {
                            seriesStacked: isStacked,
                            seriesDisplayType: myChartType,
                            seriesColor: '#FFED0D'
                        });
                    }
                    if (myNumberOfDataColumns >= 11) {
                        myChartName.addSeries("deakljoi11", arrayHeadings[10], arrayInput["arrayInput11"], {
                            seriesStacked: isStacked,
                            seriesDisplayType: 'line',
                            seriesColor: '#151132'
                        });
                    }
                    // Don't forget to call unlock or the data won't be displayed
                    myChartName.unlock();
                });
            }
            initialize();
        }

        ////// ---------------------------------------------------------------------

        addMyKpi2("Kpi2", "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw");

        addMyUniChart2({
            myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
            mySheet: "Unge UDV",
            myQuery: "select B,C,D WHERE A='Tael' OR A<=12 ORDER BY A desc",
            myChartWidth: 6,
            myChartHeight: 4,
            isStacked: false,
            myShowLegend: true,
            myChartType: "line",
            myChartName: "chart2_1",
            myCaption: "Andel af arbejdsstyrken"
        });
        // addMyUniChart2({
        //     myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
        //     mySheet: "Unge UDV",
        //     myQuery: "select Z,AA,AC,AE WHERE A='Tael' OR A<=12 ORDER BY A desc",
        //     myChartWidth: 6,
        //     myChartHeight: 4,
        //     isStacked: false,
        //     myShowLegend: true,
        //     myChartType: "line",
        //     myChartName: "chart2_3",
        //     myCaption: "Udvikling i årsmål"
        // });
        addMyUniChart2({
            myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
            mySheet: "Unge UDV",
            myQuery: "select E,F,J,AF,AG,AH,AI,AJ,AK,AL,AN, F+J+AF+AG+AH+AI+AJ+AK+AL+AN WHERE A='Tael' OR A<=12 ORDER BY A desc label F+J+AF+AG+AH+AI+AJ+AK+AL+AN 'Total'",
            myChartWidth: 6,
            myChartHeight: 4,
            isStacked: true,
            myShowLegend: true,
            myChartType: "area",
            myChartName: "chart2_2",
            myCaption: "Fuldtidspersoner"
        });

        addMyDrillDownChart2({
            myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
            mySheet: "TA UNGE",
            mySheetDrill: "TA UNGE UDV",
            mySelect: "select B,C, D,E, F,G, H,I, J,K, L,M WHERE A=0 label B 'Dato', C 'Tilgang - forsikrede', D 'Dato', E 'Afgang - forsikrede', F 'Dato', G 'Tilgang - udd.hjælp - udd.parate', H 'Dato', I 'Afgang - udd.hjælp -udd.parate', J 'Dato', K 'Tilgang - udd.hjælp - aktivitetsparate', L 'Date', M 'Afgang - udd.hjælp - aktivitetsparate'",
            myChartName: "chart2_4",
            myCaption: "Antal påbegyndte og afsluttede forløb"
        });
        
        addMyDrillDownChart3({
            myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
            mySheet: "Unge Afgang varighed",
            mySheetDrill: "UNGE Afgang varighed UDV",
            mySelect: "select B, C,D,E,F,G,H,I WHERE A=0",
            myChartName: "chart2_5",
            myCaption: "Antal afsluttede forløb fordelt på varighed"
        });

        // -----------------------------------------------------------------------------------------------------------
        // -----------------------Dashboard 3-------------------------------------------------------------------------
        // -----------------------------------------------------------------------------------------------------------
        var db3 = new Dashboard();
        db3.setDashboardTitle("Politisk mål: Integration");

        // function addMyLinkKpi(y) {
        //     var kpi = new KPIGroupComponent();
        //     kpi.setDimensions(12, 2);
        //     kpi.setCaption('Rapport om integration');
        //     kpi.addKPI('december', {
        //         caption: 'December 2016 - klik for at åbne rapport',
        //         value: 0
        //     });
        //     kpi.setKPIValueColor('december', '#fff');
        //     db3.addComponent(kpi);
        //     kpi.lock();
        //     $('#dbTarget').on('click', '#december', function (e) {
        //         e.stopPropagation();
        //         window.open("http://www.herning.dk/media/14638057/noegletal-integration-december-2016.pdf");
        //         return false;
        //     });
        //     kpi.unlock();
    
        // }
        // addMyLinkKpi();

        function addMyKpi3(myKpiObjectName, myKey) {
            myKpiObjectName = new KPIGroupComponent();
            myKey = String(myKey);
            myKpiObjectName.setDimensions(12, 2);
            myKpiObjectName.lock();
            db3.addComponent(myKpiObjectName);

            function initialize() {
                // The URL of the spreadsheet to source data from.
                var query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/" + myKey + "/gviz/tq?sheet=KPI");
                query.setQuery("select C,D,E WHERE B='Integration'");
                query.send(function processResponse(response) {

                    var myData = response.getDataTable();

                    myKpiObjectName.addKPI("KpiYd1_3", {
                        caption: String(myData.getValue(0, 0)),
                        value: Number(myData.getValue(0, 2))
                    });
                    myKpiObjectName.addKPI("KpiYd2_3", {
                        caption: String(myData.getValue(1, 0)),
                        value: Number(myData.getValue(1, 2)),
                        numberDecimalPoints: 1,
                        numberSuffix: " pct."
                    });
                    myKpiObjectName.addKPI("KpiYd3_3", {
                        caption: String(myData.getValue(2, 0)),
                        value: Number(myData.getValue(2, 2)),
                        numberDecimalPoints: 1,
                        numberSuffix: " pct."
                    });

                    // Don't forget to call unlock or the data won't be displayed
                    myKpiObjectName.unlock();
                    myKpiObjectName.setCaption("Nøgletal");// + numberLabels.toLowerCase());

                    addTooltip({
                        kpiId: "KpiYd1_3",
                        dateInput: String(myData.getValue(0, 1)),
                        prefix: "Fuldtidspersoner "
                    });

                    addTooltip({
                        kpiId: "KpiYd2_3",
                        dateInput: String(myData.getValue(1, 1)),
                        prefix: "Andel af arbejdsstyrken "
                    });

                    addTooltip({
                        kpiId: "KpiYd3_3",
                        dateInput: String(myData.getValue(2, 1)),
                        prefix: "Andel af arbejdsstyrken "
                    });

                });

            }

            initialize();
        };

        // addMyUniChart er en function, der viser et chart. Den er paremtriseret, så den kan anvendes til de fleste charts
        // - dog ikke med drillstep eller pie-charts. For at fungere skal den query, der henter data fra Spreadsheet have 
        // kategoriaksen som første element.
        // OBS - virker kun hvis funktionen Dashboard har navnet "db"
        function addMyUniChart3(myOptions) {
            var myChartType = myOptions.myChartType || 'line';
            var isStacked = myOptions.isStacked || false;
            var myChartHeight = myOptions.myChartHeight || 4;
            var myChartWidth = myOptions.myChartWidth || 4;
            var myKey = myOptions.myKey;
            var mySheet = myOptions.mySheet;
            var myQuery = myOptions.myQuery;
            var myChartName = myOptions.myChartName;
            var myCaption = myOptions.myCaption;
            var myShowLegend = myOptions.myShowLegend || true;

            myChartName = new ChartComponent();
            myChartName.setCaption(myCaption);
            myChartName.setDimensions(myChartWidth, myChartHeight);
            myChartName.setOption('showLegendFlag', myShowLegend);
            myChartName.lock();
            db3.addComponent(myChartName);
            var whatId = myChartName.getID();

            function initialize() {
                // The URL of the spreadsheet to source data from.
                var query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/" + myKey + "/gviz/tq?sheet=" + mySheet);
                query.setQuery(myQuery);
                query.send(function processResponse(response) {
                    var myData = response.getDataTable();

                    var arrayLabels = [];
                    var arrayHeadings = [];

                    var myNumberOfDataColumns = myData.getNumberOfColumns(0) - 1;
                    var myNumberOfRows = myData.getNumberOfRows(0);

                    var arrayInput = [];
                    for (var x = 1; x <= myNumberOfDataColumns; x++) {
                        var arrayElement = "arrayInput" + x;
                        arrayInput[arrayElement] = [];
                        for (var e = 0; e < myNumberOfRows; e++) {
                            arrayInput[arrayElement].push(myData.getValue(e, x).toFixed(1));
                        }
                    }

                    for (var i = 0; i < myNumberOfRows; i++) {
                        arrayLabels.push(myData.getValue(i, 0));
                    }

                    for (var h = 1; h <= myNumberOfDataColumns; h++) {
                        arrayHeadings.push(myData.getColumnLabel(h));
                    }

                    myChartName.setLabels(arrayLabels);


                    myChartName.addSeries("deakljoi1", arrayHeadings[0], arrayInput["arrayInput1"], {
                        seriesStacked: isStacked,
                        seriesDisplayType: myChartType
                    });

                    if (myNumberOfDataColumns >= 2) {
                        myChartName.addSeries("deakljoi2", arrayHeadings[1], arrayInput["arrayInput2"], {
                            seriesStacked: isStacked,
                            seriesDisplayType: myChartType
                        });
                    }

                    if (myNumberOfDataColumns >= 3) {
                        myChartName.addSeries("deakljoi3", arrayHeadings[2], arrayInput["arrayInput3"], {
                            seriesStacked: isStacked,
                            seriesDisplayType: myChartType
                        });
                    }

                    if (myNumberOfDataColumns >= 4) {
                        myChartName.addSeries("deakljoi4", arrayHeadings[3], arrayInput["arrayInput4"], {
                            seriesStacked: isStacked,
                            seriesDisplayType: myChartType
                        });
                    }
                    if (myNumberOfDataColumns >= 5) {
                        myChartName.addSeries("deakljoi5", arrayHeadings[4], arrayInput["arrayInput5"], {
                            seriesStacked: isStacked,
                            seriesDisplayType: myChartType
                        });
                    }
                    if (myNumberOfDataColumns >= 6) {
                        myChartName.addSeries("deakljoi6", arrayHeadings[5], arrayInput["arrayInput6"], {
                            seriesStacked: false,
                            seriesDisplayType: 'line',
                            seriesColor: "#d77fb4"
                        });
                    }
                    // Don't forget to call unlock or the data won't be displayed
                    myChartName.unlock();
                });
            }
            initialize();
        }

        ////// ---------------------------------------------------------------------

        addMyKpi3("Kpi3", "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw");

        addMyUniChart3({
            myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
            mySheet: "Integrationsydelse UDV",
            myQuery: "select F,H,I,J,K,L,G WHERE A='Tael' OR A<=12 ORDER BY A desc label G 'Total'",
            myChartWidth: 6,
            myChartHeight: 4,
            isStacked: true,
            myShowLegend: true,
            myChartType: "area",
            myChartName: "chart3_1",
            myCaption: "Antal personer"
        });

        addMyUniChart3({
            myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
            mySheet: "grund_nyfremtid_antal",
            myQuery: "select A,B",
            myChartWidth: 6,
            myChartHeight: 4,
            isStacked: false,
            myShowLegend: true,
            myChartType: "column",
            myChartName: "chart3_1",
            myCaption: "Ny fremtid: Deltagere"
        });        

        // -----------------------------------------------------------------------------------------------------------
        // -----------------------Dashboard 4-------------------------------------------------------------------------
        // -----------------------------------------------------------------------------------------------------------
        var db4 = new Dashboard();
        db4.setDashboardTitle("Politisk mål: Balancen på arbejdsmarkedet");
       
        function addMyKpi4(myKpiObjectName, myKey) {
            myKpiObjectName = new KPIGroupComponent();
            myKey = String(myKey);
            myKpiObjectName.setDimensions(12, 2);
            myKpiObjectName.lock();
            db4.addComponent(myKpiObjectName);

            function initialize() {
                // The URL of the spreadsheet to source data from.
                var query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/" + myKey + "/gviz/tq?sheet=KPI");
                query.setQuery("select C,D,E WHERE B='Balance'");
                query.send(function processResponse(response) {

                    var myData = response.getDataTable();

                    myKpiObjectName.addKPI("KpiYd1_4", {
                        caption: String(myData.getValue(0, 0)),
                        value: Number(myData.getValue(0, 2))
                    });
                    myKpiObjectName.addKPI("KpiYd2_4", {
                        caption: String(myData.getValue(1, 0)),
                        value: Number(myData.getValue(1, 2))
                        //numberDecimalPoints: 1,
                        //numberSuffix: " pct."
                    });
                    myKpiObjectName.addKPI("KpiYd3_4", {
                        caption: String(myData.getValue(2, 0)),
                        value: Number(myData.getValue(2, 2))
                        //numberDecimalPoints: 1,
                        //numberSuffix: " pct."
                    });
                    myKpiObjectName.addKPI("KpiYd4_4", {
                        caption: String(myData.getValue(3, 0)),
                        value: Number(myData.getValue(3, 2))
                        //numberDecimalPoints: 1,
                        //numberSuffix: " pct."
                    });
                    myKpiObjectName.addKPI("KpiYd5_4", {
                        caption: String(myData.getValue(4, 0)),
                        value: Number(myData.getValue(4, 2))
                        //numberDecimalPoints: 1,
                        //numberSuffix: " pct."
                    });
                    
                    myKpiObjectName.addKPI("KpiYd6_4", {
                        caption: String(myData.getValue(5, 0)),
                        value: Number(myData.getValue(5, 2))
                        //numberDecimalPoints: 1,
                        //numberSuffix: " pct."
                    });

                    // Don't forget to call unlock or the data won't be displayed
                    myKpiObjectName.unlock();
                    myKpiObjectName.setCaption("Nøgletal");// + numberLabels.toLowerCase());

                    addTooltip({
                        kpiId: "KpiYd1_4",
                        dateInput: String(myData.getValue(0, 1)),
                        prefix: "Antal fra RAS - Registerbaseret Arbejdsstyrke Statistik "
                    });

                    addTooltip({
                        kpiId: "KpiYd2_4",
                        dateInput: String(myData.getValue(1, 1)),
                        prefix: "Antal "
                    });

                    addTooltip({
                        kpiId: "KpiYd3_4",
                        dateInput: String(myData.getValue(2, 1)),
                        prefix: "Antal "
                    });
                    addTooltip({
                        kpiId: "KpiYd4_4",
                        dateInput: String(myData.getValue(2, 1)),
                        prefix: "Antal "
                    });
                    addTooltip({
                        kpiId: "KpiYd5_4",
                        dateInput: String(myData.getValue(3, 1)),
                        prefix: "Antal fra Jobnet "
                    });
                    addTooltip({
                        kpiId: "KpiYd6_4",
                        dateInput: String(myData.getValue(4, 1)),
                        prefix: "Antal fra Jobnet"
                    });

                });

            }

            initialize();
        }

        // addMyUniChart er en function, der viser et chart. Den er paremtriseret, så den kan anvendes til de fleste charts
        // - dog ikke med drillstep eller pie-charts. For at fungere skal den query, der henter data fra Spreadsheet have 
        // kategoriaksen som første element.
        // OBS - virker kun hvis funktionen Dashboard har navnet "db"
        function addMyUniChart4(options) {
            var myChartType = options.myChartType || 'line';
            var isStacked = options.isStacked || false;
            var myChartHeight = options.myChartHeight || 4;
            var myChartWidth = options.myChartWidth || 4;
            var myKey = options.myKey;
            var mySheet = options.mySheet;
            var myQuery = options.myQuery;
            var myChartName = options.myChartName;
            var myCaption = options.myCaption;
            var myShowLegend = options.myShowLegend || true;
            var myShowTotal = options.stackedTotalDisplay || false;
            var myNumberDecimalPoints = options.myNumberDecimalPoints || 0;

            myChartName = new ChartComponent();
            myChartName.setCaption(myCaption);
            myChartName.setDimensions(myChartWidth, myChartHeight);
            myChartName.setOption('showLegendFlag', myShowLegend);
            myChartName.setOption('numberThousandsSeparator', ".");
            myChartName.setOption('numberDecimalSeparator', ",");

            myChartName.lock();
            db4.addComponent(myChartName);
            var whatId = myChartName.getID();

            function initialize() {
                // The URL of the spreadsheet to source data from.
                var query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/" + myKey + "/gviz/tq?sheet=" + mySheet);
                query.setQuery(myQuery);
                query.send(function processResponse(response) {
                    var myData = response.getDataTable();

                    var arrayLabels = [];
                    var arrayHeadings = [];

                    var myNumberOfDataColumns = myData.getNumberOfColumns(0) - 1;
                    var myNumberOfRows = myData.getNumberOfRows(0);

                    var arrayInput = [];
                    for (var x = 1; x <= myNumberOfDataColumns; x++) {
                        var arrayElement = "arrayInput" + x;
                        arrayInput[arrayElement] = [];
                        for (var e = 0; e < myNumberOfRows; e++) {
                            var elementValue = Number(myData.getValue(e, x));
                            arrayInput[arrayElement].push(elementValue.toFixed(myNumberDecimalPoints));
                        }
                    }

                    for (var i = 0; i < myNumberOfRows; i++) {
                        arrayLabels.push(myData.getValue(i, 0));
                    }

                    for (var h = 1; h <= myNumberOfDataColumns; h++) {
                        arrayHeadings.push(myData.getColumnLabel(h));
                    }

                    myChartName.setLabels(arrayLabels);

                    myChartName.addSeries("deakljoi1", arrayHeadings[0], arrayInput["arrayInput1"], {
                        //numberDecimalSeparator: ",",
                        //numberThousandsSeparator: ".",
                        seriesStacked: isStacked,
                        seriesDisplayType: myChartType
                    });

                    if (myNumberOfDataColumns >= 2) {
                        myChartName.addSeries("deakljoi2", arrayHeadings[1], arrayInput["arrayInput2"], {
                            //numberDecimalSeparator: ",",
                            //numberThousandsSeparator: ".",
                            seriesStacked: isStacked,
                            seriesDisplayType: myChartType
                        });
                    }

                    if (myNumberOfDataColumns >= 3) {
                        myChartName.addSeries("deakljoi3", arrayHeadings[2], arrayInput["arrayInput3"], {
                            //numberDecimalSeparator: ",",
                            //numberThousandsSeparator: ".",
                            seriesStacked: isStacked,
                            seriesDisplayType: myChartType
                        });
                    }

                    if (myNumberOfDataColumns >= 4) {
                        myChartName.addSeries("deakljoi4", arrayHeadings[3], arrayInput["arrayInput4"], {
                            //numberDecimalSeparator: ",",
                            //numberThousandsSeparator: ".",
                            seriesStacked: isStacked,
                            seriesDisplayType: myChartType
                        });
                    }
                    if (myNumberOfDataColumns >= 5) {
                        myChartName.addSeries("deakljoi5", arrayHeadings[4], arrayInput["arrayInput5"], {
                            //numberDecimalSeparator: ",",
                            //numberThousandsSeparator: ".",
                            seriesStacked: isStacked,
                            seriesDisplayType: myChartType
                        });
                    }
                    if (myNumberOfDataColumns >= 6) {
                        myChartName.addSeries("deakljoi6", arrayHeadings[5], arrayInput["arrayInput6"], {
                            //numberDecimalSeparator: ",",
                            //numberThousandsSeparator: ".",
                            seriesStacked: isStacked,
                            seriesDisplayType: myChartType,
                            seriesColor: "#d77fb4"
                        });
                    }
                    if (myNumberOfDataColumns >= 7) {
                        myChartName.addSeries("deakljoi7", arrayHeadings[6], arrayInput["arrayInput7"], {
                            //numberDecimalSeparator: ",",
                            //numberThousandsSeparator: ".",
                            seriesStacked: isStacked,
                            seriesDisplayType: myChartType,
                            seriesColor: "#ce7058"
                        });
                    }
                    if (myNumberOfDataColumns >= 8) {
                        myChartName.addSeries("deakljoi8", arrayHeadings[7], arrayInput["arrayInput8"], {
                            //numberDecimalSeparator: ",",
                            //numberThousandsSeparator: ".",
                            seriesStacked: isStacked,
                            seriesDisplayType: myChartType,
                            seriesColor: "#eeeeee"
                        });
                    }
                    if (myNumberOfDataColumns >= 9) {
                        myChartName.addSeries("deakljoi9", arrayHeadings[8], arrayInput["arrayInput9"], {
                            //numberDecimalSeparator: ",",
                            //numberThousandsSeparator: ".",
                            seriesStacked: isStacked,
                            seriesDisplayType: myChartType,
                            seriesColor: '#6CDEC7'
                        });
                    }
                    //Options
                    if (isStacked === true) {
                        myChartName.setOption('stackedTotalDisplay', myShowTotal);
                    }

                    // Don't forget to call unlock or the data won't be displayed
                    myChartName.unlock();
                });
            }
            initialize();
        }

        //// ---------------------------------------------------------------------

        addMyKpi4("Kpi4", "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw");

        addMyUniChart4({
            myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
            mySheet: "Balance UDV",
            myQuery: "select B,D,C WHERE A='Tael' OR A<=12 ORDER BY A desc",
            myChartWidth: 6,
            myChartHeight: 4,
            isStacked: false,
            myShowLegend: false,
            myChartType: "line",
            myChartName: "chart4_1",
            myCaption: "Beskæftigelsesfrekvens",
            myNumberDecimalPoints: 1
        });
        addMyUniChart4({
            myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
            mySheet: "Balance UDV",
            myQuery: "select E, G, F WHERE A='Tael' OR A<=12 ORDER BY A desc",
            myChartWidth: 6,
            myChartHeight: 4,
            isStacked: false,
            myShowLegend: true,
            myChartType: "line",
            myChartName: "chart4_2",
            myCaption: "Jobomsætning",
            myNumberDecimalPoints: 1
        });
        addMyUniChart4({
            myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
            mySheet: "Balance UDV",
            myQuery: "select I, J WHERE I IS NOT NULL ORDER BY I",
            myChartWidth: 6,
            myChartHeight: 4,
            isStacked: false,
            myShowLegend: false,
            myChartType: "column",
            myChartName: "chart4_3",
            myCaption: "Nyoprettede stillinger fordelt på brancher"
        });
        addMyUniChart4({
            myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
            mySheet: "Balance UDV",
            myQuery: "select K, L WHERE K IS NOT NULL ORDER BY K",
            myChartWidth: 6,
            myChartHeight: 4,
            isStacked: false,
            myShowLegend: false,
            myChartType: "column",
            myChartName: "chart4_4",
            myCaption: "Antal arbejdspladser fordelt på brancher"
        });

        tdb.addDashboardTab(db, {
            title: "Oversigt",
            active: true
        });
        tdb.addDashboardTab(db2, {
            //active: true
        });
        tdb.addDashboardTab(db3, {

        });

        tdb.addDashboardTab(db4, {
            title: "Politisk mål: Balancen på arbejdsmarkedet"    
        });

    }, { tabbed: true });