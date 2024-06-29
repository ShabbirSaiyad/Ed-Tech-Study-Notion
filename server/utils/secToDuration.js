// Helper function to convert total seconds to the duration format
function convertSecondsToDuration(totalseconds){
    const hours = Math.floor(totalseconds/3600);
    const minutes = Math.floor(totalseconds % 3600 / 60);
    const seconds = Math.floor(totalseconds/3600 % 60);
   
    if (hours > 0) {
        return `${hours}h ${minutes}m`
      } else if (minutes > 0) {
        return `${minutes}m ${seconds}s`
      } else {
        return `${seconds}s`
      }
}

module.exports = {
    convertSecondsToDuration,
  }