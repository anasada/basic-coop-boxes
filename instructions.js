document.write(
    unescape("%3Cscript src='https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js' type='text/javascript'%3E%3C/script%3E")
  );

function BLOCK_MOBILE() {
    $("#instrText").html('It seems that you are using a touchscreen device or a phone. Please use a laptop or desktop instead.<br /><br />If you believe you have received this message in error, please contact the experimenter at experimenter@domain.edu<br /><br />Otherwise, please switch to a laptop or a desktop computer for this experiment.');
    $("#instrNextBut").hide();
    $("#instrBackBut").hide();
    $("#instrPage").show();
}

function ALLOW_SHORTCUTS_FOR_TESTING() {
    document.onkeydown = function(event) {
       if(event.key == "s" || event.which == 83 || event.keyCode == 83) {
           console.log("s");
           instr.index = 11;
           instr.next();
       }
        else if (event.key == "p" || event.which == 80 || event.keyCode == 80) {
            console.log("p");
            instr.index = 16;
            instr.next();
        }
       else if (event.keyCode == "e" || event.which == 69 || event.keyCode == 69) {
           console.log("e");
           instr.index = 13;
           instr.next();
       } else if (event.keyCode == "d" || event.which == 68 || event.keyCode == 68) {
           console.log("d");
           instr.index = 15;
           instr.next();
       }
    };

}

function DISABLE_DEFAULT_KEYS() {
    document.onkeydown = function(e) {
        if(e.keyCode == 13) {
            e.preventDefault();
            //e.stopPropagation();
        }
    }
}

function ALLOW_SPACE() {
    document.onkeydown = function(e) {
        if(e.keyCode == 32) {
            return true;
        }
    }
}

function POST_DATA(page, trial_obj, success_func, error_func) {
    trial_obj = (trial_obj === undefined) ? null : trial_obj;
    success_func = (success_func === undefined) ? function() {return;} : success_func;
    error_func = (error_func === undefined) ? function() {return;} : error_func;
    $.ajax({
        type: "POST",
        url: page,
        data: trial_obj,
        success: success_func,
        error: error_func
    });
}

/*
 ### #     #  #####  ####### ######
  #  ##    # #     #    #    #     #
  #  # #   # #          #    #     #
  #  #  #  #  #####     #    ######
  #  #   # #       #    #    #   #
  #  #    ## #     #    #    #    #
 ### #     #  #####     #    #     #
*/

const REWARD = 0.4;
const STEP_COST = 0.05;
const COMPLETION_URL = "https://uclacomm.sona-systems.com/webstudy_credit.aspx?experiment_id=101&credit_token=ba49ffc4d07440b3bed00c58a257dd66&survey_code=";

var instr_text = new Array;
instr_text[0] = "<strong>Welcome!</strong><br><br>In this experiment, you will play a game that involves cooperating with an AI model to maximize your points as you complete each round.<br><br>Hope you enjoy it!";
instr_text[1] = "Please read the instructions on the next few pages carefully. <strong>You will be asked about the instructions later</strong> and go through some practice rounds to make sure you understand the game.";
instr_text[2] = "In this experiment, you will be a helper from outside of the map. Your partner will be walking inside the maze, and will be gaining and losing points as they go.<br><br>Your task will be to point to tiles to help maximize the total points gained."; 
instr_text[3] = "There are 3 colors of tiles in each map. The green tile" + "<img class='inlineShape' src='img/green.png' />" + "  is where your partner will START each round. The red tile" + "<img class='inlineShape' src='img/red.png' />" + " is where they will FINISH each round.<br><br>Each trial ends once they reach the red tile. Each step they take to reach the red tile will cost you both points." ;
instr_text[4] = "There will be 3 purple tiles" + "<img class='inlineShape' src='img/purple.png' />" + " in each map. From your perspective, you can see that each purple tile has an item on it. Specifically, each trial will have 2 apples" + "<img class='inlineShape' src='img/apple.png' />" + " and 1 bee" + "<img class='inlineShape' src='img/bee.png' />" + " located randomly on the 3 purple tiles. However, <b>only you can see the apples and bees</b>. Your partner CANNOT. For instance, <br> YOUR perspective:  " + "<img class='outlineShape' src='img/partnerPOV.png' />" + "<br>Your PARTNER's perspective: " + " <img class='outlineShape' src='img/playerPOV.png' />";
instr_text[5] = "As your partner moves through the maze, they will be able to <b>collect apples</b> or <b>run into bees</b>. If they <span class='rwdText'>collect apples</span>, you will both <span class='rwdText'>gain points</span>. If they <span class='punishText'>run into bees</span>, you will both <span class='punishText'>lose points</span>. <br><br>Each <span class='punishText'>step</span> they take <span class='punishText'>costs points</span>, and each time they reach the <span class='rwdText'>red finishing tile</span> you will both <span class='rwdText'>gain points</span>. The points at stake are as follows: <br><br>\
Red Goal  = <b>+20</b><br> \
Apples    = <b>+5</b><br>\
Bee       = <b>-25</b><br>\
Step Cost = <b>-1</b></b>";
instr_text[6] = "There will also be walls" + "<img class='inlineShape' src='img/wall.png' />" + " inside of the maze. These will be in bold. Your partner cannot pass through walls.";
instr_text[7] = "Each round, you will be able to <b>help your partner decide what path to take</b> (which tiles to go on on the way to the goal) <b>by pointing to either ZERO or ONE of the items</b>.  The tile that you selected will be highlighted in orange" + "<img class='inlineShape' src='img/orange.png' />" + " for them to see before they begin their path.<br><br>From their perspective, you will be pointing to one of 3 purple tiles. Your partner can ONLY see that a purple tile is highlighted. <b>They CANNOT see what item is there.<b>";
instr_text[8] = "Help your partner reach the goal while trying to get the highest score possible. Have fun!";

