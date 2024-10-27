// 0 = dot; 1 = cross; cross begins
const svg = document.getElementsByTagName('svg')[0];
let UI_grid = getGrid(svg);
let grid = (() => {
    let grid = new Array(3);
    for (let i = 0; i < grid.length; i++) grid[i] = new Array(3);
    return grid;
}
)()
let turn = 0;
let sums;
registerListeners(svg);

function getGrid(svg) {
    let UI_grid = new Array(3);
    for (let i = 0; i < svg.children.length; i++) {
        UI_grid[i] = Array.from(svg.children[i].children);   
    }
    return UI_grid;
}

function registerListeners(svg) {
    for (let i = 0; i < UI_grid.length; i++) {
        for (let j = 0; j < UI_grid[i].length; j++) {
            const e = UI_grid[i][j];
            e.addEventListener('click', event => {
                let img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
                img.setAttribute('x', `${i * 33}%`);
                img.setAttribute('y', `${j * 33}%`);
                img.setAttribute('class', 'cell');
                if(!(turn % 2)) {
                    img.setAttribute('href', 'img/cross.png');
                    grid[i][j] = 1;
                } else {
                    img.setAttribute('href', 'img/dot.png');
                    grid[i][j] = 0;
                }
                svg.children[3].appendChild(img);
                turn++;
                if(check() === 1) end('crosses');
                else if(check() === 0) end('dots')            
            });
        }
    }
}

function check() {
    // check all cloumns & rows for wins
    const straits = (() => {
        for (let i = 0; i < grid.length; i++) {
        sums = [0, 0];
        for(let j = 0; j < 3; j++) {
            sums[0] += grid[i][j];
            sums[1] += grid[j][i];
        }
        if(sums.includes(3)) return 1;
        else if(sums.includes(0)) return 0;
    }

    
    })();
    if(straits === 0 || straits === 1) return straits;

    // check diagonals for wins
    const diagonals = (() => {
        let sums = [0, 0];
        for (let i = 0; i < grid.length; i++) {
            sums[0] += grid[i][i];
            sums[1] += grid[2 - i][i];
        }

        if(sums.includes(3)) return 1;
        else if(sums.includes(0)) return 0;

    })();
    if(diagonals === 0 || diagonals === 1) return diagonals;

    return undefined;
}

function end(x) {
    console.log(`${x} won`);
}