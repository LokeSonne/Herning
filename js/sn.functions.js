function addTooltip(options) {
    var kpiId = options.kpiId;
    var dateInput = options.dateInput || "";
    var prefix = options.prefix;
    var kpiIdRef = String("#" + kpiId);
    var tooltipId = "tooltip" + kpiId;
    var tooltipIdRef = String("#" + tooltipId);

    $(document).on('mouseenter', kpiIdRef, function (e) {
            var tooltipX = e.pageX - 50;
            var tooltipY = e.pageY - 50;
        $('body').append("<div id=" + tooltipId + " class=\"rfTooltip\"><span class=\"rfTooltipMainLabel\">" + prefix + "<br>" + dateInput.toLowerCase() + "</span></div>");
        $('div.rfTooltip').css({ top: tooltipY, left: tooltipX });
    });

    $(document).on('mouseleave', kpiIdRef, function (e) {
        $(tooltipIdRef).remove();
    });

    $(document).on('mousemove', kpiIdRef, function (e) {
        var tooltipX = e.pageX - 50;
        var tooltipY = e.pageY - 50;
        $('div.rfTooltip').css({ top: tooltipY, left: tooltipX });
    });
};

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
    var myNumberDecimalPoints = myOptions.myNumberDecimalPoints || 0;

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
                    arrayInput[arrayElement].push(myData.getValue(e, x).toFixed(myNumberDecimalPoints));
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
                    seriesColor: seriesColorArray[j - 1],
                    numberDecimalPoints: 4
                }
                if (arrayHeadings[j - 1] === "Total") {
                    seriesOptions.seriesDisplayType = 'line';
                }
                myChartName.addSeries(seriesName, arrayHeadings[j - 1], arrayInput[arrayInputNumber], seriesOptions);
            }
            // Don't forget to call unlock or the data won't be displayed
            myChartName.unlock();
        });
    }
    initialize();
}


