var numOfCards = undefined;
var timeoutHideStatusText = 200;
var timeoutCoinBegin = 10;
var timeoutHideCoin = 100;
var timeoutCardA_active = 400;
var timeoutCompareCards = 900;
var timeoutCardA_active_computer_move = 700;
var timeoutCardB_active = 300;
var numReturnPressed = 0;
var turnx = true;
var intelligence = 0.5;
var numOfUserActions = 0;
var cars = [];
var cardY = [],
  cardX = [];
var modal = $("#modal");
var span = $(".modal-close");

function makeAiMove() {
  $("details#cara").text(cardX[0].getDuelStats());
  $("details#carb").text(cardY[0].getDuelStats());
  $("#cardB").addClass("active");
  disableUserActions();
  $(statusText).removeClass("correct wrong active");
  setTimeout(function () {
    $("#cardA").addClass("active");
  }, timeoutCardA_active_computer_move);

  var tempCurrent = [cardX[0].zyl, cardX[0].kw, cardX[0].ccm, cardX[0].kmh];
  var tempCurrent2 = [cardY[0].zyl, cardY[0].kw, cardY[0].ccm, cardY[0].kmh];

  Promise.delay(firstAiPart, 1050)
    .delay(secondAiPart, 200)
    .delay(thirdAiPart, 200);

  function firstAiPart() {
    if (Math.random() < intelligence) {
      //firstChoice
      currentAttrX = tempCurrent[cardX[0].firstChoice];
      currentHigherIsBetter =
        propertiesHigherIsBetter[cardX[0].firstChoice + 1];

      currentAttrY = tempCurrent2[cardX[0].firstChoice];

      switch (cardX[0].firstChoice) {
        case 0:
          $(statusText)
            .empty()
            .append(
              "Computer says: " + cardX[0].zyl + " " + propertiesUnits[1] + "."
            );
          $("#cardA .zyl").addClass("active");
          setTimeout(function () {
            $("#cardB .zyl").addClass("active");
          }, timeoutCardB_active);
          break;
        case 1:
          $(statusText)
            .empty()
            .append(
              "Computer says: " + cardX[0].kw + " " + propertiesUnits[2] + "."
            );
          $("#cardA .kw").addClass("active");
          setTimeout(function () {
            $("#cardB .kw").addClass("active");
          }, timeoutCardB_active);
          break;
        case 2:
          $(statusText)
            .empty()
            .append(
              "Computer says: " + cardX[0].ccm + " " + propertiesUnits[3] + "."
            );
          $("#cardA .ccm").addClass("active");
          setTimeout(function () {
            $("#cardB .ccm").addClass("active");
          }, timeoutCardB_active);
          break;
        case 3:
          $(statusText)
            .empty()
            .append(
              "Computer says: " + cardX[0].kmh + " " + propertiesUnits[4] + "."
            );
          $("#cardA .kmh").addClass("active");
          setTimeout(function () {
            $("#cardB .kmh").addClass("active");
          }, timeoutCardB_active);
          break;
        default:
          console.log("Unexpected value");
      } //switch end
    } //first choice
    else {
      //secondChoice
      currentAttrX = tempCurrent[cardX[0].secondChoice];
      currentAttrY = tempCurrent2[cardX[0].secondChoice];
      currentHigherIsBetter =
        propertiesHigherIsBetter[cardX[0].secondChoice + 1];

      switch (cardX[0].secondChoice) {
        case 0:
          $(statusText)
            .empty()
            .append("Computer says: " + cardX[0].zyl + " zyl.");
          $("#cardA .zyl").addClass("active");
          setTimeout(function () {
            $("#cardB .zyl").addClass("active");
          }, timeoutCardB_active);
          break;
        case 1:
          $(statusText)
            .empty()
            .append("Computer says: " + cardX[0].kw + " kW.");
          $("#cardA .kw").addClass("active");
          setTimeout(function () {
            $("#cardB .kw").addClass("active");
          }, timeoutCardB_active);
          break;
        case 2:
          $(statusText)
            .empty()
            .append("Computer says: " + cardX[0].ccm + " ccm.");
          $("#cardA .ccm").addClass("active");
          setTimeout(function () {
            $("#cardB .ccm").addClass("active");
          }, timeoutCardB_active);
          break;
        case 3:
          $(statusText)
            .empty()
            .append("Computer says: " + cardX[0].kmh + " km/h.");
          $("#cardA .kmh").addClass("active");
          setTimeout(function () {
            $("#cardB .kmh").addClass("active");
          }, timeoutCardB_active);
          break;
        default:
          console.log("Unexpected value");
      }
    } //secondChoice
  }

  function secondAiPart() {
    $(statusText).addClass("active");
  }

  function thirdAiPart() {
    compareCards("fromMakeAiMove");
  }
}

