function teclaPulsada(e)
{
    switch(e.keyCode){
            case 37: //left
                TECLA.IZQUIERDA = true;
                break;
            case 38: //up
                TECLA.ARRIBA = true;
                break;
            case 39: //right
                TECLA.DERECHA = true;
                break;
            case 40: //right
                TECLA.ABAJO = true;
                break;
            case 32: //space
                TECLA.ESPACIO = true;
            break;
            case 88: //x
                TECLA.X = true;
            break;
            case 89: //y
                TECLA.Y = true;
            break;
            case 90: //z
                TECLA.Z = true;
            break;
            case 82: //r
                TECLA.R = true;
            break;
            case 49: //r
                TECLA.UNO = true;
            break;
            case 50: //r
                TECLA.DOS = true;
            break;
            case 51: //r
                TECLA.TRES = true;
            break;
            case 65: //A
                TECLA.A = true;
            break;
            case 87: //W
                TECLA.W = true;
            break;
            case 83: //S
                TECLA.S = true;
            break;
            case 68: //D
                TECLA.D = true;
            break;
            case 16: //SHIFT
                TECLA.SHIFT = true;
            break;
    };

}
function teclaSoltada(e)
{
    switch(e.keyCode){
            case 37: //left
                TECLA.IZQUIERDA = false;
                break;
            case 39: //right
                TECLA.DERECHA = false;
                break;
            case 38: //up
                TECLA.ARRIBA = false;
            break;
            case 40: //right
                TECLA.ABAJO = false;
                break;
            case 32: //space
                TECLA.ESPACIO = false;
            break;
            case 88: //x
                TECLA.X = false;
            break;
            case 89: //y
                TECLA.Y = false;
            break;
            case 90: //z
                TECLA.Z = false;
            break;
            case 82: //z
                TECLA.R = false;
            break;
            case 49: //r
                TECLA.UNO = false;
            break;
            case 50: //r
                TECLA.DOS = false;
            break;
            case 51: //r
                TECLA.TRES = false;
            break;
            case 65: //A
                TECLA.A = false;
            break;
            case 87: //W
                TECLA.W = false;
            break;
            case 83: //S
                TECLA.S = false;
            break;
            case 68: //D
                TECLA.D = false;
            break;
            case 16: //SHIFT
                TECLA.SHIFT = false;
            break;
    };
}








