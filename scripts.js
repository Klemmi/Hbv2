
//fall sem reiknar ut erfdaskatt
function Arfur(){
	var upphaed = document.getElementById("a_arfur").value;
	upphaed = Number(upphaed);
	var skattleysismork = Number(1500000);
	var fyrirframArfur = document.getElementById("arfur_fyrirfram").checked;
	if (fyrirframArfur==false) {
		if (upphaed <= skattleysismork) {
			document.getElementById("p_arfgreidsla").innerHTML ="Utborgadur arfur: " + upphaed;
			document.getElementById("p_arfgreidslu_skattur").innerHTML ="Greytt i skatt: 0";
			return false;
		};
	};
	if (fyrirframArfur==true) {
		var SkilaBreyta = upphaed*0.9;
		SkilaBreyta = Number(SkilaBreyta);
		document.getElementById("p_arfgreidsla").innerHTML = "Utborgadur ardur: " + Math.ceil(SkilaBreyta);
		var Skattgreydsla = upphaed - SkilaBreyta;
		document.getElementById("p_arfgreidslu_skattur").innerHTML = "Greytt i skatt: " + Math.ceil(Skattgreydsla);
		return false;

	};
	var Skattskillt = upphaed - skattleysismork;
	var SkilaBreyta = skattleysismork + Skattskillt*0.9;
	document.getElementById("p_arfgreidsla").innerHTML = "Utborgadur ardur: " + Math.ceil(SkilaBreyta);
	var Skattgreydsla = upphaed - SkilaBreyta;
	document.getElementById("p_arfgreidslu_skattur").innerHTML = "Greytt i skatt: " + Math.ceil(Skattgreydsla);
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
	document.getElementById("output_borgadur_skattur").innerHTML = "Greytt i skatt: " + Borgad;
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
	document.getElementById("output_borgadur_skattur").innerHTML = "Greytt i skatt: " + Borgad;
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
		console.log(Nidurstada);
		Nidurstada = Nidurstada + (Breyta - step1)*skattur2;
		console.log(Breyta-step1);
		console.log(Nidurstada);
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