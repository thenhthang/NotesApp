export default function Label(name){
    this.name = name
}
Label.Schema = {
    name:'Label',
    properties: {
        name: 'string'
    }
}