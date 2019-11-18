<template>
  <div>
    <el-cascader
      :options="areaItem"
      v-model="areaArr"
      @change="handleAreaItem(areaArr)"
      placeholder="所属区域"
      change-on-select
      clearable
      style="width: 100%;"
    >
    </el-cascader>
  </div>
</template>
 
<script>
export default {
  model: {
    prop: "areaArr",
    event: "getAreaArr"
  },
  props: {
    initval: {
      type: [Boolean, Array],
      default: false
    },
    rank: {
      default: false
    }
  },
  data() {
    return {
      areaArr: [],
      areaItem: []
    };
  },
  methods: {
    handleAreaItem(arr, initArr) {
      let vm = this;
      vm.$emit("getAreaArr", arr);
      let tempLeng = vm.rank ? vm.rank-1 : 3
      if (arr.length > tempLeng || arr.length < 1) {
        return;
      }
      let temp = [];
      let tempSrc = ""; 
      for (let i = 0; i < arr.length; i++) {
        if (i === 0) {
          for (let j in vm.areaItem) {
            if (vm.areaItem[j].value === arr[0]) {
              if (arr.length == 1 && vm.areaItem[j].children.length > 0) {
                return;
              }
              temp[0] = j;
              tempSrc = `vm.areaItem[${j}]`;
              break;
            }
          }
        } else if (i === 1) {
          for (let j in vm.areaItem[temp[0]].children) {
            if (vm.areaItem[temp[0]].children[j].value === arr[1]) {
              if (
                arr.length == 2 &&
                vm.areaItem[temp[0]].children[j].children.length > 0
              ) {
                return;
              }
              temp[1] = j;
              tempSrc += `.children[${j}]`;
              break;
            }
          }
        } else if (i === 2) {
          for (let j in vm.areaItem[temp[0]].children[temp[1]].children) {
            if (
              vm.areaItem[temp[0]].children[temp[1]].children[j].value ===
              arr[2]
            ) {
              if (
                arr.length == 3 &&
                vm.areaItem[temp[0]].children[temp[1]].children[j].children
                  .length > 0
              ) {
                return;
              }
              temp[2] = j;
              tempSrc += `.children[${j}]`;
              break;
            }
          }
        }
      }
      let params = {
        token:vm.$utils.getToken(),
        parent_id: arr[arr.length - 1],
        status: 1,
        loading: true
      };
      vm.$http.get(vm.url.control.GetAreaList, {
        params
      }).then(resp => {
        let list = resp.data.data.list

        if (list.length < 1) {
          eval(tempSrc).children.push({
            value: "unll",
            label: "已无下级分类",
            disabled: true
          });
          return;
        }
        let tempArr = list.map(obj => {
          if (arr.length >= tempLeng) {
            return {
              value: obj.id,
              label: obj.name
            };
          }
          return {
            value: obj.id,
            label: obj.name,
            children: []
          };
        });
        eval(tempSrc).children = tempArr;
        if (initArr && initArr.length && arr.length != initArr.length) {
          arr.push(initArr[arr.length])
          vm.handleAreaItem(arr, initArr)
        }
      });
    },
    areaItemOne(initArr) {
      let vm = this;
      let params = {
        token:vm.$utils.getToken(),
        parent_id: "1",
        status: 1
      };
      vm.$http.get(vm.url.control.GetAreaList, {
        params
      }).then(resp => {
        let list = resp.data.data.list
        vm.areaItem = list.map(obj => {
          if (vm.rank == 1) {
            return {
              value: obj.id,
              label: obj.name
            };
          }
          return {
            value: obj.id,
            label: obj.name,
            children: []
          };
        });
        if (initArr && initArr.length > 0) {
          vm.handleAreaItem([initArr[0]], initArr)
        }
      });
    }
  },
  created() {
    let vm = this
    if (vm.initval instanceof Array && vm.initval.length > 0) {
      vm.areaItemOne(vm.initval)
    } else {
      vm.areaItemOne();
    }
  },
  watch: {
    rank(val) {
      this.areaArr = []
      this.areaItem = []
      this.areaItemOne()
    },
    initval(val) {
      if (val instanceof Array) {
        this.areaItemOne(val)
      }
    }
  }
};
</script>
