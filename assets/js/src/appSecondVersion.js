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
        disableUserActions();
        secondPart("zyl");
      }); //zyl
    $("#cardB .kw")
      .unbind("click")
      .click(function () {
        currentAttrY = cardY[0].kw;
        currentAttrX = cardX[0].kw;
        $("#cardB .kw").addClass("active");
        disableUserActions();
        secondPart("kw");
      }); //kw
    $("#cardB .ccm")
      .unbind("click")
      .click(function () {
        currentAttrY = cardY[0].ccm;
        currentAttrX = cardX[0].ccm;
        $("#cardB .ccm").addClass("active");
        disableUserActions();
        secondPart("ccm");
      }); //ccm
    $("#cardB .kmh")
      .unbind("click")
      .click(function () {
        currentAttrY = cardY[0].kmh;
        currentAttrX = cardX[0].kmh;
        $("#cardB .kmh").addClass("active");
        disableUserActions();
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
              .append("AI says: " + cardX[0].zyl + " " + propertiesUnits[1] + ".");
            $("#cardA .zyl").addClass("active");
            setTimeout(function () {
              $("#cardB .zyl").addClass("active");
            }, 300);
            break;
          case 1:
            $(statusText)
              .empty()
              .append("AI says: " + cardX[0].kw + " " + propertiesUnits[2] + ".");
            $("#cardA .kw").addClass("active");
            setTimeout(function () {
              $("#cardB .kw").addClass("active");
            }, 300);
            break;
          case 2:
            $(statusText)
              .empty()
              .append("AI says: " + cardX[0].ccm + " " + propertiesUnits[3] + ".");
            $("#cardA .ccm").addClass("active");
            setTimeout(function () {
              $("#cardB .ccm").addClass("active");
            }, 300);
            break;
          case 3:
            $(statusText)
              .empty()
              .append("AI says: " + cardX[0].kmh + " " + propertiesUnits[4] + ".");
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
    $(".card .inner tr:nth-child(1) td").html(propertiesLabels[1]);
    $(".card .inner tr:nth-child(2) td").html(propertiesLabels[2]);
    $(".card .inner tr:nth-child(3) td").html(propertiesLabels[3]);
    $(".card .inner tr:nth-child(4) td").html(propertiesLabels[4]);

    $("#cardA .id").html(cardX[0].id);
    $("#cardA .name").html(cardX[0].name);
    $("#cardA .zyl").html(cardX[0].zyl + " " + propertiesUnits[1]);
    $("#cardA .kw").html(cardX[0].kw + " " + propertiesUnits[2]);
    $("#cardA .ccm").html(cardX[0].ccm + " " + propertiesUnits[3]);
    $("#cardA .kmh").html(cardX[0].kmh + " " + propertiesUnits[4]);
    $("#cardA img").attr("src", cardX[0].img);
    $("#cardA .img").attr(
      "style",
      'background: url("' +
        cardX[0].img +
        '"); background-size: contain'
    );

    $("#cardB .id").html(cardY[0].id);
    $("#cardB .name").html(cardY[0].name);
    $("#cardB .zyl").html(cardY[0].zyl + " " + propertiesUnits[1]);
    $("#cardB .kw").html(cardY[0].kw + " " + propertiesUnits[2]);
    $("#cardB .ccm").html(cardY[0].ccm + " " + propertiesUnits[3]);
    $("#cardB .kmh").html(cardY[0].kmh + " " + propertiesUnits[4]);
    $("#cardB .img").attr(
      "style",
      'background: url("' +
        cardY[0].img +
        '"); background-size: contain'
    );
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
    console.log("this.id: ", this.id);
    this.name = name;
    console.log("this.name: ", this.name);
    this.zyl = zyl;
    console.log("this.zyl: ", this.zyl);
    this.kw = kw;
    console.log("this.kw: ", this.kw);
    this.ccm = ccm;
    console.log("this.ccm: ", this.ccm);
    this.kmh = kmh;
    console.log("this.kmh: ", this.kmh);
    this.img = img;
    console.log("this.img: ", this.img);
    this.firstChoice = c1;
    console.log("this.firstChoice: ", this.firstChoice);
    this.secondChoice = c2;
    console.log("this.secondChoice: ", this.secondChoice);

    console.log("kajjetox: ", kajjeto);

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
