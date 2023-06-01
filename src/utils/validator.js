export const validateNumber = (num) => {
    // if (typeof num !== 'number'){
    //     return 0
    // }
    if(num === ''){
        return ''
    }
    num = parseFloat(num);
        
        console.log(error);


    if (num <= 0) {
        return 0
    }
    else{
        return num
    }
}