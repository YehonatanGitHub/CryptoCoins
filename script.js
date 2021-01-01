var coinInfo = []
var myArray = []
var chartArray = []
var searchArray = []
var thisCoin, nameKey, x
localStorage.clear()
var resultSymbol

function coins() {
  $.ajax({
    url: 'https://api.coingecko.com/api/v3/coins/list',
    async: false,
    beforeSend: function () {
      // Before we send the request, remove the .hidden class from the spinner and default to inline-block.
      $('#loading-image').css('display', 'block')
    },
    success: function (result) {
      console.log(result)
      var j = 0
      result.forEach(function (result, index) {
        if (j <= 11) {
          var symbol = result.symbol.toUpperCase()
          searchArray.push(result.symbol)

          $.ajax({
            url: `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD`,
            async: false,

            success: function (data) {
              console.log(data.HasWarning)
              if (data.HasWarning == false) {
                console.log('Error')
              } else {
                console.log('OK')

                $('#card').append(` 
                <div class="col-sm-4">
                <div class="card">
                  <div class="card-body">
                    <label class="switch">
                      <input type="checkbox" class="checkbox coins"  id="1${result.symbol}">
                      <span class="slider round"></span>
                    </label>
                    <h4 class="card-title">${result.symbol}</h4>
                    <p class="card-text">${result.name}</p>            
                    <button type="button" id="${result.id}" class="btn btn-secondary btn-secondary" data-toggle="collapse" data-target="#moreInfo${result.id}">More Info</button>
                     <br><br>
                      <div id="moreInfo${result.id}" class="collapse">
                        <div class="container">          
                          <table class="table table-dark table-hover">
                            <tbody>
      
                            <tr>
                            <td><img id="img${result.id}" src="" alt="coin icon" ></td>
                          </tr>
                          
                              <tr>
                                <td><span id="td1${result.id}" style="font-size:24px"></span></td>
                              </tr>
                              <tr>
                                <td><span id="td2${result.id}" style="font-size:24px"></span></td>
                              </tr>
                              <tr>
                                <td><span id="td3${result.id}" style="font-size:24px"></span></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                  </div>
                </div>
              </div>`)
                j++
              }
            },
          })
        }
      })
    },
    complete: function () {
      $('#loading-image').css('display', 'none')
    },
  })
  //add modal
  $('#card').append(`<div class="container">

  <!-- Modal -->
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          
          <h4 class="modal-title">You have passed the maximum selection
          </h4>
        </div>
        <div class="modal-body" id="modalBody">
          <p>Please remove one of the coins you have selected or click Cancel.</p>
        </div>

        <ul class="list-group">
        <li class="list-group-item" id="1">First item</li>
        <li class="list-group-item" id="2">Second item</li>
        <li class="list-group-item" id="3">Third item</li>
        <li class="list-group-item" id="4">Third item</li>
        <li class="list-group-item" id="5">Third item</li>
      </ul>

      
        <div class="modal-footer">

          <button type="button" class="btn btn-default" data-dismiss="modal" id="cancel">Cancel</button>
        </div>
      </div>
      
    </div>
  </div>
  
</div>
`)
}

function getMoreInfo(butId, time) {
  // coinInfo = [];
  $.ajax({
    url: 'https://api.coingecko.com/api/v3/coins/' + butId,
    async: false,
    success: function (result) {
      var imgUrl = result.image.small
      var usd = result.market_data.current_price.usd.toFixed(3)
      var eur = result.market_data.current_price.eur.toFixed(3)
      var ils = result.market_data.current_price.ils.toFixed(3)

      $('#img' + butId).attr('src', imgUrl)
      $('#td1' + butId).html('$ ' + usd)
      $('#td2' + butId).html('€ ' + eur)
      $('#td3' + butId).html('₪ ' + ils)
      $('#preloader').hide()
      console.log('Ajax run for ' + butId)

      // enter inpots into obj
      thisCoin = {
        id: butId,
        thisImg: imgUrl,
        thisUsd: usd,
        thisEur: eur,
        thisIls: ils,
        thisTime: time,
      }

      //  coinInfo.push(thisCoin);
      // console.log(coinInfo);
      // return coinInfo;

      console.log(thisCoin)
    },
  })
}

