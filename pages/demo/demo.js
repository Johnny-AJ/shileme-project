Page({
  data: {
    radioItems: [
      { classname: 'icon-pingxing', value: 1, checked: false },
      { classname: 'icon-pingxing', value: 2, checked: false },
      { classname: 'icon-pingxing', value: 3, checked: false },
      { classname: 'icon-pingxing', value: 4, checked: false },
      { classname: 'icon-pingxing', value: 5, checked: false }
    ],
    stars: 0
  },
  onLoad: function (options) {

  },
  radioChange: function (e) {
    var radioItems = this.data.radioItems;
    for (var i = 0; i < e.detail.value; i++) {
      radioItems[i].checked = true;
      radioItems[i].classname = "icon-shixing";
    }
    for (var j = e.detail.value; j < radioItems.length; j++) {
      radioItems[j].checked = false;
      radioItems[j].classname = "icon-pingxing";
    }
    this.setData({
      radioItems: radioItems,
      stars: e.detail.value
    });
  },

})