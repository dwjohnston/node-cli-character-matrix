function goto (x, y) {
    process.stdout.write(`\x1b[${y};${x}H`);
}


function clearScreen(){
    process.stdout.write("\x1b[2J"); 
}

function print (txt) {
    process.stdout.write(txt);
}

clearScreen();

goto(20,5);
print('😀');