function compareCards(previousMethod) {
  Promise.delay(firstPart, 1300)
    .delay(secondPart, 700)
    .delay(thirdPart, 200)
    .delay(fourthPart, 900);

  // addDuelResult
  function firstPart() {
    if (currentAttrX) {
      console.log(
        "🚀 ~ currentAttrX , currentAttrY:",
        currentAttrX,
        currentAttrY,
        currentHigherIsBetter
      );
    } else {
      console.log(
        `%c🚀 ~ currentAttrX , currentAttrY:  ${currentAttrX},  ${currentAttrY}, ${currentHigherIsBetter}`,
        "color: red; background: black;"
      );
    }

    if (currentAttrX == currentAttrY) {
      xWon = undefined;
      cardX[0].addDuelResult("tie");
      cardY[0].addDuelResult("tie");
      cardX.push(cardX[0]);
      cardY.push(cardY[0]);
      $(statusText).empty().append("it's a tie.").removeClass("correct wrong");
      $("#cardA .val.active").addClass("tie");
      $("#cardB .val.active").addClass("tie");
      handleAudio("tie_audio");
    } else if (
      currentHigherIsBetter & (currentAttrX > currentAttrY) ||
      !currentHigherIsBetter & (currentAttrX < currentAttrY)
    ) {
      //AI wins
      xWon = true;
      cardX[0].addDuelResult("win");
      cardY[0].addDuelResult("lose");
      if (Math.random() < 0.5) {
        cardX.push(cardX[0]);
        cardX.push(cardY[0]);
      } else {
        cardX.push(cardY[0]);
        cardX.push(cardX[0]);
      }
      turnx = true;
      $(statusText)
        .empty()
        .removeClass()
        .append("computer wins.")
        .addClass("wrong");
      $("#cardA .val.active").addClass("correct");
      $("#cardB .val.active").addClass("wrong");
      handleAudio("wrong_audio");
    } else {
      xWon = false;
      cardX[0].addDuelResult("lose");
      cardY[0].addDuelResult("win");
      if (Math.random() < 0.5) {
        cardY.push(cardX[0]);
        cardY.push(cardY[0]);
      } else {
        cardY.push(cardY[0]);
        cardY.push(cardX[0]);
      }
      turnx = false;
      $(statusText)
        .empty()
        .removeClass()
        .append("you win.")
        .addClass("correct");
      $("#cardA .val.active").addClass("wrong");
      $("#cardB .val.active").addClass("correct");
      handleAudio("correct_audio");
    }
    cardX.shift();
    cardY.shift();
    $(laba).text("cards computer (x): " + cardX.length);
    $(labb).text("cards user (y): " + cardY.length);
    $(statusText).addClass("active");
  }

  function secondPart() {
    $(".val").removeClass("active wrong correct tie");
    if (cardX.length == 0) {
      $("#cardA").hide();
    } else if (cardY.length == 0) {
      $("#cardB").hide();
    }
    $(".card-container").removeClass("active");
  }

  function thirdPart() {
    $(statusText).removeClass("active");
    updateCardLengthGraphicView(cardX.length, cardY.length);
    updateUserCardsDetails();
  }

  function fourthPart() {
    if (cardX.length == 0) {
      $(".end-game__correct .numOfUserActions").text(
        "number of user actions: " + numOfUserActions
      );
      $(".end-game__correct").addClass("active");
      // saveCookies(cars)
      saveDataOnServer();
    } else if (cardY.length == 0) {
      $(".end-game__wrong .numOfUserActions").text(
        "number of user actions: " + numOfUserActions
      );
      $(".end-game__wrong").addClass("active");
      // saveCookies(cars)
      saveDataOnServer();
    } else {
      loadCurrentCards();
      if (xWon == true) {
        //AI wins
        makeAiMove();
      } else if (xWon == false) {
        userMove();
      } else {
        if (previousMethod == "fromUserMove") {
          userMove();
        } else {
          makeAiMove();
        }
      }
    }

    function saveCookies() {
      console.log("Saving cookies currently disabled");
      // for( var i=0; i<cars.length; i++ ) {

      //     var cv = $.cookie(cars[i].id).split(',')
      //     console.log('current: ', cv)
      //     var newc = [
      //         cars[i].duelsWon,
      //         cars[i].duelsLost,
      //         cars[i].duelsTie
      //     ]
      //     console.log("Have to be added: ", newc)
      //     var newarray = [
      //         cv[0],
      //         parseInt(cv[1])+newc[0],
      //         parseInt(cv[2])+newc[1],
      //         parseInt(cv[3])+newc[2]
      //     ]
      //     $.cookie(cars[i].id, newarray)
      // }
    }
  }
} //compareCards

