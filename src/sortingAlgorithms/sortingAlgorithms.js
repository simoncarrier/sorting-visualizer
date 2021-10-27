export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

export function bubbleSort(arr) {
  let len = arr.length;
  let checked;
  do {
    checked = false;
    for (let i = 0; i < len; i++) {
      if (arr[i] > arr[i + 1]) {
        swap(arr, i, i + 1);
        checked = true;
      }
    }
  } while (checked);
  return arr;
}

export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  quickSortHelper(array, animations);
  return animations;
}

function quickSortHelper(array, animations) {
  let stack = [];

  let start = 0;
  let end = array.length - 1;
  stack.push({ x: start, y: end });
  while (stack.length) {
    const { x, y } = stack.shift();

    const PI = partition(array, x, y, animations);

    if (PI - 1 > x) {
      stack.push({ x: x, y: PI - 1 });
    }
    if (PI + 1 < y) {
      stack.push({ x: PI + 1, y: y });
    }
  }
  return animations;
}

function partition(array, low, high, animations) {
  let pivot = array[high];
  //pivot index
  let i = low;
  for (let j = low; j < high; j++) {
    if (array[j] <= pivot) {
      animations.push([j, i]);
      swap(array, i, j);
      i++;
    }
  }
  animations.push([high, i, true]);
  swap(array, i, high);
  return i;
}

function swap(array, left, right) {
  const temp = array[left];
  array[left] = array[right];
  array[right] = temp;
}

function maxHeapify(arr, n, animations) {
  for (let i = 1; i < n; i++) {
    if (arr[i] > arr[parseInt((i - 1) / 2)]) {
      let j = i;
      while (arr[j] > arr[parseInt((j - 1) / 2)]) {
        const l = j;
        const r = parseInt((j - 1) / 2);

        [arr[l], arr[r]] = [arr[r], arr[l]];
        animations.push([l, r]);
        j = parseInt((j - 1) / 2);
      }
    }
  }
}

function heapSortHelper(arr, animations) {
  let n = arr.length;
  maxHeapify(arr, n, animations);
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    animations.push([0, i]);
    let j = 0,
      index;
    do {
      index = 2 * j + 1;
      if (index < i - 1 && arr[index] < arr[index + 1]) {
        index++;
      }
      if (index < i && arr[j] < arr[index]) {
        animations.push([j, index]);
        [arr[j], arr[index]] = [arr[index], arr[j]];
      }
      j = index;
    } while (index < i);
  }
  return animations;
}

export function getHeapSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  heapSortHelper(array, animations);
  return animations;
}
