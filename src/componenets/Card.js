import React from "react";


function Card({day,index}) {
  return <div className={
    (index === 0) ? `bg-weather-blue m-2 p-2 flex flex-col font-mulish font-bold items-center border border-grey` : `m-2 p-2 flex flex-col font-mulish font-bold items-center border border-grey`
  }>
    <p>{timeConverter(day.dt).toString().toUpperCase().slice(0,3)}</p>
    <div className="">
        <img src={`./icons/${day.weather[0].icon}.png`} alt="" />
    </div>
    <p>{`${Math.round(day.temp.max)}\u00B0 / ${Math.round(day.temp.min)}\u00B0`}</p>
  </div>;
}

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return new Date(time);
}

export default Card;
