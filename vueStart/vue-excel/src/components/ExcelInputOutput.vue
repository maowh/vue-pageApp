<template>
  <div class="container">
    <div style="display:flex;">
      <el-upload
        ref="upload"
        action="action"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        :show-file-list="false"
        :on-change="onUploadChange"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>

      <el-button size="small" @click="handleDownload">下载申请域账号</el-button>
      <el-button size="small" @click="handleDownloadCrm"
        >下载CRM导入账号</el-button
      >
      <el-button size="small" @click="handleDownloadUserCrm"
        >下载发给用户CRM账号</el-button
      >
    </div>
    <div style="display:flex;">
      <p>选择需要导出的数据</p>
      <div>
        <el-input style="width:100px" v-model="excelSelect"></el-input>
        <el-button type="primary" @click="handleSelectDealer"
          >添加经销商导出单位</el-button
        >
        <el-button type="primary" @click="handleSelectStation"
          >添加服务站导出单位</el-button
        ><el-checkbox v-model="partsChecked">是否配件专营店</el-checkbox>
      </div>

      <ul>
        <li v-for="item in excelSelectList" :key="item.客户编码">
          {{ item.客户编码 }}
        </li>
      </ul>
      <div>
        <p>选择导出网员类型</p>
        <el-select @change="selectChange" v-model="selectData">
          <!-- <el-option disabled>---请选择---</el-option> -->
          <el-option
            v-for="(item, index) in excelRadios"
            :key="index"
            :label="item"
            :value="item"
          ></el-option
        ></el-select>
      </div>

      <p>输入CRM账号密码：</p>
      <div>
        <el-input style="width:100px" v-model="excelSelectPwd"></el-input>
      </div>
    </div>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column
        v-for="key in Object.keys(tableData[0] || {})"
        :key="key"
        :prop="key"
        :label="key"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { readExcelToJson, saveJsonToExcel } from '../utils/excel'
import Moment from 'moment'

import {
  DivisionName,
  PositionName,
  EmployeeName,
  NewAccountName,
  DealerAccountLast,
  DealerPost,
  DealerNameLast,
  StationAccountLast,
  StationPost,
  StationNameLast
} from '../data/account'
import {
  DealerDepartmentList,
  DealerPositionList,
  DealerDutyList
} from '../data/dealer'
import {
  StationDepartmentList,
  StationPositionList,
  StationDutyList
} from '../data/station'

