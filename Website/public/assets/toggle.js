// Toggle Function
$(document).ready(function()
{
	 // $('form').on('submit', function(){

  //     var item = $('form input');
  //     var dataform = {item: item.val()};

  //     $.ajax({
  //       type: 'POST',
  //       url: '/userlogin',
  //       data: dataform,
  //       success: function(data){
  //         // location.reload();
  //       }
  //     });

  //     return false;

  // });
	$('.toggle').click(function(){
	  // Switches the Icon
	  $(this).children('i').toggleClass('fa-pencil');
	  // Switches the forms  
	  $('.form').animate({
	    height: "toggle",
	    'padding-top': 'toggle',
	    'padding-bottom': 'toggle',
	    opacity: "toggle"
	  }, "slow");
	  
	});
});