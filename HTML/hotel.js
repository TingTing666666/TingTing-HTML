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
        alert("����ѡ��ͻ��ļ�");
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
        alert("����ѡ��ͷ��ļ�");
    }
  }
  
  function clearPrintCustomerFile_and_PrintRoomFile() {
  document.getElementById("roomContent").textContent = "";
  document.getElementById("customerContent").textContent = "";
}

// ��ȡ��ť���Ӱ�ť������
const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const childButtons1 = document.querySelector(".child-buttons1");
const childButtons2 = document.querySelector(".child-buttons2");

// �л��Ӱ�ť����ʾ������״̬
function toggleChildButtons(childButtons) {
if (childButtons.style.display === "none" || childButtons.style.display === "") {
  childButtons.style.display = "block";
} else {
  childButtons.style.display = "none";
}
}

// Ϊ��ť��ӵ���¼�������
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

      // ��������ͷ
      window.roomHead = head;
    };

    reader.readAsText(file);
  }

  // function showRoomTypeInput() {
  //   const roomTypeInput = prompt("�����뷿�����ͣ�");
  //   if (roomTypeInput !== null) {
  //     searchRooms(roomTypeInput, minPriceInput, maxPriceInput);
  //   }
  // }

  function searchRooms() {
    const roomTypeInput = prompt("�����뷿�����ͣ�");
    const minPriceInput = parseFloat(prompt("��������С�۸�"));
    const maxPriceInput = parseFloat(prompt("���������۸�"));
    let p1 = window.roomHead;
    let found = false;

    const resultDiv = document.getElementById("SearchRoomResult");

    resultDiv.innerHTML = "";

    while (p1 !== null) {
        if (p1.roomtype === roomTypeInput && p1.isOccupied === 0 && p1.roomprice >= minPriceInput && p1.roomprice <= maxPriceInput) {
          // ���δ��ռ�õķ��䣬���Ҽ۸���ָ����Χ��
          const roomInfo = document.createElement("p");
          roomInfo.textContent = p1.roomid + "\t" + p1.roomtype + "\t" + p1.roomprice;
          resultDiv.appendChild(roomInfo);
          found = true;
        }
        p1 = p1.next;
    }

    if (!found) {
      const noRoomsMessage = document.createElement("p");
      noRoomsMessage.textContent = "��Ǹ��û�п��õ� " + roomTypeInput + " ���䣡";
      resultDiv.appendChild(noRoomsMessage);
    }
  }

  function ClearSearchRoom() {
    document.getElementById("SearchRoomResult").textContent = "";
  }

  // ADD ROOM ���
  function addRoom() {
    const roomidInput = document.getElementById("roomidInput").value;
    const roomtypeInput = document.getElementById("roomtypeInput").value;
    const roompriceInput = parseFloat(document.getElementById("roompriceInput").value);

    if (roomidInput === "" || roomtypeInput === "" || isNaN(roompriceInput)) {
      alert("����д�����ķ�����Ϣ");
      return;
    }

    if (roomExists(roomidInput)) {
      alert("�÷����Ѵ���");
      return;
    }

    const newRoom = new Room(roomidInput, roomtypeInput, roompriceInput, 0);
    addToLinkedList(newRoom);
    alert("���������");

    // ��������ֶ�
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
      // ��ʽ���������ݣ��Կո�ָ�
      roomData += `${p1.roomid} ${p1.roomtype} ${p1.roomprice} ${p1.isOccupied}\n`;
      p1 = p1.next;
    }
  
    // ����һ��Blob�������ڱ����ı�����
    const blob = new Blob([roomData], { type: "text/plain" });
  
    // ����һ��a��ǩ���������ļ�
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "C:/Users/ibm_1/Desktop/room.txt";
  
    // ģ����a��ǩ�������ļ�����
    a.click();
  }

  function showLinkedListContent() {
    let p1 = window.roomHead;
  
    // �������Ԫ��
    const table = document.createElement("table");
  
    // ������ͷ��
    const headerRow = document.createElement("tr");
    
    // ������ͷ��Ԫ�������ı�����
    const headers = ["�����", "����", "�۸�", "�Ƿ�ռ��"];
    for (const header of headers) {
      const th = document.createElement("th");
      th.textContent = header;
      headerRow.appendChild(th);
    }
    
    // ����ͷ����ӵ������
    table.appendChild(headerRow);
  
    while (p1 !== null) {
      // ����������
      const dataRow = document.createElement("tr");
  
      // �������ݵ�Ԫ�������ı�����
      const roomidCell = createTableCell(p1.roomid);
      const roomtypeCell = createTableCell(p1.roomtype);
      const roompriceCell = createTableCell(p1.roomprice);
      const isOccupiedCell = createTableCell(p1.isOccupied);
  
      // �����ݵ�Ԫ����ӵ���������
      dataRow.appendChild(roomidCell);
      dataRow.appendChild(roomtypeCell);
      dataRow.appendChild(roompriceCell);
      dataRow.appendChild(isOccupiedCell);
  
      // ����������ӵ������
      table.appendChild(dataRow);
      
      p1 = p1.next;
    }
  
    // ��ȡ������ʾ�������ݵ�Ԫ��
    const linkedListContentElement = document.getElementById("linkedListContentElement");
  
    // ���ԭ������
    linkedListContentElement.innerHTML = "";
  
    // �������ӵ�Ԫ����
    linkedListContentElement.appendChild(table);
  }
  
  // ����������һ������ָ���ı����ݵı��Ԫ��
  function createTableCell(text) {
    const cell = document.createElement("td");
    cell.textContent = text;
    return cell;
  }

  // ��ȡ�Ӱ�ť9Ԫ��
const childButton9 = document.getElementById("childButton9");

// ��ȡҪ��ʾ/���صİ�ť�������ֶ�Ԫ��
const roomInputFields = document.getElementById("roomInputFields");
const addRoomButton = document.getElementById("addRoomButton");
const saveRoomsButton = document.getElementById("saveRoomsButton");

// ��ӵ���¼�������򣬵�����Ӱ�ť9ʱ�л���ť�������ֶεĿɼ���
  childButton9.addEventListener("click", function() {
  // �л���ʾ/����
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
  