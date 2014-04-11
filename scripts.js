
$(document).ready(function() {

	var heightBanner = $(".Banner").height();
    
    $('.test1').click(function() {
       
        $('html,body').animate({ scrollTop: $('#test1').offset().top - heightBanner }, 'slow');
    });
    
    $('.test2').click(function() {
       
        $('html,body').animate({ scrollTop: $('#test2').offset().top - heightBanner }, 'slow');

    });

    $('.test3').click(function() {
       
        $('html,body').animate({ scrollTop: $('#test3').offset().top - heightBanner }, 'slow');
    });

    $('.test4').click(function() {
       
        $('html,body').animate({ scrollTop: $('#test4').offset().top - heightBanner }, 'slow');
    });
    $('.headermynd').click(function() {
       
        $('html,body').animate({ scrollTop: $('.picHeader').offset().top - heightBanner }, 'slow');
    });
    //$('.test6').click(function() {
       
        //$('html,body').animate({ scrollTop: $('#identity').offset().top - heightBanner-50 }, 'slow');
     //   $('.dialog').load(this.href).dialog('open');

   // });
    Data();
});


var GlobalPersonuafslattur = 48485;
var GlobalData;
//Fall sem hledur  gognum
function Data(){
	$.getJSON("FFdata.json",function(data){
	GlobalData=data;		
	return true;
	});
}
//fall sem validatar fjarmagnstekjuskatt og skrifar ut skattgreidslu
function ValidateFTS(){
	var tekjur = document.getElementById("fts_fjarmagn").value;
	var skattur = Fjarmagnstekjuskattur(tekjur);
	tekjur = tekjur - skattur;
	skattur = numberWithCommas(skattur);
	tekjur = numberWithCommas(tekjur);
	
	document.getElementById("p_fjarmangstekjuskattur").innerHTML = "Greiddur fjármagnstekjuskattur: "+ skattur+" krónur" ;
	document.getElementById("p_fjarmangstekjur").innerHTML = "Nettótekjur: "+tekjur+" krónur" ;
	return false;
}
//fall sem reiknar fjarmangstekjusaktt
function Fjarmagnstekjuskattur(tekjur){
	tekjur = Number(tekjur);
	skattur = 0.2*tekjur;
	return skattur;
	return false;

}
//fall sem reiknar ut erfdaskatt
function Arfur(){
	var upphaed = document.getElementById("a_arfur").value;
	upphaed = Number(upphaed);
	var skattleysismork = Number(1500000);
	var fyrirframArfur = document.getElementById("arfur_fyrirfram").checked;
	if (fyrirframArfur==false) {
		if (upphaed <= skattleysismork) {
			upphaed = numberWithCommas(upphaed);
			document.getElementById("p_arfgreidsla").innerHTML ="Útborgaður arfur: " + upphaed+" krónur";
			document.getElementById("p_arfgreidslu_skattur").innerHTML ="Greitt í skatt: 0 krónur";
			return false;
		};
	};
	if (fyrirframArfur==true) {
		var SkilaBreyta = upphaed*0.9;
		SkilaBreyta = Number(SkilaBreyta);
		var Skattgreydsla = upphaed - SkilaBreyta;
		Math.ceil(SkilaBreyta)
		SkilaBreyta = numberWithCommas(SkilaBreyta);
		document.getElementById("p_arfgreidsla").innerHTML = "Útborgaður arfur: " + SkilaBreyta+" krónur";
		Math.ceil(Skattgreydsla)
		Skattgreydsla = numberWithCommas(Skattgreydsla);
		document.getElementById("p_arfgreidslu_skattur").innerHTML = "Greitt í skatt: " +Skattgreydsla +" krónur";
		return false;

	};
	var Skattskillt = upphaed - skattleysismork;
	var SkilaBreyta = skattleysismork + Skattskillt*0.9;
	SkilaBreyta = Number(SkilaBreyta);
	SkilaBreyta = Math.ceil(SkilaBreyta);
	var Skattgreydsla = upphaed - SkilaBreyta;
	SkilaBreyta = numberWithCommas(SkilaBreyta);

	document.getElementById("p_arfgreidsla").innerHTML = "Útborgaður ardur: " + SkilaBreyta+" krónur";
	
	Skattgreydsla = Math.ceil(Skattgreydsla);
	Skattgreydsla = numberWithCommas(Skattgreydsla);
	document.getElementById("p_arfgreidslu_skattur").innerHTML = "Greitt í skatt: " + Skattgreydsla+" krónur";
	return false;
}



