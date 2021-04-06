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
        <el-button type="primary" @click="handleSelect">添加导出单位</el-button>
      </div>

      <ul>
        <li v-for="item in excelSelectList" :key="item.客户编码">
          {{ item.客户编码 }}
        </li>
      </ul>
      <div>
        <p>选择导出网员类型</p>
        <el-select @change="selectChange" v-model="selectData">
          <el-option disabled>---请选择---</el-option>
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

export default {
  name: 'excel-input-output',
  data() {
    return {
      file: null,
      excelSelectPwd: '',
      excelSelect: '',
      excelRadios: ['经销商', '服务站', '配件专营店'],
      selectData: '',
      excelSingleData: {},
      JDivision: 0,
      JPosition: 0,
      JEmployee: 0,
      Division: [],
      DivisionName: ['销售部', '财务部'],
      excelDivisionData: {
        序号: '',
        部门名称: '',
        场所: '',
        父部门名称: '',
        父部门组织: '',
        部门类型: ''
      },
      Position: [],
      PositionName: [
        '总经理',
        '销售经理',
        '财务经理',
        '计划员',
        '库管人员',
        '培训师'
      ],
      excelPositionData: {
        序号: '',
        部门: '',
        部门的组织: '',
        职位: '',
        父职位: '',
        父职位组织: '',
        职位类型: ''
      },
      Employee: [],
      EmployeeName: [
        'DFL Dealer CEO New',
        'DFL Dealer Sales Manager',
        'DFL Dealer Finance Manager',
        'DFL Dealer Plan&Order Agent',
        'DFL Dealer Inventory Super Admin',
        'DFL VL Dealer',
        'DFLII Service Vehicles Trainers'
      ],
      excelEmployeeData: {
        序号: '',
        姓名: '',
        用户ID: '',
        职责: '',
        职位: '',
        组织: ''
      },
      AccountNumber: [],
      excelSelectList: [],
      excelDataSaleStandard: [],
      excelSelectData: {
        域帐号名: '',
        姓名: '',
        职务: '',
        单位名称: '',
        所属组织代码: ''
      },
      excelSelectDataAccount: ['M00', 'M01', 'M40', 'F01', 'P01', 'W01', 'L01'],
      excelSelectDataName: [
        '总经理',
        '分管销售副总经理',
        '重型牵引车品系经理',
        '财务经理',
        '计划员',
        '仓库保管员',
        '培训师'
      ],
      excelSelectDataPosition: [
        '总经理',
        '分管销售副总经理01',
        '重型牵引车品系经理01',
        '财务经理01',
        '计划员01',
        '仓库保管员01',
        '信息员01',
        '培训师'
      ],
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
    handleSelect() {
      this.excelSingleData = {}
      this.excelSingleData = this.tableData.find(
        item => item.客户编码 === Number(this.excelSelect)
      )
      if (this.excelSingleData !== undefined || this.excelSingleData !== null) {
        this.excelSelectList.push(this.excelSingleData)
        for (let i = 0; i < 2; i++) {
          this.excelDivisionData = {}
          this.excelDivisionData.序号 = this.JDivision + 1
          this.JDivision = this.JDivision + 1
          this.excelDivisionData.部门名称 = this.DivisionName[i]
          this.excelDivisionData.场所 = this.excelSingleData.客户编码
          this.excelDivisionData.父部门名称 = this.excelSingleData.客户名称
          this.excelDivisionData.父部门组织 = this.excelSingleData.客户名称
          this.excelDivisionData.部门类型 = '经销商部门'
          this.Division.push(this.excelDivisionData)
        }
        for (let i = 0; i < 8; i++) {
          this.excelPositionData = {}
          this.excelPositionData.序号 = this.JPosition + 1
          this.JPosition = this.JPosition + 1
          this.excelPositionData.部门 = this.DivisionName[0]
          this.excelPositionData.部门的组织 = this.excelSingleData.客户名称
          this.excelPositionData.职位 = this.excelSelectDataPosition[i]
          this.excelPositionData.父职位 = this.excelSelectDataPosition[1]
          this.excelPositionData.父职位组织 = this.excelSingleData.客户名称
          switch (i) {
            case 0:
              this.excelPositionData.父职位 = ''
              this.excelPositionData.职位类型 = this.PositionName[0]
              break
            case 1:
              this.excelPositionData.父职位 = this.excelSelectDataPosition[0]
              this.excelPositionData.职位类型 = this.PositionName[1]
              break
            case 2:
              this.excelPositionData.职位类型 = this.PositionName[1]
              break
            case 3:
              this.excelPositionData.部门 = this.DivisionName[1]
              this.excelPositionData.职位类型 = this.PositionName[2]
              break
            case 4:
              this.excelPositionData.职位类型 = this.PositionName[3]
              break
            case 5:
              this.excelPositionData.职位类型 = this.PositionName[4]
              break
            case 6:
              this.excelPositionData.职位类型 = this.PositionName[3]
              break
            default:
              this.excelPositionData.职位类型 = this.PositionName[5]
              break
          }
          this.Position.push(this.excelPositionData)
        }
        for (let i = 0; i < 9; i++) {
          this.excelEmployeeData = {}
          this.excelEmployeeData.序号 = this.JEmployee + 1
          this.JEmployee = this.JEmployee + 1
          this.excelEmployeeData.姓名 =
            this.excelSingleData.客户名称 + this.excelSelectDataName[i]
          this.excelEmployeeData.用户ID =
            'CD' +
            this.excelSingleData.客户编码 +
            this.excelSelectDataAccount[i]
          this.excelEmployeeData.职位 = this.excelSelectDataPosition[i]
          switch (i) {
            case 0:
              this.excelEmployeeData.职责 = this.EmployeeName[i]
              break
            case 1:
              this.excelEmployeeData.职责 = this.EmployeeName[i - 1]
              break
            case 2:
              this.excelEmployeeData.职责 = this.EmployeeName[i - 1]
              break
            case 3:
              this.excelEmployeeData.职责 = this.EmployeeName[i - 1]
              break
            case 4:
              this.excelEmployeeData.职责 = this.EmployeeName[i - 1]
              break
            case 5:
              this.excelEmployeeData.职责 = this.EmployeeName[i - 1]
              break
            case 6:
              this.excelEmployeeData.职责 = this.EmployeeName[i - 1]
              this.excelEmployeeData.姓名 =
                this.excelSingleData.客户名称 + this.excelSelectDataName[i - 2]
              this.excelEmployeeData.用户ID =
                'CD' +
                this.excelSingleData.客户编码 +
                this.excelSelectDataAccount[i - 2]
              // this.excelEmployeeData.职位 = this.excelSelectDataPosition[i]
              break
            case 7:
              this.excelEmployeeData.姓名 =
                this.excelSingleData.客户名称 + this.excelSelectDataName[i - 2]
              this.excelEmployeeData.职责 = this.EmployeeName[i - 2]
              this.excelEmployeeData.职位 = this.excelSelectDataPosition[i - 1]
              this.excelEmployeeData.用户ID =
                'CD' +
                this.excelSingleData.客户编码 +
                this.excelSelectDataAccount[i - 2]
              break
            default:
              this.excelEmployeeData.姓名 =
                this.excelSingleData.客户名称 + this.excelSelectDataName[i - 2]
              this.excelEmployeeData.职责 = this.EmployeeName[i - 2]
              this.excelEmployeeData.职位 = this.excelSelectDataPosition[i - 1]
              this.excelEmployeeData.用户ID =
                'CD' +
                this.excelSingleData.客户编码 +
                this.excelSelectDataAccount[i - 2]
              break
          }
          // this.excelEmployeeData.职责 = this.EmployeeName[i]
          this.excelEmployeeData.组织 = this.excelSingleData.客户名称
          this.Employee.push(this.excelEmployeeData)
          this.excelUserPwdTmp.push(this.excelEmployeeData)
          // this.excelEmployeeData.密码 = 'dfcv88!'
        }
        for (let i = 0; i < 7; i++) {
          this.excelSelectData = {}
          this.excelSelectData.域帐号名 =
            'CD' +
            this.excelSingleData.客户编码 +
            this.excelSelectDataAccount[i]
          this.excelSelectData.姓名 =
            this.excelSingleData.客户名称 + this.excelSelectDataName[i]
          if (i === 6) {
            this.excelSelectData.职务 = this.excelSelectDataPosition[i + 1]
          } else {
            this.excelSelectData.职务 = this.excelSelectDataPosition[i]
          }
          this.excelSelectData.单位名称 = this.excelSingleData.客户名称
          this.excelSelectData.所属组织代码 =
            '000' + this.excelSingleData.客户编码
          this.excelDataSaleStandard.push(this.excelSelectData)
          // console.log(this.excelSelectDataAccount[i])
        }
        if (this.excelUserPwdTmp.length > 0) {
          this.excelUserPwdTmp.splice(6, 1)
          this.excelUserPwdTmp.splice(6, 1)
          // for (let i = 0; i < this.excelUserPwdTmp.length; i++) {
          //   delete this.excelUserPwdTmp[i].职责
          // }
          // 添加密码字段
          // this.excelUserPwdTmp.forEach(value => {
          //   value['密码'] = this.excelSelectPwd
          // })
          this.excelUserPwd.push(this.excelUserPwdTmp)
          this.excelUserPwdTmp = []
          console.log(this.excelUserPwd)
          console.log(this.Employee)
        } else {
          alert('没有选中导出给网员的信息！')
        }
      } else {
        alert('客户编码不在列表中，请输入正确客户编码！')
      }
      // for (let i = 0; i <= this.excelData.length; i++) {
      //   if (Number(this.excelSelect) === this.excelData[i]['客户编码']) {
      //     let a = this.excelData[i]['客户编码']
      //     console.log(a)
      // this.excelDataSaleStandard.map(value => {
      //   value.account = 'CD' + excelSingleData.客户编码 + value.account
      //   value.name = excelSingleData.客户名称 + value.name
      //   value.Company = excelSingleData.客户名称
      //   value.Organization = '000' + excelSingleData.客户编码
      // })
      // this.excelExportData.push(this.excelDataSaleStandard)
      // console.log(this.excelDataSaleStandard)
      // this.excelDataSaleStandard = []
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
