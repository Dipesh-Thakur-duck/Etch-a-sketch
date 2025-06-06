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

function createGridCells(){
    const numOfSquares = (squarePerSide) * squarePerSide;
    const widthOrHeight = `${(GRID_SIDE / squarePerSide) - 2}px`
    for (let i = 0; i < numOfSquares; i++){
        const gridCell = document.createElement('div');

        gridCell.style.width = gridCell.style.height = widthOrHeight;
        gridCell.classList.add("cell");

        sketchArea.appendChild(gridCell);

        gridCell.addEventListener("mouseover",setBackgroundColor);
    }
}

function removeGridCells(){
    while(sketchArea.fristChild){
        sketchArea.removeChild(sketchArea.firstChild);
    }
}

createGridCells();