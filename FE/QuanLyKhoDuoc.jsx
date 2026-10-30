import React, { useState, useMemo } from "react";
import {
  Pill,
  Package,
  AlertTriangle,
  Plus,
  Eye,
  X,
  Search,
  ClipboardList,
  CheckCircle2,
  Clock,
  CalendarDays,
  Archive,
  ChevronDown,
  FileText,
} from "lucide-react";

// ======================== MOCK DATA ========================

const mockThuoc = [
  { maThuoc: "TH001", tenThuoc: "Paracetamol 500mg", lo: "L2026-01", soLuongTon: 350, hanSuDung: "2027-06-15", donVi: "Viên", nhaCungCap: "Pharma VN" },
  { maThuoc: "TH002", tenThuoc: "Amoxicillin 250mg", lo: "L2026-02", soLuongTon: 12, hanSuDung: "2027-03-20", donVi: "Viên", nhaCungCap: "MedPlus" },
  { maThuoc: "TH003", tenThuoc: "Omeprazol 20mg", lo: "L2025-08", soLuongTon: 180, hanSuDung: "2026-11-05", donVi: "Viên", nhaCungCap: "Pharma VN" },
  { maThuoc: "TH004", tenThuoc: "Cefuroxim 500mg", lo: "L2026-05", soLuongTon: 8, hanSuDung: "2026-10-30", donVi: "Viên", nhaCungCap: "BioTech" },
  { maThuoc: "TH005", tenThuoc: "Vitamin C 1000mg", lo: "L2026-03", soLuongTon: 500, hanSuDung: "2028-01-10", donVi: "Viên", nhaCungCap: "NutriCare" },
  { maThuoc: "TH006", tenThuoc: "Metformin 850mg", lo: "L2026-04", soLuongTon: 15, hanSuDung: "2027-08-22", donVi: "Viên", nhaCungCap: "Pharma VN" },
  { maThuoc: "TH007", tenThuoc: "Dexamethason 0.5mg", lo: "L2025-12", soLuongTon: 45, hanSuDung: "2026-11-01", donVi: "Viên", nhaCungCap: "MedPlus" },
  { maThuoc: "TH008", tenThuoc: "Losartan 50mg", lo: "L2026-06", soLuongTon: 220, hanSuDung: "2027-12-30", donVi: "Viên", nhaCungCap: "BioTech" },
  { maThuoc: "TH009", tenThuoc: "Ciprofloxacin 500mg", lo: "L2026-07", soLuongTon: 5, hanSuDung: "2026-11-18", donVi: "Viên", nhaCungCap: "Pharma VN" },
  { maThuoc: "TH010", tenThuoc: "Ibuprofen 400mg", lo: "L2026-08", soLuongTon: 90, hanSuDung: "2027-09-25", donVi: "Viên", nhaCungCap: "NutriCare" },
];

