export const DateFormat = {
    toyyyyMMdd: (date)=>{
        return date.getFullYear()+'/'+date.getMonth()+'/'+date.getDate();
    },
    toddMMyyyy: (date)=>{
        return date.getDate()+'/'+date.getMonth()+'/'+ date.getFullYear();
    }
}