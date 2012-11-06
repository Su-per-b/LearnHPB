//-----------------------------------------
// LScript Modeler template
//
/*
"#################################################");
"##             MTL File created by             ##");
"##                Michael Green                ##");
"##      Lscripts@shortbutpurple.fsnet.co.uk    ##");
"#################################################");

MTL code used with permission

Object And UV Export by Steven Cleland

    2007
*/
@version 2.3
@warnings
@script modeler
@name "ExportObjForThreeJS"

// global values go here

main
{
    // requester code goes here
    

    

    
    mesh = Mesh(0);
    mn = mesh.name;
    fn;
    
									    
		    /*
			    fn = mesh.filename;
			    if(!fn)
			    {
			        info("need to save object first");
			        return;
			    }
			    fn = split(fn);
			    fp = fn[1] + fn[2] + "OBJ_" +  mn;
			    ld = lyrdata();
			    if(!chdir(fp))
			    {
			        mkdir(fp);
			        chdir(fp);
			    }
			    matf = mn + ".mtl";
			    writemtl(matf,1,1);
		    */

    
    vmns;
    vmap = VMap(VMTEXTURE);
    while(vmap && vmap.type == VMTEXTURE)
    {
        vmns+=vmap.name;
        vmap = vmap.next();
    }
    if(vmns.size() == 0)
    {
        info("No UV Maps Found");
        return;
    }
    spec = recall("spec",1);
    lum = recall("lum",1);
    
    reqbegin("Obj and Mat Exporter");
    reqsize(300,280);
    t1 = ctltext(" ","Material Export by Dodgy","        Object Export by Lightfreeze");
    c1 = ctlchoice("Use as Specular",spec,@"Specular","Reflectivity"@);
    c2 = ctlcheckbox("Assign Ambient to Luminosity",lum);
    t2 = ctltext(" ","Only one UV map which covers all points","in all layers allowed");
    c4 = ctlpopup("Select Global UV",1,vmns);
    t3 = ctltext(" ","OBJ_Folder will be created where the LW object is","hint close all objects, load desired object, run script");
    ctlposition(t1,10,0);
    ctlposition(c1,40,60);
    ctlposition(c2,84,81);
    ctlposition(t2,10,100);
    ctlposition(c4,10,150);
    ctlposition(t3,10,170);
    return if !reqpost();
    
    spec = getvalue(c1);
    lum = getvalue(c2);
    
    store("spec",spec);
    store("lum",lum);
    
    m = getvalue(c4);
    vm = vmns[m];
    
    fn = mesh.filename;
    if(!fn)
    {
        info("need to save object first");
        return;
    }
    fn = split(fn);
    fp = fn[1] + fn[2] + "OBJ_" +  mn;
    ld = lyrdata();
    if(!chdir(fp))
    {
        mkdir(fp);
        chdir(fp);
    }
    
 
    threeFilePath = fn[1] + fn[2] + "THREE_" +  mn;
    
    matf = mn + ".mtl";
    writemtl(matf,spec,lum, threeFilePath);
    //debug();
    foreach(l,ld)
    {
        lyrsetfg(l);
        txt = mesh.layerName(l);
        //if(txt == nil)txt = "Layer"+string(l);##################
        if(ld.size()==1)
        {
            txt = mn;
        }
        else
        {
            if(txt == nil)txt = mn + "-Layer"+string(l);
            else{txt = mn + "-" + mesh.layerName(l);}
        }
        //copy();
        //new();
        //paste();
        meshn = Mesh(0);
        surfs = Surface(meshn);
        //info(surfs);
        blank;
        
        editbegin();
        //pnts = points;
        //plys = polygons;
        fname = txt + ".obj";
        f = File(fname,"w");
        f.writeln("mtllib " + matf);
        foreach(pnt,points)//##############################
        {
            f.writeln("v ",pnt.x," ",pnt.y," ",-pnt.z);
        }
        f.writeln(" ");
        mon = polygons.size();//############
        monstr = "Processing " + txt;
        moninit(mon,monstr);
        //debug();
        /*
        if(vm)
        {
            map = VMap(vm);
            foreach(pnt,pnts)
            {
                uv = map.getValue(pnt);
                if(uv)f.writeln("vt ",uv[1]," ",uv[2]);
            }
        }
        */
        map = VMap(vm);
        //info(map.name);
        f.writeln(" ");
        surfs.pack();
        Alluv;
        cuv = 1;
        Allplys;
        plyk = 1;
        //foreach(surf,surfs)
        //{
        
        //debug();
        //f.writeln("usemtl ",surf);
        opart = " ";
        part = "none";
        osurf = " ";
        foreach(ply,polygons)//############################
        {
            //part = ply.part;
            surf = ply.surface;
            if(surf == nil)break;
            if(surf<>osurf)f.writeln("usemtl ",surf);
            osurf = surf;
            //{
            if(monstep())
            {
                editend(ABORT);
                return;
            }
            plypnts = blank;
            jtot = polypointcount(ply);
            for( j = 1 ; j <= jtot ; j++)
            {
                plypnts+= ply.points[j];
            }
            vmap = VMap(VMSELECT);
            while(vmap && vmap.type == VMSELECT)
            {
                if(vmap.isMapped(plypnts[1]))
                {
                    part = vmap.name;
                    break;
                }
                vmap = vmap.next();
            }
            if(part<>opart)f.writeln("g ",part);
            opart = part;
            //plypnts = ply.points;
            
            pntarr = blank;
            uvarr = blank;
            k = 1;
            foreach(plypnt,plypnts)
            {
                //pntarr+=pnts.indexOf(plypnt);
                if(map.isMapped(plypnt,ply))
                {
                    pntarr+=points.indexOf(plypnt);//###########
                    uvps = map.getValue(plypnt,ply);
                    uvarr[k] = uvps;
                    //Alluv[cuv] = uvps;
                    //info(dis);
                }
                else// if(map.isMapped(plypnt))
                {
                    pntarr+=points.indexOf(plypnt);//##############
                    uvps = map.getValue(plypnt);
                    uvarr[k] = uvps;
                    //Alluv[cuv] = uvps;
                }
                k+=1;
                
                /*
                for(i = 1;i<=pnts.size();i++)
                {
                    if(plypnt == pnts[i])
                    {
                        pntarr+=i;
                        break;
                    }
                }
                */
            }
            foreach(uv,uvarr)
            {
                f.writeln("vt "+uv[1]+" "+uv[2]);
                cuv+=1;
            }
            
            f.write("f ");
            //debug();
            k = 0;
            l = pntarr.size();
            foreach(p,pntarr)
            {
                f.write(p , "/",cuv + k-l," ");
                k+=1;
                
            }
            f.writeln(" ");
            //}
        }
        
        //}
        monend();
        f.close();
        editend();
        //AutoConfirm(0);
        //close();
        
    }
    
    ss = getsep();
    
    pythonPath = "\"C:\\python\\Python2.7\\python.exe\"";
    pythonConvertScript = "\"C:\\python\\Python2.7\\Scripts\\convert_obj_three.py\"";
    

    
    objFilePath = "\"" + fp + "\\" + mn + ".obj" + "\"";

    
    threeFileJson =  "\"" + threeFilePath + "\\" + mn + ".obj.json" +  "\"";
    
    pythonScriptArgs = "-i " + objFilePath + " -o " + threeFileJson +
    	" -a center -t binary";

	 cmd = pythonPath + " " + pythonConvertScript + " " + pythonScriptArgs;
	    
    ld = lyrdata();
    if(!chdir(threeFilePath))
    {
        mkdir(threeFilePath);
        //chdir(threeFilePath);
    }
    

    

    
    //debug();
    
    
    snID = spawn(cmd);
    

    info("finished");
    
}



