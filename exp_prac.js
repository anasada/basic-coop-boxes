document.write(
    unescape("%3Cscript src='https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js' type='text/javascript'%3E%3C/script%3E")
  );

// Number of trials
const eachTimesBox = 2;
const amountConditionBox = 2 * eachTimesBox; // # of conditions * times presenting each condition

var trialItemsBox = new Array();
var numbTokensBox = 1;
var numbAxesBox   = 1;
var isWallBox     = 0;


for (var i = 0; i < amountConditionBox; i++){
	if (numbAxesBox > 2) {
		numbAxesBox = 1;
	}
	if (numbTokensBox > 2) {
		numbTokensBox = 1;
	}
	if (i >= amountConditionBox/2){
		isWallBox = 1;
	}

	trialItemsBox[i] = new Array();
	trialItemsBox[i].push(numbTokensBox, numbAxesBox, isWallBox);

	if (((i/2) == 0) || i%2 == 0) {
		numbAxesBox++
	}

	else {
		numbTokensBox++
	}
}


// Shuffling function: trials shown in different random order for each participant
function shuffle(array) {
	let currentIndex = array.length,  randomIndex;
  
	// While there remain elements to shuffle.
	while (currentIndex != 0) {
  
	  // Pick a remaining element.
	  randomIndex = Math.floor(Math.random() * currentIndex);
	  currentIndex--;
  
	  // And swap it with the current element.
	  [array[currentIndex], array[randomIndex]] = [
		array[randomIndex], array[currentIndex]];
	}
  
	return array;
  }
  
shuffle(trialItemsBox);


// Prepare canvas variables
var w = 500; //grid width
var squares = 5; // 5x5 grid (divided by 5)
var square_size = (w/squares); 
var ctxBox = document.getElementById("myCanvasBox").getContext("2d"); //canvas


// Each time clicks next, generates different map
var counterBox = -1 // starts at -1 for each user
function drawBoxesPrac(){

	/// Setup for each trial:
	// Adjust counter, tokens, axes
	counterBox++
	if (counterBox > trialItemsBox.length){
		return 
	}
	var tokenNumber = trialItemsBox[counterBox][0]; // either 1 or 2
	var axNumber    = trialItemsBox[counterBox][1]; // either 1 or 2
	var ifWall      = trialItemsBox[counterBox][2]; // either 0 or 1

	// Reset instructions 
    document.getElementById("pleasePointBox").innerHTML = "Click on what you wish to highlight for your partner.";
    document.getElementById("pleasePointBox").style.color = "black";

	if (tokenNumber == 2) {
		document.getElementById("numberTokPrac").innerHTML = "<b>This round, you can highlight up to TWO boxes.</b>";
	}
	else {
		document.getElementById("numberTokPrac").innerHTML = "<b>This round, you can highlight up to ONE box.</b>";
	}

	if (axNumber == 1) {
		document.getElementById("numberAxPrac").innerHTML = "<b>After seeing your selection, your partner will open ONE of the boxes.</b>";
	}
	else {
		document.getElementById("numberAxPrac").innerHTML = "<b>After seeing your selection, your partner will open TWO of the boxes.</b>";
	}

	if (ifWall == 0){
		document.getElementById("ifWallPrac").innerHTML = "<b>Your partner IS aware of the points at stake in this round, but does not know which score belongs to which box.</b>";
	}
	else {
		document.getElementById("ifWallPrac").innerHTML = "<b>Your partner does NOT know what the points in the boxes could be this round.</b>";
	}

    clickIndexBox = 0; // reset clicks every trial 
    zeroIndexBox  = 0;

	// Can't click next yet, but can choose zero
	document.getElementById("expNextBox").hidden = true;
	document.getElementById("confirmBox").hidden = false;

	// Reomve  confidence rating question
	var windBox = document.getElementById("windowBoxBox");
	windBox.style.display = "none";
	var resBox = document.getElementById("resultRateBox");
	resBox.style.display = "none";


	// // Add to dataset
	// document.getElementById("map_num").value = mapNumber;
	// document.getElementById("config").value = itemsConfig;


	// Clear canvas each time generate map 
	ctxBox.clearRect(0, 0, w, w); 

	// Locations of boxes on canvas
	box1_x0 = square_size/2;
	box1_y0 = 2 * square_size;

	box2_x0 = 2 * square_size;
	box2_y0 = 2 * square_size;

	box3_x0 = (4 * square_size) - (square_size/2);
	box3_y0 = 2 * square_size;


	// Draw boxes on canvas
	ctxBox.fillStyle = "#b4a7d6"; //purple
	
	ctxBox.beginPath();
	ctxBox.rect(box1_x0, box1_y0, square_size, square_size);
	ctxBox.fill();
	ctxBox.closePath();

	ctxBox.beginPath();
	ctxBox.rect(box2_x0, box2_y0, square_size, square_size);
	ctxBox.fill();
	ctxBox.closePath();

	ctxBox.beginPath();
	ctxBox.rect(box3_x0, box3_y0, square_size, square_size);
	ctxBox.fill();
	ctxBox.closePath();

	
	// Add the numbers to the boxes
	ctxBox.font = '65px serif';
	ctxBox.fillStyle = 'black';
	ctxBox.fillText('+1', box1_x0 + square_size/9, box1_y0 + 0.8*square_size);
	ctxBox.fillText('-20', box2_x0 + square_size/9, box2_y0 + 0.8*square_size);
	ctxBox.fillText('+5', box3_x0 + square_size/9, box3_y0 + 0.8*square_size);
	

	//Player's turn
	pointToBox();
}


