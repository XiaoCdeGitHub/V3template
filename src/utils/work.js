// 用周数转化成作业名称
export function  weekToBeWorkName(number){
    let workMap=new Map(
    [
    [1,'一'],
    [2,'二'],
    [3,'三'],
    [4,'四'],
    [5,'五'],
    ]
    )
    if(workMap.has(number)){
        return workMap.get(number)
    }
    return false
}