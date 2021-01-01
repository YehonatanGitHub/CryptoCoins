 
var result1;
function getAPI(api) {     
    $.ajax({
        url: `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${api[0]},${api[1]},${api[2]},${api[3]},${api[4]}&tsyms=USD`,
        async: false,
        success: function(result) {
         result1 = result;
         console.log(result);       
         console.log(result1);

            }});
}


function chart1(x) {

    var dataPoints1 = [];
    var dataPoints2 = [];
    var dataPoints3 = [];
    var dataPoints4 = [];
    var dataPoints5 = [];

    var options = {
        title: {
            text: "Live update of Coins to USD"
        },
        axisX: {
            title: "chart updates every 2 secs"
        },
        axisY: {
            suffix: "USD",
            includeZero: false
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            verticalAlign: "top",
            fontSize: 22,
            fontColor: "dimGrey",
            itemclick: toggleDataSeries
        },
        data: [{
            type: "line",
            xValueType: "dateTime",
            yValueFormatString: "###.0000USD",
            xValueFormatString: "hh:mm:ss TT",
            showInLegend: true,
            name: x[0],
            dataPoints: dataPoints1
        },
        {
            type: "line",
            xValueType: "dateTime",
            yValueFormatString: "###.0000USD",
            showInLegend: true,
            name: x[1],
            dataPoints: dataPoints2
        }, {
            type: "line",
            xValueType: "dateTime",
            yValueFormatString: "###.0000USD",
            showInLegend: true,
            name: x[2],
            dataPoints: dataPoints3
        },
        {
            type: "line",
            xValueType: "dateTime",
            yValueFormatString: "###.0000USD",
            showInLegend: true,
            name: x[3],
            dataPoints: dataPoints4
        },
        {
            type: "line",
            xValueType: "dateTime",
            yValueFormatString: "###.0000USD",
            showInLegend: true,
            name: x[4],
            dataPoints: dataPoints5
        }]
    };
    
    var chart = $("#chartContainer").CanvasJSChart(options);
    
    function toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        e.chart.render();
    }
    
    var updateInterval = 2000;
    // initial value
    getAPI(chartArray);

    var yValue1 = result1[x[0]].USD;
    var yValue2 = result1[x[1]].USD;
    var yValue3 = result1[x[2]].USD;
    var yValue4 = result1[x[3]].USD;
    var yValue5 = result1[x[4]].USD;
    
    console.log(yValue1);

    var time = new Date;

    // starting at 10.00 am
    // time.setHours(10);
    // time.setMinutes();
    // time.setSeconds();
    // time.setMilliseconds();
    
    function updateChart(count) {
        count = count || 1;
        // var deltaY1, deltaY2, deltaY3, deltaY4, deltaY5;
        for (var i = 0; i < count; i++) {
            time.setTime(time.getTime() + updateInterval);
            // deltaY1 = -1 + Math.random() * (1 + 1);
            // deltaY2 = -1 + Math.random() * (1 + 1);
            // deltaY3 = -1 + Math.random() * (1 + 1);
            // deltaY4 = -1 + Math.random() * (1 + 1);
            // deltaY5 = -1 + Math.random() * (1 + 1);
            getAPI(chartArray);
            // adding random value and rounding it to two digits. 
            var yValue1 = result1[x[0]].USD;
            var yValue2 = result1[x[1]].USD;
            var yValue3 = result1[x[2]].USD;
            var yValue4 = result1[x[3]].USD;
            var yValue5 = result1[x[4]].USD;
    
            // pushing the new values
            dataPoints1.push({
                x: time.getTime(),
                y: yValue1
            });
            dataPoints2.push({
                x: time.getTime(),
                y: yValue2
            });
            dataPoints3.push({
                x: time.getTime(),
                y: yValue3
            });
            dataPoints4.push({
                x: time.getTime(),
                y: yValue4
            });
            dataPoints5.push({
                x: time.getTime(),
                y: yValue5
            });
        }
    
        // updating legend text with  updated with y Value 
        options.data[0].legendText = `"${x[0]} : "` + yValue1 + "USD";
        options.data[1].legendText = `"${x[1]} : "` + yValue2 + "USD";
        options.data[2].legendText = `"${x[2]} : "` + yValue3 + "USD";
        options.data[3].legendText = `"${x[3]} : "` + yValue4 + "USD";
        options.data[4].legendText = `"${x[4]} : "` + yValue5 + "USD";
        $("#chartContainer").CanvasJSChart().render();
    }
    // generates first set of dataPoints 
    updateChart(100);
    setInterval(function () { updateChart() }, updateInterval);
    
   
    

    // console.log("result1" +result1[ZCN].USD);
    
    

    }

            
    // var array = [];
    
    // jQuery.each(result, function (p, val) {
    //     index = x.findIndex(x => x.symbol === p);
    //     array.push({
    //         id: x[index].ID,
    //         name: reportCoins[index].Name,
    //         symbol: reportCoins[index].symbol,
    //         usd: val.USD
    //     }
    //     )
    // });
