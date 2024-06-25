function fastFunction () {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      console.log('Fast function done')
      resolve("Dato100fast")
    }, 100)
  })
}

function slowFunction () {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      console.log('Slow function done')
      resolve("Dato300slow")
    }, 300);
	//throw new Error("slow error");
  })
}

function asyncRunner () {
    return Promise.all([slowFunction(), fastFunction()])
}

asyncRunner()
  .then(([ slowResult, fastResult ]) => {
    console.log('All operations resolved successfully')
    console.log('slow: ' + slowResult)
    console.log('fast: ' + fastResult)
  })
  .catch((error) => {
    console.error('There has been an error:', error)
  })
