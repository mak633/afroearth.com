    function get_ebdata() {
        var authurl = "https://www.eventbrite.com/oauth/authorize?response_type=token&client_id=OBIDLLJYRK4IZRCWSB";
        var tkn = '3SANCTV7KNOJACKVFI3D';
        var auth_headers = {'Authorization': 'Bearer ' + tkn};
        var url = "https://www.eventbriteapi.com/v3/events/search/?token=" + tkn + "&expand=venue";
        $.ajax({
            url: url,
            data: {'user.id': '94951805341', 'sort_by': 'date'},
            dataType: "json",
            headers: auth_headers,
            success: function(data){
                var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                for (var i = 0; i < data.events.length; i++){
                    var evnt = data.events[i];
                    var dat = new Date(evnt.start.utc);
                    var date = days[dat.getDay()] + ", " + months[dat.getMonth()] + " " + dat.getDate();
                    var ven1 = evnt.venue.address.address_1;
                    if (evnt.venue.address.address_2 !== null){
                        ven1 = ven1 + " " + evnt.venue.address.address_2;
                    }
                    if (ven1 !== 'TBA'){
                        var enddat = new Date(evnt.end.utc);
                        var ven2 = evnt.venue.address.city + ", " + evnt.venue.address.region;
                        var ven3 = evnt.venue.name;
                        var time = meridian_time(dat) + " - " + meridian_time(enddat);
                        var btn = "<a href=" + evnt.url + " target='new' style='text-decoration:none;color:#ffffff;'><p class='regbutton'>Register For " + ven2 + "<br></p></a>";
                        $("#event-stuff").append("<p>" + date + "<br>" + ven1 + "<br>" + ven2 + "<br>" + ven3 + "<br>" + time + "<br>" + btn + "</p>")
                    }else{
                        $("#event-stuff").append("<p>" + date + "<br>" + ven1 + "<br>" + time  + "</p>")
                    }
                }
            }
        })
    }
meridian_time = function(date){
        var meridian = "am";
        var hours = date.getHours();
        var minutes = date.getMinutes();
        if (hours > 12){
            hours -= 12;
            meridian = "pm"
        }else if (hours == 0){
            hours = 12;
        }
        if (minutes < 10){
            minutes = minutes + "0";
        }
        return hours + ":" + minutes + " " + meridian;
    }
