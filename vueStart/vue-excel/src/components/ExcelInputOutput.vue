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

      <el-button size="small" @click="handleDownload">点击下载</el-button>
    </div>
    <div style="display:flex;">
      <p>选择需要导出的数据</p>
      <el-input style="width:100px" v-model="excelSelect"></el-input>
      <el-button type="primary" @click="handleSelect">添加导出单位</el-button>
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

export default {
  name: 'excel-input-output',
  data() {
    return {
      file: null,
      excelSelect: '',
      excelDataSaleStandard: [this.excelSelectData],
      excelSelectData: {
        account: '',
        name: '',
        position: '',
        Company: '',
        Organization: ''
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
        '培训师'
      ],
      tableData: [],
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
      console.log(this.excelExportData[0])
      console.log(this.excelExportData[1])
      saveJsonToExcel(this.excelExportData[0], this.file.name)
    },
    handleSelect() {
      let excelSingleData = this.tableData.find(
        item => item.客户编码 === Number(this.excelSelect)
      )
      console.log(excelSingleData)
      // for (let i = 0; i <= this.excelData.length; i++) {
      //   if (Number(this.excelSelect) === this.excelData[i]['客户编码']) {
      //     let a = this.excelData[i]['客户编码']
      //     console.log(a)
      this.excelDataSaleStandard.map(value => {
        value.account = 'CD' + excelSingleData.客户编码 + value.account
        value.name = excelSingleData.客户名称 + value.name
        value.Company = excelSingleData.客户名称
        value.Organization = '000' + excelSingleData.客户编码
      })
      this.excelExportData.push(this.excelDataSaleStandard)
      this.excelDataSaleStandard = []
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
