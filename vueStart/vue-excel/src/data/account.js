// CRM导入格式的三个表字段名
var DivisionName = {
  序号: '',
  部门名称: '',
  场所: '',
  父部门名称: '',
  父部门组织: '',
  部门类型: ''
}
var PositionName = {
  序号: '',
  部门: '',
  部门的组织: '',
  职位: '',
  父职位: '',
  父职位组织: '',
  职位类型: ''
}
var EmployeeName = {
  序号: '',
  姓名: '',
  用户ID: '',
  职责: '',
  职位: '',
  组织: ''
}
// 域账号字段
var NewAccountName = {
  域帐号名: '',
  姓名: '',
  职务: '',
  单位名称: '',
  所属组织代码: ''
}
// 经销商账号尾缀
const DealerAccountLast = ['M00', 'M01', 'M40', 'F01', 'P01', 'W01', 'L01']
// 服务站账号尾缀
const StationAccountLast = [
  'J01',
  'C01',
  'T01',
  'Q01',
  'A01',
  'B01',
  'E01',
  'G01',
  'H01',
  'X01',
  'CD_DFSA'
]
// 经销商职务
const DealerPost = [
  '总经理',
  '分管销售副总经理01',
  '重型牵引车品系经理01',
  '财务经理01',
  '计划员01',
  '仓库保管员01',
  '信息员01',
  '培训师'
]
// 服务站职务
const StationPost = [
  '整备师01',
  '鉴定员01',
  '接待员01',
  '旧件管理员01',
  '服务经理',
  '财务经理01',
  '配件销售经理01',
  '配件销售顾问01',
  '库管员01',
  '服务产品专员',
  '服务站计划员'
]
// 经销商姓名尾缀
const DealerNameLast = [
  '总经理',
  '分管销售副总经理',
  '重型牵引车品系经理',
  '财务经理',
  '计划员',
  '仓库保管员',
  '培训师'
]
// 服务站姓名尾缀
const StationNameLast = [
  '整备师',
  '鉴定员',
  '接待员',
  '旧件管理员',
  '服务经理',
  '财务经理',
  '配件销售经理',
  '配件销售顾问',
  '库管员',
  '服务产品专员',
  '服务站计划员'
]

export {
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
}