function updateUserCardsDetails() {
  $("#userCards").empty();
  for (var i = 0; i < cardY.length; i++) {
    $("#userCards").append("<p>" + cardY[i].name + "</p>");
  }
}

function userMove() {
  $("details#cara").text(cardX[0].getDuelStats());
  $("details#carb").text(cardY[0].getDuelStats());
  enableUserActions();
  $("#cardB").addClass("active");
  $(statusText).removeClass("active");

  $("#cardB .zyl")
    .unbind("click")
    .click(function () {
      currentAttrY = cardY[0].zyl;
      currentAttrX = cardX[0].zyl;
      currentHigherIsBetter = propertiesHigherIsBetter[1];
      $("#cardB .zyl").addClass("active");
      disableUserActions();
      secondPart("zyl");
    }); //zyl
  $("#cardB .kw")
    .unbind("click")
    .click(function () {
      currentAttrY = cardY[0].kw;
      currentAttrX = cardX[0].kw;
      currentHigherIsBetter = propertiesHigherIsBetter[2];
      $("#cardB .kw").addClass("active");
      disableUserActions();
      secondPart("kw");
    }); //kw
  $("#cardB .ccm")
    .unbind("click")
    .click(function () {
      currentAttrY = cardY[0].ccm;
      currentAttrX = cardX[0].ccm;
      currentHigherIsBetter = propertiesHigherIsBetter[3];
      $("#cardB .ccm").addClass("active");
      disableUserActions();
      secondPart("ccm");
    }); //ccm
  $("#cardB .kmh")
    .unbind("click")
    .click(function () {
      currentAttrY = cardY[0].kmh;
      currentAttrX = cardX[0].kmh;
      currentHigherIsBetter = propertiesHigherIsBetter[4];
      $("#cardB .kmh").addClass("active");
      disableUserActions();
      secondPart("kmh");
    }); //kmh

  function secondPart(val) {
    numOfUserActions++;
    $("#cardA").addClass("active");
    setTimeout(function () {
      $("#cardA ." + val).addClass("active");
    }, timeoutCardA_active);
    // setTimeout(function() {
    //     $(statusText).empty().removeClass();
    //     $(statusText).append('Comparing values...');
    //     $(statusText).addClass('active')
    // }, 1000)
    setTimeout(function () {
      compareCards("fromUserMove");
    }, timeoutCompareCards);
    // setTimeout(function() {
    //     $(statusText).removeClass('active')
    //     $(statusText).empty();
    // }, 2000)
  }
}

