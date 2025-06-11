const gridwidth = getComputedStyle(document.body).getPropertyValue("--grid-width");
const ascentColor = getComputedStyle(document.body).getPropertyValue("--ascent-color");
const inactiveColor = getComputedStyle(document.body).getPropertyValue("--inactive-color");

let squarePerSide = 16;

const container = document.querySelector(".container");

const sketchArea = document.querySelector("#sketch-area");

const sliderContainer = document.querySelector("#slider-container");

const slider = document.querySelector("#slider");

const sliderValue = document.querySelector("#slider-value");

const gridToggle = document.querySelector("#grid-toggle");

let squrePerSide = 16;
let gridVisible = false;

function toggleGrid(){
    gridVisible = gridVisible ? false: true;
    gridToggle.style.color = gridVisible ? ascentColor: inactiveColor;

    removeGridCells();
    createGridCells(squarePerSide);
}


function setBackgroundColor(){
    this.style.backgroundColor = "black";
}

function createGridCells(cellsPerSide = squarePerSide){
    squarePerSide = cellsPerSide;
    const numOfSquares = (cellsPerSide) * cellsPerSide;
    let widthOrHeight;
    
    for (let i = 0; i < numOfSquares; i++){
        const gridCell = document.createElement('div');

        if(gridVisible){
            widthOrHeight = `${(parseInt(gridwidth) / cellsPerSide) - 2}px`;
            gridCell.style.border = "1px  solid whitesmoke";
        }else if(!gridVisible){
            widthOrHeight = `${(parseInt(gridwidth) / cellsPerSide)}px`;
            gridCell.style.border = "none";
        }

        gridCell.style.width = gridCell.style.height = widthOrHeight;

        gridCell.addEventListener("mouseover",setBackgroundColor);

        sketchArea.appendChild(gridCell);

    
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

gridToggle.addEventListener("click",toggleGrid);

createGridCells();