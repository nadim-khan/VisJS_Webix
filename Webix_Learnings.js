webix.ui({ 
  view:"tabview",
  
  cells:[
     
    {view:"toolbar", 
     header:"Video",
    css:"webix_dark",
  cols:[{
   
  view:"accordion",
  css:"webix_dark", 
  multi:true,
  cols:[
   		{ header:"Songs",
         body:{
          	view:"accordion",
          	multi:"mixed",
          	rows:[
          		{ header:"Play List", body:{
                  view:"tree",
                  id:"myTree",
                  data:treedata,
                  select:true,
                  on:{
                    onSelectChange:function(){
                      selected=$$("myTree").getSelectedId;
                      if(isNaN(selected)){
                        $$("myTree").refresh;
                        webix.alert("Selected ID doesnt exist : "+'\n'+selected);
                        console.log("Selected ID doesnt exist : "+'\n'+selected);
                      }else{
                        webix.alert("Selected ID  : "+'\n'+selected);
                        console.log("Selected ID : "+'\n'+selected);
                      }
                      
                    }
                  }
                } },
         		{ header:"Registration/Login", body:{
                  rows:[
                    {view:"button",id:"register",value:"Register",css:{"background":"LightBlue !important"},
                    on:{
                      "onItemClick":function(id, e, trg){
                         registerWindow();
                       }
                    }},
                    {view:"button",id:"login",value:"Login",css:{"background":"LightGreen !important"},
                     on:{
                       "onItemClick":function(id, e, trg){
                         loginWindow();
                       }
                    }},
                       ]
                } }
              ]
         } }, 
        { header:"Player", gravity:3,body:{
          rows:[
            { 
        view:"toolbar", css:"webix_dark", 
        margin:20, paddingX:10,
              css:".webix_el_box.webix_pressed",
		cols:[
			{ view:"button", label:"Prev", type:"prev", width:100, height:20 },
			{ view:"toggle", type:"conButton", name:"s4",  offIcon:"pause",  onIcon:"play", offLabel:"Pause", onLabel:"Play" 
},			
			{ view:"button", label:"Next" , type:"next",  width:100 ,align:"right"}
		]
	},
            {view:"carousel",
    		id:"carousel",
         	 navigation:{
    			type: "side",
    			items:true,    
				},
          	cols:[
            	{view:"video",
            	 src: [
      				"http://cdn.webix.com/demodata/movie.ogv",
     			 	"http://cdn.webix.com/demodata/movie.mp4"
    			],             
             scroll:true},            
    ]
            }
          ],
          
          
        } },
  
    {header:"User",body:{
      rows:[
        {header:"User List",body:{
          rows:[
            {view:"list",  			
  			template:"#name#",
  			select:true,
              tooltip:"<span class='webix_strong'> #id# . #name# </span> <br/><span class='webix_strong'> Email : </span> #email#<br/>",
          data:users},
            { view:"button", value:"Save" ,css:{"background":"LightGreen !important"}},
        { view:"button", value:"Refresh" ,css:{"background":"LightBlue !important"}},
		{ view:"button", value:"Delete",css:{"background":"red !important"}},
          ]
                    
        }},         
        {
          header:"Comments",body:{
          view:"comments",
            currentUser:3,
            data:[
        	{
          		id:1, user_id:1, date:"2018-06-10 18:45",
          		text:"Let's deal with half of the points in the plan without further delays."
        	},
        	{ 	
              id:2, user_id:2, date:"2018-06-10 19:40", 
              text:"Yes, let's do it." 
            },
          { 	
              id:3, user_id:3, date:"2018-06-10 19:40", 
              text:"Great!!." 
            }
              
    	],   
        }}
      ]
      
    }}
    
  ]
}]},
    {header:"Music", view: "htmlform"},
    {header:"Feedback", view: "form",
    id:"feedback_Form", 
     
    
    elements:[
      
        { view:"text", label:"Name", name:"name",},
        {  view: "richtext",
         name:"ff",
    		id: "feedbackRich",
          on:{
       onChange:function(){
         webix.alert("Thanks for your feedback !!");
       }
     },
    		label: "Feedback",
    			labelPosition: "top",
   				 value: "Please give your feedback",},
        {cols:[
            { view:"button", value:"Submit", type:"form" },
            { view:"button", value:"Cancel"         
            }
        ]}
    ],
     rules:{
    "name":webix.rules.isNotEmpty,
    "ff":webix.rules.isNotEmpty
    
  },elementsConfig:{
    labelWidth:90
  },
    }
  ]
});



function registerWindow(){  
  webix.ui({
    view:"window",
    move:true,
    position:"center", 
    head : {
			template : "<span>Register </span><span class=' closeWin'>&times;</span>",
			onClick:{
				"closeWin":function(){
					$$("registerWindow").close();
				}  
			},
			height : 30,
		},
  	modal:true,  
    id:"registerWindow",
    
    width: 600,
    height: 250,
    body:{
      view:"form", 
    id:"reg_form",
    width:300,
      height:700,
      scroll:true,
    elements:[
      	{ view:"text", label:"Name", name:"Username"},
        { view:"text", label:"Email", name:"email"},
        { view:"text", type:"password", label:"Password", name:"password"},
      	{ view:"checkbox", labelRight:'I accept terms of use', name:"accept"},
        { margin:5, cols:[
            { view:"button", value:"Register" , type:"form",on:{
            onItemClick:function(){              
              $$("reg_form").bind($$("list"));
              $$("reg_form").save();
            }
            }
            },
            { view:"button", value:"Cancel",click:function(){
              $$("reg_form").clear();
              $$("registerWindow").hide();
            }}
        ]}
    ],elementsConfig:{
    labelAlign:"right",
    on:{
        'onChange':function(newv, oldv){
            this.validate();
        }
    }
}, rules:{
        Username: webix.rules.isNotEmpty,
        email: webix.rules.isEmail,
        password: webix.rules.isNumber,
        accept: webix.rules.isChecked
    }
    },
    
  }).show();
}


function loginWindow(){
  webix.ui({
    view:"window",
    id:"loginWindow",
    position:"center", 
    head:"Drag me",
  	modal:true, 
    head : {
			template : "<span>Login </span><span class='closeWin'>&times;</span>",
			onClick:{
				"closeWin":function(){
					$$("loginWindow").close();
				}  
			},
			height : 30,
		},
    width: 600,
    height: 200,
    body:{
      view:"form", 
    id:"log_form",
    width:300,
    elements:[
        { view:"text", label:"Email",required:true, name:"email",validate:webix.rules.isEmail},
        { view:"text", type:"password", label:"Password", name:"password",required:true},
        { margin:5, cols:[
            { view:"button", value:"Login" , type:"form"},
            { view:"button", value:"Cancel",
            click:function(){
              $$("log_form").clear();
              $$("loginWindow").hide();
            }
            }
        ]}
      ],elementsConfig:{
    labelAlign:"right",
    on:{
        'onChange':function(newv, oldv){
            this.validate();
        }
    }
}, rules:{
        login: webix.rules.isNotEmpty,
        email: webix.rules.isEmail,
        password: webix.rules.isNumber,
        accept: webix.rules.isChecked
    }
    }
    
  }).show();
}

function validateIt(){
  
}
