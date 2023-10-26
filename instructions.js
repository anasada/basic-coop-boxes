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
instr_text[0] = "<strong>Welcome!</strong><br><br>In this experiment, you will play a game that involves cooperating with a partner to maximize your points as you complete each round.<br><br>Hope you enjoy it!";
instr_text[1] = "Please read the instructions on the next few pages carefully. <strong>You will be asked about the instructions later</strong> and go through some practice rounds to make sure you understand the game.";
instr_text[2] = "During the experiment, you will be working with a partner to collect as many points as possible. You are assigned the role of the Helper. Your partner will be the Player.<br><br>You and your partner will be looking at two different screens. On your screen, you will see three purple tiles with points displayed on them. Meanwhile, your partner will only see the purple tiles. They will NOT be able to see what points each tile has. "; 
instr_text[3] = "As the Helper, you will choose to highlight certain tiles. Your partner (the Player) will see what you highlighted and then select tiles. Both of you will receive the points that the Player collects. <br><br> Remember: you will not receive points for the tiles you highlighted. You will only receive points based on what the Player selects. Since the player is not aware of what points are on each tile, you must guide them to gain as many points as possible." ;
instr_text[4] = "There are 3 conditions to pay attention to that will be written on the screen each round.<br>1: The number of tiles you could highlight for your partner will change.<br>2: The number of tiles your partner can pick up will change.<br>3: Sometimes, your partner will know what three scores are present in the round, but they will not know which score corresponds to which tile. Other times, your partner will not be aware of the present scores at all.<br><br>The conditions will be made clear to you each round. In order to work together with your partner, you must remember to pay attention to the conditions; they WILL be changing. Remember, you will only receive the points from the tiles that your partner chooses.";
instr_text[5] = "Work together with your partner to gain as many points as possible. Good luck and have fun!";

instr_text[6] = "";
instr_text[7] = "By clicking on the NEXT button, I have acknowledged and hereby accept the terms. I understand the task in this experiment.";
instr_text[8] = "Please start the practice rounds on the next page.";
instr_text[9] = "";

instr_text[10] = "You have finished all the practice rounds. You are now ready for the experiment. <br><br>Good luck!";
instr_text[11] = "";
instr_text[12] = "You have finished all the rounds in the experiment. Please answer all the questions on the next page.";
instr_text[13] = "";
instr_text[14] = ""; 


const INSTR_FUNC_DICT = {
    0: HIDE_BACK_BUTTON,
    1: SHOW_BACK_BUTTON,
    2: SHOW_INSTR,
    3: SHOW_INSTR,
    4: SHOW_INSTR, 
    5: SHOW_INSTR, 

    6: SHOW_INSTR_QUESTION,
    7: SHOW_CONSENT,
    8: SHOW_INSTR,
    9: START_PRACTICE_TRIAL, 

    10: SHOW_INSTR,
    11: START_FORMAL_TRIAL,               
    12: SHOW_INSTR,
    13: SHOW_DEBRIEFING_PAGE,
    14: SHOW_FINAL
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
