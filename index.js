const gridwidth = getComputedStyle(document.body).getPropertyValue("--grid-width");
const ascentColor = getComputedStyle(document.body).getPropertyValue("--ascent-color");
const inactiveColor = getComputedStyle(document.body).getPropertyValue("--inactive-color");

let squarePerSide = 16;

const sketchArea = document.querySelector("#sketch-area");

const sliderContainer = document.querySelector("#slider-container");

const slider = document.querySelector("#slider");

const sliderValue = document.querySelector("#slider-value");

const gridToggle = document.querySelector("#grid-toggle");

const sketchEraser = document.querySelector("#sketch-eraser");

let squrePerSide = 16;
let gridVisible = false;
let eraserActive = false;

let isDrawing = false;
let isErasing = false;

function toggleGrid(){
    gridVisible = gridVisible ? false: true;
    gridToggle.style.color = gridVisible ? ascentColor: inactiveColor;

    removeGridCells();
    createGridCells(squarePerSide);
}

function toggleErase(){
    eraserActive = eraserActive ? false: true;
    sketchEraser.style.color = eraserActive ? ascentColor: inactiveColor;
}

function handleDrawing(e){
    if(eraserActive){
        eraser(e);
    }else{
        setBackgroundColor(e);
    }
}

function setBackgroundColor(e){
    if(e.type === "mousedown"){
        isDrawing = true;
        e.target.style.BackgroundColor = 'black';
    }else if(e.type === "mouseover" && isDrawing){
        e.target.style.backgroundColor = "black";
    }else isDrawing = false;
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

        gridCell.addEventListener("mousedown",(e)=>handleDrawing(e));
        gridCell.addEventListener("mouseover",(e)=>handleDrawing(e));
        gridCell.addEventListener("mouseup",(e)=>handleDrawing(e));


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

function eraser(e){
    if(e.type === "mousedown"){
        isErasing = true;
        e.target.style.BackgroundColor = 'white';
    }else if(e.type === "mouseover" && isErasing){
        e.target.style.backgroundColor = "white";
    }else isDrawing = false;
}

gridToggle.addEventListener("click",toggleGrid);
sketchEraser.addEventListener("click",toggleErase);

createGridCells();