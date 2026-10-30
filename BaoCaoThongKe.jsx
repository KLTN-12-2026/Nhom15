import React from "react";
import {
  Activity,
  DollarSign,
  UserPlus,
  AlertTriangle,
  TrendingUp,
  Download,
  FileSpreadsheet,
  FileText,
  CalendarDays,
  BarChart3,
  PieChartIcon,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// ======================== MOCK DATA ========================

const summaryCards = [
  {
    label: "Tổng lượt khám",
    value: "12,458",
    change: "+12.5%",
    trend: "up",
    icon: <Activity size={22} />,
    gradient: "from-teal-500 to-cyan-600",
    shadow: "shadow-teal-200",
    subtext: "Tháng này",
  },
  {
    label: "Doanh thu (VNĐ)",
    value: "2.85 tỷ",
    change: "+8.2%",
    trend: "up",
    icon: <DollarSign size={22} />,
    gradient: "from-emerald-500 to-green-600",
    shadow: "shadow-emerald-200",
    subtext: "Tháng này",
  },
  {
    label: "Bệnh nhân mới",
    value: "1,234",
    change: "+5.8%",
    trend: "up",
    icon: <UserPlus size={22} />,
    gradient: "from-blue-500 to-indigo-600",
    shadow: "shadow-blue-200",
    subtext: "Tháng này",
  },
  {
    label: "Thuốc sắp hết hạn",
    value: "18",
    change: "+3",
    trend: "down",
    icon: <AlertTriangle size={22} />,
    gradient: "from-red-500 to-rose-600",
    shadow: "shadow-red-200",
    subtext: "Cần xử lý",
  },
];

const doanhThuTheoThang = [
  { thang: "T5/2026", doanhThu: 1850, vienPhi: 1200, thuoc: 650 },
  { thang: "T6/2026", doanhThu: 2100, vienPhi: 1400, thuoc: 700 },
  { thang: "T7/2026", doanhThu: 1980, vienPhi: 1280, thuoc: 700 },
  { thang: "T8/2026", doanhThu: 2450, vienPhi: 1600, thuoc: 850 },
  { thang: "T9/2026", doanhThu: 2680, vienPhi: 1750, thuoc: 930 },
  { thang: "T10/2026", doanhThu: 2850, vienPhi: 1900, thuoc: 950 },
];

const benhNhanTheoKhoa = [
  { name: "Nội khoa", value: 40, color: "#0d9488" },
  { name: "Ngoại khoa", value: 25, color: "#3b82f6" },
  { name: "Nhi khoa", value: 20, color: "#f59e0b" },
  { name: "Răng Hàm Mặt", value: 15, color: "#8b5cf6" },
];

// ======================== CUSTOM TOOLTIP ========================

const CustomBarTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl shadow-xl p-4 min-w-[180px]">
        <p className="text-sm font-bold text-slate-700 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between text-sm py-1">
            <span className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-slate-600">{entry.name}</span>
            </span>
            <span className="font-bold text-slate-800">{entry.value} tr</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const CustomPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl shadow-xl p-3">
        <p className="text-sm font-bold" style={{ color: payload[0].payload.color }}>
          {payload[0].name}
        </p>
        <p className="text-lg font-bold text-slate-800">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

const CustomPieLegend = ({ payload }) => (
  <div className="flex flex-wrap justify-center gap-3 mt-4">
    {payload.map((entry, index) => (
      <div key={index} className="flex items-center gap-2 text-sm">
        <span
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: entry.color }}
        />
        <span className="text-slate-600">{entry.value}</span>
        <span className="font-bold text-slate-800">{entry.payload.value}%</span>
      </div>
    ))}
  </div>
);

// ======================== COMPONENT ========================

export default function BaoCaoThongKe() {
  const handleExport = (type) => {
    alert(`Giả lập: Đang xuất file ${type.toUpperCase()}... Tính năng sẽ được kết nối API sau.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/20 to-cyan-50/30">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-teal-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-200">
                <TrendingUp size={22} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-teal-700 to-cyan-600 bg-clip-text text-transparent">
                  Báo cáo & Thống kê
                </h1>
                <p className="text-xs text-slate-400">Tổng quan hoạt động bệnh viện</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Export buttons */}
              <button
                onClick={() => handleExport("excel")}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold border border-emerald-200 text-emerald-700 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors"
              >
                <FileSpreadsheet size={16} />
                Xuất Excel
              </button>
              <button
                onClick={() => handleExport("pdf")}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold border border-red-200 text-red-700 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
              >
                <FileText size={16} />
                Xuất PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryCards.map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white shadow-lg ${card.shadow} group-hover:scale-110 transition-transform duration-300`}
                >
                  {card.icon}
                </div>
                <span
                  className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${card.trend === "up"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-red-50 text-red-600"
                    }`}
                >
                  {card.trend === "up" ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {card.change}
                </span>
              </div>
              <p className="text-sm text-slate-500 mb-1">{card.label}</p>
              <p className="text-2xl font-bold text-slate-800">{card.value}</p>
              <p className="text-xs text-slate-400 mt-1">{card.subtext}</p>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bar Chart — Doanh thu viện phí (2 cột) */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white">
                  <BarChart3 size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800">Doanh thu viện phí</h3>
                  <p className="text-xs text-slate-400">6 tháng gần nhất (triệu VNĐ)</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-teal-500" /> Viện phí
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-cyan-400" /> Thuốc
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={doanhThuTheoThang} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="thang"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#94a3b8" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#94a3b8" }}
                  tickFormatter={(v) => `${v}`}
                />
                <Tooltip content={<CustomBarTooltip />} cursor={{ fill: "rgba(0,0,0,0.03)" }} />
                <Bar
                  dataKey="vienPhi"
                  name="Viện phí"
                  fill="url(#barGradient1)"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={40}
                />
                <Bar
                  dataKey="thuoc"
                  name="Thuốc"
                  fill="url(#barGradient2)"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={40}
                />
                <defs>
                  <linearGradient id="barGradient1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#14b8a6" stopOpacity={1} />
                    <stop offset="100%" stopColor="#0d9488" stopOpacity={0.8} />
                  </linearGradient>
                  <linearGradient id="barGradient2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity={1} />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart — Bệnh nhân theo chuyên khoa (1 cột) */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white">
                <PieChartIcon size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800">Bệnh nhân theo khoa</h3>
                <p className="text-xs text-slate-400">Phân bổ tỷ lệ chuyên khoa</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={benhNhanTheoKhoa}
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {benhNhanTheoKhoa.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      className="hover:opacity-80 transition-opacity cursor-pointer"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
                <Legend content={<CustomPieLegend />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Footer stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              label: "Tỷ lệ tái khám",
              value: "34.2%",
              description: "Bệnh nhân quay lại trong 30 ngày",
              icon: <Activity size={18} />,
              color: "text-teal-600",
              bg: "bg-teal-50",
            },
            {
              label: "Thời gian khám TB",
              value: "18 phút",
              description: "Giảm 2 phút so với tháng trước",
              icon: <CalendarDays size={18} />,
              color: "text-blue-600",
              bg: "bg-blue-50",
            },
            {
              label: "Mức độ hài lòng",
              value: "4.6 / 5.0",
              description: "Dựa trên 892 đánh giá",
              icon: <TrendingUp size={18} />,
              color: "text-emerald-600",
              bg: "bg-emerald-50",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-all"
            >
              <div className={`w-11 h-11 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-xs text-slate-400">{stat.label}</p>
                <p className="text-lg font-bold text-slate-800">{stat.value}</p>
                <p className="text-xs text-slate-400">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