function pointToBox(){

	// Message to point
	document.getElementById("pleasePointBox").hidden = false;

	var elem = document.getElementById("myCanvasBox");
	pWidth = 500 / 5; // (canvas width / square); bc canvas fitted to screen 

	// Know the locations of the canvas
	elemLeft = elem.offsetLeft, 
    elemTop  = elem.offsetTop, 
    elements = []; // consider all purple tile locations as elements 

	// Find locations of the tiles relative to the screen
	ibox1_x0 = pWidth/2;
	ibox1_y0 = 2 * pWidth;
	ibox2_x0 = 2 * pWidth;
	ibox2_y0 = 2 * pWidth;
	ibox3_x0 = (4 * pWidth) - (pWidth/2);
	ibox3_y0 = 2 * pWidth;

	// Put the tiles in an array (borrowing method from exp where tiles were in different places)
	elements.push({
		name: "box1",
		width: pWidth,
		height: pWidth,
		top: ibox1_y0,
		left: ibox1_x0
	});

	elements.push({
		name: "box2",
		width: pWidth,
		height: pWidth,
		top: ibox2_y0,
		left: ibox2_x0
	});

	elements.push({
		name: "box3",
		width: pWidth,
		height: pWidth,
		top: ibox3_y0,
		left: ibox3_x0
	});

	// Monitor when click on a purple box 
	elem.addEventListener('click', handlerBox); //**true makes it ask only once

}

// Need to track double clicks
var clickArrayBox = new Array(); 
var clickIndexBox = 0; // check if clicked the same item as the prev index 