const mockDonThuoc = [
  {
    maDon: "DT2026-001",
    tenBenhNhan: "Nguyễn Văn An",
    bacSiKe: "BS. Trần Minh Đức",
    trangThai: "Chờ duyệt",
    ngayKe: "2026-10-18",
    chiTiet: [
      { tenThuoc: "Paracetamol 500mg", soLuong: 20, lieuDung: "2 viên x 3 lần/ngày", ghiChu: "Uống sau ăn" },
      { tenThuoc: "Amoxicillin 250mg", soLuong: 15, lieuDung: "1 viên x 3 lần/ngày", ghiChu: "Uống đủ liệu trình 5 ngày" },
    ],
  },
  {
    maDon: "DT2026-002",
    tenBenhNhan: "Lê Thị Bích Ngọc",
    bacSiKe: "BS. Phạm Hồng Sơn",
    trangThai: "Chờ duyệt",
    ngayKe: "2026-10-19",
    chiTiet: [
      { tenThuoc: "Omeprazol 20mg", soLuong: 14, lieuDung: "1 viên/ngày trước ăn sáng", ghiChu: "" },
      { tenThuoc: "Metformin 850mg", soLuong: 30, lieuDung: "1 viên x 2 lần/ngày", ghiChu: "Uống ngay sau ăn" },
    ],
  },
  {
    maDon: "DT2026-003",
    tenBenhNhan: "Trần Quốc Bảo",
    bacSiKe: "BS. Trần Minh Đức",
    trangThai: "Đã cấp phát",
    ngayKe: "2026-10-17",
    chiTiet: [
      { tenThuoc: "Vitamin C 1000mg", soLuong: 30, lieuDung: "1 viên/ngày", ghiChu: "Bổ sung vitamin" },
    ],
  },
  {
    maDon: "DT2026-004",
    tenBenhNhan: "Hoàng Thị Mai",
    bacSiKe: "BS. Nguyễn Thanh Hà",
    trangThai: "Chờ duyệt",
    ngayKe: "2026-10-20",
    chiTiet: [
      { tenThuoc: "Losartan 50mg", soLuong: 30, lieuDung: "1 viên/ngày", ghiChu: "Uống buổi sáng" },
      { tenThuoc: "Ibuprofen 400mg", soLuong: 10, lieuDung: "1 viên khi đau", ghiChu: "Không quá 3 viên/ngày" },
      { tenThuoc: "Dexamethason 0.5mg", soLuong: 5, lieuDung: "1 viên/ngày", ghiChu: "Theo chỉ định BS" },
    ],
  },
  {
    maDon: "DT2026-005",
    tenBenhNhan: "Phan Văn Khoa",
    bacSiKe: "BS. Phạm Hồng Sơn",
    trangThai: "Chờ duyệt",
    ngayKe: "2026-10-20",
    chiTiet: [
      { tenThuoc: "Ciprofloxacin 500mg", soLuong: 10, lieuDung: "1 viên x 2 lần/ngày", ghiChu: "Uống đủ liệu trình" },
      { tenThuoc: "Paracetamol 500mg", soLuong: 10, lieuDung: "1 viên khi sốt", ghiChu: "Cách 6 tiếng" },
    ],
  },
];

// ======================== HELPERS ========================

/** Tính số ngày còn lại đến hạn sử dụng */
function tinhSoNgayConLai(hanSuDung) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const han = new Date(hanSuDung);
  han.setHours(0, 0, 0, 0);
  return Math.ceil((han - today) / (1000 * 60 * 60 * 24));
}

/** Format ngày dd/mm/yyyy */
function formatNgay(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("vi-VN");
}

// ======================== COMPONENT ========================

