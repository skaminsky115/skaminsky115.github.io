function inputcheckdown(e, ths, button, nasel=false){
    if (e.keyCode == 13) { 
        var start=ths.selectionStart;
        var end = ths.selectionEnd;
        var text=ths.value;
        var text=text.toUpperCase();
        var info = dnaorrna(ths, text, nasel);
        var dnakey = info['key'], ntext = info['txt'];
        if(ntext!=text){
            ths.value=ntext
            ths.setSelectionRange(start-(text.length - ntext.length),end-(text.length - ntext.length));
        }else{
            ths.value=ths.value.toUpperCase();
            ths.setSelectionRange(start, end);
        }
        document.getElementById(button).click();
        e.preventDefault();
    }
    // Allow: backspace, delete, tab, escape, enter and
    if ($.inArray(e.keyCode, [46, 8, 27, 13, 110]) !== -1 ||
      // Allow: Ctrl+A,Ctrl+C,Ctrl+V, Command+A
      ((e.keyCode == 65 || e.keyCode == 86 || e.keyCode == 67 || e.keyCode == 88 || e.keyCode == 90 || e.keyCode == 89) && (e.ctrlKey === true || e.metaKey === true)) ||
      // Allow: home, end, left, right, down, up
      (e.keyCode >= 35 && e.keyCode <= 40)) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    var info = dnaorrna(ths, "", nasel);
    var dnakey = info['key'];
    acceptableKeys=[65, 67, 71];
    if (!acceptableKeys.includes(e.keyCode) && !dnakey.includes(e.keyCode)) {
      e.preventDefault();
    }
}
function inputcheckup(e, ths, nasel=false){
    var start=ths.selectionStart;
    var end = ths.selectionEnd;
    var text=ths.value;
    var text=text.toUpperCase();
    var info = dnaorrna(ths, text, nasel);
    var dnakey = info['key'], ntext = info['txt'];
    if(ntext!=text){
        ths.value=ntext
        ths.setSelectionRange(start-(text.length - ntext.length),end-(text.length - ntext.length));
    }else{
        ths.value=ths.value.toUpperCase();
        ths.setSelectionRange(start, end);
    }
}

function dnaorrna(ths, text, nasel){
    var doDNA = true;
    if(nasel){
        if(document.getElementById('strand')!=null){
            var strandType = getRadioVal(document.getElementById('strand'),'StrandType');
            if(strandType == 'mRNA'){
                doDNA = false;
            }
        }
    }
    if(doDNA){
        if(['input1', 'input2'].includes(ths.id)){
            var dnakey=[84, 189];
            var text = text.replace(/-/g,'_');
            var ntext=text.replace(/[^A|C|T|G|_]/g,"");
        }else{
            var dnakey=[84];
            var ntext=text.replace(/[^A|C|T|G]/g,"");
        }
    }else{
        var dnakey=[85];
        var ntext=text.replace(/[^A|C|U|G]/g,"");
    }
    return {'key':dnakey, 'txt':ntext};
}

function hamminghelper(id){
    if(id=='input1' || id=='input2'){
        document.getElementById(id).value=document.getElementById(id).value.replace(/-/gi, "_");
        document.getElementById('length'+id).innerHTML=document.getElementById(id).value.length;
        if(document.getElementById('input1').value.length !== document.getElementById('input2').value.length){
            document.getElementById('hstrlength1').setAttribute('color','red');
            document.getElementById('hstrlength2').setAttribute('color','red');
        }else{
            document.getElementById('hstrlength1').setAttribute('color','green');
            document.getElementById('hstrlength2').setAttribute('color','green');
        }
        
    }
}

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
    var input1 = document.getElementById('input1'), input2 = document.getElementById('input2');
    input1.value=input1.value.toUpperCase(), input2.value=input2.value.toUpperCase();
    var info = hammingCode(input1.value,input2.value);
    if(info['error']=='true'){
        alertify.error(info['message']).dismissOthers();
    }else{
        document.getElementById('HammingOutput').innerHTML="First DNA Strand: &nbsp;"+input1.value+"<br>Second DNA Strand: "+input2.value+"<br>Differences: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+info["diff"]+"<br><br>Number of Differences:<br>"+info["numdiff"];
    }
    var hide=setTimeout(function(){loadingscreen('hide')},1000);
}

function cutDNA(){
    loadingscreen('show');
    var inputRSF=document.getElementById("inputRSF");
    if(inputRSF.value!=''){
        inputRSF.value=inputRSF.value.toUpperCase();
        var info=restrictionSiteFinder(inputRSF.value,'RE-','REa-','REb-');
        console.log(info);
        if(info['error']=='true'){
                alertify.error(info['message']).dismissOthers();
        }else{
            document.getElementById("RSFeOutput").innerHTML="Input Strand:<br><br>"+inputRSF.value+"<br><br>Cut Strand:<br><br>"+info['cutDNA']+"<br><br>Active Restriction Sites; Number of Sites:<br><br>"+info['REstuff'];
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

function fscrollleft(){
        function pageScroll() {
            document.getElementById('input').scrollLeft=1;
            scrolldelay = setTimeout(pageScroll,10);
        }
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
    hamminghelper(DNAinput);
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

function nac(){
    loadingscreen('show');
    var strandType = getRadioVal(document.getElementById('strand'),'StrandType');
    document.getElementById('input').value = document.getElementById('input').value.toUpperCase();
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
