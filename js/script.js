(function ($, window) {
  var lushPage = {
    init: function () {
      this.header();
      this.section1();
      this.section2();
      this.m_section2();
      this.popup();
    },
    header: function () {
      // 로그인 성공 시
      // 로그인/회원가입 부분을 로그아웃/마이 페이지로 바꾸기
      // 그리고 로그아웃 하면 로그 권한이 사라지면서 다시 로그인/ 회원가입으로 바뀌기
      $.ajax({
        url: "./LoginPHP/isLogin.php",
        type: "GET",
        success: function (result) {
          // result 값이 있다면 로그아웃/마이페이지가 display:none;
          // 없다면 로그아웃/마이페이지가 display:block;
          let log = JSON.parse(result);
          console.log(log.logInId);
          if (log.logInId == "OK") {
            $(".login").attr("href", "./LoginPHP/logoutProc.php");
            $(".login").text("로그아웃");
            $(".signup").text("마이페이지");
          }
        },
        error: function () {
          alert("오류입니다.");
        },
      });
    },
    section1: function () {
      // section1 slide 함수
      var cnt = -1;
      var n = $(".slide").length - 1;
      var setId = null;
      var count = 0;

      // 모바일 슬라이드 변수
      let slide_W = 0;
      let slide_H = 0;

      //////////////////section1 - slide/////////////////////////
      //메인함수
      function mainSlide() {
        // $(".slide").css({ zIndex: 1 }).stop().animate({ opacity: 1 });

        // $(".slide")
        //   .eq(cnt == n ? 0 : cnt + 1)
        //   .css({ zIndex: 3 });
        // $(".slide").eq(cnt).css({ zIndex: 4 }).stop().animate({ opacity: 0 }, 800);

        $(".slide").stop().fadeOut("slow");
        $(".slide")
          .eq(cnt == n ? 0 : cnt + 1)
          .stop()
          .fadeIn("slow");

        pageEvent();
      }

      //카운트함수
      function nextCount() {
        cnt++;
        if (cnt > n) {
          cnt = 0;
        }
        mainSlide();
      }

      function prevCount() {
        cnt--;
        if (cnt < 0) {
          cnt = 3;
        }
        mainSlide();
      }

      //셋인터벌
      function autoPlay() {
        setId = setInterval(nextCount, 4000);
      }
      autoPlay();

      // Slide Stop Play 함수
      function stopPlay() {
        clearInterval(setId);
        clearInterval(id);
        count = 0;
        var id = setInterval(function () {
          count++;
          if (count >= 5) {
            clearInterval(setId);
            clearInterval(id);
            autoPlay();
          }
        }, 1000);
      }

      //

      // 페이지 이벤트 함수
      function pageEvent() {
        $(".page-btn").removeClass("addCurrent");
        $(".page-btn")
          .eq(cnt > 2 ? 0 : cnt + 1)
          .addClass("addCurrent");
      }

      $(".page-btn").each(function (index) {
        $(this).on({
          click: function () {
            stopPlay();
            cnt = index - 1;
            pageEvent();
            mainSlide();
          },
        });
      });

      var mouseStart = null;
      var mouseEnd = null;
      var mouseDown = null;

      $(".slide-view").on({
        mousedown: function (e) {
          stopPlay();
          mouseStart = e.clientX;
          mouseDown = true;
        },
        mouseup: function (e) {
          mouseDown = false;
          mouseEnd = e.clientX;

          if (mouseStart - mouseEnd > 50) {
            if (!$(".slide-wrap").is(":animated")) {
              nextCount();
            }
          }
          if (mouseStart - mouseEnd < -50) {
            if (!$(".slide-wrap").is(":animated")) {
              prevCount();
            }
          }
        },
        mouseout: function (e) {
          if (!mouseDown) {
            return;
          }
          mouseDown = false;
          mouseEnd = e.clientX;
          if (mouseStart - mouseEnd > 50) {
            if (!$(".slide-wrap").is(":animated")) {
              nextCount();
            }
          }
          if (mouseStart - mouseEnd < -50) {
            if (!$(".slide-wrap").is(":animated")) {
              prevCount();
            }
          }
        },
      });

      // 모바일 슬라이드

      let m_cnt = 0;

      function resizefn() {
        slide_W = $(window).innerWidth();
        slide_H = slide_W * 1.36;
        $(".m-slide").css({
          width: slide_W,
          height: slide_H,
        });
        if (window.innerWidth <= 1195) {
          $("#section1").css({
            height: slide_H,
          });
        } else {
          $("#section1").css({
            height: 580,
          });
        }

        $(".m-slide-wrap")
          .stop()
          .animate({ left: -slide_W * m_cnt }, 0);

        return slide_W;
      }

      setTimeout(resizefn, 100);

      $(window).resize(function () {
        resizefn();
      });

      function m_mainSlide() {
        $(".m-slide-wrap")
          .stop()
          .animate({ left: -slide_W * m_cnt }, 300, function () {
            if (m_cnt > 3) {
              m_cnt = 0;
            }
            if (m_cnt < 0) {
              m_cnt = 3;
            }
            $(".m-slide-wrap")
              .stop()
              .animate({ left: -slide_W * m_cnt }, 0);
          });
      }
      function m_nextCount() {
        m_cnt++;
        m_mainSlide();
      }
      function m_prevCount() {
        m_cnt--;
        m_mainSlide();
      }

      var m_mouseStart = null;
      var m_mouseEnd = null;
      var m_dragStart = null;
      var m_dragEnd = null;
      var m_mouseDown = null;

      $(".m-slide-view").on({
        mousedown: function (e) {
          if (!$(".m-slide-wrap").is(":animated")) {
            m_mouseStart = e.clientX;
            m_dragStart =
              e.clientX - $(".m-slide-wrap").offset().left - slide_W;
            // console.log(e.clientX);
            // console.log($(".m-slide-wrap").offset().left);
            m_mouseDown = true;
          }
        },
        mouseup: function (e) {
          if (!$(".m-slide-wrap").is(":animated")) {
            m_mouseDown = false;
            m_mouseEnd = e.clientX;

            if (m_mouseStart - m_mouseEnd > 0) {
              if (m_mouseStart - m_mouseEnd > slide_W / 2) {
                if (!$(".m-slide-wrap").is(":animated")) {
                  m_nextCount();
                }
              } else {
                $(".m-slide-wrap")
                  .stop()
                  .animate({ left: -slide_W * m_cnt }, 100);
              }
            } else if (m_mouseStart - m_mouseEnd < 0) {
              if (m_mouseStart - m_mouseEnd < -slide_W / 2) {
                if (!$(".m-slide-wrap").is(":animated")) {
                  m_prevCount();
                }
              } else {
                $(".m-slide-wrap")
                  .stop()
                  .animate({ left: -slide_W * m_cnt }, 100);
              }
            }
          }
        },
        mouseout: function (e) {
          if (!$(".m-slide-wrap").is(":animated")) {
            if (!m_mouseDown) {
              return;
            }
            m_mouseDown = false;
            m_mouseEnd = e.clientX;
            if (m_mouseStart - m_mouseEnd > 0) {
              if (m_mouseStart - m_mouseEnd > innerWidth / 2) {
                if (!$(".m-slide-wrap").is(":animated")) {
                  m_nextCount();
                }
              } else {
                $(".m-slide-wrap")
                  .stop()
                  .animate({ left: -slide_W * m_cnt }, 100);
              }
            } else if (m_mouseStart - m_mouseEnd < 0) {
              if (m_mouseStart - m_mouseEnd < -innerWidth / 2) {
                if (!$(".m-slide-wrap").is(":animated")) {
                  m_prevCount();
                }
              } else {
                $(".m-slide-wrap")
                  .stop()
                  .animate({ left: -slide_W * m_cnt }, 100);
              }
            }
          }
        },
        mousemove: function (e) {
          if (!$(".m-slide-wrap").is(":animated")) {
            if (!m_mouseDown) {
              return;
            }
            m_dragEnd = e.clientX;
            $(".m-slide-wrap").css({ left: m_dragEnd - m_dragStart });
          }
        },
      });
    },
    section2: function () {
      /////////////////////section2 - slide(1)////////////////////////////////
      //메인 함수
      var cnt_2 = 0;

      function mainSlide_2() {
        $(".st2-slide-wrap")
          .stop()
          .animate({ left: -880 * cnt_2 }, 300, function () {
            if (cnt_2 > 3) {
              cnt_2 = 0;
            }
            if (cnt_2 < 0) {
              cnt_2 = 3;
            }
            $(".st2-slide-wrap")
              .stop()
              .animate({ left: -880 * cnt_2 }, 0);
          });

        pageEvent_2();
      }

      // 카운트함수
      function nextCount_2() {
        cnt_2++;
        mainSlide_2();
      }
      function prevCount_2() {
        cnt_2--;
        mainSlide_2();
      }

      // 페이지 버튼 클릭 이벤트

      function pageEvent_2() {
        $(".st2-page-btn").removeClass("st2-addCurrent");
        $(".st2-page-btn")
          .eq(cnt_2 > 3 ? 0 : cnt_2)
          .addClass("st2-addCurrent");
      }

      $(".st2-page-btn").each(function (index) {
        $(this).on({
          click: function () {
            cnt_2 = index;
            mainSlide_2();
          },
        });
      });

      //터치 스와이프
      var mouseStart_2 = null;
      var mouseEnd_2 = null;
      var dragStart_2 = null;
      var dragEnd_2 = null;
      var mouseDown_2 = null;

      // 1903 - $();
      let width_1 = (1903 - $(window).innerWidth()) / 2;
      $(".st2-slide-view").on({
        mousedown: function (e) {
          if (!$(".st2-slide-wrap").is(":animated")) {
            mouseStart_2 = e.clientX;
            dragStart_2 =
              e.clientX -
              $(".st2-slide-wrap").offset().left -
              (518.5 + width_1);
            mouseDown_2 = true;
          }
        },
        mouseup: function (e) {
          mouseDown_2 = false;
          mouseEnd_2 = e.clientX;
          if (mouseStart_2 - mouseEnd_2 > 50) {
            if (!$(".st2-slide-wrap").is(":animated")) {
              nextCount_2();
            }
          }
          if (mouseStart_2 - mouseEnd_2 < -50) {
            if (!$(".st2-slide-wrap").is(":animated")) {
              prevCount_2();
            }
          }
        },
        mouseout: function (e) {
          if (!mouseDown_2) {
            return;
          }
          mouseDown_2 = false;
          mouseEnd_2 = e.clientX;
          if (mouseStart_2 - mouseEnd_2 > 50) {
            if (!$(".st2-slide-wrap").is(":animated")) {
              nextCount_2();
            }
          }
          if (mouseStart_2 - mouseEnd_2 < -50) {
            if (!$(".st2-slide-wrap").is(":animated")) {
              prevCount_2();
            }
          }
        },
        mousemove: function (e) {
          if (!$(".st2-slide-wrap").is(":animated")) {
            if (!mouseDown_2) {
              return;
            }
            dragEnd_2 = e.clientX;
            $(".st2-slide-wrap").css({ left: dragEnd_2 - dragStart_2 });
          }
        },
      });

      // 섹션2  슬라이드 반응형
      $(window).resize(() => {
        let resize_width = (1903 - $(window).innerWidth()) / 2;
        $(".st2-slide-view").on({
          mousedown: function (e) {
            if (!$(".st2-slide-wrap").is(":animated")) {
              mouseStart_2 = e.clientX;
              dragStart_2 =
                e.clientX -
                $(".st2-slide-wrap").offset().left -
                (518.5 + resize_width);
              mouseDown_2 = true;
            }
          },
          mouseup: function (e) {
            mouseDown_2 = false;
            mouseEnd_2 = e.clientX;
            if (mouseStart_2 - mouseEnd_2 > 50) {
              if (!$(".st2-slide-wrap").is(":animated")) {
                nextCount_2();
              }
            }
            if (mouseStart_2 - mouseEnd_2 < -50) {
              if (!$(".st2-slide-wrap").is(":animated")) {
                prevCount_2();
              }
            }
          },
          mouseout: function (e) {
            if (!mouseDown_2) {
              return;
            }
            mouseDown_2 = false;
            mouseEnd_2 = e.clientX;
            if (mouseStart_2 - mouseEnd_2 > 50) {
              if (!$(".st2-slide-wrap").is(":animated")) {
                nextCount_2();
              }
            }
            if (mouseStart_2 - mouseEnd_2 < -50) {
              if (!$(".st2-slide-wrap").is(":animated")) {
                prevCount_2();
              }
            }
          },
          mousemove: function (e) {
            if (!$(".st2-slide-wrap").is(":animated")) {
              if (!mouseDown_2) {
                return;
              }
              dragEnd_2 = e.clientX;
              $(".st2-slide-wrap").css({ left: dragEnd_2 - dragStart_2 });
            }
          },
        });
      });

      /////////////////////section2 - slide(2)////////////////////////////////

      var cnt_3 = 0;
      var setId_3 = null;
      var count_3 = 0;
      let more_re_width = null;
      let more_re_height = null;

      function moreResize() {
        more_re_width = $(window).innerWidth(); // 브라우저 너비
        more_re_height = $(window).innerWidth() * 0.95; //반응형 더보기 슬라이드 높이
        // 브라우저 너비가 1195이하라면 반응형 실시
        if (window.innerWidth <= 1195) {
          // console.log($(window).hasScrollBar());
          $(".more-slide").css({
            width: more_re_width / 1.3, // 반응형 더보기 슬라이드 너비
            height: more_re_height,
          });
          $("#section2").css({
            height: more_re_height,
          });
          $(".more-slide-container").css({
            width: more_re_width / 1.3,
            height: more_re_height,
          });
        } else {
          //아니면 반응형 동작 안하기
          $(".more-slide").css({
            width: 280,
            height: 652,
          });
          $("#section2").css({
            height: 660,
          });
          $(".more-slide-container").css({
            width: 280,
            height: 652,
          });
        }
        // 리사이즈 시 슬라이드 초기화
        cnt_3 = 0;
        $(".more-slide-wrap")
          .stop()
          .animate(
            {
              left: (window.innerWidth <= 1195 ? 0 : 0) * cnt_3,
            },
            0
          );
        $(".slide-count").text(`${cnt_3 + 1 > 6 ? 1 : cnt_3 + 1}/6`);
        return more_re_width;
      }
      // 리사이즈 함수 강제 동작

      moreResize();
      //리사이즈 마다 리사이즈함수 동작
      $(window).resize(() => {
        moreResize();
      });

      function mainSlide_3() {
        $(".more-slide-wrap")
          .stop()
          .animate(
            {
              // 만약 브라우저 너비가 1195이하 일때 반응형 너비, 아니면 원래 너비 만큼 이동
              left:
                (window.innerWidth <= 1195 ? -more_re_width / 1.3 : -280) *
                cnt_3,
            },
            300,

            function () {
              if (cnt_3 > 5) {
                // cnt_3 은 슬라이드를 세주는 숫자 0 ~ 4 까지 있음
                cnt_3 = 0;
              }
              if (cnt_3 < 0) {
                cnt_3 = 5;
              }

              $(".more-slide-wrap")
                .stop()
                .animate(
                  {
                    // 만약 브라우저 너비가 1195이하 일때 반응형 너비, 아니면 원래 너비 만큼 이동
                    left:
                      (window.innerWidth <= 1195
                        ? -more_re_width / 1.3
                        : -280) * cnt_3,
                  },
                  0
                );
            }
          );
      }

      function nextCount_3() {
        cnt_3++;
        mainSlide_3();
        $(".slide-count").text(`${cnt_3 + 1 > 6 ? 1 : cnt_3 + 1}/6`); // 더보기 슬라이드 밑에 있는 슬라이드 카운트
      }

      function prevCount_3() {
        cnt_3--;
        mainSlide_3();
        $(".slide-count").text(`${cnt_3 + 1 < 1 ? 6 : cnt_3 + 1}/6`); // 더보기 슬라이드 밑에 있는 슬라이드 카운트
      }

      function autoPlay_3() {
        setId_3 = setInterval(nextCount_3, 4000);
      }

      // autoPlay_3();

      function stopPlay_3() {
        clearInterval(setId_3);
        clearInterval(id_3);
        count_3 = 0;
        var id_3 = setInterval(function () {
          count_3++;
          if (count_3 >= 5) {
            clearInterval(setId_3);
            clearInterval(id_3);
            autoPlay_3();
          }
        }, 1000);
      }

      $(".next-btn").on({
        click: function () {
          stopPlay_3();
          if (!$(".more-slide-wrap").is(":animated")) {
            nextCount_3();
          }
        },
      });

      $(".prev-btn").on({
        click: function () {
          stopPlay_3();
          if (!$(".more-slide-wrap").is(":animated")) {
            prevCount_3();
          }
        },
      });

      // more 터치 슬라이드
      var mouseStart_2 = null;
      var mouseEnd_2 = null;
      var dragStart_2 = null;
      var dragEnd_2 = null;
      var mouseDown_2 = null;

      let resize_more_slide = (1903 - $(window).innerWidth()) / 2;
      let m_re_before_width = (1195 - $(window).innerWidth()) * 0.6538;
      let m_slide2_width = $(window).innerWidth() / 1.3;
      $(".more-slide-view").on({
        mousedown: function (e) {
          if (!$(".more-slide-wrap").is(":animated")) {
            stopPlay_3();
            mouseStart_2 = e.clientX;
            dragStart_2 =
              // 브라우저가 1195이하이면 반응형에 맞게 동작, 아니면 원래 사이즈로 동작
              window.innerWidth <= 1195
                ? e.clientX -
                  $(".more-slide-wrap").offset().left -
                  (781.328 - m_re_before_width)
                : e.clientX -
                  $(".more-slide-wrap").offset().left +
                  (989 - resize_more_slide);
            mouseDown_2 = true;
            // console.log("브라우저 크기 : ", $(window).innerWidth());
            // console.log("offset.left값 : ", $(".more-slide-wrap").offset().left);
          }
        },
        mouseup: function (e) {
          mouseDown_2 = false;
          mouseEnd_2 = e.clientX;
          if (window.innerWidth <= 1195) {
            // 만약 브라우저가 1195 이하이면
            if (mouseStart_2 - mouseEnd_2 > 0) {
              // 그중 드래그 결과가 양수 일때
              if (mouseStart_2 - mouseEnd_2 > m_slide2_width / 2) {
                //  드래그가 슬라이드 너비의 절반 넘어가면
                if (!$(".more-slide-wrap").is(":animated")) {
                  nextCount_3(); // 다음 슬라이드로 동작하기
                }
              } else {
                // 절반을 안 넘어 갈시 제자리로 돌아오기
                $(".more-slide-wrap")
                  .stop()
                  .animate(
                    {
                      left:
                        (window.innerWidth <= 1195
                          ? -more_re_width / 1.3
                          : -280) * cnt_3,
                    },
                    100
                  );
              }
            }
            if (mouseStart_2 - mouseEnd_2 < 0) {
              // 드래그를 반대로 했을때 움직이는 코드
              if (mouseStart_2 - mouseEnd_2 < -m_slide2_width / 2) {
                if (!$(".more-slide-wrap").is(":animated")) {
                  prevCount_3();
                }
              } else {
                $(".more-slide-wrap")
                  .stop()
                  .animate(
                    {
                      left:
                        (window.innerWidth <= 1195
                          ? -more_re_width / 1.3
                          : -280) * cnt_3,
                    },
                    100
                  );
              }
            }
          } else {
            // 브라우저가 1195이하가 아니라면 원래 사이즈 대로 드래그&드롭 되기
            if (mouseStart_2 - mouseEnd_2 > 0) {
              if (!$(".more-slide-wrap").is(":animated")) {
                nextCount_3();
              }
            }
            if (mouseStart_2 - mouseEnd_2 < 0) {
              if (!$(".more-slide-wrap").is(":animated")) {
                prevCount_3();
              }
            }
          }
        },
        mouseout: function (e) {
          if (!mouseDown_2) {
            return;
          }
          mouseDown_2 = false;
          mouseEnd_2 = e.clientX;
          if (window.innerWidth <= 1195) {
            if (mouseStart_2 - mouseEnd_2 > 0) {
              if (mouseStart_2 - mouseEnd_2 > m_slide2_width / 2) {
                if (!$(".more-slide-wrap").is(":animated")) {
                  nextCount_3();
                }
              } else {
                $(".more-slide-wrap")
                  .stop()
                  .animate(
                    {
                      left:
                        (window.innerWidth <= 1195
                          ? -more_re_width / 1.3
                          : -280) * cnt_3,
                    },
                    100
                  );
              }
            }
            if (mouseStart_2 - mouseEnd_2 < 0) {
              if (mouseStart_2 - mouseEnd_2 < -m_slide2_width / 2) {
                if (!$(".more-slide-wrap").is(":animated")) {
                  prevCount_3();
                }
              } else {
                $(".more-slide-wrap")
                  .stop()
                  .animate(
                    {
                      left:
                        (window.innerWidth <= 1195
                          ? -more_re_width / 1.3
                          : -280) * cnt_3,
                    },
                    100
                  );
              }
            }
          } else {
            if (mouseStart_2 - mouseEnd_2 > 0) {
              if (!$(".more-slide-wrap").is(":animated")) {
                nextCount_3();
              }
            }
            if (mouseStart_2 - mouseEnd_2 < 0) {
              if (!$(".more-slide-wrap").is(":animated")) {
                prevCount_3();
              }
            }
          }
        },
        mousemove: function (e) {
          if (!$(".more-slide-wrap").is(":animated")) {
            if (!mouseDown_2) {
              return;
            }
            dragEnd_2 = e.clientX;
            $(".more-slide-wrap").css({ left: dragEnd_2 - dragStart_2 });
          }
        },
      });

      // 리사이즈시 동작하는 내용 위의 코드와 같은 내용
      $(window).resize(() => {
        let m_re_before_width = (1195 - $(window).innerWidth()) * 0.6538;
        let resize_more_slide = (1903 - $(window).innerWidth()) / 2;
        let m_slide2_width = $(window).innerWidth() / 1.3;
        $(".more-slide-view").on({
          mousedown: function (e) {
            console.log(m_slide2_width);
            if (!$(".more-slide-wrap").is(":animated")) {
              stopPlay_3();
              mouseStart_2 = e.clientX;
              dragStart_2 =
                window.innerWidth <= 1195
                  ? e.clientX -
                    $(".more-slide-wrap").offset().left -
                    (781.328 - m_re_before_width)
                  : e.clientX -
                    $(".more-slide-wrap").offset().left +
                    (989 - resize_more_slide);
              // e.clientX - $(".more-slide-wrap").offset().left + (989 - resize_more_slide);
              // e.clientX -$(".more-slide-wrap").offset().left -(781.328 - m_re_before_width);
              // console.log(e.clientX);
              // console.log($(".more-slide-wrap").offset().left);
              mouseDown_2 = true;
            }
          },
          mouseup: function (e) {
            mouseDown_2 = false;
            mouseEnd_2 = e.clientX;

            if (window.innerWidth <= 1195) {
              if (mouseStart_2 - mouseEnd_2 > 0) {
                if (mouseStart_2 - mouseEnd_2 > m_slide2_width / 2) {
                  nextCount_3();
                  // if (!$(".more-slide-wrap").is(":animated")) {
                  //     nextCount_3();
                  //   }
                } else {
                  $(".more-slide-wrap")
                    .stop()
                    .animate(
                      {
                        left:
                          (window.innerWidth <= 1195
                            ? -more_re_width / 1.3
                            : -280) * cnt_3,
                      },
                      100
                    );
                }
              } else if (mouseStart_2 - mouseEnd_2 < 0) {
                if (mouseStart_2 - mouseEnd_2 < -m_slide2_width / 2) {
                  prevCount_3();
                  // if (!$(".more-slide-wrap").is(":animated")) {
                  //   prevCount_3();
                  // }
                } else {
                  $(".more-slide-wrap")
                    .stop()
                    .animate(
                      {
                        left:
                          (window.innerWidth <= 1195
                            ? -more_re_width / 1.3
                            : -280) * cnt_3,
                      },
                      100
                    );
                }
              }
            } else {
              if (mouseStart_2 - mouseEnd_2 > 0) {
                if (!$(".more-slide-wrap").is(":animated")) {
                  nextCount_3();
                }
              }
              if (mouseStart_2 - mouseEnd_2 < 0) {
                if (!$(".more-slide-wrap").is(":animated")) {
                  prevCount_3();
                }
              }
            }
          },
          mouseout: function (e) {
            if (!mouseDown_2) {
              return;
            }
            mouseDown_2 = false;
            mouseEnd_2 = e.clientX;
            if (window.innerWidth <= 1195) {
              if (mouseStart_2 - mouseEnd_2 > 0) {
                if (mouseStart_2 - mouseEnd_2 > m_slide2_width / 2) {
                  if (!$(".more-slide-wrap").is(":animated")) {
                    nextCount_3();
                  }
                } else {
                  $(".more-slide-wrap")
                    .stop()
                    .animate(
                      {
                        left:
                          (window.innerWidth <= 1195
                            ? -more_re_width / 1.3
                            : -280) * cnt_3,
                      },
                      100
                    );
                }
              }
              if (mouseStart_2 - mouseEnd_2 < 0) {
                if (mouseStart_2 - mouseEnd_2 < -m_slide2_width / 2) {
                  if (!$(".more-slide-wrap").is(":animated")) {
                    prevCount_3();
                  }
                } else {
                  $(".more-slide-wrap")
                    .stop()
                    .animate(
                      {
                        left:
                          (window.innerWidth <= 1195
                            ? -more_re_width / 1.3
                            : -280) * cnt_3,
                      },
                      100
                    );
                }
              }
            } else {
              if (mouseStart_2 - mouseEnd_2 > 0) {
                if (!$(".more-slide-wrap").is(":animated")) {
                  nextCount_3();
                }
              }
              if (mouseStart_2 - mouseEnd_2 < 0) {
                if (!$(".more-slide-wrap").is(":animated")) {
                  prevCount_3();
                }
              }
            }
          },
          mousemove: function (e) {
            if (!$(".more-slide-wrap").is(":animated")) {
              if (!mouseDown_2) {
                return;
              }
              dragEnd_2 = e.clientX;
              $(".more-slide-wrap").css({ left: dragEnd_2 - dragStart_2 });
            }
          },
        });
      });
    },
    m_section2: function () {
      // 섹션2 모바일 전용 st2 슬라이드

      let cnt = 0; // 슬라이드 카운트 변수
      let slide_W = null;
      function resizefn() {
        slide_W = $(window).innerWidth();
        $(".m-st2t-slide").css({
          width: slide_W,
        });

        $(".m-st2t-slide-wrap, .m-st2b-slide-wrap")
          .stop()
          .animate({ left: -slide_W * cnt }, 0);

        return slide_W;
      }

      resizefn();

      $(window).resize(() => {
        resizefn();
      });

      function mainSlide() {
        $(".m-st2t-slide-wrap, .m-st2b-slide-wrap")
          .stop()
          .animate({ left: -slide_W * cnt }, 300, () => {
            if (cnt > 4) {
              cnt = 4;
            }
            if (cnt < 0) {
              cnt = 0;
            }
            $(".m-st2t-slide-wrap, .m-st2b-slide-wrap")
              .stop()
              .animate({ left: -slide_W * cnt }, 100);
          });
      }

      function nextCount() {
        cnt++;
        mainSlide();
      }

      function prevCount() {
        cnt--;
        mainSlide();
      }

      let mouseStart = null;
      let mouseEnd = null;
      let dragStart = null;
      let dragEnd = null;
      let mouseDown = null;

      $(".m-view").on({
        mousedown(e) {
          // 만약 e.target이 slide wrap 이라면 display block
          // e.target의 값을 true false로 바꾸고 싶다.
          // hasClass 로 해당 클래스가 있다면 영역 생성
          // if($("."))
          console.log(e.target);
          if (
            !$(".m-st2t-slide-wrap").is(":animated") &&
            !$(".m-st2b-slide-wrap").is(":animated")
          ) {
            mouseStart = e.clientX;
            dragStart = e.clientX - $(".m-st2t-slide-wrap").offset().left;
            mouseDown = true;
            // console.log("slide_W : ", slide_W);
            // console.log(
            //   "slide-wrap-left : ",
            //   $(".m-st2t-slide-wrap").offset().left
            // );
          }
        },
        mouseup(e) {
          if (
            !$(".m-st2t-slide-wrap").is(":animated") &&
            !$(".m-st2b-slide-wrap").is(":animated")
          ) {
            mouseDown = false;
            mouseEnd = e.clientX;

            if (mouseStart - mouseEnd > 0) {
              if (mouseStart - mouseEnd > slide_W / 6) {
                if (
                  !$(".m-st2t-slide-wrap").is(":animated") &&
                  !$(".m-st2b-slide-wrap").is(":animated")
                ) {
                  nextCount();
                }
              } else {
                $(".m-st2t-slide-wrap, .m-st2b-slide-wrap")
                  .stop()
                  .animate({ left: -slide_W * cnt }, 100);
              }
            } else if (mouseStart - mouseEnd < 0) {
              if (mouseStart - mouseEnd < -slide_W / 6) {
                if (
                  !$(".m-st2t-slide-wrap").is(":animated") &&
                  !$(".m-st2b-slide-wrap").is(":animated")
                ) {
                  prevCount();
                }
              } else {
                $(".m-st2t-slide-wrap, .m-st2b-slide-wrap")
                  .stop()
                  .animate({ left: -slide_W * cnt }, 100);
              }
            }
          }
        },
        mouseout(e) {
          if (
            !$(".m-st2t-slide-wrap").is(":animated") &&
            !$(".m-st2b-slide-wrap").is(":animated")
          ) {
            if (!mouseDown) {
              return;
            }

            mouseDown = false;
            mouseEnd = e.clientX;

            if (mouseStart - mouseEnd > 0) {
              if (mouseStart - mouseEnd > slide_W / 4) {
                if (
                  !$(".m-st2t-slide-wrap").is(":animated") &&
                  !$(".m-st2b-slide-wrap").is(":animated")
                ) {
                  nextCount();
                }
              } else {
                $(".m-st2t-slide-wrap, .m-st2b-slide-wrap")
                  .stop()
                  .animate({ left: -slide_W * cnt }, 100);
              }
            } else if (mouseStart - mouseEnd < 0) {
              if (mouseStart - mouseEnd < -slide_W / 4) {
                if (
                  !$(".m-st2t-slide-wrap").is(":animated") &&
                  !$(".m-st2b-slide-wrap").is(":animated")
                ) {
                  prevCount();
                }
              } else {
                $(".m-st2t-slide-wrap, .m-st2b-slide-wrap")
                  .stop()
                  .animate({ left: -slide_W * cnt }, 100);
              }
            }
          }
        },
        mousemove: function (e) {
          if (!$(".m-st2t-slide-wrap, .m-st2t-slide-wrap").is(":animated")) {
            if (!mouseDown) {
              return;
            }
            dragEnd = e.clientX;
            $(".m-st2t-slide-wrap, .m-st2b-slide-wrap").css({
              left: dragEnd - dragStart,
            });
          }
        },
      });
    },
    popup: function () {
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
    },
  };

  lushPage.init();
})(jQuery, window);
