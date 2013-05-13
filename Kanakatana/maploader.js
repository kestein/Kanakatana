function loadMap(game, mapname, maptex, callback)
{
	var map;

	/** map things **/
	var reader1 = new XMLHttpRequest() || new ActiveXObject('MSXML2.XMLHTTP');
	reader1.open('get', mapname, true); 
	reader1.onreadystatechange = parseMapData;
	reader1.send(null);
			
	var mapdata;
	var mapinfo;
	var mapw = 0, maph = 0;
	var config = false;
	var maploaded = false;
	
	function parseMapData() { 
		if (reader1.responseText != null && reader1.responseText != "")
		{
			console.log(reader1.responseText);
			raw = reader1.responseText.split('\n');
			num = parseInt(raw[0], 10);
			mapinfo = new Array();
			
			for (i = 0; i < num; i++)
			{
				raw2 = raw[i + 1].split(' ');
				mapinfo.push(raw2[0]);
				mapinfo.push(parseInt(raw2[1]));
				mapinfo.push(parseInt(raw2[2]));
			}
			
			parseMap(reader1.responseText, num + 2);
		}
	};
	function parseMap(data, loc) { 
		mapdata = data.split('\n');
		maph = mapdata.length - loc;
		for (i = 0; i < maph; i++)
		{
			// the -1 is to account for the '\n'
			if (mapdata[i + loc].length - 1 > mapw)
				mapw = mapdata[i + loc].length - 1;
		}
			
		configMap(loc);
	};
	function configMap(loc)
	{
		if (!config)
		{
			map = new Map(16, 16);
			map.image = game.assets[maptex];
		
			data = new Array();
			collision = new Array();
			for (i = 0; i < maph; i++)
			{
				data.push(new Array());
				collision.push(new Array());
			}
				
			for (i = 0; i < maph; i++)
			{
				for (j = 0; j < mapw; j++)
				{
					mapchar = mapdata[i + loc][j];
					for (find = 0; find < mapinfo.length; find++)
					{
						if (mapinfo[find] == mapchar)
						{
							collision[i].push(mapinfo[find + 1]);
							data[i].push(mapinfo[find + 2]);
							
							break;
						}
					}
				}
			}
			
			map.loadData(data);
			map.collisionData = collision;
			
			console.log("W = " + mapw + " H = " + maph);
			//console.log(data);
			//console.log(collision);
				
			console.log("map creation complete");
			config = true;
			maploaded = true;
		}
	}
	
	setTimeout(check, 100);
	
	function check()
	{
		if (maploaded)
		{
			callback(map);
		}
		else
		{
			setTimeout(check, 100);
		}
	}
}