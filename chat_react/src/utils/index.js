// 动态修改titile
export const changeTitle = (title = '摸鱼俱乐部') => {
    document.title = title;
}

// 获取所有数据的类型文本
export const getDataType = (data) => {
    return Object.prototype.toString.call(data);
}

// 将时间修改为可展示的时间文本
export const parseTime = (fmt, time) => {
    const type = getDataType(time);
    time = type.includes('Date') ? time : new Date(time);
    const fmsMapTime = {
        "M+": time.getMonth() + 1, // 月份
        "d+": time.getDate(), // 日
        "h+": time.getHours() % 12 === 0 ? 12 : time.getHours() % 12, // 小时
        "H+": time.getHours(),
        "m+": time.getMinutes(), // 分
        "s+": time.getSeconds(), // 秒
        "q+": Math.floor((time.getMonth() + 3) / 3), // 季度
        "S": time.getMilliseconds() // 毫秒
    }

    const fmsMapWeek = [
        "一",         
        "二",         
        "三",         
        "四",         
        "五",         
        "六",
        "日",         
    ]

    if(/(y+)/.test(fmt)){
        fmt = fmt.replace(RegExp.$1, (time.getFullYear()+"").substr(4 - RegExp.$1.length));         
    }
    if(/(E+)/.test(fmt)){
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "星期" : "周") : "") + fmsMapWeek[time.getDay() + ""]);         
    }
    for(var str in fmsMapTime){
        if(new RegExp("("+ str +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (fmsMapTime[str]) : (("00" + fmsMapTime[str]).substr(("" + fmsMapTime[str]).length)));         
        }
    }
    return fmt; 
}