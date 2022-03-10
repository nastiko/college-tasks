let x = 1;
let y = 2;

// short IF
y = y + (x > 1 ? 0 : 1);

// full IF
if(x > 1){
    y = y + 0;
} else {
    y = y+1;
}



// short SUM
y += 1;
// full SUM
y = y+1;

console.log(y);