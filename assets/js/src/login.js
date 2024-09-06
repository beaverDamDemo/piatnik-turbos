$(buttonTestAll).on('click', function () {
  console.log(
    '%c click on buttonTestAll   test / all;',
    'background: yellow; color: black;',
  );
  $.get(
    'https://tothepointcodeloginexpressjs.onrender.com/api/test/all',
    function (data, status) {
      console.log('Data: ' + data + '\nStatus: ' + status);
    },
  );
});

$(buttonTestUser).on('click', function () {
  console.log(
    '%c click on buttonTestUser test/user',
    'color: yellow; background: black;',
  );
  $.get(
    'https://tothepointcodeloginexpressjs.onrender.com/api/test/user',
    function (data, status) {
      console.log('Data: ' + data + '\nStatus: ' + status);
    },
  );
});

$(buttonLoginWrongPassword).on('click', function () {
  console.log(
    '%c click on buttonLoginWrongPassword auth/signin - wrong pwd',
    'background: yellow; color: black;',
  );
  $.post(
    'https://tothepointcodeloginexpressjs.onrender.com/api/auth/signin',
    {
      data: {
        username: 'mod',
        password: 'a12345678',
      },
    },
    function (data, status) {
      console.log('Data: ' + data + '\nStatus: ' + status);
    },
  );
});

$(buttonLoginCorrectPassword).on('click', function () {
  console.log(
    '%c click on buttonLoginCorrectPassword auth/signin - correct pwd',
    'color: yellow; background: black;',
  );
  $.post(
    'https://tothepointcodeloginexpressjs.onrender.com/api/auth/signin',
    {
      data: {
        username: 'username',
        password: 'password',
      },
    },
    function (data, status) {
      console.log('Data: ' + data + '\nStatus: ' + status);
    },
  );
});

$(buttonAccessWithLegalAccount).on('click', function () {
  console.log(
    '%c click on buttonAccessWithLegalAccount test/user legal acc',
    'background: yellow; color: black;',
  );
  $.get(
    'https://tothepointcodeloginexpressjs.onrender.com/api/test/user',
    function (data, status) {
      console.log('Data: ' + data + '\nStatus: ' + status);
    },
  );
});

$(buttonAccessWithLegalAccountMod).on('click', function () {
  console.log(
    '%c click on buttonAccessWithLegalAccountMod test/user legal acc mod',
    'color: yellow; background: black;',
  );
  $.get(
    'https://tothepointcodeloginexpressjs.onrender.com/api/test/mod',
    function (data, status) {
      console.log('Data: ' + data + '\nStatus: ' + status);
    },
  );
});

$(buttonAccessWithLegalAccountAdmin).on('click', function () {
  console.log(
    '%c click on buttonAccessWithLegalAccountAdmin test/user legal acc user',
    'background: yellow; color: black;',
  );
  $.get(
    'https://tothepointcodeloginexpressjs.onrender.com/api/test/admin',
    function (data, status) {
      console.log('Data: ' + data + '\nStatus: ' + status);
    },
  );
});

$(buttonApiAuthAll).on('click', function () {
  console.log(
    '%c click on buttonApiAuthAll',
    'color: yellow; background: black;',
  );
  $.post(
    'https://tothepointcodeloginexpressjs.onrender.com/api/auth/all',
    {},
    function (data, status) {
      console.log('Data: ' + data + '\nStatus: ' + status);
    },
  );
});

$(buttonSignup).on('click', function () {
  console.log('%c click on buttonSignup', 'background: red; color: black;');
  $.post(
    'https://tothepointcodeloginexpressjs.onrender.com/user/signup',
    {
      name: $('#register-name').val(),
      email: $('#register-email').val(),
      password: $('#register-password').val(),
      dateOfBirth: '01-01-2000',
    },
    function (data, status) {
      console.log(
        'Data status: ' + data.status,
        +'\ndata.message: ' + data.message,
      );
    },
  );
});

$('#login-btn').on('click', function () {
  $('#register-btn').removeClass('active');
  $(this).addClass('active');
  $('#login-form').removeClass('hide').addClass('show');
  $('#register-form').addClass('hide').removeClass('show');
});

$('#register-btn').on('click', function () {
  $('#login-btn').removeClass('active');
  $(this).addClass('active');
  $('#login-form').addClass('hide').removeClass('show');
  $('#register-form').removeClass('hide').addClass('show');
});

