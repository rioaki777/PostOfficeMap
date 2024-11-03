var myMap;
var service;

function initMap() {
	// 初期マップ表示
	let mapOptions = {
		center: {lat: 35.640, lng: 139.682},
		zoom: 10,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};
	myMap = new google.maps.Map(document.getElementById("map"), mapOptions);
	service = new google.maps.places.PlacesService(myMap);
	let search_keyword = document.getElementById("search_word");
	let request = {
		query : search_keyword.value+' ポスト',
		radius : 4000,
		location : myMap.getCenter()
	};
	service.textSearch(request, searchResult);
}

function search(){
	let search_keyword = document.getElementById("search_word");
	let request = {
		query : search_keyword.value+' ポスト',
		radius : 4000,
		location : myMap.getCenter()
	};
	service.textSearch(request, searchResult);
}
 
// 検索結果取得
function searchResult(results, status) {
	if (status !== google.maps.places.PlacesServiceStatus.OK) {
	    // TODO
	    alert('検索エラー:', status);
	    return;
	}

	let bounds = new google.maps.LatLngBounds();
	for(var i = 0; i < results.length; i++){
		createMarker({
			 position: results[i].geometry.location,
			 text: results[i].name,
			 map: myMap
		 });
		bounds.extend(results[i].geometry.location);
	}
	updateLists(results);
	myMap.fitBounds(bounds);
}
 
// 検索結果に応じマーカー追加
function createMarker(options) {
	let marker = new google.maps.Marker(options);
	
	// 吹き出し表示
	let infoWnd = new google.maps.InfoWindow();
	infoWnd.setContent(options.text);
	google.maps.event.addListener(marker, 'click', function(){
		infoWnd.open(myMap, marker);
	});
	return marker;
}

function updateLists(results) {
    let placesList = document.getElementById('places');
	placesList.innerHTML = "";

	for(let i = 0; i < results.length; i++){
		let lat = results[i].geometry.location.lat();
		let lng = results[i].geometry.location.lng();
		let postname = results[i].name + " (" + results[i].formatted_address +")";
		let li = document.createElement('li');
		li.setAttribute("id", "postlist");
		li.setAttribute("postname", results[i].name);
		li.setAttribute("lat", latlngFormatter(lat));
		li.setAttribute("lng", latlngFormatter(lng));
		li.setAttribute("title", postname);
		li.addEventListener("click", specifyPost);
		li.textContent = postname;
		placesList.appendChild(li);
    }
}

function latlngFormatter(str){
	let results = str.toString().split('.');
	return results[0] + "." + results[1].substring(0,3);
}

function specifyPost(event){
	let clickedItem = event.target;
	
	let position = new google.maps.LatLng(clickedItem.getAttribute("lat"), clickedItem.getAttribute("lng"));
	let mapOptions = {
			center : position,
			zoom: 17,
			mapTypeId : google.maps.MapTypeId.ROADMAP
		};
	myMap = new google.maps.Map(document.getElementById("map"), mapOptions);
	createMarker({
		position : position,
		text : clickedItem.getAttribute("postname"),
		map : myMap
	});
}