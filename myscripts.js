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
	$('.done').on('click', function(){
		console.log('hello');
	}),	
	$('.typehere').on('click', function(){
		var arr = [[5, 3, 4, 6, 7, 8, 9, 1, 2], [3, 4, 5, 6, 7, 8, 8, 4, 7]];
		var dimensions = this.id.split("-"),
			row = dimensions[0],
			column = dimensions[1];
		for(var i=0; i<arr.length; i++){
			for(j=0; j<arr[i].length; j++){
				if(i == row && j == column){
					return a[i][j];
				}
			}
		}
		this.value = 
		console.log(arr);
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
				}
			}
		}

		for(var i=0; i<mainArray.length; i++){
			for(var j=0; j<mainArray[i].length; j++){
				if(Array.isArray(mainArray[i][j]) && mainArray[i][j].length === 1){
					solveNakedSingles(mainArray[i], mainArray[i][j]);	
				}
			}
		}

		for(var i=0; i<mainArray.length; i++){
			var newColumns = getColumn(mainArray, i);
			for(var j=0; j<newColumns.length; j++){
				if(Array.isArray(newColumns[j]) && newColumns[j].length === 1){
					solveNakedSingles(newColumns, newColumns[j]);
				}	
			}
		}

		//making all the single valued arrays as strings
		for(var i=0; i<mainArray.length; i++){
			for(var j=0; j<mainArray[i].length; j++){
				if(Array.isArray(mainArray[i][j]) && mainArray[i][j].length === 1){
					mainArray[i][j] = makeSingleValueArraytoNumber(mainArray[i][j]);
				}
			}
		}

		console.log('made the single valued arrays as strings', mainArray);

		//make all the non array elements of a row as an array and compare them with the array elements of that row and remove the common ones
		for(var i=0; i<mainArray.length; i++){
			var alpha = makeSinglesasArray(mainArray[i]);
			for(var j=0; j<mainArray[i].length; j++){
				if(Array.isArray(mainArray[i][j]) && mainArray[i][j].length > 0){
					var beta = getCommon(alpha, mainArray[i][j]);
					if(beta.length > 0){
						mainArray[i][j] = removeCommons(beta, mainArray[i][j]);
					}	
					/*var index = mainArray[i][j].indexOf(beta[0]);

					if (index > -1) {
					    mainArray[i][j].splice(index, 1);
					}*/
				}
					
			}
		}

		console.log('removing the repeated elements', mainArray);
		
		//run nakedSingle on the newly formed matrix- row
		for(var i=0; i<mainArray.length; i++){
			for(var j=0; j<mainArray[i].length; j++){
				if(Array.isArray(mainArray[i][j]) && mainArray[i][j].length === 1){
					solveNakedSingles(mainArray[i], mainArray[i][j]);	
				}
			}
		}

		//run nakedSingle on the newly formed matrix- column
		for(var i=0; i<mainArray.length; i++){
			var newColumns = getColumn(mainArray, i);
			for(var j=0; j<newColumns.length; j++){
				if(Array.isArray(newColumns[j]) && newColumns[j].length === 1){
					solveNakedSingles(newColumns, newColumns[j]);
				}	
			}
		}

		for(var i=0; i<mainArray.length; i++){
			for(var j=0; j<mainArray[i].length; j++){
				if(Array.isArray(mainArray[i][j]) && mainArray[i][j].length === 1){
					mainArray[i][j] = makeSingleValueArraytoNumber(mainArray[i][j]);
				}
			}
		}

		//compareTwoValuedArrays- row
		for(var i=0; i<mainArray.length; i++){
			mainArray[i] = compareTwoValuedArrays(mainArray[i]);
			//console.log('log this is ', logThis);
		}

		//compareTwoValuedArrays- column
		for(var i=0; i<mainArray.length; i++){
			var newColumns = getColumn(mainArray, i);
			for(var j=0; j<newColumns.length; j++){
				newColumns[j] = compareTwoValuedArrays(newColumns[j]);
			}
		}

		for(var i=0; i<mainArray.length; i++){
			for(var j=0; j<mainArray[i].length; j++){
				if(Array.isArray(mainArray[i][j]) && mainArray[i][j].length === 1){
					mainArray[i][j] = makeSingleValueArraytoNumber(mainArray[i][j]);
				}
			}
		}

		//singleArrayinRow - row
		for(var i=0; i<mainArray.length; i++){
			for(var j=0; j<mainArray[i].length; j++){
				mainArray[i] = singleArrayinRow(mainArray[i]);
			}
		}

		//singleArrayinRow - column
		for(var i=0; i<mainArray.length; i++){
			var newColumns = getColumn(mainArray, i);
			for(var j=0; j<newColumns.length; j++){
				newColumns[j] = singleArrayinRow(newColumns[j]);
			}
		}

		for(var i=0; i<mainArray.length; i++){
			for(var j=0; j<mainArray[i].length; j++){
				if(Array.isArray(mainArray[i][j]) && mainArray[i][j].length === 1){
					mainArray[i][j] = makeSingleValueArraytoNumber(mainArray[i][j]);
				}
			}
		}


		/*for(var i=0; i<mainArray.length; i++){
			console.log('Row' + i + ':');
			for(var j=0; j<mainArray[i].length; j++){
				console.log(mainArray[i][j]);
			}
		}*/

		//getting matrices
		var rowNo = 0, columnNo = 0;
		while(rowNo < 7){
			while(columnNo < 7){
				var loggingThis = getMatrix(mainArray, rowNo, columnNo);
				console.log('checking whiles ', loggingThis);
				columnNo = columnNo + 3;
			}
			rowNo = rowNo + 3;
			columnNo = 0;
		}

		console.log('the final result is ', mainArray);
	}),
	hiddenSingles = function(arr){
		var temp = [];
		for(var i=0; i<arr.length; i++){
			if(Array.isArray(arr[i])){
				temp.push(arr[i]);
			}
		}
		//flatten an array
		if(temp){
			var flattenArray = [].concat.apply([],temp);
		}	

		var getUnique = getUniqueValuefromArray(flattenArray);

		if(Array.isArray(getUnique)){
			for(var i=0; i<arr.length; i++){
				if(Array.isArray(arr[i])){
					for(j=0; j<getUnique.length; j++){
						if(arr[i])
					}
		}

	},
	getUniqueValuefromArray = function(uniqueNames){
		var index, temp = [];
		$.each(names, function(i, el){
		    if($.inArray(el, uniqueNames) === -1) {
		       if($.inArray(el, temp) === -1){
		            uniqueNames.push(el);
		        }    
		    }else{
		        index = uniqueNames.indexOf(el);
		        uniqueNames.splice(index, 1);
		        temp.push(el);
		    }    
		});
		return uniqueNames;
	}
	solveNakedSingles = function(row, number){
		var temp = [];
		for(var i=0; i<row.length; i++){
			if(row[i].length && row[i].length > 1){
				var hi = row[i];
			}
			if(row[i].length && row[i].length > 1 && hi){
				var send = getCommon(number, hi);
				var index = row[i].indexOf(send[0]);

				if (index > -1) {
				    row[i].splice(index, 1);
				}
			}
		}
	},
	makeSingleValueArraytoNumber =  function(arr){
		return arr.toString();
	},
	makeSinglesasArray = function(arr){
		var newArray = [];
		for(var i=0; i<arr.length; i++){
			if(!Array.isArray(arr[i])){
				newArray.push(arr[i]);
			}
		}
		return newArray;
	},
	removeCommons = function(common, arr){
		for(var i=0; i<arr.length; i++){
			for(var j=0; j<common.length; j++){
				if(arr[i] == common[j]){
					arr.splice(i, 1);
				}
			}
		}
		return arr;
	},
	compareTwoValuedArrays = function(arr){
		var temp = [],
			duplicate = [];
		for(var i=0; i<arr.length; i++){
			if(Array.isArray(arr[i]) && arr[i].length === 2){
				arr[i].sort();
				temp.push(arr[i]);
			}
		}
		//do the comparision
		for(var j=0; j<temp.length; j++){
			var string1 = temp[j].toString(),
				string2 = temp[j+1] && temp[j+1].toString();
			if(string1 == string2){
				duplicate.push(temp[j]);
			}
		}
		//return duplicate[0];
		var duplicateString = duplicate[0] && duplicate[0].sort().toString(),
			comparisionString;
		if(duplicateString){
			for(var i=0; i<arr.length; i++){
				if(Array.isArray(arr[i]) && arr[i].length > 1){
					if(arr[i].sort().toString() !== duplicateString){
						var sendDuplicate = duplicate[0];
						arr[i] = removeCommons(sendDuplicate, arr[i]);
					}
				}
			}
		}	
		return arr;		
				
	},
	singleArrayinRow = function(arr){
		var temp = [];
		for(var i=0; i<arr.length; i++){
			if(!Array.isArray(arr[i])){
				temp.push(arr[i])
			}
		}

		for(var i=0; i<arr.length; i++){
			if(Array.isArray(arr[i]) && arr[i].length === 2){
				arr[i] = removeCommons(temp, arr[i]);
			}	
		}
		return arr;
	},
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
});