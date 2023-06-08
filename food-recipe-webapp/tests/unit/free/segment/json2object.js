const json = '{ "orgIds": null, "status": [], "empTypes": [486], "genders": [], "birthday": null, "birthdayRange": null }'
console.log(typeof (json))
const segment = JSON.parse(json)
console.log(typeof (segment))
console.log(segment.empTypes[0])