function loadCurrentCards() {
  $(".card .inner tr:nth-child(1) td").html(
    propertiesLabels[1].charAt(0).toUpperCase() + propertiesLabels[1].slice(1)
  );
  $(".card .inner tr:nth-child(2) td").html(
    propertiesLabels[2].charAt(0).toUpperCase() + propertiesLabels[2].slice(1)
  );
  $(".card .inner tr:nth-child(3) td").html(
    propertiesLabels[3].charAt(0).toUpperCase() + propertiesLabels[3].slice(1)
  );
  $(".card .inner tr:nth-child(4) td").html(
    propertiesLabels[4].charAt(0).toUpperCase() + propertiesLabels[4].slice(1)
  );
  $("#cardA .id").html(cardX[0].id);
  $("#cardA .name").html(cardX[0].name);
  $("#cardA .zyl").html(cardX[0].zyl + " " + propertiesUnits[1]);
  $("#cardA .kw").html(cardX[0].kw + " " + propertiesUnits[2]);
  $("#cardA .ccm").html(cardX[0].ccm + " " + propertiesUnits[3]);
  $("#cardA .kmh").html(cardX[0].kmh + " " + propertiesUnits[4]);
  $("#cardA img").attr("src", cardX[0].img);
  $("#cardB .id").html(cardY[0].id);
  $("#cardB .name").html(cardY[0].name);
  $("#cardB .zyl").html(cardY[0].zyl + " " + propertiesUnits[1]);
  $("#cardB .kw").html(cardY[0].kw + " " + propertiesUnits[2]);
  $("#cardB .ccm").html(cardY[0].ccm + " " + propertiesUnits[3]);
  $("#cardB .kmh").html(cardY[0].kmh + " " + propertiesUnits[4]);
  $("#cardB img").attr("src", cardY[0].img);

  if (backgroundSize) {
    var cardX_idNumber = cardX[0].id.charAt(0);
    var cardX_idLetter = cardX[0].id.charAt(1);
    var cardX_offsetX = (cardX_idNumber - 1) * 317;
    var cardX_offsetY = -1;

    var cardY_idNumber = cardY[0].id.charAt(0);
    var cardY_idLetter = cardY[0].id.charAt(1);
    var cardY_offsetX = (cardY_idNumber - 1) * 317;
    var cardY_offsetY = -1;

    if (cardX_idLetter == "A") {
      cardX_offsetY = 0;
    } else if (cardX_idLetter == "B") {
      cardX_offsetY = 1 * (backgroundSize.height / 4);
    } else if (cardX_idLetter == "C") {
      cardX_offsetY = 2 * (backgroundSize.height / 4);
    } else if (cardX_idLetter == "D") {
      cardX_offsetY = 3 * (backgroundSize.height / 4);
    }

    if (cardY_idLetter == "A") {
      cardY_offsetY = 0;
    } else if (cardY_idLetter == "B") {
      cardY_offsetY = 1 * (backgroundSize.height / 4);
    } else if (cardY_idLetter == "C") {
      cardY_offsetY = 2 * (backgroundSize.height / 4);
    } else if (cardY_idLetter == "D") {
      cardY_offsetY = 3 * (backgroundSize.height / 4);
    }

    $("#cardA .img").attr(
      "style",
      'background: url("' +
        cardX[0].img +
        '") ' +
        -cardX_offsetX +
        "px " +
        -cardX_offsetY +
        "px; background-size: " +
        backgroundSize.width +
        "px " +
        backgroundSize.height +
        "px"
    );
    $("#cardB .img").attr(
      "style",
      'background: url("' +
        cardY[0].img +
        '") ' +
        -cardY_offsetX +
        "px " +
        -cardY_offsetY +
        "px; background-size: " +
        backgroundSize.width +
        "px " +
        backgroundSize.height +
        "px"
    );
  } else {
    $("#cardA .img").attr(
      "style",
      'background: url("' + cardX[0].img + '"); background-size: contain'
    );
    $("#cardB .img").attr(
      "style",
      'background: url("' + cardY[0].img + '"); background-size: contain'
    );
  }
}

//#region
function removeSelectCardsOverlay() {
  var b1 = true;
  for (var i = 0; i < cars.length; i++) {
    if (b1) {
      cardX.push(cars[i]);
      b1 = false;
    } else {
      cardY.push(cars[i]);
      b1 = true;
    }
  }
  $("#overlay-select-cards").removeClass("active");
  $(statusText).empty().removeClass("active");
  $("#cardB").addClass("active");
  loadCurrentCards();
  updateUserCardsDetails();
  disableUserActions();

  //following two events that do the same. click on statusText div and enter (return) hit.
  // $(statusText)
  //   .append("hit enter or click here to continue ...")
  //   .addClass("active");

  setTimeout(() => {
    // $(statusText).empty().removeClass("active");
    makeAiMove();
  }, 2000);
}

function saveDataOnServer() {
  $.post(
    "http://localhost:3000/user/save-game-results",
    {
      data: {
        foo: "quux",
      },
    },
    function (data, status) {
      console.log("🚀 ~ file: appSecondVersion.js:522 ~ status:", status);
      console.log("🚀 ~ file: appSecondVersion.js:522 ~ data:", data);
      // if (data.status === "SUCCESS") {
      //   modal.find("p").text("User Info loaded successfully");
      //   modal.show();
      // } else {
      //   modal.find("p").text(data.message);
      //   modal.show();
      // }
      // var res = JSON.parse(JSON.stringify(data)).data[0];

      // $("#user-profile").find("div").empty();
      // $("#user-profile")
      //   .find("div")
      //   .append("<p>name: " + res.name + "</p>");
      // $("#user-profile")
      //   .find("div")
      //   .append("<p>email: " + res.email + "</p>");
      // $("#user-profile")
      //   .find("div")
      //   .append("<p>date of birth: " + res.dateOfBirth + "</p>");
    }
  );
}

