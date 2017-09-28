// JavaScript Document
function fone(obj,prox) {
	 switch(obj.value.length) {
		case 1:
			obj.value = "(" + obj.value;
			break;
		case 3:
			obj.value = obj.value + ")";
			break;	
		case 8:
			obj.value = obj.value + "-";
			break;	
		case 14:
			prox.focus();
			break;
	}
};
function formata_data(obj,prox) {
switch (obj.value.length) {
	case 2:
		obj.value = obj.value + "/";
		break;
	case 5:
		obj.value = obj.value + "/";
		break;
	case 9:
		prox.focus();
		break;
}
};
function Apenas_Numeros(caracter)
{
  var nTecla = 0;
  if (document.all) {
	  nTecla = caracter.keyCode;
  } else {
	  nTecla = caracter.which;
  }
  if ((nTecla> 47 && nTecla <58)
  || nTecla == 8 || nTecla == 127
  || nTecla == 0 || nTecla == 9  // 0 == Tab
  || nTecla == 13) { // 13 == Enter
	  return true;
  } else {
	  return false;
  }
}

 