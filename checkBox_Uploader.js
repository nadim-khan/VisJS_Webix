var valCheck,fName,formVals;
webix.ui({
  type:"space", margin:30, cols:[
    {
      rows:[{view:"template",template:"My Form data ",css:"header",height:40},
        { 
          view:"form", scroll:false,id :"imgForm",autoHeight:true, width:750, elements: [
            {view :"text",id:"name",label:"Name : "},
            {view:"label",label:"Decription of the issue : "},
            {view :"richtext",width:10,id:"desc",label:"Description",labelPosition:"top",},
            {view:"form",borderless:true,cols:[
              {view:"checkbox", id:"moreImage", labelRight:"Upload related images", labelWidth:"auto",value:0,             
             on:{
               onChange:function(){
                 valCheck=this.getValue();
                console.log("Current CheckBox Value : "+valCheck);
                if(valCheck==1){
                  $$("imgForm").disable();                 
                  uploadMoreImages();
                  
                }
              }
            }
            },{view:"template",id:"uploadTemp",borderless:true,template:" ",
              }              
            ]},
            {view :"button",id:"button",label:"Submit",on:{
              "onItemClick":function(){
                formVals=this.getValue();
               	//console.log(formVals.elements);
                console.log("Form Data : "+formVals);
                 $$("imgForm").disable();  
                webix.alert("File has been uploaded successfully !!");
                $$("button").disable();
                $$("imgForm").refresh();
                $$("imgForm").enable(); 
              }
            }
             
            }
          ],           
        }
      ]
    }
  ]
});

function uploadMoreImages(){
 webix.ui({
   view:"window",
    id:"imgWindow",
    head : {
			template : "<span'>Add more images</span><span class='closeWin'>&times;</span>",
			onClick:{
				"closeWin":function(){
					$$("imgWindow").close();
                  $$("imgForm").enable();                 
                  $$("moreImage").toggle();
                  $$("moreImage").enable();
                  
				}  
			},
			height : 30,
		},
    width: 500,
   	move:true,
   position:"center",
    autoheight:true, 
    body:{
        view:"form", 
    rows:[
        {
            view:"uploader",
            id: "uploader",
            value:"Upload file",
            link:"mylist",        
            upload:"//docs.webix.com/samples/server/upload",
            datatype:"json",
          	on:{
        onBeforeFileAdd:function(file){
            webix.message("File \" "+file.name+" \" has been added ");
          console.log("File \" "+file.name+" \" has been added ");
        },
        onFileUpload:function(file){
          
          if(file.percent==100){
         webix.message("File \" "+file.name+" \" has been Uploaded Successfully ");  
          console.log("File \" "+file.name+" \" has been Uploaded Successfully ");
          }else{
            webix.message("File \" "+file.name+" \" will take a while to upload ");
          }
          $$("imgWindow").hide();
          $$("imgForm").enable();
          $$("moreImage").disable();         
          $$("uploadTemp").enable();
          $$("uploadTemp").setValues(file.name+"<p style='font-size:10px;'> &#9989; </p>");
         
        }
    }          
        }, 
        {
            view:"list", 
            id:"mylist", 
          scroll:true,
            type:"uploader",
            autoheight:true, 
            borderless:true 
        }
    ]
    }
   
 }).show();  
}










*****************************
	
	css





<style>
  
		
			.overall{ height:100%; line-height: 26px;}
			.name{ height:100%; float:left; overflow: hidden;}
			.size{	padding: 0 10px; width: 100px; text-align: right; float: right;}
			.remove_file{ float:right; width:15px; padding-left: 10px;}
			.status{
				float: right;
				position: relative;
				margin-top: 4px;
				width: 80px;
				height: 16px;
				line-height: 16px;
				border: 1px solid #A4BED4;
				border-radius: 2px; -moz-border-radius: 2px; -webkit-border-radius: 2px;
			}
			.progress{ height: 100%; position: absolute; background-color: #b8e6ff;}
			.message{ z-index: 1; width:100%; text-align:center; position: absolute;}
			.message.error{ color: #e83b3b;}
  			.header{ padding: 10px;  text-align: center;  background: black;  color: white;  font-size: 25px;}
  
  .closeWin{
  	float:right;
  	position:relative;
    width:50px;
    height:50px;
    background:#d0d0d0;
    background-color: #1CA1C1;
    color: white;
    
    cursor: pointer;
  }
  .closewin::After{
  content: 'X';
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%,-50%) scaleX(1.2);
  transform: translate(-50%,-50%) scaleX(1.2);
  }
 
</style>
          
