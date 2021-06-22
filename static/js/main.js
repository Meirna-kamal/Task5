        var radius = 100; // radius of unit circle
        var pSize = 4; // size of pole and zero graphic
        var zSize = 4;
        // arrays index used to select specific pole or zero
        currentIndx = 0;
        // flags to know which one to be moved
        zeroFlag = false;
        poleFlag = false;

        var conjucateFlag = false;
        //poles values related to the html coordinates
        var poles = []
            // saves poles values related to the html coordinates (btfdl mwgoda lma nms7 kol l poles)
        var tempPoles = []
            // usable poles values -1 -> 1 (hnst5dmha f l calculations)
        var Truepoles = []
            //zeros values related to the html coordinates
        var zeros = []
            // saves zeros values related to the html coordinates (btfdl mwgoda lma nms7 kol l zeros)
        var tempZeros = []
            // usable zeros values -1 -> 1 (hnst5dmha f l calculations)
        var Truezeros = []
            // array con taining the Indices of conjucated zeros
        var conjucatedZeros = []
            // array containing the Indices of conjucated poles
        var conjucatedPoles = []
            // array saves the index of the poles array that conjucated
        var whichConjpoles = []
            // array saves the index of the zeros array that conjucated
        var whichConjzeros = []

        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        DrawZerosPoles();

        function DrawZerosPoles() {
            ctx.clearRect(0, 0, c.width, c.height);

            var pad = (c.width - 2 * radius) / 2; // padding on each side

            // unit circle
            ctx.beginPath();
            ctx.strokeStyle = "red";
            ctx.arc(radius + pad, radius + pad, radius, 0, 2 * Math.PI);
            ctx.stroke();
            // y axis
            ctx.beginPath();
            //ctx.lineWidth="1";
            ctx.strokeStyle = "lightgray";
            ctx.moveTo(radius + pad, 0);
            ctx.lineTo(radius + pad, c.height);
            ctx.font = "italic 8px sans-serif";
            ctx.fillText("Imaginary", radius + pad + 2, pad - 2);

            // x axis
            ctx.moveTo(0, radius + pad);
            ctx.lineTo(c.width, radius + pad);
            ctx.fillText("Real", radius + radius + pad + 2, radius + pad - 2);
            ctx.stroke(); // Draw it
            ctx.strokeStyle = "blue";
            var idx;
            Truepoles = []
            for (idx = 0; idx < poles.length; idx++) {
                var x = poles[idx][0] - 10;
                var y = poles[idx][1] - 10;

                Truepoles.push([((x - 22) - radius) / radius, (radius - (y - 22)) / radius]);

                ctx.beginPath();
                ctx.moveTo(x - pSize, y - pSize);
                ctx.lineTo(x + pSize, y + pSize);
                ctx.moveTo(x - pSize, y + pSize);
                ctx.lineTo(x + pSize, y - pSize);
                ctx.stroke();
            };
            Truezeros = []
            for (idx = 0; idx < zeros.length; idx++) {
                var x = zeros[idx][0] - 10;
                var y = zeros[idx][1] - 10;

                Truezeros.push([((x - 22) - radius) / radius, (radius - (y - 22)) / radius]);

                ctx.beginPath();
                ctx.arc(x, y, zSize, 0, 2 * Math.PI);
                ctx.stroke();
            };
        };

        function AddPoles() {
            var x = radius + (radius * 0.75);
            var y = radius - (radius * 0.34);
            poles.push([x + 32, y + 32]);
            DrawZerosPoles();
        };

        function AddZeros() {
            var x = radius + (radius * 0);
            var y = radius - (radius * 0);
            zeros.push([x + 32, y + 32]);
            DrawZerosPoles();
        };

        function updateMenu() {

        }

        function showCoords(event) {
            var x = event.offsetX;
            var y = event.offsetY;
            if (zeroFlag) {
                zeros[currentIndx][0] = x
                zeros[currentIndx][1] = y
                tempZeros = zeros
                DrawZerosPoles()
                for (var idx = 0; idx < conjucatedZeros.length; idx++) {
                    if (conjucatedZeros[idx][0] === currentIndx) {
                        var conjIdx = conjucatedZeros[idx][1];
                        Truezeros[conjIdx][0] = Truezeros[currentIndx][0]
                        Truezeros[conjIdx][1] = -Truezeros[currentIndx][1]
                        tempx = radius + (radius * Truezeros[conjIdx][0]);
                        tempy = radius - (radius * Truezeros[conjIdx][1]);
                        zeros[conjIdx] = [tempx + 32, tempy + 32];
                    }
                }
            }
            if (poleFlag) {
                poles[currentIndx][0] = x
                poles[currentIndx][1] = y
                tempPoles = poles
                DrawZerosPoles()
                for (var idx = 0; idx < conjucatedPoles.length; idx++) {
                    if (conjucatedPoles[idx][0] === currentIndx) {
                        var conjIdx = conjucatedPoles[idx][1];
                        Truepoles[conjIdx][0] = Truepoles[currentIndx][0]
                        Truepoles[conjIdx][1] = -Truepoles[currentIndx][1]
                        tempx = radius + (radius * Truepoles[conjIdx][0]);
                        tempy = radius - (radius * Truepoles[conjIdx][1]);
                        poles[conjIdx] = [tempx + 32, tempy + 32];
                    }
                }
            }
            DrawZerosPoles()
        }

        function Conjugate() {
            conjucateFlag = true
            var x;
            var y;
            var tempx;
            var tempy;
            if (zeroFlag) {
                x = Truezeros[currentIndx][0]
                y = Truezeros[currentIndx][1]
                if (!Truezeros.includes([x, -y]) && !whichConjzeros.includes(currentIndx)) {
                    tempx = radius + (radius * x);
                    tempy = radius - (radius * -y);
                    zeros.push([tempx + 32, tempy + 32]);
                    conjucatedZeros.push([currentIndx, zeros.length - 1])
                    whichConjzeros.push(currentIndx)
                }
            } else if (poleFlag) {
                x = Truepoles[currentIndx][0]
                y = Truepoles[currentIndx][1]
                if (!Truepoles.includes([x, -y]) && !whichConjpoles.includes(currentIndx)) {
                    tempx = radius + (radius * x);
                    tempy = radius - (radius * -y);
                    poles.push([tempx + 32, tempy + 32]);
                    conjucatedPoles.push([currentIndx, poles.length - 1])
                    whichConjpoles.push(currentIndx)
                }
            }
            DrawZerosPoles()
        }

        function Delete() {
            if (zeroFlag) {
                zeros.splice(currentIndx, 1);
                for (var idx = 0; idx < conjucatedZeros.length; idx++) {
                    if (conjucatedZeros[idx][0] === currentIndx) {
                        var conjIdx = conjucatedZeros[idx][1] - 1;
                        zeros.splice(conjIdx, 1);
                        conjucatedZeros.splice(conjIdx, 1);
                    }
                }
                DrawZerosPoles()
            } else if (poleFlag) {
                poles.splice(currentIndx, 1);
                for (var idx = 0; idx < conjucatedPoles.length; idx++) {
                    if (conjucatedPoles[idx][0] === currentIndx) {
                        var conjIdx = conjucatedPoles[idx][1] - 1;
                        poles.splice(conjIdx, 1);
                        conjucatedPoles.splice(conjIdx, 1);
                    }
                }
                DrawZerosPoles()
            }
        }

        function clearZeros() {
            zeros = [];
            conjucatedZeros = [];
            whichConjzeros = [];
            DrawZerosPoles()
        };

        function clearPoles() {
            poles = [];
            conjucatedPoles = [];
            whichConjpoles = [];
            DrawZerosPoles();
        };

        function clearAll() {
            poles = [];
            zeros = [];
            conjucatedZeros = [];
            conjucatedPoles = [];
            whichConjzeros = [];
            whichConjpoles = [];
            DrawZerosPoles();
        };

        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            var data = google.visualization.arrayToDataTable([
                ['Year', 'Magnitude', 'Phase'],
                ['2004', 1000, 400],
                ['2005', 1170, 460],
                ['2006', 660, 1120],
                ['2007', 1030, 540]
            ]);

            var options = {
                title: 'Frequency Response',
                curveType: 'function',
                legend: { position: 'bottom' }
            };
            
            var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
            
            chart.draw(data, options);
        }

