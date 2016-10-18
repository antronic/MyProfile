'use strict';// modal project
$('#projects .projects .project .item a').on('click',function(e){$.getJSON('/assets/data_modal.json',function(data){var contents=data[$(e.target).data('modal')];$('.projects').addClass('hide');$('#projects #modal_bg').addClass('show');//init content
// init cover
$('#projects #modal_bg .modal_project .modal_cover img').attr('src','/img/cover/cover_'+contents.cover+'.jpg');var img=document.getElementById('modal_cover_img');RGBaster.colors(img,{paletteSize:10000,exclude:[],success:function success(colors){var started=$(e.target).parentsUntil('#stated_modal');var bgColor='rgba(0, 0, 0)';// console.log(colors.dominant.name)
// console.log(colors.secondary)
// if(colors.dominant.match(/\d+/g) != null)
var opacity=1;var rgb=colors.secondary.match(/\d+/g);var yiq=(rgb[0]*299+rgb[1]*587+rgb[2]*114)/1000;var light_border='1px solid rgba(0, 0, 0, .15)';if(yiq>128)$('.modal_header',started).css('border-bottom',light_border);bgColor=colors.secondary.replace(')',','+opacity+')').replace('rgb','rgba');$('#modal_bg',started).css('background-color',bgColor)}});// init duty
var html='';for(var i=0;i<contents.duty.length;i++){html+='<p class="item">';html+=contents.duty[i];html+='</p>'}$('#projects #modal_bg .modal_project .modal_body .duty .items').html(html);setTimeout(function(){$('#projects #modal_bg .modal_project').addClass('show')},300)})});$('#projects #modal_bg').on('click',function(e){closeModal(e.target)});$('.modal_project').on('click',function(e){e.stopPropagation()});$('.close_modal').on('click',function(e){var modal_bg=$(e.target).parentsUntil('#stated_modal');closeModal(modal_bg)});var closeModal=function closeModal(e){$('.modal_project',e).removeClass('show');// console.log(e)
setTimeout(function(){$(e).removeClass('show');$('.projects').removeClass('hide')},500)};var getAverageRGB=function getAverageRGB(imgEl){var blockSize=5,// only visit every 5 pixels
defaultRGB={r:0,g:0,b:0},// for non-supporting envs
canvas=document.createElement('canvas'),context=canvas.getContext&&canvas.getContext('2d'),data,width,height,i=-4,length,rgb={r:0,g:0,b:0},count=0;if(!context){return defaultRGB}height=canvas.height=imgEl.naturalHeight||imgEl.offsetHeight||imgEl.height;width=canvas.width=imgEl.naturalWidth||imgEl.offsetWidth||imgEl.width;context.drawImage(imgEl,0,0);try{data=context.getImageData(0,0,width,height)}catch(e){/* security error, img on diff domain */alert('x');return defaultRGB}length=data.data.length;while((i+=blockSize*4)<length){++count;rgb.r+=data.data[i];rgb.g+=data.data[i+1];rgb.b+=data.data[i+2]}// ~~ used to floor values
rgb.r=~~(rgb.r/count);rgb.g=~~(rgb.g/count);rgb.b=~~(rgb.b/count);return rgb;//thank you : http://jsfiddle.net/xLF38/818/
};