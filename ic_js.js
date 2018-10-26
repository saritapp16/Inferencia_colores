var colors = ["#0048BA", "#B0BF1A",  "#7CB9E8", "#d60270", "#ffc900", "#93009c", "#ff0000", "#be9500", "#bed9d8", "#e8d2d8", "#e8d2fc", "#08d2fc"];
var color_status = [];
var divs = [];
var color_combination = [];
var combination_divs = [];
var gameboard = [];
var user_combination = [];
	
	
function reset_game(){
	var divs = [];
	var color_combination = [];
	var combination_divs = [];
	var user_combination = [];
	$(".gameboard_div").css({"background-color" : "#FFFFFF"});
	color_cubes();
	var gameboard = [].slice.call(document.querySelectorAll(".gameboard_div"));
	console.log(gameboard);
}	


function create_palette(){
	for(var _div=0; _div < colors.length; _div++){
		$("#colors").append("<div class='in_line_block' id="+_div +"> <div class='main_div' id='" + colors[_div] + "'></div></div>");
	}
}

function intro(){


	//$(".gameboard_div").hide();
	var _gameboard = document.querySelectorAll(".gameboard_div");
	//console.log(_gameboard);
	for(var i=0; i < _gameboard.length; i++){
		setTimeout(change_cell_color(_gameboard[i], set_random_color()), 10000);
	}
}


//Creates the gameboard to track the user combination
function create_gameboard(){
	
	for (var column=0; column < 2; column++){
		$("body #gameboard").append("<div id='column" + column + "'" +" class='main_row_div'></div>");
		for(var row=0; row < 5; row++){
			$("body #gameboard #column"+ column).append("<div id='row" + row + column + "'" +" class='row_div'></div>");
			$("body #gameboard #column"+ column +" #row"+row+column).append("<span id='colors" + row + column + "'> </span>");
			$("body #gameboard #column"+ column +" #row"+row+column).append("<span id='positions" + row + column + "'> </span></br>");
			for(var cell=0; cell < 4; cell++){	
				$("body #gameboard #column"+ column+" #row"+row+column).append("<div id='cell" + column + row + cell + "'" + " class='gameboard_div'></div>");
			}
		}
	}
}


function color_cubes(){

	//Get color palett
	divs = document.querySelectorAll("#colors .main_div");
	
	//Set color to color palett
	for (var i=0; i < divs.length ; i++){
		$(divs[i]).css({"background-color": colors[i]});
		color_status.push(true);
	};
	color_combination = get_random_combination(combination_divs);
	console.log(color_status);

};	

//Get random combination
function get_random_combination(a_combination_divs){
	
	var count = 0;
	var random_color;
	//Get combination palett
	a_combination_divs = document.querySelectorAll("#combination .main_div");
	var a_color_combination = [];
	
	//Set a random combination
	//for (var i=0; i < a_combination_divs.length; i++){
	while(a_color_combination.length < a_combination_divs.length)
	{	
		random_color = set_random_color();
		if(a_color_combination.indexOf(hexToRgbA(random_color)) == -1){
			$(a_combination_divs[count]).css({"background-color" : hexToRgbA(random_color)})
			a_color_combination.push($(a_combination_divs[count]).css("background-color"));
			count++;
		}
		
	}
	console.log(a_color_combination.length);
	return a_color_combination;
}
	
//Get a random color
function set_random_color(){
	var num_random = Math.floor(Math.random()  * (colors.length-1));
	return colors[num_random];

}

function change_cell_color(cell, color){
	//Var cell should be an html tag
	var cell_id = cell.getAttribute('id');
	$("#" + cell_id).css({"background-color" : color});
}

function get_equal_colors(main_combination, combination2compare){
	var equal_colors = 0;
	var copy_main_array = copy_array_no_rep(main_combination);
	
	if(main_combination.length == combination2compare.length){
		for(var i=0; i < combination2compare.length; i++){
			if(combination2compare.indexOf(copy_main_array.shift()) > -1){
				equal_colors++;
			}
		}
	}
	return equal_colors;
}

function get_equal_positions(main_combination, combination2compare){
	var equal_positions = 0;
	if(main_combination.length == combination2compare.length){
		for(var i=0; i < combination2compare.length; i++){
			if(combination2compare[i] == main_combination[i]){
				equal_positions++;
			}
		}
	}
	return equal_positions;
}

function copy_array_no_rep(array){
	
	var array2 = [];
	for(var i=0; i < array.length; i++){
		if(array2.indexOf(array[i]) == -1){
			array2.push(array[i]);
		}
	}
	return array2;
}

function won(main_combination, combination2compare){
	won_game = true;
	
	if(main_combination.length == combination2compare.length){
		for(var i=0; i < combination2compare.length; i++){
			if(combination2compare[i] != main_combination[i]){
				won_game = false;
			}
		}
	}
	return won_game;
}

function hexToRgbA(hex){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgb('+[(c>>16)&255, (c>>8)&255, c&255].join(', ')+')';
    }
    throw new Error('Bad Hex');
}

function deactivate_color(div_color){
	if(gameboard.length > 0){

		var parent_div_id = document.getElementById(div_color).parentNode.getAttribute('id');
		var color_id = colors.indexOf($("#"+parent_div_id + " button").attr('id'));
		//console.log(id);
		if(color_id != -1){
			color_status[color_id] = !color_status[color_id];
			if(!color_status[color_id]){
				//$("#"+parent_div_id + " div").css({'background-color':colors[Number(parent_div_id)]});
				$("#"+parent_div_id + " button").text("Desactivar");
			}
			else{
				//$("#"+parent_div_id + " div").css({'background-color':'#000000'});
				$("#"+parent_div_id + " button").text("Activar");
			}
		}
		/*if($("#"+parent_div_id + " div").css('background-color') != "rgb(0, 0, 0)"){
			$("#"+parent_div_id + " div").css({'background-color':'#000000'});
			$("#"+parent_div_id + " button").text("Activar");
		}
		else{
			//console.log(colors[Number([parent_div_id])]);
			$("#"+parent_div_id + " div").css({'background-color':colors[Number(parent_div_id)]});
			$("#"+parent_div_id + " button").text("Desactivar");
		}*/
	}
	else {
		$("#palette #main_div").css({"background-color" : "rgb(0, 0, 0)"});
	}
}

/*function toggle_color(div1, div2){
	
	var id_div1 = div1.getAttribute('id');
	if()
}*/

