const inquirer=require('inquirer')

inquirer
    .prompt([
        {
            type:'input',
            name:'yourName',
            message:'your name:',
            default:'noname',
            // 验证
            validate:function (v){
                return typeof v==='string';
            },
            // 转换器
            transformer:function (v){
                return v+'(请输入你的名字)'
            },
            // 过滤
            filter:function (v){
                return 'name['+v+']'
            }
        },{
            type:'number',
            name:'num',
            message:'your number:'

        },{
            type:'editor',
            name:'editor',
            message:'编辑或打开文本编辑器编辑:'

        },{
            type:'password',
            name:'password',
            message:'你的密码:'
        },{
        //     type:'expand',
        //     name:'choice',
        //     message:'your choice:',
        //     default:'red',
        //     choices:[
        //         {key:"R",value:'red'},
        //         {key:"G",value:'green'},
        //         {key:"B",value:'blue'}
        //     ]
        // },{
            type:'checkbox',
            name:'choice',
            message:'your choice:',
            default:0,
            choices:[
                {key:"R",value:'red'},
                {key:"G",value:'green'},
                {key:"B",value:'blue'}
            ]
        }
    ])
    .then((answers) => {
        // Use user feedback for... whatever!!
        console.log(answers)
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else went wrong
        }
    });