// Function for when click on an item
var handlerBox = function(event) {

	// x and y are the coordinates of where the mouse clicked; given page and canvas
	var x = event.pageX - elemLeft,
		y = event.pageY - elemTop;

	var tokenNumber = trialItemsBox[counterBox][0]; // either 1 or 2

		// Go through each purple tile's location 
	elements.forEach(function(element) {
		
		if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
			
			// Update counter for confirm button 
			zeroIndexBox++;

			// Instruct to press confirm
			document.getElementById("pleasePointBox").innerHTML = "Click <b>Confirm Selection</b> to confirm your choice.";
			document.getElementById("pleasePointBox").style.color = "#911879";

			// if (confirm("Press OK to confirm your selection.\nPress CANCEL to make a different selection.") == true) {
				
			if (clickIndexBox == 0){
				// Show them what they clicked 
				ctxBox.beginPath();
				ctxBox.strokeStyle = "#FFBD21";
				ctxBox.lineWidth = 8;
				if (element.name == "box1"){
					ctxBox.strokeRect(box1_x0, box1_y0, square_size, square_size);
				}

				else if (element.name == "box2"){
					ctxBox.strokeRect(box2_x0, box2_y0, square_size, square_size);
				}

				else if (element.name == "box3"){
					ctxBox.strokeRect(box3_x0, box3_y0, square_size, square_size);
				}
				ctxBox.closePath();
			}
			
					
			// Process double click 
			clickArrayBox[clickIndexBox] = element.name // save what picked this time 

			if (clickIndexBox > 0) { // track after first click 
				//// GOT RID OF DOUBLE CLICK
				// if this x, y is equal to previous x,y => double clicked
					if ((clickArrayBox[clickIndexBox] == [clickIndexBox-1])){
						recordSelectionsBox(element.name);

						// Hide confirmBox, hide instructions
						document.getElementById("pleasePointBox").hidden = true;
						document.getElementById("confirmBox").hidden = true;
						document.getElementById("expNextBox").hidden = false;

						event.stopImmediatePropagation();

						//// Stop from selecting more
						//onlyOnePurpleBox[counterBox] = 1;

						// Confidence rating
						checkConfidenceBox();
					}
					else {
						
						if (tokenNumber == 1){
							// Erase what previously clicked 
							resetMapBox();
							zeroIndexBox++;
							

							// Highlight what they clicked NOW
							ctxBox.beginPath();
							ctxBox.strokeStyle = "#FFBD21";
							ctxBox.lineWidth = 8;
							if (element.name == "box1"){
								ctxBox.strokeRect(box1_x0, box1_y0, square_size, square_size);
							}

							else if (element.name == "box2"){
								ctxBox.strokeRect(box2_x0, box2_y0, square_size, square_size);
							}

							else if (element.name == "box3"){
								ctxBox.strokeRect(box3_x0, box3_y0, square_size, square_size);
							}
							ctxBox.closePath();
						}

						else{
							if (clickIndexBox < 2) {
								// Highlight what they clicked NOW
								ctxBox.beginPath();
								ctxBox.strokeStyle = "#FFBD21";
								ctxBox.lineWidth = 8;
								if (element.name == "box1"){
									ctxBox.strokeRect(box1_x0, box1_y0, square_size, square_size);
								}

								else if (element.name == "box2"){
									ctxBox.strokeRect(box2_x0, box2_y0, square_size, square_size);
								}

								else if (element.name == "box3"){
									ctxBox.strokeRect(box3_x0, box3_y0, square_size, square_size);
								}
								ctxBox.closePath();
							}

							else {
								// Instruct to press reset
								document.getElementById("pleasePointBox").innerHTML = "You have already selected 2 boxes. Click <b>Clear Selections</b> if you would like to make any changes. Otherwise, click <b>Confirm Selection</b>.";
								document.getElementById("pleasePointBox").style.color = "#911879";
							}
						}
					}
			   }

			clickIndexBox++ //for next click 
		}
	});
}


function assignPointsBox(){
	document.getElementById("scoresBox").innerHTML = "Red Goal  = <b>+20</b><br> \
														Apples    = <b>+5</b><br>\
														Bee       = <b>-25</b><br>\
														Step Cost = <b>-1</b></b>"; 
}


