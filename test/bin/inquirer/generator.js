function* g(){
    console.log('read')
    let a=yield
    console.log(a)
    let b=yield
    console.log(b)
}
const f=g();
f.next()
f.next('one')
f.next('two')