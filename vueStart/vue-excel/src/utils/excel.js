import XLSX from 'xlsx'
import FileSaver from 'file-saver'

/**
 * 异步读取Excel文件的sheet表为json数据
 * 不支持合并单元格
 * @param {File对象} file
 */
export function readExcelToJson(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = e => {
      let data = new Uint8Array(e.target.result)
      let workbook = XLSX.read(data, { type: 'array' })
      console.log('workbook: ', workbook)

      // 将Excel 第一个sheet内容转为json格式
      let worksheet = workbook.Sheets[workbook.SheetNames[0]]
      console.log('worksheet: ', worksheet)
      const sheet2JSONOpts = {
        defval: '' // 给defval赋值为空的字符串，解决如果列的值为空不显示列的情况
      }
      let json = XLSX.utils.sheet_to_json(worksheet, sheet2JSONOpts)
      console.log('jsonExcel:', json)
      resolve(json)
    }
    reader.readAsArrayBuffer(file.raw)
  })
}

/**
 * 保存json为Excel文件
 * @param {*} data
 * @param {*} filename  文件名后缀为.xlsx
 */
export function saveJsonToExcel(data, filename) {
  let sheet1
  let sheet2
  let sheet3
  let sheet
  let workbook
  if (data.length > 1) {
    sheet1 = XLSX.utils.json_to_sheet(data[0])
    sheet2 = XLSX.utils.json_to_sheet(data[1])
    sheet3 = XLSX.utils.json_to_sheet(data[2])
    workbook = {
      SheetNames: ['Division', 'Position', 'Employee'],
      Sheets: {
        Division: sheet1,
        Position: sheet2,
        Employee: sheet3
      }
    }
  } else {
    console.log('1')
    console.log(data.length)
    sheet = XLSX.utils.json_to_sheet(data[0])
    workbook = {
      SheetNames: ['sheet1'],
      Sheets: {
        sheet1: sheet
      }
    }
  }

  let wbout = XLSX.write(workbook, {
    bookType: 'xlsx',
    bookSST: true,
    type: 'array'
  })

  FileSaver.saveAs(
    new Blob([wbout], { type: 'application/octet-stream' }),
    filename
  )
}