export default {
  name: 'excel-input-output',
  data() {
    return {
      file: null,
      excelSelectPwd: '',
      excelSelect: '',
      excelRadios: ['经销商', '服务站', '配件专营店'],
      selectData: '',
      partsChecked: '',
      excelSingleData: {},
      JDivision: 0,
      JPosition: 0,
      JEmployee: 0,
      Division: [],
      DivisionName: DivisionName,
      PositionName: PositionName,
      EmployeeName: EmployeeName,
      NewAccountName: NewAccountName,
      Position: [],
      Employee: [],
      AccountNumber: [],
      excelSelectList: [],
      excelDataSaleStandard: [],
      excelUserPwd: [],
      excelUserPwdTmp: [],
      tableData: [],
      excelDataSaleStandardList: [],
      excelExportData: []
    }
  },
  methods: {
    // 读取文件为json数据
    onUploadChange(file) {
      console.log(file)
      this.file = file
      readExcelToJson(file).then(res => {
        this.tableData = res
        // console.log(res)
      })
    },

    handleDownload() {
      this.excelDataSaleStandardList.push(this.excelDataSaleStandard)
      let nowDate = Moment(new Date()).format('YYYY-MM-DD')
      console.log(this.excelDataSaleStandard)
      saveJsonToExcel(
        this.excelDataSaleStandardList,
        nowDate + '新增域账号申请' + '.xlsx'
      )
    },
    handleDownloadCrm() {
      let nowDate = Moment(new Date()).format('YYYY-MM-DD')
      this.excelExportData.push(this.Division)
      this.excelExportData.push(this.Position)
      this.excelExportData.push(this.Employee)
      saveJsonToExcel(
        this.excelExportData,
        nowDate + 'CRM导入账号申请' + '.xlsx'
      )
    },
    handleDownloadUserCrm() {
      let nowDate = Moment(new Date()).format('YYYY-MM-DD')
      saveJsonToExcel(
        this.excelUserPwd,
        this.excelSingleData.客户名称 + nowDate + '.xlsx'
      )
    },
    selectChange(id) {
      this.selectData = id
    },
    handleSelectDealer() {
      this.excelSingleData = {}
      this.excelSingleData = this.tableData.find(
        item => item.客户编码 === Number(this.excelSelect)
      )
      if (this.excelSingleData !== undefined || this.excelSingleData !== null) {
        this.excelSelectList.push(this.excelSingleData)
        for (let i = 0; i < 2; i++) {
          this.DivisionName = {}
          this.DivisionName.序号 = this.JDivision + 1
          this.JDivision = this.JDivision + 1
          this.DivisionName.部门名称 = DealerDepartmentList[i]
          this.DivisionName.场所 = this.excelSingleData.客户编码
          this.DivisionName.父部门名称 = this.excelSingleData.客户名称
          this.DivisionName.父部门组织 = this.excelSingleData.客户名称
          this.DivisionName.部门类型 = '经销商部门'
          this.Division.push(this.DivisionName)
        }
        for (let i = 0; i < 8; i++) {
          this.PositionName = {}
          this.PositionName.序号 = this.JPosition + 1
          this.JPosition = this.JPosition + 1
          this.PositionName.部门 = DealerDepartmentList[0]
          this.PositionName.部门的组织 = this.excelSingleData.客户名称
          this.PositionName.职位 = DealerPost[i]
          this.PositionName.父职位 = DealerPost[1]
          this.PositionName.父职位组织 = this.excelSingleData.客户名称
          switch (i) {
            case 0:
              this.PositionName.父职位 = ''
              this.PositionName.职位类型 = DealerPositionList[0]
              break
            case 1:
              this.PositionName.父职位 = DealerPost[0]
              this.PositionName.职位类型 = DealerPositionList[1]
              break
            case 2:
              this.PositionName.职位类型 = DealerPositionList[1]
              break
            case 3:
              this.PositionName.部门 = DealerDepartmentList[1]
              this.PositionName.职位类型 = DealerPositionList[2]
              break
            case 4:
              this.PositionName.职位类型 = DealerPositionList[3]
              break
            case 5:
              this.PositionName.职位类型 = DealerPositionList[4]
              break
            case 6:
              this.PositionName.职位类型 = DealerPositionList[3]
              break
            default:
              this.PositionName.职位类型 = DealerPositionList[5]
              break
          }
          this.Position.push(this.PositionName)
        }
        for (let i = 0; i < 9; i++) {
          this.EmployeeName = {}
          this.EmployeeName.序号 = this.JEmployee + 1
          this.JEmployee = this.JEmployee + 1
          this.EmployeeName.姓名 =
            this.excelSingleData.客户名称 + DealerNameLast[i]
          this.EmployeeName.用户ID =
            'CD' + this.excelSingleData.客户编码 + DealerAccountLast[i]
          switch (i) {
            case 0:
              this.EmployeeName.职责 = DealerDutyList[i]
              break
            case 1:
              this.EmployeeName.职责 = DealerDutyList[i - 1]
              break
            case 2:
              this.EmployeeName.职责 = DealerDutyList[i - 1]
              break
            case 3:
              this.EmployeeName.职责 = DealerDutyList[i - 1]
              break
            case 4:
              this.EmployeeName.职责 = DealerDutyList[i - 1]
              break
            case 5:
              this.EmployeeName.职责 = DealerDutyList[i - 1]
              break
            case 6:
              this.EmployeeName.职责 = DealerDutyList[i - 1]
              this.EmployeeName.姓名 =
                this.excelSingleData.客户名称 + DealerNameLast[i - 2]
              this.EmployeeName.用户ID =
                'CD' + this.excelSingleData.客户编码 + DealerAccountLast[i - 2]
              break
            case 7:
              this.EmployeeName.姓名 =
                this.excelSingleData.客户名称 + DealerNameLast[i - 2]
              this.EmployeeName.职责 = DealerDutyList[i - 2]
              this.EmployeeName.用户ID =
                'CD' + this.excelSingleData.客户编码 + DealerAccountLast[i - 2]
              break
            default:
              this.EmployeeName.姓名 =
                this.excelSingleData.客户名称 + DealerNameLast[i - 2]
              this.EmployeeName.职责 = DealerDutyList[i - 2]
              this.EmployeeName.用户ID =
                'CD' + this.excelSingleData.客户编码 + DealerAccountLast[i - 2]
              break
          }
          this.EmployeeName.职位 = DealerPost[i]
          switch (i) {
            case 7:
              this.EmployeeName.职位 = DealerPost[i - 1]
              break
            case 8:
              this.EmployeeName.职位 = DealerPost[i - 1]
              break
          }
          this.EmployeeName.组织 = this.excelSingleData.客户名称
          this.Employee.push(this.EmployeeName)
          this.excelUserPwdTmp.push(this.EmployeeName)
        }
        for (let i = 0; i < 7; i++) {
          this.NewAccountName = {}
          this.NewAccountName.域帐号名 =
            'CD' + this.excelSingleData.客户编码 + DealerAccountLast[i]
          this.NewAccountName.姓名 =
            this.excelSingleData.客户名称 + DealerNameLast[i]
          if (i === 6) {
            this.NewAccountName.职务 = DealerPost[i + 1]
          } else {
            this.NewAccountName.职务 = DealerPost[i]
          }
          this.NewAccountName.单位名称 = this.excelSingleData.客户名称
          this.NewAccountName.所属组织代码 =
            '000' + this.excelSingleData.客户编码
          this.excelDataSaleStandard.push(this.NewAccountName)
          // console.log(DealerAccountLast[i])
        }
        if (this.excelUserPwdTmp.length > 0) {
          this.excelUserPwdTmp.splice(6, 1)
          this.excelUserPwdTmp.splice(6, 1)
          // for (let i = 0; i < this.excelUserPwdTmp.length; i++) {
          //   delete this.excelUserPwdTmp[i].职责
          // }
          // 添加密码字段
          this.excelUserPwdTmp.forEach(value => {
            value['密码'] = this.excelSelectPwd
          })
          this.excelUserPwd.push(this.excelUserPwdTmp)
          this.excelUserPwdTmp = []
        } else {
          alert('没有选中导出给网员的信息！')
        }
      } else {
        alert('客户编码不在列表中，请输入正确客户编码！')
      }
    },
    handleSelectStation() {
      this.excelSingleData = {}
      this.excelSingleData = this.tableData.find(
        item => item.客户编码 === Number(this.excelSelect)
      )
      if (this.excelSingleData !== undefined && this.excelSingleData !== null) {
        this.excelSelectList.push(this.excelSingleData)
        for (let i = 0; i < StationDepartmentList.length; i++) {
          this.DivisionName = {}
          this.DivisionName.序号 = this.JDivision + 1
          this.JDivision = this.JDivision + 1
          this.DivisionName.部门名称 = StationDepartmentList[i]
          this.DivisionName.场所 = this.excelSingleData.客户编码
          this.DivisionName.父部门名称 = this.excelSingleData.客户名称
          this.DivisionName.父部门组织 = this.excelSingleData.客户名称
          this.DivisionName.部门类型 = '服务站部门'
          this.Division.push(this.DivisionName)
        }
        if (this.partsChecked) {
          // 配件专营店账号权限
        } else {
          // 服务站账号权限
          for (let i = 0; i < StationPost.length; i++) {
            this.PositionName = {}
            this.PositionName.序号 = this.JPosition + 1
            this.JPosition = this.JPosition + 1
            this.PositionName.部门 = StationDepartmentList[0]
            this.PositionName.部门的组织 = this.excelSingleData.客户名称
            this.PositionName.职位 = StationPost[i]
            this.PositionName.父职位 = StationPost[1]
            this.PositionName.父职位组织 = this.excelSingleData.客户名称
            this.PositionName.职位类型 = StationPositionList[i]
            this.Position.push(this.PositionName)
          }
          for (let i = 0; i < StationAccountLast.length; i++) {
            this.EmployeeName = {}
            this.EmployeeName.序号 = this.JEmployee + 1
            this.JEmployee = this.JEmployee + 1
            this.EmployeeName.姓名 =
              this.excelSingleData.客户名称 + StationNameLast[i]
            this.EmployeeName.用户ID =
              'CD' + this.excelSingleData.客户编码 + StationAccountLast[i]
            this.EmployeeName.职责 = StationDutyList[i]
            this.EmployeeName.职位 = StationPost[i]
            this.EmployeeName.组织 = this.excelSingleData.客户名称
            this.Employee.push(this.EmployeeName)
            this.excelUserPwdTmp.push(this.EmployeeName)
          }
          for (let i = 0; i < StationAccountLast; i++) {
            this.NewAccountName = {}
            this.NewAccountName.域帐号名 =
              'CD' + this.excelSingleData.客户编码 + StationAccountLast[i]
            this.NewAccountName.姓名 =
              this.excelSingleData.客户名称 + StationNameLast[i]
            this.NewAccountName.单位名称 = this.excelSingleData.客户名称
            this.NewAccountName.所属组织代码 =
              '000' + this.excelSingleData.客户编码
            this.excelDataSaleStandard.push(this.NewAccountName)
          }
          if (this.excelUserPwdTmp.length > 0) {
            // for (let i = 0; i < this.excelUserPwdTmp.length; i++) {
            //   delete this.excelUserPwdTmp[i].职责
            // }
            // 添加密码字段
            // this.excelUserPwdTmp.forEach(value => {
            //   value['密码'] = this.excelSelectPwd
            // })
            this.excelUserPwd.push(this.excelUserPwdTmp)
            this.excelUserPwdTmp = []
          } else {
            alert('没有选中导出给网员的信息！')
          }
        }
      } else {
        alert('客户编码不在列表中，请输入正确客户编码！')
      }
    }
  }
}
</script>

<style lang="scss">
body {
  background: #f4f4f4;
  padding: 0;
  margin: 0;
}
.container {
  width: 1024px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
}
</style>
