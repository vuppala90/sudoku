$(document).ready(function() {
	var self = this;
	$('.typehere').on('keypress', function(event){
	//function validateNumber(event) {
	    var key = window.event ? event.keyCode : event.which;

	    if (event.keyCode == 8 || event.keyCode == 46
	     || event.keyCode == 37 || event.keyCode == 39) {
	        return true;
	    }
	    else if ( key < 48 || key > 57 ) {
	        return false;
	    }
	    else {
	    	return true;
	    }	
	}),
	$('.clear').on('click', function(){
		var row1 = [],
			row2 = [],
			row3 = [],
			row4 = [],
			row5 = [],
			row6 = [],
			row7 = [],
			row8 = [],
			row9 = [],
			mainArray = [row1, row2, row3, row4, row5, row6, row7, row8, row9],
			matrix = [],
			possibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];

		$('.row.1-1 td').each(function(){
			row1.push(this.innerText);
		});

		$('.row.2-1 td').each(function(){
			row2.push(this.innerText);
		});

		$('.row.3-1 td').each(function(){
			row3.push(this.innerText);
		});

		$('.row.1-2 td').each(function(){
			row4.push(this.innerText);
		});
		$('.row.2-2 td').each(function(){
			row5.push(this.innerText);
		});

		$('.row.3-2 td').each(function(){
			row6.push(this.innerText);
		});

		$('.row.1-3 td').each(function(){
			row7.push(this.innerText);
		});
		$('.row.2-3 td').each(function(){
			row8.push(this.innerText);
		});

		$('.row.3-3 td').each(function(){
			row9.push(this.innerText);
		});

		$('.secondary-table.1 td').each(function(){
			matrix.push(this.innerText);
		});
		// var matrixx = getMatrix(mainArray, 6, 3);
		// var columnn = getColumn(mainArray, 3);

		// console.log('the matrix is ', matrixx);
		// console.log('the column is ', columnn);

		for(var i=0; i<mainArray.length; i++){
			for(var j=0; j<mainArray[i].length; j++){
				var existingNumbers = mainArray[i].filter(Boolean);
				if(mainArray[i][j] === ''){
					var column = getColumn(mainArray, j);
					existingNumbers = concatArray(existingNumbers, column);
					var mMatrix = getMatrix(mainArray, i, j);
					existingNumbers = concatArray(existingNumbers, mMatrix);
					var difference = getDifference(possibleValues, existingNumbers);
					mainArray[i][j] = difference;
					console.log('the newly added values at position ' + i + j , difference);
				}
			}
		}

		//solveIt(mainArray);
		for(var i=0; i<mainArray.length; i++){
			for(var j=0; j<mainArray[i].length; j++){
				if(Array.isArray(mainArray[i][j]) && mainArray[i][j].length > 1){
					solveIt(mainArray);
				}
			}
		}

		console.log('the final result is ', mainArray);

		//console.log('the main array is ', mainArray[1][2]);


	}),
	solveIt = function(arr){
		for(var i=0; i<arr.length; i++){
			for(var j=0; j<arr[i].length; j++){
				if(Array.isArray(arr[i][j]) && arr[i][j].length === 1){
					solveRow(arr[i], arr[i][j]);
					console.log('now the first row is', arr[i]);
					solveColumn(arr, j, arr[i][j]);
				}

			}
		}

		for(var i=0; i<arr.length; i++){
			for(var j=0; j<arr[i].length; j++){
				if(Array.isArray(arr[i][j]) && arr[i][j].length === 2){
					solveRow2(arr[i], arr[i][j]);
					solveColumn2(arr, j, arr[i][j]);
				}

			}
		}
		//console.log('the final result is ', arr);	
	},
	solveRow = function(row, number){
		var temp = [];
		for(var i=0; i<row.length; i++){
			if(row[i].length && row[i].length > 1){
				var hi = row[i];
			}
			if(row[i].length && row[i].length > 1 && hi){
				var send = getCommon(row[i], hi);
				var index = row[i].indexOf(send[0]);

				if (index > -1) {
				    row[i].splice(index, 1);
				}
			}
		}
		console.log('solve row result is ', row);
		//return row;
	},
	solveRow2 = function(row, number){
		var temp = [];
		for(var i=0; i<row.length; i++){	
			if(row[i].length && row[i].length === 2){
				if(temp.length >1) {
					if(temp.sort().join(',') === row[i].sort().join(',')){
						temp.push(row[i]);
						temp = [].concat.apply([],temp);
					}	
				}else{
					temp.push(row[i]);
					temp = [].concat.apply([],temp);
				}	
			}
			//temp = [].concat.apply([],temp);
			if(row[i].length && row[i].length === 3){
				var send1 = getCommon(row[i], temp);
				if (index > -1) {
				    row[i].splice(index, 1);
				}
			}
		}
	}	
	solveColumn = function(column, index, number){
		var temp = [];
		var hello = getColumn(column, index);
		for(var i=0; i<hello.length; i++){
			if(hello[i].length && hello[i].length === 1){
				var hi = hello[i];
			}
			if(hello[i].length && hello[i].length > 1 && hi){
				var send = getCommon(hello[i], number);
				var index = hello[i].indexOf(send[0]);

				if (index > -1) {
				    hello[i].splice(index, 1);
				}
			}
		}
		return hello;
	},
	solveColumn2 = function(column, index, number){
		var temp = [];
		for(var i=0; i<hello.length; i++){	
			if(hello[i].length && hello[i].length === 2){
				if(temp.length >1) {
					if(temp.sort().join(',') === hello[i].sort().join(',')){
						temp.push(hello[i]);
						temp = [].concat.apply([],temp);
					}	
				}else{
					temp.push(hello[i]);
					temp = [].concat.apply([],temp);
				}
			}
			//temp = [].concat.apply([],temp);
			if(hello[i].length && hello[i].length === 3){
				var send1 = getCommon(hello[i], temp);
				if (index > -1) {
				    hello[i].splice(index, 1);
				}
			}
		}
		return hello;
		console.log('solve column result is ', hello);
	}
	concatArray = function(array1, array2){
		for(var i=0; i<array2.length; i++){
			array1.push(array2[i]);
		}
		return array1;
	},
	getCommon = function(a, b){
	    var d = {};
	    var results = [];
	    for (var i = 0; i < b.length; i++) {
	        d[b[i]] = true;
	    }
	    for (var j = 0; j < a.length; j++) {
	        if (d[a[j]]) {
	            results.push(a[j]);
	        }
	    }
	    return results;
	},
	getDifference = function(a, b){
	    var d = {};
	    var results = [],
	        newResults = [];
	    for (var i = 0; i < b.length; i++) {
	        d[b[i]] = true;
	    }
	    for (var j = 0; j < a.length; j++) {
	        if (d[a[j]]) {
	            results.push(a[j]);
	        }  else{
	            newResults.push(a[j]);
	        }    
	    }
	    return newResults;
	},
	getColumn = function(arr, column){
		var columnArray = [];
		for(var i=0; i<arr.length; i++){
			if(arr[i][column] !== ''){
				columnArray.push(arr[i][column]);
			}	
		}
		return columnArray;
	},
	getMatrix = function(arr, row, column){
		var matrix = [],
			newMatrix = [],
			finalMatrix = [],
			flattenedMatrix = [], j;
		if(row < 3){
			row = 0;
		}else if(row = 3 && row < 6){
			row = 3;
		}else {
			row = 6;
		}

		if(column < 3){
			column =0;
		}else if(column = 3 && column < 6){
			column = 3;
		}else {
			column = 6;
		}

		for(var i=row; i<row+3; i++){
			matrix.push(arr[i]);
			flattenedMatrix = [].concat.apply([],matrix);
			j = column;
			while(j<column+3){
				newMatrix.push(flattenedMatrix[j]);
				j++;
			}
			matrix.length = 0;
			flattenedMatrix.length = 0;
		}

		for(var i=0; i<newMatrix.length; i++){
			if(newMatrix[i] !== ''){
				finalMatrix.push(newMatrix[i]);
			}
		}
		return finalMatrix;
	};
	/*$('.typehere').on('change', function(event){
		var value = $('.typehere').val(),
	    	enteredValue = String.fromCharCode(event.keyCode);
	    if(value !== ''){
    		$('.typehere').val(enteredValue);
    		console.log('I am here');
    	}
    });	*/
});