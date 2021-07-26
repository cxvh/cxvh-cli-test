const EventEmitter=require('events')
const readline=require('readline')
const MuteStream=require('mute-stream')
const {fromEvent}=require('rxjs')
const ansiEscapes=require('./ansi-escapes');

const option={
    type:'list',
    name:'name',
    message:'select your name',
    choices:[{
        name:'Baran',
        value:'isMe'
    },{
        name:'张三',
        value:'他塔'
    },{
        name:'李四',
        value:'他他'
    }]
}

function Prompt(option){
    return new Promise((resolve, reject)=>{
        try {
            const list=new List(option)
            list.render()
            list.on('exit',function (answers){
                resolve(answers)
            })
        }catch (e){
            reject(e)
        }
    })
}

// EventEmitter.call(this)
class List extends EventEmitter{
    constructor(option) {
        super();
        this.message=option.message
        this.choices=option.choices
        this.input=process.stdin
        const ms=new MuteStream();
        ms.pipe(process.stdout)
        this.output=ms //process.stdout
        this.rl=readline.createInterface({
            input:this.input,
            output:this.output
        })
        this.selected=0;
        this.height=-10;
        this.keypress=fromEvent(this.rl.input,'keypress')
            .forEach(this.onkeypress)
        this.haveSelected=false; // 是否已经选择完毕
    }
    onkeypress=(keymap)=>{
        // console.log(keymap)
        const key=keymap[1];
        switch (key.name){
            case 'down':
                this.selected++;
                if(this.selected>this.choices.length-1){
                    this.selected=0
                }
                this.render()
                break;
            case 'up':
                this.selected--;
                if(this.selected<0){
                    this.selected=this.choices.length-1
                }
                this.render()
                break;
            default:
                this.haveSelected=true;
                this.render()
                this.close()
                this.emit('exit',this.choices[this.selected])
        }
    }
    render(){
        this.output.unmute(); //
        this.clean()
        this.output.write(this.getContent())
        this.output.mute();
    }
    getContent=()=>{
        if(!this.haveSelected){
            // let title=this.message+'(Use arrow keys)\n'
            let title = '\x1B[32m?\x1B[39m \x1B[1m' + this.message + '\x1B[22m\x1B[0m \x1B[0m\x1B[2m(Use arrow keys)\x1B[22m\n';
            this.choices.forEach((choice,index)=>{
                // 判断是否为最后一个元素，如果是，则不加 \n
                if(index===this.selected){
                    if(index===this.choices.length-1){
                        // title+='>  '+choice.name
                        title+='\x1B[36m>  '+choice.name+'\x1B[39m '
                    }else{
                        // title+='> '+choice.name+'\n'
                        title+='\x1B[36m> '+choice.name+'\x1B[39m \n'
                    }
                }else{
                    if(index===this.choices.length-1){
                        title+='  '+choice.name
                    }else{
                        title+='  '+choice.name+'\n'
                    }
                }
            })
            this.height=this.choices.length+1;
            return title;
        }else{
            // 输入结束后的逻辑
            const name = this.choices[this.selected].name;
            let title = '\x1B[32m?\x1B[39m \x1B[1m' + this.message + '\x1B[22m\x1B[0m \x1B[36m' + name + '\x1B[39m\x1B[0m \n';
            return title;
        }
    }
    clean(){
        const emptyLines=ansiEscapes.eraseLines(this.height)
        this.output.write(emptyLines)
    }
    close(){
        this.output.unmute()
        this.rl.output.end()
        this.rl.pause()
        this.rl.close()
    }

}

Prompt(option)
    .then(answers=>{
        console.log(answers)
    })
    .catch(error=>console.log({error}))