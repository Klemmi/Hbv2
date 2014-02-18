
//Fyrsta fallid sem keryt er. Fallid velur hvor adferdina a ad nota og keyrir
//validate fall eftir thvi hvor adferdin vard fyrir valinu.
function Validate(){
	if (document.getElementById("takki_manadarlaun").checked) {
		alert("ManadarLaun");
		if (ValidateManudur()) {
			Reikna();
		};
		return false;
	};
	if (document.getElementById("takki_timakaup").checked) {
		alert("timakaup");
	};
}

//Fall sem reiknar personuafslatt ut fra manadarkaupi
function Reikna(){
	var ManadarLaun = document.getElementById("b_laun").value;
	ManadarLaun = Number(ManadarLaun);
	var Personuafslattur = document.getElementById("b_fradrattur").value;
	Personuafslattur = Number(Personuafslattur);
	var Skattskillt = ManadarLaun;
	var SkilaBreyta = SkattUtreikningur(Skattskillt,Personuafslattur);
	//SkilaBreyta = SkilaBreyta;
	document.getElementById("b_utborgad").value = SkilaBreyta;
	
	return false;
}
//Fall sem reiknar radstofunartekjur sem tekur inn tekjur fyrir skatt og personuafslatt/
function SkattUtreikningur(Breyta, Personuafslattur){
	var skattur1 = 1 - 0.3732;
	var skattur2 = 1 - 0.4022;
	var skattur3 = 1 - 0.4622;
	var step1 = 241475;
	var step2 = 739509;
	var Nidurstada;
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