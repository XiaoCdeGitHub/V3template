/* eslint-disable */
import { loadFile } from '../../utils/brower'
export default class arrayToExcel{
    constructor(options){
        this.title=options.title
        this.column=options.column || []
        this.filename=options.filename || 'excel文件'
        this.root=this.createVNode('table')
        this.html=''
        this.initTitle()
        this.createAllColumn()
        this.injectHtml()
    }
    createVNode(tag,attr){
      let node = document.createElement(tag)
        return node
    }
    appendHtml(str){
        this.html+=str
    }
    initTitle(){
        this.appendHtml(this.createColumn(this.title))
    }
    createColumn(InfoObject,isTitle=false){
    let tag='td'
    let array=[]
    if(isTitle){
        tag='th'
        array=InfoObject
    }else{
        array=Object.values(InfoObject)
    }
    let domString='<tr>'
        array.forEach(item=>{
            domString+= `<${tag}>${item}</${tag}>`
        })
    domString+='</tr>'
    return domString
    }
    createAllColumn(){
        this.column.forEach(item=>{
            this.appendHtml(this.createColumn(item))
        })
    }
    injectHtml(){
        this.root.innerHTML=this.html
    }
    getAllHtml(){
        return `<html><head><meta charset='UTF-8'></head><body>${this.root.outerHTML}</body></html>`
    }
    getURL(){
         let blob = new Blob([this.getAllHtml()],{type:"application/vnd.ms-excel"});
        return URL.createObjectURL(blob)
    }
    download(name){
        loadFile(this.getURL(),this.filename)
    }
}
