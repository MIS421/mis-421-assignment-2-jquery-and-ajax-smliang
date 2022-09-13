var len;
var results = '';

const PIC_URLS = ["bg.jpg", "bg2.jpg"]

$("#title").on("click", () => {
  var firstPic = $("body").css("background-image").includes(PIC_URLS[0])
  $("body").css({
    "background-image": `url(${firstPic ? PIC_URLS[1] : PIC_URLS[0]})`
  })
})

$("#searchButton").on("click", apiSearch)

$("#timeButton").on("click", () => {
  const now = new Date()
  const time = `<p>${now.getHours() % 12}:${now.getMinutes()}</p>`
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

  return $.ajax({
    url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
    beforeSend: function (xhrObj) {
      xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "d53f6725da8e4eadbc03b32c100686e4");
    },
    type: "GET",
  })
}

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