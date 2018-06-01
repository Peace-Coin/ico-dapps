module.exports = {

 //param 小数点数値、小数点位置, result:js計算誤差のない数値
 reCalculationMarginOfError: (number, decimalPoint) => {

   let roundNum = 1;

   for(var i = 0; i < decimalPoint; i++){

     roundNum = roundNum + 10;
   }

   number = Math.round(number * roundNum);
   number = number / roundNum;

   return number;
 },
 getDecimalPointLength: (number) => {
   var numbers = String(number).split('.'),
       result  = 0;

   if (numbers[1]) {
       result = numbers[1].length;
   }

   return result;
 },
 multiply: (value1, value2) => {

   console.log('value1 -> ' + value1)
   console.log('value2 -> ' + value2)

   var getDecimalPointLength = function(number) {
       var numbers = String(number).split('.'),
           result  = 0;

       if (numbers[1]) {
           result = numbers[1].length;
       }

       return result;
   };

   var intValue1 = +(value1 + '').replace('.', ''),
       intValue2 = +(value2 + '').replace('.', ''),
       decimalLength = getDecimalPointLength(value1) + getDecimalPointLength(value2),
       result;

   console.log('intValue1 -> ' + intValue1)
   console.log('intValue2 -> ' + intValue2)

   result = (intValue1 * intValue2) / Math.pow(10, decimalLength);

   console.log('result -> ' + result)

   return result;
 },
 multiplyWei: (value1, value2) => {

   console.log('value1 -> ' + value1)
   console.log('value2 -> ' + value2)

   var getDecimalPointLength = function(number) {
       var numbers = String(number).split('.'),
           result  = 0;

       if (numbers[1]) {
           result = numbers[1].length;
       }

       return result;
   };

   var intValue1 = +(value1 + '').replace('.', ''),
       intValue2 = +(value2 + '').replace('.', ''),
       decimalLength = getDecimalPointLength(value1) + 18,
       result;

   result = (intValue1 * intValue2) / Math.pow(10, decimalLength);

   console.log('result -> ' + result)

   return result;
 },
}
