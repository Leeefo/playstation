const convertTime = (ms) => {

  let first = (ms / (1000 * 60 * 60)).toString().split('.');
  let second = (Number(['0', first[1]].join('.')) * 60).toString().split('.');
  let third = Math.round(Number(['0', second[1]].join('.')) * 60).toString()

  if (third == 60) {
    third = 0;
    second[0] = Number(second[0]) + 1
  }
  if (second[0] == 60) {
    second = 0;
    first[0] = Number(first[0]) + 1

  }
  return (`${first[0]}:${second[0]}:${third}`)
}



console.log(convertTime((35999 + 1) * 1000))