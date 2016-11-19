/*var pressTimer

        $('resetrsf').mouseup(function(){
          clearTimeout(pressTimer)
          // Clear timeout
          return false;
        }).mousedown(function(){
          // Set timeout
          alert('hi');
          pressTimer = window.setTimeout(function() {alert('held');},1000);
          
          return false; 
        }).click(function(){ alert('his');return false; });*/


var loadingtime=null;
function loadingscreen(toggle){
    var ltint=5000;
    if(toggle=='show'){
        loadingscreen('hide');
        document.getElementById('loading').style.display='block';
        var loadingtime = setTimeout(lstimeout, ltint);
    }if(toggle=='hide'){
        document.getElementById('loading').style.display='none';
        document.getElementById('closeloading').style.display='none';
        document.getElementById('slowclosetxt').style.display='none';
        document.getElementById('loadingtxt').innerHTML='Loading...';
        clearTimeout(loadingtime);
    }if(toggle=='timeoutf'){
        document.getElementById('slowclosetxt').style.display='block';
        document.getElementById('closeloading').style.display='block';
    }if(toggle.substring(0,10)=='updatetxt='){
        document.getElementById('loadingtxt').innerHTML='Loading...'+toggle.substring(10);
        clearTimeout(loadingtime);
        var loadingtime = setTimeout(lstimeout, ltint);
    }
}function lstimeout(){loadingscreen('timeoutf');}

function hammingCounter(){
    loadingscreen('show');
        var info = hammingCode(document.getElementById('input1').value,document.getElementById('input2').value);
        if(info['error']=='true'){
            alertify.error(info['message']).dismissOthers();
        }else{
            document.getElementById('HammingOutput').innerHTML="First DNA Strand: &nbsp;"+document.getElementById("input1").value+"<br>Second DNA Strand: "+document.getElementById("input2").value+"<br>Differences: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+info["diff"]+"<br><br>Number of Differences:<br>"+info["numdiff"];
        }
    var hide=setTimeout(function(){loadingscreen('hide')},1000);
}

function cutDNA(){
loadingscreen('show');
    if(document.getElementById("inputRSF").value!=''){
        
    
        document.getElementById("inputRSF").value=document.getElementById("inputRSF").value.toUpperCase();
        var info=restrictionSiteFinder(document.getElementById("inputRSF").value,'RE-','REa-','REb-');
        console.log(info);
        if(
        info['error']=='true'){
                alertify.error(info['message']).dismissOthers();
        }else{
            //document.getElementById('RSFiOutput').value=document.getElementById("inputRSF").value;
            //document.getElementById('RSFcOutput').value=info['cutDNA'];
            document.getElementById('RSFeOutput').innerHTML="Input Strand:<br><br>"+document.getElementById("inputRSF").value+"<br><br>Cut Strand:<br><br>"+info['cutDNA']+"<br><br>Active Restriction Sites; Number of Sites:<br><br>"+info['REstuff'];
        }
    }else{
        alertify.error('The input is empty! Please enter something in the input.');
    }
    var hide=setTimeout(function(){loadingscreen('hide')},1000);
}

function rsfFullReset(){
    loadingscreen('show');
    document.getElementById('inputRSF').value='';
    document.getElementById('RSFeOutput').innerHTML="";
    var i=1;
    while(i<10){
        document.getElementById('RE-'+i).checked=false;
        document.getElementById('REa-'+i).value=document.getElementById('REa-'+i).getAttribute('ovalue');
        document.getElementById('REb-'+i).value=document.getElementById('REb-'+i).getAttribute('ovalue');
        i++;
    }
    var hide=setTimeout(function(){loadingscreen('hide')},1000);
}

function togglekeyboard(){

 //$("#custkeys").hide(); 
 if($(this).attr("class") == "toggle"){ 
    $(this).removeClass("toggle");
    $(this).addClass("add_active"); 
}else{ 
    $(this).removeClass("add_active"); 
    $(this).addClass("toggle"); 
} 
$("#custkeys").slideToggle("fast"); 
return false;

}

/*
    $("#custkeys").hide(); 
        $("#custkeys").click(function(){    
        if($(this).attr("class") == "toggle"){
            $(this).removeClass("toggle");
            $(this).addClass("add_active");
        }else{
            $(this).removeClass("add_active");
            $(this).addClass("toggle");
        }
        $("#custkeys").slideToggle("fast");
        return false;
    });
    */



function fscrollleft(){
    //while(true){
        function pageScroll() {
            document.getElementById('input').scrollLeft=1;
            scrolldelay = setTimeout(pageScroll,10);
        }
    
    //}
    alertify.error(document.getElementById('input').scrollleft);
}

