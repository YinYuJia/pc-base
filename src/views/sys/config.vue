<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.dmlx" placeholder="参数类型" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="query">查询</el-button>
        <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="dmlx"
        header-align="center"
        align="center"
        label="参数类型">
      </el-table-column>
      <el-table-column
        prop="dmmc"
        header-align="center"
        align="center"
        label="参数名称">
      </el-table-column>
      <el-table-column
        prop="dmz"
        header-align="center"
        align="center"
        label="参数值">
      </el-table-column>
      <el-table-column
        prop="dmsm"
        header-align="center"
        align="center"
        label="参数说明">
      </el-table-column>
      <el-table-column
        prop="dmzt"
        header-align="center"
        align="center"
        label="是否有效">
      </el-table-column>
      <el-table-column
        prop="bz"
        header-align="center"
        align="center"
        label="备注">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row)">修改</el-button>
          <!-- <el-button type="text" size="small" @click="deleteHandle(scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
import {ParameterMatching} from "@/utils/util"
  import AddOrUpdate from './config-add-or-update'
  export default {
    data () {
      return {
        dataForm: {
          dmlx: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false
      }
    },
    components: {
      AddOrUpdate
    },
    created() {
 this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$axios.get(ParameterMatching("/apiUrl/sys/config/list"),{
            'page': this.pageIndex,
            'limit': this.pageSize,
            'dmlx': this.dataForm.dmlx
          }).then((data) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle (val) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          var id = '';
           if(val != undefined){
             id = val.dmId;
           }
          this.$refs.addOrUpdate.init(id);
        })
      },
      query(){
        this.pageIndex = 1
        this.getDataList()
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.id
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post("/apiUrl/sys/config/delete",this.$axios.adornData(ids,false)).then((data) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      }
    }
  }
</script>


<style lang="less" scoped>
  .mod-config {
    /deep/ .el-input__inner {
      background-color: transparent;
      border: 1px solid rgba(22, 16, 253, 0.7);
      color: #fff;
    }

    /deep/.el-dialog {
      background: url('../../assets/img-login/bg-TanKuang.png') no-repeat;
      background-size: 100% 100%;
      padding-top: 0.3rem;
      padding-left: 0.21rem;
      padding-right: 0.5rem;
    }

    /deep/.el-table {
      background-color: transparent;
      color: #fff;
    }

    /deep/ .el-table th {
      background-color: transparent;
      color: #fff;
    }

    /deep/ .el-table tr {
      background-color: transparent;
      color: #ccc;
    }

    /deep/ .el-table--enable-row-hover .el-table__body tr:hover>td {
      background-color: #212e3e !important;
    }

    /deep/ .el-dialog__wrapper {
      background-color: rgba(0, 0, 0, .7);
    }

    /deep/.el-dialog__title {
      color: #ffffff;
      font-size: 0.24rem;
    }

    /deep/ .el-form-item__label {
      color: #fff
    }

    /deep/ .el-select-dropdown {
      background-color: transparent;
    }

    /deep/ .el-select-dropdown__item.hover {
      background-color: rgba(22, 16, 253, 0.7);
    }

    /deep/ .el-input.is-disabled .el-input__inner {
      background-color: transparent;
      border: 1px solid rgba(22, 16, 253, 0.7);
      color: #fff;
    }
  }
</style>
