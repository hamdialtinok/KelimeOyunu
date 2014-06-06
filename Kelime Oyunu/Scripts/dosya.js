var soruArray=new Array();
var level= 1;
var index=0;
var c=0;
var t;
var timer_is_on=0;
var puan = 0;
var puan2 = 0;
var hexaCount = 4;
var oldHarfs = new Array();
var oldHarfCount = 0;
function XMLReader(){
	if (window.XMLHttpRequest)
	{	// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{	// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET","sorular.xml",false);
	xmlhttp.send();
	xmlDoc=xmlhttp.responseXML;
	//level=xmlDoc.getElementsByTagName("kelimeOyunu")[0].getAttribute("level");
	sorular=xmlDoc.getElementsByTagName("sorular");
	var i=0;
	for(i=0;i<sorular.length;i++)
	{
		soruLevel=sorular[i].getAttribute("level");
		if(level==soruLevel)
			break;
	}
	soru=sorular[i].getElementsByTagName("soru");
	for(i=0;i<soru.length;i++)
	{
		soruArray[i]=new Array();
		soruArray[i]["class"]=soru[i].getAttribute("class");
		soruArray[i]["cevap"]=soru[i].getElementsByTagName("cevap")[0].childNodes[0].nodeValue;
		soruArray[i]["soru"] = soru[i].getElementsByTagName("q")[0].childNodes[0].nodeValue;		
        
	}
    puan2 = soruArray[0]["class"] * 100;
    document.getElementById('txtPuan').value = puan2;
      
}
function yaz()
{
	XMLReader();
	for(i=0;i<14;i++)
	{
		document.write(soruArray[i]["class"] + "<br />");
		document.write(soruArray[i]["cevap"] + "<br />");
		document.write(soruArray[i]["soru"] + "<br /><br />");					
	}
	level++;	
	XMLWrite();	
}
function XMLWrite()
{
	if (window.XMLHttpRequest)
	{	// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{	// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET","sorular.xml",false);
	xmlhttp.send();
	xmlDoc=xmlhttp.responseXML;
	level++;
	xmlDoc.getElementsByTagName('kelimeOyunu')[0].setAttribute("level",level);
	
	//document.write(xmlDoc.getElementsByTagName('kelimeOyunu')[0].getAttribute("level"));
	
}
function getYeniSoru()
{
		if(index<14){
			//document.write(soruArray[index]["class"] + "<br />");
			//document.write(soruArray[index]["cevap"] + "<br />");
			//document.write(soruArray[index]["soru"] + "<br /><br />");
			txtSoru=soruArray[index]["soru"];
			txtCevap=soruArray[index]["class"];
			txt="Soru:  "+txtSoru+"<br />Cevap: "+txtCevap;
			//document.getElementById("soru").innerHTML=txt;
			var TheTextBox = document.getElementById("txtSoru");
			TheTextBox.value = txtSoru;			
			//var userCevap=document.getElementById("txtUserCevap");
			//userCevap.maxLength=txtCevap;
			puan2 = soruArray[index]["class"] * 100;
			document.getElementById('txtPuan').value = puan2;
			index++;
			hexaCount = soruArray[index - 1]["class"];
			oldHarfs = new Array();
			displayHexagon();
		}
		else if(index==14) {
		    
			//document.write("Yarýþma bitti" + "<br />");
			stopCount();
			index = 0;
			var tempV = puan+puan2;
			puan=0;
			c=0;
			document.getElementById('txtPuan').value = puan;
			document.getElementById('txtToplam').value = puan;
			XMLWrite();
			doTimer();
			alert("Yarisma Bitti! Puaniniz: " + tempV);
			//window.location = "index.html";
		}
}
function timedCount()
{
	if(c==320)
	{
		document.write("Süre bitti" + "<br />");
		stopCount();
	}
	
	document.getElementById('txtTime').value=c;
	c=c+1;
	t=setTimeout("timedCount()",1000);
}

function doTimer()
{	
	if (!timer_is_on)
	{
		XMLReader();
		getYeniSoru();
		timer_is_on=1;
		timedCount();
	}
}

function stopCount()
{
	clearTimeout(t);
	timer_is_on=0;
}
function compareResult()
{
    if (index == 14)
        getYeniSoru();
    else {
        userCevap = document.getElementById('txtCevap').value;
        dogruCevap = soruArray[index - 1]["cevap"];
        var p = soruArray[index - 1]["class"] * 100;
        document.getElementById('txtPuan').value = soruArray[index - 1]["class"] * 100;
        if (userCevap == dogruCevap) {

            puan = puan + puan2;
            document.getElementById('txtToplam').value = puan;
            getYeniSoru();
        }
        else {

            puan = puan - p;
            document.getElementById('txtToplam').value = puan;
            getYeniSoru();
        }
        document.getElementById('txtCevap').value = "";
    }
}
function harfLutfen() {
    puan2 = puan2 - 100;
    var harf = new Array();
    harf = soruArray[index - 1]["cevap"];
    var randomnumber;
    var flag=true;
    if (oldHarfs != null) {
        while (flag == true) {
            flag = false;
            randomnumber = Math.floor(Math.random() * harf.length);
            for (var i = 0; i < oldHarfs.length; i++) {
                if (randomnumber == oldHarfs[i]) {
                    flag = true;
                    break;
                }
            }
        }
        oldHarfs[oldHarfCount] = randomnumber;
        oldHarfCount++;
    }
    else {
        randomnumber = Math.floor(Math.random() * harf.length);
        oldHarfs[0] = randomnumber;
        oldHarfCount++;
    }
    

    var a = document.getElementById('hexagon' + randomnumber + '');
    a.innerHTML = harf[randomnumber];
    document.getElementById('txtPuan').value = puan2;
    if (oldHarfCount == soruArray[index - 1]["class"]) {
        oldHarfCount = 0;
        puan = puan - soruArray[index - 1]["class"] * 100;
        document.getElementById('txtToplam').value = puan ;
        alert("Dogru Cevap: " + soruArray[index - 1]["cevap"]);      
        getYeniSoru();
    }
}

function tahminEt() {

}

function displayHexagon() {
    var i = hexaCount;
    var element = document.getElementById("hexagon");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    for (var j = 0; j < i; j++) {
        hex = document.createElement("div");
        hex.id = "hexagon" + j;
        hex.className = "hexagon";
        document.getElementById('hexagon').appendChild(hex);
    }
}