'use strict';var clock=function clock(options){var zero=[false,false,false,false];var defaults={'time':['00','15','10','00']};var ops=defaults;var setFace=function setFace(){$('.clock #hr').html((zero[0]?'0':'')+ops.time[0]+'hr');$('.clock #mm').html((zero[1]?'0':'')+ops.time[1]);$('.clock #sc').html((zero[2]?'0':'')+ops.time[2]);$('.clock #ms').html((zero[3]?'0':'')+ops.time[3])};setInterval(function(){if(ops.time[3]<=0){ops.time[3]=99;ops.time[2]--}ops.time[3]--;// console.log(ops.time[3])
if(ops.time[3]<10)zero[3]=true;else zero[3]=false;setFace()},10)};// clock(1)
$(function(){$('.clock').countdown({date:'June 7, 2087 15:03:26:00',refresh:100,render:function render(date){$('#hr').html(this.leadingZeros(date.hours));$('#mm').html(this.leadingZeros(date.min));$('#sc').html(this.leadingZeros(date.sec));$('#ms').html(this.leadingZeros(Math.floor(date.millisec)%60))}})});