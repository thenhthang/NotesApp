export default function Note(id,title,label,body,created,color){
    this.id = id
    this.title = title
    this.label  = label
    this.body = body
    this.created = created
    this.color = color
}
Note.Schema = {
    name: 'Note',
    primaryKey:'id',
    properties: {
        id:  'int',
        title: 'string',
        label:'Label[]',
        body:'string',
        created: 'date',
        color:'string'
  }
}