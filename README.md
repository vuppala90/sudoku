# sudoku

Technologies Used:

HTML - Markup
CSS - Styling
JQuery - JS

I used the sudoku example board provided - http://en.wikipedia.org/wiki/File:Sudoku-by-L2G-20050714.svg

Implemented an algorithm to solve the sudoku, by removing common and obvious elements from the row, column and  3*3 cell and iterating with the steps followed from:
http://www.sudokuessentials.com/sudoku_tips.html

I provided the following options for the user:

Clear: clears all the sudoku puzzle cells
Solve: solves the puzzle
Done: Evaluates the user's input and shows the results with red color if wrong and green if right

when the user clicks on any of the cell, he gets to see 3 more buttons:

Solve the Cell: solves that cell
Hint: Shows the possible values for the cell
Check: Checks if the entered input is correct

The input cells takes only values from 1 to 9 and deletes the number by delete/backspace key
