(function(){
  function generate_url() {
    var url = $('input#url').val(),
        viewport_width = $('input#viewport_width').val(),
        viewport_height = $('input#viewport_height').val(),
        delay = $('input#delay').val(),
        selector = $('input#selector').val()
        
    var opts = '';
    opts += ((viewport_width  !== '') ? 'viewport_width='   + viewport_width : '');
    opts += ((viewport_height !== '') ? '&viewport_height=' + viewport_height : '');
    opts += ((delay !== '') ? '&delay=' + delay : '');
    opts += ((selector !== '') ? '&selector=' + encodeURIComponent(selector) : '');
    
    var api_link = 'http://' + document.location.host + '/api/' + encodeURIComponent($('input#url').val()) +
          (opts !== '' ? '/' + opts : '');
    
    return api_link;
  }
  
  function view_image() {
    var api_link = generate_url();
    
    $('#image_preview').html('');
    
    setViewImageBtn(true);   
    
    if ($('#error-message').is(":visible")) {
      $('#error-message').hide()
    }
    
    $.ajaxSetup({
      error: function(xhr, status, error) {
        $('#error-message').slideToggle(250)
        $('#error-content').text("Error: " + error)
        setViewImageBtn(false)
      }
    });
    
    $.get(api_link, function(data) {
      setViewImageBtn(false)
      var img = $('<img>');
      img.attr('id', 'result-screenshot')
      img.attr('src', 'data:image/png;base64, ' + data.image_data);      
      $('#image_preview').append(img);
    });
  }
  
  function setViewImageBtn(active) {
    if (active) {
      $('#view-image').attr("disabled", "disabled");
      $('#view-image').addClass('active');    
    } else {
      $('#view-image').removeAttr("disabled");      
      $('#view-image').removeClass('active');
    }
  }
  
  $( document ).ready(function() {
    $('#error-message').hide()
    $('#generate-url').click(function() {
      var api_link = generate_url();
      $('#image_url_link').attr('href', api_link);
      $('#image_url_link').html(api_link);
    });
    
    $('#view-image').click(function() {
      view_image();
    });
  });
}).call(this);