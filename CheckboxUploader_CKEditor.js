webix.ui({
  view:"form",
  id:"issueForm",
  elements:[
    {
      view:"label",
      label:"Issue to report :- "
    },
    {
      type:"space",
      rows:[
    	{
            view:"ckeditor",
      		id:'editor',
          	value:"Describe the issue ......",
          	maxHeight:250,
      		toolbar:[
        		{ name: 'document', items: [ 'Source', '-', 'NewPage', 'Preview', '-', 'Templates' ] },
        		{ name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord' ] },
        		'/',
        		{ items: [ 'Undo', 'Redo', '-', 'Bold', 'Italic'] }
      		]
    	}
  	]
    },{type:"space",
       id:"checkboxView",
       autoHeight:true,       
       minHeight:50,
       cols:[
      	{
          view:"checkbox",
          id:"moreImage",
          labelRight:"Upload related images",
          labelWidth:"auto",
          value:0,             
             on:{
               onChange:function(){
                valCheck=this.getValue();
                console.log("Current CheckBox Value : "+valCheck);
                if(valCheck==1){                   
                  uploadImages(); 
                    $$("issueForm").disable();
                }else{  
                  imgVal="";
                  imgval=toString("imgVal");
                }
              }
            }
     },{
       view:"label",
       id:"imgLabel",
       label:"Uploading the Files : ",
       hidden:true
     },{
       view:"button",
       maxHeight:30,
       type:"form",
       id:"addFiles",
       hidden:true,
       value:"Add Files",
       click:function(){
         uploadImages();
       }
     },{
       view:"list",
       id:"mylist",
       scroll:true,
       hidden:true,
       maxHeight:300,
       minHeight:100,
       type:"uploader",       
       borderless:true,
       on:{
         "onItemRender":function(){
           $$("addFiles").show();
           $$("done").show();
         }
       }
     },{
       view:"button",
       id:"done",
       maxHeight:30,
       type:"form",
       hidden:true,
       value:"Done",
       on:{
         "onItemClick":function(){
           $$("submit").enable();
           $$("imgLabel").show();
           $$("addFiles").hide();
           $$("moreImage").hide();
            $$("done").hide();
         }
       }
     }
    ]},
    
    {
      view:"toolbar",
      id:"toolbar",
      borderless:true,
       cols:[
        {
          view:"button",
          id:"submit",
          label:"Submit",
          type:"form",
          on:{
            "onItemClick":function(){
              formVals=this.getValue();
              console.log("Form Data : "+formVals);
              show_progress_bar(2000);
              console.log("Data has been submitted");
            }
          }
        },
        {
          view:"button",
          label:"Cancel",
          type:"form",
          on:{
            "onItemClick":function(){
              show_progress_icon(1000);
            }
          }
        }
       ]
    }
  ]
});

webix.extend($$("issueForm"), webix.ProgressBar);

function show_progress_bar(delay){
  $$("issueForm").disable();
  $$("issueForm").showProgress({
    type:"top",
    delay:delay,
    hide:true
  });
  setTimeout(function(){
  //  $$("imgForm").parse(records[1]);
    
    setTimeout(function() {webix.alert("File has been uploaded successfully !!");},10);    
    $$("issueForm").enable();
    $$("mylist").hide();
    $$("moreImage").setValue(0);
    $$("imgLabel").hide();
    $$("moreImage").show();
  }, delay);
};


function show_progress_icon(delay){
  $$("issueForm").disable();
  $$("issueForm").showProgress({
    type:"icon",
    delay:delay,
    hide:true
  });
  setTimeout(function(){
  //  $$("myform").parse(records[2]);
    $$("issueForm").enable();
    $$("moreImage").show(); 
    $$("mylist").hide();
    $$("imgLabel").setValue("Request Got cancelled ! ");
    $$("moreImage").setValue(0);   
  }, delay);
};


function uploadImages(){
 webix.ui({
   view:"window",
    id:"imgWindow",
    head : {
			template : "<span'>Add Files</span><span class='closeWin'>&times;</span>",
			onClick:{
				"closeWin":function(){
				 	$$("imgWindow").close();
                  	$$("issueForm").enable();
                    $$("moreImage").setValue(0); 
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
            		$$("issueForm").disable();
                  
					console.log("File \" "+file.name+" \" has been added ");
          		},
          		onFileUpload:function(file){
                  if(file.percent==100){
            		console.log("File \" "+file.name+" \" has been Uploaded Successfully ");
            	  }else{
              		webix.message("File \" "+file.name+" \" will take a while to upload ");
            	  }
                  $$("imgWindow").hide();                  
                  $$("issueForm").enable();
                  $$("mylist").show();
                  $$("addFiles").show();
           		  $$("done").show();
                  $$("submit").disable();
                  $$("moreImage").hide();  
                }
      		}          
          }
        ]
    }
   
 }).show();  
}


<script src="//cdn.webix.com/components/edge/ckeditor/ckeditor.js"></script>



https://snippet.webix.com/21qx8vux
