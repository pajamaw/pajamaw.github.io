let  current_fs, next_fs, previous_fs;
const first_fs = $('#recruitform fieldset').eq(0);
const fs_length =  $('#recruitform fieldset').length;

$('.reset').click(function(){
  current_fs = $(this).parent();
  next_fs = $(this).parent().next();

  console.log('reset clicked')
  $("#progressbar li").each(function(index){
    if(index !==0){
      console.log(index)
      console.log(this)
    $(this).removeClass('active')
    };
  });
  first_fs.show();
  $('#recruitform fieldset').not(':eq(0)').hide();

});


$(".next").click(function(){

	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
  final_fs = $(this).parent().next().next();

$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
  if(current_fs[0] === $('#recruitform fieldset')[fs_length -2]){
    current_fs.hide();
    $('.loading img').css('display', 'block');
    console.log('before timeouts')
    setTimeout(function(){
      console.log('timeout')
      next_fs.show();
      $('.loading').hide()
    }, 3000)
  }else{
    next_fs.show();
    current_fs.hide()
  }
});

$(".previous").click(function(){

	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();

	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

	previous_fs.show();
  current_fs.hide();
});

$(".submit").click(function(e){
  e.preventDefault();
  $('fieldset').hide()
})

$(".result").click(function(e){
  e.preventDefault();
  $('fieldset').hide()
})
