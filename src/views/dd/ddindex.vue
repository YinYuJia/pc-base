<!--  -->
<template>
  <div class="index">
    <div class="header">
      <Header activeNum="1"></Header>
    </div>
    <div class="baiduMap" v-if="true">
      <baiduMap ref="baidumap"></baiduMap>
    </div>
    <div class="info">
      <el-row :gutter="3" type="flex" class="row-bg" justify="space-between">
        <el-col span="12">
          <div :class="{'grid-content':true}">
            <p
              style="font-size:.40rem;font-weight:900;line-height:.8rem;height:.7rem;font-family:FX-LED;color:rgba(255,255,255,1);">
              11
            </p>
            <p style="font-size:.16rem;color:#fff">施工现场数</p>
          </div>
        </el-col>
        <el-col span="12">
          <div :class="{'grid-content1':true}">
            <p style="font-size:.40rem;font-weight:900;line-height:.8rem;height:.7rem;font-family:FX-LED;color:#fff">
              11</p>
            <p style="font-size:.16rem;color:#fff">设备在线数</p>
          </div>
        </el-col>

        <el-col span="12">
          <div :class="{'grid-content1':true}" @click="showorhidden">
            <p style="font-size:.30rem;color:yellow;line-height:1.15rem">{{title}}</p>
          </div>
        </el-col>

      </el-row>
      <div>
                <el-button class="btnclass" @click="editOpenHandle" v-if="!isEdit" type="primary">编辑区域</el-button>
        <el-button class="btnclass" @click="editAddHandle" v-if="isEdit" type="primary">添加</el-button>
        <el-button class="btnclass" @click="editDeleteHandle" v-if="isEdit" type="danger">删除</el-button>
        <el-button class="btnclass" @click="editSaveHandle" v-if="isEdit" type="success">保存</el-button>
        <el-button class="btnclass" @click="editCancelHandle" v-if="isEdit" type="warning">返回</el-button>
      </div>
    </div>
    <div class="wring">
      <div class="title">
        <span class="span"></span>
        <p class="p1">Abnormal situation</p>
        <p class="p2">异常情况</p>
      </div>
      <div class="content">
        <div class="contents" @click="jump(item)" v-for="item in list" :key="item.index">
          <span class="span">></span>
          <p class="p1">未带安全帽</p>
          <p class="p2">滨江xx工地</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Header from "./common/Header"
  export default {
    components: {
      Header
    },
    data() {
      return {
        list: [{}, {}, {}, {}, {}, {}, {}, ],
        isbaidumap: true,
        title: "卫星图",
        add: "添加",
        isadd: true,
        isEdit: false,
      }
    },
    //生命周期 - 创建完成（访问当前this实例）
    created() {
      console.log(this.$getParmas.getUrl("11111111", {
        a: 1234,
        b: 1234,
        c: 1234,
        d: 1234,
      }))
     
    },
    //生命周期 - 挂载完成（访问DOM元素）
    mounted() {},
    methods: {

      editSaveHandle() {
        this.$refs.baidumap.saveEdit();
      },
      editCancelHandle() {
        this.$refs.baidumap.cancelEdit();
        this.isEdit = false
      },
      editDeleteHandle() {
        this.$refs.baidumap.deleteEdit();
      },
      editOpenHandle() {
        this.$refs.baidumap.openEdit();
        this.isEdit = true
      },
      editAddHandle() {
        this.$refs.baidumap.addEdit();
      },
      deleteinfo() {
        this.$refs.baidumap.deletecircle()
        this.isadd = true
        this.$refs.baidumap.finish()
        this.add = "添加"
      },
      showorhidden() {
        this.isbaidumap = !this.isbaidumap
        if (this.isbaidumap) {
          this.$refs.baidumap.closeMapLayer()
          this.title = "卫星图"
        } else {
          this.$refs.baidumap.openMapLayer()
          this.title = "返回"
        }
      },
      showorhiddenhuihua() {
        this.isadd = !this.isadd
        if (this.isadd) {
          this.$refs.baidumap.finish()
          this.add = "添加"
        } else {
          this.$refs.baidumap.tianjia()
          this.add = "完成"
        }
      },
      jump() {
        this.$router.push({
          path: "/liveplayer",
          query: {}
        })
      },
      AIEquipment(data) {
        console.log('111')
      }
    }
  }
</script>
<style lang='less' scoped>
  .header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2;
  }

  .baiduMap {
    position: absolute;
    top: 0; // top: 1rem;
    // left: 50%;
    // transform: translateX(-50%);
    height: 8.5rem;
    width: 14.1rem;
    z-index: 1; //   background-color: red;
  }

  .info {
    width: 5.1rem;
    height: 1.15rem;
    position: absolute;
    top: 1.47rem;
    left: .27rem;
    z-index: 2;
  }

  .el-row {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
      background-color: transparent;
    }
  }

  .el-col {
    border-radius: 4px;
    cursor: pointer;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 1.15rem;
    background-color: yellow;
    background: url("../../assets/index/left.png") no-repeat;
    background-size: 100% 100%;
    font-size: .24rem;
    font-weight: 400;
    text-align: center;
    color: rgba(2, 238, 255, 1);
  }

  .grid-content1 {
    border-radius: 4px;
    min-height: 1.15rem;
    background-color: yellow;
    background: url("../../assets/index/right.png") no-repeat;
    background-size: 100% 100%;
    font-size: .24rem;
    font-weight: 400;
    text-align: center;
    color: rgba(2, 238, 255, 1);
  }

  .wring {
    width: 3.2rem;
    height: 7.9rem;
    position: absolute;
    top: 1.6rem;
    right: .3rem;
    z-index: 2;
  }

  .title {
    width: 3.2rem;
    height: .75rem;
    position: relative;
    background-color: transparent;
    top: 0;
    left: 0;

    .span {
      float: left;
      width: .06rem;
      height: 100%;
      background-color: red;
    }

    .p1 {
      font-size: .15rem;
      height: .2rem;
      line-height: .2rem;
      text-align: left;
      text-indent: .15rem;
      color: red;
    }

    .p2 {
      font-size: .24rem;
      height: .7rem;
      line-height: .7rem;
      text-align: left;
      text-indent: .15rem;
      color: red;
    }
  }

  .content {
    overflow-y: scroll;
    height: 7.15rem;
  }

  .content::-webkit-scrollbar {
    display: none
  }

  .contents {

    width: 3.2rem;
    height: .75rem;
    // background-color: red;
    background-image: linear-gradient(to right, #FC262C, #D51017);
   
    margin-top: .15rem;
    border-radius: 5px;
    padding-left: .15rem;;

    .p1 {
      font-size: .2rem;
      height: .33rem;
      line-height: .55rem;
      text-align: left;
      text-indent: .15rem;
      color: #fff;
    }

    .p2 {
      font-size: .17rem;
      height: .4rem;
      line-height: .4rem;
      text-align: left;
      text-indent: .15rem;
      color: #fff;
    }

    .span {
      float: right;
      margin-top: .15rem;
      margin-right: .2rem;
      font-size: .3rem;
      color: #fff;
    }
  }

  .btnclass {
    min-width: 1.5rem;
    max-height: .9rem;
    margin-top: .15rem;
    margin-left:.17rem;
      background-image: linear-gradient(to right, rgba(0,62,255,.5), rgba(18,5,248,.5));//#003EFF   #1205F8
  }
</style>