function custkeys(btn){
    if(document.getElementById("DNA2").checked){
        var DNAinput="input2";
    }else{
        var DNAinput="input1";
    }
    document.getElementById(DNAinput).value=document.getElementById(DNAinput).value+btn.innerHTML;
    document.getElementById(DNAinput).scrollLeft=document.getElementById(DNAinput).scrollWidth;
}

function hamKey(){
    
}

function inputStrandConv(type){
    if(type=='mRNA'){
        document.getElementById('input').value=document.getElementById('input').value.replace(/T|t,/gi, 'U');
        document.getElementById('custkeyTU').innerHTML='U';
    }else{
        document.getElementById('input').value=document.getElementById('input').value.replace(/U|u,/gi, 'T');
        document.getElementById('custkeyTU').innerHTML='T';
    }
}
function caps(id){
    if(id=='input1' || id=='input2'){
        document.getElementById(id).value=document.getElementById(id).value.replace(/-/gi, "_");
        document.getElementById(('lenght'+id)).innerHTML=document.getElementById((id)).value.length;
        if(document.getElementById('input1').value.length !== document.getElementById('input2').value.length){
            document.getElementById('hstrlength1').setAttribute('color','red');
            document.getElementById('hstrlength2').setAttribute('color','red');
        }else{
            document.getElementById('hstrlength1').setAttribute('color','green');
            document.getElementById('hstrlength2').setAttribute('color','green');
        }
        
    }
    document.getElementById(id).value = document.getElementById(id).value.toUpperCase();
}
function acceptChar(key){
    if (key == 13) {
        if(document.getElementById('convert')!=null){ 
            document.getElementById('convert').click(); 
        }
        if(document.getElementById('cut')!=null){ 
            document.getElementById('cut').click(); 
        }
        return false; 
    }
    if(key == 46){return true;}
    if(key == 8){return true;}
    if(key == 40){return true;}
    if(key == 37){return true;}
    if(key == 39){return true;}
    if(key == 38){return true;}
    if(key !== 65){
        if(key !== 67){
            if(key !== 71){
                if(NAsel(key)==false){
                    return false;
                }
            }
        }
    }
    
    function NAsel(key){
        if(document.getElementById('strand')==null){
            if(key == 84){
                return true;
            }
            return false;
        }
        var strandType = getRadioVal(document.getElementById('strand'),'StrandType');
        if(strandType == 'DNA'){
            if(key == 84){return true;}
        }else if(strandType == 'mRNA'){
            if(key == 85){return true;}
        }
        return false;
    }
}function acceptCharh(key){
    if (key == 13) { 
        document.getElementById('compare').click(); 
        return false; 
    }
    if(key == 46){return true;}
    if(key == 8){return true;}
    if(key == 40){return true;}
    if(key == 37){return true;}
    if(key == 39){return true;}
    if(key == 38){return true;}
    if(key == 84){return true;}
    if(key == 189){return true;}
    if(key !== 65){
        if(key !== 67){
            if(key !== 71){
                return false;
            }
        }
    }
}


function nac(){
loadingscreen('show');
    var strandType = getRadioVal(document.getElementById('strand'),'StrandType');
    var info = converter(document.getElementById('input').value,strandType);
    if(info['error']=='true'){
        alertify.error(info['message']).dismissOthers();
    }else{
        document.getElementById('outputDNA').value=info['DNA'];
        document.getElementById('outputmRNA').value=info['mRNA'];
        document.getElementById('outputProtein').value=info['Prot'];
    }
var hide=setTimeout(function(){loadingscreen('hide')},1000);
}

function clearall(){
    document.getElementById('outputDNA').value='';
    document.getElementById('outputmRNA').value='';
    document.getElementById('outputProtein').value='';
    document.getElementById('input').value='';
    alertify.dismissAll();
}

function clearHamming(){
    document.getElementById('input1').value='';
    document.getElementById('input2').value='';
    document.getElementById('HammingOutput').innerHTML='';
    document.getElementById('DNA1').checked=true;
    document.getElementById('DNA2').checked=false;
    alertify.dismissAll();
}


function getRadioVal(form, name) {
    var val;
    // get list of radio buttons with specified name
    var radios = form.elements[name];
    
    // loop through list of radio buttons
    for (var i=0, len=radios.length; i<len; i++) {
        if ( radios[i].checked ) { // radio checked?
            val = radios[i].value; // if so, hold its value in val
            break; // and break out of for loop
        }
    }
    return val; // return value of checked radio or undefined if none checked
}
