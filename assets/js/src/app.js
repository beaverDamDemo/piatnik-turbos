window.onload = function() {
    var numReturnPressed = 0;
    var turnx = true;
    var intelligence = 0.5;
    let numOfUserActions = 0
    $('input[type=range]').change(function() {
        intelligence = $(this).val();
        $('output[name=intelligenceOutput]').val(intelligence+'%');
        intelligence = intelligence / 100;
    });

    $('#loader').removeClass('active')
    $('#wrapper').removeClass('overlayed')

    var cars = [];
    var cardY = [], cardX = [];

    console.warn("Dodaj statistiko za vse avte. pa da preko cookijev ali kej podobnega shranjuje stat.")
    console.warn("Pa dodaj prikaz kvalitete kart, poleg stevila")
    console.warn('dodaj replay capability')
    console.warn('graficni prikaz stevil akart ne dela kadar zacne vodit igro AI ter tudi stevec spodaj ne dela ko zacne igro AI')
    console.warn("Ko AI nima vec kart je se vedno prikazano, na koncu, kto da ima eno hrbtno karto na voljo")
    console.warn("Dodaj congratulatlions sound")
    console.warn("zakaj audio e dela prvih par iger?")
    console.warn('ai wins dobi zeleno barvo')

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
    const numOfCards = cars.length;

    var b1 = true;
    for (var i=0; i<cars.length; i++) {
        if (b1) {
            cardX.push(cars[i]);
            b1 = false;
        }
        else {
            cardY.push(cars[i]);
            b1 = true;
        }
    }

    /**
    *  audio part begin
    */
    loadAudio()

  function loadAudio() {
    let queue = new createjs.LoadQueue();
    createjs.Sound.alternateExtensions = ["mp3"];
    queue.installPlugin(createjs.Sound);
    queue.on("complete", handleCompleteAudio);
    queue.on('error', handleErrorAudio);
      queue.loadFile({id:"correct_audio", src:'assets/sounds/success_01.mp3'});
      queue.loadFile({id:"wrong_audio", src:'assets/sounds/fail_01.mp3'});
      queue.loadFile({id:"tie_audio", src:'assets/sounds/urlo_01.mp3'});
    let dfd = $.Deferred();
    function handleCompleteAudio(e) {
      dfd.resolve('sounds ready');
    }
    return dfd.promise();
  }
  window.handleAudio = function(audioFile) {
    var instance = createjs.Sound.play(audioFile);
    if( audioFile == 'introSound') {
      window.audioCurrentlyPlaying = true;
      instance.on("complete", handleComplete)
    }
  };
  function handleComplete(e) {
    window.audioCurrentlyPlaying = false;
  }
  function onAudioComplete(e) {
    audioPlayer.off("complete");
  };
  function handleErrorAudio(e) {
    console.warn("Error handling audio: ", e);
  }
  /**
  * audio part end
  */

    var currentAttrX, currentAttrY;




    loadCurrentCards()

    $('#cardB').addClass('active')
    //following two events that do the same. click on statusText div and enter (return) hit.
    $(statusText).append('hit enter or click here to continue ...').addClass('active');

    setTimeout(()=>{
        console.log("temporary")
        $(statusText).empty().removeClass('active')
        makeAiMove()
    }, 200)


    $(document).keypress(function(e1) {
        var key = e1.which;
        if (key== 13) {
            userAction();
        }
    });

    updateCardLengthGraphicView(Math.floor(numOfCards/2), Math.floor(numOfCards/2));
    $(statusText).click( function() {
        userAction();
    });

    function userAction() {
        console.log(" I am inside user action, ", numReturnPressed )

        if (numReturnPressed == 0) {
            $(statusText).empty();
            $(statusText).append('throwing a coin...');

            setTimeout(function() {
                var rand = Math.random();
                if (rand < 0.5) {
                    turnx = true;
                    $('.coin').css('background-image', 'url("assets/images/cross.png")');
                    $('.coin').show();
                    $(statusText).empty();
                    $(statusText).append("AI's turn... Hit enter or click me...");
                    $(statusText).append();
                }
                else {
                    turnx = false;
                    $('.coin').css('background-image', 'url("assets/images/head.png")');
                    $('.coin').show();
                    $(statusText).empty();
                    $(statusText).append('Your turn. Hit enter or click me...');
                }
            }, 10);
            setTimeout(function() {
                $('.coin').hide();
            }, 100);
        }//return pressed==0
        else if(numReturnPressed == 1)
        {
            // makeMove();
            turnx = true
            if( turnx ) {
                makeAiMove()
            } else {
                listenToUser()
            }
        }
        numReturnPressed++;
    }//user action

    function userMove() {
        $('details#cara').text(cardX[0].getDuelStats())
        $('details#carb').text(cardY[0].getDuelStats())
        enableUserActions()
        $('#cardB').addClass('active')
        $(statusText).removeClass('active')

        $('#cardB .zyl').unbind('click').click( function() {
            currentAttrY = cardY[0].zyl;
            currentAttrX = cardX[0].zyl;
            $('#cardB .zyl').addClass('active')
            secondPart('zyl')
        });//zyl
        $('#cardB .kw').unbind('click').click( function() {
            currentAttrY = cardY[0].kw;
            currentAttrX = cardX[0].kw;
            $('#cardB .kw').addClass('active')
            secondPart('kw')
        });//kw
         $('#cardB .ccm').unbind('click').click( function() {
            currentAttrY = cardY[0].ccm;
            currentAttrX = cardX[0].ccm;
            $('#cardB .ccm').addClass('active')
            secondPart('ccm')
        });//ccm
        $('#cardB .kmh').unbind('click').click( function() {
            currentAttrY = cardY[0].kmh;
            currentAttrX = cardX[0].kmh;
            $('#cardB .kmh').addClass('active')
            secondPart('kmh')
        });//kmh

        function secondPart(val) {
            numOfUserActions++
            $('#cardA').addClass('active')
            setTimeout(function() {
                $('#cardA .'+val).addClass('active')
            }, 500)
            // setTimeout(function() {
            //     $(statusText).empty().removeClass();
            //     $(statusText).append('Comparing values...');
            //     $(statusText).addClass('active')
            // }, 1000)
            setTimeout(function() {
                compareCards('fromUserMove');
            }, 1000)
            // setTimeout(function() {
            //     $(statusText).removeClass('active')
            //     $(statusText).empty();
            // }, 2000)
        }
    }

    function makeAiMove() {
        $('details#cara').text(cardX[0].getDuelStats())
        $('details#carb').text(cardY[0].getDuelStats())
        $('#cardB').addClass('active')
        disableUserActions()
        $(statusText).removeClass('correct wrong active')
        setTimeout(function() {
            $('#cardA').addClass('active')
        }, 800)

        var tempCurrent = [cardX[0].zyl, cardX[0].kw, cardX[0].ccm, cardX[0].kmh];
        var tempCurrent2 = [cardY[0].zyl, cardY[0].kw, cardY[0].ccm, cardY[0].kmh];

        Promise.delay(firstAiPart, 1150)
        .delay(secondAiPart, 200)
        .delay(fourthAiPart, 200)

        function firstAiPart() {
            if (Math.random() < intelligence) {   //firstChoice
                currentAttrX = tempCurrent[cardX[0].firstChoice];
                currentAttrY = tempCurrent2[cardX[0].firstChoice];

                switch (cardX[0].firstChoice){
                    case 0:
                            $(statusText).empty().append('AI says: '+cardX[0].zyl+' zyl.');
                            $('#cardA .zyl').addClass('active')
                            setTimeout(function() {
                                $('#cardB .zyl').addClass('active')
                            }, 400)
                        break;
                    case 1:
                            $(statusText).empty().append('AI says: '+cardX[0].kw+' kW.');
                            $('#cardA .kw').addClass('active')
                            setTimeout(function() {
                                $('#cardB .kw').addClass('active')
                            }, 400)
                        break;
                    case 2:
                            $(statusText).empty().append('AI says: '+cardX[0].ccm+' ccm.');
                            $('#cardA .ccm').addClass('active')
                            setTimeout(function() {
                                $('#cardB .ccm').addClass('active')
                            }, 400)
                        break;
                    case 3:
                            $(statusText).empty().append('AI says: '+cardX[0].kmh+' km/h.');
                            $('#cardA .kmh').addClass('active')
                            setTimeout(function() {
                                $('#cardB .kmh').addClass('active')
                            }, 400)
                        break;
                    default:
                        console.warn("Unexpected value")
                } //switch end
            }//first choice
            else { //secondChoice
                currentAttrX = tempCurrent[cardX[0].secondChoice];
                currentAttrY = tempCurrent2[cardX[0].secondChoice];

                switch (cardX[0].secondChoice){
                    case 0:
                            $(statusText).empty().append('AI says: '+cardX[0].zyl+' zyl.');
                            $('#cardA .zyl').addClass('active')
                            setTimeout(function() {
                                $('#cardB .zyl').addClass('active')
                            }, 400)
                        break;
                    case 1:
                            $(statusText).empty().append('AI says: '+cardX[0].kw+' kW.');
                            $('#cardA .kw').addClass('active')
                            setTimeout(function() {
                                $('#cardB .kw').addClass('active')
                            }, 400)
                        break;
                    case 2:
                            $(statusText).empty().append('AI says: '+cardX[0].ccm+' ccm.');
                            $('#cardA .ccm').addClass('active')
                            setTimeout(function() {
                                $('#cardB .ccm').addClass('active')
                            }, 400)
                        break;
                    case 3:
                            $(statusText).empty().append('AI says: '+cardX[0].kmh+' km/h.');
                            $('#cardA .kmh').addClass('active')
                            setTimeout(function() {
                                $('#cardB .kmh').addClass('active')
                            }, 400)
                        break;
                    default:
                        console.warn("Unexpected value")
                }
            }//secondChoice
        }

        function secondAiPart() {
            $(statusText).addClass('active')
        }

        function thirdAiPart() {

        }

        function fourthAiPart() {
            compareCards('fromMakeAiMove');
        }
    }

    function loadCurrentCards() {
        $('#cardA .id').html(cardX[0].id);
        $('#cardA .name').html(cardX[0].name);
        $('#cardA .zyl').html(cardX[0].zyl+' zyl');
        $('#cardA .kw').html(cardX[0].kw+' kW');
        $('#cardA .ccm').html(cardX[0].ccm+' ccm');
        $('#cardA .kmh').html(cardX[0].kmh+' km/h');
        $('#cardA img').attr('src', cardX[0].img);
        $('#cardB .id').html(cardY[0].id);
        $('#cardB .name').html(cardY[0].name);
        $('#cardB .zyl').html(cardY[0].zyl+' zyl');
        $('#cardB .kw').html(cardY[0].kw+' kW');
        $('#cardB .ccm').html(cardY[0].ccm+' ccm');
        $('#cardB .kmh').html(cardY[0].kmh+' km/h');
        $('#cardB img').attr('src', cardY[0].img);
    }

    function compareCards(previousMethod) {
        Promise.delay(firstPart, 1400)
        .delay(secondPart, 800)
        .delay(thirdPart, 200)
        .delay(fourthPart, 1000)

// addDuelResult
        function firstPart() {
            if (currentAttrX > currentAttrY) {//AI wins
                cardX[0].addDuelResult('win')
                cardY[0].addDuelResult('lose')
                if( Math.random() < 0.5 ) {
                    cardX.push(cardX[0]);
                    cardX.push(cardY[0]);
                } else {
                    cardX.push(cardY[0]);
                    cardX.push(cardX[0]);
                }
                turnx = true;
                $(statusText).empty().removeClass().append('ai wins.').addClass('wrong');
                $('#cardA .val.active').addClass('correct')
                $('#cardB .val.active').addClass('wrong')
                handleAudio('wrong_audio')
            } else if (currentAttrX < currentAttrY) {
                cardX[0].addDuelResult('lose')
                cardY[0].addDuelResult('win')
                if( Math.random() < 0.5 ) {
                    cardY.push(cardX[0]);
                    cardY.push(cardY[0]);
                } else {
                    cardY.push(cardY[0]);
                    cardY.push(cardX[0]);
                }
                turnx = false;
                $(statusText).empty().removeClass().append('you win.').addClass('correct');
                $('#cardA .val.active').addClass('wrong')
                $('#cardB .val.active').addClass('correct')
                handleAudio('correct_audio')
            } else {
                cardX[0].addDuelResult('tie')
                cardY[0].addDuelResult('tie')
                cardX.push(cardX[0]);
                cardY.push(cardY[0]);
                $(statusText).empty().append("it's a tie.").removeClass('correct wrong')
                $('#cardA .val.active').addClass('tie')
                $('#cardB .val.active').addClass('tie')
                handleAudio('tie_audio')
            }
            cardX.shift();
            cardY.shift();
            $(laba).text('cards ai (x): '+cardX.length);
            $(labb).text('cards user (y): '+cardY.length);
            $(statusText).addClass('active')
        }

        function secondPart() {
            $('.val').removeClass('active wrong correct tie')
            if( cardX.length == 0 ) {
                $('#cardA').hide()
            } else if ( cardY.length == 0 ) {
                $('#cardB').hide()
            }
            $('.card-container').removeClass('active')
        }

        function thirdPart() {
           $(statusText).removeClass('active')
           updateCardLengthGraphicView(cardX.length, cardY.length)
        }

        function fourthPart() {
            if( cardX.length == 0 ) {
                $('.end-game__correct .numOfUserActions').text("number of user actions: "+numOfUserActions)
                $('.end-game__correct').addClass('active')
                // saveCookies(cars)
            } else if ( cardY.length == 0 ) {
                $('.end-game__wrong .numOfUserActions').text("number of user actions: "+numOfUserActions)
                $('.end-game__wrong').addClass('active')
                // saveCookies(cars)
            } else {
               loadCurrentCards()
                if (currentAttrX > currentAttrY) {//AI wins
                    makeAiMove()
                }
                else if (currentAttrX < currentAttrY) {
                    userMove()
                }
                else {
                    if( previousMethod == 'fromUserMove') {
                        userMove()
                    } else {
                        makeAiMove()
                    }
                }
            }

            function saveCookies() {
                console.log("Saving cookies currently disabled")
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
    }//compareCards
}//window.onload

function updateCardLengthGraphicView(c, d) {
    $('#cardADeep').empty()
    for( let i=0; i<c-1; i++ ) {
        $('#cardADeep').append("<div class='inner' style='z-index:"+(32-i)+"; transform: translate("+(i*2)+"px, "+(i*2)+"px)'></div>")
    }
    $('#cardBDeep').empty()
    for( let i=0; i<d-1; i++ ) {
        $('#cardBDeep').append("<div class='inner' style='z-index:"+(32-i)+"; transform: translate("+(i*2)+"px, "+(i*2)+"px)'></div>")
    }
}

function fillUpcars() {
    var array = [];
    function Car(id, name, zyl, kw, ccm, kmh, img, c1, c2)
    {
        this.id = id;
        this.name = name;
        this.zyl = zyl;
        this.kw = kw;
        this.ccm = ccm;
        this.kmh= kmh;
        this.img = img;
        this.firstChoice = c1;
        this.secondChoice = c2;
        this.duelsWon = 0;
        this.duelsLost = 0;
        this.duelsTie = 0;
        this.toString = function() {
            return this.name + ' '+this.id+ ' '+this.zyl+' '+this.kw+' '+this.ccm+' '+this.kmh;
        }
        this.addDuelResult = function(r) {
            if( r == 'tie') {
                this.duelsTie++
            } else {
                r == 'win' ? this.duelsWon++ : this.duelsLost++
            }
        }
        this.getDuelStats = function() {
            return "won: "+this.duelsWon+", tie: "+this.duelsTie+", lost: "+this.duelsLost
        }
    }
    var A1 = new Car('1A', 'Toyota Celica 4 WD', 4, 150, 1998, 230, 'assets/images/cars/toyota_celica.jpeg', 2, 3);
    var B1 = new Car('1B', 'Porsche 939 Turbo', 4, 221, 3300, 260, 'assets/images/cars/p939.jpg', 2, 1);
    var C1 = new Car('1C', 'Opel Manta', 4, 110, 1956, 216.8, 'assets/images/cars/opel_manta.jpg', 3, 0);
    var D1 = new Car('1D', 'Bmw 745i', 6, 185, 3430, 228, 'assets/images/cars/bmw745.jpg', 2, 2);
    var A2 = new Car('2A', 'Porsche 924 Carrera GT', 4, 154.5, 1984, 237, 'assets/images/cars/p924.jpg', 3, 0);
    var B2 = new Car('2B', 'Saab 900', 4, 107, 1985, 195, 'assets/images/cars/saab900.jpg', 0, 2);
    var C2 = new Car('2C', 'Mitsubishi Cordia', 4, 84, 1597, 184, 'assets/images/cars/mitsubishi_cordia.jpg', 0, 2);
    var D2 = new Car('2D', 'Renault 5', 4, 118, 1397, 210, 'assets/images/cars/renault5.jpg', 0, 3);
    var A3 = new Car('3A', 'MG Metro', 4, 69, 1275, 180, 'assets/images/cars/mg_metro.jpg', 0, 0);
    var B3 = new Car('3B', 'Ford Capri', 6, 138, 2793, 210, 'assets/images/cars/ford.jpg', 2, 0);
    var C3 = new Car('3C', 'Mitsubishi Starion', 4, 125, 1996, 220, 'assets/images/cars/mitsubishi_starion.jpg', 0, 3);
    var D3 = new Car('3D', 'Audi Quattro', 5, 147, 2144, 220, 'assets/images/cars/audi_quattro.jpg', 0, 2);
    var A4 = new Car('4A', 'Mazda RX7', 2, 122, 2292, 225, 'assets/images/cars/mazda_rx7.jpg',  2, 3);
    var B4 = new Car('4A', 'Porsche C.', 6, 213, 2687, 165, 'assets/images/cars/911c.jpg', 0, 1);
    var C4 = new Car('4C', 'Citroen CX GTI', 4, 124, 2500, 220, 'assets/images/cars/citroen_cx.jpg', 2, 0);
    var D4 = new Car('4D', 'Audi 100', 5, 121, 2228, 213, 'assets/images/cars/audi_100.jpg', 0, 2);
    var A5 = new Car('5A', 'Lotus Esprit S3', 4, 156, 2172, 244.6, 'assets/images/cars/lotus_esprit.jpg', 3, 0);
    var B5 = new Car('5B', 'TVR 100', 6, 169, 3000, 230, 'assets/images/cars/tvr.jpg', 2, 0);
    var C5 = new Car('5C', 'Fiat UNO 75 i.e. Turbo Kat', 4, 74, 1301, 190, 'assets/images/cars/fiat_uno.jpg', 0, 3);
    var D5 = new Car('5D', 'Lancia Delta HF Integrale', 4, 183, 1981, 215, 'assets/images/cars/lancia_delta.jpg', 1, 0);
    var A6 = new Car('6A', 'Lamborghini Countach LP500S', 12, 276, 4754, 293, 'assets/images/cars/countach.jpg', 0, 2);
    var B6 = new Car('6B', 'Ferrari 308 GTBi-K&#246nig', 8, 232, 2927, 264.7, 'assets/images/cars/308.jpg', 0, 1);
    var C6 = new Car('6C', 'BMW 2002', 4, 265, 1426, 255, 'assets/images/cars/bmw2002.jpg', 1, 3);
    var D6 = new Car('6D', 'Porsche 911 Turbo', 6, 235, 3300, 270, 'assets/images/cars/p911.jpg', 2, 3);
    var A7 = new Car('7A', 'Nissan 300 ZX', 6, 208, 2959, 250, 'assets/images/cars/nissan300.jpg', 2, 1);
    var B7 = new Car('7B', 'Alfetta GTV', 4, 294, 1421, 290, 'assets/images/cars/alfetta-gtv.jpg', 1, 3);
    var C7 = new Car('7C', 'Porsche 934', 6, 441, 2993, 305, 'assets/images/cars/porsche-934.jpg', 1, 3);
    var D7 = new Car('7D', 'Ford Escort', 4, 279, 1427, 270, 'assets/images/cars/ford_escort.jpg', 1, 3);
    var A8 = new Car('8A', 'Ferrari F40', 8, 351, 2936, 324, 'assets/images/cars/f40.jpg', 3, 3);
    var B8 = new Car('8B', 'Ferrari GTB', 8, 198, 3185, 263, 'assets/images/cars/f328.jpg', 0, 2);
    var C8 = new Car('8C', 'Toyota Supra Katarga', 6, 173, 2954, 245, 'assets/images/cars/toyota_supra.jpg', 2, 0);
    var D8 = new Car('8D', 'Porsche 944', 4, 184, 2479, 260, 'assets/images/cars/porsche944.jpg', 3, 2);

    var E1 = new Car('1E', 'Dauer 962', 6, 552, 2994, 406, 'assets/images/cars/dauer-962.jpg', 3, 1);
    var E2 = new Car('2E', 'Volvo 850 T-5R' , 5, 181, 2319, 245, 'assets/images/cars/volvo-850.jpg', 0, 1);
    var E3 = new Car('3E', 'Alfa 164 Turbo 8v', 4, 129, 1995, 225, 'assets/images/cars/alfa-164.jpg', 3, 1);
    var E4 = new Car('4E', 'Ford Escort Cosworth', 4, 167, 1994, 232, 'assets/images/cars/ford-escort-rs.jpg', 2, 0);

    array.push(A1,B1,C1,D1,A2,B2,C2,D2,A3,B3,C3,D3,A4,B4,C4,D4,A5,B5,C5,D5,A6,B6,C6,D6,A7,B7,C7,D7,A8,B8,C8,D8);
    array.push(E1, E2, E3, E4);

    // shuffle(array)
    array.length = 8
     console.log("reduced num")

    return array;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
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
}

Promise.prototype.delay = function (fn, t) {
    // return chained promise
    return this.then(function () {
        return Promise.delay(fn, t);
    });
}

function enableUserActions() {
    $('#cardB .val').removeClass('disabled')
}
function disableUserActions() {
    $('#cardB .val').addClass('disabled')
}