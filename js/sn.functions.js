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
                    numberDecimalPoints: myNumberDecimalPoints
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

function addMyKpi(options) {
    var kpiObjectName = options.kpiObjectName;
    var key = options.key;
    var kpiIdPrefix = options.kpiIdPrefix;
    var db = options.db;
    var subject = options.subject;
    var queryString = "select C,D,E,N,O,P WHERE B=\'" + subject + "\'";

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
                if (data.getValue(i, 5)) {
                    var decimalPoints = data.getValue(i, 5);
                    kpiOptions.value.toFixed(decimalPoints);
                    kpiOptions.numberDecimalPoints = decimalPoints;
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