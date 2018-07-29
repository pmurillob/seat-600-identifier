//Global Variables
var bastidorClean = 0,
    motorClean = 0,
    claveBast = "",
    claveMot = "",
    numCoche = 0,
    model = "",
    seat600normal = false,
    seat600e = false,
    preReseteo = false,
    elements = [];

function resetVariables(){
    bastidorClean = 0,
    motorClean = 0,
    claveBast = "",
    claveMot = "",
    numCoche = 0,
    model = "",
    seat600normal = false,
    seat600e = false,
    preReseteo = false,
    elements = [];
}

function identifyModel(){
  var bastidor = $('.bast-input').val();
  var motor = $('.mot-input').val();
  numCoche = Number($('.coche-input').val());
  claveBast = bastidor.substr(0, 2).toUpperCase();
  claveMot = motor.substr(0, 2).toUpperCase();
  bastidorClean = Number(bastidor.substr(-6)); 
  motorClean = Number(motor.substr(-6));
  if (Number(bastidorClean.toString().substr(0,1)) == 4){
    preReseteo = true;  
  }    
  switch(claveBast){ 
    case "10":
      claveBast = "100.106";
      if (Number(motorClean.toString().substr(0,1)) == 3){
          claveMot = "100.000";
      }else{
          claveMot = "100.006";
      }
      model = "SEAT 600 berlina";
      seat600normal = true; 
      preReseteo = true;  
      break;
    case "BA":
      if (claveMot == "BA"){
          model = "SEAT 600 berlina";
          seat600normal = true;
          break;
      }else{
          model = "SEAT 600-D berlina";
          break;
      }
    case "BB":
      if (claveMot == "BA"){
          model = "SEAT 600 comercial";
          seat600normal = true;
          break;
      }else{
          model = "SEAT 600-D comercial";
          break;
      }
      case "BH":
      if (claveMot == "BA"){
          model = "SEAT 600 descapotable";
          seat600normal = true;
          break;
      }else{
          model = "SEAT 600-D descapotable";
          break;
      }
      case "BT":
        model = "SEAT 800";
        break;
      case "BE":
        model = "SEAT 600-E";
        seat600e = true;
        break;
      case "BJ":
        model = "Autobastidor para furgonetas";
        break; 
      case "BU":
        model = "Autobastidor para carroceros";
        break; 
      case "BG":
        model = "SEAT 600-L Especial";
        break;      
      default :
        model = "Otro";
        break;
  }
}

function displayModel(){
  $('.main-text').text("Modelo identificado: " + model);
  if (seat600normal && numCoche!=0){    
    $('.main-text').append("<p>Clave Bastidor: " + claveBast + " Tipo Motor: " + claveMot + " Núm. Bastidor: " + bastidorClean + " Núm. Motor: " + motorClean + " Núm. Coche: " + numCoche+ "</p>");
  }else{
    $('.main-text').append("<p>Clave Bastidor: " + claveBast + " Tipo Motor: " + claveMot + " Núm. Bastidor: " + bastidorClean + " Núm. Motor: " + motorClean + "</p>");    
  }
}

function printVehicleData(){ 
    $('.results-text').html('');
    $('.results-text').append('<p>El vehículo lleva en origen las características habituales del modelo ' + model + ' y además los siguientes elementos que evolucionaron con el tiempo:</p>'); 
    $('.results-text').append('<ul class="grid">'); 
    for(var i=0;i<elements.length;i++){
        if (typeof elements[i] != 'undefined'){
            $('.results-text').append('<li>' + elements[i] + '</li>'); 
        }
    }
    $('.results-text').append('<ul>'); 
}

