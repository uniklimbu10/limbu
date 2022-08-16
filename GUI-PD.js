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
//var setPhotodiodes = 80; //default
//var photodiodeLabels;
//var initialData;
var minY = 0;
let maxY = 600; //default - typical max charge

	//////// Client side functionality ////////

	//Rescaling the y-axis based on a user INPUT of maximum y value
	//via localhost window prompt

	let btn_range=document.getElementById("range").
	addEventListener('click', ()=> {
		var range = window.prompt("Set upper value for y axis: ");
		maxY = parseInt(range, 10);

	});

	//Rescaling the x-axis based on a user INPUT of photodiode numbers

	let btn_pd=document.getElementById("pd").
	addEventListener('click', ()=> {
		var pd = window.prompt("Set value for photodiode number: ");
		setPhotodiodes = parseInt(pd);
		// Generates an array for the photodiode numbers depending on what the user inputted
		xPD = Array.from({ length: setPhotodiodes}, (_,i) => i+1); 
		//console.log(xPD); 

	});

//////////////////////////////////////////////////////////////////////////////
//create empty chart skeleton to show on GUI before any user action
//////////////////////////////////////////////////////////////////////////////
/* var width = 1350, height = 550;
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
   .data([0]) // Initial data
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
       .text("Quality Assurance Range Calorimeter (QuArc) GUI"); */
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
	.domain(xPD) // Depends on what photodiode number button was clicked
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

// This removes all the svg elements e.g. bar chart, axes, title, etc
//d3.select("svg").remove(); 

} 



