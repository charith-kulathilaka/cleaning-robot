const {
  startCleaningProcess,
  createArrayOfCoordinates,
  removeDuplicates
} = require('../src/robotCleaner')

describe('Robot cleaner test suite', () => {

  test('should verify two steps north (N 2) from starting coordinates (1, 1)', () => {
    const startingCoordinates = {
      x: 1,
      y: 1
    }
    const directionWithSteps = {
      direction: 'N',
      steps: 2
    }
    const robotPath = createArrayOfCoordinates(startingCoordinates, directionWithSteps, 0)
    const expectedRobotPath = [{
      x: 1,
      y: 1
    }, {
      x: 1,
      y: 2
    }, {
      x: 1,
      y: 3
    }]
    expect(robotPath).toMatchObject(expectedRobotPath)
  })

  test('should verify two steps east (E 2) from starting coordinates (1, 1)', () => {
    const startingCoordinates = {
      x: 1,
      y: 1
    }
    const directionWithSteps = {
      direction: 'E',
      steps: 2
    }
    const robotPath = createArrayOfCoordinates(startingCoordinates, directionWithSteps, 0)
    const expectedRobotPath = [{
      x: 1,
      y: 1
    }, {
      x: 2,
      y: 1
    }, {
      x: 3,
      y: 1
    }]
    expect(robotPath).toMatchObject(expectedRobotPath)
  })

  test('should verify two steps south (S 2) from starting coordinates (1, 1)', () => {
    const startingCoordinates = {
      x: 1,
      y: 1
    }
    const directionWithSteps = {
      direction: 'S',
      steps: 2
    }
    const robotPath = createArrayOfCoordinates(startingCoordinates, directionWithSteps, 0)
    const expectedRobotPath = [{
      x: 1,
      y: 1
    }, {
      x: 1,
      y: 0
    }, {
      x: 1,
      y: -1
    }]
    expect(robotPath).toMatchObject(expectedRobotPath)
  })

  test('should verify two steps east (W 2) from starting coordinates (1, 1)', () => {
    const startingCoordinates = {
      x: 1,
      y: 1
    }
    const directionWithSteps = {
      direction: 'W',
      steps: 2
    }
    const robotPath = createArrayOfCoordinates(startingCoordinates, directionWithSteps, 0)
    const expectedRobotPath = [{
      x: 1,
      y: 1
    }, {
      x: 0,
      y: 1
    }, {
      x: -1,
      y: 1
    }]
    expect(robotPath).toMatchObject(expectedRobotPath)
  })

  test('should verify invalid direction input to the robot', () => {
    const startingCoordinates = {
      x: 1,
      y: 1
    }
    const directionWithSteps = {
      direction: 'A',
      steps: 2
    }
    const robotPath = createArrayOfCoordinates(startingCoordinates, directionWithSteps, 0)
    const expectedRobotPath = [{
      x: 1,
      y: 1
    }]
    expect(robotPath).toMatchObject(expectedRobotPath)
  })

  test('should verify uniqueness of the array', () => {
    const coordinatesWithDuplicates = [1, 1, 2, 2, 3, 4]
    const uniqueArray = removeDuplicates(coordinatesWithDuplicates)
    const expectedUniqueArray = [1, 2, 3, 4]
    expect(uniqueArray).toEqual(expectedUniqueArray)
  })

  test('should verify happy path of the robot cleaner', () => {

    const mockQuestions = jest.fn()
      .mockImplementationOnce((questionText, cb) => {
        cb('1')
      })
      .mockImplementationOnce((questionText, cb) => {
        cb('1 1')
      })
      .mockImplementationOnce((questionText, cb) => {
        cb('N 3')
      })

    const mockCreateInterface = jest.fn().mockReturnValue({
      question: mockQuestions,
      close: jest.fn().mockImplementation()
    })

    const readLineMock = jest.mock('readline', () => ({
      createInterface: mockCreateInterface
    }))

    const rl = require('readline').createInterface()

    startCleaningProcess(rl)

    expect(mockCreateInterface).toHaveBeenCalled()
    expect(mockCreateInterface.mock.instances.length).toBe(1)
    expect(mockQuestions).toHaveBeenCalled()
    expect(mockQuestions.mock.instances.length).toBe(3)
  })
})