function addTooltip2(options) {
    var kpiId = options.kpiId;
    var dateInput = options.dateInput || "";
    var prefix = options.prefix;
    var kpiIdRef = String("#" + kpiId);
    var tooltipId = "tooltip" + kpiId;
    var tooltipIdRef = String("#" + tooltipId);

    var showTooltip = function (event) {
        //alert("hello!");
        $(tooltipIdRef).remove();
        $("<div id=" + tooltipId + " class=\"rfTooltip\"><span class=\"rfTooltipMainLabel\">" + prefix + dateInput.toLowerCase() + "</span></div>")
          .appendTo('body').find(tooltipIdRef);
        changeTooltipPosition(event);
    };

    var changeTooltipPosition = function (event) {
        var tooltipX = event.pageX - 50;
        var tooltipY = event.pageY - 50;
        $('div.rfTooltip').css({ top: tooltipY, left: tooltipX });
    };

    var hideTooltip = function () {
        $(tooltipIdRef).remove();
    };

    $(kpiIdRef).bind({
        mousemove: changeTooltipPosition,
        mouseenter: showTooltip,
        mouseleave: hideTooltip
    });

};


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
// OBS - virker kun hvis funktionen Dashboard har navnet "db"
function addMyUniChart(options) {
    var myChartType = options.myChartType || 'line'
    var isStacked = options.isStacked || false
    var myChartHeight = options.myChartHeight || 4
    var myChartWidth = options.myChartWidth || 4
    var myKey = options.myKey
    var mySheet = options.mySheet
    var myQuery = options.myQuery
    var myChartName = options.myChartName
    var myCaption = options.myCaption
    var myShowLegend = options.myShowLegend || true
    var myShowTotal = options.stackedTotalDisplay || false
    var myNumberDecimalPoints = options.myNumberDecimalPoints || 0

    var myChartName = new ChartComponent();
    myChartName.setCaption(myCaption);
    myChartName.setDimensions(myChartWidth, myChartHeight);
    myChartName.setOption('showLegendFlag', myShowLegend);
    myChartName.setOption('numberThousandsSeparator', ".");
    myChartName.setOption('numberDecimalSeparator', ",");
    
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
                for (var e = 0; e < myNumberOfRows ; e++) {
                    arrayInput[arrayElement].push(myData.getValue(e, x).toFixed(myNumberDecimalPoints));
                }
            }

            for (var i = 0; i < myNumberOfRows ; i++) {
                arrayLabels.push(myData.getValue(i, 0));
            };

            for (var h = 1; h <= myNumberOfDataColumns ; h++) {
                arrayHeadings.push(myData.getColumnLabel(h));
            };


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
            if (isStacked == true) {
                myChartName.setOption('stackedTotalDisplay', myShowTotal);
            }

            // Don't forget to call unlock or the data won't be displayed
            myChartName.unlock();
        });
    }
    initialize();
}

////Kode der kan anvendes til at lave click events på elementer uden ID
//var kpi = new KPIComponent();
//kpi.setDimensions(3, 2);
//kpi.setCaption('Sales in the last 24 hours');
//kpi.setID("hello");
//kpi.setValue(3145, {
//    numberPrefix: "$"
//});

//db.addComponent(kpi);

//$(document).on('click', 'div.rfKPICaption', function (e) {
//    e.stopPropagation();
//    var text = $('div.rfKPICaption').text();
//    var text = $(e.target).text();
//    if (text === 'Sales in the last 24 hours') {
//        window.location.assign("forsikrede.html");
//        return false;
//    }
//});

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

    // myChartName.addDrillStep(function (done, params) {
    // var myWhereCond = "\"" + params.label + "\""
    // function initialize2() {
    // // The URL of the spreadsheet to source data from.
    // var query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/1Qw80yjGuRbhzVHUUIaVwerd9BBBoI83PKcwMdbodn1U/gviz/tq?sheet=adagpenge");
    // query.setQuery("select A, E WHERE A = " + myWhereCond);			
    // query.send(function processResponse(response){
    // myData = response.q	
    // var arrayLabels = new Array();
    // var arrayInput = new Array();
    // for (i = 0; i < myData.Gf.length; i++) {
    // arrayLabels.push(myData.Gf[i].c[0].v);
    // arrayInput.push(myData.Gf[i].c[1].v);
    // }
    // // myChartComponentObject = myChartName;
    // myChartName.setLabels(arrayLabels);
    // myChartName.addSeries("rate2", "0 - 33 pct.", arrayInput, {
    // seriesStacked: true,
    // seriesDisplayType: "column"
    // });
    // // Don't forget to call unlock or the data won't be displayed
    // done();
    // });
    // }				
    // initialize2();				
    // });

}