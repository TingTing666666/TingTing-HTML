/*
 * @Author: TingTing ibm_1@126.com
 * @Date: 2024-01-02 22:02:36
 * @LastEditors: TingTing ibm_1@126.com
 * @LastEditTime: 2024-01-02 23:13:41
 * @FilePath: \HTML\card\script.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
document.getElementById('drawButton').addEventListener('click', function() {
    let fileInput = document.getElementById('fileInput');
    let numberInput = parseInt(document.getElementById('numberInput').value);
    if(fileInput.files.length == 0 || isNaN(numberInput)) {
        alert("请上传文件并输入有效数字");
        return;
    }

    let reader = new FileReader();
    reader.onload = function(e) {
        let names = e.target.result.split('\n').filter(name => name.trim() != '');
        if(numberInput > names.length) {
            alert("输入的数字超过名字数量");
            return;
        }

        let selectedNames = drawNames(names, numberInput);
        displayCards(selectedNames);
    };
    reader.readAsText(fileInput.files[0]);
});

function drawNames(names, number) {
    let selectedNames = [];
    for(let i = 0; i < number; i++) {
        let index = Math.floor(Math.random() * names.length);
        selectedNames.push(names.splice(index, 1)[0]);
    }
    return selectedNames;
}

function displayCards(names) {
    let container = document.getElementById('cardContainer');
    container.innerHTML = ''; // 清空现有的卡牌
    names.forEach(name => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-content card-front">${name}</div>
            <div class="card-content card-back">我是？</div>
        `;
        card.addEventListener('click', function() {
            card.classList.toggle('flipped');
        });
        container.appendChild(card);
    });
}

function createFirework(x, y) {
    const fireworksContainer = document.getElementById('fireworkscontainer');
    const particles = 30;
  
    for (let i = 0; i < particles; i++) {
      let particle = document.createElement('div');
      particle.classList.add('particle');
      
      // 随机选择粒子形状
      if (i % 3 === 0) {
        particle.classList.add('star');
      } else if (i % 3 === 1) {
        particle.classList.add('circle');
      } else {
        particle.classList.add('square');
      }
  
      fireworksContainer.appendChild(particle);
      particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      let particleX = x - 20 + Math.random() * 40;
      let particleY = y - 20 + Math.random() * 40;
      particle.style.left = `${particleX}px`;
      particle.style.top = `${particleY}px`;
  
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 20 + 20;
      
      setTimeout(function() {
        particle.style.left = `${particleX + Math.cos(angle) * speed}px`;
        particle.style.top = `${particleY + Math.sin(angle) * speed}px`;
        particle.style.opacity = 0;
      }, 100);
  
      setTimeout(function() {
        particle.remove();
      }, 1000);
    }
  }
  
  // 在卡片点击事件中触发
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function(event) {
      let rect = card.getBoundingClientRect();
      let x = event.clientX - rect.left + rect.width / 2;
      let y = event.clientY - rect.top + rect.height / 2;
      createFirework(x, y);
    });
  });
  

  var colors = new Array(
    [62,35,255],
    [60,255,60],
    [255,35,98],
    [45,175,230],
    [255,0,255],
    [255,128,0]);
  
  var step = 0;
  //color table indices for: 
  // current color left
  // next color left
  // current color right
  // next color right
  var colorIndices = [0,1,2,3];
  
  //transition speed
  var gradientSpeed = 0.002;
  
  function updateGradient()
  {
    
    if ( $===undefined ) return;
    
  var c0_0 = colors[colorIndices[0]];
  var c0_1 = colors[colorIndices[1]];
  var c1_0 = colors[colorIndices[2]];
  var c1_1 = colors[colorIndices[3]];
  
  var istep = 1 - step;
  var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
  var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
  var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
  var color1 = "rgb("+r1+","+g1+","+b1+")";
  
  var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
  var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
  var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
  var color2 = "rgb("+r2+","+g2+","+b2+")";
  
   $('#gradient').css({
     background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
      background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
    
    step += gradientSpeed;
    if ( step >= 1 )
    {
      step %= 1;
      colorIndices[0] = colorIndices[1];
      colorIndices[2] = colorIndices[3];
      
      //pick two new target color indices
      //do not pick the same as the current one
      colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
      colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
      
    }
  }
  
  setInterval(updateGradient,10);