//structure the puzzle	
window.onload = function(){
	var blankx = "300px";
	var blanky = "300px";
	//shows the size of x and y position of the blank space respectively
	
	var solvedleft = new Array();
	var solvedtop = new Array();
	//both arrays store the x and y positions respectively

	var puzzleArea = document.querySelectorAll("div#puzzlearea div");//capture the array of divs in the puzzle area
	var shuffButton = document.getElementById("shufflebutton");//capture the shuffle button
	var header = document.body.children[0];//capture header element
	
	var i=0;
	var a=0;//column counter
	var k=0;//row counter
		
	for(i=0;i<puzzleArea.length;i++){
		puzzleArea[i].classList.add("puzzlepiece");//attach puzzle piece class to each div element in the puzzle area
			
		puzzleArea[i].style.backgroundPosition = "" + (a*100*-1) + "px " + (k*100*-1) + "px";
			
		puzzleArea[i].style.left="" + (a*100) + "px";
		solvedleft.push(puzzleArea[i].style.left);
		puzzleArea[i].style.top="" + (k*100) + "px";
		solvedtop.push(puzzleArea[i].style.top);
			
		a++;
		if(a>3){
			k+=1;
			a=0;
		}

		(function(){
			var pos = i;
			//add on click event listener for moving a block
			puzzleArea[i].addEventListener("click",function(){move(pos);},false);
			//add on mouse over event listener for movable blocks
			puzzleArea[i].addEventListener("mouseover",function(){isMovable(pos);},false);
		}());
	}

	//add on click event listener for shuffle button
	shuffButton.addEventListener("click",function(){shuffle();},false);


	function isMovable(pos){
		if(puzzleArea[pos].style.left == blankx || puzzleArea[pos].style.top == blanky){//check if block is in same row or column as blank space in the grid
			//check if the current block is near to the blank space
			if(Math.abs(blankx.substring(0,blankx.length-2) - (puzzleArea[pos].style.left.substring(0,puzzleArea[pos].style.left.length-2)))==100 ||
		   	   Math.abs(blanky.substring(0,blanky.length-2) - (puzzleArea[pos].style.top.substring(0,puzzleArea[pos].style.top.length-2)))==100)
			{
				puzzleArea[pos].classList.add('movablepiece');//assign class to blocks with a valid move
				return true;
			}
		}
	}

	function move(position){
		//swap the blank space position with current block position
		if(isMovable(position)){
			var tempx = blankx;
			var tempy = blanky;
			blankx = puzzleArea[position].style.left;
			blanky = puzzleArea[position].style.top;
			puzzleArea[position].style.left = tempx;
			puzzleArea[position].style.top = tempy;
			for(var i=0;i<puzzleArea.length;i++){
				puzzleArea[i].classList.remove('movablepiece');
			}
		}
		//check if the puzzle has been solved
		if(isSolved()){
			for(i=0;i<puzzleArea.length;i++)
			{
				puzzleArea[i].style.backgroundImage = "url()";
				puzzleArea[i].style.backgroundSize = "400px 400px";//let image size and grid size be the same
				puzzleArea[i].style.borderColor = "red";
			}
			header.innerHTML =  "<h1>YOU SOLVED IT!</h1>";//display  message
			header.style.fontSize = "14pt";
			header.style.color = "red";
			header.style.fontFamily = "Times New Roman";
		}
	}

	var options = new Array();//stores blocks with valid moves
	var opt=0;//option randomly generated

	function shuffle(){
		for(var a=0;a<1000;a++){
			for(var i=0;i<puzzleArea.length;i++){
				if(isMovable(i)){
					options.push(i);//store the current valid block position in array		
				}
			}
			opt=options[Math.floor((Math.random()*options.length)+0)];//randomly select a block from the valid array
			move(opt);//move random valid block
		}
		for(var i=0;i<puzzleArea.length;i++)
		{
			puzzleArea[i].style.backgroundImage = "url('data:image/jpeg;base64,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')";//reset image for unsolved puzzle
			puzzleArea[i].style.borderColor = "black";//set border color to black
			puzzleArea[i].style.backgroundSize = "400px 400px";// let image size and grid size be the same
		}
		document.body.children[0].innerHTML =  "<h1>Fifteen Puzzle</h1>";//set back starting message
		header.style.fontSize = "14pt";
		header.style.color = "black";//
		header.style.fontFamily = "Arial";
	}

	function isSolved(){
		for(var i=0;i<puzzleArea.length;i++){
			if(puzzleArea[i].style.left!=solvedleft[i] || puzzleArea[i].style.top!=solvedtop[i]){
				return false;
			}
		}
		return true;
	}
	shuffle();//shuffle puzzle at start
};
