function eval() {
    // Do not use eval!!!
    return;
}

function calculate (expr) {
    let arr = expr.split(' ');
    let a;

    arr = arr.reduce((prev, el, index) => {
        if(index === arr.length-1) {
            if(a || a === 0) {
                prev.push(a);
            } else {
                prev.push(el);
            }   
        }
        if(el === '+' || el === '-') {
            if(a) {
                prev.push(a);
                a = undefined;
            } else {
                prev.push(+arr[index-1]);
            }
            prev.push(el);
        }
        if(el === "*") {
            if(a) {
            a *= +arr[index+1];
            } else {
            a = +arr[index-1] * +arr[index+1];
            }     
        }
        if(el === "/") {
            if(a) {
            a /= +arr[index+1];
            } else {
            a = +arr[index-1] / +arr[index+1];
            }     
        }
        return prev;
    }, []);

    return arr.reduce((prev, el, index) => {
        if(el === "+") {
            return prev + +arr[index+1];
        }
        if(el === "-") {
            return prev - +arr[index+1];
        }
        return prev;
        
    }, +arr[0]);
}

function expressionCalculator(expr) {
    
    expr = expr.replace(/\s/g, "").replace(/(\*|\/|\+|\-)/g, " $& ");

    if(expr.includes('/ 0')) {
        throw new Error("TypeError: Division by zero.");
    }
    let openBr = expr.match(/\(/g);
    let closeBr = expr.match(/\)/g);
    if ((!openBr && closeBr) || (openBr && !closeBr)) {
        throw "ExpressionError: Brackets must be paired"
    }
    if (openBr && closeBr) {
        if (openBr.length !== closeBr.length) {
        throw "ExpressionError: Brackets must be paired"
        }
    }     
    
    if (expr.match(/\(/g) != null) {
        
        for (let i = expr.match(/\(/g).length; i != 0; i--) {
            let calculation = expr.match(/(\([0-9\+\/\*\-. ]+\))/g)[0];
            let expression = calculation.slice(1, calculation.length-1);
            expr = expr.replace(calculation, calculate(expression));
        }
    }
  
    return calculate(expr);
    
}

module.exports = {
    expressionCalculator
}

