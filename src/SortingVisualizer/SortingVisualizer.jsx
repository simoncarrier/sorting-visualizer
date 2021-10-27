import "./SortingVisualizer.css";
import { useState, useEffect } from "react";
import {
  getMergeSortAnimations,
  getQuickSortAnimations,
  getHeapSortAnimations,
} from "../sortingAlgorithms/sortingAlgorithms";

const PRIMARY_COLOR = "turquoise";

const SECONDARY_COLOR = "red";

const TERTIARY_COLOR = "orange";

const ANIMATION_SPEED_MS = 1;

function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const [sizeArray, setSizeArray] = useState(150);
  const [isRunning, setIsRunning] = useState(false);
  console.log(array.arr);

  useEffect(() => {
    resetArray();
  }, [sizeArray]);

  function resetArray() {
    const arr = [];
    for (let i = 0; i < sizeArray; i++) {
      arr.push(randomIntFromInterval(5, 600));
    }
    return setArray({ arr });
  }

  async function mergeSort() {
    const animations = getMergeSortAnimations(array.arr);
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        await timer(0);
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
      } else {
        await timer(0);
        const [barOneIdx, newHeight] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        barOneStyle.height = `${newHeight}px`;
      }
    }
  }

  async function quickSort() {
    const animations = getQuickSortAnimations(array.arr);
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < animations.length; i++) {
      const temp = arrayBars[animations[i][0]].style.height;
      animations[i].length === 3
        ? (arrayBars[animations[i][0]].style.backgroundColor = TERTIARY_COLOR)
        : (arrayBars[animations[i][0]].style.backgroundColor = SECONDARY_COLOR);
      await timer(0);
      arrayBars[animations[i][0]].style.height =
        arrayBars[animations[i][1]].style.height;
      arrayBars[animations[i][1]].style.height = temp;
      await timer(0);
      if (animations[i].length === 2)
        arrayBars[animations[i][0]].style.backgroundColor = PRIMARY_COLOR;
    }
    Array.from(arrayBars).forEach((bar) => {
      bar.style.backgroundColor = PRIMARY_COLOR;
    });
    return array.arr;
  }
  async function heapSort() {
    const animations = getHeapSortAnimations(array.arr);
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < animations.length; i++) {
      let temp = arrayBars[animations[i][0]].style.height;
      arrayBars[animations[i][0]].style.height =
        arrayBars[animations[i][1]].style.height;
      arrayBars[animations[i][1]].style.height = temp;
      arrayBars[animations[i][0]].style.backgroundColor = SECONDARY_COLOR;
      arrayBars[animations[i][1]].style.backgroundColor = SECONDARY_COLOR;
      await timer(5);
      arrayBars[animations[i][0]].style.backgroundColor = PRIMARY_COLOR;
      arrayBars[animations[i][1]].style.backgroundColor = PRIMARY_COLOR;
    }
    console.log(array.arr);
  }

  function timer(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }

  async function testQuickSort() {
    const testArr = quickSort();
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < arrayBars.length; i++) {
      if (parseInt(arrayBars[i].style.height) !== testArr[i]) {
        return false;
      }
    }
  }

  async function bubbleSort() {
    let arrayBars = document.getElementsByClassName("array-bar");
    let checked;
    let j = 1;
    do {
      checked = false;
      for (let i = 0; i < arrayBars.length - j; i++) {
        const arrBar1Height = parseInt(arrayBars[i].style.height, 10);
        const arrBar2Height = parseInt(arrayBars[i + 1].style.height, 10);

        arrayBars[i].style.backgroundColor = SECONDARY_COLOR;
        arrayBars[i + 1].style.backgroundColor = SECONDARY_COLOR;
        if (arrBar1Height > arrBar2Height) {
          let tempHeight = arrBar1Height;
          arrayBars[i].style.height = `${arrBar2Height}px`;
          arrayBars[i + 1].style.height = `${tempHeight}px`;
          checked = true;
        }
        await timer(0);
        arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
        arrayBars[i + 1].style.backgroundColor = PRIMARY_COLOR;
      }
      j++;
    } while (checked);
  }

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  if (array.arr) {
    return (
      <>
        <div className="array-container">
          {array.arr.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{ backgroundColor: PRIMARY_COLOR, height: `${value}px` }}
            ></div>
          ))}
        </div>
        <div className="menu-container">
          <button onClick={resetArray} disabled={isRunning}>
            Generate New Array
          </button>
          <button onClick={mergeSort}>Merge Sort</button>
          <button onClick={quickSort}>Quick Sort</button>
          <button onClick={heapSort}>Heap Sort</button>
          <button onClick={bubbleSort}>Bubble Sort</button>
          <input
            id="arraySize"
            type="range"
            min="5"
            max="275"
            onMouseUp={(event) => setSizeArray(event.target.value)}
            step="5"
          ></input>
        </div>
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default SortingVisualizer;