//==================================================================================SASA
        var Data = {},processedData={};
        // processedData = {
        //     "frequencies"
        //     "magnitude"
        //     "phase_before_filter"
        //     "phase_after_filter"
        // }
        $(document).ready(function() {
            $('#draw').bind('click', function() {
                Data.zeros = Truezeros;
                Data.poles = Truepoles;
                //Data.allPass=variable  //TODO
                $.getJSON('/draw_Mag_and_Phase', {
                    data: JSON.stringify(Data),
                  }, function(data) {
                processedData=data;
                  });
                  return false;
                    });
            });
            
		
//==================================================================================SASA




        function makeArray(start, end) {
            return Array(end - start + 1).fill().map((_, idx) => start + idx)
        }
        var values = makeArray(0, 500);
        var magnitudeGraph = {
            x: values,
            y: values,
            type: 'scatter'
        };


        var data = [magnitudeGraph];

        var layout = {
            yaxis: { domain: [0, 0.8] },
            legend: { traceorder: 'reversed' },

        };

        Plotly.newPlot('magGraph', data, layout);

        var phaseGraph2 = {
            x: values,
            y: values,
            type: 'scatter',
            color: 'green'
        };


        var data2 = [phaseGraph2];

        var layout2 = {
            yaxis: { domain: [0, 0.8] },
            legend: { traceorder: 'reversed' },

        };

        Plotly.newPlot('PhaseGraph', data2, layout2);




        var correctedPhase = {
            x: values,
            y: values,
            type: 'scatter',
            color: 'green'
        };


        var data3 = [correctedPhase];

        var layout2 = {
            yaxis: { domain: [0, 0.8] },
            legend: { traceorder: 'reversed' },

        };

        Plotly.newPlot('correctedPhase', data3, layout2);