//search withing array

function search2(nameKey, myArray) {
  for (var j = 0; j < myArray.length; j++) {
    if (myArray[j] == nameKey) {
      return j
    }
  }
}

// function checkboxClick() {// On click of checkbox:

// change
// symbols = {
//   id: "1"+result.symbol,
//   thisSymbol: symbol,
// };
// symbolsArr.push(symbols);
// console.log(symbolsArr);

// var checked = $(this).prop('checked');
// console.log(checked);
// console.log(this.id);

// if(this.checked) {
//   console.log(this.id + " is checked");
// }

// }

$(document).ready(function () {
  // On button click on the page:
  $('body').on('click', 'button', function () {
    // is click of "More info"?
    if ($(this).attr('class') !== 'btn btn-secondary btn-secondary') {
    } else {
      var butId = $(this).attr('id')
      console.log(butId)

      // get time clicked
      var d = new Date()
      var time = d.getTime()
      console.log(time)

      //get collapse - open/closed
      var openClosed = $('#moreInfo' + butId).hasClass('show')

      if (openClosed == false) {
        //when open = false:
        console.log('is open')
        $('#' + butId).text('Less Info')

        if (localStorage.getItem('coinInfo') !== null) {
          var getStorage = []
          getStorage = JSON.parse(localStorage.getItem('coinInfo'))
          console.log('if != null')
          console.log(getStorage)
          //search if coin is in localStorage
          function search(nameKey, myArray) {
            for (var j = 0; j < myArray.length; j++) {
              if (myArray[j].id == nameKey) {
                return j
              }
            }
          }
          var x = search(butId, getStorage)
          console.log(
            'returen the location in array or undefined if the ID is not found in localStorage: ' +
              x
          )

          if (typeof x === 'undefined') {
            // if coin is NOT in localStorage:

            //run new AJAX
            getMoreInfo(butId, time)
            // add new coin into LocalStorage

            var parse = []

            parse = JSON.parse(localStorage.getItem('coinInfo'))
            console.log('parse: befor splice: ')
            console.log(parse)
            parse.splice(0, 0, thisCoin)
            console.log('parse: AFTER splice: ')
            console.log(parse)
            localStorage.setItem('coinInfo', JSON.stringify(parse))
          } else {
            // coin is in localStorage:
            console.log('Coin was found in localStorage in location: ' + x)
            // check if 2 min passed
            if (time - getStorage[x].thisTime < 120000) {
              // 2 min didi't passed

              $('#td1' + butId).html('$ ' + getStorage[x].thisUsd)
              $('#td2' + butId).html('€ ' + getStorage[x].thisEur)
              $('#td3' + butId).html('₪ ' + getStorage[x].thisIls)
              console.log("2 min didi't passed - old info set to coin")
            } else {
              // 2 min passed
              console.log('2 min passed - Run new AJAX')
              // Delete the old coin from localStorage
              console.log('local befor delet')
              console.log(getStorage)
              getStorage.splice(x, 1)
              console.log('local after delet')
              console.log(getStorage)
              //run new AJAX
              getMoreInfo(butId, time)
              // add new coin into LocalStorage

              getStorage.push(thisCoin)

              localStorage.setItem('coinInfo', JSON.stringify(getStorage))
            }

            // console.log(getStorage[x]);
          }
        } else {
          var coinInfo = []
          //run new AJAX
          getMoreInfo(butId, time)
          // add new coin into LocalStorage
          coinInfo.push(thisCoin)
          localStorage.setItem('coinInfo', JSON.stringify(coinInfo))
        }
      } else {
        $('#' + butId).text('More Info')
        console.log('is closed')
      }

      //   $("#togBtn" + butId).change(function() {
      //     if(this.checked) {
      //       console.log("checked!!!!!!!!");
      //     }
      // });

      // var switchStatus = false;
      // $("#togBtn" + butId).on('change', function() {
      //     if ($(this).is(':checked')) {
      //         switchStatus = $(this).is(':checked');
      //         alert(switchStatus);// To verify
      //     }
      //     else {
      //        switchStatus = $(this).is(':checked');
      //        alert(switchStatus);// To verify
      //     }
      // });

      //     var checked = document.getElementById("togBtn" + butId).checked;
      //     console.log(checked);
    }
  })

  // Modal + Checkbox

  var i = 0
  $(document).on('click', '.coins', function (event) {
    console.log('coin cliked')
    if ($(this).prop('checked') == true) {
      if (chartArray.length < 5) {
        chartSymbol = this.id.substring(1).toUpperCase()
        chartArray.push(chartSymbol)
        console.log(chartArray)
      } else if (chartArray.length == 5) {
        //save the #6 coin and run modal
        chartSymbol_6 = this.id.substring(1).toUpperCase()
        console.log('chartSymbol_6: ' + chartSymbol_6)
        $('#myModal').modal('show')
        for (let index = 1; index < chartArray.length + 1; index++) {
          $('#' + index).html(` <li class="list-group-item" id="1">${
            chartArray[index - 1]
          }<label class="switch">
              <input type="checkbox" class="checkbox"  checked >
              <span class="slider round modalCoin" id="2${chartArray[index - 1]}" ></span>
            </label>
            </li>`)
        }

        // on click of modal checkbox get the coin to remove.
        $(document).on('click', '.modalCoin', function (event) {
          console.log('modal cliked')
          chartSymbol_remove = this.id.substring(1).toUpperCase()
          console.log('remove: ' + chartSymbol_remove)
          var l = search2(chartSymbol_remove, chartArray)
          chartArray.splice(l, 1)
          console.log(chartArray)
          chartArray.push(chartSymbol_6)
          console.log(chartArray)
          // console.log(this.id.substring(1));
          var r = `1${this.id.substring(1).toLowerCase()}`
          // console.log(r);
          $('#' + r).prop('checked', false)
          $('#myModal').modal('hide')
        })
        // on click of modal - cancel
        $('#cancel').click(function () {
          var rr = `1${chartSymbol_6.toLowerCase()}`
          console.log(rr)
          $('#' + rr).prop('checked', false)
          console.log('cancel was clicked')
        })
      }
    } else {
      // remove coin from array

      chartSymbol = this.id.substring(1).toUpperCase()
      var l = search2(chartSymbol, chartArray)
      chartArray.splice(l, 1)
      console.log(chartArray)
    }
  })

  $('#liveReports').click(function () {
    $('#card').html('')
    $('#card').append(`<div id="chartContainer" style="height: 370px; width: 100%;"></div> `)
    chart1(chartArray)
  })

  $('#about').click(function () {
    $('#card').html('')
    $('#card').append(`
    
    <div  id="aboutCard">
    <p>Built by Yehonatan Roumani  </p>
    <img id="img-me" src="me.jpg" alt="me"/>
    </div>
  
    `)
  })

  $('#searchCoins').click(function () {
    var coinName = $('#inputSearch').val()
    var searchResult = search2(coinName, searchArray)
    console.log(coinName)
    if (searchResult >= 0) {
      $.ajax({
        url: `https://min-api.cryptocompare.com/data/price?fsym=${coinName}&tsyms=USD`,
        async: false,
        success: function (result) {},
      })

      alert(coinName)
    } else {
      alert('Please make sure you enter only a valid ID')
    }
  })
})

// function modalClcik(id) {
//   console.log(id);}
