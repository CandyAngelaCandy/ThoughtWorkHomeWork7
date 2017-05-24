const loadAllItems = require('./loadAllItems.js');

module.exports = function main(inputs) {

  var allItems = loadAllItems();
  var shopList = [];

  for (var i = 0; i < inputs.length; i++) {
    var dupliFlag = false;
    for (var j = 0; j < shopList.length; j++) {
      if (inputs[i] === shopList[j].barcode) {
        shopList[j].num++;
        dupliFlag = true;
        break;
      }
    }

    if (!dupliFlag) {
      for (var j = 0; j < allItems.length; j++) {
        if (inputs[i] === allItems[j].barcode) {
          var obj = {
            barcode: inputs[i],
            name: allItems[j].name,
            num: 1,
            unit: allItems[j].unit,
            price: allItems[j].price,
          };
          shopList.push(obj);
          break;
        }
      }
    }
  }

  var str = `***<没钱赚商店>购物清单***`;
  var sum = 0;
  for (var i = 0; i < shopList.length; i++) {
    var itemSum = +(shopList[i].price * shopList[i].num);
    sum += itemSum;
    str += `
名称：${shopList[i].name}，数量：${shopList[i].num}${shopList[i].unit}，单价：${shopList[i].price.toFixed(2)}(元)，小计：${itemSum.toFixed(2)}(元)`
  };
  str += `
----------------------
总计：${sum.toFixed(2)}(元)
**********************`;
  return str;
};

