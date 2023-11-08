function exec() {
  console.log('start');

  const promise1 = Promise.resolve().then(() => {
    console.log('promise1');
    const timer2 = setTimeout(() => {
      console.log('timer2')
      // assert.equal(console.logs.join(','), 'start,end,promise1,timer1,promise2,timer2')
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

exec()
