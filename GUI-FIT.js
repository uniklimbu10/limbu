/*
@author: Fern Pannell
@email: fern.pannell.17@ucl.ac.uk
@purpose: Web display for the QuARC, photodiode bars AND curve data
@version: BD-1.5
*/
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//globals
Chart.defaults.global.animation.duration = 0;
Chart.defaults.global.defaultFontSize = 20;
//data should be written to this file, displaying this data for GUI
var dataFile = "photodiodeValues.csv";
//milliseconds - update interval
var interval = 50; //Hz display
//assigning html canvas to a JS variable
var ctx = document.getElementById('myChart').getContext('2d');
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//various photodiode numnbers 16,32,48,64
var setPhotodiodes = 80; //default
var photodiodeLabels;
var initialData;
var minY = 0;
let maxY = 600; //default

photodiodeLabels_16 = ['1','2','3','4','5','6','7','8','9','10','11','12',
'13','14','15','16'];

photodiodeLabels_32 = ['','','','','','','','','','','','',
'','','','','','','','','','','','','','','','','','','',''];

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
var chart = new Chart(ctx, {
	// The type of chart we want to create
	type: 'bar',
	// The data for our dataset
	data: {
		labels: photodiodeLabels,
			datasets: [{
				label: 'Photodiode Intensities',
				order: 2, //drawing 2nd (want the curve on top of the bars)
				backgroundColor: 'rgb(0,0,0,0.4)', //light grey
				data: initialData
			},
			{
				//curve details
				type: 'line',
				order: 1, //drawing 1st
				label: 'Bortfeld Curve',
				data: initialData,
				fill: false, //don't want to fill space under the line
				borderColor: "#005EB8", //NHS blue
				borderWidth: 4,
			  backgroundColor: "#005EB8", //NHS blue
				}
			]
	},
	options: {
		//perfomance improvement
		tooltips: {enabled: false},
		hover: {mode: null},
		layout: {
        padding: {
            left: 20,
            right: 20,
            top: 40,
            bottom: 0
        }
    },
		elements: {
			point: {
				radius: 0 //remove points on line
			}
		},
		title: {
			display: true,
			text: 'Quality Assurance Range Calorimeter GUI',
			fontColor: 'black',
			fontSize: 40
		},
		legend: {
			display: true,
		},
		scales: {
			xAxes: [{
				display: true,
				scaleLabel: {
					display: true,
					labelString: 'Photodiode Number'
				}
			}],
			yAxes: [{
				display: true,
				scaleLabel: {
					display: true,
					labelString: "Charge / pC",
				},
				ticks: {
					beginAtZero: true,
					min: minY,
					max: maxY
				}
			}]
		}
	}
	});
//end of empty chart generation

////////////////////////////////////////////////////////////////////////////
//Parsing CSV values - photodiode data
////////////////////////////////////////////////////////////////////////////
window.onload=function(){

	//begin showing the data once the start button is clicked
		let btn_start = document.getElementById("parse-start").
		addEventListener('click', ()=> {

			//Parses local CSV data with PapaParse
			function parseData(createGraph) {
				Papa.parse(dataFile, {
					//required for webserver data
					download: true,
					complete: function(results) {
						/* checking parsing is correct
						1st line of file is PD data, isolate this
						console.log(results.data[0]);
						2nd line of file is curve data, isolate this
						console.log(results.data[1]); */
						//will be carried into createGraph()

						let beamRange = results.data[3][0];
						let beamEnergy = results.data[4][0];
						createGraph(results.data);
						//console.log(beamEnergy);
						//console.log(beamRange);
						//document.write(beamEnergy);
						//document.write(beamRange);
						document.getElementById("beam-range").innerHTML = "Beam Range: "+beamRange+" mm";
						document.getElementById("beam-energy").innerHTML = "Beam Energy: "+beamEnergy+" MeV/u";

					}
				});
			}

			//update the graph at a set interval
			setInterval(() => {parseData(createGraph);},interval);

		});


function createGraph(data) {
	//initialise empty y arrays for photodiodes bars and curve data
	var photodiodeData = [];
	var curveData = [];
	//iterate over each element in csv row 1 and put into photodiodeData array
	for (var i = 0; i< setPhotodiodes; i++) {
		//console.log(data[0][i]);
		//create useable array of data for plotting
		photodiodeData.push(data[0][i]);
	}
	//iterate over each element in csv row 2 and put into curveData array
	for (var i = 0; i< setPhotodiodes*10; i++) {
		//console.log(data[1][i]);
		//create useable array of data for plotting
		curveData.push({
			x: i, //assign an x-coordinate to each y point for the curve
			y: data[1][i]
		});
	};

	//debug - check values are parsed correctly
	//console.log(photodiodeData);
	//console.log(curveData);

	//////////////////////////////////////////////////////////////////////////
	//Create Graph with parsed photodiode data
	//////////////////////////////////////////////////////////////////////////
  var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: 'bar',
  // The data for our dataset
  data: {
      labels: photodiodeLabels,
      datasets: [{
          label: 'Photodiode Intensities',
					order: 2, //drawing 2nd (want the curve on top of the bars)
          backgroundColor: 'rgb(0,0,0,0.4)', //light grey
          data: photodiodeData
      }, {
					type: 'line',
					order: 1, //drawing 1st
					label: 'Bortfeld Curve',
					data: curveData,
					fill: false, //don't want to fill space under the line
					//assign separate x-axis for curve data to keep within the bar space
					xAxisID: 'x-axis-2',
					borderColor: "#005EB8", //NHS blue
					borderWidth: 4,
				  backgroundColor: "#005EB8", //NHS blue
			}]
  },
  // Configuration for the graph
  options: {
		//perfomance improvement
		tooltips: {enabled: false},
    hover: {mode: null},
		layout: {
	      padding: {
	          left: 20,
	          right: 20,
	          top: 40,
	          bottom: 0
	      }
	  },
		elements: {
			point: {
				radius: 0 //remove points on line
			}
		},
    title: {
      display: true,
      text: 'Quality Assurance Range Calorimeter GUI',
			fontColor: 'black',
			fontSize: 40
    },
    legend: {
      display: true,
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          //labelString: 'Photodiode Number'
        }
      }
			,
			{
				//configuration options for the curve hidden x-axis
				id: 'x-axis-2',
				type: 'linear',
				position: 'bottom',
				display: true, //we don't want to see it
				//labelString: '"WET"',
				scaleLabel: {
          display: true,
          labelString: '"WET"'
        }, //we don't want to see it
				ticks: {
					min: 0,
          max: setPhotodiodes*10,
          stepSize: 160 // 1 - 2 - 3 ...
				}
			}
		],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Charge / pC",
        },
				ticks: {
					display: true,
					beginAtZero: true,
					min: minY,
					max: maxY
				}
      }]
    }
  }
  });
};

}