//Fyrsta fallid sem keryt er. Fallid velur hvor adferdina a ad nota og keyrir
//validate fall eftir thvi hvor adferdin vard fyrir valinu.
function Validate(){
	if (document.getElementById("takki_manadarlaun").checked) {
		
		if (ValidateManudur()) {
			Reikna();
		};
		return false;
	};
	if (document.getElementById("takki_timakaup").checked) {
		
		ReiknaUtFraTima();
		return false;
	};
	return false;
}
//fall sem validatar framfaerslureiknivel
function ValidateFF(){
	var rett = true;//Breyta sem verdur false ef eitthvad test failar
	var ManadarLaun = document.getElementById("FF_laun").value;
	if (!Number(ManadarLaun)) {
		rett = false;
	};
	if (ManadarLaun<0) {
		rett = false;
	};
	if (rett) {
		ReiknaFramf();
	};
	return false;
}
//fall sem reiknar framfaerslu
function ReiknaFramf(){
	var laun = document.getElementById("FF_laun").value;
	var personuaflsattur = Number(GlobalPersonuafslattur);
	laun = Number(laun);
	var adults = document.getElementById("FF_adults").value;
	adults = Number(adults);
	var children = document.getElementById("FF_children").value;
	children = Number(children);
	var samtals = PrentaFF(adults,children);//samtals kostnadur
	var personuafslattur = GlobalPersonuafslattur;
	if (adults == 2) {
		personuafslattur = 2*personuafslattur;
	};
	var nettotekjur = SkattUtreikningur(laun,personuafslattur);
	PrentaTextaFF(samtals,nettotekjur);
	return false;
}
//Fall sem prentar ut texta um framfaerslu 
//Tekur inn kostnad vid ad lifa og tekjur eftir skatt.
function PrentaTextaFF(Kostnadur,Nettotekjur){
	Kostnadur = Number(Kostnadur);
	Kostnadur = Kostnadur*1000;
	Nettotekjur = Number(Nettotekjur);
	Kostnadur = Math.ceil(Kostnadur);
	Nettotekjur = Math.ceil(Nettotekjur);
	if (Kostnadur>Nettotekjur) {
		var tala = Kostnadur-Nettotekjur;
		tala = numberWithCommas(tala);
		document.getElementById("FF_birtingartexti2").innerHTML = "Þú hefur líklegast ekki ráð á því að reka þessa fjölskyldu miðað við gefin mánaðarlaun. Þú tapar um það bil " +tala+" krónum á mánuði. Þessi upphæð er án húsnæðiskostnaðar. " ;
	};
	if (Kostnadur<Nettotekjur) {
		var tala = Nettotekjur-Kostnadur;
		tala = numberWithCommas(tala);
		
		document.getElementById("FF_birtingartexti2").innerHTML = "Þú hefur ráð á að reka þessa fjölskyldu og muntu líklegast eiga "+tala+" krónur í afgang á mánuði. Þessi upphæð er án húsnæðiskostnaðar." ;
		
	};
	if (Kostnadur == Nettotekjur) {
		document.getElementById("FF_birtingartexti2").innerHTML = +"Þú hefur líklegast ráð á að reka þessa fjölskyldu en þarft samt að fara gætilega með peningana og getur þú ekki búist við því að eiga afgang í lok mánaðar. " ;
	};
	return false;
}
//Fall sem skrifar/prentar ut kostnad uppihaldskostnad fyrir Framfaerslu reiknivel
//tekur inn fjolda fullordinna og fjolda barna. skilar samtalskostnadi sem number.
function PrentaFF(adults,children){
	adults = Number(adults);
	children = Number(children);
	if (adults == 1) {
		var matur =  GlobalData[children]["Matur/ hrein.vörur"];
		var fot = GlobalData[children]["Föt/ skór"];
		var laeknir = GlobalData[children]["Læknis­kostn./lyf"];
		var tomst = GlobalData[children]["Tóm­stundir"];
		var samskipti = GlobalData[children]["Sam-skipti"];
		var onnurth = GlobalData[children]["Önnur þjónusta"];
		var samgongur = GlobalData[children]["Sam­göngur"];
		var samtals = GlobalData[children]["Samtals"];
	};
	if (adults == 2) {
		var matur =  GlobalData[6+children]["Matur/ hrein.vörur"];
		var fot = GlobalData[6+children]["Föt/ skór"];
		var laeknir = GlobalData[6+children]["Læknis­kostn./lyf"];
		var tomst = GlobalData[6+children]["Tóm­stundir"];
		var samskipti = GlobalData[6+children]["Sam-skipti"];
		var onnurth= GlobalData[6+children]["Önnur þjónusta"];
		var samgongur = GlobalData[children]["Sam­göngur"];
		var samtals = GlobalData[6+children]["Samtals"];
	};
	document.getElementById("FF_birtingartexti1").innerHTML = 
		"Matur og hreinlætisvörur:  " + matur + "kr" + "<br>" +
		"Föt og skór:  " + fot + "kr" + "<br>"+
		"Lækniskostnaður og lyf:  " + laeknir + "kr" + "<br>"+
		"Tómstundir:  " + tomst + "kr" + "<br>"+
		"Samskipti:  " + samskipti + "kr" + "<br>"+
		"Önnur þjónusta:  " + onnurth + "kr" + "<br>"+
		"Samgöngur :  " + samgongur + "kr" + "<br>"+
		"Samanlagður kostnaður:  " + samtals + "kr" + "<br>" 
		;
	return Number(samtals);
}
//fall sem leggur saman klst og timakaup og tekur skatt
function ReiknaUtFraTima(){
	var timar = document.getElementById("m_taxti").value;
	var timakaup = document.getElementById("m_timar").value;
	var Personuafslattur = document.getElementById("b_fradrattur").value;
	timar = Number(timar);
	timakaup = Number(timakaup);
	var kaup = timar * timakaup;
	var SkilaBreyta = SkattUtreikningur(kaup,Personuafslattur);
	SkilaBreyta = Math.ceil(SkilaBreyta);
	Borgad = kaup - SkilaBreyta;
	SkilaBreyta = numberWithCommas(SkilaBreyta);
	Borgad = numberWithCommas(Borgad);
	document.getElementById("output_borgadur_skattur").innerHTML = "Greitt i skatt: " + Borgad;
	document.getElementById("output_utborgad").innerHTML = "Utborgud laun: " + SkilaBreyta;
	return false;
}

