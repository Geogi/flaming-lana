/*
Module Exports: computeScore :: List<Bet> -> List<Game> -> int
Bet  :: Object { score_score1, score_score2 };
Game :: Object { score_score1, score_score2 };

//Example usage 
Calculation of the computeScore
var userBets = new Array();
userBets[0] = { score_score1: 1,score_score2: 2};
userBets[1] = { score_score1: 2,score_score2: 1};
userBets[2] = { score_score1: 1,score_score2: 2};
userBets[3] = { score_score1: 1,score_score2: 2};

var gameList = new Array();
gameList[0] = { score_score1: 1,score_score2: 2};
gameList[1] = { score_score1: 2,score_score2: 1};
gameList[2] = { score_score1: 1,score_score2: 2};
gameList[3] = { score_score1: 1,score_score2: 2};

var score = computeScore(userBets, gameList);
*/

// Common sense higher order operators 
// (like in anny fucking language)
function eq(n1,n2) { return n1 == n2; };
function ls(n1,n2) { return n1  < n2; };
function bg(n1,n2) { return n1  > n2; };


/* 
giveScore :: int->int->((int->int)->bool)->int -> int
              x     y      operator       score  (score|0)
              
compares x and y with the given operator and either returns the score or zero
*/
function giveScore(x,y,operator,score) {
	if(operator(x,y)) {
	   return score;
	}else {
	   return 0;
	}
};

/*
Takes four numbers and checks that numer one and three is the same
and that number two equals number four
*/
function giveCorrectScores(uT1,uT2,aT1,aT2){
	//test the score of team 1 
	if( 1 == giveScore(uT1,aT1,eq,1)) {
		//one point for getting the score of team 1 and team 2
		return giveScore(uT2,aT2,eq,1);
	}else {
		//no points
		return 0;
	}
};

/*
computeScore :: List<Bet> -> List<Game> -> int
Bet  :: Object { score_score1, score_score2 };
Game :: Object { score_score1, score_score2 };
*/
exports.computeScore = function computeScore(userBets, gameList) {
	var points = 0;
	for(i=0;i<gameList.length;i++){
		var userGameBet = userBets[i];
		var actualGame  = gameList[i];
		//Let's not use objects ...
		var uT1 = userGameBet.score_score1;
		var uT2 = userGameBet.score_score2;
		var aT1 = actualGame.score_score1;
		var aT2 = actualGame.score_score2;

		if(aT1 > aT2) {
			//one point for getting the winner
			points += giveScore(uT1,uT2,bg,1);
			//possible point for getting the correct score
			points += giveCorrectScores(uT1,uT2,aT1,aT2);
		} else {
			if(aT1 == aT2){
				//one point for getting the draw
				points += giveScore(uT1,uT2,eq,1);
				//possible point for getting the correct score
				points += giveCorrectScores(uT1,uT2,aT1,aT2);
			} else {
				//team 2 won
		  		//one point for getting the winner
                 points += giveScore(uT1,uT2,ls,1);
                 //possible point for getting the correct score
				points += giveCorrectScores(uT1,uT2,aT1,aT2);
			}
		}
	};
	return points;
};