function dec2bin(dec){
    return (dec >>> 0).toString(2);
}

function generate_bite(prob_one){
    rand_to_one = Math.random()

    ret_bit = rand_to_one < prob_one ? 1 : 0;

    return ret_bit;
}

my_rule = new Object();
var k = 1.7;
var lambda = 0.131


for ( i = 0 ; i < 10; i ++) {
    // my_rule[i] =  i/10
    my_rule[i] = 1/(1 + Math.exp(-k*(i - 4.5)));
    // my_rule[i] = Math.pow((i - 4.5)/10,4);
    // my_rule[i] =  1 - Math.exp(-lambda*i);
    // i/10
    Math.random();
}

// my_rule = [];
// for (i = 0; i < 10; i ++) {
//     my_rule.push(Math.random())
// }
// my_rule.sort();


var S = 10145920;
var W = 2160;
A.width = A.height = W;
var C = A.getContext("2d");
var M = Math;
var m;
//Function for initial cell configuration
var R = _=>(S += 1831565813,
            m = M.imul(S ^ S >>> 15, 1 | S),
            m = m + M.imul(m ^ m >>> 7, 61 | m) ^ m,
            (m ^ m >>> 14) >>> 0) / 2 ** 32;

C.globalCompositeOperation = "copy";
C.imageSmoothingEnabled = false;
var T = 0;
var h = 432;
var I = C.createImageData(h, h);
var g = Array.from(
    {
    length: h
}, 
    _=>Array.from(
        {
        length: h
    }, _=>0 | 2 * R()
    )
);
p = Array(h).fill().map(_=>Array(h)),
s = 0,
F = t=>{
    if (T == -1 || requestAnimationFrame(F),
    d = t - s,
    33 < d) {
        // First, iterate the row (One does not touch the border)
        for (s = t - d % 33,T++,j = 1; j < h - 1; j++)
        // Then, iterate the column
            for (k = 1; k < h - 1; k++) {
                // Travel around the neighbour to find the number of neighbour
                for (n = 0,u = -1; 2 > u; u++)
                    for (v = -1; 2 > v; v++)
                        n += g[j + u][k + v];
                // Implements the rule of game of life
                // n -= g[j][k];
                //p[j][k] = 0 === g[j][k] ? 3 == n ? 1 : 0 : 2 == n || 3 == n ? 1 : 0
                
                //implement a new probablistic Alex rule with math.random
                p[j][k] = generate_bite(my_rule[n]);
            }

        // Finish updating by copy the shadows to the real one 
        for (j = 0; j < h; j++)
            for (k = 0; k < h; k++)
                g[j][k] = p[j][k];

        for (j = 0; j < h; j++)
            for (k = 0; k < h; k++)
                i = 4 * (j + k * h),
                I.data[i + 3] = h,
                r = i + 1,
                u = I.data[r],
                v = I.data[i],
                g[j][k] ? (I.data[r] = h,I.data[i] = h) : 8 < u ? I.data[r] = u - 8 : 4 < v ? (I.data[i] = v - 4,128 > v && (I.data[i + 2] = h)) : 2 < v && (I.data[i + 2] = v - 2);
        C.putImageData(I, 0, 0),
        C.drawImage(A, 0, 0, h, h, 0, 0, W, W)
    }
};
F();
console.log(my_rule);