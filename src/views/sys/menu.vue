<template>
  <div class="mod-menu">
    <el-form :inline="true" :model="dataForm">
      <el-form-item>
        <el-button v-if="isAuth('sys:user:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border style="width: 100%;">
      <el-table-column prop="menuId" header-align="center" align="center" width="80" label="ID">
      </el-table-column>
      <table-tree-column prop="name" header-align="center" treeKey="menuId" width="150" label="名称">
      </table-tree-column>
      <el-table-column prop="parentName" header-align="center" align="center" width="120" label="上级菜单">
      </el-table-column>
      <el-table-column header-align="center" align="center" label="图标">
        <template slot-scope="scope">
          <icon-svg :name="scope.row.icon"></icon-svg>
        </template>
      </el-table-column>
      <el-table-column prop="type" header-align="center" align="center" label="类型">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type === 0" size="small">目录</el-tag>
          <el-tag v-else-if="scope.row.type === 1" size="small" type="success">菜单</el-tag>
          <el-tag v-else-if="scope.row.type === 2" size="small" type="info">按钮</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="orderNum" header-align="center" align="center" label="排序号">
      </el-table-column>
      <el-table-column prop="url" header-align="center" align="center" width="150" :show-overflow-tooltip="true"
        label="菜单URL">
      </el-table-column>
      <el-table-column prop="perms" header-align="center" align="center" width="150" :show-overflow-tooltip="true"
        label="授权标识">
      </el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button v-if="isAuth('sys:user:update')" type="text" size="small"
            @click="addOrUpdateHandle(scope.row.menuId)">修改</el-button>
          <el-button v-if="isAuth('sys:user:delete')" type="text" size="small" @click="deleteHandle(scope.row.menuId)">
            删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import TableTreeColumn from './index'
  import AddOrUpdate from './menu-add-or-update'
  import {
    treeDataTranslate
  } from '@/utils'
  export default {
    data() {
      return {
        dataForm: {},
        dataList: [],
        dataListLoading: false,
        addOrUpdateVisible: false
      }
    },
    components: {
      TableTreeColumn,
      AddOrUpdate
    },
    created() {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList() {
        this.dataListLoading = true
        this.$axios.get("/apiUrl/sys/menu/list").then((data) => {
          this.dataList = treeDataTranslate(data, 'menuId')
          this.dataListLoading = false
        })
      },
      // 新增 / 修改
      addOrUpdateHandle(id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 删除
      deleteHandle(id) {
        this.$confirm(`确定对[id=${id}]进行[删除]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post(`/apiUrl/sys/menu/delete/${id}`).then((data) => {
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
  .mod-menu {
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