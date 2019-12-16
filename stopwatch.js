const Stopwatch = require("node-stopwatch").Stopwatch;

const stopwatch = Stopwatch.create();
stopwatch.start();

/*
my long task here
*/

console.log("ticks: " + stopwatch.elapsedTicks);
console.log("milliseconds: " + stopwatch.elapsedMilliseconds);
console.log("seconds: " + stopwatch.elapsed.seconds);
console.log("minutes: " + stopwatch.elapsed.minutes);
console.log("hours: " + stopwatch.elapsed.hours);

//stop it now
stopwatch.stop();