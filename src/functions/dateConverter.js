
const dateToShort = (date) => {
    let year = date[0] + date[1] + date[2] + date[3];
    let month = date[5] + date[6];
    let day = date[8] + date[9];

    let dayShort;
    if (day[0] === '0'){
        dayShort = day[1];
    } else {
        dayShort = day;
    }

    let monthShort;
    if (month === '01'){
        monthShort = "Ene";
    } else if (month === '02'){
        monthShort = "Feb";
    } else if (month === '03'){
        monthShort = "Mar";
    } else if (month === '04'){
        monthShort = "Abr";
    } else if (month === '05'){
        monthShort = "May";
    } else if (month === '06'){
        monthShort = "Jun";
    } else if (month === '07'){
        monthShort = "Jul";
    } else if (month === '08'){
        monthShort = "Ago";
    } else if (month === '09'){
        monthShort = "Sep";
    } else if (month === '10'){
        monthShort = "Oct";
    } else if (month === '11'){
        monthShort = "Nov";
    } else if (month === '12'){
        monthShort = "Dic";
    }

    let convertedDate = `${dayShort} ${monthShort} ${year}`;
    return convertedDate;
};

const shortToDate = (short) => {
    let day;
    let month;
    let year;

    if (short.length === 10){
        year = short[6] + short[7] + short[8] + short[9];
        month = short[2] + short[3] + short[4];
        day = '0' + short[0];
    } else if (short.length === 11){
        year = short[7] + short[8] + short[9] + short[10];
        month = short[3] + short[4] + short[5];
        day = short[0] + short[1];
    }

    let monthDate;
    if (month === 'Ene'){
        monthDate = "01";
    } else if (month === 'Feb'){
        monthDate = "02";
    } else if (month === 'Mar'){
        monthDate = "03";
    } else if (month === 'Abr'){
        monthDate = "04";
    } else if (month === 'May'){
        monthDate = "05";
    } else if (month === 'Jun'){
        monthDate = "06";
    } else if (month === 'Jul'){
        monthDate = "07";
    } else if (month === 'Ago'){
        monthDate = "08";
    } else if (month === 'Sep'){
        monthDate = "09";
    } else if (month === 'Oct'){
        monthDate = "10";
    } else if (month === 'Nov'){
        monthDate = "11";
    } else if (month === 'Dic'){
        monthDate = "12";
    }

    let convertedDate = `${year}-${monthDate}-${day}`;
    return convertedDate;
};

const getDateNow = (date) => {
    let localDate;
    if (date){
        localDate = date;
    } else {
        let dateNow = new Date();
        localDate = dateNow.toLocaleString();
    }
    let day;
    let month;
    let year;

    if (localDate[1] === '/'){
        if (localDate[3] === '/'){
            day = '0' + localDate[0];
            month = '0' + localDate[2];
            year = localDate[4] + localDate[5] + localDate[6] + localDate[7];
        } else if (localDate[4] === '/'){
            day = '0' + localDate[0];
            month = localDate[2] + localDate[3];
            year = localDate[5] + localDate[6] + localDate[7] + localDate[8];
        }
    } else if (localDate[2] === '/'){
        if (localDate[4] === '/'){
            day = localDate[0] + localDate[1];
            month = '0' + localDate[3];
            year = localDate[5] + localDate[6] + localDate[7] + localDate[8];
        } else if (localDate[5] === '/'){
            day = localDate[0] + localDate[1];
            month = localDate[3] + localDate[4];
            year = localDate[6] + localDate[7] + localDate[8] + localDate[9];
        } 
    }
    
    let formatedDate = `${year}-${month}-${day}`;
    let shortDate = dateToShort(formatedDate);

    return shortDate;
};




export { dateToShort, getDateNow, shortToDate };