writemtl:pfilename,pchoice,plum,threeFilePath
{
    pfile=File(pfilename,"w");

    

    pfile.writeln(STRING,"#################################################");
    pfile.writeln(STRING,"##             MTL File created by             ##");
    pfile.writeln(STRING,"##                Michael Green                ##");
    pfile.writeln(STRING,"##      Lscripts@shortbutpurple.fsnet.co.uk    ##");
    pfile.writeln(STRING,"#################################################");
    
    mymesh=Mesh(0);
    mysurfnames=Surface(mymesh);
    
    for(i=1;i<=mysurfnames.size();i++)
    {
        pfile.writeln(STRING," ");
        
        myfullname=mysurfnames[i];
        mysurf=Surface(mymesh,myfullname);
        mynewname=replacespaces(myfullname);
        
        mystring="newmtl "+mynewname;
        pfile.writeln(STRING,mystring);
        // colour
        myvalue=mysurf.getValue(SURFCOLR);
        col = myvalue;
        mystring="Kd "+myvalue.x.asStr()+" "+myvalue.y.asStr()+" "+myvalue.z.asStr();
        pfile.writeln(STRING,mystring);
        // ambient
        myvalue=mysurf.getValue(SURFREFL);
        mystring="Ka "+myvalue.asStr()+" "+myvalue.asStr()+" "+myvalue.asStr()+" ";
        pfile.writeln(STRING,mystring);
        // Specular
        if(pchoice==1)
        myvalue=mysurf.getValue(SURFSPEC);
        else
        myvalue=mysurf.getValue(SURFREFL);
        mystring="Ks "+myvalue.asStr()+" "+myvalue.asStr()+" "+myvalue.asStr()+" ";
        mystring="Ks "+string(myvalue*col.x)+" "+string(myvalue*col.y)+" "+string(myvalue*col.z);
        pfile.writeln(STRING,mystring);
        // Glossiness
        myvalue=round(100*mysurf.getValue(SURFGLOS),0);
        mystring="Ns "+myvalue.asStr();
        pfile.writeln(STRING,mystring);
        // Transparency
        myvalue=1- mysurf.getValue(SURFTRAN);
        mystring="d "+myvalue.asStr();
        pfile.writeln(STRING,mystring);
        // IOR
        myvalue=mysurf.getValue(SURFRIND);
        mystring="Ni "+myvalue.asStr();
        pfile.writeln(STRING,mystring);
        // Colourfilter/TransmissionFilter
        myvalue=mysurf.getValue(SURFCLRF);
        mystring="Tf "+myvalue.asStr();
        pfile.writeln(STRING,mystring);
        // Reflection blurring
        myvalue=round(100*mysurf.getValue(SURFRBLR),0);
        mystring="sharpness "+myvalue.asStr();
        pfile.writeln(STRING,mystring);
        // Maps
        
        pfile.writeln(STRING," ");
        
        
        //debug();
        //Colour
        img=getfirstimage(mysurf,SURFCOLR);
        useImage(img, "map_Kd ", threeFilePath, pfile);
		

		//Ambient/Luminosity
		if(plum) {
	        img=getfirstimage(mysurf,SURFLUMI);
	        useImage(img, "map_Ka ", threeFilePath, pfile);
		}


        //Spec
        if(pchoice==1) {
        	mymap=getfirstimage(mysurf,SURFSPEC);
        	
	        img=getfirstimage(mysurf,SURFSPEC);
	        useImage(img, "map_Ks ", threeFilePath, pfile);
        }
        else {
       		mymap=getfirstimage(mysurf,SURFREFL);
	        useImage(img, "map_Ks ", threeFilePath, pfile);
        }

        
		//Gloss
        img=getfirstimage(mysurf,SURFGLOS);
        useImage(img, "map_Ns ", threeFilePath, pfile);
        
        //Trans
        img=getfirstimage(mysurf,SURFTRAN);
        useImage(img, "map_d -imfchan l ", threeFilePath, pfile);
        
        
        //Bump
        img=getfirstimage(mysurf,SURFBUMP);
        useImage(img, "map_bump ", threeFilePath, pfile);

        
    }
    
}