instr_text[9] = "";
instr_text[10] = "By clicking on the NEXT button, I have acknowledged and hereby accept the terms. I understand the task in this experiment.";
instr_text[11] = "Please start the practice rounds on the next page.";
instr_text[12] = "";
instr_text[13] = "You have finished all the practice rounds. You are now ready for the experiment. <br><br>Good luck!";
instr_text[14] = "";
instr_text[15] = "You have finished all the rounds in the experiment. Please answer all the questions on the next page.";
instr_text[16] = "";
instr_text[17] = ""; 


const INSTR_FUNC_DICT = {
    0: HIDE_BACK_BUTTON,
    1: SHOW_BACK_BUTTON,
    2: SHOW_INSTR,
    3: SHOW_INSTR,
    4: SHOW_INSTR, 
    5: SHOW_INSTR, 
	6: SHOW_INSTR,
    7: SHOW_INSTR,
    8: SHOW_INSTR,

    9: SHOW_INSTR_QUESTION,
    10: SHOW_CONSENT,
    11: SHOW_INSTR,
    12: START_PRACTICE_TRIAL, 

    13: SHOW_INSTR,
    14: START_FORMAL_TRIAL,               
    15: SHOW_INSTR,
    16: SHOW_DEBRIEFING_PAGE,
    17: SHOW_FINAL
};

var instr_options = {
    text: instr_text,
    funcDict: INSTR_FUNC_DICT,
};

// defining the instrObject class
class instrObject {
    constructor(options = {}) {
        Object.assign(this, {
            text: [],      // current test on the screen
            funcDict: {},  // dictionary for calling functions in order
        }, options);
        this.index = 0;    // page index
        this.instrKeys = Object.keys(this.funcDict).map(Number);
        this.qAttemptN = 0;
        this.readingTimes = [];
    }

    start(textBox = $("#instrPage"), textElement = $("#instrText")) {
        textElement.html(this.text[0]);
        if (this.instrKeys.includes(this.index)) {
            this.funcDict[this.index]();
        }
        textBox.show();
        //this.startTime = Date.now();

        // BUFFER_ALL_IMG();
        DISABLE_DEFAULT_KEYS();  // a function in trail.js
    }

    next(textElement = $("#instrText")) {
        //this.readingTimes.push((Date.now() - this.startTime)/1000);
        this.index += 1;
        DISABLE_DEFAULT_KEYS();
        if (this.index < this.text.length) {
            textElement.html(this.text[this.index]);
            if (this.instrKeys.includes(this.index)) {
                this.funcDict[this.index]();
            }
            //this.startTime = Date.now();
        }

    }

    back(textElement = $("#instrText")) {
        //this.readingTimes.push((Date.now() - this.startTime)/1000);
        this.index -= 1;
        if (this.index >= 0) {
            textElement.html(this.text[this.index]);
            if (this.instrKeys.includes(this.index)) {
                this.funcDict[this.index]();
            }
            //this.startTime = Date.now();
        } else
            this.index = 0;
    }
	
}


function SHOW_FINAL() {
    HIDE_NEXT_BUTTON();
    SHOW_INSTR();
    $("#lastPage").show();
}

function HIDE_BACK_BUTTON(){
    $("#instrBackBut").hide();
}

function HIDE_NEXT_BUTTON(){
    $("#instrNextBut").hide();
}

function SHOW_BACK_BUTTON(){
    $("#instrBackBut").show();
}

function HIDE_EXAMPLE_GRID() {
    $("#examGrid").hide();
}

function SHOW_EXAMPLE_GRID() {
    $("#examGrid").css("display", "block");
}

function SHOW_INSTR() {
    HIDE_CONSENT();
    HIDE_INSTR_Q();
    RESET_INSTR();
    // RESET_GAMEBOARD();
    if (!instr.quizCorrect)
        RESET_INSTR_Q();
}

function HIDE_CONSENT() {
    $("#consent").hide();
}

function HIDE_INSTR_Q() {
    $("#instrQBox").hide();
}
function RESET_INSTR() {
    $("#instrText").show();
    $("#instrNextBut").show();
    $("#tryMovePage").hide();
    $("#trySayPage").hide();
}

function SHOW_CONSENT() {
    $("#consent").show();
    HIDE_INSTR_Q();
    RESET_INSTR();
}