$(button_1).on("click", () => {
  var scriptEle = document.createElement("script");
  scriptEle.setAttribute("src", "assets/js/src/flotteFlitzer.js");
  scriptEle.setAttribute("type", "text/javascript");
  scriptEle.setAttribute("async", true);
  document.body.appendChild(scriptEle);
  scriptEle.addEventListener("load", () => {
    cars = fillUpcars();
    removeSelectCardsOverlay();
  });
});
$(button_2).on("click", () => {
  var scriptEle = document.createElement("script");
  scriptEle.setAttribute("src", "assets/js/src/piatnikTuning.js");
  scriptEle.setAttribute("type", "text/javascript");
  scriptEle.setAttribute("async", true);
  document.body.appendChild(scriptEle);
  scriptEle.addEventListener("load", () => {
    cars = fillUpcars();
    removeSelectCardsOverlay();
  });
});
$(button_3).on("click", () => {
  var scriptEle = document.createElement("script");
  scriptEle.setAttribute("src", "assets/js/src/piatnikTurbos.js");
  scriptEle.setAttribute("type", "text/javascript");
  scriptEle.setAttribute("async", true);
  document.body.appendChild(scriptEle);
  scriptEle.addEventListener("load", () => {
    cars = fillUpcars();
    removeSelectCardsOverlay();
  });
});
$(button_4).on("click", () => {
  $("button").removeClass("active");
  $(input_4).removeClass("hidden");
  $(input_6).addClass("hidden");
  $(button_4).addClass("active");
});
$(button_5).on("click", () => {
  var scriptEle = document.createElement("script");
  scriptEle.setAttribute("src", "assets/js/src/sportCars.js");
  scriptEle.setAttribute("type", "text/javascript");
  scriptEle.setAttribute("async", true);
  document.body.appendChild(scriptEle);
  scriptEle.addEventListener("load", () => {
    cars = fillUpcars();
    removeSelectCardsOverlay();
  });
});
$(button_6).on("click", () => {
  $("button").removeClass("active");
  $(input_4).addClass("hidden");
  $(input_6).removeClass("hidden");
  $(button_6).addClass("active");
});
$(input_4).keyup(function () {
  if ($(this).val() == "password") {
    var scriptEle = document.createElement("script");
    scriptEle.setAttribute("src", "assets/js/src/sloescort.js");
    scriptEle.setAttribute("type", "text/javascript");
    scriptEle.setAttribute("async", true);
    document.body.appendChild(scriptEle);
    scriptEle.addEventListener("load", () => {
      cars = fillUpcars();
      removeSelectCardsOverlay();
    });
  }
});
$(input_6).keyup(function () {
  if ($(this).val() == "password") {
    var scriptEle = document.createElement("script");
    scriptEle.setAttribute("src", "assets/js/src/vaginas.js");
    scriptEle.setAttribute("type", "text/javascript");
    scriptEle.setAttribute("async", true);
    document.body.appendChild(scriptEle);
    scriptEle.addEventListener("load", () => {
      cars = fillUpcars();
      removeSelectCardsOverlay();
    });
  }
});
//#endregion

