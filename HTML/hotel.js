function PrintCustomerFile() {
    var customerFile = document.getElementById("customerFile").files[0];
    if (customerFile) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var content = e.target.result;
            document.getElementById("customerContent").textContent = content;
        };
        reader.readAsText(customerFile);
    } else {
        alert("请先选择客户文件");
    }
  }

  function PrintRoomFile() {
    var roomFile = document.getElementById("roomFile").files[0];
    if (roomFile) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var content = e.target.result;
            document.getElementById("roomContent").textContent = content;
        };
        reader.readAsText(roomFile);
    } else {
        alert("请先选择客房文件");
    }
  }
  
  function clearPrintCustomerFile_and_PrintRoomFile() {
  document.getElementById("roomContent").textContent = "";
  document.getElementById("customerContent").textContent = "";
}

// 获取按钮和子按钮的引用
const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const childButtons1 = document.querySelector(".child-buttons1");
const childButtons2 = document.querySelector(".child-buttons2");

// 切换子按钮的显示和隐藏状态
function toggleChildButtons(childButtons) {
if (childButtons.style.display === "none" || childButtons.style.display === "") {
  childButtons.style.display = "block";
} else {
  childButtons.style.display = "none";
}
}

// 为按钮添加点击事件监听器
button1.addEventListener("click", () => toggleChildButtons(childButtons1));
button2.addEventListener("click", () => toggleChildButtons(childButtons2));

function Room(roomid, roomtype, roomprice, isOccupied) {
    this.roomid = roomid;
    this.roomtype = roomtype;
    this.roomprice = roomprice;
    this.isOccupied = isOccupied; 
    this.next = null;
  }
  
function handleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
      const fileContent = e.target.result;
      const roomsData = fileContent.split('\n');

      let head = null;

      roomsData.forEach(function(roomData) {
        const [roomid, roomtype, roomprice, isOccupied] = roomData.trim().split(' ');

        const room = new Room(roomid, roomtype, parseFloat(roomprice), parseInt(isOccupied));
        if (head === null) {
          head = room;
        } else {
          let currentRoom = head;
          while (currentRoom.next !== null) {
            currentRoom = currentRoom.next;
          }
          currentRoom.next = room;
        }
      });

      // 保存链表头
      window.roomHead = head;
    };

    reader.readAsText(file);
  }

  // function showRoomTypeInput() {
  //   const roomTypeInput = prompt("请输入房间类型：");
  //   if (roomTypeInput !== null) {
  //     searchRooms(roomTypeInput, minPriceInput, maxPriceInput);
  //   }
  // }

  function searchRooms() {
    const roomTypeInput = prompt("请输入房间类型：");
    const minPriceInput = parseFloat(prompt("请输入最小价格："));
    const maxPriceInput = parseFloat(prompt("请输入最大价格："));
    let p1 = window.roomHead;
    let found = false;

    const resultDiv = document.getElementById("SearchRoomResult");

    resultDiv.innerHTML = "";

    while (p1 !== null) {
        if (p1.roomtype === roomTypeInput && p1.isOccupied === 0 && p1.roomprice >= minPriceInput && p1.roomprice <= maxPriceInput) {
          // 输出未被占用的房间，并且价格在指定范围内
          const roomInfo = document.createElement("p");
          roomInfo.textContent = p1.roomid + "\t" + p1.roomtype + "\t" + p1.roomprice;
          resultDiv.appendChild(roomInfo);
          found = true;
        }
        p1 = p1.next;
    }

    if (!found) {
      const noRoomsMessage = document.createElement("p");
      noRoomsMessage.textContent = "抱歉！没有可用的 " + roomTypeInput + " 房间！";
      resultDiv.appendChild(noRoomsMessage);
    }
  }

  function ClearSearchRoom() {
    document.getElementById("SearchRoomResult").textContent = "";
  }

  // ADD ROOM 板块
  function addRoom() {
    const roomidInput = document.getElementById("roomidInput").value;
    const roomtypeInput = document.getElementById("roomtypeInput").value;
    const roompriceInput = parseFloat(document.getElementById("roompriceInput").value);

    if (roomidInput === "" || roomtypeInput === "" || isNaN(roompriceInput)) {
      alert("请填写完整的房间信息");
      return;
    }

    if (roomExists(roomidInput)) {
      alert("该房间已存在");
      return;
    }

    const newRoom = new Room(roomidInput, roomtypeInput, roompriceInput, 0);
    addToLinkedList(newRoom);
    alert("房间已添加");

    // 清空输入字段
    document.getElementById("roomidInput").value = "";
    document.getElementById("roomtypeInput").value = "";
    document.getElementById("roompriceInput").value = "";
  }

  function roomExists(roomid) {
    let p1 = window.roomHead;
    while (p1 !== null) {
      if (p1.roomid === roomid) {
        return true;
      }
      p1 = p1.next;
    }
    return false;
  }

  function addToLinkedList(newRoom) {
    if (window.roomHead === null) {
      window.roomHead = newRoom;
    } else {
      let currentRoom = window.roomHead;
      while (currentRoom.next !== null) {
        currentRoom = currentRoom.next;
      }
      currentRoom.next = newRoom;
    }
  }

  function saveRoomsToFile() {
    let p1 = window.roomHead;
    let roomData = "";
  
    while (p1 !== null) {
      // 格式化房间数据，以空格分隔
      roomData += `${p1.roomid} ${p1.roomtype} ${p1.roomprice} ${p1.isOccupied}\n`;
      p1 = p1.next;
    }
  
    // 创建一个Blob对象，用于保存文本数据
    const blob = new Blob([roomData], { type: "text/plain" });
  
    // 创建一个a标签用于下载文件
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "C:/Users/ibm_1/Desktop/room.txt";
  
    // 模拟点击a标签来触发文件下载
    a.click();
  }

  function showLinkedListContent() {
    let p1 = window.roomHead;
  
    // 创建表格元素
    const table = document.createElement("table");
  
    // 创建表头行
    const headerRow = document.createElement("tr");
    
    // 创建表头单元格并设置文本内容
    const headers = ["房间号", "类型", "价格", "是否占用"];
    for (const header of headers) {
      const th = document.createElement("th");
      th.textContent = header;
      headerRow.appendChild(th);
    }
    
    // 将表头行添加到表格中
    table.appendChild(headerRow);
  
    while (p1 !== null) {
      // 创建数据行
      const dataRow = document.createElement("tr");
  
      // 创建数据单元格并设置文本内容
      const roomidCell = createTableCell(p1.roomid);
      const roomtypeCell = createTableCell(p1.roomtype);
      const roompriceCell = createTableCell(p1.roomprice);
      const isOccupiedCell = createTableCell(p1.isOccupied);
  
      // 将数据单元格添加到数据行中
      dataRow.appendChild(roomidCell);
      dataRow.appendChild(roomtypeCell);
      dataRow.appendChild(roompriceCell);
      dataRow.appendChild(isOccupiedCell);
  
      // 将数据行添加到表格中
      table.appendChild(dataRow);
      
      p1 = p1.next;
    }
  
    // 获取用于显示链表内容的元素
    const linkedListContentElement = document.getElementById("linkedListContentElement");
  
    // 清空原有内容
    linkedListContentElement.innerHTML = "";
  
    // 将表格添加到元素中
    linkedListContentElement.appendChild(table);
  }
  
  // 创建并返回一个带有指定文本内容的表格单元格
  function createTableCell(text) {
    const cell = document.createElement("td");
    cell.textContent = text;
    return cell;
  }

  // 获取子按钮9元素
const childButton9 = document.getElementById("childButton9");

// 获取要显示/隐藏的按钮和输入字段元素
const roomInputFields = document.getElementById("roomInputFields");
const addRoomButton = document.getElementById("addRoomButton");
const saveRoomsButton = document.getElementById("saveRoomsButton");

// 添加点击事件处理程序，当点击子按钮9时切换按钮和输入字段的可见性
  childButton9.addEventListener("click", function() {
  // 切换显示/隐藏
  if (roomInputFields.style.display === "none") {
    roomInputFields.style.display = "block";
    addRoomButton.style.display = "block";
    saveRoomsButton.style.display = "block";
  } else {
    roomInputFields.style.display = "none";
    addRoomButton.style.display = "none";
    saveRoomsButton.style.display = "none";
  }
});
  