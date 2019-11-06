export default {
  testPhone(phone){
    if(!(/^1[3456789]\d{9}$/.test(phone))){ 
      // alert("手机号码有误，请重填");  
      return true; 
    } 
  },
  testPassword(value){//8-16位，必须包含字母和数字
    if(!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(value))){
      return true
    }
  },
  getToken(){
    if(localStorage.getItem('info')){
      let info = JSON.parse(localStorage.getItem("info"))
      return info.token
    }
  },
  getTimestamp(){
    return new Date().getTime()
  },
  computeTime(year,month){
    if(year!=-1 && month!=-1){
      return [
        new Date(year,month - 1).getTime() / 1000,
        new Date(year,month).getTime() / 1000,
      ]
    }else if(year!=-1 && month==-1){
      return [
        new Date(year,0).getTime() / 1000,
        new Date(year,12,0).getTime() / 1000,
      ]
    }
    else if(year==-1){
      return [
        '',''
      ]
    }
    
  },
  getYearList(){
    let thisYear,
        yearList = [];
    thisYear = new Date().getFullYear()
    // console.log(thisYear) 2019
    ++thisYear
    for(let i=10;i>0;i--){
      thisYear --
      yearList.push(thisYear)
    }
    return yearList
  },
  formatTime(number,format){
    var formateArr  = ['Y','M','D','h','m','s']
    var returnArr   = []
    var date = new Date(number * 1000)
    returnArr.push(date.getFullYear())
    returnArr.push(formatNumber(date.getMonth() + 1))
    returnArr.push(formatNumber(date.getDate()))
    returnArr.push(formatNumber(date.getHours()))
    returnArr.push(formatNumber(date.getMinutes()))
    returnArr.push(formatNumber(date.getSeconds()))
    for (var i in returnArr)  
    {  
      format = format.replace(formateArr[i], returnArr[i])
    }  
    return format
  },
   /* *
    *  计算生肖
    *
    *      支持简写生日，比如01，转换为2001，89转换为1989；
    *      支持任何可以进行时间转换的格式，比如'1989/01/01','1989 01'等
    *
    * */
  getShengXiao(birth){
    birth += '';
    var len = birth.length;
    if (len < 4 && len != 2) {
        return false;
    }
    if (len == 2) {
        birth - 0 > 30 ? birth = '19' + birth : birth = '20' + birth;
    }
    var year = (new Date(birth)).getFullYear();
    var arr = ['猴', '鸡', '狗', '猪', '鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊'];
    return /^\d{4}$/.test(year) ? arr[year % 12] : false;
  },
  /* *
  *  计算星座
  *
  *      支持传递[月日]，[月,日]，[年月日]等格式
  *
  * */
  getAstro(){
    var params = {};
      var c = function (d) {
          return parseInt(d, 10);
      }
      switch (arguments.length) {
        case 1:
            var s = arguments[0] + '', b = s.length;
            if (b < 3 || b > 8) {
                return false;
            }
            if (b == 3) {
                params['mouth'] = c(s.slice(0, 1));
            } else if (b == 4) {
                params['mouth'] = c(s.slice(0, 2));
            } else if (b == 6) {
                params['mouth'] = c(s.slice(2, 4));
            } else if (b == 8) {
                params['mouth'] = c(s.slice(4, 6));
            }
            params['day'] = c(s.slice(-2));
            break;
        case 2:
            params['month'] = c(arguments[0]);
            params['day'] = c(arguments[1]);
            break;
        default :
            return false;
            break;
    }
    return "魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯".substr(params['month'] * 2 - (params['day'] < [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22][params['month'] - 1] ? 2 : 0), 2);
  }
}
function formatNumber(n){
  n = n.toString()
  return n[1] ? n : '0' + n
}
// //例子：计算生肖
// console.log(Calculator.shengxiao(1989));
// console.log(Calculator.shengxiao('1989 01'));
// console.log(Calculator.shengxiao('1989-01'));
// console.log(Calculator.shengxiao('1989-01-01'));

// //例子：计算星座
// console.log(Calculator.astro('102'));       //01-02
// console.log(Calculator.astro('0102'));      //01-02
// console.log(Calculator.astro('1023'));      //10-22
// console.log(Calculator.astro('890102'));    //01-01
// console.log(Calculator.astro('19890102'));  //01-01
// 后两个可用
// console.log(Calculator.astro(1, 2));        //01-02
// console.log(Calculator.astro(01, 22));      //01-22