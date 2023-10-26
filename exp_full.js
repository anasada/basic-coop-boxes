document.write(
    unescape("%3Cscript src='https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js' type='text/javascript'%3E%3C/script%3E")
  );

// Number of trials
const eachTimes = 4;
const amountCondition = 2 * eachTimes; // # of conditions * times presenting each condition

var trialItems = new Array();
var numbTokens = 1;
var numbAxes   = 1;
var isWall     = 0;


for (var i = 0; i < amountCondition; i++){
	if (numbAxes > 2) {
		numbAxes = 1;
	}
	if (numbTokens > 2) {
		numbTokens = 1;
	}
	if (i >= amountCondition/2){
		isWall = 1;
	}

	trialItems[i] = new Array();
	trialItems[i].push(numbTokens, numbAxes, isWall);

	if (((i/2) == 0) || i%2 == 0) {
		numbAxes++
	}

	else {
		numbTokens++
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
  
shuffle(trialItems);


// Prepare canvas variables
var w = 500; //grid width
var squares = 5; // 5x5 grid (divided by 5)
var square_size = (w/squares); 
var ctx = document.getElementById("myCanvas").getContext("2d"); //canvas


// Each time clicks next, generates different map
var counter = -1 // starts at -1 for each user
function drawBoxes(){

	/// Setup for each trial:
	// Adjust counter, tokens, axes
	counter++
	if (counter > trialItems.length){
		return 
	}
	var tokenNumber = trialItems[counter][0]; // either 1 or 2
	var axNumber    = trialItems[counter][1]; // either 1 or 2
	var ifWall      = trialItems[counter][2]; // either 0 or 1

	// Reset instructions 
    document.getElementById("pleasePoint").innerHTML = "Click on what you wish to highlight for your partner.";
    document.getElementById("pleasePoint").style.color = "black";

	if (tokenNumber == 2) {
		document.getElementById("numberTok").innerHTML = "<b>This round, you can highlight up to TWO boxes.</b>";
	}
	else {
		document.getElementById("numberTok").innerHTML = "<b>This round, you can highlight up to ONE box.</b>";
	}

	if (axNumber == 1) {
		document.getElementById("numberAx").innerHTML = "<b>After seeing your selection, your partner will open ONE of the boxes.</b>";
	}
	else {
		document.getElementById("numberAx").innerHTML = "<b>After seeing your selection, your partner will open TWO of the boxes.</b>";
	}

	if (ifWall == 0){
		document.getElementById("ifWall").innerHTML = "<b>Your partner IS aware of the points at stake in this round, but does not know which score belongs to which box.</b>";
	}
	else {
		document.getElementById("ifWall").innerHTML = "<b>Your partner does NOT know what the points in the boxes could be this round.</b>";
	}

    clickIndex = 0; // reset clicks every trial 
    zeroIndex  = 0;

	// Can't click next yet, but can choose zero
	document.getElementById("expNext").hidden = true;
	document.getElementById("confirm").hidden = false;

	// Reomve  confidence rating question
	var windBox = document.getElementById("windowBox");
	windBox.style.display = "none";
	var resBox = document.getElementById("resultRate");
	resBox.style.display = "none";


	// // Add to dataset
	// document.getElementById("map_num").value = mapNumber;
	// document.getElementById("config").value = itemsConfig;


	// Clear canvas each time generate map 
	ctx.clearRect(0, 0, w, w); 

	// Locations of boxes on canvas
	box1_x0 = square_size/2;
	box1_y0 = 2 * square_size;

	box2_x0 = 2 * square_size;
	box2_y0 = 2 * square_size;

	box3_x0 = (4 * square_size) - (square_size/2);
	box3_y0 = 2 * square_size;


	// Draw boxes on canvas
	ctx.fillStyle = "#b4a7d6"; //purple
	
	ctx.beginPath();
	ctx.rect(box1_x0, box1_y0, square_size, square_size);
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();
	ctx.rect(box2_x0, box2_y0, square_size, square_size);
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();
	ctx.rect(box3_x0, box3_y0, square_size, square_size);
	ctx.fill();
	ctx.closePath();

	
	// Add the numbers to the boxes
	ctx.font = '65px serif';
	ctx.fillStyle = 'black';
	ctx.fillText('+1', box1_x0 + square_size/9, box1_y0 + 0.8*square_size);
	ctx.fillText('-20', box2_x0 + square_size/9, box2_y0 + 0.8*square_size);
	ctx.fillText('+5', box3_x0 + square_size/9, box3_y0 + 0.8*square_size);
	

	//Player's turn
	pointTo();
}


function pointTo(){

	// Message to point
	document.getElementById("pleasePoint").hidden = false;

	var elem = document.getElementById("myCanvas");
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
	elem.addEventListener('click', handler); //**true makes it ask only once

}

// Need to track double clicks
var clickArray = new Array(); 
var clickIndex = 0; // check if clicked the same item as the prev index 

// Function for when click on an item
var handler = function(event) {

	// x and y are the coordinates of where the mouse clicked; given page and canvas
	var x = event.pageX - elemLeft,
		y = event.pageY - elemTop;

	var tokenNumber = trialItems[counter][0]; // either 1 or 2

		// Go through each purple tile's location 
	elements.forEach(function(element) {
		
		if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
			
			// Update counter for confirm button 
			zeroIndex++;

			// Instruct to press confirm
			document.getElementById("pleasePoint").innerHTML = "Click <b>Confirm Selection</b> to confirm your choice.";
			document.getElementById("pleasePoint").style.color = "#911879";

			// if (confirm("Press OK to confirm your selection.\nPress CANCEL to make a different selection.") == true) {
				
			if (clickIndex == 0){
				// Show them what they clicked 
				ctx.beginPath();
				ctx.strokeStyle = "#FFBD21";
				ctx.lineWidth = 8;
				if (element.name == "box1"){
					ctx.strokeRect(box1_x0, box1_y0, square_size, square_size);
				}

				else if (element.name == "box2"){
					ctx.strokeRect(box2_x0, box2_y0, square_size, square_size);
				}

				else if (element.name == "box3"){
					ctx.strokeRect(box3_x0, box3_y0, square_size, square_size);
				}
				ctx.closePath();
			}
			
					
			// Process double click 
			clickArray[clickIndex] = element.name // save what picked this time 

			if (clickIndex > 0) { // track after first click 
				//// GOT RID OF DOUBLE CLICK
				// if this x, y is equal to previous x,y => double clicked
					if ((clickArray[clickIndex] == [clickIndex-1])){
						recordSelections(element.name);

						// Hide confirmBox, hide instructions
						document.getElementById("pleasePoint").hidden = true;
						document.getElementById("confirm").hidden = true;
						document.getElementById("expNext").hidden = false;

						event.stopImmediatePropagation();

						//// Stop from selecting more
						//onlyOnePurpleBox[counterBox] = 1;

						// Confidence rating
						checkConfidence();
					}
					else {
						
						if (tokenNumber == 1){
							// Erase what previously clicked 
							resetMap();
							zeroIndex++;
							

							// Highlight what they clicked NOW
							ctx.beginPath();
							ctx.strokeStyle = "#FFBD21";
							ctx.lineWidth = 8;
							if (element.name == "box1"){
								ctx.strokeRect(box1_x0, box1_y0, square_size, square_size);
							}

							else if (element.name == "box2"){
								ctx.strokeRect(box2_x0, box2_y0, square_size, square_size);
							}

							else if (element.name == "box3"){
								ctx.strokeRect(box3_x0, box3_y0, square_size, square_size);
							}
							ctx.closePath();
						}

						else{
							if (clickIndex < 2) {
								// Highlight what they clicked NOW
								ctx.beginPath();
								ctx.strokeStyle = "#FFBD21";
								ctx.lineWidth = 8;
								if (element.name == "box1"){
									ctx.strokeRect(box1_x0, box1_y0, square_size, square_size);
								}

								else if (element.name == "box2"){
									ctx.strokeRect(box2_x0, box2_y0, square_size, square_size);
								}

								else if (element.name == "box3"){
									ctx.strokeRect(box3_x0, box3_y0, square_size, square_size);
								}
								ctx.closePath();
							}

							else {
								// Instruct to press reset
								document.getElementById("pleasePoint").innerHTML = "You have already selected 2 boxes. Click <b>Clear Selections</b> if you would like to make any changes. Otherwise, click <b>Confirm Selection</b>.";
								document.getElementById("pleasePoint").style.color = "#911879";
							}
						}
					}
			   }

			clickIndex++ //for next click 
		}
	});
}




function confirm(){
	var elem = document.getElementById("myCanvas");

    // First time clicking: 
    if (zeroIndexBox == 0){
        // Instruct to double click 
        document.getElementById("pleasePoint").innerHTML = "You are choosing to not select any items. Click <b>Confirm Selection</b> again to confirm your choice.";
        document.getElementById("pleasePoint").style.color = "#911879";
        zeroIndexBox++;
    }

    // Second time clicking:
    else {
        // // Record the data 
		// recordSelectionsBox("zero");

		// Hide zeroBox, ask for confidence rating, hide instructions
		document.getElementById("pleasePoint").hidden = true;
		document.getElementById("confirm").hidden = true;
		document.getElementById("expNext").hidden = false;

		// If chose not to click any items, don't let them click any 
		elem.removeEventListener('click', handler);

         // Move on to confidence rating
        checkConfidence();
    }

}


function checkConfidence(){

	// Ask for confidence rating: display window with radio buttons
	var windBoxBox = document.getElementById("windowBox");
	windBoxBox.style.display = "block";
	var resBoxBox = document.getElementById("resultRate");
	resBoxBox.style.display = "block";

	// Hide Next
	document.getElementById("expNext").hidden = true;

	// Add confirm button to it.
	document.getElementById("Confirm").hidden = false;

}


function postConfirm(){
	// Listen to Confirm button
	var confSelected = document.getElementsByName("ConfidenceScale");
	let selectedRating;
	var allRatings = new Array();
	var wasFilled = 0; // to not allow confirm without pressing

	// cycle through the radio buttons
	for(var i = 0; i < confSelected.length; i++) {
		if(confSelected[i].checked) {

			selectedRating = confSelected[i].value; // value of the button that was checked 
			allRatings[counter] = selectedRating;  // store (useless now)

			// Save in database
			document.getElementById("conf_rating").value = selectedRating;

			// Push to database
			$("#data_container").submit()

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
		
		// If on last trial, 
		if (counter == trialItems.length-1) {
			// get rid of everything currently being displayed
			var windBox = document.getElementById("windowBox");
			windBox.style.display = "none";
			var expPage = document.getElementById("formalPage");
			expPage.style.display = "none";


			// go to next instructions
			instr.next();
		}

		// Else if halfway through, 
		else if (counter == (Math.round(trialItems.length/2))){
			
			// get rid of everything currently being displayed
			var windBox = document.getElementById("windowBox");
			windBox.style.display = "none";
			var expPage = document.getElementById("formalPage");
			expPage.style.display = "none";

			// Show attention check 
			var attentionPage = document.getElementById("attentionCheck");
			attentionPage.style.display = "block";

		}

		// Otherwise, generate next map
		else {
			drawBoxes();
		}
	}

}


// which p did they select, or "zero" if didn't (make sure to record other data too)
var selectData = new Array(); 
function recordSelections(p){ 
	selectData.push(p);
}

function resetMap(){

	zeroIndex = 0;
	clickIndex = 0;
	// Clear canvas each time generate map 
	ctx.clearRect(0, 0, w, w); 

	// Locations of boxes on canvas
	box1_x0 = square_size/2;
	box1_y0 = 2 * square_size;

	box2_x0 = 2 * square_size;
	box2_y0 = 2 * square_size;

	box3_x0 = (4 * square_size) - (square_size/2);
	box3_y0 = 2 * square_size;


	// Draw boxes on canvas
	ctx.fillStyle = "#b4a7d6"; //purple
	
	ctx.beginPath();
	ctx.rect(box1_x0, box1_y0, square_size, square_size);
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();
	ctx.rect(box2_x0, box2_y0, square_size, square_size);
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();
	ctx.rect(box3_x0, box3_y0, square_size, square_size);
	ctx.fill();
	ctx.closePath();

	// Add the numbers to the boxes
	ctx.font = '65px serif';
	ctx.fillStyle = 'black';
	ctx.fillText('+1', box1_x0 + square_size/9, box1_y0 + 0.8*square_size);
	ctx.fillText('-20', box2_x0 + square_size/9, box2_y0 + 0.8*square_size);
	ctx.fillText('+5', box3_x0 + square_size/9, box3_y0 + 0.8*square_size);
}

function afterAttend(){
	// Close attention check 
	var attentionPage = document.getElementById("attentionCheck");
	attentionPage.style.display = "none";

	// Show formal page
	var expPage = document.getElementById("formalPage");
	expPage.style.display = "block";

	// Continue experiment
	drawBoxes();

}


function namingFunc(){
	// Save username as variable 
	var playername = document.getElementById("username").value;

	// If not at least 3 characters, alert
	if (playername.length < 3){
		alert("Your username is too short. Please make it at least 3 characters.")
	}
	else{
		// When done, close this window to move on to instructions
		var windBoxInstr = document.getElementById("windowBoxInstr");
		windBoxInstr.style.display = "none";
		var nameDisplay = document.getElementById("namingDisplay");
		nameDisplay.style.display = "none";
	}

	// check if used before??
}



