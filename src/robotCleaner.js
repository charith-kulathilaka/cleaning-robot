/** 
 * This function will start the cleaning process and function will ask for number of instructions.
 * @param rl - instance of node.js readline module.
 */
const startCleaningProcess = (rl) => {
  rl.question('Number of commands that cleaning robot should expect: ', (numOfSteps) => {
    if (-1 < numOfSteps && numOfSteps < 10001) {
      startingPoint(rl, numOfSteps)
    } else {
      // TODO: go back to readline instead of throwing the error.
      rl.close()
    }
  })
}


/**
 * This function will ask for the starting coodinates and this will pass number of instructions and starting coodinates.
 * @param rl - instance of node.js readline module. 
 * @param numberOfInstructions (number) - number of commands(steps and directions). 
 */

const startingPoint = (rl, numberOfInstructions) => {
  rl.question('Please submit the starting cordinates e.g:(X Y): ', (position) => {
    const num = position.split(' ')
    const startingCoordinates = [{
      x: parseInt(num[0]),
      y: parseInt(num[1])
    }]

    const validX = -100001 < startingCoordinates[0].x && startingCoordinates[0].x < 100001
    const validY = -100001 < startingCoordinates[0].y && startingCoordinates[0].y < 100001
    if (validX && validY) {
      nextPosition(rl, startingCoordinates, numberOfInstructions, 0)
    } else {
      rl.close()
    }
  })
}




/**
 * This function is recursive and it will pass starting coodinates, direction and number of steps to determine robot path.
 * @param rl - instance of node.js readline module.
 * @param robotPathInCoodinates (array) - An array with coordinates.
 * @param numberOfInstructions (number) - number of commands(steps and directions).
 * @param retries (number) - number of tries based on numberOfInstructions.
 */
const nextPosition = (rl, robotPathInCoodinates, numberOfInstructions, retries) => {
  const startingCoordinates = robotPathInCoodinates[robotPathInCoodinates.length - 1]
  let i = retries
  if (numberOfInstructions > i) {
    rl.question('Please enter the direction number of steps. e.g:(N 3): ', (position) => {
      const num = position.split(' ')
      const directionWithSteps = {
        direction: num[0],
        steps: parseInt(num[1])
      }
      if (-1 < directionWithSteps.steps && directionWithSteps.steps < 100001) {
        const arrayOfNewCoordinates = createArrayOfCoordinates(startingCoordinates, directionWithSteps, 0)
        robotPathInCoodinates = [...robotPathInCoodinates, ...arrayOfNewCoordinates]
        i++
        nextPosition(rl, robotPathInCoodinates, numberOfInstructions, i)
      } else {
       rl.close()
      }
    })
  } else {
    const robotPathWithOutDuplicates = removeDuplicates(robotPathInCoodinates)
    console.log('=> Cleaned: ', robotPathWithOutDuplicates.length)
    rl.close()
  }
}


/**
 * This function will calculate the robots path (coodinates) and return an array of coodinates. 
 * @param startingCoordinates (array) - An array with coordinates.
 * @param directionWithSteps (object) - object that contain direction and number of steps.
 * @param retries (number) - number of tries based on numberOfInstructions.
 * @returns newCoordinates (array) - array of coodinates
 */
const createArrayOfCoordinates = (startingCoordinates, directionWithSteps, retries) => {
  let i = retries
  let newCoordinates = [startingCoordinates]
  for (i = 0; i < directionWithSteps.steps; i++) {
    const lastCoordinate = newCoordinates[newCoordinates.length - 1]
    switch (directionWithSteps.direction) {
      case 'N':
        newCoordinates = [...newCoordinates, {
          x: startingCoordinates.x,
          y: lastCoordinate.y + 1
        }]
        break
      case 'E':
        newCoordinates = [...newCoordinates, {
          x: lastCoordinate.x + 1,
          y: startingCoordinates.y
        }]
        break
      case 'S':
        newCoordinates = [...newCoordinates, {
          x: startingCoordinates.x,
          y: lastCoordinate.y - 1
        }]
        break
      case 'W':
        newCoordinates = [...newCoordinates, {
          x: lastCoordinate.x - 1,
          y: startingCoordinates.y
        }]
        break
      default:
        // TODO: error handing for invalid directions
        newCoordinates
    }
  }
  return newCoordinates
}


/**
 * This function will remove duplicates from an array and return a new array with unique items. 
 * @param coordinatesWithDuplicates (array) - An array with coordinates.
 * @returns coordinatesWithDuplicates (array) - An array with out duplicates
 */
const removeDuplicates = (coordinatesWithDuplicates) => {
  return coordinatesWithDuplicates.filter((coordinate, index) => {
    return coordinatesWithDuplicates.indexOf(coordinate) === index
  })
}

module.exports = { startCleaningProcess, startingPoint, nextPosition, createArrayOfCoordinates, removeDuplicates}