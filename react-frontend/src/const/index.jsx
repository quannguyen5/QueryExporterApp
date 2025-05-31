import {
    DatabaseOutlined,
    BarChartOutlined,
    MonitorOutlined,
    HomeOutlined,
    UserOutlined,
    LogoutOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';

export const linkDbRegex = /^[a-zA-Z0-9]+(\+[a-zA-Z0-9]+)?:\/\/[a-zA-Z0-9_-]+:[a-zA-Z0-9]+@[a-zA-Z0-9.-]+:\d+\/[a-zA-Z0-9._-]+$/;
export const timeRegex = /^(\d+)([smhd]?)$/;
export const crontabRegex = /^(\*|([0-9]|[1-5][0-9])|(\*\/([1-9]|[1-5][0-9]))|(([0-9]|[1-5][0-9])([,-]([0-9]|[1-5][0-9]))*))\s+(\*|([0-9]|1[0-9]|2[0-3])|(\*\/([1-9]|1[0-9]|2[0-3]))|(([0-9]|1[0-9]|2[0-3])([,-]([0-9]|1[0-9]|2[0-3]))*))\s+(\*|([1-9]|[12][0-9]|3[01])|(\*\/([1-9]|[12][0-9]|3[01]))|(([1-9]|[12][0-9]|3[01])([,-]([1-9]|[12][0-9]|3[01]))*))\s+(\*|([1-9]|1[0-2])|(\*\/([1-9]|1[0-2]))|(([1-9]|1[0-2])([,-]([1-9]|1[0-2]))*))\s+(\*|([0-7])|(\*\/[1-7])|([0-7]([,-][0-7])|[mon,tue,wed,thu,fri,sat,sun]*))$/;

export const infoColor = "#08c";
export const errorColor = "#FF4D4F";
export const sqlKeywords = ['INSERT', 'UPDATE', 'DELETE', 'COMMIT'];

export const nonAuthorHeader = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'OPTIONS, DELETE, POST, GET, PATCH, PUT',
}

export const metricType = [
    {value: 'counter', label: 'counter'},
    {value: 'enum', label: 'enum'},
    {value: 'gauge', label: 'gauge'},
    {value: 'histogram', label: 'histogram'},
    {value: 'summary', label: 'summary'}
]

export const userRole = [
  {value: 'ADMIN', label: 'ADMIN'},
  {value: 'USER', label: 'USER'},
]

export const metricFilterType = [
    {value: 'counter', text: 'counter'},
    {value: 'enum', text: 'enum'},
    {value: 'gauge', text: 'gauge'},
    {value: 'histogram', text: 'histogram'},
    {value: 'summary', text: 'summary'}
]

export const navItems = [
  {
    key: '1',
    icon: <HomeOutlined />,
    label: 'Home',
  },
  {
    key: '2',
    icon: <DatabaseOutlined />,
    label: 'Databases',
  },
  {
    key: '3',
    icon: <BarChartOutlined />,
    label: 'Metrics',
  },
  {
    key: '4',
    icon: <MonitorOutlined />,
    label: 'Queries',
  },
  {
    key: '5',
    icon: <UserOutlined />,
    label: 'Accounts',
  },
];

export const dropDownItems = [
  {
    key: '1',
    label: "Logout",
    icon: <LogoutOutlined />,
  },
  {
    key: '2',
    label: "Information",
    icon: <ExclamationCircleOutlined />,
  },
]
