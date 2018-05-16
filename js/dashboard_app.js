'use strict';
google.load('visualization',
                    '1',
                    //{ callback: function() {self.initialize(); },
                        //Behøver ikke at loade nedenstående packages, da google.charts ikke benyttes
                       {
                           packages: ['table', 'map', 'corechart']
                       });

//google.charts.load('41', { packages: ['corechart'] });

//-------Chart functions

function addMyKpi(options) {
    var kpiObjectName = options.kpiObjectName;
    var key = options.key;
    var kpiIdPrefix = options.kpiIdPrefix;
    var db = options.db;
    var subject = options.subject;
    var queryString = "select C,D,E,N,O WHERE B=\'" + subject + "\'";

    kpiObjectName = new KPIGroupComponent();
    key = String(key);
    kpiObjectName.setDimensions(12, 2);
    kpiObjectName.lock();
    db.addComponent(kpiObjectName);

    function initialize() {
        // The URL of the spreadsheet to source data from.
        var query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/" + key + "/gviz/tq?sheet=KPI");
        query.setQuery(String(queryString));
        query.send(function processResponse(response) {

            var data = response.getDataTable();
            var numberOfDataRows = data.getNumberOfRows(0) - 1;

            for (var i = 0; i <= numberOfDataRows; i++) {
                var kpiId = kpiIdPrefix + i;
                var kpiOptions = {
                    caption: String(data.getValue(i, 0)),
                    value: Number(data.getValue(i, 2)),
                    numberDecimalPoints:0,
                    numberSuffix: ""
                }
                if (data.getValue(i, 3)) {
                    kpiOptions.numberSuffix = " " + String(data.getValue(i, 3))
                }
                if (data.getValue(i, 3) && data.getValue(i, 3) === "pct.") {
                    kpiOptions.value.toFixed(1);
                    kpiOptions.numberDecimalPoints = 1;
                }
                kpiObjectName.addKPI(kpiId, kpiOptions);
            }

            // Don't forget to call unlock or the data won't be displayed
            kpiObjectName.unlock();
            kpiObjectName.setCaption("Nøgletal");// + numberLabels.toLowerCase());

            for (var i = 0; i <= numberOfDataRows; i++) {
                var kpiId = kpiIdPrefix + i;
                var tooltipOptions = {
                    kpiId: kpiId,
                    dateInput: String(data.getValue(i, 1)),
                    prefix: ""
                }
                if (data.getValue(i, 4)) {
                    tooltipOptions.prefix = String(data.getValue(i, 4)) + " ";
                }
                addTooltip(tooltipOptions);
            }

        });

    }

    initialize();
}
function addMyDoubleKpi(myKpiObjectName, myKey,db) {
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

function addMyDrillDownChart1(options) {
    var db = options.db
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

function addMyDrillDownChart2(options) {
    var db = options.db;
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
    var db = options.db;
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

            mySeriesName1 = myData.getColumnLabel(1, 0);
            mySeriesName2 = myData.getColumnLabel(2, 0);
            mySeriesName3 = myData.getColumnLabel(3, 0);
            mySeriesName4 = myData.getColumnLabel(4, 0);
            mySeriesName5 = myData.getColumnLabel(5, 0);
            mySeriesName6 = myData.getColumnLabel(6, 0);
            mySeriesName7 = myData.getColumnLabel(7, 0);

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
function addMyUniChart(myOptions) {
    var db = myOptions.db;
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
    var seriesColorArray = myOptions.seriesColorArray || ['#5a9bd4', '#7ac36a', '#f15a60', '#faa65b', '#9e67ab', '#d77fb4', '#ce7058', '#6CDEC7', '#FFED0D', '#151132', '#FFED0D', '#151132']

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


            for (var j = 1; j <= myNumberOfDataColumns; j++) {
                var seriesName = "deakljoi" + j;
                var arrayInputNumber = "arrayInput" + j;
                var seriesOptions = {
                    seriesStacked: isStacked,
                    seriesDisplayType: myChartType,
                    seriesColor: seriesColorArray[j - 1]
                }
                if(arrayHeadings[j-1] === "Total") {
                    seriesOptions.seriesDisplayType = 'line';
                }
                myChartName.addSeries(seriesName, arrayHeadings[j-1], arrayInput[arrayInputNumber],seriesOptions);
            }
            // Don't forget to call unlock or the data won't be displayed
            myChartName.unlock();
        });
    }
    initialize();
}


    rf.StandaloneDashboard(function (tdb) {
        var _ = rf._;
        tdb.setDashboardTitle('Herning: Beskæftigelsesområdet');
        // -----------------------------------------------------------------------------------------------------------
        // -----------------------Dashboard 1-------------------------------------------------------------------------
        // -----------------------------------------------------------------------------------------------------------
        var db = new Dashboard();
        db.setDashboardTitle("Table In Razorfow");
    
        // Sætter parametre for dataudtræk og kører funktioner
        addMyDoubleKpi("Kpi2", "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",db);

        addMyUniChart({
            db: db,
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
            db: db,
            myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
            mySheet: "TILGANG",
            mySheetDrill: "UDV TILGANG",
            mySelect: "select B,C, D,E ,F,G, H,I, J,K, L,M, N,O, P,Q, R,S, T,U WHERE A=0 label B 'Dato', C 'Forsikrede', D 'Dato', E 'Kontanthjælp', F 'Date', G 'Uddannelseshjælp', H 'Date', I 'Sygedagpenge', J 'Date', K 'Jobafklaring', L 'Date', M 'Fleksjob', N 'Date', O 'Ledighedsyd.', P 'Date', Q 'Ressourceforløb', R 'Date', S 'Førtidspension', T 'Date', U 'Revalidering'",
            myChartName: "chart1_2",
            myCaption: "Antal påbegyndte forløb"
        });

        addMyDrillDownChart1({
            db: db,
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
        db2.setDashboardTitle("Unge under 25 år");

        addMyKpi({
            kpiObjectName: "Kpi2",
            key: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
            kpiIdPrefix: "kpi2",
            db: db2,
            subject: "Unge1"
        });

        addMyKpi({
            kpiObjectName: "Kpi22",
            key: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
            kpiIdPrefix: "kpi22",
            db: db2,
            subject: "Unge2"
        });

        addMyUniChart({
            db: db2,
            myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
            mySheet: "Unge UDV",
            myQuery: "select B,AQ,AS,AR WHERE A='Tael' OR A<=12 ORDER BY A desc",
            myChartWidth: 6,
            myChartHeight: 4,
            isStacked: false,
            myShowLegend: true,
            myChartType: "line",
            myChartName: "chart2_1",
            myCaption: "Unge offentligt forsørgede (andel af AS)"
        });
        addMyUniChart({
            db: db2,
            myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
            mySheet: "Ungeledighed",
            myQuery: "select AA, AB,AC,AD,AE,AF,AG,AH,AI,AJ,AK,AL  WHERE AN='Tael' OR AN=1 ORDER BY AN desc",
            myChartWidth: 6,
            myChartHeight: 4,
            isStacked: true,
            myShowLegend: true,
            myChartType: "column",
            myChartName: "chart2_3",
            myCaption: "Unge offentligt forsørgede (andel af AS) - fordelt på sagstyper"
        });
        addMyUniChart({
            db: db2,
            myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
            mySheet: "Unge UDV",
            myQuery: "select F,G,H,I,M,O,Q,S,U,W,Y, G+H+I+M+O+Q+S+U+W+Y WHERE A='Tael' OR A<=12 ORDER BY A desc label G+H+I+M+O+Q+S+U+W+Y 'Total'",
            myChartWidth: 6,
            myChartHeight: 4,
            isStacked: true,
            myShowLegend: true,
            myChartType: "area",
            myChartName: "chart2_4",
            myCaption: "Fuldtidspersoner"
        });

        // addMyDrillDownChart2({
        //     db: db2,
        //     myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
        //     mySheet: "TA UNGE",
        //     mySheetDrill: "TA UNGE UDV",
        //     mySelect: "select B,C, D,E, F,G, H,I, J,K, L,M WHERE A=0 label B 'Dato', C 'Tilgang - forsikrede', D 'Dato', E 'Afgang - forsikrede', F 'Dato', G 'Tilgang - udd.hjælp - udd.parate', H 'Dato', I 'Afgang - udd.hjælp -udd.parate', J 'Dato', K 'Tilgang - udd.hjælp - aktivitetsparate', L 'Date', M 'Afgang - udd.hjælp - aktivitetsparate'",
        //     myChartName: "chart2_5",
        //     myCaption: "Antal påbegyndte og afsluttede forløb"
        // });

        // -----------------------------------------------------------------------------------------------------------
        // -----------------------Dashboard 3-------------------------------------------------------------------------
        // -----------------------------------------------------------------------------------------------------------
        var db3 = new Dashboard();
        db3.setDashboardTitle("Integration");

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

        addMyKpi({
            kpiObjectName: "Kpi3",
            key: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
            kpiIdPrefix: "kpi3",
            db: db3,
            subject: "Integration"
        });

        // addMyUniChart3({
        //     myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
        //     mySheet: "Integrationsydelse UDV",
        //     myQuery: "select M,P,Q,R WHERE A='Tael' OR A<=12 ORDER BY A desc",
        //     myChartWidth: 12,
        //     myChartHeight: 4,
        //     isStacked: false,
        //     myShowLegend: true,
        //     myChartType: "line",
        //     myChartName: "chart3_1",
        //     myCaption: "Andel af IY-modtagere omfattet integrationsprogrammet, der er jobparate"
        // });

        addMyUniChart({
            db: db3,
            myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
            mySheet: "Beskæftigelse for flygninge UDV",
            myQuery: "select B,C,D,E WHERE A='Tael' OR A<=12 ORDER BY A desc",
            myChartWidth: 6,
            myChartHeight: 4,
            isStacked: false,
            myShowLegend: true,
            myChartType: "line",
            myChartName: "chart3_1",
            myCaption: "Andel beskæft. flygtninge og fam. til flygtninge i måneden, pct."
        });

        addMyUniChart({
            db: db3,
            myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
            mySheet: "Integrationsydelse UDV",
            myQuery: "select M,S,T WHERE A='Tael' OR A<=12 ORDER BY A desc",
            myChartWidth: 6,
            myChartHeight: 4,
            isStacked: true,
            myShowLegend: true,
            myChartType: "area",
            myChartName: "chart3_2",
            myCaption: "Andel i praktik og løntilskud blandt modtagere af integrationsydelse"
        });    

        // -----------------------------------------------------------------------------------------------------------
        // -----------------------Dashboard 4-------------------------------------------------------------------------
        // -----------------------------------------------------------------------------------------------------------
        var db4 = new Dashboard();
        db4.setDashboardTitle("Rekruttering og fastholdelse");

        addMyKpi({
            kpiObjectName: "Kpi4",
            key: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
            kpiIdPrefix: "kpi4",
            db: db4,
            subject: "Balance"
        });

        addMyUniChart({
            db: db4,
            myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
            mySheet: "Besk UDV",
            myQuery: "select B,D,C WHERE A='Tael' OR A<=12 ORDER BY A desc",
            myChartWidth: 6,
            myChartHeight: 4,
            isStacked: false,
            myShowLegend: true,
            myChartType: "line",
            myChartName: "chart4_1",
            myCaption: "Lønmodtagere efter bopæl og arbejdssted",
            myNumberDecimalPoints: 1
        });

        addMyUniChart({
            db: db4,
            myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
            mySheet: "Balance UDV",
            myQuery: "select B,D,C WHERE A='Tael' OR A<=12 ORDER BY A desc",
            myChartWidth: 6,
            myChartHeight: 4,
            isStacked: false,
            myShowLegend: false,
            myChartType: "line",
            myChartName: "chart4_2",
            myCaption: "Beskæftigelsesfrekvens",
            myNumberDecimalPoints: 1
        });
        addMyUniChart({
            db: db4,
            myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
            mySheet: "Balance UDV",
            myQuery: "select E, G, F WHERE A='Tael' OR A<=12 ORDER BY A desc",
            myChartWidth: 6,
            myChartHeight: 4,
            isStacked: false,
            myShowLegend: true,
            myChartType: "line",
            myChartName: "chart4_3",
            myCaption: "Jobomsætning",
            myNumberDecimalPoints: 1
        });

        // -----------------------------------------------------------------------------------------------------------
        // -----------------------Dashboard 5-------------------------------------------------------------------------
        // -----------------------------------------------------------------------------------------------------------
        var db5 = new Dashboard();
        db5.setDashboardTitle("Borgere på kanten");

        addMyKpi({
            kpiObjectName: "Kpi5",
            key: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
            kpiIdPrefix: "kpi5",
            db: db5,
            subject: "Borgere på kanten"
        });

        addMyUniChart({
            db: db5,
            myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
            mySheet: "Kontanthjaelp og uddannelseshjaelp UDV",
            myQuery: "select AM,AO,AP WHERE A='Tael' OR A<=12 ORDER BY A desc",
            myChartWidth: 6,
            myChartHeight: 4,
            isStacked: false,
            myShowLegend: true,
            myChartType: "line",
            myChartName: "chart5_1",
            myCaption: "Andel jobparate kontanthjælpsmodtagere med løntimer",
            myNumberDecimalPoints: 1
        });
        addMyUniChart({
            db: db5,
            myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
            mySheet: "Kontanthjaelp og uddannelseshjaelp UDV",
            myQuery: "select B,C WHERE A='Tael' OR A<=12 ORDER BY A desc",
            myChartWidth: 6,
            myChartHeight: 4,
            isStacked: false,
            myShowLegend: false,
            myChartType: "line",
            myChartName: "chart5_2",
            myCaption: "Antal jobparate kontanthjælpsmodtagere",
        });

        addMyUniChart({
            db: db5,
            myKey: "1DJ4sedvHHzhP60tlPILHYEEeiVADGGVArJPLVbTkzrw",
            mySheet: "UDV AFGANG",
            myQuery: "select X,Y WHERE A='Tael' OR A<=12 ORDER BY A desc",
            myChartWidth: 6,
            myChartHeight: 4,
            isStacked: false,
            myShowLegend: false,
            myChartType: "line",
            myChartName: "chart5_3",
            myCaption: "Antal afsluttede jobparate kontanthjælpsmodtagere",
        });

        tdb.addDashboardTab(db, {
            title: "Oversigt",
            active: true
        });
        tdb.addDashboardTab(db2, {
        });
        tdb.addDashboardTab(db3, {
        });
        tdb.addDashboardTab(db4, {
        });
        tdb.addDashboardTab(db5, {
        });

    }, { tabbed: true });