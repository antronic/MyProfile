$(window).load(()=>{
  $(document).scrollTop(0),
  $('.loading_web').fadeOut(),
  $('section').addClass('loaded')
})

// $(document).ready(function(){
$('body').css('display', 'block')
$('a').smoothScroll()
$('.shareter, .shareter i').click(function(e){
  $(this).toggleClass('open')
})

onScrollProject()
$(document).on('scroll', onScrollProject)
function onScrollProject(event){
  var scrollPos = $(document).scrollTop()

  var currLink = $('.project .item')
  var refElement = $('#projects')
  if (refElement.position().top - 100 <= scrollPos && refElement.position().top + (refElement.height() - 300) > scrollPos) {
    currLink.addClass('arrived')
    $('#projects .item').hover(function(){
      $(this).siblings().addClass('onHoverOther')
      $(this).addClass('onHoverThis')
    }, function(){
      $(this).siblings().removeClass('onHoverOther')
      $(this).removeClass('onHoverThis')
    })
  }
  else{
    currLink.removeClass('arrived')
  }
}

onScrollWelcome()
$(document).on('scroll', onScrollWelcome)
function onScrollWelcome(event){
  var scrollPos = $(document).scrollTop()

  var currLink = $('#welcome')
  var refElement = $('#welcome')
  if (refElement.position().top + (refElement.height() - 300) > scrollPos) {
    var cal = (100 - (scrollPos / (refElement.position().top + refElement.height() - 300) * 100))
    currLink.css('transform', 'scale(' + ((cal / 100)) + ')')
    currLink.css('-webkit-transform', 'scale(' + ((cal / 100)) + ')')
    currLink.css('opacity', cal / 100)
  }
}

onScrollProgress()
$(document).on('scroll', onScrollProgress)
function onScrollProgress(event){
  var scrollPos = $(document).scrollTop()

  var currLink = $('.progress-meter')
  var refElement = $('.progress-meter')
  if (refElement.position().top + 50 <= scrollPos) {
    currLink.each(function(i){
      $(this).css('width', $(this).attr('val') + '%')
    })
  }
}

onScrollProfile()
$(document).on('scroll', onScrollProfile)
function onScrollProfile(event){
  var scrollPos = $(document).scrollTop()

  var currLink = $('#profile .cover')
  if (scrollPos > 50) {
    currLink.css('opacity', 1)
  }
}
$(document).foundation()
/*eslint-disable no-undef*/
/*eslint-disable no-unused-vars*/
var project = new Foundation.Orbit($('.orbit'))
// })

let modalIsOpen = false

$(document).keyup(function(e) {
  if (e.keyCode == 27) {
    if(modalIsOpen)
      closeModal($('#projects #modal_bg'))
  }
})

$('#projects .projects .project .item, #projects .projects .project .item a img').on('click', (e)=>{
  let started = $(e.target).parentsUntil('#stated_modal')
  started.find('#loading_modal').addClass('show')
})

