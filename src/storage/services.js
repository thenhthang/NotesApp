import Note from '../model/note';
import Label from '../model/label';
import {dbname} from './db.config';
import Realm from 'realm';
//Mở kết nối
const schemaOptions = {
  path: dbname, //Tên file db, tương tự tên database trong sql
  schema: [Note.Schema, Label.Schema], //Tên object và các trường dữ liệu, tương tự tên các table trong sql
  schemaVersion: 2 //Phiên bản, mỗi khi thêm , xoá các thuốc tính là lên version mới
}
let repository = new Realm(schemaOptions);
//Đóng kết nối ở đâu, tôi vẫn chưa biết, nếu bạn có ý tưởng nào hay nói cho tôi nhé!
function getRealm(){
  if(repository ==  null){
    repository = new Realm(schemaOptions);
  }else{
    return repository
  }
}
let DBService = {
  insertOne: function(schemaName,item){
      repository.write(()=>{
        repository.create(schemaName,item)
      })
  },
  nextid: function(schemaName){
      let maxid = repository.objects(schemaName).max("id")
      let nextid = maxid != null ? maxid + 1: 1
      return nextid
  },
  maxkey: function(schemaName,keyName){
    let maxkey = repository.objects(schemaName).sorted(keyName,true)[0]
    if(maxkey){
      return maxkey[keyName]
    }
    return 0
  },
  objects: function (schemaName){
    return repository.objects(schemaName);
  },
  upsert: function (schemaName,item) {
    if (repository.objects(schemaName).filtered(`id = ${item.id}`).length)
    {
      repository.write(() => {
        repository.create(schemaName,item,"modified");
      });
    }
    else
    {
      repository.write(() => {
        repository.create(schemaName,item);
      });
    }
  },
  update: function (schemaName,item) {
    let newitem = repository.write(() => {
      repository.create(schemaName,item,'modified')
    });
    return newitem
  },
  delete: function(schemaName,item){
    repository.write(()=>{
      //let obj = repository.objects(schemaName).filtered(`id = ${item.id}`)
      let obj = repository.objectForPrimaryKey(schemaName,item.id)
      repository.delete(obj)
    })
  },
  deleteAll: function(schemaName){
    repository.write(()=>{
      let obj = repository.objects(schemaName)
      repository.delete(obj)
    })
  }
};
//let date = new Date()
//DBService.insertOne("Note",{id:6,title:'Hello',label:[{name:"C#"},{name:"Java"}],body:"Chiều 2/4, anh Nguyễn Văn Hoàng",created:date,color: "white"})
//DBService.insertOne("Note",new Note(1,"Hơn 200 người cách ly ở Sài Gòn được về nhà",[{name:"Đọc báo"},{name:"Java"}],"Chiều 2/4, anh Nguyễn Văn Hoàng (31 tuổi, quê Đà Nẵng) cho biết đang được cách ly cùng hơn 204 người tại trụ sở thuộc Sư đoàn 317 (huyện Hóc Môn). Họ thuộc nhóm đầu tiên từ nước ngoài nhập cảnh Việt Nam hôm 18/3, được đưa vào đây theo dõi sức khoẻ do từ vùng dịch về. Theo quy định, đến ngày 1/4 họ được ra khỏi đây nhưng quá một ngày vẫn chưa được giải quyết.",date,"white"))
//DBService.delete("Note",new Note(1000,"Quoc Tran Ngoc",[{name:"C#"},{name:"Java"}],"body",date,"white"))
//DBService.insertOne("Label",new Label("Tình cảm"))
//DBService.insertOne("Label",new Label("Java"))
//DBService.insertOne("Label",new Label("Foxpro"))
//DBService.insertOne("Label",new Label("Kotlin"))
//DBService.insertOne("Label",new Label("Flutter"))
//DBService.insertOne("Label",new Label("React native"))
//DBService.insertOne("Label",new Label("Tâm sự"))
//DBService.insertOne("Label",new Label("SQL"))
export default DBService;
