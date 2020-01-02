function checkRow(array, pos) {
    var i = Math.floor(pos / 9);
    var j = pos % 9;
    for (let k = 0; k < 9; k++) {
        if (array[i * 9 + j] == array[i * 9 + k] && array[i * 9 + j] != "." && j != k) {
            return false;
        }
    }
    return true;
}

function checkCol(array, pos) {
    var i = Math.floor(pos / 9);
    var j = pos % 9;
    for (let k = 0; k < 9; k++) {
        if (array[i * 9 + j] == array[k * 9 + j] && array[i * 9 + j] != "." && i != k) {
            return false;
        }
    }
    return true;
}

function checkZone(array, pos) {
    var i = Math.floor(pos / 9);
    var j = pos % 9;
    var iZ = Math.floor(i / 3);
    var jZ = Math.floor(j / 3);
    for (let k1 = 3 * iZ; k1 < 3 + 3 * iZ; k1++) {
        for (let k2 = 3 * jZ; k2 < 3 + 3 * jZ; k2++) {
            if (array[i * 9 + j] == array[k1 * 9 + k2] && array[i * 9 + j] != "." && (i != k1 || j != k2)) {
                return false
            }
        }
    }
    return true;
}

function check(array, pos) {
    return (checkCol(array, pos) && checkRow(array, pos) && checkZone(array, pos))
}

function diff(obj1, obj2) {
    return obj1.remain.length - obj2.remain.length;
}

function Solver(array) {
    var p = 0;
    var auxiliary = [...array];
    var pending = [],
        pointers = [];
    var remain = [];
    for (let pos = 0; pos < array.length; pos++) { //Check if the input sudoku is initially valid
        if (array[pos] != ".") {
            if (!check(array, pos)) {
                console.log(array[pos] + " at " + pos);
                throw new Error("Invalid Sudoku");
                return null;
            }
        }
    }
    for (let pos = 0; pos < array.length; pos++) { //Create pending array, which store the valid value of 
        //empty grids and theirs correspond position 
        if (array[pos] == ".") {
            remain = [];
            for (let val = 1; val < 10; val++) {
                auxiliary[pos] = val;
                if (check(auxiliary, pos)) {
                    remain.push(val);
                }
            }
            pending.push({
                "pos": pos,
                "remain": [...remain]
            })
            auxiliary[pos] = ".";
        }
    }
    pending.sort(diff);
    console.log(pending);
    for (let i = 0; i < pending.length; i++) { //Point to current value considered in pending array
        pointers.push(0);
    }
    while (p < pending.length) {
        let current = pending[p];
        if (p < 0) {
            throw new Error("Unsolvable Sudoku");
            return null;
        }
        if (pointers[p] >= current.remain.length) {
            auxiliary[current.pos] = ".";
            pointers[p] = 0;
            p--;
            pointers[p]++;
            continue;
        }
        auxiliary[current.pos] = current.remain[pointers[p]];
        // console.log(auxiliary[current.pos]);
        if (check(auxiliary, current.pos)) {
            p++;
        } else {
            auxiliary[current.pos] = ".";
            if (pointers[p] < current.remain.length) {
                pointers[p]++;
            } else {
                pointers[p] = 0;
                p--;
                pointers[p]++;
            }
        }

    }
    return auxiliary;
}
export { check, checkCol, checkRow, checkZone, Solver }