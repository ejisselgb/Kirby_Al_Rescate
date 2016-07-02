var contador = 0;
var contadorFlorBuena1 = 0;
var contadorFlorBuena2 = 0;
var contadorFlorBuena3 = 0;
var totalContadorFlores = 0;

var Colisiones = function(){};

  Colisiones.collideUp = function(player){

      var rayUp = new THREE.Raycaster();
      rayUp.ray.direction.set( 0, 1, 0 );

      var obj = player.obj;
      var origen = obj.position.clone();
      rayUp.ray.origin.copy( origen );

      var intersecciones = rayUp.intersectObjects( collidableMeshList );

      if( intersecciones.length > 0 ){
        var distancia = intersecciones[0].distance;
        // si me pegué
        if( distancia <= obj.collidableDistance){
          if(player.falling == false && distancia > 0 && distancia <= obj.collidableDistance){

            if(intersecciones[ 0 ].object.name == "save" && salvando == false){
              salvando = true;
              $.ajax({
                url:"./php_scripts/actualizarPuntos.php",
                method:"POST",
                data:{vidas: player.vidas.get(), puntos: player.puntos.get(), player: player.getName()}
              }).done(function(r){
                console.log(r);
                salvando = false;
              });

            }

            if(intersecciones[ 0 ].object.name == "coin2"){
            player.position(-1000,-180,-100);
            m2.position.set(0,-10000,0);
            sonidoOP.parar();
            perderVida.play();
            player.vidas.tomaTuPunto(1);
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }
          
          }

          if(intersecciones[ 0 ].object.name == "coin3"){
            player.position(-1000,-180,-100);
            m4.position.set(50,-10000,0);
            sonidoOP.parar();
            perderVida.play();
            player.vidas.tomaTuPunto(1);
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }
          }

            if(intersecciones[ 0 ].object.name == "box_flor"){

              contadorFlorBuena1 += 1;
              roca.play();


              if(contadorFlorBuena1 == 1){
                f1.position.set(-730,-150,-100);
             
              }

            
          }

          if(intersecciones[ 0 ].object.name == "box_flor2"){

              contadorFlorBuena2 += 1;
              roca.play();

              if(contadorFlorBuena2 == 1){
                f2.position.set(1030,-100,-100);
                
              }

            
          }

          if(intersecciones[ 0 ].object.name == "box_flor3"){

              contadorFlorBuena3 += 1;
              roca.play();

              if(contadorFlorBuena3 == 1){
                f3.position.set(1200,-140,-100);
                
              }

            
          }

          if(intersecciones[ 0 ].object.name == "box_mala"){
            player.position(992,-500,-100);
    
          }


         // { x: 992, y: -253.6999999999974, z: -100 }
          
          if(intersecciones[ 0 ].object.name == "coinb1"){
                player.puntos.tomaTuTeterito(1);
               // puntos.play();

                
            m1.position.set(0,-10000,0);
            monedaSong.play();
                        
          }

          if(intersecciones[ 0 ].object.name == "coinb2"){
               player.puntos.tomaTuTeterito(1);
               // puntos.play();

                
            m3.position.set(340,-10000,0);
            monedaSong.play();
                       
          }

          if(intersecciones[ 0 ].object.name == "boxCoin"){
               // player.puntos.tomaTuTeterito(10);
               // puntos.play();
              contador += 1;
              console.log(contador);
              monedaSong.play();
              if(contador <= 3){
                player.puntos.tomaTuTeterito(5);
                console.log(player.puntos);
              }else{
                player.puntos.tomaTuTeterito(0);
                console.log(player.puntos);
              }
              

            if(contador == 3){

              box22.position.set(50,-15000,-100);

              console.log("Entre al fucking ciclo");

              
             box26.position.set(0,-40,-100);
             roca.play();
             monedaSong.parar();

            }
             
                        
          }


            player.vy = 0;
            player.falling = true;
          }
        }
      }


     
    };
    Colisiones.collideDown = function(player){

      var rayDown = new THREE.Raycaster();
      rayDown.ray.direction.set( 0, -1, 0 );

      var obj = player.obj;
      var origen = obj.position.clone();
      rayDown.ray.origin.copy( origen );

      var intersecciones = rayDown.intersectObjects( collidableMeshList );

      if( intersecciones.length > 0 ){
        var distancia = intersecciones[0].distance;
        if(distancia > 0 && distancia > obj.collidableDistance){
          obj.position.y -= player.vy;
          player.inAir = true;
        }else{

          
      /*    if(intersecciones[ 0 ].object.name == "quitaVida"){
             player.puntos.tomaTuTeterito(-5);   
             player.position(250,obj.collidableDistance,7100);
             player.vidas.die();
             perder.play();
             sonidoOP.parar();
            alert("¡Ups!, perdiste una vida y algo de puntos");
          }
          
          if(intersecciones[ 0 ].object.name == "adelante"){
                player.puntos.tomaTuTeterito(10);
                puntos.play();

                
            player.position(0,80,6100);
                        
          }

           if(intersecciones[ 0 ].object.name == "adelante2"){
                player.puntos.tomaTuTeterito(10);
                puntos.play();   
                
            player.position(-340,80,5000);
                        
          }

      
            if(intersecciones[ 0 ].object.name == "meta" ){
              sonidoOP.parar();
              player.position(250,obj.collidableDistance,7100);
              ganar.play();
              alert("Haz ganado!!!... Escogiste el futuro de Eugenio");
              window.location="http://localhost/Compu_grafica/Compu_grafica/interfaces/proyecto%20compu%20taller2/";
              $.ajax({
                url:"./php_scripts/actualizarPuntos.php",
                method:"POST",
                data:{vidas: player.vidas.get(), puntos: player.puntos.get(), player: player.getName()}
              }).done(function(r){
                console.log(r);
              });

            }*/
        
            


          if(intersecciones[ 0 ].object.name == "vacio"){
            
            player.position(-1000,-180,-100);
            //player.vidas.die();
            player.vidas.tomaTuPunto(1);
            sonidoOP.parar();
            perderVida.play();
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }

          }

          if(intersecciones[ 0 ].object.name == "box_caida"){
               
    
           player.position(920,-500,-100);
            sonidoOP.parar();
            perderVida.play();
            player.vidas.tomaTuPunto(1);
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }
                           
          }

          if(intersecciones[ 0 ].object.name == "coin3"){
            player.position(-1000,-180,-100);
            m4.position.set(50,-10000,0);
             sonidoOP.parar();
            perderVida.play();
            player.vidas.tomaTuPunto(1);
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }
          }

          if(intersecciones[ 0 ].object.name == "coinb3"){
            //player.position(-1000,-180,-100);
            player.puntos.tomaTuTeterito(1);
            m5.position.set(-10,-10000,0);
            monedaSong.play();
          }

          if(intersecciones[ 0 ].object.name == "coin4"){
            player.position(-1000,-180,-100);
            m6.position.set(700,-10000,0);
             sonidoOP.parar();
            perderVida.play();
            player.vidas.tomaTuPunto(1);
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }
          }

          if(intersecciones[ 0 ].object.name == "flor1"){
            f1.position.set(-730,-10000,-100);
            totalContadorFlores += 1;
            console.log(totalContadorFlores);
            atrapar.play();
            //Almacenar en la base de datos de flores
          }

          if(intersecciones[ 0 ].object.name == "flor2"){
            f2.position.set(1030,-10000,-100);
            totalContadorFlores += 1;
            console.log(totalContadorFlores);
            atrapar.play();
            //Almacenar en la base de datos de flores
          }

          if(intersecciones[ 0 ].object.name == "flor3"){
            f3.position.set(1200,-10000,-100);
            totalContadorFlores += 1;
            console.log(totalContadorFlores);
            atrapar.play();
            //Almacenar en la base de datos de flores
          }

          if(intersecciones[ 0 ].object.name == "coinb1"){
                player.puntos.tomaTuTeterito(1);
               // puntos.play();
               monedaSong.play();

                
            m1.position.set(0,-10000,0);
                        
          }

          if(intersecciones[ 0 ].object.name == "goomba1"){
               // player.puntos.tomaTuTeterito(10);
               // puntos.play();

              g1.position.set(65,-10000,0);
              estripar.play();
                        
          }

          if(intersecciones[ 0 ].object.name == "goomba2"){
               // player.puntos.tomaTuTeterito(10);
               // puntos.play();

              g2.position.set(100,-10000,0);
              estripar.play();
                        
          }

          if(intersecciones[ 0 ].object.name == "goomba3"){
               // player.puntos.tomaTuTeterito(10);
               // puntos.play();

              g3.position.set(150,-10000,0);
              estripar.play();
                        
          }

          if(intersecciones[ 0 ].object.name == "goomba4"){
               // player.puntos.tomaTuTeterito(10);
               // puntos.play();

              g4.position.set(200,-10000,0);
              estripar.play();
                        
          }


         /* if(intersecciones[ 0 ].object.name == "portalito"){
            player.position(0,-700,0);
            perder.play();
            sonidoOP.parar();
             }*/

          if(intersecciones[ 0 ].object.name == "uka uka"){
            obj.material.color = new THREE.Color(0x00ff00);
            player.puntos.tomaTuTeterito(1);
          }else{
            if(intersecciones[ 0 ].object.name == "TNT"){
              obj.material.color = new THREE.Color(0xff0000);
              player.puntos.tomaTuTeterito(-1);

              if(explotando == false){
                console.log("Explotando");
                setTimeout(explode, 3000);
                explotando = true;
              }

            }else{
              obj.material.color = new THREE.Color(0xffffff);
            }
          }


          player.falling = false;
          player.inAir = false;
          player.vy = 0;
          player.jumping = false;

        }
      }
    };

    Colisiones.collideBottom = function(player){

      var rayBottom = new THREE.Raycaster();
      rayBottom.ray.direction.set( 0, 0, -1 );

      var obj = player.obj;
      var origen = obj.position.clone();
      rayBottom.ray.origin.copy( origen );

      var intersecciones = rayBottom.intersectObjects( collidableMeshList );

      if( intersecciones.length > 0 ){
        var distancia = intersecciones[0].distance;
        if(distancia > 0 && distancia <= obj.collidableDistance){
          obj.position.z += player.vx;

          if(intersecciones[ 0 ].object.name == "uka uka"){
            //codigo
          }else{
            if(intersecciones[ 0 ].object.name == "TNT"){
              //codigo
            }
            else{
              obj.material.color = new THREE.Color(0xffffff);
            }
          }
        }
      }
    };


    Colisiones.collideFront = function(player){

      var rayFront = new THREE.Raycaster();
      rayFront.ray.direction.set( 0, 0, 1 );

      var obj = player.obj;
      var origen = obj.position.clone();
      rayFront.ray.origin.copy( origen );

      var intersecciones = rayFront.intersectObjects( collidableMeshList );

      if( intersecciones.length > 0 ){
        var distancia = intersecciones[0].distance;
        if(distancia > 0 && distancia <= obj.collidableDistance){
          obj.position.z -= player.vx;

          if(intersecciones[ 0 ].object.name == "uka uka"){
            obj.position.z -= player.vx;
          }else{
            if(intersecciones[ 0 ].object.name == "TNT"){
              //codigo
            }else{
              obj.material.color = new THREE.Color(0xffffff);
            }
          }
        }
      }
    };

    Colisiones.collideLeft = function(player){

      var rayFront = new THREE.Raycaster();
      rayFront.ray.direction.set( 1, 0, 0 );

      var obj = player.obj;
      var origen = obj.position.clone();
      rayFront.ray.origin.copy( origen );

      var intersecciones = rayFront.intersectObjects( collidableMeshList );

      if( intersecciones.length > 0 ){
        var distancia = intersecciones[0].distance;
        if(distancia > 0 && distancia <= obj.collidableDistance){
          obj.position.x -= player.vx;

          if(intersecciones[ 0 ].object.name == "uka uka"){
            obj.position.x -= player.vx;
          }else{
            if(intersecciones[ 0 ].object.name == "TNT"){
              //codigo
            }
            if(intersecciones[ 0 ].object.name == "coin2"){
            player.position(-1000,-180,-100);
            m2.position.set(0,-10000,0);
             sonidoOP.parar();
            perderVida.play();
            player.vidas.tomaTuPunto(1);
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }
          }

          if(intersecciones[ 0 ].object.name == "coin3"){
            player.position(-1000,-180,-100);
            m4.position.set(50,-10000,0);
             sonidoOP.parar();
            perderVida.play();
            player.vidas.tomaTuPunto(1);
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }
          }

          if(intersecciones[ 0 ].object.name == "flor1"){
            f1.position.set(-730,-10000,-100);
            totalContadorFlores += 1;
            
            atrapar.play();
            //Almacenar en la base de datos de flores
          }

          if(intersecciones[ 0 ].object.name == "flor2"){
            f2.position.set(1030,-10000,-100);
            totalContadorFlores += 1;
         
            atrapar.play();
            //Almacenar en la base de datos de flores
          }

          if(intersecciones[ 0 ].object.name == "flor3"){
            f3.position.set(1200,-10000,-100);
            totalContadorFlores += 1;
        
            atrapar.play();
            //Almacenar en la base de datos de flores
          }

          if(intersecciones[ 0 ].object.name == "coinb1"){
                player.puntos.tomaTuTeterito(1);
               // puntos.play();

                
            m1.position.set(0,-10000,0);
            monedaSong.play();
                        
          }

          if(intersecciones[ 0 ].object.name == "banderita"){
               // player.puntos.tomaTuTeterito(10);
               // puntos.play();

           if(totalContadorFlores >= 3){
                
               // alert("Ganaste putazo");
               ganar.play();
               sonidoOP.parar();
               $.ajax({
                url:"./php_scripts/actualizarPuntos.php",
                method:"POST",
                data:{vidas: player.vidas.get(), puntos: player.puntos.get(), player: player.getName()}
              }).done(function(r){
                console.log(r);
              });



               level += 1;
               console.log(level);
              if(level == 2){
                  
                setTimeout(pasarNivel, 7000);
              }
           }
                        
          }

           if(intersecciones[ 0 ].object.name == "coin4"){
            player.position(-1000,-180,-100);
            m6.position.set(700,-10000,0);
             sonidoOP.parar();
            perderVida.play();
            player.vidas.tomaTuPunto(1);
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }
          }

          if(intersecciones[ 0 ].object.name == "coinb2"){
                player.puntos.tomaTuTeterito(1);
               // puntos.play();
               monedaSong.play();

                
            m3.position.set(340,-10000,0);
                        
          }

          if(intersecciones[ 0 ].object.name == "coinb3"){

            m5.position.set(-10,-10000,0);
            player.puntos.tomaTuTeterito(1);
            monedaSong.play();
          }


          if("goomba1" == intersecciones[ 0 ].object.name){
               // player.puntos.tomaTuTeterito(10);
               // puntos.play();
        
                player.position(-1000,-180,-100);
                sonidoOP.parar();
                perderVida.play();
                player.vidas.tomaTuPunto(1);
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }
                        
          }

          if("goomba2" == intersecciones[ 0 ].object.name){
               // player.puntos.tomaTuTeterito(10);
               // puntos.play();
              
                player.position(-1000,-180,-100);
                sonidoOP.parar();
                perderVida.play();
                player.vidas.tomaTuPunto(1);
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }

              //g1.position.set(65,-10000,0);
                        
          }

          if("goomba3" == intersecciones[ 0 ].object.name){
               // player.puntos.tomaTuTeterito(10);
               // puntos.play();
              
                player.position(-1000,-180,-100);
                sonidoOP.parar();
                perderVida.play();
                player.vidas.tomaTuPunto(1);
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }
              //g1.position.set(65,-10000,0);
                        
          }

          if("goomba4" == intersecciones[ 0 ].object.name){
               // player.puntos.tomaTuTeterito(10);
               // puntos.play();
              
                player.position(-1000,-180,-100);
                sonidoOP.parar();
                perderVida.play();
                player.vidas.tomaTuPunto(1);
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }

              //g1.position.set(65,-10000,0);
                        
          }



            else{
              obj.material.color = new THREE.Color(0xffffff);
            }
          }
        }
      }
    };

    Colisiones.collideRight = function(player){

      var rayFront = new THREE.Raycaster();
      rayFront.ray.direction.set( -1, 0, 0 );

      var obj = player.obj;
      var origen = obj.position.clone();
      rayFront.ray.origin.copy( origen );

      var intersecciones = rayFront.intersectObjects( collidableMeshList );

      if( intersecciones.length > 0 ){
        var distancia = intersecciones[0].distance;
        if(distancia > 0 && distancia <= obj.collidableDistance){
          obj.position.x += player.vx;

          if(intersecciones[ 0 ].object.name == "uka uka"){
            obj.position.x += player.vx;
          }else{
            if(intersecciones[ 0 ].object.name == "TNT"){
              //codigo
            }

            if(intersecciones[ 0 ].object.name == "coin2"){
            player.position(-1000,-180,-100);
            m2.position.set(0,-10000,0);
             sonidoOP.parar();
            perderVida.play();
            player.vidas.tomaTuPunto(1);
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }
          }

          if(intersecciones[ 0 ].object.name == "coin3"){
            player.position(-1000,-180,-100);
            m4.position.set(50,-10000,0);  
             sonidoOP.parar();
            perderVida.play();
            player.vidas.tomaTuPunto(1);
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }
          }

           if(intersecciones[ 0 ].object.name == "coin4"){
            player.position(-1000,-180,-100);
            m6.position.set(700,-10000,0);
             sonidoOP.parar();
            perderVida.play();
            player.vidas.tomaTuPunto(1);
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }
          }

          if(intersecciones[ 0 ].object.name == "flor1"){
            f1.position.set(-730,-10000,-100);
            totalContadorFlores += 1;
            atrapar.play();
        
            //Almacenar en la base de datos de flores
          }

          if(intersecciones[ 0 ].object.name == "flor2"){
            f2.position.set(1030,-10000,-100);
            totalContadorFlores += 1;
            atrapar.play();
         
            //Almacenar en la base de datos de flores
          }

          if(intersecciones[ 0 ].object.name == "flor3"){
            f3.position.set(1200,-10000,-100);
            totalContadorFlores += 1;
            atrapar.play();
            
            //Almacenar en la base de datos de flores
          }

          if(intersecciones[ 0 ].object.name == "coinb1"){
                player.puntos.tomaTuTeterito(1);
               // puntos.play();
               monedaSong.play();

                
            m1.position.set(0,-10000,0);
                        
          }

          if(intersecciones[ 0 ].object.name == "coinb2"){
               player.puntos.tomaTuTeterito(1);
               // puntos.play();
               monedaSong.play();

                
            m3.position.set(340,-10000,0);
                        
          }

          if(intersecciones[ 0 ].object.name == "coinb3"){
            //player.position(-1000,-180,-100);
            m5.position.set(-10,-10000,0);
            player.puntos.tomaTuTeterito(1);
            monedaSong.play();
          }


          if("goomba1" == intersecciones[ 0 ].object.name){
               // player.puntos.tomaTuTeterito(10);
               // puntos.play();
             
                player.position(-1000,-180,-100);
                sonidoOP.parar();
                perderVida.play();
                player.vidas.tomaTuPunto(1);
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }


              //g1.position.set(65,-10000,0);
                        
          }

          if("goomba2" == intersecciones[ 0 ].object.name){
               // player.puntos.tomaTuTeterito(10);
               // puntos.play();
               
                player.position(-1000,-180,-100);
                sonidoOP.parar();
                perderVida.play();
                player.vidas.tomaTuPunto(1);
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }

              //g1.position.set(65,-10000,0);
                        
          }

          if("goomba3" == intersecciones[ 0 ].object.name){
               // player.puntos.tomaTuTeterito(10);
               // puntos.play();
             
                player.position(-1000,-180,-100);
                sonidoOP.parar();
                perderVida.play();
                player.vidas.tomaTuPunto(1);
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }
              //g1.position.set(65,-10000,0);
                        
          }

          if("goomba4" == intersecciones[ 0 ].object.name){
               // player.puntos.tomaTuTeterito(10);
               // puntos.play();
              
                player.position(-1000,-180,-100);
                sonidoOP.parar();
                perderVida.play();
                player.vidas.tomaTuPunto(1);
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }

              //g1.position.set(65,-10000,0);
                        
          }
            else{
              obj.material.color = new THREE.Color(0xffffff);
            }
          }
        }
      }
    };