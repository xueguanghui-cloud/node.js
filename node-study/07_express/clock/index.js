
      window.onload = function() {
        // 定时器: 每隔一秒执行一次
        setInterval(() => {
          var dt = new Date();
          var HH = dt.getHours();
          var mm = dt.getMinutes();
          var ss = dt.getSeconds();
          // console.log(HH, mm, ss);
          // 为页面上的元素赋值
          const H = document.getElementById('HH');
          const m = document.getElementById('mm');
          const s = document.getElementById('ss');

          HH = HH < 10 ? "0" + HH : HH;
          mm = mm < 10 ? "0" + mm : mm;
          ss = ss < 10 ? "0" + ss : ss;



          H.innerText = HH;
          m.innerText = mm;
          s.innerText = ss;
        }, 1000);
      }
    