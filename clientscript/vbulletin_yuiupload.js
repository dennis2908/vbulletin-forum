/*======================================================================*\
|| #################################################################### ||
|| # vBulletin 4.2.2
|| # ---------------------------------------------------------------- # ||
|| # Copyright �2000-2013 vBulletin Solutions Inc. All Rights Reserved. ||
|| # This file may not be redistributed in whole or significant part. # ||
|| # ---------------- VBULLETIN IS NOT FREE SOFTWARE ---------------- # ||
|| # http://www.vbulletin.com | http://www.vbulletin.com/license.html # ||
|| #################################################################### ||
\*======================================================================*/
function vB_YUI_Upload(F,A,E,C,B,H){this.uploader=null;if(!YAHOO.util.Dom.get("yui_selectfiles")){var G=document.createElement("div");YAHOO.util.Dom.setAttribute(G,"id","yui_selectfiles");YAHOO.util.Dom.setStyle(G,"z-index","9999999");document.body.appendChild(G)}if(F==0&&A>0){this.phrases=null;this.extensions=null;this.ff=null;this.max_file_size=0;this.attachlimit=0;this.initactive=(A==1);this.uploadform=H;this.filelist=null;this.errors=0;this.success=false;this.active=false;this.progress={};this.totalsize=0;this.target=E;this.postvars=C;this.fieldname=B;this.valid=false;this.events={updatetotal:new YAHOO.util.CustomEvent("updatetotal",this),upload:new YAHOO.util.CustomEvent("upload",this),handleresponse:new YAHOO.util.CustomEvent("handlereponse",this),handleresponse_noerrors:new YAHOO.util.CustomEvent("handleresponse_noerrors",this),handleresponse_errors:new YAHOO.util.CustomEvent("handleresponse_errors",this),select:new YAHOO.util.CustomEvent("select",this),clear:new YAHOO.util.CustomEvent("clear",this),ready:new YAHOO.util.CustomEvent("ready",this),uploaddone:new YAHOO.util.CustomEvent("uploaddone",this)};YAHOO.widget.Uploader.SWFURL="clientscript/yui/uploader/assets/uploader.swf";try{this.uploader=new YAHOO.widget.Uploader("yui_selectfiles");this.uploader.subscribe("contentReady",this.ready,this,true);this.uploader.subscribe("fileSelect",this.select,this,true);this.uploader.subscribe("uploadProgress",this.uploadprogress,this,true);this.uploader.subscribe("uploadComplete",this.complete,this,true);this.uploader.subscribe("uploadCompleteData",this.handleresponse,this,true);this.uploader.subscribe("uploadError",this.error,this,true);YAHOO.util.Event.on("yui_uploadfiles","click",this.upload,this,true);YAHOO.util.Event.on("yui_clearlist","click",this.clear,this,true);YAHOO.util.Event.on("uploadprogress_ul","click",this.cancel,this,true);YAHOO.util.Event.on("yui_selectfiles","mouseover",this.handleselectbutton,this,true);YAHOO.util.Event.on("yui_selectfiles","mouseout",this.handleselectbutton,this,true)}catch(D){}}}vB_YUI_Upload.prototype.handleselectbutton=function(A){if(YAHOO.util.Dom.hasClass("yui_selectfilestext","yui_selectfiles_hover")){YAHOO.util.Dom.removeClass("yui_selectfilestext","yui_selectfiles_hover")}else{YAHOO.util.Dom.addClass("yui_selectfilestext","yui_selectfiles_hover")}};vB_YUI_Upload.prototype.moveflashobj=function(){var B=YAHOO.util.Dom.getRegion("yui_selectfilestext");if(B){YAHOO.util.Dom.setStyle("yui_selectfiles","width",B.width-2+"px");YAHOO.util.Dom.setStyle("yui_selectfiles","height",B.height-2+"px");var A=YAHOO.util.Dom.getXY("yui_selectfilestext");YAHOO.util.Dom.setXY("yui_selectfiles",A)}if(is_moz){YAHOO.util.Dom.setStyle("yui_selectfiles","overflow-x","");YAHOO.util.Dom.setStyle("yui_selectfiles","overflow-y","");YAHOO.util.Dom.setStyle("yui_selectfiles","overflow","");YAHOO.util.Dom.setStyle("yui_selectfiles","overflow","none")}};vB_YUI_Upload.prototype.uploadprogress=function(D){var A=YAHOO.util.Dom.get(D.id);var C=Math.floor(100-((D.bytesLoaded/D.bytesTotal)*100))/100;YAHOO.util.Dom.setStyle(A,"backgroundPosition",(-1*(400*C))+"px 0");this.progress[D.id]=D.bytesLoaded;var B=0;for(i in this.progress){B+=this.progress[i]}var C=Math.floor((B/this.totalsize)*100);YAHOO.util.Dom.setStyle("yui_progressbar","width",C+"%")};vB_YUI_Upload.prototype.updatetotal=function(){var B=0;var A=0;for(i in this.filelist){B++;A+=this.filelist[i].size}if(B==0){this.filelist=null;this.events.updatetotal.fire()}YAHOO.util.Dom.get("yui_totalfiles").innerHTML=B;YAHOO.util.Dom.get("yui_totalsize").innerHTML=format_filesize(A)};vB_YUI_Upload.prototype.cancel=function(E){YAHOO.util.Event.stopEvent(E);var D=YAHOO.util.Event.getTarget(E);if(D.nodeName.toUpperCase()=="BUTTON"){var B=null;if(B=YAHOO.util.Dom.getAncestorBy(D,function(F){if(F.nodeName.toUpperCase()=="LI"){return F}return false})){var C=YAHOO.util.Dom.get(B.id);if(C){try{this.uploader.cancel(B.id);this.uploader.removeFile(B.id);delete (this.filelist[B.id]);var A=0;for(i in this.filelist){A++}if(!A){this.clear(E)}}catch(E){}C.parentNode.removeChild(C);this.updatetotal()}}}};vB_YUI_Upload.prototype.error=function(A){A.data="error: "+A.status;this.handleresponse(A)};vB_YUI_Upload.prototype.complete=function(A){};vB_YUI_Upload.prototype.upload=function(F){if(this.filelist!=null){YAHOO.util.Dom.setStyle("yui_basicupload","display","none");var B=0;this.totalsize=0;this.progress={};for(i in this.filelist){this.totalsize+=this.filelist[i].size;B++;this.progress[i]=0}this.uploader.setSimUploadLimit(1);var E=YAHOO.util.Dom.get(this.uploadform).getElementsByTagName("input");if(E.length){for(i in E){if(E[i].type=="hidden"){var C=E[i].name.match(/^values\[([^\]]+)\]$/);if(C){this.postvars[C[0]]=E[i].value}}}}var G=YAHOO.util.Dom.get("uploadprogress_ul");var D=G.getElementsByTagName("button");if(D.length){for(var A=1;A<D.length;A++){YAHOO.util.Dom.addClass(D[A],"hidden")}}this.events.upload.fire();YAHOO.util.Dom.addClass("yui_clearlist","hidden");YAHOO.util.Dom.removeClass("yui_clearlist","displayinline");YAHOO.util.Dom.addClass("yui_uploadfiles","hidden");YAHOO.util.Dom.removeClass("yui_uploadfiles","displayinline");YAHOO.util.Dom.addClass("yui_selectfilestext","hidden");YAHOO.util.Dom.removeClass("yui_selectfilestext","displayinline");YAHOO.util.Dom.setStyle("yui_progressbar","width",0);YAHOO.util.Dom.removeClass("yui_progressbar_container","hidden");this.uploader.uploadAll(this.target,"POST",this.postvars,this.fieldname)}};vB_YUI_Upload.prototype.displayerror=function(E,C){var B=YAHOO.util.Dom.get(E);YAHOO.util.Dom.setStyle(B,"backgroundPosition","-400px 0");var A=YAHOO.util.Dom.getElementsByClassName("exclamationimg","img",B);var D=YAHOO.util.Dom.getElementsByClassName("acceptimg","img",B);YAHOO.util.Dom.removeClass(A[0],"hidden");YAHOO.util.Dom.addClass(D[0],"hidden");YAHOO.util.Dom.setAttribute(A[0],"title",A[0].title+" "+C)};vB_YUI_Upload.prototype.handleresponse=function(D){var A=YAHOO.util.Dom.get(D.id);var E=D.data.match(/^ok - ([\d]+) - ([01])/);if(E){var C=YAHOO.util.Dom.getElementsByClassName("acceptimg","img",A);YAHOO.util.Dom.removeClass(C[0],"hidden");this.success=true;this.events.uploaddone.fire(E[1],E[2])}else{this.errors++;var B=D.data.match(/^error: (.*)$/);this.displayerror(D.id,B?B[1]:this.phrases.upload_failed)}this.progress[D.id]=this.filelist[D.id].size;delete (this.filelist[D.id]);this.uploader.removeFile(D.id);this.updatetotal();if(this.filelist==null){var F=this.success;YAHOO.util.Dom.addClass("yui_clearlist","displayinline");YAHOO.util.Dom.removeClass("yui_clearlist","hidden");if(this.errors==0){this.clear(D);this.events.handleresponse_noerrors.fire()}else{this.events.handleresponse_errors.fire()}YAHOO.util.Dom.addClass("yui_progressbar_container","hidden");if(F){this.events.handleresponse.fire()}}};vB_YUI_Upload.prototype.ready=function(A){this.uploader.setAllowMultipleFiles(true);if(this.initactive){this.active=true}this.valid=true;if(this.ff){this.uploader.setFileFilters(this.ff)}this.events.ready.fire()};vB_YUI_Upload.prototype.setvars=function(E,B,F,C){this.phrases=B;this.extensions=E;this.attachlimit=F;this.max_file_size=C;var D="";for(var A in E){D+=(D!=""?";":"")+"*."+A}this.ff=new Array({description:this.phrases.all_files,extensions:D})};vB_YUI_Upload.prototype.select=function(G){if(G.fileList!=null){if(this.filelist){for(var I in this.filelist){var F=YAHOO.util.Dom.get(this.filelist[I].id);if(F){F.parentNode.removeChild(F)}}}var E=YAHOO.util.Dom.getElementsByClassName("asset_div","","asset_upload_list");var M=0;this.filelist={};var B=new Array();for(var I in G.fileList){var J=I.match(/\d+$/);B.push(J)}B.sort(function(P,O){return P-O});for(var I=0;I<B.length;I++){this.filelist["file"+B[I]]=G.fileList["file"+B[I]]}for(var I in this.filelist){var L="";var C=this.filelist[I].id;var F=YAHOO.util.Dom.get("sampleli");var D=F.cloneNode(true);YAHOO.util.Dom.get("uploadprogress_ul").appendChild(D);YAHOO.util.Dom.setAttribute(D,"id",C);YAHOO.util.Dom.removeClass(D,"hidden");var A=YAHOO.util.Dom.getElementsByClassName("name","div",D);A[0].innerHTML=this.filelist[I].name;YAHOO.util.Dom.setAttribute(A[0],"title",this.filelist[I].name);var N=YAHOO.util.Dom.getElementsByClassName("size","div",D);N[0].innerHTML=format_filesize(this.filelist[I].size);if(this.max_file_size&&this.filelist[I].size>this.max_file_size){L=this.phrases.file_is_too_large}else{var H=this.filelist[I].name.lastIndexOf(".");if(H!=-1){var K=this.filelist[I].name.substr(H+1).toLowerCase();if(!YAHOO.lang.hasOwnProperty(this.extensions,K)){L=this.phrases.invalid_file}else{if(this.extensions[K]!=0&&this.filelist[I].size>this.extensions[K]&&!PHP.in_array(K,new Array("jpg","jpe","jpeg","gif","png"),true)){L=this.phrases.file_is_too_large}else{if(this.attachlimit==0||(E.length+M)<this.attachlimit){M++}else{L=this.phrases.maximum_number_of_attachments_reached}}}}else{L=this.phrases.invalid_file}}if(L){this.uploader.removeFile(C);delete (this.filelist[C]);this.displayerror(C,L)}}YAHOO.util.Dom.removeClass("yui_clearlist","hidden");YAHOO.util.Dom.removeClass("yui_uploadfiles","hidden");YAHOO.util.Dom.addClass("yui_clearlist","displayinline");YAHOO.util.Dom.addClass("yui_uploadfiles","displayinline");this.moveflashobj();this.events.select.fire();this.errors=0}this.updatetotal()};vB_YUI_Upload.prototype.clear=function(D){try{this.uploader.cancel()}catch(D){}try{this.uploader.clearFileList()}catch(D){}var E=YAHOO.util.Dom.get("uploadprogress_ul");var B=E.getElementsByTagName("li");if(B.length){var C=B.length;for(var A=1;A<C;A++){E.removeChild(B[1])}}YAHOO.util.Dom.addClass("yui_clearlist","hidden");YAHOO.util.Dom.addClass("yui_uploadfiles","hidden");YAHOO.util.Dom.addClass("yui_selectfilestext","displayinline");YAHOO.util.Dom.removeClass("yui_clearlist","displayinline");YAHOO.util.Dom.removeClass("yui_uploadfiles","displayinline");YAHOO.util.Dom.removeClass("yui_selectfilestext","hidden");YAHOO.util.Dom.removeClass("upload_controls_close3","hidden");this.moveflashobj();this.events.clear.fire();this.filelist=null;this.updatetotal();this.errors=0;this.success=false};function number_format(F,C,I,E){var B=F,A=C;B=!isFinite(+B)?0:+B;A=!isFinite(+A)?0:Math.abs(A);var L=(typeof E=="undefined")?",":E;var D=(typeof I=="undefined")?".":I;var K=(A>0)?B.toFixed(A):Math.round(B).toFixed(A);var J=Math.abs(B).toFixed(A);var H,G;if(J>=1000){H=J.split(/\D/);G=H[0].length%3||3;H[0]=K.slice(0,G+(B<0))+H[0].slice(G).replace(/(\d{3})/g,L+"$1");K=H.join(D)}else{K=K.replace(".",D)}return K}function format_filesize(C){if(C==0){return C}var A=2;var B="";if(C>=1073741824){C=C/1073741824;B="GB"}else{if(C>=1048576){C=C/1048576;B="MB"}else{if(C>=1024){C=C/1024;A=1;B="KB"}else{C=C/1024;A=2;B="KB"}}}return number_format(C,A)+" "+B};