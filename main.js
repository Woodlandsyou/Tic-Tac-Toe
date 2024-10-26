const svg = document.getElementsByTagName('svg')[0];
let grid = getGrid(svg);
let turn = 0;
registerListeners(svg);

function getGrid(svg) {
    let grid = new Array(3);
    for (let i = 0; i < svg.children.length; i++) {
        grid[i] = Array.from(svg.children[i].children);   
    }
    return grid;
}

function registerListeners(svg) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const e = grid[i][j];
            e.addEventListener('click', event => {
                let img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
                img.setAttribute('x', e.getAttribute('x'));
                img.setAttribute('y', e.getAttribute('y'));
                if(turn % 2) img.setAttribute('href', 'img/cross.png');
                else img.setAttribute('href', 'img/dot.png');
                svg.children[3].appendChild(img);
                turn++;                
            });
        }
    }
}