import DBService from '../../storage/services'

export function deleteAll(){
    DBService.deleteAll('Label')
}
export function fetchLabel(){
      let labels = DBService.objects('Label')
      console.log('JSON: ',JSON.stringify(labels))
      let c = labels.map((item)=>{
                    return item.name
                })
       return c
}
export function addlabel(label){
    try {
        console.log('INSERT : ',label)
        DBService.insertOne('Label',label)
    } catch (error) {
        console.log('Loi truy van: ',error.message)
    }
}