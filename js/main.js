        var radius = 100; // radius of unit circle
        var pSize = 4; // size of pole and zero graphic
        var zSize = 4;

        var poles = [
            [0.75, 0.34],
            [0.75, -0.34]
        ]
        var zeros = [
            [1, 0]
        ]
        var tempZeros = [[]]
        var Truezeros = [
            [1,0]
        ]

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

            for (idx = 0; idx < poles.length; idx++) {
                var x = radius + Math.round(radius * poles[idx][0]);
                var y = radius - Math.round(radius * poles[idx][1]);
                ctx.beginPath();
                ctx.moveTo(x - pSize + pad, y - pSize + pad);
                ctx.lineTo(x + pSize + pad, y + pSize + pad);
                ctx.moveTo(x - pSize + pad, y + pSize + pad);
                ctx.lineTo(x + pSize + pad, y - pSize + pad);
                ctx.stroke();
            };
            for (idx = 0; idx < zeros.length; idx++) {
                var x = zeros[idx][0]-10;
                var y = zeros[idx][1]-10;
                Truezeros = [[Math.round((x-radius)/radius),Math.round((radius-y)/radius)]]
                ctx.beginPath();
                ctx.arc(x, y, zSize, 0, 2 * Math.PI);
                ctx.stroke();
            };
        };

        function AddPoles() 
        {
            poles = 
            [
                [0.75, 0.34],
                [0.75, -0.34]
            ]
            DrawZerosPoles();
        };

        function AddZeros() 
        {   
            zeros = tempZeros;
            DrawZerosPoles();
        };

        function showCoords(event) 
        {
            var x = event.offsetX;
            var y = event.offsetY;
            zeros = [[x,y]];
            tempZeros = [[x,y]];
            DrawZerosPoles()
        }

        function clearZeros() {
            zeros = [
                []
            ];
            DrawZerosPoles()

        };

        function clearPoles() {
            poles = [
                []
            ];
            DrawZerosPoles();
        };

        function clearAll() {
            poles = [
                []
            ];
            zeros = [
                []
            ];
            DrawZerosPoles();
        };