(function () {
  'use strict'
  let display = document.querySelector("#display")
  let buttonNumbers = document.querySelectorAll("[data-js='button-number']")
  let buttonCE = document.querySelector("#clear")
  let buttonOperations = document.querySelectorAll("[data-js='button-operation']")
  let buttonEqual = document.querySelector("#equal")

  function initialize() {
    initEvents()
  }

  function initEvents() {
    buttonNumbers.forEach(button => button.addEventListener("click", handleClickNumber))
    buttonCE.addEventListener("click", handleClickCE)
    buttonOperations.forEach(button => button.addEventListener("click", handleClickOperation))
    buttonEqual.addEventListener("click", handleClickEqual)
  }
  function handleClickNumber() {
    display.value += this.value
  }
  function handleClickCE() {
    display.value = 0
  }
  function handleClickOperation() {
    display.value = removeLastItemIfItIsAnOperator(display.value)
    display.value += this.value
  }


  function handleClickEqual() {
    display.value = removeLastItemIfItIsAnOperator(display.value)
    let allValues = display.value.match(getRegexOperations())
    display.value = allValues.reduce(calculateAllValues)
  }

  function getRegexOperations() {
    return new RegExp('\\d+[' + getOperations().join('') + ']?', 'g')
  }


  function calculateAllValues(accumulated, actual) {
    let firstValue = accumulated.slice(0, -1)
    let operator = accumulated.split('').pop()
    let lastValue = removeLastItemIfItIsAnOperator(actual)
    let lastOperator = isLastItemAnOperation(actual) ? actual.split('').pop() : ""
    return doOperation(operator, firstValue, lastValue) + lastOperator
  }

  function doOperation(operator, firstValue, lastValue) {
    switch (operator) {
      case "+":
        return Number(firstValue) + Number(lastValue)
      case "-":
        return Number(firstValue) - Number(lastValue)
      case "x":
        return Number(firstValue) * Number(lastValue)
      case "÷":
        return Number(firstValue) / Number(lastValue)
    }
  }

  function removeLastItemIfItIsAnOperator(string) {
    if (isLastItemAnOperation(string))
      return string.slice(0, -1)
    return string
  }

  function getOperations() {
    return Array.prototype.map.call(buttonOperations, button => button.value)
  }

  function isLastItemAnOperation(number) {
    let operations = getOperations()
    let lastItem = number.split("").pop()
    return operations.some(function (operator) {
      return operator === lastItem
    })
  }
  initialize()
})()