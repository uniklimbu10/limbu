/*
@author: Fern Pannell
@email: fern.pannell.17@ucl.ac.uk
@purpose: Web display for the QuARC, photodiode points with error bars
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
					order: 1, //drawing 1st
					//backgroundColor: 'rgb(0,0,0,0.4)', //light grey
					data: initialData,
					fill: false,
          backgroundColor: 'rgb(0,0,0,0.4)', //light grey
					borderColor: "#005EB8",
          //data: photodiodeData
				},
				{
					//curve details
					type: 'line',
					order: 2, //drawing 1st
					label: 'Photodiode Intensities',
					data: initialData,
					fill: false, //don't want to fill space under the line
					borderColor: "#005EB8", //NHS blue
					borderWidth: 4,
				  backgroundColor: "#005EB8", //NHS blue
					showLine: false //<- set this
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
				radius: 4 //points to highlight error bar middle
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
						console.log(results.data[0]); */
						//will be carried into createGraph()
						createGraph(results.data);
					}
				});
			}

			//update the graph at a set interval
			setInterval(() => {parseData(createGraph);},interval);

		});

function createGraph(data) {
	//initialise empty y array for photodiode bars and error bars
	var photodiodeData = [];
	var errorbarData = [];
	//iterate over each element in csv row and put into photodiodeData array
	//for (var i = 0; i < chart.data.datasets.data[0].length; i++) {
	for (var i = 0; i < setPhotodiodes; i++) {
		//console.log(data[0][i]);
		//create useable array of data for plotting
		photodiodeData.push(data[0][i]);
	}
//iterate over each element in csv row 2 and put into errorbarData array
for (var i = 0; i < data[1].length; i++){
	//console.log(data[1][i]);
	//create useable array of data for plotting
	errorbarData.push(data[1][i]/3.8);
};

	//debug - check values are parsed correctly
	//console.log(photodiodeData);
	//console.log(errorbarData);

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
				order: 1, //drawing 1st
				fill: false,
        backgroundColor: 'rgb(0,0,0,0.4)', //light grey
				borderColor: "#005EB8",
        data: photodiodeData,
				errorBars: {
					//STD plus or minus around the data point
					'1': {plus: errorbarData[0], minus: errorbarData[0]*-1},
					'2': {plus: errorbarData[1], minus: errorbarData[1]*-1},
					'3': {plus: errorbarData[2], minus: errorbarData[2]*-1},
					'4': {plus: errorbarData[3], minus: errorbarData[3]*-1},
					'5': {plus: errorbarData[4], minus: errorbarData[4]*-1},
					'6': {plus: errorbarData[5], minus: errorbarData[5]*-1},
					'7': {plus: errorbarData[6], minus: errorbarData[6]*-1},
					'8': {plus: errorbarData[7], minus: errorbarData[7]*-1},
					'9': {plus: errorbarData[8], minus: errorbarData[8]*-1},
					'10': {plus: errorbarData[9], minus: errorbarData[9]*-1},
					'11': {plus: errorbarData[10], minus: errorbarData[10]*-1},
					'12': {plus: errorbarData[11], minus: errorbarData[11]*-1},
					'13': {plus: errorbarData[12], minus: errorbarData[12]*-1},
					'14': {plus: errorbarData[13], minus: errorbarData[13]*-1},
					'15': {plus: errorbarData[14], minus: errorbarData[14]*-1},
					'16': {plus: errorbarData[15], minus: errorbarData[15]*-1},

					'17': {plus: errorbarData[16], minus: errorbarData[16]*-1},
					'18': {plus: errorbarData[17], minus: errorbarData[17]*-1},
					'19': {plus: errorbarData[18], minus: errorbarData[18]*-1},
					'20': {plus: errorbarData[19], minus: errorbarData[19]*-1},
					'21': {plus: errorbarData[20], minus: errorbarData[20]*-1},
					'22': {plus: errorbarData[21], minus: errorbarData[21]*-1},
					'23': {plus: errorbarData[22], minus: errorbarData[22]*-1},
					'24': {plus: errorbarData[23], minus: errorbarData[23]*-1},
					'25': {plus: errorbarData[24], minus: errorbarData[24]*-1},
					'26': {plus: errorbarData[25], minus: errorbarData[25]*-1},
					'27': {plus: errorbarData[26], minus: errorbarData[26]*-1},
					'28': {plus: errorbarData[27], minus: errorbarData[27]*-1},
					'29': {plus: errorbarData[28], minus: errorbarData[28]*-1},
					'30': {plus: errorbarData[29], minus: errorbarData[29]*-1},
					'31': {plus: errorbarData[30], minus: errorbarData[30]*-1},
					'32': {plus: errorbarData[31], minus: errorbarData[31]*-1},

					'33': {plus: errorbarData[32], minus: errorbarData[32]*-1},
					'34': {plus: errorbarData[33], minus: errorbarData[33]*-1},
					'35': {plus: errorbarData[34], minus: errorbarData[34]*-1},
					'36': {plus: errorbarData[35], minus: errorbarData[35]*-1},
					'37': {plus: errorbarData[36], minus: errorbarData[36]*-1},
					'38': {plus: errorbarData[37], minus: errorbarData[37]*-1},
					'39': {plus: errorbarData[38], minus: errorbarData[38]*-1},
					'40': {plus: errorbarData[39], minus: errorbarData[39]*-1},
					'41': {plus: errorbarData[40], minus: errorbarData[40]*-1},
					'42': {plus: errorbarData[41], minus: errorbarData[41]*-1},
					'43': {plus: errorbarData[42], minus: errorbarData[42]*-1},
					'44': {plus: errorbarData[43], minus: errorbarData[43]*-1},
					'45': {plus: errorbarData[44], minus: errorbarData[44]*-1},
					'46': {plus: errorbarData[45], minus: errorbarData[45]*-1},
					'47': {plus: errorbarData[46], minus: errorbarData[46]*-1},
					'48': {plus: errorbarData[47], minus: errorbarData[47]*-1},

					'49': {plus: errorbarData[48], minus: errorbarData[48]*-1},
					'50': {plus: errorbarData[49], minus: errorbarData[49]*-1},
					'51': {plus: errorbarData[50], minus: errorbarData[50]*-1},
					'52': {plus: errorbarData[51], minus: errorbarData[51]*-1},
					'53': {plus: errorbarData[52], minus: errorbarData[52]*-1},
					'54': {plus: errorbarData[53], minus: errorbarData[53]*-1},
					'55': {plus: errorbarData[54], minus: errorbarData[54]*-1},
					'56': {plus: errorbarData[55], minus: errorbarData[55]*-1},
					'57': {plus: errorbarData[56], minus: errorbarData[56]*-1},
					'58': {plus: errorbarData[57], minus: errorbarData[57]*-1},
					'59': {plus: errorbarData[58], minus: errorbarData[58]*-1},
					'60': {plus: errorbarData[59], minus: errorbarData[59]*-1},
					'61': {plus: errorbarData[60], minus: errorbarData[60]*-1},
					'62': {plus: errorbarData[61], minus: errorbarData[61]*-1},
					'63': {plus: errorbarData[62], minus: errorbarData[62]*-1},
					'64': {plus: errorbarData[63], minus: errorbarData[63]*-1},

					'65': {plus: errorbarData[64], minus: errorbarData[64]*-1},
					'66': {plus: errorbarData[65], minus: errorbarData[65]*-1},
					'67': {plus: errorbarData[66], minus: errorbarData[66]*-1},
					'68': {plus: errorbarData[67], minus: errorbarData[67]*-1},
					'69': {plus: errorbarData[68], minus: errorbarData[68]*-1},
					'70': {plus: errorbarData[69], minus: errorbarData[69]*-1},
					'71': {plus: errorbarData[70], minus: errorbarData[70]*-1},
					'72': {plus: errorbarData[71], minus: errorbarData[71]*-1},
					'73': {plus: errorbarData[72], minus: errorbarData[72]*-1},
					'74': {plus: errorbarData[73], minus: errorbarData[73]*-1},
					'75': {plus: errorbarData[74], minus: errorbarData[74]*-1},
					'76': {plus: errorbarData[75], minus: errorbarData[75]*-1},
					'77': {plus: errorbarData[76], minus: errorbarData[76]*-1},
					'78': {plus: errorbarData[77], minus: errorbarData[77]*-1},
					'79': {plus: errorbarData[78], minus: errorbarData[78]*-1},
					'80': {plus: errorbarData[79], minus: errorbarData[79]*-1},
					}

      },
			{
					//curve details
					type: 'line',
					order: 2, //drawing 1st
					label: 'Photodiode Intensities',
					data: photodiodeData,
					fill: false, //don't want to fill space under the line
					borderColor: "#005EB8", //NHS blue
					borderWidth: 2,
					backgroundColor: "#005EB8", //NHS blue
					showLine: false //<- remove line itself, only want points for EB plot
			}
		]
  },
  // Configuration for graph
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
			//error bar plugin config
			plugins: {
        chartJsPluginErrorBars: {
          width: '40%',
					borderWidth: 10,
					lineWidth: 4,
          //absoluteValues: true
          color: 'black'
        	}
				},
		elements: {
			point: {
				radius: 4 //points to highlight error bar middle
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
					max: maxY,
				}
      }]
    }
  }
  });
};

}
