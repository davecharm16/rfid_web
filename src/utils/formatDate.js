export const formatDate = (g_date) =>{
    let dateTimeArray = g_date.split("T");
    let date = dateTimeArray[0].split("-");
    let newDate = "";
    
    for(let i = 0; i < date.length; i++){
        console.log(date[i])
        let temp  = ""
        if(date[i].length <= 1){
           temp = "0" + date[i]
        }
        else{
           temp = date[i] 
        }
        
        if(i !== date.length - 1){
            newDate += temp + "-"
        }else{
            newDate += temp
        }
    }

    return newDate + "T" + dateTimeArray[1];
}