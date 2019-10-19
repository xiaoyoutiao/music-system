export default {
  lyricTime2Sec,
  sec2min
}

function lyricTime2Sec (timeStr) {
  const cleanTime = timeStr.split(']')[0].split('[')[1]
  const min = parseInt(cleanTime.split(':')[0], 10)
  const sec = parseInt(cleanTime.split('.')[0].split(':')[1], 10) + min * 60
  return {
    time: cleanTime,
    min,
    sec
  }
}

function sec2min (second) {
  const min = parseInt(second / 60)
    .toString()
    .padStart(2, '0')
  const sec = (second % 60)
    .toString()
    .split('.')[0]
    .padStart(2, '0')
  return (min + ':' + sec).split('.')[0]
}