$('.submit-btn').on('click', function (event) {
  event.preventDefault();
  if ($('#register-btn').hasClass('active')) {
    $.post(
      'https://tothepointcodeloginexpressjs.onrender.com/user/signup',
      {
        name: $('#register-name').val(),
        email: $('#register-email').val(),
        password: $('#register-password').val(),
        dateOfBirth: '01-01-2000',
      },
      function (data, status) {
        console.log(
          'Data status: ' + data.status,
          +'\ndata.message: ' + data.message,
        );
      },
    );
  } else {
    $.post(
      'https://tothepointcodeloginexpressjs.onrender.com/user/signin',
      {
        email: $('#login-email').val(),
        password: $('#login-password').val(),
      },
      function (data, status) {
        if (data.status === 'SUCCESS') {
          $('.login-container').removeClass('active');
          $('#overlay-select-cards').addClass('active');
          modal.find('p').text('Login Success');
          modal.show();
          setTimeout(() => {
            modal.hide();
          }, 3500);
        } else {
          modal.find('p').text(data.message);
          modal.show();
        }
        console.log(
          'Data status: ' + data.status,
          +'\ndata.message: ' + data.message,
        );
      },
    );
  }
});

$('.login-container .close-button').on('click', function () {
  console.log(' here');
  $('.login-container').removeClass('active');
  $('#overlay-select-cards').addClass('active');
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

$('#button-user-profile').on('click', function () {
  $('#user-profile').toggleClass('active');
  if ($('#user-profile').hasClass('active')) {
    $.post(
      'https://tothepointcodeloginexpressjs.onrender.com/user/user-info',
      {
        email: $('#login-email').val(),
      },
      function (data, status) {
        if (data.status === 'SUCCESS') {
          modal.find('p').text('User Info loaded successfully');
          modal.show();
        } else {
          modal.find('p').text(data.message);
          modal.show();
        }
        var res = JSON.parse(JSON.stringify(data)).data[0];

        $('#user-profile').find('div').empty();
        $('#user-profile')
          .find('div')
          .append('<p>name: ' + res.name + '</p>');
        $('#user-profile')
          .find('div')
          .append('<p>email: ' + res.email + '</p>');
        if (!res.matchesLost) res.matchesLost = 0;
        if (!res.matchesWon) res.matchesWon = 0;
        $('#user-profile')
          .find('div')
          .append('<p>matches won: ' + res.matchesWon + '</p>');
        $('#user-profile')
          .find('div')
          .append('<p>matches lost: ' + res.matchesLost + '</p>');

        $('#user-profile')
          .find('div')
          .append(
            '<p>percentage won: ' +
              Math.round(
                (res.matchesWon / (res.matchesWon + res.matchesLost)) * 100,
              ) +
              ' %</p>',
          );
      },
    );
  }
});

$('#user-profile .close').on('click', function () {
  $('#user-profile').removeClass('active');
});

$('#button-cards-stats').on('click', function () {
  $('#cards-stats').toggleClass('active');

  if ($('#cards-stats').hasClass('active')) {
    $.get(
      'https://tothepointcodeloginexpressjs.onrender.com/car/cards-stats',
      function (data, status) {
        console.log('🚀 ~ file: appSecondVersion.js:1226 ~ data:', data);
        $('#cards-stats').find('div').empty();

        if (data.status === 'SUCCESS') {
          for (let i = 0; i < data.data.length; i++) {
            $('#cards-stats').find('table').append(`
              <tr>
                <td>${data.data[i].cardsPack}</td>
                <td>${data.data[i].name}</td>
                <td>${data.data[i].duelsWon}</td>
                <td>${data.data[i].duelsTie}</td>
                <td>${data.data[i].duelsLost}</td>
              </tr>
            `);
            // .append(
            //   "<p>" +
            //     data.data[i].cardsPack +
            //     " - " +
            //     data.data[i].name +
            //     " duelsLost: " +
            //     data.data[i].duelsLost +
            //     " duelsTie: " +
            //     data.data[i].duelsTie +
            //     " duelsWon " +
            //     data.data[i].duelsWon +
            //     "</p>"
            // );
          }
        }
      },
    );
  }
});

$('#cards-stats .close').on('click', function () {
  $('#cards-stats').removeClass('active');
});

$(buttonEmptyCardsStats).on('click', function () {
  $.get(
    'https://tothepointcodeloginexpressjs.onrender.com/car/empty-cards-stats',
    function (data, status) {
      console.log('🚀 ~ file: appSecondVersion.js:1226 ~ data:', data);
    },
  );
});
