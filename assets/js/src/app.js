let numOfCards = undefined;

window.onload = function () {
  var numReturnPressed = 0;
  var turnx = true;
  var intelligence = 0.5;
  let numOfUserActions = 0;
  $("input[type=range]").change(function () {
    intelligence = $(this).val();
    $("output[name=intelligenceOutput]").val(intelligence + "%");
    intelligence = intelligence / 100;
  });

  $("#loader").removeClass("active");
  $("#wrapper").removeClass("overlayed");

  var cars = [];
  var cardY = [],
    cardX = [];

  console.warn(
    "Dodaj statistiko za vse avte. pa da preko cookijev ali kej podobnega shranjuje stat."
  );
  console.warn("Pa dodaj prikaz kvalitete kart, poleg stevila");
  console.warn("dodaj replay capability");
  console.warn(
    "graficni prikaz stevil akart ne dela kadar zacne vodit igro AI ter tudi stevec spodaj ne dela ko zacne igro AI"
  );
  console.warn(
    "Ko AI nima vec kart je se vedno prikazano, na koncu, kto da ima eno hrbtno karto na voljo"
  );
  console.warn("Dodaj congratulatlions sound");
  console.warn("zakaj audio e dela prvih par iger?");
  console.warn("ai wins dobi zeleno barvo");

  cars = fillUpcars();

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
  //     console.warn(' here')
  //     for( var i=0; i<cars.length; i++ ) {
  //         $.cookie(cars[i].id, [cars[i].name, 0,0,0])
  //     }
  // })

  shuffle(cars);
  numOfCards = cars.length;

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

  /**
   *  audio part begin
   */
  loadAudio();

  function loadAudio() {
    let queue = new createjs.LoadQueue();
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
    let dfd = $.Deferred();
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
    console.warn("Error handling audio: ", e);
  }
  /**
   * audio part end
   */

  var currentAttrX, currentAttrY;

  loadCurrentCards();
  updateUserCardsDetails();

  $("#cardB").addClass("active");
  //following two events that do the same. click on statusText div and enter (return) hit.
  $(statusText)
    .append("hit enter or click here to continue ...")
    .addClass("active");

  setTimeout(() => {
    console.log("temporary");
    $(statusText).empty().removeClass("active");
    makeAiMove();
  }, 200);

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

      setTimeout(function () {
        var rand = Math.random();
        if (rand < 0.5) {
          turnx = true;
          $(".coin").css("background-image", 'url("assets/images/cross.png")');
          $(".coin").show();
          $(statusText).empty();
          $(statusText).append("AI's turn... Hit enter or click me...");
          $(statusText).append();
        } else {
          turnx = false;
          $(".coin").css("background-image", 'url("assets/images/head.png")');
          $(".coin").show();
          $(statusText).empty();
          $(statusText).append("Your turn. Hit enter or click me...");
        }
      }, 10);
      setTimeout(function () {
        $(".coin").hide();
      }, 100);
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
        $("#cardB .zyl").addClass("active");
        secondPart("zyl");
      }); //zyl
    $("#cardB .kw")
      .unbind("click")
      .click(function () {
        currentAttrY = cardY[0].kw;
        currentAttrX = cardX[0].kw;
        $("#cardB .kw").addClass("active");
        secondPart("kw");
      }); //kw
    $("#cardB .ccm")
      .unbind("click")
      .click(function () {
        currentAttrY = cardY[0].ccm;
        currentAttrX = cardX[0].ccm;
        $("#cardB .ccm").addClass("active");
        secondPart("ccm");
      }); //ccm
    $("#cardB .kmh")
      .unbind("click")
      .click(function () {
        currentAttrY = cardY[0].kmh;
        currentAttrX = cardX[0].kmh;
        $("#cardB .kmh").addClass("active");
        secondPart("kmh");
      }); //kmh

    function secondPart(val) {
      numOfUserActions++;
      $("#cardA").addClass("active");
      setTimeout(function () {
        $("#cardA ." + val).addClass("active");
      }, 400);
      // setTimeout(function() {
      //     $(statusText).empty().removeClass();
      //     $(statusText).append('Comparing values...');
      //     $(statusText).addClass('active')
      // }, 1000)
      setTimeout(function () {
        compareCards("fromUserMove");
      }, 900);
      // setTimeout(function() {
      //     $(statusText).removeClass('active')
      //     $(statusText).empty();
      // }, 2000)
    }
  }

  function makeAiMove() {
    $("details#cara").text(cardX[0].getDuelStats());
    $("details#carb").text(cardY[0].getDuelStats());
    $("#cardB").addClass("active");
    disableUserActions();
    $(statusText).removeClass("correct wrong active");
    setTimeout(function () {
      $("#cardA").addClass("active");
    }, 700);

    var tempCurrent = [cardX[0].zyl, cardX[0].kw, cardX[0].ccm, cardX[0].kmh];
    var tempCurrent2 = [cardY[0].zyl, cardY[0].kw, cardY[0].ccm, cardY[0].kmh];

    Promise.delay(firstAiPart, 1050)
      .delay(secondAiPart, 200)
      .delay(fourthAiPart, 200);

    function firstAiPart() {
      if (Math.random() < intelligence) {
        //firstChoice
        currentAttrX = tempCurrent[cardX[0].firstChoice];
        currentAttrY = tempCurrent2[cardX[0].firstChoice];

        switch (cardX[0].firstChoice) {
          case 0:
            $(statusText)
              .empty()
              .append("AI says: " + cardX[0].zyl + " zyl.");
            $("#cardA .zyl").addClass("active");
            setTimeout(function () {
              $("#cardB .zyl").addClass("active");
            }, 300);
            break;
          case 1:
            $(statusText)
              .empty()
              .append("AI says: " + cardX[0].kw + " kW.");
            $("#cardA .kw").addClass("active");
            setTimeout(function () {
              $("#cardB .kw").addClass("active");
            }, 300);
            break;
          case 2:
            $(statusText)
              .empty()
              .append("AI says: " + cardX[0].ccm + " ccm.");
            $("#cardA .ccm").addClass("active");
            setTimeout(function () {
              $("#cardB .ccm").addClass("active");
            }, 300);
            break;
          case 3:
            $(statusText)
              .empty()
              .append("AI says: " + cardX[0].kmh + " km/h.");
            $("#cardA .kmh").addClass("active");
            setTimeout(function () {
              $("#cardB .kmh").addClass("active");
            }, 300);
            break;
          default:
            console.warn("Unexpected value");
        } //switch end
      } //first choice
      else {
        //secondChoice
        currentAttrX = tempCurrent[cardX[0].secondChoice];
        currentAttrY = tempCurrent2[cardX[0].secondChoice];

        switch (cardX[0].secondChoice) {
          case 0:
            $(statusText)
              .empty()
              .append("AI says: " + cardX[0].zyl + " zyl.");
            $("#cardA .zyl").addClass("active");
            setTimeout(function () {
              $("#cardB .zyl").addClass("active");
            }, 300);
            break;
          case 1:
            $(statusText)
              .empty()
              .append("AI says: " + cardX[0].kw + " kW.");
            $("#cardA .kw").addClass("active");
            setTimeout(function () {
              $("#cardB .kw").addClass("active");
            }, 300);
            break;
          case 2:
            $(statusText)
              .empty()
              .append("AI says: " + cardX[0].ccm + " ccm.");
            $("#cardA .ccm").addClass("active");
            setTimeout(function () {
              $("#cardB .ccm").addClass("active");
            }, 300);
            break;
          case 3:
            $(statusText)
              .empty()
              .append("AI says: " + cardX[0].kmh + " km/h.");
            $("#cardA .kmh").addClass("active");
            setTimeout(function () {
              $("#cardB .kmh").addClass("active");
            }, 300);
            break;
          default:
            console.warn("Unexpected value");
        }
      } //secondChoice
    }

    function secondAiPart() {
      $(statusText).addClass("active");
    }

    function thirdAiPart() {}

    function fourthAiPart() {
      compareCards("fromMakeAiMove");
    }
  }

  function loadCurrentCards() {
    $("#cardA .id").html(cardX[0].id);
    $("#cardA .name").html(cardX[0].name);
    $("#cardA .zyl").html(cardX[0].zyl + " zyl");
    $("#cardA .kw").html(cardX[0].kw + " kW");
    $("#cardA .ccm").html(cardX[0].ccm + " ccm");
    $("#cardA .kmh").html(cardX[0].kmh + " km/h");
    $("#cardA img").attr("src", cardX[0].img);
    $("#cardB .id").html(cardY[0].id);
    $("#cardB .name").html(cardY[0].name);
    $("#cardB .zyl").html(cardY[0].zyl + " zyl");
    $("#cardB .kw").html(cardY[0].kw + " kW");
    $("#cardB .ccm").html(cardY[0].ccm + " ccm");
    $("#cardB .kmh").html(cardY[0].kmh + " km/h");
    $("#cardB img").attr("src", cardY[0].img);
  }

  function compareCards(previousMethod) {
    Promise.delay(firstPart, 1300)
      .delay(secondPart, 700)
      .delay(thirdPart, 200)
      .delay(fourthPart, 900);

    // addDuelResult
    function firstPart() {
      if (currentAttrX > currentAttrY) {
        //AI wins
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
          .append("ai wins.")
          .addClass("wrong");
        $("#cardA .val.active").addClass("correct");
        $("#cardB .val.active").addClass("wrong");
        handleAudio("wrong_audio");
      } else if (currentAttrX < currentAttrY) {
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
      } else {
        cardX[0].addDuelResult("tie");
        cardY[0].addDuelResult("tie");
        cardX.push(cardX[0]);
        cardY.push(cardY[0]);
        $(statusText)
          .empty()
          .append("it's a tie.")
          .removeClass("correct wrong");
        $("#cardA .val.active").addClass("tie");
        $("#cardB .val.active").addClass("tie");
        handleAudio("tie_audio");
      }
      cardX.shift();
      cardY.shift();
      $(laba).text("cards ai (x): " + cardX.length);
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
      } else if (cardY.length == 0) {
        $(".end-game__wrong .numOfUserActions").text(
          "number of user actions: " + numOfUserActions
        );
        $(".end-game__wrong").addClass("active");
        // saveCookies(cars)
      } else {
        loadCurrentCards();
        if (currentAttrX > currentAttrY) {
          //AI wins
          makeAiMove();
        } else if (currentAttrX < currentAttrY) {
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
        // for( let i=0; i<cars.length; i++ ) {

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
  function updateUserCardsDetails() {
    $("#userCards").empty();
    for (let i = 0; i < cardY.length; i++) {
      $("#userCards").append("<p>" + cardY[i].name + "</p>");
    }
  }

  $("#checkbox-toggle-button").change(function () {
    console.log(
      "🚀 ~ file: app.js ~ line 508 ~ $ ~ this.checked",
      this.checked
    );
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

  $("#btnSendData").on("click", function () {
    $.ajax({
        url: 'http://localhost:3000/cars/statistics',
        data: {
            "body": " i am the body",
            "key": "value"
        },
        type: 'PUT',
        success: function(result) {
            console.log("⛳ ~ result", result)
        }
    });
  });
}; //window.onload

function updateCardLengthGraphicView(c, d) {
  $("#cardADeep").empty();
  for (let i = 0; i < c - 1; i++) {
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
  for (let i = 0; i < d - 1; i++) {
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
  function Car(id, name, zyl, kw, ccm, kmh, img, c1, c2) {
    this.id = id;
    this.name = name;
    this.zyl = zyl;
    this.kw = kw;
    this.ccm = ccm;
    this.kmh = kmh;
    this.img = img;
    this.firstChoice = c1;
    this.secondChoice = c2;
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
  var A1 = new Car(
    _A1[0],
    _A1[1],
    _A1[2],
    _A1[3],
    _A1[4],
    _A1[5],
    _A1[6],
    _A1[7]
  );
  var B1 = new Car(
    _B1[0],
    _B1[1],
    _B1[2],
    _B1[3],
    _B1[4],
    _B1[5],
    _B1[6],
    _B1[7]
  );
  var C1 = new Car(
    _C1[0],
    _C1[1],
    _C1[2],
    _C1[3],
    _C1[4],
    _C1[5],
    _C1[6],
    _C1[7]
  );
  var D1 = new Car(
    _D1[0],
    _D1[1],
    _D1[2],
    _D1[3],
    _D1[4],
    _D1[5],
    _D1[6],
    _D1[7]
  );
  var A2 = new Car(
    _A2[0],
    _A2[1],
    _A2[2],
    _A2[3],
    _A2[4],
    _A2[5],
    _A2[6],
    _A2[7]
  );
  var B2 = new Car(
    _B2[0],
    _B2[1],
    _B2[2],
    _B2[3],
    _B2[4],
    _B2[5],
    _B2[6],
    _B2[7]
  );
  var C2 = new Car(
    _C2[0],
    _C2[1],
    _C2[2],
    _C2[3],
    _C2[4],
    _C2[5],
    _C2[6],
    _C2[7]
  );
  var D2 = new Car(
    _D2[0],
    _D2[1],
    _D2[2],
    _D2[3],
    _D2[4],
    _D2[5],
    _D2[6],
    _D2[7]
  );
  var A3 = new Car(
    _A3[0],
    _A3[1],
    _A3[2],
    _A3[3],
    _A3[4],
    _A3[5],
    _A3[6],
    _A3[7]
  );
  var B3 = new Car(
    _B3[0],
    _B3[1],
    _B3[2],
    _B3[3],
    _B3[4],
    _B3[5],
    _B3[6],
    _B3[7]
  );
  var C3 = new Car(
    _C3[0],
    _C3[1],
    _C3[2],
    _C3[3],
    _C3[4],
    _C3[5],
    _C3[6],
    _C3[7]
  );
  var D3 = new Car(
    _D3[0],
    _D3[1],
    _D3[2],
    _D3[3],
    _D3[4],
    _D3[5],
    _D3[6],
    _D3[7]
  );
  var A4 = new Car(
    _A4[0],
    _A4[1],
    _A4[2],
    _A4[3],
    _A4[4],
    _A4[5],
    _A4[6],
    _A4[7]
  );
  var B4 = new Car(
    _B4[0],
    _B4[1],
    _B4[2],
    _B4[3],
    _B4[4],
    _B4[5],
    _B4[6],
    _B4[7]
  );
  var C4 = new Car(
    _C4[0],
    _C4[1],
    _C4[2],
    _C4[3],
    _C4[4],
    _C4[5],
    _C4[6],
    _C4[7]
  );
  var D4 = new Car(
    _D4[0],
    _D4[1],
    _D4[2],
    _D4[3],
    _D4[4],
    _D4[5],
    _D4[6],
    _D4[7]
  );
  var A5 = new Car(
    _A5[0],
    _A5[1],
    _A5[2],
    _A5[3],
    _A5[4],
    _A5[5],
    _A5[6],
    _A5[7]
  );
  var B5 = new Car(
    _B5[0],
    _B5[1],
    _B5[2],
    _B5[3],
    _B5[4],
    _B5[5],
    _B5[6],
    _B5[7]
  );
  var C5 = new Car(
    _C5[0],
    _C5[1],
    _C5[2],
    _C5[3],
    _C5[4],
    _C5[5],
    _C5[6],
    _C5[7]
  );
  var D5 = new Car(
    _D5[0],
    _D5[1],
    _D5[2],
    _D5[3],
    _D5[4],
    _D5[5],
    _D5[6],
    _D5[7]
  );
  var A6 = new Car(
    _A6[0],
    _A6[1],
    _A6[2],
    _A6[3],
    _A6[4],
    _A6[5],
    _A6[6],
    _A6[7]
  );
  var B6 = new Car(
    _B6[0],
    _B6[1],
    _B6[2],
    _B6[3],
    _B6[4],
    _B6[5],
    _B6[6],
    _B6[7]
  );
  var C6 = new Car(
    _C6[0],
    _C6[1],
    _C6[2],
    _C6[3],
    _C6[4],
    _C6[5],
    _C6[6],
    _C6[7]
  );
  var D6 = new Car(
    _D6[0],
    _D6[1],
    _D6[2],
    _D6[3],
    _D6[4],
    _D6[5],
    _D6[6],
    _D6[7]
  );
  var A7 = new Car(
    _A7[0],
    _A7[1],
    _A7[2],
    _A7[3],
    _A7[4],
    _A7[5],
    _A7[6],
    _A7[7]
  );
  var B7 = new Car(
    _B7[0],
    _B7[1],
    _B7[2],
    _B7[3],
    _B7[4],
    _B7[5],
    _B7[6],
    _B7[7]
  );
  var C7 = new Car(
    _C7[0],
    _C7[1],
    _C7[2],
    _C7[3],
    _C7[4],
    _C7[5],
    _C7[6],
    _C7[7]
  );
  var D7 = new Car(
    _D7[0],
    _D7[1],
    _D7[2],
    _D7[3],
    _D7[4],
    _D7[5],
    _D7[6],
    _D7[7]
  );
  var A8 = new Car(
    _A8[0],
    _A8[1],
    _A8[2],
    _A8[3],
    _A8[4],
    _A8[5],
    _A8[6],
    _A8[7]
  );
  var B8 = new Car(
    _B8[0],
    _B8[1],
    _B8[2],
    _B8[3],
    _B8[4],
    _B8[5],
    _B8[6],
    _B8[7]
  );
  var C8 = new Car(
    _C8[0],
    _C8[1],
    _C8[2],
    _C8[3],
    _C8[4],
    _C8[5],
    _C8[6],
    _C8[7]
  );
  var D8 = new Car(
    _D8[0],
    _D8[1],
    _D8[2],
    _D8[3],
    _D8[4],
    _D8[5],
    _D8[6],
    _D8[7]
  );

  var E1 = new Car(
    _E1[0],
    _E1[1],
    _E1[2],
    _E1[3],
    _E1[4],
    _E1[5],
    _E1[6],
    _E1[7]
  );
  var E2 = new Car(
    _E2[0],
    _E2[1],
    _E2[2],
    _E2[3],
    _E2[4],
    _E2[5],
    _E2[6],
    _E2[7]
  );
  var E3 = new Car(
    _E3[0],
    _E3[1],
    _E3[2],
    _E3[3],
    _E3[4],
    _E3[5],
    _E3[6],
    _E3[7]
  );
  var E4 = new Car(
    _E4[0],
    _E4[1],
    _E4[2],
    _E4[3],
    _E4[4],
    _E4[5],
    _E4[6],
    _E4[7]
  );

  array.push(
    A1,
    B1,
    C1,
    D1,
    A2,
    B2,
    C2,
    D2,
    A3,
    B3,
    C3,
    D3,
    A4,
    B4,
    C4,
    D4,
    A5,
    B5,
    C5,
    D5,
    A6,
    B6,
    C6,
    D6,
    A7,
    B7,
    C7,
    D7,
    A8,
    B8,
    C8,
    D8
  );
  array.push(E1, E2, E3, E4);

  shuffle(array);
  // array.length = 8
  console.log("reduced num");

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