// modal project
$('#projects .projects .project .item a').on('click', (e)=>{
  // e.preventDefault()
  let started = $(e.target).parentsUntil('#stated_modal')
  started.find('#loading_modal').addClass('show'),
  $.getJSON('/assets/data_modal.json', (data)=>{
    let contents = data[$(e.target).data('modal')]

    $('#projects #modal_bg .modal_project .modal_header .modal_title').text($(e.target).data('modal'))
    $('.projects').addClass('hide')

    //init body

    // init cover

    $('#projects #modal_bg .modal_project .modal_cover img').attr('src', '/img/cover/cover_'+contents.cover+'.jpg')

    let img = document.getElementById('modal_cover_img')
    RGBaster.colors(img, {
      paletteSize: 10000,
      exclude: [],
      success: function(colors) {

        var bgColor = 'rgba(0, 0, 0)'
        // console.log(colors.dominant.name)
        // console.log(colors.secondary)
        var opacity = 1

        var rgb = colors.secondary.match(/\d+/g)
        var yiq = ((rgb[0]*299)+(rgb[1]*587)+(rgb[2]*114))/1000

        var light_border = '1px solid rgba(0, 0, 0, .25)'

        if(yiq > 128)
          $('.modal_header', started).css('border-bottom', light_border)

        bgColor = colors.secondary.replace(')', ',' + opacity + ')').replace('rgb', 'rgba')
        $('#modal_bg', started).css('background-color', bgColor)
      }
    })

    // init duty
    var html = ''
    for(var i = 0; i < contents.duty.length; i++){
      html += '<p class="item">'
      html += contents.duty[i]
      html += '</p>'
    }
    $('#projects #modal_bg .modal_project .modal_body .duty .items').html(html)

    // init contents
    let content = (contents.content.length > 0)? contents.content[0] : ''

    if(content == ''){
      content = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      $('.modal_project .modal_body .modal_content').html(content)
    }else{
      content = ''
      if(contents.content.length > 1){
        for( i = 0; i < contents.content.length; i++){
          content += contents.content[i]
          content += '</br>'
        }
      }else{
        content = contents.content[0]
      }

      $('.modal_project .modal_body .modal_content').html(content)

      // init orbit
      let orbit = (contents.orbit.length > 0)? contents.orbit[0][0] : 'none'
      let caption = (contents.orbit.length > 0 && contents.orbit[0].length > 1)? contents.orbit[0][1] : 'NO PHOTO'

      var orbit_html = ''
      var bullets_html = ''
      if(contents.orbit.length > 0 && contents.orbit.length <= 1){
        orbit_html += '<li class="is-active orbit-slide">'
        orbit_html += '<img class="orbit-image" src="/img/content/'+ orbit + '.jpg" alt="slide'+ 1 +' - '+ caption +'">'
        orbit_html += '<figcaption class="orbit-caption">'+ caption +'</figcaption>'
        orbit_html += '</li>'

        bullets_html += '<button class="is-active" data-slide="0"><span class="show-for-sr">First slide details.</span><span class="show-for-sr">Current Slide</span></button>'
      }else if(contents.orbit.length > 1){
        for( i = 0; i < contents.orbit.length; i++){
          if(i == 0){
            orbit_html += '<li class="is-active orbit-slide">'
            orbit_html += '<img class="orbit-image" src="/img/content/'+ contents.orbit[i][0] + '.jpg" alt="slide'+ (i+1) +' - '+ caption +'">'
            orbit_html += '<figcaption class="orbit-caption">' + contents.orbit[i][1] + '</figcaption>'
            orbit_html += '</li>'

            bullets_html += '<button class="is-active" data-slide="' + (i) + '"><span class="show-for-sr">slide'+ (i+1) +' details.</span></button>'
          }else{
            orbit_html += '<li class="orbit-slide">'
            orbit_html += '<img class="orbit-image" src="/img/content/'+ contents.orbit[i][0] + '.jpg" alt="slide'+ (i+1) +'">'
            orbit_html += '<figcaption class="orbit-caption">' + contents.orbit[i][1] + '</figcaption>'
            orbit_html += '</li>'

            bullets_html += '<button data-slide="' + (i) + '"><span class="show-for-sr">slide'+ i +' details.</span></button>'
          }
        }
      }else{
        orbit_html += '<li class="is-active orbit-slide">'
        orbit_html += '<img class="is-active orbit-image" src="/img/content/'+ orbit + '.jpg" alt="slide'+ 1 +'">'
        orbit_html += '<figcaption class="orbit-caption">'+ caption +'</figcaption>'
        orbit_html += '</li>'

        bullets_html += '<button class="is-active" data-slide="0"><span class="show-for-sr">First slide details.</span><span class="show-for-sr">Current Slide</span></button>'
      }

      $('#modal_bg .modal_project .modal_body .orbit .orbit-container', started).html(orbit_html)
      $('#modal_bg .modal_project .modal_body .orbit .orbit-bullets', started).html(bullets_html)

      new Foundation.Orbit($('.orbit'))
    }
  })

    .done(() => {
      $('#projects #modal_bg').addClass('show')

      setTimeout(()=>{
        started.find('#loading_modal').removeClass('show')
        setTimeout(()=>{
          $('#projects #modal_bg .modal_project').addClass('show')
        }, 300)
      }, 1000)
      modalIsOpen = true
    })

    .fail((data)=>{
      started.find('#loading_modal').removeClass('show')
      var dutyHTML = ''
      dutyHTML += '<p class="item">Not Found</p>'

      var html = ''
      html += '<h3>Status Code ' + data.status + '</h3>'
      html += '<h5>Status Text ' + data.statusText + '</h3>'

      var orbit_item = ''
      orbit_item += '<li class="is-active orbit-slide">'
      orbit_item += '<img class="orbit-image" src="/img/content/none.jpg" alt="slide1">'
      orbit_item += '<figcaption class="orbit-caption">No Photo</figcaption>'
      orbit_item += '</li>'

      $('#projects #modal_bg').addClass('show')
      $('#projects #modal_bg .modal_project .modal_cover img').attr('src', '/img/cover/cover_error.jpg')
      $('#projects #modal_bg .modal_project .modal_header .modal_title').text('Error'),
      $('#projects #modal_bg .modal_project .modal_body .modal_content').html(html),
      $('#projects #modal_bg .modal_project .modal_body .duty .items').html(dutyHTML),
      $('#projects #modal_bg .modal_project .modal_body .orbit .orbit-container').html(dutyHTML),
      $('#projects #modal_bg .modal_project').addClass('show')
      modalIsOpen = true
    })
})

$('#modal_bg').on('click', (e)=>{
  closeModal(e.target)
})

$('.modal_project').on('click', (e)=>{
  e.stopPropagation()
})

$('.close_modal').on('click', (e)=>{
  let modal_bg = $(e.target).parentsUntil('#stated_modal')
  closeModal(modal_bg)
})

let closeModal = (e) =>{

  $('.modal_project', e).removeClass('show')
  $('html, body').animate({
    scrollTop: $('#projects').offset().top
  }, 500)
  setTimeout(()=>{
    $(e).removeClass('show')
    $('.projects').removeClass('hide')
  }, 500)
  modalIsOpen = false
}

//
// let getAverageRGB = (imgEl) => {
//
//   var blockSize = 5, // only visit every 5 pixels
//     defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
//     canvas = document.createElement('canvas'),
//     context = canvas.getContext && canvas.getContext('2d'),
//     data, width, height,
//     i = -4,
//     length,
//     rgb = {r:0,g:0,b:0},
//     count = 0
//
//   if(!context) {
//     return defaultRGB
//   }
//
//   height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height
//   width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width
//
//   context.drawImage(imgEl, 0, 0)
//
//   try {
//     data = context.getImageData(0, 0, width, height)
//   } catch(e) {
//       /* security error, img on diff domain */
//     alert('x')
//     return defaultRGB
//   }
//
//   length = data.data.length
//
//   while ( (i += blockSize * 4) < length ) {
//     ++count
//     rgb.r += data.data[i]
//     rgb.g += data.data[i+1]
//     rgb.b += data.data[i+2]
//   }
//
//   // ~~ used to floor values
//   rgb.r = ~~(rgb.r/count)
//   rgb.g = ~~(rgb.g/count)
//   rgb.b = ~~(rgb.b/count)
//
//   return rgb
//
//
// //thank you : http://jsfiddle.net/xLF38/818/
// }
