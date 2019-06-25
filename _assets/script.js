
window.onload = function() {
    var numReturnPressed = 0;
    var turnx = true;
    var cleanUpBeforeNewRound;
    var intelligence = 0.5;
    $('input[type=range]').change(function() {
        intelligence = $(this).val();
        $('output[name=intelligenceOutput]').val(intelligence+'%');
        intelligence = intelligence / 100;
    });

    $(cardA).css('display', 'none');
    $(cardBackA).css('display', '');
    $(cardB).css('display', 'none');
    $(cardBackB).css('display', ''); 
    //following two events that do the same. click on statusText div and enter (return) hit. 
    $(statusText).append('Hit enter or click me to continue...');
    $(document).keypress(function(e1) {
        var key = e1.which;
        if (key== 13) {
            userAction();
        }
    });
    $(statusText).click( function() {
        userAction();
    });
    function userAction() {
        if (numReturnPressed == 0) {
            $(statusText).empty();
            $(statusText).append('Throwing a coin...');
            setTimeout(function() {
                var rand = Math.random();
                if (rand < 0.5) {
                    turnx = true;
                    $('.coin').css('background-image', 'url("cross.png")');
                    $('.coin').show();
                    $(statusText).empty();
                    $(statusText).append("AI's turn... Hit enter or click me...");
                    $(statusText).append();                   
                }
                else {
                    turnx = false;
                    $('.coin').css('background-image', 'url("head.png")');
                    $('.coin').show();
                    $(statusText).empty();
                    $(statusText).append('Your turn. Hit enter or click me...');
                }
            }, 100);
            setTimeout(function() {
                $('.coin').hide();
            }, 1000);
        }//return pressed==0
        else if(numReturnPressed == 1)
        {
            $(info).append('NUM=1. ');
            makeMove();
        }
        else {
            //hide cards
            $(info).append("NUm>1.");
            if (cleanUpBeforeNewRound == true) {
                $(info).append('Cleaning only.   ');
                $(cardA).css('display', 'none');
                $(cardBackA).css('display', '');
                $(cardB).css('display', 'none');
                $(cardBackB).css('display', '');
                cleanUpBeforeNewRound = false;
            }
            else {
                $(info).append('Making move.   ');
                //alert('cleanupbeforenew round equals false! it shoulnt');
                makeMove();
            } 
        }
        numReturnPressed++;
    }//user action
     
    var cars = [];
    var cardY = [], cardX = [];

    cars = fillUpcars();
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
    shuffle(cars);
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
    var currentAttrX, currentAttrY;
    
    function makeMove()
    {
        $(statusText).empty();
        $(statusText).hide();
        if (turnx == true) {
            //$(statusText).empty();
            //$(statusText).append('X s turn...');
            //read information from cardX[0]. Put these information temporaryl to cardA and select a value.
            $('#cardA .id').html(cardX[0].id);
            $('#cardA .name').html(cardX[0].name);
            $('#cardA .zyl').html(cardX[0].zyl+' zyl');
            $('#cardA .kw').html(cardX[0].kw+' kW');
            $('#cardA .ccm').html(cardX[0].ccm+' ccm');
            $('#cardA .kmh').html(cardX[0].kmh+' km/h');
            $('#cardA img').attr('src', cardX[0].img);
            $(cardA).css('display', '');
            $(cardBackA).css('display', 'none');
            /* displaying Y (users)  card with a delay*/
            $('#cardB .id').html(cardY[0].id);
            $('#cardB .name').html(cardY[0].name);
            $('#cardB .zyl').html(cardY[0].zyl+' zyl');
            $('#cardB .kw').html(cardY[0].kw+' kW');
            $('#cardB .ccm').html(cardY[0].ccm+' ccm');
            $('#cardB .kmh').html(cardY[0].kmh+' km/h');
            $('#cardB img').attr('src', cardY[0].img);
            setTimeout(function() {
                $(cardB).css('display', '');
                $(cardBackB).css('display', 'none');
            }, 400);
            //highlight selected choice on card a with change in font and background-color
            var tempCurrent = [cardX[0].zyl, cardX[0].kw, cardX[0].ccm, cardX[0].kmh];
            var tempCurrent2 = [cardY[0].zyl, cardY[0].kw, cardY[0].ccm, cardY[0].kmh];
            //var temp2 = ['zyl', 'kw', 'ccm', 'kmh'];
            var rand = Math.random();
            if (rand < intelligence) {   //firstChoice
                currentAttrX = tempCurrent[cardX[0].firstChoice];
                currentAttrY = tempCurrent2[cardX[0].firstChoice];
                switch (cardX[0].firstChoice){
                    case 0:
                        setTimeout(function() {
                            $(statusText).append('AI says: '+cardX[0].zyl+' zyl.');
                            $(statusText).show();
                            $('#cardA .zyl').css('font-weight', 'bold');
                            $('#cardA .zyl').css('color', 'white');
                            $('#cardA .zyl').css('background-color', 'rgb(255, 26, 140)');
                        }, 633);
                        setTimeout( function() {
                            $('#cardB .zyl').css('background-color', 'yellow');
                        }, 1033);
                        setTimeout(function() {
                            $(statusText).empty();
                            $(statusText).hide();
                        }, 2133);
                        break;
                    case 1:
                        setTimeout(function() {
                            $(statusText).append('AI says: '+cardX[0].kw+' kW.');
                            $(statusText).show();
                            $('#cardA .kw').css('font-weight', 'bold');
                            $('#cardA .kw').css('color', 'white');
                            $('#cardA .kw').css('background-color', 'rgb(255, 26, 140)');
                        }, 633);
                             setTimeout( function() {
                            $('#cardB .kw').css('background-color', 'yellow');
                        }, 1033);
                        setTimeout(function() {
                            $(statusText).empty();
                            $(statusText).hide();
                        }, 2133);
                        break;
                    case 2:
                        setTimeout(function() {
                            $(statusText).append('AI says: '+cardX[0].ccm+' ccm.');
                            $(statusText).show();
                            $('#cardA .ccm').css('font-weight', 'bold');
                            $('#cardA .ccm').css('color', 'white');
                            $('#cardA .ccm').css('background-color', 'rgb(255, 26, 140)');
                        }, 633);
                        setTimeout( function() {
                            $('#cardB .ccm').css('background-color', 'yellow');
                        }, 1033);
                        setTimeout(function() {
                            $(statusText).empty();
                            $(statusText).hide();
                        },2133);
                        break;
                    case 3:
                        setTimeout(function() {
                            $(statusText).append('AI says: '+cardX[0].kmh+' km/h.');
                            $(statusText).show();
                            $('#cardA .kmh').css('font-weight', 'bold');
                            $('#cardA .kmh').css('color', 'white');
                            $('#cardA .kmh').css('background-color', 'rgb(255, 26, 140)');
                        }, 633);
                        setTimeout( function() {
                            $('#cardB .kmh').css('background-color', 'yellow');
                        }, 1033);
                        setTimeout(function() {
                            $(statusText).empty();
                            $(statusText).hide();
                        }, 2133);
                        
                        break;
                    default:
                        setTimeout(function() {
                            $(statusText).append('AI says: '+cardX[0].zyl+' zyl.');
                            $(statusText).show();
                            $('#cardA .zyl').css('font-weight', 'bold');
                           $('#cardA .zyl').css('color', 'white');
                           $('#cardA .zyl').css('background-color', 'rgb(255, 26, 140)');
                        }, 633);
                        setTimeout( function() {
                            $('#cardB.zyl').css('background-color', 'yellow');
                        }, 1033);
                        setTimeout(function() {
                            $(statusText).empty();
                            $(statusText).hide();
                        }, 2133);                  
                        break;
                }
            }//first choice
            else { //secondChoice
                currentAttrX = tempCurrent[cardX[0].secondChoice];
                currentAttrY = tempCurrent2[cardX[0].secondChoice];
                switch (cardX[0].secondChoice){
                    case 0:                   
                        setTimeout(function() {
                            $(statusText).append('AI says: '+cardX[0].zyl+' zyl.');
                            $(statusText).show();
                            $('#cardA .zyl').css('font-weight', 'bold');
                            $('#cardA .zyl').css('color', 'white');
                            $('#cardA .zyl').css('background-color', 'rgb(255, 26, 140)');
                        }, 633);
                        setTimeout( function() {
                            $('#cardB .zyl').css('background-color', 'yellow');
                        }, 1033);
                        setTimeout(function() {
                            $(statusText).empty();
                            $(statusText).hide();
                        }, 2133);
                        break;
                    case 1:                    
                        setTimeout(function() {
                            $(statusText).append('AI says: '+cardX[0].kw+' kW.');
                            $(statusText).show();
                            $('#cardA .kw').css('font-weight', 'bold');
                            $('#cardA .kw').css('color', 'white');
                            $('#cardA .kw').css('background-color', 'rgb(255, 26, 140)');
                        }, 633);
                        setTimeout( function() {
                            $('#cardB .kw').css('background-color', 'yellow');
                        }, 1033);
                        setTimeout(function() {
                            $(statusText).empty();
                            $(statusText).hide();
                        }, 2133);
                        break;
                    case 2:                     
                        setTimeout(function() {
                            $(statusText).append('AI says: '+cardX[0].ccm+' ccm.');
                            $(statusText).show();
                            $('#cardA .ccm').css('font-weight', 'bold');
                            $('#cardA .ccm').css('color', 'white');
                            $('#cardA .ccm').css('background-color', 'rgb(255, 26, 140)');
                        }, 633);
                        setTimeout( function() {
                            $('#cardB .ccm').css('background-color', 'yellow');
                        }, 1033);
                        setTimeout(function() {
                            $(statusText).empty();
                            $(statusText).hide();
                        }, 2133);
                        break;
                    case 3:                       
                        setTimeout(function() {
                            $(statusText).append('AI says: '+cardX[0].kmh+' km/h.');
                            $(statusText).show();
                            $('#cardA .kmh').css('font-weight', 'bold');
                            $('#cardA .kmh').css('color', 'white');
                            $('#cardA .kmh').css('background-color', 'rgb(255, 26, 140)');
                        }, 633);
                        setTimeout( function() {
                            $('#cardB .kmh').css('background-color', 'yellow');
                        }, 1033);
                        setTimeout(function() {
                            $(statusText).empty();
                            $(statusText).hide();
                        }, 2133);
                        break;
                    default:          
                        setTimeout(function() {
                            $(statusText).append('AI says: '+cardX[0].zyl+' zyl.');
                            $(statusText).show();
                            $('#cardA .zyl').css('font-weight', 'bold');
                            $('#cardA .zyl').css('color', 'white');
                            $('#cardA .zyl').css('background-color', 'rgb(255, 26, 140)');
                        }, 633);
                        setTimeout( function() {
                            $('#cardB .zyl').css('background-color', 'yellow');
                        }, 1033);
                        setTimeout(function() {
                            $(statusText).empty();
                            $(statusText).hide();
                        }, 2133);
                        break;
                }
            }//secondChoice
            cleanUpBeforeNewRound = true;
            compareCards();
            //set timeout and show some info on statusText
            //move cards with array. push, select who's on turn
        }//turnx
        /*
         *   TURN Y USER S ON TURN
         */
        else {
            //read information from cardX[0]. Put these information temporaryl to cardA and select a value.
            $('#cardA .id').html(cardX[0].id);
            $('#cardA .name').html(cardX[0].name);
            $('#cardA .zyl').html(cardX[0].zyl+' zyl');
            $('#cardA .kw').html(cardX[0].kw+' kW');
            $('#cardA .ccm').html(cardX[0].ccm+' ccm');
            $('#cardA .kmh').html(cardX[0].kmh+' km/h');
            $('#cardA img').attr('src', cardX[0].img);
            $(cardA).css('display', 'none');
            $(cardBackA).css('display', '');
            /* displaying Y (users)  card with a delay*/
            $('#cardB .id').html(cardY[0].id);
            $('#cardB .name').html(cardY[0].name);
            $('#cardB .zyl').html(cardY[0].zyl+' zyl');
            $('#cardB .kw').html(cardY[0].kw+' kW');
            $('#cardB .ccm').html(cardY[0].ccm+' ccm');
            $('#cardB .kmh').html(cardY[0].kmh+' km/h');
            $('#cardB img').attr('src', cardY[0].img);
            resetHighlights();//if it wasnt in this position it didnt work out. Dunno why. 
            $(cardB).css('display', '');
            $(cardBackB).css('display', 'none');
            $(statusText).append('Click on an attribute on your (right) card.');
            $(statusText).show();
            setTimeout(function() {
                $(statusText).hide();
            },1833);
            //setting some styling for when the user hovers over possible items
            $('#cardB .zyl, .kw, .ccm, .kmh').css('cursor', 'pointer');
            $('#cardB .zyl').hover(function() {
                $(this).css('font-weight', 'bold');
            }, function() {
                $(this).css('font-weight', 'normal');});          
             $('#cardB .kw').hover(function() {
                $(this).css('font-weight', 'bold');
            }, function() {
                $(this).css('font-weight', 'normal');});        
            $('#cardB .ccm').hover(function() {
                $(this).css('font-weight', 'bold');
            }, function() {
                $(this).css('font-weight', 'normal');});     
             $('#cardB .kmh').hover(function() {
                $(this).css('font-weight', 'bold');
            }, function() {
                $(this).css('font-weight', 'normal');});
            //how wait for the event to occur OR for keyboard input. just ignore if the user hits enter
            //all that events here are driven when the user clicks his choice
            $('#cardB .zyl').unbind('click').click( function() {
                currentAttrY = cardY[0].zyl;
                currentAttrX = cardX[0].zyl;
                $('#cardA .zyl').css('background-color', 'yellow');
                $('#cardA .zyl').css('font-weight', 'bold');
                $(cardA).css('display', '');
                $(cardBackA).css('display', 'none');
                $(statusText).empty();
                $(statusText).append('Comparing values...');
                $(statusText).show();
                setTimeout(function() {
                    $(statusText).hide();
                    $(statusText).empty();  
                }, 1000);
                compareCards();
                cleanUpBeforeNewRound = true; 
            });//zyl
            $('#cardB .kw').unbind('click').click( function() {
                currentAttrY = cardY[0].kw;
                currentAttrX = cardX[0].kw;
                $('#cardA .kw').css('background-color', 'yellow');
                $('#cardA .kw').css('font-weight', 'bold');
                $(cardA).css('display', '');
                $(cardBackA).css('display', 'none');
                $(statusText).empty();
                $(statusText).append('Comparing values...');
                $(statusText).show();
                setTimeout(function() {
                    $(statusText).hide();
                    $(statusText).empty();  
                }, 1000);
                compareCards();
                cleanUpBeforeNewRound = true; 
            });//kw
             $('#cardB .ccm').unbind('click').click( function() {
                currentAttrY = cardY[0].ccm;
                currentAttrX = cardX[0].ccm;
                $('#cardA .ccm').css('background-color', 'yellow');
                $('#cardA .ccm').css('font-weight', 'bold');
                $(cardA).css('display', '');
                $(cardBackA).css('display', 'none');
                $(statusText).empty();
                $(statusText).append('Comparing values...');
                $(statusText).show();
                compareCards();
                cleanUpBeforeNewRound = true; 
                setTimeout(function() {
                    $(statusText).hide();
                    $(statusText).empty();  
                }, 1000);
            });//ccm
            $('#cardB .kmh').unbind('click').click( function() {
                currentAttrY = cardY[0].kmh;
                currentAttrX = cardX[0].kmh;
                $('#cardA .kmh').css('background-color', 'yellow');
                $('#cardA .kmh').css('font-weight', 'bold');
                $(cardA).css('display', '');
                $(cardBackA).css('display', 'none');
                $(statusText).empty();
                $(statusText).append('Comparing values...');
                $(statusText).show();
               compareCards();
               cleanUpBeforeNewRound = true; 
                setTimeout(function() {
                    $(statusText).hide();
                    $(statusText).empty();  
                }, 1000);
            });//kmh
            //highlight selected choice on card a with change in font and background-color
            //we ll try to move that function later when everything will be working    
        }//turny        
        
        function compareCards() {
            $(info).append('Compare cards called.   ');
          $(statusText).empty();
            //compare values
                if (currentAttrX > currentAttrY) {//AI wins
                    setTimeout(function() {
                        cardX.push(cardY[0]);
                        cardX.push(cardX[0]);
                        cardX.shift();
                        cardY.shift();
                        turnx = true;
                        $(statusText).empty();
                        $(statusText).append('AI wins. Press enter or click me to continue...');
                        $(laba).text('Cards AI(X): '+cardX.length);
                        $(labb).text('Cards User(Y): '+cardY.length);
                        if (cardY.length == 0) {
                            $(info).append('AI won.');
                        }
                        $(statusText).show();   
                    }, 700);
                 //code
                }
                else if (currentAttrX < currentAttrY) {
                    setTimeout(function() {
                        cardY.push(cardX[0]);
                        cardY.push(cardY[0]);
                        cardX.shift();
                        cardY.shift();
                        turnx = false;
                        $(statusText).empty();
                        $(statusText).append('You win. Press enter or click me to continue...');
                        $(laba).text('Cards AI(X): '+cardX.length);
                        $(labb).text('Cards User(Y): '+cardY.length);
                        if (cardX.length == 0) {
                            $(info).append('You won.');
                        }
                        $(statusText).show();
                    }, 700);
                }
                else {
                    setTimeout(function() {
                        /*
                         * temporarly we ll just move these cards on the back
                         **/
                        cardX.push(cardX[0]);
                        cardX.shift();
                        cardY.push(cardY[0]);
                        cardY.shift();
                        $(statusText).empty();
                        $(statusText).append("It's a tie. Press enter or click me to continue...");
                        $(laba).text('Cards AI(X): '+cardX.length);
                        $(labb).text('Cards User(Y): '+cardY.length);
                        $(statusText).show();
                    }, 700);
                      //reset both cards highlighted attributes
                }
                $('#cardA .zyl, .kw, .ccm, .kmh').css('background-color', 'rgb(247, 247, 246)');
                $('#cardA .zyl, .kw, .ccm, .kmh').css('font-weight', 'normal');
                $('#cardA .zyl, .kw, .ccm, .kmh').css('color', 'rgb(255, 26, 140)');
                $('#cardB .zyl, .kw, .ccm, .kmh').css('background-color', 'rgb(247, 247, 246)');
                $('#cardB .zyl, .kw, .ccm, .kmh').css('font-weight', 'normal');
                $('#cardB .zyl, .kw, .ccm, .kmh').css('color', 'rgb(255, 26, 140)');
               cleanUpBeforeNewRound = true;
        }//compareCards
    }//function makemove
}//window.onload

