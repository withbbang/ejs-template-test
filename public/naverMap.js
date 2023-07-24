"use strict";

// 지도 센터 설정
const map = new naver.maps.Map("map", {
  center: new naver.maps.LatLng(37.3595704, 127.105399),
  mapTypes: new naver.maps.MapTypeRegistry({
    normal: naver.maps.NaverStyleMapTypeOptions.getVectorMap(),
  }),
});

// 마커 설정
const marker = new naver.maps.Marker({
  position: new naver.maps.LatLng(37.3614483, 127.1114883),
  map: map,
});

// 클릭한 지점으로 마커 옮기기
naver.maps.Event.addListener(map, "click", function (e) {
  marker.setPosition(e.coord);
});

// 특정 위치 인스턴스 설정
const cityhall = new naver.maps.LatLng(37.3614483, 127.1114883);

// 커스텀 정보 모달 값
const contentString = ['<div class="iw_inner">하여자 김인애</div>'].join("");

// 커스텀 정보 모달 그리기
const infowindow = new naver.maps.InfoWindow({
  content: contentString,
});

// 마커 클릭 이벤트: 커스텀 정보 모달 그리기/지우기
naver.maps.Event.addListener(marker, "click", function (e) {
  if (infowindow.getMap()) {
    infowindow.close();
  } else {
    infowindow.open(map, marker);
    document.querySelector(".iw_inner").parentElement.style.borderRadius =
      "20px";
    document.querySelector(
      ".iw_inner"
    ).parentElement.parentElement.style.borderRadius = "20px";
  }
});

// 폴리 라인 그리기
// const polyline = new naver.maps.Polyline({
//   map: map,
//   path: [
//     new naver.maps.LatLng(37.359924641705476, 127.1148204803467),
//     new naver.maps.LatLng(37.36343797188166, 127.11486339569092),
//     new naver.maps.LatLng(37.368520071054576, 127.11473464965819),
//     new naver.maps.LatLng(37.3685882848096, 127.1088123321533),
//     new naver.maps.LatLng(37.37295383612657, 127.10876941680907),
//     new naver.maps.LatLng(37.38001321351567, 127.11851119995116),
//     new naver.maps.LatLng(37.378546827477855, 127.11984157562254),
//     new naver.maps.LatLng(37.376637072444105, 127.12052822113036),
//     new naver.maps.LatLng(37.37530703574853, 127.12190151214598),
//     new naver.maps.LatLng(37.371657839593894, 127.11645126342773),
//     new naver.maps.LatLng(37.36855417793982, 127.1207857131958),
//   ],
// });

// 클릭시 마커 그리기
// naver.maps.Event.addListener(map, "click", function (e) {
//   const point = e.coord;

//   new naver.maps.Marker({
//     map: map,
//     position: point,
//   });
// });

// 우클릭시 폴리라인 그리기
const polyline = new naver.maps.Polyline({
  map: map,
  path: [],
  strokeColor: "#5347AA",
  strokeWeight: 2,
});
naver.maps.Event.addListener(map, "rightclick", function (e) {
  const point = e.coord;
  const path = polyline.getPath();
  path.push(point);
});

// 폴리라인 하나씩 지우기
// naver.maps.Event.addListener(map, "click", function (e) {
//   const path = polyline.getPath();
//   path.length > 0 && path.pop();
// });
const path = document.getElementById("path");
function handleErasePath() {
  const path = polyline.getPath();
  path.length > 0 &&
    path.forEach(() => {
      path.pop();
    });
}

// 건물 라벨 지우기
const labelLayer = new naver.maps.LabelLayer();
const labelLayerBtn = document.getElementById("labelLayer");
function handleEraseLabel() {
  if (labelLayer.getMap()) {
    labelLayer.setMap(null);
    labelLayerBtn.classList.remove("control-on");
  } else {
    labelLayer.setMap(map);
    labelLayerBtn.classList.add("control-on");
  }
}
