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