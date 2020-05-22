var Calculadora = {
  init: function(){
    this.asignarEventosBotones('tecla');
    this.asignarEventoNumeroDisplay();
    this.inicializarVariables();
    var numeroDisplay;
    var numeroDisplayDecimal;
    var numeroDisplayCantidadDecimales;
    var numeroDisplayCantidadDigitos;
    var numeroDisplayCantidadMaximaDigitos;
    var numeroDisplaySigno;
    var operandos;
    var operadores;
    var cantidadOperandos;
    var cantidadOperadores;
    var ultimoOperador;
  },
    asignarEventosBotones: function(selector){
      var botonesPagina = document.getElementsByClassName(selector);
      for (var i = 0; i < botonesPagina.length; i++) {
        botonesPagina[i].onmouseleave=this.eventoTeclaAumentarTamano;
      }
    },
    asignarEventoNumeroDisplay: function(){
      document.getElementById('0').onclick=this.eventoNumeroDisplay;
      document.getElementById('1').onclick=this.eventoNumeroDisplay;
      document.getElementById('2').onclick=this.eventoNumeroDisplay;
      document.getElementById('3').onclick=this.eventoNumeroDisplay;
      document.getElementById('4').onclick=this.eventoNumeroDisplay;
      document.getElementById('5').onclick=this.eventoNumeroDisplay;
      document.getElementById('6').onclick=this.eventoNumeroDisplay;
      document.getElementById('7').onclick=this.eventoNumeroDisplay;
      document.getElementById('8').onclick=this.eventoNumeroDisplay;
      document.getElementById('9').onclick=this.eventoNumeroDisplay;
      document.getElementById('on').onclick=this.eventoNumeroDisplayClean;
      document.getElementById('punto').onclick=this.eventoNumeroDisplayPunto;
      document.getElementById('sign').onclick=this.eventoNumeroDisplaySigno;
      document.getElementById('mas').onclick=this.eventoNumeroSuma;
      document.getElementById('menos').onclick=this.eventoNumeroResta;
      document.getElementById('dividido').onclick=this.eventoNumeroDivision;
      document.getElementById('por').onclick=this.eventoNumeroMultiplicacion;
      document.getElementById('raiz').onclick=this.eventoNumeroRaiz;
      document.getElementById('igual').onclick=this.eventoIgual;
    },
    inicializarVariables: function(){
      this.numeroDisplay = 0;
      this.numeroDisplayDecimal = 0;
      this.numeroDisplayCantidadDecimales = 0;
      this.numeroDisplayCantidadDigitos = 0;
      this.numeroDisplayCantidadMaximaDigitos = 8;
      this.numeroDisplaySigno = 1;
      this.operandos = [];
      this.operadores = [];
      this.cantidadOperandos = 0;
      this.cantidadOperadores = 0;
      this.ultimoOperador='+';
    },
    eventoNumeroDisplay: function(){
      Calculadora.eventoTeclaAchicarTamano();
      var CantidadDigitosMaximo = Number(Calculadora.numeroDisplayCantidadMaximaDigitos);
      var CantidadDigitos = Number(Calculadora.numeroDisplayCantidadDigitos);
      CantidadDigitos = CantidadDigitos + 1;
      Calculadora.numeroDisplayCantidadDigitos = CantidadDigitos;

      if (Calculadora.numeroDisplayCantidadDecimales == 0)
      {
        var NuevoNumero = Number(event.currentTarget.id);
        var NumeroActual = Number(Calculadora.numeroDisplay);
        NumeroActual = NumeroActual * 10 + NuevoNumero;
        Calculadora.numeroDisplay = NumeroActual;
      }
      else
      {
        var NuevoNumero = Number(event.currentTarget.id);
        //var NumeroActual = Number(Calculadora.numeroDisplay);
        var NumeroActualDecimal = Number(Calculadora.numeroDisplayDecimal);
        var NumeroCantidadDecimales = Number(Calculadora.numeroDisplayCantidadDecimales);

        NumeroActualDecimal = NumeroActualDecimal * 10 + NuevoNumero;
        NumeroCantidadDecimales = NumeroCantidadDecimales + 1;

        Calculadora.numeroDisplayDecimal = NumeroActualDecimal;
        Calculadora.numeroDisplayCantidadDecimales = NumeroCantidadDecimales;
      }
      Calculadora.mostrarDisplay();
    },
    eventoNumeroDisplayClean: function(){
      Calculadora.eventoTeclaAchicarTamano();
      Calculadora.numeroDisplay = 0;
      Calculadora.numeroDisplayDecimal = 0;
      Calculadora.numeroDisplayCantidadDecimales = 0;
      Calculadora.numeroDisplayCantidadDigitos = 0;
      Calculadora.numeroDisplaySigno = 1;
      document.getElementById('display').innerHTML=0;
    },
    eventoNumeroDisplayPunto: function(){
      Calculadora.eventoTeclaAchicarTamano();
      if (Calculadora.numeroDisplayCantidadDecimales == 0)
      {
        Calculadora.numeroDisplayCantidadDecimales = 1;
      }
    },
    eventoNumeroDisplaySigno: function(){
      Calculadora.eventoTeclaAchicarTamano();
      if (Calculadora.numeroDisplaySigno == 0){
        Calculadora.numeroDisplaySigno = 1;
      }else{
        Calculadora.numeroDisplaySigno = 0;
      }
      Calculadora.mostrarDisplay();
    },
    mostrarDisplay: function(){
      var mostrarDisplay = '';
      var mostrarDisplayFinal = '';
      var aux = '';
      var aux2 = '';
      var aux3 = 0;
      var CantidadDigitosMaximo = Number(Calculadora.numeroDisplayCantidadMaximaDigitos);
      if(Calculadora.numeroDisplaySigno == 0 && (Calculadora.numeroDisplay != 0
                                        || Calculadora.numeroDisplayCantidadDecimales > 0))
      {
        mostrarDisplay = '-';
      }
      mostrarDisplay = mostrarDisplay + Calculadora.numeroDisplay;

      if(Calculadora.numeroDisplayCantidadDecimales > 0)
      {
        if (Calculadora.numeroDisplayCantidadDecimales == 1)
        {
          mostrarDisplay = mostrarDisplay + '.';
        }
        else
        {
          mostrarDisplay = mostrarDisplay + '.';
          aux = Calculadora.numeroDisplayDecimal.toString();
          aux3 = Calculadora.numeroDisplayCantidadDecimales - aux.length;
          while(aux3 > 1)
          {
            mostrarDisplay = mostrarDisplay + '0';
            aux3 = aux3 - 1;
          }
          mostrarDisplay = mostrarDisplay + Calculadora.numeroDisplayDecimal;
        }
      }
      mostrarDisplayFinal = mostrarDisplay.substring(0, CantidadDigitosMaximo);
      document.getElementById('display').innerHTML = mostrarDisplayFinal;
      //alert(mostrarDisplay);
    },
    eventoNumeroSuma: function(){
      Calculadora.eventoTeclaAchicarTamano();
      if (Calculadora.ultimoOperador == '=')
      {
        Calculadora.cantidadOperandos = 0;
        Calculadora.cantidadOperadores = 0;
        Calculadora.operandos = [];
        Calculadora.operadores = [];
      }
      Calculadora.guardarOperacion('+');
      Calculadora.ultimoOperador = '+';
    },
    eventoNumeroResta: function(){
      Calculadora.eventoTeclaAchicarTamano();
      if (Calculadora.ultimoOperador == '=')
      {
        Calculadora.cantidadOperandos = 0;
        Calculadora.cantidadOperadores = 0;
        Calculadora.operandos = [];
        Calculadora.operadores = [];
      }
      Calculadora.guardarOperacion('-');
      Calculadora.ultimoOperador = '-';
    },
    eventoNumeroDivision: function(){
      Calculadora.eventoTeclaAchicarTamano();
      if (Calculadora.ultimoOperador == '=')
      {
        Calculadora.cantidadOperandos = 0;
        Calculadora.cantidadOperadores = 0;
        Calculadora.operandos = [];
        Calculadora.operadores = [];
      }
      Calculadora.guardarOperacion('/');
      Calculadora.ultimoOperador = '/';
    },
    eventoNumeroMultiplicacion: function(){
      Calculadora.eventoTeclaAchicarTamano();
      if (Calculadora.ultimoOperador == '=')
      {
        Calculadora.cantidadOperandos = 0;
        Calculadora.cantidadOperadores = 0;
        Calculadora.operandos = [];
        Calculadora.operadores = [];
      }
      Calculadora.guardarOperacion('*');
      Calculadora.ultimoOperador = '*';
    },
    eventoIgual: function(){
      Calculadora.eventoTeclaAchicarTamano();
      Calculadora.guardarOperacion('=');
      var totalOperacion = parseFloat("0");
      var auxOp = parseFloat("1");
      var auxOp2 = parseFloat("0");
      var cantidadOperandos = Number(Calculadora.cantidadOperandos);
      var i = 0;
      var j = 0;
      var operandosAux = [];
      var operadoresAux = [];
      var tamano = '';
      var ultOperador = '';
      var ultOperando = 0;
      if (Calculadora.ultimoOperador != '=')
      {
        ultOperador = Calculadora.operadores[cantidadOperandos - 2];
        ultOperando = Calculadora.operandos[cantidadOperandos - 1];
      }
      else
      {
        ultOperador = Calculadora.operadores[0];
        ultOperando = Calculadora.operandos[0];
        Calculadora.operandos[0] = Calculadora.operandos[1];
        Calculadora.operandos[1] = ultOperando;
      }
      while (i < cantidadOperandos)
      {
        if (auxOp2 == 0)
        {
          auxOp = Calculadora.operandos[i];
        }
        if (Calculadora.operadores[i] == '*')
        {
          auxOp = auxOp * Calculadora.operandos[i+1];
          //auxOp = parseFloat(auxOp).toFixed(5);
          auxOp2 = 1;
        }
        if (Calculadora.operadores[i] == '/')
        {
          auxOp = auxOp / Calculadora.operandos[i+1];
          //auxOp = parseFloat(auxOp).toFixed(5);
          auxOp2 = 1;
        }
        if (Calculadora.operadores[i] == '+')
        {
          j = operandosAux.push(auxOp);
          j = operadoresAux.push('+');
          auxOp2 = 0;
          auxOp = 1;
        }
        if (Calculadora.operadores[i] == '-')
        {
          j = operandosAux.push(auxOp);
          j = operadoresAux.push('-');
          auxOp2 = 0;
          auxOp = 1;
        }
        if (Calculadora.operadores[i] == '=')
        {
          j = operandosAux.push(auxOp);
          j = operadoresAux.push('=');
        }
        i = i + 1;
      }
      /*i = 0;
      j = operadoresAux.length;
      while (i < j)
      {
        alert(operandosAux[i]);
        alert(operadoresAux[i]);
        i = i + 1;
      }*/
      totalOperacion = operandosAux[0];
      i = 0;
      while (operadoresAux[i] != '=')
      {
        if (operadoresAux[i] == '+')
        {
          totalOperacion = totalOperacion + operandosAux[i+1];
        }
        if (operadoresAux[i] == '-')
        {
          totalOperacion = totalOperacion - operandosAux[i+1];
        }
        i = i + 1;
      }

      Calculadora.inicializarVariables();
      if (totalOperacion < 0)
      {
        Calculadora.numeroDisplaySigno = 0;
        totalOperacion = totalOperacion * -1;
      }
      parteEntera = Math.trunc(totalOperacion);
      Calculadora.numeroDisplay = parteEntera;
      parteDecimal = totalOperacion - parteEntera;
      tamano = parteDecimal.toString();
      Calculadora.numeroDisplayCantidadDecimales = tamano.length - 1;
      parteDecimal = parteDecimal * (10 ** (Calculadora.numeroDisplayCantidadDecimales-1));
      Calculadora.numeroDisplayDecimal = parteDecimal;
      tamano = parteEntera.toString();
      Calculadora.numeroDisplayCantidadDigitos = tamano.length + Calculadora.numeroDisplayCantidadDecimales - 1;

      Calculadora.mostrarDisplay();
      Calculadora.ultimoOperador = '=';
      Calculadora.cantidadOperandos = Calculadora.operandos.push(ultOperando);
      Calculadora.cantidadOperadores = Calculadora.operadores.push(ultOperador);
    },
    guardarOperacion: function(op){
      document.getElementById('display').innerHTML = '';
      Calculadora.cantidadOperadores = Calculadora.operadores.push(op);
      var parteEntera = Number(Calculadora.numeroDisplay);
      var parteDecimal = Number(Calculadora.numeroDisplayDecimal);
      var cantidadDecimales = Number(Calculadora.numeroDisplayCantidadDecimales) - 1;
      var numeroFinal = parteEntera + (parteDecimal / (10 ** cantidadDecimales));
      if (Calculadora.numeroDisplaySigno == 0)
      {
        numeroFinal = numeroFinal * -1;
      }

      Calculadora.cantidadOperandos = Calculadora.operandos.push(numeroFinal);

      Calculadora.numeroDisplay = 0;
      Calculadora.numeroDisplayDecimal = 0;
      Calculadora.numeroDisplayCantidadDecimales = 0;
      Calculadora.numeroDisplayCantidadDigitos = 0;
      Calculadora.numeroDisplaySigno = 1;
    },
    eventoNumeroRaiz: function(){
      var i = Number(Calculadora.cantidadOperandos);
      var j = Number(Calculadora.cantidadOperadores);
      var x = 0;
      while (x < i)
      {
        alert(Calculadora.operandos[x]);
        x = x + 1;
      }
      x = 0;
      while (x < j)
      {
        alert(Calculadora.operadores[x]);
        x = x + 1;
      }
    },
    eventoTeclaAchicarTamano: function(){
      event.currentTarget.style.transform="scale(0.9)";
    },
    eventoTeclaAumentarTamano: function(){
      event.currentTarget.style.transform="scale(1)";
    }
}

Calculadora.init();