function SHOW_INSTR_QUESTION() {
    HIDE_CONSENT();
    $("#instrText").show();
    $("#instrQBox").show();
    if (!instr.quizCorrect)
        $("#instrNextBut").hide();
    $("#rewardInInstrQuiz").html(REWARD.toFixed(2));
    $("#stepCostInInstrQuiz").html(STEP_COST.toFixed(2));
}

function SUBMIT_INSTR_Q() {
    var instrChoice = $("input[name='instrQ']:checked").val();
    if (typeof instrChoice === "undefined") {
        $("#instrQWarning").text("Please answer the question. Thank you!");
    } else if (instrChoice == "several") {
        instr.qAttemptN++;
        // subj.qAttemptN = instr.qAttemptN;  // can be uncommented
        $("#instrQWarning").text("Correct! Please click on NEXT to proceed!");
        $("#instrQBut").hide();
        $("#instrNextBut").show();
        $("#quizBox input").prop("disabled", true);
        $("#quizBox label").css({"cursor": "auto",
                                "pointer-events": "none"});
        instr.quizCorrect = true;
    } else {
        instr.qAttemptN++;
        $("#instrQWarning").text("You have given an incorrect answer. Please try again.");
    }
}

function RESET_INSTR_Q() {
    $("#instrQWarning").text("");
    $("input[name='instrQ']").prop("checked", false);
}



// Temporary for demo
function START_PRACTICE_TRIAL() {
	$("#practicePage").show()
	HIDE_BACK_BUTTON()
	HIDE_NEXT_BUTTON()
	time_start=Date.now()

   
   drawBoxesPrac(); 
}

// Temporary for demo 
function START_FORMAL_TRIAL() {
	$('input[name=ConfidenceScale]').attr('checked', false);
	$("#resultRate").hide(); $("#windowBox").hide()
	$("#formalPage").show()
	HIDE_BACK_BUTTON()
	HIDE_NEXT_BUTTON()
	time_start=Date.now()

    drawBoxes();
}



function END_TO_SONA() {
    window.location.href = COMPLETION_URL + subj.id;
}




/*
 ######  ####### ######  ######  ### ####### ####### ### #     #  #####
 #     # #       #     # #     #  #  #       #        #  ##    # #     #
 #     # #       #     # #     #  #  #       #        #  # #   # #
 #     # #####   ######  ######   #  #####   #####    #  #  #  # #  ####
 #     # #       #     # #   #    #  #       #        #  #   # # #     #
 #     # #       #     # #    #   #  #       #        #  #    ## #     #
 ######  ####### ######  #     # ### ####### #       ### #     #  #####

*/

function SHOW_DEBRIEFING_PAGE() {
    $("#questionsBox").show();
    $("#instrPage").hide();
    ALLOW_SPACE();
}

function SUBMIT_DEBRIEFING_Q() {
    var serious = $("input[name='serious']:checked").val();
    var strategy = $("#strategy").val();
    var problems = $("#problems").val();
    //var rating = $("input[name='rating']:checked").val();
    // var motivation = $("input[name='motivation']:checked").val();
    if (serious == undefined || strategy == "" || problems == "")
    //if (serious == undefined || strategy == "" || problems == "" || rating === undefined || motivation === undefined)
        alert("Please finish all the questions. Thank you!")
    else {
        // RECORD_DEBRIEFING_ANSWERS(serious, strategy, problems, rating, motivation);
        // RECORD_DEBRIEFING_ANSWERS(serious, strategy, problems, rating);
        // subj.submitQ();
        // $("#uidText").html("You have earned " + 10086 + " in total. Please put down both your UID and email address if you'd like to receive the money bonus.")
        $("#questionsBox").hide();
        // $("#uidPage").show();
        instr.next();
        $("#lastPage").show();
    }
}

function SUBMIT_UID() {
    var uid = $("#uid").val();
    var email = $("#email").val();
    // SAVE_UID(uid, email, expt.totalScore);
    $("#uidPage").hide();
    NEXT_INSTR();
    $("#lastPage").show();
}


$(document).ready(function() {
    // subj = new subjObject(subj_options);
    
    // start instructions
    instr = new instrObject(instr_options);
    instr.start();

	 // ask for username over instructions
     var windBoxInstr = document.getElementById("windowBoxInstr");
     windBoxInstr.style.display = "block";
     var nameDisplay = document.getElementById("namingDisplay");
     nameDisplay.style.display = "block";
	
    $(document).on('submit','#data_container', function(e){
        e.preventDefault();    // prevent page from refreshing
        // const form = document.getElementById("data_container")
        // const formData = new FormData(form);  // grab the data inside the form fields
        
		var formData = {
			username: $("#username").val(),
		    map_num: $("#map_num").val(),
		    config: $("#config").val(),
			signal: $("#point_to").val(),
			conf_rating: $("#conf_rating").val()
		};
        
		$.post(
            $('#data_container').attr('action'),
			formData,
			function(result){
				// do something with the response if needed
				// $('#result').html(result);
			}
		);
    });
    // sanity_check_options["subj"] = subj;
    // trial_options["subj"] = subj;
	
});