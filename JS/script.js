window.onload = function() {

    class Player {
        constructor(tile, walls, colour, rgba, goal) {
            this.tile = tile;
            this.walls = walls;
            this.colour = colour;
            this.rgba = rgba;
            this.goal = goal;
        }
    }

    let blue = new Player('t-e1', 5, 'blue', 'rgba(50, 168, 184, .3)', 'r-9');
    let green = new Player('t-i5', 5, 'green', 'rgba(37, 128, 56, .3)', 'c-a');
    let red = new Player('t-e9', 5, 'red', 'rgba(207, 55, 33, .3)', 'r-1');
    let yellow = new Player('t-a5', 5, 'yellow', 'rgba(245, 190, 64, .3)', 'c-i');
    let players = [blue, green, red, yellow];
    let activePlayer = players[Math.floor(Math.random() * players.length)];

    function nextTurn() {
        if (activePlayer === players[0]) {
            activePlayer = players[1];
        } else if (activePlayer === players[1]) {
            activePlayer = players[2];
        } else if (activePlayer === players[2]) {
            activePlayer = players[3];
        } else if (activePlayer === players[3]) {
            activePlayer = players[0]
        }
        document.getElementById('status').innerHTML = 'ACTIVE PLAYER: ' + activePlayer.colour.toUpperCase() +
            '<br><br> WALLS REMAINING:  ' + activePlayer.walls;
    }

    // function gameisWon() {
    //     if (red.tile[3] === '1') {
    //         return true;
    //     } else if (yellow.tile[2] === 'i') {
    //         return true;
    //     } else if (blue.tile[3] === '9') {
    //         return true;
    //     } else if (green.tile[2] === 'a') {
    //         return true;
    //     } else {
    //         return false
    //     }
    // }

    function gameHasWinner() {
        if (red.tile[3] === '1') {
            document.getElementById('winner-name').innerHTML = "Red";
            document.getElementById('game-over-outer').style.visibility = 'visible';
            return 'red wins';
        } else if (yellow.tile[2] === 'i') {
            document.getElementById('winner-name').innerHTML = "Yellow";
            document.getElementById('game-over-outer').style.visibility = 'visible';
            return 'yellow wins';
        } else if (blue.tile[3] === '9') {
            document.getElementById('winner-name').innerHTML = "Blue";
            document.getElementById('game-over-outer').style.visibility = 'visible';
            return 'blue wins';
        } else if (green.tile[2] === 'a') {
            document.getElementById('winner-name').innerHTML = "Green";
            document.getElementById('game-over-outer').style.visibility = 'visible';
            return 'green wins';
        }
        return false
    }

    let tiles = document.getElementsByClassName("tile");
    let horizontalWalls = document.getElementsByClassName("wall horizontal");
    let verticalWalls = document.getElementsByClassName("wall vertical");

    function flatten(array) {
        let output = [];
        for (let i = 0; i < array.length; i++) {
            if (array[i] !== undefined) {
                if (array[i].length === 2) {
                    output.push(array[i][0]);
                    output.push(array[i][1]);
                } else {
                    output.push(array[i]);
                }
            }
        }
        return output;
    }

    function tilesInclude(id) {
        let tilesIds = [];
        for (let i = 0; i < tiles.length; i++) {
            tilesIds.push(tiles[i].id);
        }
        return tilesIds.includes(id);
    }

    function previousChar(char) {
        return String.fromCharCode(char.charCodeAt(0) - 1);
    }

    function nextChar(char) {
        return String.fromCharCode(char.charCodeAt(0) + 1);
    }

    function placeWall() {
        if (activePlayer.walls > 0) {
            let id = this.getAttribute('id');
            if (id[0] === 'v') {
                let divider = document.getElementById(getVerticalDividerId(id));
                if (divider.getAttribute('class') !== 'divider taken') {
                    let wallSectionTwo = document.getElementById(getSecondVerticalWallId(id));
                    let wallToRight = document.getElementById(getHorizontalWallRight(id));
                    let wallToLeft = document.getElementById(getHorizontalWallLeft(id));
                    this.style.background = 'black';
                    wallSectionTwo.style.background = 'black';
                    divider.style.background = 'black';
                    this.style.borderBottom = '.5px solid black';
                    wallSectionTwo.style.borderTop = '.5px solid black';
                    wallToRight.style.borderLeft = '.5px solid black';
                    wallToLeft.style.borderRight = '.5px solid black';
                    this.setAttribute('class', 'wall vertical taken');
                    wallSectionTwo.setAttribute('class', 'wall vertical taken');
                    divider.setAttribute('class', 'divider taken');
                    activePlayer.walls--;
                    wipeEventListeners();
                    gameHasWinner();
                    nextTurn();
                    setupEventListeners(getAvailableMoves(activePlayer));
                }
            } else if (id[0] === 'h') {
                let divider = document.getElementById(getHorizontalDividerId(id));
                if (divider.getAttribute('class') !== 'divider taken') {
                    let wallSectionTwo = document.getElementById(getSecondHorizontalWallId(id));
                    let wallAbove = document.getElementById(getVerticalWallAbove(id));
                    let wallBelow = document.getElementById(getVerticalWallBelow(id));
                    this.style.background = 'black';
                    wallSectionTwo.style.background = 'black';
                    divider.style.background = 'black';
                    this.style.borderRight = '.5px solid black';
                    wallSectionTwo.style.borderLeft = '.5px solid black';
                    wallAbove.style.borderBottom = '.5px solid black';
                    wallBelow.style.borderTop = '.5px solid black';
                    this.setAttribute('class', 'wall horizontal taken');
                    wallSectionTwo.setAttribute('class', 'wall horizontal taken');
                    divider.setAttribute('class', 'divider taken');
                    activePlayer.walls--;
                    wipeEventListeners();
                    gameHasWinner();
                    nextTurn();
                    setupEventListeners(getAvailableMoves(activePlayer));
                }
            }
        } else {
            alert('No more walls left!');
        }
        console.log(getTakenWalls());
        console.log(getTakenDividers());
    }

    function getTakenWalls() {
        let takenWalls = [];
        let walls = document.getElementsByClassName('wall');
        for (let i = 0; i < walls.length; i++) {
            if (walls[i].getAttribute('class').includes('taken')) {
                takenWalls.push(walls[i]);
            }
        }
        return takenWalls
    }

    function getTakenDividers() {
        let takenDividers = [];
        let dividers = document.getElementsByClassName('divider');
        for (let i = 0; i < dividers.length; i++) {
            if (dividers[i].getAttribute('class').includes('taken')) {
                takenDividers.push(dividers[i]);
            }
        }
        return takenDividers
    }

    function checkAboveDivider(dividerId) {
        let idArray = dividerId.split('');
        let number = parseInt(idArray[2]);
        number --;
        idArray[2] = number.toString();
        return idArray.join('');
    }

    function checkBelowDivider(dividerId) {
        let idArray = dividerId.split('');
        let number = parseInt(idArray[2]);
        number ++;
        idArray[2] = number.toString();
        return idArray.join('');
    }

    function checkLeftDivider(divider) {
        let id = divider.getAttribute('id');
        let idArray = id.split('');
        let letter = idArray[3];
        idArray[3] = previousChar(letter);
        return idArray.join('');
    }

    function checkRightDivider(divider) {
        let id = divider.getAttribute('id');
        let idArray = id.split('');
        let letter = idArray[3];
        idArray[3] = nextChar(letter);
        return idArray.join('');
    }

    function getVerticalWallAbove(id) {
        let idArray = id.split('');
        idArray[0] = 'v';
        let letter = idArray[3];
        idArray[3] = previousChar(letter);
        return idArray.join('');
    }

    function getVerticalWallBelow(id) {
        let idArray = id.split('');
        idArray[0] = 'v';
        let number = parseInt(idArray[2]);
        number ++;
        idArray[2] = number.toString();
        let letter = idArray[3];
        idArray[3] = previousChar(letter);
        return idArray.join('');
    }

    function getHorizontalWallRight(id) {
        let idArray = id.split('');
        idArray[0] = 'h';
        let number = parseInt(idArray[2]);
        number --;
        idArray[2] = number.toString();
        let letter = idArray[3];
        idArray[3] = nextChar(letter);
        return idArray.join('');
    }

    function getHorizontalWallLeft(id) {
        let idArray = id.split('');
        idArray[0] = 'h';
        let number = parseInt(idArray[2]);
        number --;
        idArray[2] = number.toString();
        return idArray.join('');
    }

    function getVerticalDividerId(id) {
        let idArray = id.split('');
        let indexNumber = parseInt(idArray[2]);
        indexNumber --;
        idArray[2] = indexNumber.toString();
        idArray[0] = 'd';
        return idArray.join('');
    }

    function getHorizontalDividerId(id) {
        let idArray = id.split('');
        let indexLetter = idArray[3];
        idArray[3] = previousChar(indexLetter);
        idArray[0] = 'd';
        return idArray.join('');
    }

    function getSecondVerticalWallId(id) {
        let idArray = id.split('');
        let indexNumber = parseInt(idArray[2]);
        indexNumber --;
        idArray[2] = indexNumber.toString();
        return idArray.join('');
    }

    function getSecondHorizontalWallId(id) {
        let idArray = id.split('');
        let indexLetter = idArray[3];
        indexLetter = previousChar(indexLetter);
        idArray[3] = indexLetter;
        return idArray.join('');
    }

    function verticalWallMouseOver() {
        if (activePlayer.walls > 0) {
            let id = this.getAttribute('id');
            if (id[2] !== '1' && this.getAttribute('class') !== 'wall vertical taken') {
                let wallSectionTwo = document.getElementById(getSecondVerticalWallId(id));
                if (wallSectionTwo.getAttribute('class') !== 'wall vertical taken') {
                    let divider = document.getElementById(getVerticalDividerId(id));
                    if (divider.getAttribute('class') !== 'divider taken') {
                        let wallToRight = document.getElementById(getHorizontalWallRight(id));
                        let wallToLeft = document.getElementById(getHorizontalWallLeft(id));
                        this.style.background = activePlayer.rgba;
                        wallSectionTwo.style.background = activePlayer.rgba;
                        divider.style.background = activePlayer.rgba;
                        this.style.borderBottom = '.5px solid black';
                        wallSectionTwo.style.borderTop = '.5px solid black';
                        wallToRight.style.borderLeft = '.5px solid black';
                        wallToLeft.style.borderRight = '.5px solid black';
                    }
                }
            }
        }
    }

    function verticalWallMouseOut() {
        if (activePlayer.walls > 0) {
            let id = this.getAttribute('id');
            if (id[2] !== '1' && this.getAttribute('class') !== 'wall vertical taken') {
                let wallSectionTwo = document.getElementById(getSecondVerticalWallId(id));
                if (wallSectionTwo.getAttribute('class') !== 'wall vertical taken') {
                    let divider = document.getElementById(getVerticalDividerId(id));
                    if (divider.getAttribute('class') !== 'divider taken') {
                        let wallToRight = document.getElementById(getHorizontalWallRight(id));
                        let wallToLeft = document.getElementById(getHorizontalWallLeft(id));
                        let aboveDivider = document.getElementById(checkAboveDivider(divider.getAttribute('id')));
                        let belowDivider = document.getElementById(checkBelowDivider(divider.getAttribute('id')));
                        this.style.background = 'transparent';
                        wallSectionTwo.style.background = 'transparent';
                        divider.style.background = 'transparent';
                        if (wallToRight.getAttribute('class') !== 'wall horizontal taken') {
                            wallToRight.style.borderLeft = '0';
                        }
                        if (wallToLeft.getAttribute('class') !== 'wall horizontal taken') {
                            wallToLeft.style.borderRight = '0';
                        }
                        if (aboveDivider !== null) {
                            if (aboveDivider.getAttribute('class') !== 'divider taken') {
                                wallSectionTwo.style.borderTop = '0';
                            }
                        } else {
                            wallSectionTwo.style.borderTop = '0';
                        }
                        if (belowDivider !== null) {
                            if (belowDivider.getAttribute('class') !== 'divider taken') {
                                this.style.borderBottom = '0';
                            }
                        } else {
                            this.style.borderBottom = '0';
                        }
                    }
                }
            }
        }
    }

    function horizontalWallMouseOver() {
        if (activePlayer.walls > 0) {
            let id = this.getAttribute('id');
            if (id[3] !== 'a' && this.getAttribute('class') !== 'wall horizontal taken') {
                let wallSectionTwo = document.getElementById(getSecondHorizontalWallId(id));
                if (wallSectionTwo.getAttribute('class') !== 'wall horizontal taken') {
                    let divider = document.getElementById(getHorizontalDividerId(id));
                    if (divider.getAttribute('class') !== 'divider taken') {
                        let wallAbove = document.getElementById(getVerticalWallAbove(id));
                        let wallBelow = document.getElementById(getVerticalWallBelow(id));
                        this.style.background = activePlayer.rgba;
                        wallSectionTwo.style.background = activePlayer.rgba;
                        divider.style.background = activePlayer.rgba;
                        this.style.borderRight = '.5px solid black';
                        wallSectionTwo.style.borderLeft = '.5px solid black';
                        wallAbove.style.borderBottom = '.5px solid black';
                        wallBelow.style.borderTop = '.5px solid black';
                    }
                }
            }
        }
    }

    function horizontalWallMouseOut() {
        if (activePlayer.walls > 0) {
            let id = this.getAttribute('id');
            if (id[3] !== 'a' && this.getAttribute('class') !== 'wall horizontal taken') {
                let wallSectionTwo = document.getElementById(getSecondHorizontalWallId(id));
                if (wallSectionTwo.getAttribute('class') !== 'wall horizontal taken') {
                    let divider = document.getElementById(getHorizontalDividerId(id));
                    if (divider.getAttribute('class') !== 'divider taken') {
                        let wallAbove = document.getElementById(getVerticalWallAbove(id));
                        let wallBelow = document.getElementById(getVerticalWallBelow(id));
                        let leftDivider = document.getElementById(checkLeftDivider(divider));
                        let rightDivider = document.getElementById(checkRightDivider(divider));
                        this.style.background = 'transparent';
                        wallSectionTwo.style.background = 'transparent';
                        divider.style.background = 'transparent';
                        if (wallAbove.getAttribute('class') !== 'wall vertical taken') {
                            wallAbove.style.borderBottom = '0';
                        }
                        if (wallBelow.getAttribute('class') !== 'wall vertical taken') {
                            wallBelow.style.borderTop = '0';
                        }

                        if (rightDivider !== null) {
                            if (rightDivider.getAttribute('class') !== 'divider taken') {
                                this.style.borderRight = '0';
                            }
                        } else {
                            this.style.borderRight = '0';
                        }

                        if (leftDivider !== null) {
                            if (leftDivider.getAttribute('class') !== 'divider taken') {
                                wallSectionTwo.style.borderLeft = '0';
                            }
                        } else {
                            wallSectionTwo.style.borderLeft = '0';
                        }
                    }
                }
            }
        }
    }

    function spaceIsAvailable(spaceIndex) {
        for (let player of players) {
            if (player.tile === spaceIndex) {
                return false
            }
        }
        return true
    }

    function wallAbove(location) {
        let boardIndexArray = location.split('');
        let boardIndexLetter = boardIndexArray[2];
        let boardIndexNumber = parseInt(boardIndexArray[3]);
        boardIndexNumber --;
        let wall = document.getElementById('h-' + boardIndexNumber + boardIndexLetter);
        if (wall !== null) {
            return wall.getAttribute('class').includes('taken');
        } else {
            return false;
        }
    }

    function wallBelow(location) {
        let boardIndexArray = location.split('');
        let boardIndexLetter = boardIndexArray[2];
        let boardIndexNumber = parseInt(boardIndexArray[3]);
        let wall = document.getElementById('h-' + boardIndexNumber + boardIndexLetter);
        if (wall !== null) {
            return wall.getAttribute('class').includes('taken');
        } else {
            return false;
        }
    }

    function wallRight(location) {
        let boardIndexArray = location.split('');
        let boardIndexLetter = boardIndexArray[2];
        let boardIndexNumber = parseInt(boardIndexArray[3]);
        let wall = document.getElementById('v-' + boardIndexNumber + boardIndexLetter);
        if (wall !== null) {
            return wall.getAttribute('class').includes('taken');
        } else {
            return false;
        }
    }

    function wallLeft(location) {
        let boardIndexArray = location.split('');
        let boardIndexLetter = boardIndexArray[2];
        let boardIndexNumber = parseInt(boardIndexArray[3]);
        let wall = document.getElementById('v-' + boardIndexNumber + previousChar(boardIndexLetter));
        if (wall !== null) {
            return wall.getAttribute('class').includes('taken');
        } else {
            return false;
        }
    }

    function getUp(location) {
        if (location[3] !== '1') {
            if (wallAbove(location) === false) {
                let boardIndexArray = location.split('');
                let boardIndexNumber = parseInt(boardIndexArray[3]);
                boardIndexNumber--;
                boardIndexArray[3] = boardIndexNumber.toString();
                let upSpace = boardIndexArray.join('');
                if (upSpace !== null && tilesInclude(upSpace) && spaceIsAvailable(upSpace)) {
                    return upSpace;
                } else if (boardIndexNumber - 1 !== 1) {
                    if (wallAbove(upSpace) === false) {
                        boardIndexNumber--;
                        boardIndexArray[3] = boardIndexNumber.toString();
                        let upSpace = boardIndexArray.join('');
                        if (upSpace !== null && tilesInclude(upSpace) && spaceIsAvailable(upSpace)) {
                            return upSpace;
                        }
                    } else {
                        return [getRight(upSpace), getLeft(upSpace)];
                    }
                }
            }
        }
    }

    function getDown(location) {
        if (location[3] !== '9') {
            if (wallBelow(location) === false) {
                let boardIndexArray = location.split('');
                let boardIndexNumber = parseInt(boardIndexArray[3]);
                boardIndexNumber++;
                boardIndexArray[3] = boardIndexNumber.toString();
                let downSpace = boardIndexArray.join('');
                if (downSpace !== null && tilesInclude(downSpace) && spaceIsAvailable(downSpace)) {
                    return downSpace;
                } else if (boardIndexNumber + 1 !== 9) {
                    if (wallBelow(downSpace) === false) {
                        boardIndexNumber++;
                        boardIndexArray[3] = boardIndexNumber.toString();
                        let downSpace = boardIndexArray.join('');
                        if (downSpace !== null && tilesInclude(downSpace) && spaceIsAvailable(downSpace)) {
                            return downSpace;
                        }
                    } else {
                        return [getRight(downSpace), getLeft(downSpace)];
                    }
                }
            }
        }
    }

    function getRight(location) {
        if  (location[2] !== 'i') {
            if (wallRight(location) === false) {
                let boardIndexArray = location.split('');
                let boardIndexLetter = boardIndexArray[2];
                boardIndexArray[2] = nextChar(boardIndexLetter);
                let rightSpace = boardIndexArray.join('');
                if (rightSpace !== null && tilesInclude(rightSpace) && spaceIsAvailable(rightSpace)) {
                    return rightSpace;
                } else if (nextChar(boardIndexLetter) !== 'i') {
                    if (wallRight(rightSpace) === false) {
                        let next = nextChar(boardIndexLetter);
                        boardIndexArray[2] = nextChar(next);
                        let rightSpace = boardIndexArray.join('');
                        if (rightSpace !== null && tilesInclude(rightSpace) && spaceIsAvailable(rightSpace)) {
                            return rightSpace;
                        }
                    } else {
                        return [getUp(rightSpace), getDown(rightSpace)];
                    }
                }
            }
        }
    }

    function getLeft(location) {
        if  (location[2] !== 'a') {
            if (wallLeft(location) === false) {
                let boardIndexArray = location.split('');
                let boardIndexLetter = boardIndexArray[2];
                boardIndexArray[2] = previousChar(boardIndexLetter);
                let leftSpace = boardIndexArray.join('');
                if (leftSpace !== null && tilesInclude(leftSpace) && spaceIsAvailable(leftSpace)) {
                    return leftSpace;
                } else if (previousChar(boardIndexLetter) !== 'a') {
                    if (wallLeft(leftSpace) === false) {
                        let next = previousChar(boardIndexLetter);
                        boardIndexArray[2] = previousChar(next);
                        let leftSpace = boardIndexArray.join('');
                        if (leftSpace !== null && tilesInclude(leftSpace) && spaceIsAvailable(leftSpace)) {
                            return leftSpace;
                        }
                    } else {
                        return [getUp(leftSpace), getDown(leftSpace)];
                    }
                }
            }
        }
    }

    function getAvailableMoves(player) {
        let moves = [getUp(player.tile), getRight(player.tile), getDown(player.tile), getLeft(player.tile)];
        let flattenedMoves = flatten(moves);
        return flattenedMoves.filter(function( element ) {
            return element !== undefined;
        });
    }

    for (let i = 0; i < verticalWalls.length; i++) {
        verticalWalls[i].addEventListener('click', placeWall, false);
        verticalWalls[i].addEventListener('mouseover', verticalWallMouseOver, false);
        verticalWalls[i].addEventListener('mouseout', verticalWallMouseOut, false);
    }

    for (let i = 0; i < horizontalWalls.length; i++) {
        horizontalWalls[i].addEventListener('click', placeWall, false);
        horizontalWalls[i].addEventListener('mouseover', horizontalWallMouseOver, false);
        horizontalWalls[i].addEventListener('mouseout', horizontalWallMouseOut, false);
    }

    function previewMove() {
        this.innerHTML = `<img src='./images/${activePlayer.colour}.png' class='preview'>`;
    }

    function endPreview() {
        this.innerHTML = '';
    }

    function wipeEventListeners() {
        for (let i = 0; i < tiles.length; i++) {
            tiles[i].removeEventListener('mouseenter', previewMove, false);
            tiles[i].removeEventListener('mouseleave', endPreview, false);
        }
    }

    function makeMove() {
        let availableMoves = getAvailableMoves(activePlayer);
        if (availableMoves.includes(this.id)) {
            document.getElementById(activePlayer.tile).innerHTML = '';
            document.getElementById(activePlayer.tile).setAttribute('class', 'tile');
            this.innerHTML = `<img src='./images/${activePlayer.colour}.png' class='pawn'>`;
            activePlayer.tile = this.getAttribute('id');
            this.setAttribute('class', 'tile occupied ' + activePlayer.colour);
            wipeEventListeners();
            gameHasWinner();
            nextTurn();
            setupEventListeners(getAvailableMoves(activePlayer));
        }
    }

    function setupEventListeners(availableMovesArray) {
        let availableMoves = availableMovesArray;
        for (let i = 0; i < availableMoves.length; i++) {
            document.getElementById(availableMoves[i]).addEventListener('mouseenter', previewMove, false);
            document.getElementById(availableMoves[i]).addEventListener('mouseleave', endPreview, false);
            document.getElementById(availableMoves[i]).addEventListener('click', makeMove, false);
        }
    }

    setupEventListeners(getAvailableMoves(activePlayer));
    document.getElementById('status').innerHTML = 'ACTIVE PLAYER: ' + activePlayer.colour.toUpperCase() +
        '<br><br> WALLS REMAINING:  ' + activePlayer.walls;
};