function addMyKpiComponents(myKpiObjectName,myKey) {	
    var myKpiObjectName = new KPIGroupComponent();
    var myKey = String(myKey);
    myKpiObjectName.setDimensions (12, 2);
    myKpiObjectName.lock ();
    db1.addComponent(myKpiObjectName);

    function initialize() {
        // The URL of the spreadsheet to source data from.
        var query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/" + myKey + "/gviz/tq?sheet=Fuldtids til forside");
        query.setQuery("select A,B, E,F, C,D, G,H, I,J, K,L, AL,AM, AN,AO LIMIT 1");			
        query.send(function processResponse(response){

            var myData = response.getDataTable();
            var numberLabels = new String();
            var numberInput1 = new Number();
            var numberInput2 = new Number();
            var numberInput3 = new Number();
            var numberInput4 = new Number();
            var numberInput5 = new Number();
            var numberInput6 = new Number();
            var numberInput7 = new Number();
            var numberInput8 = new Number();

            var dateInput1 = new String();
            var dateInput2 = new String()
            var dateInput3 = new String()
            var dateInput4 = new String()
            var dateInput5 = new String()
            var dateInput6 = new String()
            var dateInput7 = new String()
            var dateInput8 = new String()


            numberLabels = String(myData.getColumnLabel(0));

            numberInput1 = Number(myData.getValue(0, 1));
            numberInput2 = Number(myData.getValue(0, 3));
            numberInput3 = Number(myData.getValue(0, 5));
            numberInput4 = Number(myData.getValue(0, 7));
            numberInput5 = Number(myData.getValue(0, 9));
            numberInput6 = Number(myData.getValue(0, 11));
            numberInput7 = Number(myData.getValue(0, 13));
            numberInput8 = Number(myData.getValue(0, 15));

            dateInput1 = String(myData.getValue(0, 0));
            dateInput2 = String(myData.getValue(0, 2));
            dateInput3 = String(myData.getValue(0, 4));
            dateInput4 = String(myData.getValue(0, 6));
            dateInput5 = String(myData.getValue(0, 8));
            dateInput6 = String(myData.getValue(0, 10));
            dateInput7 = String(myData.getValue(0, 12));
            dateInput8 = String(myData.getValue(0, 14));

            myKpiObjectName.addKPI("KpiYd1", {
                caption: "Forsikrede ledige og arbejdsmarkedsydelse",
                value: numberInput1,
                //numberPrefix: dateInput1.toLowerCase()
            });
            myKpiObjectName.addKPI("KpiYd2", {
                caption: "Sygedagpenge og jobafklaring",
                value: numberInput2,
                // numberSuffix: " pct."
            });
            myKpiObjectName.addKPI("KpiYd3", {
                caption: "Kontanthjælp og uddannelseshjælp",
                value: numberInput3,
                // numberSuffix: " pct."
            });	
            myKpiObjectName.addKPI("KpiYd4", {
                caption: "Fleksjob og ledighedsydelse",
                value: numberInput4,
                // numberSuffix: " pct."
            });
            myKpiObjectName.addKPI("KpiYd5", {
                caption: "Ressourceforløb og revalidering",
                value: numberInput5,
                // numberSuffix: " pct."
            });
            myKpiObjectName.addKPI("KpiYd6", {
                caption: "Førtidspension",
                value: numberInput6,
                // numberSuffix: " pct."
            });
            myKpiObjectName.addKPI("KpiYd7", {
                caption: "Ledighedsprocent - Herning",
                value: numberInput7,
                // numberSuffix: " pct."
            });
            myKpiObjectName.addKPI("KpiYd8", {
                caption: "Ledighedsprocent - hele landet",
                value: numberInput8,
                // numberSuffix: " pct."
            });
            // Don't forget to call unlock or the data won't be displayed
            myKpiObjectName.unlock ();
            myKpiObjectName.setCaption("Nøgletal opgjort i fuldtidspersoner");// + numberLabels.toLowerCase());

            // Dette er kode til hyperlinks på Kpi. Koden gentages for hver Kpi.
            $('#dbTarget').on('click', '#KpiYd1', function(e) {
                e.stopPropagation();
                window.location.assign("forsikrede.html");
                return false;
            });	
            $("#KpiYd1").addClass("KPIGroupComponentLink");

            // Dette er kode til hyperlinks på Kpi. Koden gentages for hver Kpi.
            $('#dbTarget').on('click', '#KpiYd2', function(e) {
                e.stopPropagation();
                window.location.replace("sygedagpenge.html");
                return false;
            });	
            $( "#KpiYd2" ).addClass( "KPIGroupComponentLink" );	

            $('#dbTarget').on('click', '#KpiYd3', function(e) {
                e.stopPropagation();
                window.location.replace("kontanthjaelp.html");
                return false;
            });	
            $( "#KpiYd3" ).addClass( "KPIGroupComponentLink" );	

            // Dette er kode til hyperlinks på Kpi. Koden gentages for hver Kpi.
            $('#dbTarget').on('click', '#KpiYd4', function(e) {
                e.stopPropagation();
                window.location.replace("fleks.html");
                return false;
            });	
            $( "#KpiYd4" ).addClass( "KPIGroupComponentLink" );	

            $('#dbTarget').on('click', '#KpiYd5', function(e) {
                e.stopPropagation();
                window.location.replace("ressource.html");
                return false;
            });	
            $( "#KpiYd5" ).addClass( "KPIGroupComponentLink" );	

            // Dette er kode til hyperlinks på Kpi. Koden gentages for hver Kpi.
            $('#dbTarget').on('click', '#KpiYd6', function(e) {
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
                dateInput: dateInput1,
                prefix: "Fuldtidspersoner opgjort i "
            });

            addTooltip({
                kpiId: "KpiYd2",
                dateInput: dateInput2,
                prefix: "Fuldtidspersoner opgjort i "
            });

            addTooltip({
                kpiId: "KpiYd3",
                dateInput: dateInput3,
                prefix: "Fuldtidspersoner opgjort i "
            });

            addTooltip({
                kpiId: "KpiYd4",
                dateInput: dateInput4,
                prefix: "Fuldtidspersoner opgjort i "
            });

            addTooltip({
                kpiId: "KpiYd5",
                dateInput: dateInput5,
                prefix: "Fuldtidspersoner opgjort i "
            });

            addTooltip({
                kpiId: "KpiYd6",
                dateInput: dateInput6,
                prefix: "Fuldtidspersoner opgjort i "
            });

        });

    };


    initialize();				

}	


