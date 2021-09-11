let newLogger = new LoggerDetector();

var inputLogs:string[] = [
    "80.238.9.179,1000000,FAILURE,badUsername",
    "80.238.9.179,1010000,FAILURE,uglyUsername",
    "80.238.9.179,1020000,FAILURE,testUsername",
    "192.168.0.1,1020000,FAILURE,localhost",
    "80.238.9.179,1025000,SUCCESS,goodUsername",
    "80.238.9.179,1030000,FAILURE,goodUsername",
    "80.238.9.179,1040000,FAILURE,superUsername",
    "80.238.9.179,2000000,FAILURE,badUsername"
];

let index = 0;
inputLogs.forEach(log => {
    index++;
    console.log("starting: " + index)

    var result = newLogger.parseLine(log);
    console.log("result: " + result);
});