export default function QuanLyKhoDuoc() {
  const [activeTab, setActiveTab] = useState("kho");
  const [searchKho, setSearchKho] = useState("");
  const [selectedDon, setSelectedDon] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // Filtered thuốc
  const filteredThuoc = useMemo(() => {
    if (!searchKho.trim()) return mockThuoc;
    const keyword = searchKho.toLowerCase();
    return mockThuoc.filter(
      (t) =>
        t.tenThuoc.toLowerCase().includes(keyword) ||
        t.maThuoc.toLowerCase().includes(keyword) ||
        t.lo.toLowerCase().includes(keyword)
    );
  }, [searchKho]);

  // Stats
  const tongThuoc = mockThuoc.length;
  const sapHetHan = mockThuoc.filter((t) => tinhSoNgayConLai(t.hanSuDung) <= 30).length;
  const tonKhoThap = mockThuoc.filter((t) => t.soLuongTon < 20).length;
  const donChoDuyet = mockDonThuoc.filter((d) => d.trangThai === "Chờ duyệt").length;

  const handleXemCapPhat = (don) => {
    setSelectedDon(don);
    setShowPopup(true);
  };

  const tabs = [
    { key: "kho", label: "Kho dược", icon: <Package size={18} /> },
    { key: "capphat", label: "Cấp phát thuốc", icon: <ClipboardList size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-teal-50/40">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-teal-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-200">
                <Pill size={22} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-teal-700 to-cyan-600 bg-clip-text text-transparent">
                  Quản lý Kho Dược
                </h1>
                <p className="text-xs text-slate-400">Hệ thống quản lý bệnh viện thông minh</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <CalendarDays size={14} />
              {new Date().toLocaleDateString("vi-VN", { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" })}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Tổng số thuốc", value: tongThuoc, icon: <Archive size={20} />, color: "from-teal-500 to-cyan-500", bg: "bg-teal-50", text: "text-teal-700" },
            { label: "Sắp hết hạn", value: sapHetHan, icon: <AlertTriangle size={20} />, color: "from-red-500 to-rose-500", bg: "bg-red-50", text: "text-red-700" },
            { label: "Tồn kho thấp", value: tonKhoThap, icon: <Package size={20} />, color: "from-amber-500 to-orange-500", bg: "bg-amber-50", text: "text-amber-700" },
            { label: "Đơn chờ duyệt", value: donChoDuyet, icon: <Clock size={20} />, color: "from-blue-500 to-indigo-500", bg: "bg-blue-50", text: "text-blue-700" },
          ].map((card, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">{card.label}</p>
                  <p className={`text-3xl font-bold ${card.text}`}>{card.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex border-b border-slate-100">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-all duration-200 relative ${activeTab === tab.key
                  ? "text-teal-700"
                  : "text-slate-400 hover:text-slate-600"
                  }`}
              >
                {tab.icon}
                {tab.label}
                {activeTab === tab.key && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* ========= TAB KHO DƯỢC ========= */}
          {activeTab === "kho" && (
            <div className="p-6">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
                <div className="relative flex-1 max-w-md w-full">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Tìm theo mã, tên thuốc hoặc lô..."
                    value={searchKho}
                    onChange={(e) => setSearchKho(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 transition-all bg-slate-50/50"
                  />
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-teal-200 hover:shadow-teal-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
                  <Plus size={16} />
                  Thêm thuốc
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-100">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-slate-50 to-teal-50/40">
                      <th className="text-left px-4 py-3 font-semibold text-slate-600">Mã thuốc</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-600">Tên thuốc</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-600">Lô</th>
                      <th className="text-center px-4 py-3 font-semibold text-slate-600">Số lượng tồn</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-600">Hạn sử dụng</th>
                      <th className="text-center px-4 py-3 font-semibold text-slate-600">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredThuoc.map((thuoc, index) => {
                      const soNgay = tinhSoNgayConLai(thuoc.hanSuDung);
                      const sapHet = soNgay <= 30;
                      const hetHan = soNgay <= 0;
                      const tonThap = thuoc.soLuongTon < 20;

                      return (
                        <tr
                          key={thuoc.maThuoc}
                          className={`hover:bg-teal-50/40 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-slate-50/30"
                            }`}
                        >
                          <td className="px-4 py-3 font-mono text-xs text-teal-700 font-semibold">
                            {thuoc.maThuoc}
                          </td>
                          <td className="px-4 py-3 font-medium text-slate-800">{thuoc.tenThuoc}</td>
                          <td className="px-4 py-3 text-slate-500">{thuoc.lo}</td>
                          <td className="px-4 py-3 text-center">
                            <span
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${tonThap
                                ? "bg-amber-100 text-amber-700 ring-1 ring-amber-200"
                                : "bg-emerald-50 text-emerald-700"
                                }`}
                            >
                              {tonThap && <AlertTriangle size={12} />}
                              {thuoc.soLuongTon} {thuoc.donVi}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-sm ${sapHet ? "text-red-600 font-semibold" : "text-slate-600"}`}>
                              {formatNgay(thuoc.hanSuDung)}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            {hetHan ? (
                              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 ring-1 ring-red-200 animate-pulse">
                                <AlertTriangle size={12} />
                                Đã hết hạn
                              </span>
                            ) : sapHet ? (
                              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 ring-1 ring-red-200">
                                <AlertTriangle size={12} />
                                Còn {soNgay} ngày
                              </span>
                            ) : tonThap ? (
                              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 ring-1 ring-amber-200">
                                <Package size={12} />
                                Tồn kho thấp
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600">
                                <CheckCircle2 size={12} />
                                Bình thường
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {filteredThuoc.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                    <Search size={40} strokeWidth={1} />
                    <p className="mt-3 text-sm">Không tìm thấy thuốc phù hợp</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========= TAB CẤP PHÁT THUỐC ========= */}
          {activeTab === "capphat" && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Danh sách đơn thuốc</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Duyệt và cấp phát thuốc theo đơn bác sĩ kê</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                  {donChoDuyet} đơn chờ duyệt
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-100">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-slate-50 to-blue-50/40">
                      <th className="text-left px-4 py-3 font-semibold text-slate-600">Mã đơn</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-600">Bệnh nhân</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-600">Bác sĩ kê</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-600">Ngày kê</th>
                      <th className="text-center px-4 py-3 font-semibold text-slate-600">Trạng thái</th>
                      <th className="text-center px-4 py-3 font-semibold text-slate-600">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {mockDonThuoc.map((don, index) => (
                      <tr
                        key={don.maDon}
                        className={`hover:bg-blue-50/40 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-slate-50/30"
                          }`}
                      >
                        <td className="px-4 py-3 font-mono text-xs text-blue-700 font-semibold">
                          {don.maDon}
                        </td>
                        <td className="px-4 py-3 font-medium text-slate-800">{don.tenBenhNhan}</td>
                        <td className="px-4 py-3 text-slate-600">{don.bacSiKe}</td>
                        <td className="px-4 py-3 text-slate-500">{formatNgay(don.ngayKe)}</td>
                        <td className="px-4 py-3 text-center">
                          {don.trangThai === "Chờ duyệt" ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 ring-1 ring-amber-200">
                              <Clock size={12} />
                              Chờ duyệt
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200">
                              <CheckCircle2 size={12} />
                              Đã cấp phát
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => handleXemCapPhat(don)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-sm hover:shadow-md hover:scale-[1.03] active:scale-[0.97] transition-all duration-200"
                          >
                            <Eye size={14} />
                            Xem & Cấp phát
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========= POPUP CHI TIẾT ĐƠN THUỐC ========= */}
      {showPopup && selectedDon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowPopup(false)}
          />
          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-600 to-cyan-600 px-6 py-5 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Chi tiết đơn thuốc</h3>
                    <p className="text-sm text-teal-100">{selectedDon.maDon}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPopup(false)}
                  className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-400">Bệnh nhân:</span>
                  <span className="ml-2 font-semibold text-slate-800">{selectedDon.tenBenhNhan}</span>
                </div>
                <div>
                  <span className="text-slate-400">Bác sĩ kê:</span>
                  <span className="ml-2 font-semibold text-slate-800">{selectedDon.bacSiKe}</span>
                </div>
                <div>
                  <span className="text-slate-400">Ngày kê đơn:</span>
                  <span className="ml-2 font-semibold text-slate-800">{formatNgay(selectedDon.ngayKe)}</span>
                </div>
                <div>
                  <span className="text-slate-400">Trạng thái:</span>
                  <span
                    className={`ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${selectedDon.trangThai === "Chờ duyệt"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-emerald-100 text-emerald-700"
                      }`}
                  >
                    {selectedDon.trangThai === "Chờ duyệt" ? <Clock size={10} /> : <CheckCircle2 size={10} />}
                    {selectedDon.trangThai}
                  </span>
                </div>
              </div>
            </div>

            {/* Chi tiết thuốc */}
            <div className="px-6 py-4 overflow-y-auto max-h-[40vh]">
              <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                <Pill size={16} className="text-teal-600" />
                Danh sách thuốc trong đơn ({selectedDon.chiTiet.length} loại)
              </h4>
              <div className="space-y-3">
                {selectedDon.chiTiet.map((ct, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-slate-100 rounded-xl p-4 hover:border-teal-200 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-6 h-6 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-bold">
                            {idx + 1}
                          </span>
                          <span className="font-semibold text-slate-800">{ct.tenThuoc}</span>
                        </div>
                        <div className="ml-8 space-y-1 text-xs text-slate-500">
                          <p>
                            <span className="font-medium text-slate-600">Liều dùng:</span> {ct.lieuDung}
                          </p>
                          {ct.ghiChu && (
                            <p>
                              <span className="font-medium text-slate-600">Ghi chú:</span> {ct.ghiChu}
                            </p>
                          )}
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold whitespace-nowrap">
                        SL: {ct.soLuong}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowPopup(false)}
                className="px-5 py-2.5 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Đóng
              </button>
              {selectedDon.trangThai === "Chờ duyệt" && (
                <button
                  onClick={() => {
                    alert(`Đã cấp phát thuốc cho đơn ${selectedDon.maDon}!`);
                    setShowPopup(false);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl shadow-lg shadow-teal-200 hover:shadow-teal-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  <CheckCircle2 size={16} />
                  Xác nhận cấp phát
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
