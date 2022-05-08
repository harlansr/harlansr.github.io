let keyPart = 0;
document.addEventListener('keydown', (event) => {
    let name = event.key;
    let code = event.code;
    // Alert the key name and key code on keydown
    // alert(`Key pressed ${name} \r\n Key code value: ${code}`);
    console.log(keyPart);
    switch (keyPart) {
        case 0:
            if(name == 'D'){
                keyPart++;
            }else{
                keyPart = 0
            }
            break;
        case 1:
            if(name == 'E'){
                keyPart++;
            }else{
                keyPart = 0
            }
            break;
        case 2:
            if(name == 'V'){
                keyPart++;
            }else{
                keyPart = 0
            }
            break;
        case 3:
            if(name == 'E'){
                keyPart++;
            }else{
                keyPart = 0
            }
            break;
        case 4:
            if(name == 'L'){
                keyPart++;
            }else{
                keyPart = 0
            }
            break;
        case 5:
            if(name == 'O'){
                keyPart++;
            }else{
                keyPart = 0
            }
            break;
        case 6:
            if(name == 'P'){
                keyPart++;
            }else{
                keyPart = 0
            }
            break;
        case 7:
            if(name == 'E'){
                keyPart++;
            }else{
                keyPart = 0
            }
            break;
        case 8:
            if(name == 'R'){
                eg();
            }else{
                keyPart = 0
            }
            break;
    }
}, false);

function eg(){
    window.location.href = "https://github.com/harlansr";
}