function resetHighlights() {
    $('#cardA .zyl, .kw, .ccm, .kmh').css('background-color', 'rgb(247, 247, 246)');
    $('#cardA .zyl, .kw, .ccm, .kmh').css('font-weight', 'normal');
    $('#cardA .zyl, .kw, .ccm, .kmh').css('color', 'rgb(255, 26, 140)');
    $('#cardB .zyl, .kw, .ccm, .kmh').css('background-color', 'rgb(247, 247, 246)');
    $('#cardB .zyl, .kw, .ccm, .kmh').css('font-weight', 'normal');
    $('#cardB .zyl, .kw, .ccm, .kmh').css('color', 'rgb(255, 26, 140)');    
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
        this.toString = function() {
            return this.name + ' '+this.id+ ' '+this.zyl+' '+this.kw+' '+this.ccm+' '+this.kmh;
        }
    }
    var A1 = new Car('1A', 'Toyota Celica 4 WD', 4, 150, 1998, 230, 'pics/toyota_celica.jpeg', 2, 3);
    var B1 = new Car('1B', 'Porsche 939 Turbo', 4, 221, 3300, 260, 'pics/p939.jpg', 2, 1);
    var C1 = new Car('1C', 'Opel Manta', 4, 110, 1956, 216.8, 'pics/opel_manta.jpg', 3, 0);
    var D1 = new Car('1D', 'Bmw 745i', 6, 185, 3430, 228, 'pics/bmw745.jpg', 2, 0);
    var A2 = new Car('2A', 'Porsche 924 Carrera GT', 4, 154.5, 1984, 237, 'pics/p924.jpg', 3, 0);
    var B2 = new Car('2B', 'Saab 900', 4, 107, 1985, 195, 'pics/saab900.jpg', 0, 2);
    var C2 = new Car('2C', 'Mitsubishi Cordia', 4, 84, 1597, 184, 'pics/mitsubishi_cordia.jpg', 0, 2);
    var D2 = new Car('2D', 'Renault 5', 4, 118, 1397, 210, 'pics/renault5.jpg', 0, 3);
    var A3 = new Car('3A', 'MG Metro', 4, 69, 1275, 180, 'pics/mg_metro.jpg', 0, 0);
    var B3 = new Car('3B', 'Ford Capri', 6, 138, 2793, 210, 'pics/ford.jpg', 2, 0);
    var C3 = new Car('3C', 'Mitsubishi Starion', 4, 125, 1996, 220, 'pics/mitsubishi_starion.jpg', 0, 3);
    var D3 = new Car('3D', 'Audi Quattro', 5, 147, 2144, 220, 'pics/audi_quattro.jpg', 0, 2);
    var A4 = new Car('4A', 'Mazda RX7', 2, 122, 2292, 225, 'pics/mazda_rx7.jpg',  2, 3);
    var B4 = new Car('4A', 'Porsche C.', 6, 213, 2687, 165, 'pics/911c.jpg', 0, 1);
    var C4 = new Car('4C', 'Citroen CX GTI', 4, 124, 2500, 220, 'pics/citroen_cx.jpg', 2, 0);
    var D4 = new Car('4D', 'Audi 100', 5, 121, 2228, 213, 'pics/audi_100.jpg', 0, 2);
    var A5 = new Car('5A', 'Lotus Esprit S3', 4, 156, 2172, 244.6, 'pics/lotus_esprit.jpg', 3, 0);
    var B5 = new Car('5B', 'TVR 100', 6, 169, 3000, 230, 'pics/tvr.jpg', 2, 0);
    var C5 = new Car('5C', 'Fiat UNO 75 i.e. Turbo Kat', 4, 74, 1301, 190, 'pics/fiat_uno.jpg', 0, 3);
    var D5 = new Car('5D', 'Lancia Delta HF Integrale', 4, 183, 1981, 215, 'pics/lancia_delta.jpg', 1, 0);
    var A6 = new Car('6A', 'Lamborghini Countach QV', 12, 332, 5167, 306, 'pics/countach.jpg', 0, 2);
    var B6 = new Car('6B', 'Ferrari 308 GTBi-K&#246nig', 8, 232, 2927, 264.7, 'pics/308.jpg', 0, 1);
    var C6 = new Car('6C', 'BMW 2002', 4, 265, 1426, 255, 'pics/bmw2002.jpg', 1, 3);
    var D6 = new Car('6D', 'Porsche 911 Turbo', 6, 235, 3300, 270, 'pics/p911.jpg', 2, 3);
    var A7 = new Car('7A', 'Nissan 300 ZX', 6, 208, 2959, 250, 'pics/nissan300.jpg', 2, 1);
    var B7 = new Car('7B', 'Alfetta GTV', 4, 294, 1421, 290, 'pics/alfetta.jpg', 1, 3);
    var C7 = new Car('7C', 'Porsche 934', 6, 441, 2993, 305, 'pics/p934.jpg', 1, 3);
    var D7 = new Car('7D', 'Ford Escort', 4, 279, 1427, 270, 'pics/ford_escort.jpg', 1, 3);
    var A8= new Car('8A', 'Ferrari F40', 8, 351, 2936, 324, 'pics/f40.jpg', 3, 1);
    var B8 = new Car('8B', 'Ferrari GTB', 8, 198, 3185, 263, 'pics/f328.jpg', 0, 2);
    var C8 = new Car('8C', 'Toyota Supra Katarga', 6, 173, 2954, 245, 'pics/toyota_supra.jpg', 2, 0);
    var D8 = new Car('8D', 'Porsche 944', 4, 184, 2479, 260, 'pics/porsche944.jpg', 3, 2);
    var E1 = new Car('1E', 'Porsche 962', 6, 552, 2994, 406, 'pics/default.jpg', 3, 1);
    var E2 = new Car('2E', 'Ferrari Testarossa' ,12, 286, 4942, 293, 'pics/default.jpg', 2, 0);
    var E3 = new Car('3E', 'Ferrari 365GTB/4 Daytona', 12, 260, 4390, 280, 'pics/default.jpg', 2, 0);
    var E4 = new Car('4E', 'Ferrari 348TB', 8, 221, 3405, 275, 2, 0);
    var E5 = new Car('5E', 'ABT audi A4', 4, 227, 1998, 260, 1, 3);
    array.push(A1,B1,C1,D1,A2,B2,C2,D2,A3,B3,C3,D3,A4,B4,C4,D4,A5,B5,C5,D5,A6,B6,C6,D6,A7,B7,C7,D7,A8,B8,C8,D8, E4, E5);
    //array.push(E1, E2, E3);
    return array;
}
