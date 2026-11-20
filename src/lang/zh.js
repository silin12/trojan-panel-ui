export default {
  route: {
    dashboard: '首页',
    serverManage: '服务器管理',
    serverList: '服务器列表',
    serverDetail: '服务器详情',
    nodeManage: '节点管理',
    nodeList: '节点列表',
    accountManage: '用户管理',
    accountList: '用户列表',
    modifyPass: '修改密码',
    system: '系统设置',
    baseConfig: '基础设置',
    blackList: '黑名单',
    emailManage: '邮件管理',
    emailRecord: '发送记录',
    profile: '个人中心',
    taskManage: '任务管理',
    taskList: '任务列表',
    modify: '修改属性'
  },
  navbar: {
    size: '布局大小',
    profile: '个人中心',
    github: '项目地址',
    doc: '项目文档',
    logout: '退出登录'
  },
  login: {
    title: 'Trojan Panel',
    logIn: '登录',
    username: '账号',
    password: '密码',
    register: '没有账号?',
    code: '验证码'
  },
  register: {
    title: '用户注册',
    username: '账号',
    passOne: '密码',
    pass: '密码',
    email: '邮箱(只支持163 126 qq gmail)',
    register: '注册',
    login: '我已有账号'
  },
  table: {
    enable: '开启',
    disable: '禁用',
    search: '搜索',
    add: '添加',
    clashSubscribe: 'Clash.Meta订阅',
    clashSubscribeForSb: '复制订阅',
    actions: '操作',
    edit: '编辑',
    delete: '删除',
    cancel: '取 消',
    confirm: '确 定',
    id: '序号',
    status: '状态',
    username: '用户名',
    role: '角色',
    quota: '总流量',
    download: '下载流量',
    upload: '上传流量',
    editQuota: '总流量/MB',
    flow: '剩余流量',
    expireTime: '到期时间',
    createTime: '创建时间',
    reset: '重设流量',
    pass: '密码',
    email: '邮箱(只支持163 126 qq gmail)',
    oldPass: '原密码',
    newPass: '新密码',
    nodeName: '节点名称',
    nodeDomain: '域名',
    nodePort: '端口',
    nodePriority: '优先级',
    nodeType: '类型',
    nodeStatus: '状态',
    nodeStatusSuccess: '正常',
    nodeStatusError: '异常',
    password: '密码',
    uuid: 'UUID',
    alterId: 'Alter Id',
    xrayProtocol: '协议',
    xrayFlow: '流控',
    xraySSMethod: '加密方式',
    xraySSNetwork: '网络协议',
    xraySocksUser: '用户名',
    xraySocksPass: '密码',
    xraySocksUdp: '是否开启UDP',
    xrayStreamSettingsNetwork: '传输方式类型',
    xrayStreamSettingsSecurity: '传输层加密',
    xrayStreamSettingsWsSettingsPath: 'Websocket路径',
    xrayFallbacks: '回落',
    trojanGoSni: 'SNI',
    trojanGoMuxEnable: '是否开启多路复用',
    trojanGoWebsocketEnable: '是否开启Websocket',
    trojanGoWebsocketPath: 'Websocket路径',
    trojanGoWebsocketHost: 'Websocket Host',
    trojanGoSsEnable: '是否开启SS AEAD',
    trojanGoSsMethod: 'SS AEAD加密方式',
    trojanGoSsPassword: 'SS AEAD密码',
    hysteriaProtocol: '模式',
    hysteriaObfs: '混淆密码',
    hysteriaUpMbps: '单客户端最大上传速度/Mbps',
    hysteriaDownMbps: '单客户端最大下载速度/Mbps',
    hysteriaServerName: 'SNI',
    hysteriaInsecure: '允许不安全',
    hysteriaFastOpen: '快速打开',
    naiveProxyUsername: '用户',
    hysteriaTip: '目前支持的Hysteria处于测试阶段，只支持用户认证不支持流量统计。',
    naiveproxyTip: '目前支持的NaiveProxy处于测试阶段，只支持用户认证不支持流量统计。',
    hysteria2ObfsPassword: '混淆密码',
    hysteria2UpMbps: '单客户端最大上传速度/Mbps',
    hysteria2DownMbps: '单客户端最大下载速度/Mbps',
    hysteria2ServerName: 'SNI',
    hysteria2Insecure: '允许不安全',
    nodeQRCode: '生成二维码',
    nodeURL: '复制URL',
    detail: '详情',
    blackListIp: 'IP',
    toEmail: '收件人',
    subject: '主题',
    content: '内容',
    sendFail: '发送失败',
    sendWait: '等待发送',
    sendSuccess: '发送成功',
    nodeServer: '服务器',
    nodeServerIp: '服务器IP',
    nodeServerName: '服务器名称',
    nodeServerGrpcPort: 'API端口',
    trojanPanelCoreVersion: 'TP Core 版本',
    import: '导入',
    export: '导出',
    coverByAccountName: '是否根据用户名覆盖',
    coverByNodeServerName: '是否根据服务器名称覆盖',
    coverByNodeName: '是否根据节点名称覆盖',
    yes: '是',
    no: '否',
    fileTaskName: '名称',
    fileTaskType: '类型',
    fileTaskStatus: '状态',
    fileTaskErrMsg: '错误信息',
    taskTypeAccountExport: '账户导出',
    taskTypeNodeServerExport: '服务器导出',
    taskTypeAccountImport: '账户导入',
    taskTypeNodeServerImport: '服务器导入',
    taskTypeNodeExport: '节点导出',
    taskTypeNodeImport: '节点导入',
    taskFail: '失败',
    taskWait: '等待',
    taskDoing: '正在进行',
    taskSuccess: '成功',
    fileTaskAccountUsername: '创建人',
    fileTaskDownload: '下载',
    downloadTemplate: '下载模板',
    deleted: '是否禁用',
    fingerprint: '指纹',
    createBatch: '批量创建',
    num: '数量',
    presetExpire: '预设有效期/天',
    presetQuota: '预设总流量/MB',
    exportAccountUnused: '导出未使用的账户',
    lastLoginTime: '最后一次登录时间',
    lastLoginTimeUnused: '是否使用过',
    orderFields: '排序字段',
    orderBy: '排序方式',
    desc: '倒序',
    asc: '正序'
  },
  tagsView: {
    refresh: '刷新',
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  },
  settings: {
    title: '系统布局配置',
    theme: '主题色',
    tagsView: '开启 Tags-View',
    fixedHeader: '固定 Header',
    sidebarLogo: '侧边栏 Logo'
  },
  dashboard: {
    diskUsed: '磁盘使用率',
    memUsed: '内存使用率',
    cpuUsed: 'CPU使用率',
    expireTime: '到期时间',
    nodeCount: '节点总数',
    onLine: '在线用户数',
    residualFlow: '剩余流量',
    quota: '总流量',
    accountCount: '用户总数',
    unlimited: '无限',
    ranking: '排名',
    username: '用户名',
    trafficUsed: '已用流量',
    trafficRank: '流量排行(前15名, 一小时更新一次)'
  },
  config: {
    backupTip: '每天把面板数据库打包保存到本机 /tpdata/backup/daily，按份数自动清理；可另开邮件冷备，把同一份包发到你的邮箱。',
    backupSecPolicy: '备份策略',
    backupRefresh: '刷新',
    backupRun: '立即备份',
    backupSave: '保存',
    backupOk: '成功',
    backupError: '失败',
    backupLast: '上次备份',
    backupNone: '尚未备份',
    backupNext: '下次计划',
    backupEnable: '启用定时备份',
    backupTime: '备份时间',
    backupRetention: '本机保留份数',
    backupTimeHint: '每天按该时间执行一次',
    backupRetentionHint: '超出份数的旧包自动删除',
    backupMail: '邮件冷备',
    backupMailEnable: '同步发送到邮箱',
    backupTestMail: '发送测试邮件',
    backupSmtpHost: 'SMTP 服务器',
    backupSmtpUser: '邮箱账号',
    backupSmtpPass: '授权码 / 密码',
    backupSmtpPassSaved: '已保存，留空则不修改',
    backupSmtpTo: '收件地址',
    backupSecPull: '反向拉取（NAS / 其它机器）',
    backupPullOn: '已开启',
    backupPullOff: '已关闭',
    backupPullTip: '此令牌可直接下载备份包（包内含数据库与面板配置），等同于数据库凭据，请勿外传；泄露请立即重置。',
    backupPullToken: '拉取令牌',
    backupPullDisabledHint: '已关闭，令牌链接不可用',
    backupCopy: '复制',
    backupPullUrl: '拉取地址（最新一份）',
    backupPullReset: '重置令牌',
    backupPullResetHint: '重置后旧链接立即失效，NAS 上的定时任务需同步更新',
    backupSecFiles: '本机备份文件',
    backupSize: '大小',
    backupOps: '操作',
    backupDownload: '下载',
    backupRestore: '恢复',
    backupMerge: '补账号',
    backupEmpty: '暂无备份文件',
    backupRestoreTitle: '恢复备份（仅数据库）',
    backupRestoreTip: '恢复会用备份包里的数据库覆盖当前面板数据库（账号、节点、服务器、任务等全部回滚）。恢复前会自动导出当前库到 /tpdata/backup/pre-restore-*.sql.gz 便于回滚；恢复过程中面板和后端会短暂重启。',
    backupRestoreMode: '恢复方式',
    backupRestoreModeOverwrite: '覆盖恢复（回滚到该时间点）',
    backupRestoreModeMerge: '仅补缺失账号（不覆盖、不删除）',
    backupRestoreModeTip: '覆盖恢复会退掉该备份之后新增的账号；如果只是想把少的账号补回来，选“仅补缺失账号”。',
    backupRestoreFrom: '备份包',
    backupRestorePick: '选择备份包（.tar.gz）',
    backupMergeRun: '上传并补账号',
    backupRestoreRun: '上传并恢复',
    backupTestDav: '测试 WebDAV',
    backupLocal: '本机备份文件',
    backupDone: '已保存',
    backupPullOnMsg: '已开启反向拉取，令牌链接立即生效',
    backupPullOffMsg: '已关闭反向拉取，令牌链接立即失效',
    backupRunConfirm: '立即执行一次备份？',
    backup: '定时备份',
    backupOkBtn: '确定',
    backupCancel: '取消',
    backupMergeDone: '已补入缺失账号，现有账号与其他数据未改动。',
    backupRestoreDone: '恢复完成。若页面提示未登录或数据未刷新，请退出重新登录。',
    backupCopied: '已复制',
    backupPullResetConfirm: '重置后旧链接立即失效，NAS 上的定时任务需同步更新地址。确定重置？',
    accountConfig: '用户设置',
    configWebFile: '自定义伪装网站',
    configEmail: '系统邮箱设置',
    registerEnable: '是否开放注册',
    registerQuota: '新用户默认流量/MB',
    registerExpireDays: '新用户默认到期天数',
    resetDownloadAndUploadMonth: '是否每月重设下载和上传流量',
    resetDownloadAndUploadMonthTip: '开启后每月1号 00:00（Asia/Shanghai）自动重置普通用户的上传/下载流量',
    trafficRankEnable: '是否开启流量排行',
    captchaEnable: '是否开启验证码登录',
    webFileBtn: '上传到服务器',
    webFileSelect: '选取文件',
    webFileTip: '文件格式只支持.zip，且大小不能超过10MB',
    imageFileTip: '文件格式只支持.png，且大小不能超过3MB',
    jsonFileTip: '文件格式只支持.json，且大小不能超过10MB',
    emailEnable: '是否开启邮箱功能',
    emailHost: '邮箱Host',
    emailPort: '邮箱端口',
    emailUsername: '邮箱用户名',
    emailPassword: '邮箱密码',
    expireWarnEnable: '是否开启到期提醒',
    expireWarnDay: '提醒提前的天数',
    expireWarnOnDay: '到期当天再提醒一次（发到邮箱）',
    quotaWarnEnable: '是否开启流量提醒',
    quotaWarnPercent: '流量提醒阈值（百分比 1-100）',
    templateConfig: '模板设置',
    dbGuard: '通讯防火墙',
    dbGuardTip: '控制 MariaDB(9507) 与 Redis(6378) 的公网访问。开放模式便于临时接入新服务器；白名单模式只放通列表内的 IP，其余一律拒绝。',
    dbGuardMode: '当前模式',
    dbGuardOpen: '开放端口',
    dbGuardGuard: '启用白名单',
    dbGuardOpenHint: '9507 / 6378 当前对全网开放',
    dbGuardGuardHint: '仅白名单 IP 可访问，本机 loopback 始终可用',
    dbGuardPorts: '端口监听',
    dbGuardRefresh: '刷新',
    dbGuardAllow: '白名单',
    dbGuardAllowAdd: '输入 IP 或 CIDR，例如 1.2.3.4 或 10.0.0.0/8',
    dbGuardAdd: '添加',
    dbGuardAction: '操作',
    dbGuardRemove: '移除',
    dbGuardAllowHint: '添加白名单会自动切到白名单模式；以后接入美国子机时把它的公网 IP 加进来。',
    dbGuardOpenConfirm: '开放后 9507 / 6378 将对全网可见，确认继续？',
    dbGuardGuardConfirm: '启用白名单后，列表外的 IP 将无法连接数据库，确认继续？',
    dbGuardOk: '确定',
    dbGuardCancel: '取消',
    dbGuardDone: '已生效',
    dbGuardSync: '刷新白名单',
    dbGuardSyncDone: '白名单已同步',
    dbGuardInList: '该 IP 已在数据库白名单中',
    dbGuardNotInList: '该 IP 尚未加入白名单，可点「刷新白名单」处理',
    systemLogo: 'Logo',
    systemName: '系统名称',
    clashRule: 'Clash规则',
    xrayTemplate: 'Xray模板',
    modifyPass: '修改密码',
    modifyProperty: '修改信息',
  },
  valid: {
    passNotSame: '两次新密码输入不一致',
    username: '请输入用户名',
    usernameRange: '名称的范围在6-20字符之间',
    usernameElement: '用户名必须是字母和数字的组合',
    usernameNotExistAdmin: '用户名不能包含admin',
    pass: '请输入密码',
    passNew: '请输入新密码',
    passRange: '密码的范围在6-20字符之间',
    passElement: '密码必须是字母和数字的组合',
    quota: '请输入总流量',
    quotaRange: '总流量的范围在-1-1024000之间的整数',
    emailRange: '邮箱的范围在4-64字符之间',
    emailElement: '请输入正确的邮箱格式(只支持163 126 qq gmail)',
    deleted: '请输入状态',
    expireTime: '请输入到期时间',
    nodeName: '请输入节点名称',
    nodeNameRange: '节点名称的范围在2-20字符之间',
    nodeServerId: '请输入服务器',
    nodeDomain: '请输入域名',
    nodeDomainRange: '域名的范围在4-64字符之间',
    nodeDomainFormat: '请输入正确的域名',
    nodePort: '请输入端口',
    nodePortRange: '请输入合法的端口',
    nodePriority: '请输入优先级',
    nodePriorityRange: '优先级必须为整数',
    nodeType: '请输入节点类型',
    xrayProtocol: '请输入协议',
    xraySSMethod: '请输入加密方式',
    xraySSNetwork: '请输入网络协议',
    xraySocksUser: '请输入用户名',
    xraySocksPass: '请输入密码',
    xraySocksUserRange: '用户名的范围在2-64字符之间',
    xraySocksPassRange: '密码的范围在2-64字符之间',
    xraySocksUdp: '请输入是否开启UDP',
    xrayNetwork: '请输入传输方式类型',
    xraySecurity: '请输入传输层加密',
    xrayWsRange: 'Websocket路径的范围在2-64字符之间',
    xrayHostRange: 'Websocket Host的范围在2-64字符之间',
    xrayFallbackPathPrefix: 'path必须以/开头',
    xrayFallbackDest: '请输入dest',
    xrayFallbackXver: 'xver只可以使1、2、3',
    trojanGoSni: 'sni在4-64字符之间',
    trojanGoMux: '请输入是否开启多路复用',
    trojanGoWs: '请输入是否开启Websocket',
    trojanGoWsRange: 'Websocket路径的范围在2-64字符之间',
    trojanGoWsHostRange: 'Websocket Host的范围在2-64字符之间',
    trojanGoSs: '请输入是否开启SS AEAD',
    trojanGoSsMethod: '请输入SS AEAD加密方式',
    trojanGoSsPasswordRange: 'SS AEAD密码的范围在2-32字符之间',
    hysteriaProtocol: '请输入模式',
    hysteriaProtocolRange: '模式的范围在2-16字符之间',
    hysteriaObfsRange: '混淆密码的范围在2-64字符之间',
    hysteriaUpMbps: '请输入单客户端最大上传速度/Mbps',
    hysteriaUpMbpsRange: '单客户端最大上传速度的范围在1-9999999999之间的整数',
    hysteriaDownMbps: '请输入单客户端最大下载速度/Mbps',
    hysteriaDownMbpsRange: '单客户端最大下载速度的范围在1-9999999999之间的整数',
    hysteriaServerNameRange: 'SNI的范围在0-64字符之间',
    hysteriaInsecure: '请输入是否允许不安全',
    hysteriaFastOpen: '请输入是否快速打开',
    hysteria2ObfsPasswordRange: '混淆密码的范围在4-64字符之间',
    hysteria2UpMbps: '请输入单客户端最大上传速度/Mbps',
    hysteria2UpMbpsRange: '单客户端最大上传速度的范围在1-9999999999之间的整数',
    hysteria2DownMbps: '请输入单客户端最大下载速度/Mbps',
    hysteria2DownMbpsRange: '单客户端最大下载速度的范围在1-9999999999之间的整数',
    hysteria2ServerNameRange: 'SNI的范围在0-64字符之间',
    hysteria2Insecure: '请输入是否允许不安全',
    registerEnable: '请输入是否开放注册',
    registerQuota: '请输入新用户默认流量',
    registerQuotaRange: '流量在0-1024000之间',
    registerExpireDays: '请输入新用户默认到期天数',
    registerExpireDaysRange: '天数在0-365之间',
    resetDownloadAndUploadMonth: '请输入是否每月重设下载和上传流量',
    trafficRankEnable: '请输入是否开启流量排行',
    emailEnable: '请输入是否开启邮箱功能',
    emailHostRange: '邮箱Host的范围在3-64字符之间',
    emailPort: '请输入邮箱端口',
    emailPortRange: '请输入合法的端口',
    emailUsernameRange: '邮箱用户名的范围在3-32字符之间',
    emailPasswordRange: '请输入是否开启到期提醒',
    expireWarnEnable: '请输入是否开启到期提醒',
    expireWarnDay: '请输入提醒提前的天数',
    expireWarnDayRange: '天数在0-365之间',
    expireWarnOnDay: '请输入到期当天是否提醒',
    quotaWarnEnable: '请输入是否开启流量提醒',
    quotaWarnPercent: '请输入流量提醒阈值',
    quotaWarnPercentRange: '阈值在1-100之间',
    uploadWebFileFormat: '文件格式不支持',
    uploadWebFileSize: '文件太大了',
    nodeServerName: '请输入服务器名称',
    nodeServerNameRange: '服务器名称的范围在2-20字符之间',
    ip: '请输入IP',
    ipRange: 'IP的范围在4-64字符之间',
    systemName: '请输入系统名称',
    systemNameRange: '系统名称的范围在2-32个字符之间',
    clashRuleRange: 'Clash规则的范围在0-100000字符之间',
    xrayTemplateRange: 'Xray模板的范围在0-10000字符之间',
    cover: '请输入是否覆盖',
    code: '请输入验证码',
    emailAOrUsernameExist: '邮箱和用户名必须填写一个',
    xrayStreamSettingsEntityRealitySettingsDest: '请输入dest',
    xrayStreamSettingsEntityRealitySettingsServerNames: '请输入serverNames',
    xrayStreamSettingsEntityRealitySettingsPrivateKey: '请输入privateKey',
    xrayStreamSettingsEntityRealitySettingsShortIds: '请输入shortIds',
    realityPbk: '请输入publicKey',
    xrayStreamSettingsEntityRealitySettingsXver: 'xver只可以是0、1、2',
    createBatchNum: '请输入数量',
    createBatchNumRange: '数量的范围在5-200之间的整数',
    createBatchQuota: '请输入总流量',
    createBatchQuotaRange: '总流量的范围在-1-1024000之间的整数',
    createBatchPresetExpire: '请输入预设有效期',
    createBatchPresetExpireRange: '预设有效期的范围在1-365之间的整数',
    createBatchPresetQuota: '请输入预设总流量',
    createBatchPresetQuotaRange: '预设总流量的范围在-1-1024000之间的整数'
  },
  confirm: {
    warn: '警告',
    yes: '是',
    cancel: '取消',
    deleteSuccess: '删除成功',
    createSuccess: '创建成功',
    modifySuccess: '修改成功',
    resetSuccess: '重设成功',
    urlCopySuccess: 'URL复制成功',
    urlCopyFail: 'URL复制失败',
    uploadWebFileSuccess: '上传成功',
    updateAccountPass: '修改成功,下次登陆时生效',
    updateAccountProperty: '修改成功',
    logoutPrompt: '您已注销，可以取消以停留在此页面，或重新登录！',
    logoutConfirm: '重新登录',
    authFail: '认证失败，请重新登录！',
    deleteUser: '确认删除该用户？',
    handleReset: '确认重设该用户下载和上传流量？',
    deleteNode: '确认删除该节点？',
    deleteNodeServer: '确认删除该服务器？',
    deleteBlack: '确认删除该IP？',
    taskSubmitSuccess: '任务提交成功，请稍后到任务管理中查看',
    taskDownloadSuccess: '下载成功',
    alreadyExists: '已经存在'
  },
  remark: {
    emailEnable: '设置你的邮箱，可以接收到期提醒邮件。'
  }
}
