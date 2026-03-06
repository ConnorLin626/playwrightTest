
class TCInfo{
    /**
     * 
     * @param {Array} tcFile 
     * @param {number} timecost 
     * @param {Array} tcConfigFiles 
     * @param {Array} tcUsers 
     */
    constructor(tcFile,timecost,tcConfigFiles,tcUsers){
        this.tcFile=tcFile;
        this.timecost=timecost;
        this.tcConfigFiles=tcConfigFiles;
        this.tcUsers=tcUsers;
        this.runStartTime=0;
        this.runEndTime=0;
    }
}

module.exports=TCInfo