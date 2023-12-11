let seeds1 = input.slice(8, 207);
seeds1 = seeds1.split(" ");
old_seeds = seeds1.map((num) => parseInt(num));
console.log(old_seeds)

const seeds = new Int32Array(100000000);
let currentIndex = 0;
for (let i = 0; i < old_seeds.length; i += 2) {
    let start = old_seeds[i];
    console.log("start",start)
    let length = old_seeds[i + 1];
    console.log("length",length)
    for (let j = 0; j < length; j = j + 100) {
       // seeds2.push(start + j);
        seeds[currentIndex++] = start + j
    }
}









let mapfull = input.slice(208);
let maps0 = mapfull.split(" map").join("").split("");
let maps = maps0
  .filter((item) => !isNaN(+item))
  .join("")
  .split("\n");

let mapped = {
  map1: [],
  map2: [],
  map3: [],
  map4: [],
  map5: [],
  map6: [],
  map7: [],
};

let num = 0;

for (i = 0; i < maps.length; i++) {
  if (maps[i] != "") {
    mapped[`map${num}`].push(maps[i]);
  } else {
    num++;
  }
}

let chunk = 3;
let keys = Object.keys(mapped);

for (let i = 1; i < keys.length + 1; i++) {
  let arrayOfArrays = [];
  let mapnumbers = mapped[`map${i}`].join(" ").split(" ");
  for (let x = 0; x < mapnumbers.length; x += chunk) {
    let numbers = mapnumbers.slice(x, x + chunk);
    numbers = numbers.map((num) => parseInt(num));
    arrayOfArrays.push(numbers);
  }
  mapped[`map${i}`] = arrayOfArrays;
}


function calc1(s, o) {
  return (s - o) > 0;
}
function calc2(s, o, r) {
  return (o + r) > s;
}

function sol1(d, s, o) {
  return d + (s - o);
}

function sol2(s) {
  return s;
}
let solutions_seeds = [999999999];
let mappedkeys = Object.keys(mapped);
for (let seed = 0; seed < seeds.length; seed++) {
    if ((((seed / seeds.length) *100 ) % 5) == 0)  console.log(seed / seeds.length)
    //console.log(" ")
    // console.log("seed number:", seed)
    // console.log("seed value:", seeds[seed])
    // console.log(" ")
    let s = seeds[seed]
  for (let map = 1; map < mappedkeys.length + 1; map++) {
    // console.log(" ")
    // console.log("map", map)
    // console.log("seed-value", s)
    let solution_map = 0;
    for (let row = 0; row < mapped[`map${map}`].length; row++) {
    max_row = mapped[`map${map}`].length  - 1
    
        // console.log("row", row)
      let d = mapped[`map${map}`][row][0];
      let o = mapped[`map${map}`][row][1];
      let r = mapped[`map${map}`][row][2];
    //   console.log("s",s, "o",o,"r",r,"d",d)
    //   console.log("calc1", calc1(s,o))
    //   console.log("calc2", calc2(s,o,r))
      if (calc1(s, o) && row < max_row) {
        if (calc2(s, o, r)) {
          s = sol1(d,s,o)
          solution_map = s;
        //   console.log("sol1", s)
          break
        } 

     else if (!calc2(s, o, r)) 
        continue;

      } 
      
      else if (!calc1(s, o) && row < max_row) {
        continue;
      } 

      else if (!calc1(s, o) && row == max_row) {
        s = sol2(s)
        solution_map = s
        // console.log("sol2", s)
        break
      } 
      
      else if (calc1(s, o) && row == max_row) {
        if (calc2(s, o, r)) {
        s = sol1(d,s,o)
          solution_map = s;
        //   console.log("sol1", s)
          break
        }
        else 
        s = sol2(s)
        solution_map = s
        // console.log("sol2", s)
        break
      }
    }

    if (map == 7 && solution_map < Math.min(...solutions_seeds)) {solutions_seeds.push(solution_map)}


  }

}

//console.log(solutions_seeds)
console.log(Math.min(...solutions_seeds));



console.log(solutions_seeds)
