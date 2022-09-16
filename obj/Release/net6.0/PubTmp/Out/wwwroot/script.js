var len;
var results = '';

// change background pic on click of header
// BONUS: cycles through two images
const PIC_URLS = ["bg.jpg", "bg2.jpg"]
$("#title").on("click", () => {
  var firstPic = $("body").css("background-image").includes(PIC_URLS[0])
  $("body").css({
    "background-image": `url(${firstPic ? PIC_URLS[1] : PIC_URLS[0]})`
  })
})

// call api search on click of search button
$("#searchButton").on("click", apiSearch)

// display current time in dialog when time button clicked
$("#timeButton").on("click", () => {
  const now = new Date()
  // HH:MM
  const time = `<p>${now.getHours() % 12}:${now.getMinutes().toString().padStart(2,'0')}</p>`
  console.log(time)

  $("#time").html(time)
  $("#time").dialog()
})

const query = (count = 50) => {
  var params = {
    "q": $("#query").val(),
    "count": `${count}`,
    "offset": "0",
    "mkt": "en-us"
  };

  // API url replaced
  return $.ajax({
    url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
    beforeSend: function (xhrObj) {
      // API key added (though isn't this unsafe??)
      xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "d53f6725da8e4eadbc03b32c100686e4");
    },
    type: "GET",
  })
}

// BONUS: I'm feeling lucky button; opens first search result in new tab
$("#luckyButton").on("click", () => {
  query(1).done((data) => {
    window.open(data.webPages.value[0].url, "_blank")
  })
    .fail(() => alert("error"))
})

function apiSearch() {

  query(50)
    .done(function (data) {
      len = data.webPages.value.length;
      for (i = 0; i < len; i++) {
        results += "<p><a href='" + data.webPages.value[i].url + "'>" + data.webPages.value[i].name + "</a>: " + data.webPages.value[i].snippet + "</p>";
      }

      $('#searchResults').html(results);

      $('#searchResults').dialog();
      $("#searchResults").dialog("option", "maxHeight", 900)
      $("#searchResults").dialog("option", "width", 500)


    })
    .fail(function () {
      alert("error");
    });
}