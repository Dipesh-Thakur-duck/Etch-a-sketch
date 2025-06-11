const GRID_SIDE = 600;
let squarePerSide = 16;


const sketchArea = document.querySelector("#sketch-area");

const sliderContainer = document.querySelector("#slider-container");

const slider = document.querySelector("#slider");

const sliderValue = document.querySelector("#slider-value");

sliderValue.textContent = `${slider.value} x ${slider.value} (Resolution)`;
sketchArea.style.width = sketchArea.style.height = `${GRID_SIDE}px`;

function setBackgroundColor(){
    this.style.backgroundColor = "black";
}

function createGridCells(cellsPerSide = squarePerSide){
    squarePerSide = cellsPerSide;
    const numOfSquares = (cellsPerSide) * cellsPerSide;
    const widthOrHeight = `${(GRID_SIDE / cellsPerSide) - 2}px`
    for (let i = 0; i < numOfSquares; i++){
        const gridCell = document.createElement('div');

        gridCell.style.width = gridCell.style.height = widthOrHeight;
        gridCell.classList.add("cell");

        sketchArea.appendChild(gridCell);

        gridCell.addEventListener("mouseover",setBackgroundColor);
    }
}

function removeGridCells(){
    while(sketchArea.firstChild){
        sketchArea.removeChild(sketchArea.firstChild);
    }
}

slider.oninput = function(){
    let txt = `${this.value} x ${this.value} (Resolution)`;
    sliderValue.innerHTML = txt;
    removeGridCells();
    createGridCells(this.value);
}

createGridCells();