window.onload = function () {
  $("input[type=range]").change(function () {
    intelligence = $(this).val();
    $("output[name=intelligenceOutput]").val(intelligence + "%");
    intelligence = intelligence / 100;
  });

  $("#loader").removeClass("active");
  $("#wrapper").removeClass("overlayed");

  console.log(
    "Dodaj statistiko za vse avte. pa da preko cookijev ali kej podobnega shranjuje stat."
  );
  console.log("Pa dodaj prikaz kvalitete kart, poleg stevila");
  console.log("dodaj replay capability");
  console.log(
    "graficni prikaz stevil akart ne dela kadar zacne vodit igro AI ter tudi stevec spodaj ne dela ko zacne igro AI"
  );
  console.log(
    "Ko AI nima vec kart je se vedno prikazano, na koncu, kto da ima eno hrbtno karto na voljo"
  );
  console.log("Dodaj congratulatlions sound");
  console.log("zakaj audio e dela prvih par iger?");
  console.log("ai wins dobi zeleno barvo");

  // for( var i=0; i<cars.length; i++ ) {
  //     if( $.cookie(cars[i].id) == undefined ) {
  //         for( var i=0; i<cars.length; i++ ) {
  //             $.cookie(cars[i].id, [cars[i].name, 0,0,0])
  //         }
  //     } else {
  //         var cv = $.cookie(cars[i].id).split(',')
  //         console.log('cv: ', cv)
  //     }
  // }

  // $(getCookies).on('click', function() {
  //     console.error('here')
  //     for( var i=0; i<cars.length; i++ ) {
  //         console.log("$.cookie):", cars[i].id, " :, ", $.cookie(cars[i].id) )
  //     }
  // })

  // $(resetCookies).on('click', function() {
  //     log.warn(' here')
  //     for( var i=0; i<cars.length; i++ ) {
  //         $.cookie(cars[i].id, [cars[i].name, 0,0,0])
  //     }
  // })

  numOfCards = cars.length;

  //#region audio part begin
  loadAudio();
  function loadAudio() {
    var queue = new createjs.LoadQueue();
    createjs.Sound.alternateExtensions = ["mp3"];
    queue.installPlugin(createjs.Sound);
    queue.on("complete", handleCompleteAudio);
    queue.on("error", handleErrorAudio);
    queue.loadFile({
      id: "correct_audio",
      src: "assets/sounds/success_01.mp3",
    });
    queue.loadFile({ id: "wrong_audio", src: "assets/sounds/fail_01.mp3" });
    queue.loadFile({ id: "tie_audio", src: "assets/sounds/urlo_01.mp3" });
    var dfd = $.Deferred();
    function handleCompleteAudio(e) {
      dfd.resolve("sounds ready");
    }
    return dfd.promise();
  }
  window.handleAudio = function (audioFile) {
    var instance = createjs.Sound.play(audioFile);
    if (audioFile == "introSound") {
      window.audioCurrentlyPlaying = true;
      instance.on("complete", handleComplete);
    }
  };
  function handleComplete(e) {
    window.audioCurrentlyPlaying = false;
  }
  function onAudioComplete(e) {
    audioPlayer.off("complete");
  }
  function handleErrorAudio(e) {
    console.log("Error handling audio: ", e);
  }
  //#endregion

  var currentAttrX,
    currentAttrY,
    currentHigherIsBetter,
    xWon = undefined;

  $(document).keypress(function (e1) {
    var key = e1.which;
    if (key == 13) {
      userAction();
    }
  });

  updateCardLengthGraphicView(
    Math.floor(numOfCards / 2),
    Math.floor(numOfCards / 2)
  );
  $(statusText).click(function () {
    userAction();
  });

  function userAction() {
    console.log(" I am inside user action, ", numReturnPressed);

    if (numReturnPressed == 0) {
      $(statusText).empty();
      $(statusText).append("throwing a coin...");

      console.log("temporarily disabled coin thing");
      // setTimeout(function () {
      //   var rand = Math.random();
      //   if (rand < 0.5) {
      //     turnx = true;
      //     $(".coin").css("background-image", 'url("assets/images/cross.png")');
      //     $(".coin").show();
      //     $(statusText).empty();
      //     $(statusText).append("Computer's turn... Hit enter or click me...");
      //     $(statusText).append();
      //   } else {
      //     turnx = false;
      //     $(".coin").css("background-image", 'url("assets/images/head.png")');
      //     $(".coin").show();
      //     $(statusText).empty();
      //     $(statusText).append("Your turn. Hit enter or click me...");
      //   }
      // }, timeoutCoinBegin);
      // setTimeout(function () {
      //   $(".coin").hide();
      // }, timeoutHideCoin);
    } //return pressed==0
    else if (numReturnPressed == 1) {
      // makeMove();
      turnx = true;
      if (turnx) {
        makeAiMove();
      } else {
        listenToUser();
      }
    }
    numReturnPressed++;
  } //user action

  // $("#cardBDeep").click(function(e) {
  //     // na click dela ampak na hover nekako noce dela,t , kot da bi bil kak debounce efekt vmes, delay
  //     // console.log("prva karta spodaj ima z-index 32, ta hoverana karta je ", (numOfCards - e.target.style["z-index"] + 1), ". po vrsti")
  //     console.log("🚀 ~ file: app.js ~ line 620 ~ $ ~ cardX", cardY[(numOfCards - e.target.style["z-index"] + 1)].name )
  // })
  // let els = document.querySelectorAll("#cardBDeep .inner")
  // for(let i=0; i<els.length; i++) {
  //     els[i].addEventListener("mouseenter", function(e) {
  //         console.log("🚀 ~ file: app.js ~ line 493 ~ el.addEventListener ~ e", this)
  //         // console.log("🚀 ~ file: app.js ~ line 620 ~ $ ~ cardX", cardY[(numOfCards - e.target.style["z-index"] + 1)].name )
  //     })
  // }

  $("#checkbox-toggle-button").change(function () {
    if (this.checked) {
      applyBlueTheme();
    } else {
      applyMagentaTheme();
    }
  });

  function applyBlueTheme() {
    $("#wrapper").addClass("blueTheme");
  }

  function applyMagentaTheme() {
    $("#wrapper").removeClass("blueTheme");
  }
}; //window.onload

function updateCardLengthGraphicView(c, d) {
  $("#cardADeep").empty();
  for (var i = 0; i < c - 1; i++) {
    $("#cardADeep").append(
      "<div class='inner' style='z-index:" +
        (numOfCards - i) +
        "; transform: translate(" +
        i * 2 +
        "px, " +
        i * 2 +
        "px)'></div>"
    );
  }
  $("#cardBDeep").empty();
  for (var i = 0; i < d - 1; i++) {
    $("#cardBDeep").append(
      "<div class='inner' style='z-index:" +
        (numOfCards - i) +
        "; transform: translate(" +
        i * 2 +
        "px, " +
        i * 2 +
        "px)'></div>"
    );
  }
}

