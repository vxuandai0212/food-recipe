const applicationIds = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  12,
  15,
  16,
  17,
  22,
  25,
  28,
  31,
  34,
  37,
  38,
  46,
  49,
  52,
  53,
  55,
  58,
  61
]

const aliasIds = [
  1,
  4,
  7,
  10,
  13,
  16,
  19,
  22,
  25,
  28,
  31,
  34,
  37,
  40,
  43,
  46,
  49,
  52,
  55,
  58,
  61,
  64,
  67,
  70,
  73,
  76,
  79,
  82,
  85,
  88,
  91,
  94
]

let query = ''
for (let i = 0; i < applicationIds.length; i++) {
  for (let j = 0; j < aliasIds.length; j++) {
    const applicationId = applicationIds[i]
    const aliasId = aliasIds[j]
    const row = `(${applicationId},${aliasId},1)`
    query = query + row + ','
  }
}
console.log(query)

console.log('hi')
