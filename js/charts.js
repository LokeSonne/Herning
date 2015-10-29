function addMyAreaChartNoDrillDown(options) {
    var myKey = options.myKey
    var mySheet = options.mySheet
    var mySelect = options.mySelect
    var myChartName = options.myChartName
    var myCaption = options.myCaption

    var myChartName = new ChartComponent();
    myChartName.setCaption(myCaption);
    myChartName.setDimensions(4, 4);
    myChartName.lock();
    db.addComponent(myChartName);
    var whatId = myChartName.getID();

    function initialize() {
        // The URL of the spreadsheet to source data from.
        var query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/" + myKey + "/gviz/tq?sheet=" + mySheet);
        query.setQuery(mySelect);
        query.send(function processResponse(response) {
            myData = response.q
            var arrayLabels = new Array();
            var arrayInput1 = new Array();
            var arrayInput2 = new Array();
            var arrayInput3 = new Array();
            var arrayInput4 = new Array();
            var arrayInput5 = new Array();
            for (i = 0; i < myData.Lf.length; i++) {
                arrayLabels.push(myData.Lf[i].c[0].v);
                arrayInput1.push(myData.Lf[i].c[1].v);
                arrayInput2.push(myData.Lf[i].c[2].v);
                arrayInput3.push(myData.Lf[i].c[3].v);
                arrayInput4.push(myData.Lf[i].c[4].v);
                arrayInput5.push(myData.Lf[i].c[5].v);
            }
            // myChartComponentObject = myChartName;
            myChartName.setLabels(arrayLabels);
            myChartName.addSeries("yd1", "Kontanthjælp: jobparate", arrayInput1, {
                seriesStacked: true,
                seriesDisplayType: "area"
            });
            myChartName.addSeries("yd2", "Kontanthjælp: aktivitetsparate", arrayInput2, {
                seriesStacked: true,
                seriesDisplayType: "area"
            });
            myChartName.addSeries("yd3", "Kontanthjælp: åbenlyst udd.parate", arrayInput3, {
                seriesStacked: true,
                seriesDisplayType: "area"
            });
            myChartName.addSeries("yd4", "Udd.hjælp: udd.parate", arrayInput4, {
                seriesStacked: true,
                seriesDisplayType: "area"
            });
            myChartName.addSeries("yd5", "Udd.hjælp: aktivitetsparate", arrayInput5, {
                seriesStacked: true,
                seriesDisplayType: "area"
            });
            // Don't forget to call unlock or the data won't be displayed
            myChartName.unlock();
        });
    }
    initialize();

}