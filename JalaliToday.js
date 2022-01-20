function jalali() {

    var gYear = new Date().getFullYear()
    var daysOfYear = (gYear % 4 == 0 ? 366 : 365)
    var diff = new Date() - new Date(gYear, 0, 0)
    diff = Math.round(diff / 1000 / 60 / 60 / 24) - 79

    var dayOfMonth = 31
    var monthDiff = 0

    if (diff >= 186) {
        dayOfMonth = 30
        diff -= 186
        monthDiff = 6
    }
    
    var jDay = (diff % dayOfMonth ? diff % dayOfMonth : dayOfMonth)

    var jMonth = (jDay == dayOfMonth ? diff / dayOfMonth : Math.trunc(diff / dayOfMonth) + 1)
    jMonth += monthDiff
    
    var JYear = gYear - (daysOfYear == 365 ? 621 : 622)

    var result = JYear.toString() + '/' + (jMonth <10  ? ('0'+jMonth.toString()) :jMonth.toString() ) + '/' + jDay.toString()

    console.log( result)
    alert(result)
    
}