const $modal = $('.modal'); 

/***********************************
Create Random User Cards 
************************************/


//Helper Method
var nameUpper = function (name) {
	return name.charAt(0).toUpperCase() + name.substr(1);
}

// Object of user info for modal 
var userInfo = {};
var saveInfo = function (response) {
	for (i = 0; i <response.results.length; i++) {
		userInfo[i] = {};
		userInfo[i]['image'] = response.results[i].picture.large;

		userInfo[i]['name'] = nameUpper(response.results[i].name.first) + " " + nameUpper(response.results[i].name.last);
		userInfo[i]['email'] = response.results[i].email;
		userInfo[i]['city'] = response.results[i].location.city; 
		userInfo[i]['cell'] = response.results[i].cell;
		userInfo[i]['address'] = response.results[i].location.street; 
		
		var b_date = new Date(response.results[i].dob.date);
		userInfo[i]['bday'] = b_date.toDateString();
	}
	console.log(userInfo);
}

//Create user cards and insert into HTML  
var createCards = function (response) {
	for (i = 0; i < response.results.length; i++) {
			$('.grid-container').append(
				"<div class='grid-item' id='"+i+"'>" + 
					"<img src="+ response.results[i].picture.large +">" +
					"<div class='attr'>" +
						"<li class='name'>" + userInfo[i].name +"</li>" +
						"<div class='details'>" +
							"<li>" + response.results[i].email + "</li>" +
							"<li>"+ response.results[i].location.city + "</li>" + 
						"</div>" +
					"</div>" + 
				"</div>"

			)
		}
} 

//Ajax call to populate index page 
$.ajax({
	url: 'https://randomuser.me/api/?results=12', 
	dataType: 'json', 
	success: function (response) {
		saveInfo(response); 
		createCards(response); 
	}
});

/***********************************
Creat Modal 
************************************/

//Template modal with necessary values. Check method to set html text
var templateModal = function (index) {
	$('#image').attr('src', userInfo[index].image);
	$('#name').text(userInfo[index].name);
	$('#email').text(userInfo[index].email);
	$('#city').text(userInfo[index].city);
	$('#cell').text(userInfo[index].cell);
	$('#address').text(userInfo[index].address);
	$('#bday').text(userInfo[index].bday); 
}

var y; 
$(document).ready(function () {
	
	//Display modal when user card clicked
	$('.grid-container').on('click', ".grid-item", function() {
		//Get value of the card clicked and call template method
		templateModal($(this).attr('id'));
		$('.modal').css("display", "block");
	})

	//Close the modal if 'X' clicked
	$('.close').on('click', function () { 
		$('.modal').css("display", "none")
	})

})

