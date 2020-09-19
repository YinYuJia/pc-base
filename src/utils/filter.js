import Vue from 'vue'
import moment from 'moment'
import 'moment/locale/zh-cn'
// import { ElSelect } from 'node_modules/element-ui/types/select'
moment.locale('zh-cn')

Vue.filter('NumberFormat', function (value) {
  if (!value) {
    return '0'
  }
  const intPartFormat = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
  return intPartFormat
})

Vue.filter('dayjs', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

Vue.filter('moment', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

Vue.filter('AIEquipment', function (data) {
  if( data == 0) {
    return "正常"
  }else if( data > 0) {
    return "异常"
  }
    console.log(data)
})
Vue.filter('formatterTims', function (data) {
  function formatTime(number,format) {  
  
    var formateArr  = ['Y','M','D','h','m','s'];  
    var returnArr   = [];  
    
    var date = new Date(number * 1000);  
    returnArr.push(date.getFullYear());  
    returnArr.push(formatNumber(date.getMonth() + 1));  
    returnArr.push(formatNumber(date.getDate()));  
    
    returnArr.push(formatNumber(date.getHours()));  
    returnArr.push(formatNumber(date.getMinutes()));  
    returnArr.push(formatNumber(date.getSeconds()));  
    
    for (var i in returnArr)  
    {  
      format = format.replace(formateArr[i], returnArr[i]);  
    }  
    return format;  
  } 
  
  //数据转化  
  function formatNumber(n) {  
    n = n.toString()  
    return n[1] ? n : '0' + n  
  }
    return formatTime(data,'Y/M/D h:m:s')
})

Vue.filter('status', function (data) {
    if( data == "1") {
      return "正常"
    }else{
      return "异常"
    }
})
Vue.filter('statusFn', function (data) {
  if( data == "1") {
    return "正常"
  }else{
    return "异常"
  }
})
Vue.filter('dataformatter', function (data) {
   let  date = new Date(data)
  // var year=date.getFullYear(); 
  var month=date.getMonth()+1; 
  var day=date.getDate(); 
  var hour=date.getHours(); 
  var minute=date.getMinutes(); 
  var second=date.getSeconds(); 
 //  return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
  return  + (String(month).length > 1 ? month : '0' + month) + '-' + 
  (String(day).length > 1 ? day : '0' + day) + ' ' + (String(hour).length > 1 ? hour : '0' + hour) + ':' + (String(minute).length > 1 ? minute : '0' + minute)
   + ':' + (String(second).length > 1 ? second : '0' + second)
})
Vue.filter('safeTypeformatter', function (item) {
  if( item.isUnsafe != undefined ) {
    if( item.isUnsafe == 1 ) {
      if (item.safeType === '1') {
        return  '未戴安全帽'
      } else if (item.safeType === '2') {
        return  '未穿防护服'
      }
      }else{
        return  "检测正常"
      }
  }else{
    
    if( item.IsUnsafe == 1 ) {
      if (item.SafeType == '1') {
        console.log(222)
        return  '未戴安全帽'
      } else if (item.SafeType === '2') {
        console.log(111)
        return  '未穿防护服'
      }
      }else{
        console.log(333)
        return  "检测正常"
      }
  }

})