function fillUpcars() {
  var array = [];
  function Car(
    id,
    name,
    zyl,
    kw,
    ccm,
    kmh,
    img,
    c1,
    c2,
    kajjeto,
    img_x,
    img_y
  ) {
    this.id = id;
    this.name = name;
    this.zyl = zyl;
    this.kw = kw;
    this.ccm = ccm;
    this.kmh = kmh;
    this.img = img;
    this.firstChoice = c1;
    this.secondChoice = c2;
    this.img_x = kajjeto;
    this.img_y = img_x;

    this.duelsWon = 0;
    this.duelsLost = 0;
    this.duelsTie = 0;
    this.toString = function () {
      return (
        this.name +
        " " +
        this.id +
        " " +
        this.zyl +
        " " +
        this.kw +
        " " +
        this.ccm +
        " " +
        this.kmh
      );
    };
    this.addDuelResult = function (r) {
      if (r == "tie") {
        this.duelsTie++;
      } else {
        r == "win" ? this.duelsWon++ : this.duelsLost++;
      }
    };
    this.getDuelStats = function () {
      return (
        "won: " +
        this.duelsWon +
        ", tie: " +
        this.duelsTie +
        ", lost: " +
        this.duelsLost
      );
    };
  }

  for (let i = 0; i < karte.length; i++) {
    var tmp = new Car(
      karte[i][1 - 1],
      karte[i][2 - 1],
      karte[i][3 - 1],
      karte[i][4 - 1],
      karte[i][5 - 1],
      karte[i][6 - 1],
      karte[i][7 - 1],
      karte[i][8 - 1],
      karte[i][9 - 1],
      karte[i][10 - 1],
      karte[i][11 - 1]
    );
    array.push(tmp);
  }

  shuffle(array);
  console.log(
    "%cTemporarily shortened number of cards",
    "background: url(https://www.bing.com/sa/simg/hpc27_2x.png) no-repeat; color: white; font-size: x-large; padding: 20px 40px;"
  );
  array = array.slice(0, 6);
  return array;
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
function delay(t) {
  return new Promise(function (resolve) {
    setTimeout(resolve, t);
  });
}

Promise.delay = function (fn, t) {
  // fn is an optional argument
  if (!t) {
    t = fn;
    fn = function () {};
  }
  return delay(t).then(fn);
};

Promise.prototype.delay = function (fn, t) {
  // return chained promise
  return this.then(function () {
    return Promise.delay(fn, t);
  });
};

function enableUserActions() {
  $("#cardB .val").removeClass("disabled");
}
function disableUserActions() {
  $("#cardB .val").addClass("disabled");
}

$(buttonTestAll).on("click", function () {
  console.log(
    "%c click on buttonTestAll   test / all;",
    "background: yellow; color: black;"
  );
  $.get("http://localhost:3000/api/test/all", function (data, status) {
    console.log("Data: " + data + "\nStatus: " + status);
  });
});

$(buttonTestUser).on("click", function () {
  console.log(
    "%c click on buttonTestUser test/user",
    "color: yellow; background: black;"
  );
  $.get("http://localhost:3000/api/test/user", function (data, status) {
    console.log("Data: " + data + "\nStatus: " + status);
  });
});

$(buttonLoginWrongPassword).on("click", function () {
  console.log(
    "%c click on buttonLoginWrongPassword auth/signin - wrong pwd",
    "background: yellow; color: black;"
  );
  $.post(
    "http://localhost:3000/api/auth/signin",
    {
      data: {
        username: "mod",
        password: "a12345678",
      },
    },
    function (data, status) {
      console.log("Data: " + data + "\nStatus: " + status);
    }
  );
});

$(buttonLoginCorrectPassword).on("click", function () {
  console.log(
    "%c click on buttonLoginCorrectPassword auth/signin - correct pwd",
    "color: yellow; background: black;"
  );
  $.post(
    "http://localhost:3000/api/auth/signin",
    {
      data: {
        username: "username",
        password: "password",
      },
    },
    function (data, status) {
      console.log("Data: " + data + "\nStatus: " + status);
    }
  );
});

$(buttonAccessWithLegalAccount).on("click", function () {
  console.log(
    "%c click on buttonAccessWithLegalAccount test/user legal acc",
    "background: yellow; color: black;"
  );
  $.get("http://localhost:3000/api/test/user", function (data, status) {
    console.log("Data: " + data + "\nStatus: " + status);
  });
});

$(buttonAccessWithLegalAccountMod).on("click", function () {
  console.log(
    "%c click on buttonAccessWithLegalAccountMod test/user legal acc mod",
    "color: yellow; background: black;"
  );
  $.get("http://localhost:3000/api/test/mod", function (data, status) {
    console.log("Data: " + data + "\nStatus: " + status);
  });
});

$(buttonAccessWithLegalAccountAdmin).on("click", function () {
  console.log(
    "%c click on buttonAccessWithLegalAccountAdmin test/user legal acc user",
    "background: yellow; color: black;"
  );
  $.get("http://localhost:3000/api/test/admin", function (data, status) {
    console.log("Data: " + data + "\nStatus: " + status);
  });
});

$(buttonApiAuthAll).on("click", function () {
  console.log(
    "%c click on buttonApiAuthAll",
    "color: yellow; background: black;"
  );
  $.post("http://localhost:3000/api/auth/all", {}, function (data, status) {
    console.log("Data: " + data + "\nStatus: " + status);
  });
});

$(buttonSignup).on("click", function () {
  console.log("%c click on buttonSignup", "background: red; color: black;");
  $.post(
    "http://localhost:3000/user/signup",
    {
      name: $("#register-name").val(),
      email: $("#register-email").val(),
      password: $("#register-password").val(),
      dateOfBirth: "01-01-2000",
    },
    function (data, status) {
      console.log(
        "Data status: " + data.status,
        +"\ndata.message: " + data.message
      );
    }
  );
});

$("#login-btn").on("click", function () {
  $("#register-btn").removeClass("active");
  $(this).addClass("active");
  $("#login-form").removeClass("hide").addClass("show");
  $("#register-form").addClass("hide").removeClass("show");
});

$("#register-btn").on("click", function () {
  $("#login-btn").removeClass("active");
  $(this).addClass("active");
  $("#login-form").addClass("hide").removeClass("show");
  $("#register-form").removeClass("hide").addClass("show");
});

$(".submit-btn").on("click", function (event) {
  event.preventDefault();
  console.log("🚀 ~ file: appSecondVersion.js:1069 ~ submit-btn");
  if ($("#register-btn").hasClass("active")) {
    $.post(
      "http://localhost:3000/user/signup",
      {
        name: $("#register-name").val(),
        email: $("#register-email").val(),
        password: $("#register-password").val(),
        dateOfBirth: "01-01-2000",
      },
      function (data, status) {
        console.log(
          "Data status: " + data.status,
          +"\ndata.message: " + data.message
        );
      }
    );
  } else {
    console.log(
      "🚀 ~ file: appSecondVersion.js:1084 ~ $('#login-email').val():",
      $("#login-email").val()
    );
    console.log(
      "🚀 ~ file: appSecondVersion.js:1086 ~ $('#login-password').val():",
      $("#login-password").val()
    );

    $.post(
      "http://localhost:3000/user/signin",
      {
        email: $("#login-email").val(),
        password: $("#login-password").val(),
      },
      function (data, status) {
        if (data.status === "SUCCESS") {
          $(".login-container").removeClass("active");
          $("#overlay-select-cards").addClass("active");
          modal.find("p").text("Login Success");
          modal.show();
          setTimeout(() => {
            modal.hide();
          }, 5000);
        } else {
          modal.find("p").text(data.message);
          modal.show();
        }
        console.log(
          "Data status: " + data.status,
          +"\ndata.message: " + data.message
        );
      }
    );
  }
});

$(".login-container .close-button").on("click", function () {
  console.log(" here");
  $(".login-container").removeClass("active");
  $("#overlay-select-cards").addClass("active");
});

// When the user clicks on <span> (x), close the modal
span.click(function () {
  modal.hide();
});

// When the user clicks anywhere outside of the modal, close it
$(window).click(function (event) {
  if (event.target == modal[0]) {
    modal.hide();
  }
});

$("#button-user-profile").on("click", function () {
  $("#user-profile").toggleClass("active");
  if ($("#user-profile").hasClass("active")) {
    $.post(
      "http://localhost:3000/user/user-info",
      {
        email: $("#login-email").val(),
      },
      function (data, status) {
        if (data.status === "SUCCESS") {
          modal.find("p").text("User Info loaded successfully");
          modal.show();
        } else {
          modal.find("p").text(data.message);
          modal.show();
        }
        var res = JSON.parse(JSON.stringify(data)).data[0];

        $("#user-profile").find("div").empty();
        $("#user-profile")
          .find("div")
          .append("<p>name: " + res.name + "</p>");
        $("#user-profile")
          .find("div")
          .append("<p>email: " + res.email + "</p>");
        $("#user-profile")
          .find("div")
          .append("<p>date of birth: " + res.dateOfBirth + "</p>");
      }
    );
  }
});

$("#user-profile .close").on("click", function () {
  $("#user-profile").removeClass("active");
});
