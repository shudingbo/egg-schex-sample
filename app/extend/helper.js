'use strict';

/* eslint-disable no-bitwise */
module.exports = {

  getNanoSecTime() {
    const hrTime = process.hrtime();
    return hrTime[0] * 1000000000 + hrTime[1];
  },
  getMicroSecTime() {
    const hrTime = process.hrtime();
    return (hrTime[0] * 1000000000 + hrTime[1]) / 1000;
  },

  /**
   * 字符串首字母大写
   * @param {String} str 字符串
   * @return {String} 格式化后字符串
   */
  ucfirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },


  /**
   * 格式化日期字符串
   * @param {Date} dateObj Date 对象 或者 时间戳
   * @param {String} fmt 格式化字符串 'yyyy-MM-dd'
   */
  dateFormat(dateObj = new Date(), fmt = 'yyyy-MM-dd hh:mm:ss') {
    if ((dateObj instanceof Date) === false) {
      dateObj = new Date(dateObj);
    }

    const o = {
      'M+': dateObj.getMonth() + 1, // 月份
      'd+': dateObj.getDate(), // 日
      'h+': dateObj.getHours(), // 小时
      'm+': dateObj.getMinutes(), // 分
      's+': dateObj.getSeconds(), // 秒
      'q+': Math.floor((dateObj.getMonth() + 3) / 3), // 季度
      S: dateObj.getMilliseconds(), // 毫秒
    };

    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (dateObj.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
    }
    return fmt;
  },

  rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
};
