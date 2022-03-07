(function ($) {
  //  addClassㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  $(".non-member-btn").on({
    click: function () {
      $(".member-btn , .non-member-btn , .form-login , .form-order").addClass(
        "ch-non-member"
      );
    },
  });

  $(".member-btn").on({
    click: function () {
      $(
        ".member-btn , .non-member-btn , .form-login , .form-order"
      ).removeClass("ch-non-member");
    },
  });

  $(".id-save > label").on({
    click: function () {
      if (!$(".id-save > label").hasClass("on")) {
        $(".id-save > label").addClass("on");
      } else {
        $(".id-save > label.on").removeClass("on");
      }
    },
  });

  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  // pupup 기술

  var key_cnt = 0;
  // 팝업 슬라이드

  // var height = $(".key-slide").height(); // 공지사항 높이값

  // var num = $(".key-slide").length; // 공지사항 갯수

  // var max_height = height * num; // 전체 높이
  // var move = 0; // 움직일 숫자 값

  function popupRolling() {
    //   // move += height;
    //   // $(".keyword-slide-wrap")
    //   //   .stop()
    //   //   .animate({ top: -move }, 600, function () {
    //   //     if (move > max_height) {
    //   //       move = 0;
    //   //     }
    //   //     $(".keyword-slide-wrap").css({ top: -move }, 0);
    //   //   });
    //   // $(".keyword-slide-wrap").append($(".key-slide").clone());

    $(".keyword-slide-wrap")
      .stop()
      .animate({ top: -76.03 * key_cnt }, 600, function () {
        if (key_cnt > 5) {
          key_cnt = 0;
        }
        $(".keyword-slide-wrap")
          .stop()
          .animate({ top: -76.03 * key_cnt }, 0);
      });
  }

  function keyNextCount() {
    key_cnt++;
    popupRolling();
  }

  setInterval(keyNextCount, 2000);
  // $(".keyword-slide-wrap").append($(".key-slide").clone());

  //팝업 나타내기

  $(".search-btn").on({
    click: function () {
      $("#popup").stop().show();
    },
  });

  //팝업 나가기

  $(".popup-exit-btn").on({
    click: function () {
      $("#popup").stop().hide();
    },
  });

  // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  //로그인 로그아웃
})(jQuery);
