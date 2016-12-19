var draw2dMatrix = function(n) {
	if (!n) {
		return null;
	}

	var matrix = [];
	for (var i = 0; i < n; i++) {
		matrix[i] = new Array(n);
		// console.log(matrix[i]);
	}

	var row = 0;
	var col = 0;
	var num = 1;
	var originalN = n;
	while (n > 0) {
		if (n == 1) {
			matrix[row][col] = num;
		}
		
		for (var i = 0; i < n - 1; i++) {
			matrix[row][col + i] = num++;
		}

		for (var i = 0; i < n - 1; i++) {
			matrix[row + i][col + n - 1] = num++;
		}

		for (var i = n - 1; i >= 1; i--) {
			matrix[row + n - 1][col + i] = num++;
		}

		for (var i = n - 1; i >= 1; i--) {
			matrix[row + i][col] = num++;
		}
		row++;
		col++;
		n = n - 2;
	}
	for(var i = 0; i < originalN; i++) {
		console.log(matrix[i]);
	}
	
}

draw2dMatrix(4);