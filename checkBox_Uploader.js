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