function retrieve600DData(){ 
  $.getJSON( "resources/600D_variants.json", function( data ) {
          for(var i=0;i<data.items.length;i++){
              // Changes related to Engine number
              if((Number(data.items[i].fromDA != 0))){
                 if (motorClean >= Number(data.items[i].fromDA)){
                    elements[i] = data.items[i].txtFrom;
                 }else{
                    elements[i] = data.items[i].txtTo;
                 } 
              }else{
                  // Changes related to Chassis number
                  switch(claveBast){ 
                    case "BA":
                    if (Number(data.items[i].fromBA != 0)){                                          
                        if (bastidorClean >= Number(data.items[i].fromBA)){
                            elements[i] = data.items[i].txtFrom;
                        }else{
                            elements[i] = data.items[i].txtTo;
                        }
                    }
                    break; 
                    case "BH":
                    if (Number(data.items[i].fromBH != 0)){                                          
                        if (bastidorClean >= Number(data.items[i].fromBH)){
                            elements[i] = data.items[i].txtFrom;
                        }else{
                            elements[i] = data.items[i].txtTo;
                        }
                    }      
                    break; 
                    case "BB":
                    if (Number(data.items[i].fromBB != 0)){                                          
                        if (bastidorClean >= Number(data.items[i].fromBB)){
                            elements[i] = data.items[i].txtFrom;
                        }else{
                            elements[i] = data.items[i].txtTo;
                        }
                    }      
                    break;
                    case "BT":
                    if (Number(data.items[i].fromBT != 0)){                                          
                        if (bastidorClean >= Number(data.items[i].fromBT)){
                            elements[i] = data.items[i].txtFrom;
                        }else{
                            elements[i] = data.items[i].txtTo;
                        }
                    }      
                    break;
                    case "BJ":
                    if (Number(data.items[i].fromBJ != 0)){                                          
                        if (bastidorClean >= Number(data.items[i].fromBJ)){
                            elements[i] = data.items[i].txtFrom;
                        }else{
                            elements[i] = data.items[i].txtTo;
                        }
                    }      
                    break;
                    case "BU":
                    if (Number(data.items[i].fromBU != 0)){                                          
                        if (bastidorClean >= Number(data.items[i].fromBU)){
                            elements[i] = data.items[i].txtFrom;
                        }else{
                            elements[i] = data.items[i].txtTo;
                        }
                    }      
                    break;      
                    default :
                    break;
                  }
              }
          }
          printVehicleData();
  });
}

function retrieve600EData(){ 
  $.getJSON( "resources/600E.json", function( data ) {
      for(var i=0;i<data.items.length;i++){
        if (bastidorClean >= Number(data.items[i].from)){
            elements[i] = data.items[i].txtFrom;
        }else{
            elements[i] = data.items[i].txtTo;
        } 
      }
      printVehicleData();
  });
}

function retrieve600Data(){ 
  $.getJSON( "resources/600.json", function( data ) {
      for(var i=0;i<data.items.length;i++){
        // Tipo 100.106 o BA con número de coche
        if (preReseteo){
            if (numCoche >= Number(data.items[i].fromCoche)){
                elements[i] = data.items[i].txtFrom;
            }else{
                elements[i] = data.items[i].txtTo;
            }
        }else{
            // BA sin número de coche
            if (bastidorClean >= Number(data.items[i].fromBA)){
                elements[i] = data.items[i].txtFrom;
            }else{
                elements[i] = data.items[i].txtTo;
            }
        } 
      }
      printVehicleData();
  });
}
            

$('.calc-btn').click(function(){
  identifyModel();
  if (seat600normal && numCoche==0 && preReseteo){
      alert("Dado que se trata de un " + model + " anterior al reseteo del número de bastidor (verano de 1962) por favor introduce el número de coche/número para recambios y pulsa Calcular de nuevo");
      $('.coche-input').show();
      $('.extra-caption').show();
  }else{
      $('.coche-input').hide();
      $('.extra-caption').hide();
      displayModel();
      if ((claveBast == 'BA' || claveBast == 'BH' || claveBast == 'BB' || claveBast == 'BT' || claveBast == 'BJ' || claveBast == 'BU') && claveMot == 'DA'){
        retrieve600DData();
      } else if (claveBast == 'BE') {
        retrieve600EData();         
      } else {
        // 600 Normal
        retrieve600Data();
      }   
  }
});

$('.clear-btn').click(function(){
  resetVariables();
  $('.bast-input').val('');
  $('.mot-input').val('');
  $('.coche-input').val('');
  $('.main-text').text('');
  $('.results-text').text(''); 
  $('.coche-input').hide();
  $('.extra-caption').hide();
});    