function confirmBox(){
	var elem = document.getElementById("myCanvasBox");

    // First time clicking: 
    if (zeroIndexBox == 0){
        // Instruct to double click 
        document.getElementById("pleasePointBox").innerHTML = "You are choosing to not select any items. Click <b>Confirm Selection</b> again to confirm your choice.";
        document.getElementById("pleasePointBox").style.color = "#911879";
        zeroIndexBox++;
    }

    // Second time clicking:
    else {
        // // Record the data 
		// recordSelectionsBox("zero");

		// Hide zeroBox, ask for confidence rating, hide instructions
		document.getElementById("pleasePointBox").hidden = true;
		document.getElementById("confirmBox").hidden = true;
		document.getElementById("expNextBox").hidden = false;

		// If chose not to click any items, don't let them click any 
		elem.removeEventListener('click', handlerBox);

         // Move on to confidence rating
        checkConfidenceBox();
    }

}


function checkConfidenceBox(){

	// Ask for confidence rating: display window with radio buttons
	var windBoxBox = document.getElementById("windowBoxBox");
	windBoxBox.style.display = "block";
	var resBoxBox = document.getElementById("resultRateBox");
	resBoxBox.style.display = "block";

	// Hide Next
	document.getElementById("expNextBox").hidden = true;

	// Add confirm button to it.
	document.getElementById("ConfirmBox").hidden = false;

}


function postConfirmBox(){
	// Listen to Confirm button
	var confSelected = document.getElementsByName("ConfidenceScale");
	let selectedRating;
	var pracRatings = new Array();
	var wasFilled = 0; // to not allow confirm without pressing

	// cycle through the radio buttons
	for(var i = 0; i < confSelected.length; i++) {
		if(confSelected[i].checked) {

			selectedRating = confSelected[i].value; // value of the button that was checked 
			pracRatings[counterBox] = selectedRating;  // store

			wasFilled = 1; // allowed to continue now

			// After recording selection, reset the form  
			confSelected[i].checked = false;
		}
	}

	// Make sure clicked Confirm AFTER selected something 
	if (wasFilled == 0){
		alert("Please choose a rating first!")
	}
	else{
		
		// If not on last trial, 
		if (counterBox == trialItemsBox.length-1) {
			// get rid of everything currently being displayed
			var windBoxBox = document.getElementById("windowBoxBox");
			windBoxBox.style.display = "none";
			var pracPage = document.getElementById("practicePage");
			pracPage.style.display = "none";


			// go to next instructions
			instr.next();
		}
		// Then, generate next map
		else {
			drawBoxesPrac();
		}
	}

}


// which p did they select, or "zero" if didn't (make sure to record other data too)
var selectDataBox = new Array(); 
function recordSelectionsBox(p){ 
	selectDataBox.push(p);
}

function resetMapBox(){

	zeroIndexBox = 0;
	clickIndexBox = 0;
	// Clear canvas each time generate map 
	ctxBox.clearRect(0, 0, w, w); 

	// Locations of boxes on canvas
	box1_x0 = square_size/2;
	box1_y0 = 2 * square_size;

	box2_x0 = 2 * square_size;
	box2_y0 = 2 * square_size;

	box3_x0 = (4 * square_size) - (square_size/2);
	box3_y0 = 2 * square_size;


	// Draw boxes on canvas
	ctxBox.fillStyle = "#b4a7d6"; //purple
	
	ctxBox.beginPath();
	ctxBox.rect(box1_x0, box1_y0, square_size, square_size);
	ctxBox.fill();
	ctxBox.closePath();

	ctxBox.beginPath();
	ctxBox.rect(box2_x0, box2_y0, square_size, square_size);
	ctxBox.fill();
	ctxBox.closePath();

	ctxBox.beginPath();
	ctxBox.rect(box3_x0, box3_y0, square_size, square_size);
	ctxBox.fill();
	ctxBox.closePath();

	// Add the numbers to the boxes
	ctxBox.font = '65px serif';
	ctxBox.fillStyle = 'black';
	ctxBox.fillText('+1', box1_x0 + square_size/9, box1_y0 + 0.8*square_size);
	ctxBox.fillText('-20', box2_x0 + square_size/9, box2_y0 + 0.8*square_size);
	ctxBox.fillText('+5', box3_x0 + square_size/9, box3_y0 + 0.8*square_size);
}
