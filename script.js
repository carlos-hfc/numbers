const result = []
const form = document.querySelector("form")

const numbers = document.getElementById("numbers")
const from = document.getElementById("from")
const to = document.getElementById("to")
const repeat = document.getElementById("repeat")

const drawedList = document.querySelector("section.drawed")
const drawedNumbers = document.querySelector(".drawed-numbers")

const drawAgain = document.querySelector("button:has(img[src*=play])")

numbers.oninput = () => {
  numbers.value = numbers.value.replace(/\D+/g, "")
}

from.oninput = () => {
  from.value = from.value.replace(/\D+/g, "")

  if (from.value && to.value && Number(from.value) > Number(to.value)) {
    from.value = to.value
  }
}

to.oninput = () => {
  to.value = to.value.replace(/\D+/g, "")

  if (from.value && to.value && Number(from.value) > Number(to.value)) {
    to.value = from.value
  }
}

form.onsubmit = event => {
  event.preventDefault()

  if (repeat.checked && from.value && to.value && numbers.value && (Number(from.value) + Number(numbers.value) > Number(to.value))) {
    alert(`Precisa conter uma diferença de ${numbers.value} entre os campos "De" e "A"`)
    return
  }

  drawNumbers()
  showDrawedNumbers()
}

function drawNumbers() {
  const total = numbers.value
  const min = Math.ceil(from.value)
  const max = Math.floor(to.value)

  for (let index = 0; index < total; index++) {
    const random = (Math.floor(Math.random() * (max - min + 1)) + min)

    if (result.includes(random)) {
      index--
    } else {
      result.push(random)
    }
  }
}

function showDrawedNumbers() {
  form.classList.toggle("flex")
  drawedList.classList.toggle("flex")

  for (let index = 0; index < result.length; index++) {
    const span = document.createElement("span")
    span.textContent = result[index]
    drawedNumbers.append(span)
  }
}

drawAgain.addEventListener("click", () => {
  form.classList.toggle("flex")
  drawedList.classList.toggle("flex")

  result.splice(0, result.length)
  drawedNumbers.replaceChildren()
})