// Definerer nyt chart og kører getData, der henter data. 
function addMyDrillDownChartLayer(options) {
    var myKey = options.myKey
    var mySheet = options.mySheet
    var mySelect = options.mySelect
    var myChartName = options.myChartName
    var myCaption = options.myCaption
    var callback = options.callback

    var myKeyDrill = options.myKeyDrill || options.myKey
    var mySheetDrill = options.mySheetDrill || options.mySheet
    var mySelectDrill = options.mySelectDrill || options.mySelect
    var myChartNameDrill = options.myChartNameDrill || options.myChartName
    var myCaptionDrill = options.myCaptionDrill || options.myCaption

    var myChartName = new ChartComponent();
    myChartName.setCaption(myCaption);
    myChartName.setDimensions(7, 6);
    myChartName.lock();
    db1.addComponent(myChartName);

    function initialize() {
        // The URL of the spreadsheet to source data from.
        var query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/" + myKey + "/gviz/tq?sheet=Fuldtids UDV");
        query.setQuery("select B, C+E, G+I, K+M, O+Q, S+U, W, C+E+G+I+K+M+O+Q+S+U+W ORDER BY A DESC LIMIT 13 OFFSET 11");
        query.send(function processResponse(response) {
            var myData = response.getDataTable();
            var arrayLabels = new Array();
            var arrayInput1 = new Array();
            var arrayInput2 = new Array();
            var arrayInput3 = new Array();
            var arrayInput4 = new Array();
            var arrayInput5 = new Array();
            var arrayInput6 = new Array();
            var arrayInput7 = new Array();
            var i;
            for (i = 0; i < myData.getNumberOfRows(0) ; i++) {
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
            myChartName.addSeries("yd1", "Forsikrede og arb.ydelse", arrayInput1, {
                seriesStacked: true,
                seriesDisplayType: "area"
            });
            myChartName.addSeries("yd2", "Kontanthjælp og udd.ydelse", arrayInput2, {
                seriesStacked: true,
                seriesDisplayType: "area"
            });
            myChartName.addSeries("yd3", "Sygedagpenge og jobafklaring", arrayInput3, {
                seriesStacked: true,
                seriesDisplayType: "area"
            });
            myChartName.addSeries("yd4", "Fleksjob og ledighedsydelse", arrayInput4, {
                seriesStacked: true,
                seriesDisplayType: "area"
            });
            myChartName.addSeries("yd5", "Førtidspension og res.forløb", arrayInput5, {
                seriesStacked: true,
                seriesDisplayType: "area"
            });
            myChartName.addSeries("yd6", "Revalidering", arrayInput6, {
                seriesStacked: true,
                seriesDisplayType: "area"
            });
            myChartName.addSeries("yd7", "Total", arrayInput7, {
                seriesStacked: false,
                seriesDisplayType: "line",
                seriesColor: "#000"
            });
            myChartName.setOption('stackedTotalDisplay', true);
            // Don't forget to call unlock or the data won't be displayed
            myChartName.unlock();
        });
    }
    initialize();
}

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
                    numberDecimalPoints: 0,
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

    //function addMyDrillDownChart(options) {
    //    var myKey = options.myKey
    //    var mySheet = options.mySheet
    //    var mySelect = options.mySelect
    //    var myChartName = options.myChartName
    //    var myCaption = options.myCaption
    //    var callback = options.callback

    //    var myKeyDrill = options.myKeyDrill || options.myKey
    //    var mySheetDrill = options.mySheetDrill || options.mySheet
    //    var mySelectDrill = options.mySelectDrill || options.mySelect
    //    var myChartNameDrill = options.myChartNameDrill || options.myChartName
    //    var myCaptionDrill = options.myCaptionDrill || options.myCaption

    //    var myChartName = new ChartComponent();
    //    myChartName.setCaption(myCaption);
    //    myChartName.setDimensions(5, 3);
    //    myChartName.lock();
    //    db.addComponent(myChartName);

    //    //function loadApi() {
    //    //  google.load("visualization", "1", {"callback" : initialize});
    //    //}
    //    function initialize() {
    //        // The URL of the spreadsheet to source data from.
    //        var spreadsheetUrl = String("https://docs.google.com/spreadsheets/d/" + myKey + "/gviz/tq?sheet=" + mySheet);
    //        var query = new google.visualization.Query(spreadsheetUrl);
    //        query.setQuery(mySelect);
    //        query.send(function processResponse(response) {

    //            if (response.isError()) {
    //                alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage() + ' ' + response.getReasons());
    //                return;
    //            }

    //            var myData = response.getDataTable();
    //            var arrayLabels = new Array();
    //            var arrayInput = new Array();
    //            // TODO: legendText skal hente måned fra datasæt. Kræver lidt ændringer i SQL
    //            // var legendText = myData.Gf[0].c[0].v;
    //            var i;
    //            for (i = 0; i < myData.getNumberOfColumns(0) ; i++) {
    //                arrayLabels.push(myData.getColumnLabel(i, 0));
    //                arrayInput.push(myData.getValue(0, i))
    //            }
    //            // myChartComponentObject = myChartName;
    //            myChartName.setLabels(arrayLabels);
    //            myChartName.addSeries("pb1", "Seneste måned", arrayInput, {
    //                seriesStacked: true,
    //                seriesDisplayType: "column"
    //            });
    //            myChartName.setOption('showLegendFlag', false);
    //            // Don't forget to call unlock or the data won't be displayed
    //            myChartName.unlock();
    //        });
    //    }
    //    initialize();
    //    //google.setOnLoadCallback(initialize);
    //    myChartName.addDrillStep(function (done, params) {
    //        var myWhereCond = "\"" + params.label + "\"";

    //        if (params.label === "Forsikrede") {
    //            var columnName
    //            columnName = "B,C";
    //        }
    //        if (params.label === "Arbejdsmarkedsyd.") {
    //            var columnName
    //            columnName = "B,E";
    //        }
    //        if (params.label === "Kontanthjælp") {
    //            var columnName
    //            columnName = "F,G";
    //        }
    //        if (params.label === "Uddannelseshjælp") {
    //            var columnName
    //            columnName = "H,I";
    //        }
    //        if (params.label === "Sygedagpenge") {
    //            var columnName
    //            columnName = "J,K";
    //        }
    //        if (params.label === "Jobafklaring") {
    //            var columnName
    //            columnName = "J,M";
    //        }
    //        if (params.label === "Fleksjob") {
    //            var columnName
    //            columnName = "N,O";
    //        }
    //        if (params.label === "Ledighedsyd.") {
    //            var columnName
    //            columnName = "P,Q";
    //        }
    //        if (params.label === "Ressourceforløb") {
    //            var columnName
    //            columnName = "T,S";
    //        }
    //        if (params.label === "Førtidspension") {
    //            var columnName
    //            columnName = "T,U";
    //        }
    //        if (params.label === "Revalidering") {
    //            var columnName
    //            columnName = "V,W";
    //        }

    //        function initialize2() {
    //            // The URL of the spreadsheet to source data from.
    //            var query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/" + myKey + "/gviz/tq?sheet=" + mySheet);
    //            query.setQuery("select " + columnName + " ORDER BY A desc ");
    //            query.send(function processResponse(response) {
    //                var myData = response.getDataTable();
    //                var arrayLabels = new Array();
    //                var arrayInput1 = new Array();
    //                var arrayLabels_ny = new Array();
    //                var arrayInput1_ny = new Array();
    //                var arrayInput2 = new Array();
    //                var i;
    //                for (i = 12; i <= 23; i++) {
    //                    arrayLabels.push(myData.getValue(i, 0));
    //                    arrayInput1.push(myData.getValue(i, 1));
    //                }
    //                var e;
    //                for (e = 0; e <= 11; e++) {
    //                    arrayInput2.push(myData.getValue(e, 1));
    //                }
    //                // myChartComponentObject = myChartName;
    //                myChartName.setLabels(arrayLabels);
    //                myChartName.setOption('showLegendFlag', true);

    //                myChartName.addSeries("rate1", "seneste 12 mdr.", arrayInput1, {
    //                    seriesStacked: false,
    //                    seriesDisplayType: "line"
    //                });
    //                myChartName.addSeries("rate2", "forrige 12 mdr.", arrayInput2, {
    //                    seriesStacked: false,
    //                    seriesDisplayType: "line"
    //                });

    //                // Don't forget to call unlock or the data won't be displayed
    //                done();
    //            });
    //        }
    //        initialize2();
    //    });

    //}