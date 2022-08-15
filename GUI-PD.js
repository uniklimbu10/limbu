///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//globals
//Chart.defaults.global.animation.duration = 0;
//Chart.defaults.global.defaultFontSize = 20;
//data should be written to this file, displaying this data for GUI
var dataFile = "photodiodeValues.csv";
//milliseconds - update interval
var interval = 50; //Hz display
//assigning html canvas to a JS variable
//var ctx = document.getElementById('myChart').getContext('2d');
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//various photodiode numnbers 16,32,48,64
var setPhotodiodes = 80; //default
var photodiodeLabels;
var initialData;
var minY = 0;
let maxY = 600; //default - typical max charge

photodiodeLabels_16 = ['1','2','3','4','5','6','7','8','9','10','11','12',
'13','14','15','16'];

photodiodeLabels_32 = ['1','2','3','4','5','6','7','8','9','10','11','12',
'13','14','15','16','17','18','19','20','21','22','23','24','25','26',
'27','28','29','30','31','32'];

photodiodeLabels_48 = ['1','2','3','4','5','6','7','8','9','10','11','12',
'13','14','15','16','17','18','19','20','21','22','23','24','25','26',
'27','28','29','30','31','32','33','34','35','36','37','38','39','40',
'41','42','43','44','45','46','47','48'];

photodiodeLabels_64 = ['1','2','3','4','5','6','7','8','9','10','11','12',
'13','14','15','16','17','18','19','20','21','22','23','24','25','26',
'27','28','29','30','31','32','33','34','35','36','37','38','39','40',
'41','42','43','44','45','46','47','48','49','50','51','52','53','54',
'55','56','57','58','59','60','61','62','63','64'];

photodiodeLabels_80 = ['1','2','3','4','5','6','7','8','9','10','11','12',
'13','14','15','16','17','18','19','20','21','22','23','24','25','26',
'27','28','29','30','31','32','33','34','35','36','37','38','39','40',
'41','42','43','44','45','46','47','48','49','50','51','52','53','54',
'55','56','57','58','59','60','61','62','63','64','65','66','67',
'68','69','70','71','72','73','74','75','76','77','78','79','80'];

//graph set up depending on number of photodiodes
if (setPhotodiodes === 16){
		photodiodeLabels = photodiodeLabels_16
		var initialData = new Array(16).fill(0);
}
	else if (setPhotodiodes === 32){
		photodiodeLabels = photodiodeLabels_32
		var initialData = new Array(32).fill(0);
}
	else if (setPhotodiodes === 48){
		photodiodeLabels = photodiodeLabels_48
		var initialData = new Array(48).fill(0);
}
	else if (setPhotodiodes === 64){
		photodiodeLabels = photodiodeLabels_64
		var initialData = new Array(64).fill(0);
}
	else if (setPhotodiodes === 80){
		photodiodeLabels = photodiodeLabels_80
		var initialData = new Array(80).fill(0);
}
	else {
		photodiodeLabels = photodiodeLabels_64
		var initialData = new Array(80).fill(0);
	}

	//////// Client side functionality ////////

	//Rescaling the x-axis based on a user selection of photodiode number
	//via button click action

	let btn_16=document.getElementById("pd-16").
	addEventListener('click', ()=> {
		setPhotodiodes = 16;
		photodiodeLabels = photodiodeLabels_16;
	});

	let btn_32=document.getElementById("pd-32").
	addEventListener('click', ()=> {
		setPhotodiodes = 32;
		photodiodeLabels = photodiodeLabels_32;
	});

	let btn_48=document.getElementById("pd-48").
	addEventListener('click', ()=> {
		setPhotodiodes = 48;
		photodiodeLabels = photodiodeLabels_48;
	});

	let btn_64=document.getElementById("pd-64").
	addEventListener('click', ()=> {
		setPhotodiodes = 64;
		photodiodeLabels = photodiodeLabels_64;
	});

	let btn_80=document.getElementById("pd-80").
	addEventListener('click', ()=> {
		setPhotodiodes = 80;
		photodiodeLabels = photodiodeLabels_80;
	});

	//////// Client side functionality ////////

	//Rescaling the y-axis based on a user INPUT of maximum y value
	//via localhost window prompt

	let btn_range=document.getElementById("range").
	addEventListener('click', ()=> {
		var range = window.prompt("Set upper value for y axis: ");
		maxY = parseInt(range, 10);

	});

