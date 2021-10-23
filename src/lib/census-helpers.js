import * as d3 from "d3"

const variables = new Map(
  [
    ["<10", ["003", "004", "027", "028"]],
    ["10-19", ["005", "006", "007", "029", "030", "031"]],
    ["20-29", ["008", "009", "010", "011", "032", "033", "034", "035"]],
    ["30-39", ["012", "013", "036", "037"]],
    ["40-49", ["014", "015", "038", "039"]],
    ["50-59", ["016", "017", "040", "041"]],
    ["60-69", ["018", "019", "020", "021", "042", "043", "044", "045"]],
    ["70-79", ["022", "023", "046", "047"]],
    ["≥80", ["024", "025", "048", "049"]],
  ].map(([key, V]) => [key, V.map(v => `B01001_${v}E`)])
)

const states = new Map([
  ["*", "All states"],
  ["01", "AL"],
  ["02", "AK"],
  ["04", "AZ"],
  ["05", "AR"],
  ["06", "CA"],
  ["08", "CO"],
  ["09", "CT"],
  ["10", "DE"],
  ["11", "DC"],
  ["12", "FL"],
  ["13", "GA"],
  ["15", "HI"],
  ["16", "ID"],
  ["17", "IL"],
  ["18", "IN"],
  ["19", "IA"],
  ["20", "KS"],
  ["21", "KY"],
  ["22", "LA"],
  ["23", "ME"],
  ["24", "MD"],
  ["25", "MA"],
  ["26", "MI"],
  ["27", "MN"],
  ["28", "MS"],
  ["29", "MO"],
  ["30", "MT"],
  ["31", "NE"],
  ["32", "NV"],
  ["33", "NH"],
  ["34", "NJ"],
  ["35", "NM"],
  ["36", "NY"],
  ["37", "NC"],
  ["38", "ND"],
  ["39", "OH"],
  ["40", "OK"],
  ["41", "OR"],
  ["42", "PA"],
  ["44", "RI"],
  ["45", "SC"],
  ["46", "SD"],
  ["47", "TN"],
  ["48", "TX"],
  ["49", "UT"],
  ["50", "VT"],
  ["51", "VA"],
  ["53", "WA"],
  ["54", "WV"],
  ["55", "WI"],
  ["56", "WY"],
  ["72", "PR"],
])

const getByValue = (map, searchValue) => {
  for (let [key, value] of map.entries()) {
    if (value === searchValue) return key
  }
}

const ageBands = [
  "<10",
  "10-19",
  "20-29",
  "30-39",
  "40-49",
  "50-59",
  "60-69",
  "70-79",
  "≥80",
]

const sumArray = array => {
  const newArray = []
  array.forEach(sub => {
    sub.forEach((num, index) => {
      if (newArray[index]) {
        newArray[index] += num
      } else {
        newArray[index] = num
      }
    })
  })
  return newArray
}

const ageVariables = {
  B01001_003E: "<5", // Male
  B01001_004E: "5-9",
  B01001_005E: "10-14",
  B01001_006E: "15-19", // 15-17,
  B01001_007E: "15-19", // 18-19,
  B01001_008E: "20-24", // 20
  B01001_009E: "20-24", // 21
  B01001_010E: "20-24", // 22-24
  B01001_011E: "25-29",
  B01001_012E: "30-34",
  B01001_013E: "35-39",
  B01001_014E: "40-44",
  B01001_015E: "45-49",
  B01001_016E: "50-54",
  B01001_017E: "55-59",
  B01001_018E: "60-64", // 60-61
  B01001_019E: "60-64", // 62-64
  B01001_020E: "65-69", // 65-66
  B01001_021E: "65-69", // 67-69
  B01001_022E: "70-74",
  B01001_023E: "75-79",
  B01001_024E: "80-84",
  B01001_025E: "≥85",
  B01001_027E: "<5", // Female
  B01001_028E: "5-9",
  B01001_029E: "10-14",
  B01001_030E: "15-19", // 15-17
  B01001_031E: "15-19", // 18-19
  B01001_032E: "20-24", // 20
  B01001_033E: "20-24", // 21
  B01001_034E: "20-24", // 22-24
  B01001_035E: "25-29",
  B01001_036E: "30-34",
  B01001_037E: "35-39",
  B01001_038E: "40-44",
  B01001_039E: "45-49",
  B01001_040E: "50-54",
  B01001_041E: "55-59",
  B01001_042E: "60-64", // 60-61
  B01001_043E: "60-64", // 62-64
  B01001_044E: "65-69", // 65-66
  B01001_045E: "65-69", // 67-69
  B01001_046E: "70-74",
  B01001_047E: "75-79",
  B01001_048E: "80-84",
  B01001_049E: "≥85",
}

export { ageBands, sumArray, variables, states, ageVariables, getByValue }
