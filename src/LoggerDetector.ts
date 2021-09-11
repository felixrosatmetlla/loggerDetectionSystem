export interface LoggerDetectorInterface {
    loggingsInformation: { [ip: string]: LogInformation };
    parseLine(logLine: string): string; 
}

export class LoggerDetector implements LoggerDetectorInterface 
{
    loggingsInformation: { [ip: string]: LogInformation; } = {};

    parseLine(logLine: string): string {
        let splittedLog = logLine.split(',');
        var detectedIp = splittedLog[0];
        var logDateInEpoch = splittedLog[1];
        var action = splittedLog[2];
        var user = splittedLog[3];

        var logDate = new Date(0);
        logDate.setUTCMilliseconds(Number.parseInt(logDateInEpoch));
        
        if (action == "SUCCESS") {
            return null;
        }

        if (this.loggingsInformation[detectedIp] == undefined) {
            let newIpRegisterInfo: LogInformation = {
                loggedCount: 1,
                firstTimeLogged: logDate
            }

            this.loggingsInformation[detectedIp] = newIpRegisterInfo;
        } else {
            this.loggingsInformation[detectedIp].loggedCount = this.loggingsInformation[detectedIp].loggedCount + 1;
        }

        if(Math.abs(this.loggingsInformation[detectedIp].firstTimeLogged.getMinutes() - logDate.getMinutes()) > 5)
        {
            let newIpRegisterInfo: LogInformation = {
                loggedCount: 1,
                firstTimeLogged: logDate
            }

            this.loggingsInformation[detectedIp] = newIpRegisterInfo;
        }

        if (this.loggingsInformation[detectedIp].loggedCount >= 5)
        {
            return detectedIp;
        }

        return null;
    }

}

interface LogInformation {
    loggedCount: number;

    firstTimeLogged: Date;
}