useImage:img,strPrefix,threeFilePath,pfile
{
    if(img)
    {
        imageFilePath=img.filename(0);
        
        if (imageFilePath) {
        
            imageFilePathAry = split(imageFilePath);
         	imageFileName = imageFilePathAry[3] + imageFilePathAry[4];
         	
			imageFileDestination = threeFilePath + getsep() + imageFileName;

			fileInfo = filestat(imageFileDestination);
			

			if (!fileInfo) {
            	filecopy(imageFilePath,imageFileDestination);
			}
			
            strToWrite = strPrefix + imageFileName;
		    pfile.writeln(STRING,strToWrite);
	      
        }
    }

}

SpacesFail: filepath
{
    t = parse(" ",filepath);
    if(t.size()>1)
    {
        info("There are spaces in ",filepath," It will not be used");
        return(false);
    }
    else return(true);
}
replacespaces:pstring
{
    mynamebits=parse(" ",pstring);
    newname=mynamebits[1];
    for(i=2;i<=mynamebits.size();i++)
    {
        newname=newname+"_" + mynamebits[i];
    }
    
    return(newname);
}

getfirstimage:psurface,pchannel
{
    //debug();
    myTOA=psurface.getTexture(pchannel);
    if(!myTOA)
    return(nil);
    mytexture=myTOA.firstLayer();
    while(mytexture && mytexture.type!=TXTRIMAGE && mytexture.getValue(TXLRIMAGE)==nil)
    {
        mytexture=myTOA.nextLayer(mytexture);
    }
    if(mytexture)
    {
        myimage=mytexture.getValue(TXLRIMAGE);
    }
    return(myimage);
}















