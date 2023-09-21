module.exports = {
    iff: (a, operator, b, opts)=>{
        var bool = false;
    switch(operator) {
       case '==':
           bool = a == b;
           break;
        case '!=':
            bool = a != b;
            break;
       case '>':
           bool = a > b;
           break;
       case '<':
           bool = a < b;
           break;
       default:
           throw "Unknown operator " + operator;
    }
 
    if (bool) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
    },

    times: (n, block) => {
        var accum = '';
        for(var i = 0; i< n; ++i){
            accum += block.fn(i);
        }
        return accum;
    }
}