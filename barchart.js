// Create root element
// "chartdiv" is the Div ID in the HTML file
var root = am5.Root.new("chartdiv"); 

// Set Themes
root.setThemes([
    am5themes_Animated.new(root)
  ]);

// Create XY chart
var chart = root.container.children.push(
    am5xy.XYChart.new(
        root,
        {
            panX:false,
            panY:false,
            wheelX:"panX",
            wheelY:"zoomX"
        }
    )
);

// Create X Axes as "Date" Axis
var X_Axis_parameters={
    maxDeviation: 0,
    baseInterval:{ timeUnit:"month", count:1},
    renderer: am5xy.AxisRendererX.new(root,{minGridDistance:5}),
    tooltip:am5.Tooltip.new(root,{})
}

var Designed_xAxis = chart.xAxes.push(am5xy.DateAxis.new(root,X_Axis_parameters));

// Create Y Axes as "Value" Axis
var Y_Axis_parameters={
    renderer: am5xy.AxisRendererY.new(root,{}),
    baseValue:100
}

var Designed_yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root,Y_Axis_parameters));

// Add cursor
// behavior:"zoomX","zoomY", "zoomXY", "selectX","selectY","selectXY"
var cursor_parameters = {behavior:"zoomX"}
var cursor = chart.set(
    "cursor",
    am5xy.XYCursor.new(root,cursor_parameters)
);
cursor.lineY.set("visible",false);

// Add scrollbar
var Scrollbar_parameters ={orientation:"horizontal"}
chart.set(
    "scrollbarX",
    am5.Scrollbar.new(root,Scrollbar_parameters)
);

// Let's generate some random/hardcoded data


// ------------ Custom Data Preparation --------------
// [1] Handing Data Directly as single Numbers

// Generate Single Sample with Date and corresponding value
function generateOneSampleData()
{
    // next value = prev value + random [-5 .. 5]
    value = Math.round((Math.random()*10-5)+value);
    // Increment Date by one 'day' , 'month', 'year'
    am5.time.add(date,"month",1);
    // Return Dictionary with two keys: date & value 
    return {date:date.getTime(), value:value};
}

function generateDataSeries(count)
{
    var data = [];
    for(var i=0; i<count; ++i)
    {
        data.push(generateOneSampleData());
    }
    return data;
}

// initialize "date" Global variable (as number in ms starting)
date = new Date ("2021-03-25");
// Global Variable (seen by all functions)
value = 100;
// count = 50 samples
var my_generated_data_1 = generateDataSeries(50);

// Re-initialize "date" Global variable (as number in ms starting)
date = new Date ("2021-03-25");
// Global Variable (seen by all functions)
value = 100;
// count = 50 samples
var my_generated_data_2 = generateDataSeries(50);



// **********************************************************
// [2] Handing Date as Object and Pass Year , Month,Day as numbers

// Date is defined as Date Object ....
// Should create "series.data.processor" to handle date
var Value_Date_data_as_obj = [
    {date: new Date(2021,6,1), value:"1000"},
    {date: new Date(2021,7,2), value:"2000"},
    {date: new Date(2021,8,3), value:"9000"},
    {date: new Date(2021,9,4), value:"4000"},
    {date: new Date(2021,10,5), value:"5000"},
    {date: new Date(2021,9,4), value:"7000"},
    {date: new Date(2021,10,5), value:"3000"},
]


// **********************************************************
// [3] Handing Date as String with a predefined format e.g. YYYY-MM-DD

// Date is defined as String ....
// Should create "series.data.processor" with "Date_format" to handle date
var Value_Date_data_as_str = [
    {date:"2023-01-01", value:"1000"}, // using YYYY-MM-DD
    {date:"2023-02-01", value:"2000"}, // using YYYY-MM-DD
    {date:"2023-03-01", value:"3000"}, // using YYYY-MM-DD
    {date:"2023-04-01", value:"4000"}, // using YYYY-MM-DD
    {date:"2023-05-01", value:"3000"}, // using YYYY-MM-DD
    {date:"2023-06-01", value:"2000"}, // using YYYY-MM-DD
    {date:"2023-07-01", value:"7000"}, // using YYYY-MM-DD
    {date:"2023-08-01", value:"4000"}, // using YYYY-MM-DD
]

// Define Categorical Data

var Categorical_data=[
    {category:"Research" , value:1000},
    {category:"Marketing" , value:1200},
    {category:"Sales" , value:850},

]


// Define "Series" Instance
data_params= {
    name:"Series",
    xAxes: Designed_xAxis,
    yAxes: Designed_yAxis,
    valueXField: "date", // X Axis displays Dates
    valueYField: "value", // Y Axis displays Numerals
    tooltip: am5.Tooltip.new(root,{labelText:"{valueY}"})
}
var my_data_series_1 = chart.series.push(
    am5xy.LineSeries.new(root,data_params)
);
var my_data_series_2 = chart.series.push(
    am5xy.ColumnSeries.new(root,data_params)
);

my_data_series_1.bullets.push(
    function(root){
        return am5.Bullet.new(
            root,
            {
                sprite:am5.Circle.new(
                    root,
                    {radius:9, fill: am5.color("#ff0000")}
                )

            }
        );
    }
);

// Display our Barchart
my_data_series_1.set("fill", am5.color(0xff0000));
my_data_series_2.set("fill",am5.color(0x0000ff));

my_data_series_1.data.setAll(my_generated_data_1);
my_data_series_2.data.setAll(my_generated_data_2);

// Make stuff animate on load 
my_data_series_1.appear(1000);
my_data_series_2.appear(1000);
chart.appear(1000,100);