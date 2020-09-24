export const route = [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        name: 'home',
        icon: 'smile',
        path: '/home',
        component: './home',
      },
      {
        path: '/user',
        component: '../layouts/BasicLayout',
        Routes: ['src/pages/Authorized'],
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/user/account',
            icon: 'form',
            name: '账户管理',
            routes: [
              {
                name: '账户列表',
                icon: 'form',
                path: '/user/account/list',
                component: './user/account/list',
              },
              {
                name: '实名认证',
                icon: 'form',
                path: '/user/account/realname',
                component: './user/account/realname',
              },
              {
                name: '登录日志',
                icon: 'form',
                path: '/user/account/login/log',
                component: './user/account/log/login',
              },
              {
                name: '注册日志',
                icon: 'form',
                path: '/user/account/register/log',
                component: './user/account/log/register',
              },
              {
                name: '银行卡列表',
                icon: 'form',
                path: '/user/account/list/bankcard',
                component: './user/account/list/bankCard',
              },
            ],
          },
          {
            path: '/user/deal',
            icon: 'form',
            name: '交易管理',
            routes:[
              {
                name: '今日交易',
                icon: 'form',
                path: '/user/deal/today',
                component: './user/deal/today',
              },
              {
                name: '持仓统计',
                icon: 'form',
                path: '/user/deal/hold/total',
                component: './user/deal/hold',
              },
              {
                name: '持仓列表',
                icon: 'form',
                path: '/user/deal/hold/list/:id/:name',
                component: './user/deal/hold/list',
              },
              {
                name: '交易记录',
                icon: 'form',
                path: '/user/deal/record',
                component: './user/deal/record',
              },
              {
                name: '盈亏记录',
                icon: 'form',
                path: '/user/deal/gain/loss',
                component: './user/deal/gainLoss',
              },
              {
                name: '交易详情',
                icon: 'form',
                path: '/user/deal/detail/:id/:name',
                component: './user/deal/detail',
              },
              {
                name: '交易异常',
                icon: 'form',
                path: '/user/deal/exception',
                component: './user/deal/exception',
              },
              {
                name: '交易异常详情',
                icon: 'form',
                path: '/user/deal/exception/:id/:name',
                component: './user/deal/exception/list',
              }


            ]
          },
          {
            component: '404',
          },
        ],
      },
      {
        path: '/operation',
        component: '../layouts/BasicLayout',
        Routes: ['src/pages/Authorized'],
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/operation',
            redirect: '/operation/page/config',
          },
          {
            path: '/operation/page',
            icon: 'form',
            name: '页面管理',
            routes: [
              {
                name: '页面配置',
                icon: 'form',
                path: '/operation/page/config',
                component: './operation/page/configured',
              },
              {
                name: '页面配置-关于我们',
                icon: 'form',
                path: '/operation/page/config/about',
                component: './operation/page/configured/about',
              },
              {
                name: '页面配置-分享给好友',
                icon: 'form',
                path: '/operation/page/config/share',
                component: './operation/page/configured/share',
              },

              {
                name: '页面说明',
                icon: 'form',
                path: '/operation/page/desc',
                component: './operation/page/explain',
              },
              {
                name: '客服页面',
                icon: 'form',
                path: '/operation/page/kf',
                component: './operation/page/service',
              },
            ],
          },
          {
            path: '/operation/ad',
            icon: 'form',
            name: '广告管理',
            routes: [
              {
                name: 'banner分组',
                icon: 'form',
                path: '/operation/ad/banner',
                component: './operation/advertising/banner/group',
              },
              {
                name: 'banner广告',
                icon: 'form',
                path: '/operation/ad/banner/list',
                component: './operation/advertising/banner/list',
              },
              {
                name: '弹窗广告',
                icon: 'form',
                path: '/operation/ad/popup',
                component: './operation/advertising/popup',
              },
            ],
          },
          {
            path: '/operation/help',
            icon: 'form',
            name: '帮助中心',
            routes: [
              {
                name: '问题列表',
                icon: 'form',
                path: '/operation/help/question',
                component: './operation/help/question',
              },
              {
                name: '分类列表',
                icon: 'form',
                path: '/operation/help/category',
                component: './operation/help/category',
              },
            ],
          },
          {
            path: '/operation/notice',
            icon: 'form',
            name: '通知管理',
            routes: [
              {
                name: '头条列表',
                icon: 'form',
                path: '/operation/notice/tt/list',
                component: './operation/notice/list/toutiao',
              },
              {
                name: '通知列表',
                icon: 'form',
                path: '/operation/notice/msg/list',
                component: './operation/notice/list/message',
              },
              {
                name: '消息模板',
                icon: 'form',
                path: '/operation/notice/template/msg',
                component: './operation/notice/template/message',
              },
              {
                name: '短信模板',
                icon: 'form',
                path: '/operation/notice/template/sms',
                component: './operation/notice/template/sms',
              },
            ],
          },
          {
            component: '404',
          },
        ],
      },
      {
        path: '/trading',
        component: '../layouts/BasicLayout',
        Routes: ['src/pages/Authorized'],
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/trading',
            redirect: '/trading/market/list',
          },
          {
            path: '/trading/market',
            icon: 'form',
            name: '行情管理',
            routes: [
              {
                name: '今日行情',
                icon: 'form',
                path: '/trading/market/today',
                component: './trading/market/today',
              },
              {
                name: '今日行情-添加股票',
                icon: 'form',
                path: '/trading/market/today/add',
                component: './trading/market/add',
              },
              {
                name: '行情列表',
                icon: 'form',
                path: '/trading/market/list',
                component: './trading/market/list',
              },
              {
                name: '停牌列表',
                icon: 'form',
                path: '/trading/market/suspension',
                component: './trading/market/suspension',
              },
            ],
          },
          {
            path: '/trading/deal',
            icon: 'form',
            name: '市场管理',
            routes: [
              {
                name: '禁止名单',
                icon: 'form',
                path: '/trading/deal/forbidden',
                component: './trading/deal/forbidden',
              },
              {
                name: '禁止日期',
                icon: 'form',
                path: '/trading/deal/date',
                component: './trading/deal/date',
              },
              {
                name: '禁止日期列表',
                icon: 'form',
                path: '/trading/deal/date/list/:name',
                component: './trading/deal/date/list',
              },
              {
                name: '交易规则',
                icon: 'form',
                path: '/trading/deal/rule',
                component: './trading/deal/rule',
              },
              {
                name: '风控规则',
                icon: 'form',
                path: '/trading/deal/risk',
                component: './trading/deal/risk',
              },
              {
                name: '额外平仓线',
                icon: 'form',
                path: '/trading/deal/liquidation/:name',
                component: './trading/deal/liquidation',
              },
            ],
          },
          {
            component: '404',
          },
        ],
      },
      {
        path: '/admin',
        component: '../layouts/BasicLayout',
        Routes: ['src/pages/Authorized'],
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/admin',
            redirect: '/admin/account/list',
          },
          {
            path: '/admin/account',
            icon: 'form',
            name: '账户管理',
            routes: [
              {
                name: '用户列表',
                icon: 'form',
                path: '/admin/account/list',
                component: './admin/account/list',
              },
              {
                name: '角色列表',
                icon: 'form',
                path: '/admin/account/role',
                component: './admin/account/role',
              },
              {
                name: '权限列表',
                icon: 'form',
                path: '/admin/account/role/list',
                component: './admin/account/role/list',
              },
            ],
          },
          {
            path: '/admin/log',
            icon: 'form',
            name: '日志管理',
            routes: [
              {
                name: '登录日志',
                icon: 'form',
                path: '/admin/log/login',
                component: './admin/log/login',
              },
              {
                name: '操作日志',
                icon: 'form',
                path: '/admin/log/oper',
                component: './admin/log/oper',
              },
            ],
          },
          {
            path: '/admin/organization',
            icon: 'form',
            name: '组织管理',
            routes: [
              {
                name: '职位管理',
                icon: 'form',
                path: '/admin/organization/position',
                component: './admin/organization/position',
              },
              {
                name: '部门管理',
                icon: 'form',
                path: '/admin/organization/department',
                component: './admin/organization/department',
              },
            ],
          },
          {
            component: '404',
          },
        ],
      },
      {
        path: '/system',
        component: '../layouts/BasicLayout',
        Routes: ['src/pages/Authorized'],
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/system',
            redirect: '/system/arguments/system',
          },
          {
            path: '/system/arguments',
            icon: 'form',
            name: '参数管理',
            routes: [
              {
                name: '系统参数',
                icon: 'form',
                path: '/system/arguments/system',
                component: './system/arguments/system',
              },
            ],
          },
          {
            path: '/system/pay',
            icon: 'form',
            name: '支付管理',
            routes: [
              {
                name: '支付列表',
                icon: 'form',
                path: '/system/pay/list',
                component: './system/pay/list',
              },
              {
                name: '打款列表',
                icon: 'form',
                path: '/system/pay/remit/list',
                component: './system/pay/remit',
              },
              {
                name: '账户列表',
                icon: 'form',
                path: '/system/pay/account/list',
                component: './system/pay/account',
              },
              {
                name: '支付参数',
                icon: 'form',
                path: '/system/pay/args/:id/:name',
                component: './system/pay/args',
                hideInMenu: true
              },
            ]
          },
          {
            path: '/system/account',
            icon: 'form',
            name: '股票账号',
            routes: [
              {
                name: '服务器列表',
                icon: 'form',
                path: '/system/account/server',
                component: './system/account/server',
              },
              {
                name: '账户列表',
                icon: 'form',
                path: '/system/account/list',
                component: './system/account/list',
              },
              {
                name: '账户持仓',
                icon: 'form',
                path: '/system/account/position',
                component: './system/account/position',
              },
              {
                name: '券商列表',
                icon: 'form',
                path: '/system/account/dealer',
                component: './system/account/dealer',
              },
              {
                name: '营业部列表',
                icon: 'form',
                path: '/system/account/dealer/sd',
                component: './system/account/dealer/sd',
                hideInMenu: false
              },
              {
                name: '交易服务器列表',
                icon: 'form',
                path: '/system/account/dealer/server',
                component: './system/account/dealer/server',
                hideInMenu: false
              }
            ],
          },
          {
            path: '/system/sms',
            icon: 'form',
            name: '短信管理',
            routes: [
              {
                name: '短信签名',
                icon: 'form',
                path: '/system/sms/signature',
                component: './system/sms/signature',
              },
              {
                name: '主体渠道',
                icon: 'form',
                path: '/system/sms/channel',
                component: './system/sms/channel',
              },
            ],
          },
          {
            component: '404',
          },
        ],
      },
      {
        path: '/finance',
        component: '../layouts/BasicLayout',
        routes: [
          {
            path: '/finance',
            redirect: '/finance/operating/ie',
          },
          {
            path: '/finance/operating',
            icon: 'form',
            name: '经营管理',
            routes: [
              {
                name: '平台收支',
                icon: 'form',
                path: '/finance/operating/ie',
                component: './finance/operating/ie',
              },
              {
                name: '充值记录',
                icon: 'form',
                path: '/finance/operating/record/recharge',
                component: './finance/operating/record/recharge',
              },
            ],
          },
          {
            path: '/finance/withdraw',
            icon: 'form',
            name: '提现管理',
            routes: [
              {
                name: '提现列表',
                icon: 'form',
                path: '/finance/withdraw/list',
                component: './finance/withdraw/list',
              },
              {
                name: '打款日志',
                icon: 'form',
                path: '/finance/withdraw/log',
                component: './finance/withdraw/log',
              },
            ],
          },
          {
            component: '404',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/UserLayout',
        routes: [
          {
            path: '/',
            redirect: '/account/login',
          },
          {
            name: 'login',
            icon: 'smile',
            path: '/account/login',
            component: './login',
          },
          {
            component: '404',
          },
        ],
      },
    ],
  },
];