//Fall sem reiknar personuafslatt ut fra manadarkaupi
function Reikna(){
	var ManadarLaun = document.getElementById("b_laun").value;
	ManadarLaun = Number(ManadarLaun);
	var Personuafslattur = document.getElementById("b_fradrattur").value;
	Personuafslattur = Number(Personuafslattur);
	var Skattskillt = ManadarLaun;
	var SkilaBreyta = SkattUtreikningur(Skattskillt,Personuafslattur);
	SkilaBreyta = Math.ceil(SkilaBreyta);
	//SkilaBreyta = SkilaBreyta;
	Borgad = ManadarLaun - SkilaBreyta;
	SkilaBreyta = numberWithCommas(SkilaBreyta);
	Borgad = numberWithCommas(Borgad);
	document.getElementById("output_borgadur_skattur").innerHTML = "Greitt i skatt: " + Borgad;
	document.getElementById("output_utborgad").innerHTML = "Utborgud laun: " + SkilaBreyta;
	
	return false;
}
//Falls sem tekur inn heildarlaun(brutto tekjur) og personuafsslatt og skilar 
//tekjum eftir skatt (netto tekjum)
function SkattUtreikningur(Breyta, Personuafslattur){
	var skattur1 = 1 - 0.3732;
	var skattur2 = 1 - 0.4022;
	var skattur3 = 1 - 0.4622;
	var step1 = 241475;
	var step2 = 739509;
	var Nidurstada;
	Breyta = Number(Breyta);
	Personuafslattur = Number(Personuafslattur);
	if (Breyta >= step2){
		Nidurstada = step1*skattur1+Personuafslattur;
		Nidurstada = Nidurstada + (step2-step1)*skattur2;
		Nidurstada = Nidurstada + (Breyta - step2)*skattur3; 
		return Nidurstada;
	};
	if (Breyta > step1) {
		Nidurstada = step1*skattur1+Personuafslattur;	
		Nidurstada = Nidurstada + (Breyta - step1)*skattur2;
		return Nidurstada;
	};
	if (Breyta <=step1) {
		if (Breyta*(1-skattur1)<Personuafslattur) {
			Nidurstada = Breyta;
			return Nidurstada;
		};
		Nidurstada = Breyta*skattur1 + Personuafslattur;
		return Nidurstada;
	};
	return false;
}
//Validatar ef reiknad eru ut fra manadarkeupi.
function  ValidateManudur(){
	var rett = true;//Breyta sem verdur false ef eitthvad test failar
	var ManadarLaun = document.getElementById("b_laun").value;
	if (!Number(ManadarLaun)) {
		rett = false;
	};
	if (ManadarLaun<0) {
		rett = false;
	};

	return rett;
}
//Fall sem setur tolur med punktum inn
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}