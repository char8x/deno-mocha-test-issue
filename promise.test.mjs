import chai from "chai";
const assert = chai.assert;

before(function () {
  // hook console.log
  // https://stackoverflow.com/a/19846113/19868378
  console.stdlog = console.log.bind(console);
  console.logs = [];
  console.log = function () {
    console.logs.push(Array.from(arguments));
    console.stdlog.apply(console, arguments);
  };
})

// Ref https://betterprogramming.pub/10-javascript-promise-challenges-before-you-start-an-interview-c9af8d4144ec
describe('Promise questions', () => {
  beforeEach(function () {
    console.logs = []
  })

  describe("Promise basic #1", () => {
    it(" test ", async () => {
      function exec() {
        console.log("start");
        const promise = new Promise((resolve, reject) => {
          console.log(1);
        });
        console.log("end");

        return Promise.resolve();
      }

      await exec();
      assert.equal(console.logs.join(","), "start,1,end");
    });
  });

  describe("Promise basic #2", () => {
    it(' test ', function (done) {
      function exec() {
        const promise = new Promise((resolve, reject) => {
          console.log(1);
          setTimeout(() => {
            console.log("timerStart");
            resolve("success");
            console.log("timerEnd");
          }, 0);
          console.log(2);
        });

        promise.then((res) => {
          console.log(res);
          done()
          assert.equal(console.logs.join(','), '1,2,4,timerStart,timerEnd,success')
        });

        console.log(4);
      }
      exec();
    })

  });

  describe("Promise basic #3", () => {
    it(' test ', function (done) {
      function exec() {
        const timer1 = setTimeout(() => {
          console.log('timer1');

          const promise1 = Promise.resolve().then(() => {
            console.log('promise1')
          })
        }, 0)

        const timer2 = setTimeout(() => {
          console.log('timer2')
          done()
          assert.equal(console.logs.join(','), 'timer1,promise1,timer2')
        }, 0)
      }
      exec();
    })
  });

  describe("Promise basic #4", () => {
    it(' test ', function (done) {
      function exec() {
        console.log('start');

        const promise1 = Promise.resolve().then(() => {
          console.log('promise1');
          const timer2 = setTimeout(() => {
            console.log('timer2')
            done()
            assert.equal(console.logs.join(','), 'start,end,promise1,timer1,promise2,timer2')
          }, 0)
        });

        const timer1 = setTimeout(() => {
          console.log('timer1')
          const promise2 = Promise.resolve().then(() => {
            console.log('promise2')
          })
        }, 0)

        console.log('end');
      }
      exec();
    })
  });
})
