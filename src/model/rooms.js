const ok = '参数波动范围正常，无需设置。'
const warn = '参数波动范围正常，无需设置。'
const err = '剩余水量无法满足设定注水量，请检查水箱，并及时注水。'
const okPic = require('@/assets/success.png')
const warnPic = require('@/assets/warning.png')
const errPic = require('@/assets/error.png')
console.log(okPic)

export default {
  username: '',
  password: '',
  roomList: [
    {
      id: 1,
      useTime: '2018-06-06',
      mainFunction: '',
      beizu: '邹山咀道边棚里 一共20架。一架120联，一天产20044斤左右。',
      temp: {
        set: 34,
        max: 50,
        avg: 36,
        min: 30,
        state: ok,
        pic: okPic
      },
      water: {
        startTime: '',
        endTime: '',
        amount: 0,
        over: 100,
        target: 90,
        tinMax: 200,
        tinAmount: 150
      }
    },
    {
      id: 2,
      useTime: '2018-06-06',
      mainFunction: '',
      beizu: '邹山咀道边棚里 一共20架。一架120联，一天产20033斤左右。',
      temp: {
        set: 34,
        max: 50,
        avg: 36,
        min: 30,
        state: err,
        pic: errPic
      },
      water: {
        startTime: '',
        endTime: '',
        amount: 0,
        over: 100,
        target: 90,
        tinMax: 200,
        tinAmount: 150
      }
    },
    {
      id: 3,
      useTime: '2018-06-06',
      mainFunction: '',
      beizu: '邹山咀道边棚里 一共20架。一架120联，一天产20022斤左右。',
      temp: {
        set: 34,
        max: 50,
        avg: 36,
        min: 30,
        state: warn,
        pic: warnPic
      },
      water: {
        startTime: '',
        endTime: '',
        amount: 0,
        over: 100,
        target: 90,
        tinMax: 200,
        tinAmount: 150
      }
    },
    {
      id: 4,
      useTime: '2018-06-06',
      mainFunction: '',
      beizu: '邹山咀道边棚里 一共20架。一架120联，一天产20011斤左右。',
      temp: {
        set: 34,
        max: 50,
        avg: 36,
        min: 30,
        state: ok,
        pic: okPic
      },
      water: {
        startTime: '',
        endTime: '',
        amount: 20,
        over: 150,
        target: 99,
        tinMax: 200,
        tinAmount: 150
      }
    }
  ],
  deleteRoomByIdx (roomIdx) {
    this.roomList.splice(roomIdx, 1)
  }
}