//////////////////////////////////////////////////////////////////////////////
//create empty chart skeleton to show on GUI before any user action
//////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////
//Parsing CSV values - photodiode data
////////////////////////////////////////////////////////////////////////////
window.onload=function(){

	//begin showing the data once the start button is clicked
	let btn_start=document.getElementById("parse-start").
	addEventListener('click', ()=> {
			//Parses local CSV data with PapaParse library
			function parseData(createGraph) {
				Papa.parse(dataFile, {
					//required for webserver data
					download: true,
					complete: function(results) {
						/* checking parsing is correct
						1st line of file is PD data, isolate this
						console.log(results.data[0]); */
						//console.log(results.data[0]);
						//will be carried into createGraph()
						createGraph(results.data);
					}
				});
			}
			//update the graph at a set interval
			setInterval(() => {parseData(createGraph);},interval);

		});

function createGraph(data) {
	//initialise empty y array for photodiode bars
	var photodiodeData = [];
	//iterate over each element in csv row and put into photodiodeData array
	//for (var i = 0; i < chart.data.datasets.data[0].length; i++) {
	for (var i = 0; i < setPhotodiodes; i++) {
		//console.log(data[0][i]);
		//create useable array of data for plotting
		photodiodeData.push(data[0][i]);
	}

	//debug - check values are parsed correctly
	//console.log(photodiodeData);

	//////////////////////////////////////////////////////////////////////////
	//Create Graph with parsed photodiode data
	//////////////////////////////////////////////////////////////////////////

var width = 1350, height = 550;
var margins = {top: 100, right: 100, bottom: 100, left: 100}; // Sets the margin

// Create the SVG canvas
var svg = d3.select('svg')
            .attr('width', width)
            .attr('height', height);

// Scales
var xScale = d3.scaleBand()
	.domain(photodiodeLabels) // Depends on what photodiode number button was clicked
	.range([0, width - (margins.left+margins.right) ]); // Keeps the graph within the margin	

var yScale = d3.scaleLinear()
	.domain([minY, maxY])
    .range([height - (margins.top+margins.bottom), 0]);

// Margins around SVG canvas
svg.append('g')
   .attr('transform', 'translate('+ margins.top +','+ margins.left +')')
   .selectAll('rect')
   .data(photodiodeData) // Parsed data 
   .enter()
   .append('rect')
   .attr('x', function(d, i) {
      return xScale(i+1); // We only need the index. i.e. Ordinal and also need to add +1 for the bar chart to work
    })
   .attr('y', function(d, i) {
      return yScale(d,i); // We need to pass in the data item
    })
    .attr('width', xScale.bandwidth()) // Automatically set the width
	// Need to deduct the top and bottom margins from the total height so that whatever the value we get from yScale will not exceed that boundary
    .attr('height', function(d, i) { 
        return height - (margins.top+margins.bottom) - yScale(d,i); }) 
    .attr('fill', 'lightblue');

// X axis
svg.append('g')
  .attr('transform', 'translate('+ margins.left +','+ (height - margins.top) +')')
  .call(d3.axisBottom(xScale))
  //labels for the x axis
  .append("text")
  // intially was height - margins.top - value and also bigger the value will shift it downwards
         .attr("y", 140 - margins.top)
         .attr("x", width-200)
         .attr("text-anchor", "end")
         .attr("stroke", "black")
         .text("x-axis")
		 .attr("font-size", "12px")
         .text("Photodiode Number");

// Y axis
svg.append('g')
  .attr('transform', 'translate('+ margins.left +','+ margins.top +')')
  .call(d3.axisLeft(yScale))
  //labels for the y axis
  .append("text")
           .attr("transform", "rotate(-90)")
           .attr("y", 20) //increasing this value shifts it to right
           .attr("dy", "-5.1em")
           .attr("text-anchor", "end")
           .attr("stroke", "black")
           .attr("font-size", "12px")
           .text("Charge / pC");

//creates the title on the svg            
svg.append("text") 
       .attr("transform", "translate(100,0)") //translates the text
       .attr("x", 200) 
       .attr("y", 35) //bigger will shift it down
       .attr("stroke", "black")
       .attr("font-size", "30px")
       .text("Quality Assurance Range Calorimeter (QuArc) GUI");    
  
};

} 

