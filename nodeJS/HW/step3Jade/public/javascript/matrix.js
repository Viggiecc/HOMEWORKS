var draw2dMatrix = function() {
	if(!dimension) {
		return null;
	}
	console.log("124" + dimension);
	var n = dimension;
	var originN = dimension;
	var row = 0;
	var col = 0;
	var num = 1;
	
	var Matrix = []; 

    for (var i = 0; i < n; i++) {
        var line = [];
        for (var j = 0; j < n; j++) {
          line[j] = 0;
        }
        Matrix[i] = line;
     }
	while (n > 0) {
			if (n == 1) {
			Matrix[row][col] = num;         
			}

			for (var i = 0; i < n - 1; i++) {
				Matrix[row][col + i] = num++;
			}

			for (var i = 0; i < n - 1; i++) {
				Matrix[row + i][col + n - 1] = num++;
			}

			for (var i = 0; i < n - 1; i++) {
				Matrix[row + n - 1][col + n - 1 - i] = num++;
			}

			for (var i = 0; i < n - 1; i++) {
				Matrix[row + n - 1 -i][col] = num++;
			}
			row++;
			col++;
			n = n - 2;
		}
		var result = "";
		for (var i = 0; i < originN; i++) {
			result += '<br>' + "    [";
			for (var j = 0; j < originN; j++) {
				if (j == originN - 1) {
					result +=  " " + Matrix[i][j];
				} else {
					result += " " + Matrix[i][j] + ", ";
				}

			}
			result += " ]";
		}		
		document.getElementById("matrix").innerHTML = result;
};

draw2dMatrix();
