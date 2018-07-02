module.exports = {

 conmaFormat: (number) => {

   try{

     if(number === undefined || number === null){

       return number;
     }

     var cammaStr = String(number).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');

     var numArray = cammaStr.split(".");
     var intStr = '';
     var fewStr = '';

     intStr = numArray[0];

     //console.log('intStr -> ' + intStr)
     //console.log('numArray.length -> ' + numArray.length)

     if(numArray.length === 2){

       fewStr = numArray[1];

       //fewStr.replace(/,/g, '');

       fewStr = fewStr.split(",").join("")

       fewStr = '.' + fewStr;
     }

     //console.log('fewStr -> ' + fewStr)

     var result = intStr + fewStr

     return result;

   }catch(err){

     console.log('err ->' + err);

     return number;
   }

   // console.log("number=" + number + " type=" + typeof number);
   //
   // var numArray = number.toString().split("");
   // var crateCammaNumStr = '';
   // var beforeDecimalPointFlg = true;
   //
   // numArray.reverse();
   //
   // for(var i = 0; i < numArray.length; i++) {
   //
   //   var addStr = numArray[i];
   //
   //   if(addStr === '.'){
   //
   //     beforeDecimalPointFlg = false;
   //   }
   //
   //   if( i != 0 && (i % 3) == 0 && beforeDecimalPointFlg){
   //
   //     addStr = addStr + ',';
   //   }
   //
   //   crateCammaNumStr = crateCammaNumStr + addStr;
   // }
   //
   // var resultArray = crateCammaNumStr.split("");
   // resultArray.reverse();
   // crateCammaNumStr = resultArray.join(',');
   //
   // return crateCammaNumStr;

  //  Number.prototype.split3 = function() {
  //   var r = '', s = this.toString();
  //   s.match(/(-?)([0-9]+)(\.[0-9]*)?/);
  //   var sp = [RegExp.$1, s = parseInt(RegExp.$2), RegExp.$3];
  //   while(s >= 1000) {
  //     r = ',' + (s%1000) + r;
  //     s = parseInt(s/1000);
  //   }
  //   return sp[0] + s + r + sp[2];
  // }
  //
  // return number.split3();

  // if (isNaN(number)) {
  //   return this;
  // }
  // return ("" + number).replace(
  //   /^([+-]?\d{1,3})((\d{3})+)((\.\d+)?)$/g,
  //   function(s, p1, p2, p3, p4) {
  //     return p1 + p2.replace(/(\d{3})/g, ",$1") + p4;
  //   }
  // );
 },

 floatFormat: ( number, n )  => {
      var _pow = Math.pow( 10 , n ) ;

      return Math.round( number * _pow ) / _pow ;
  },

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
