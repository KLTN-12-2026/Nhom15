import React, { useState, useMemo } from "react";
import {
  Users,
  Search,
  Plus,
  Edit3,
  Lock,
  Unlock,
  ChevronDown,
  Shield,
  Stethoscope,
  ConciergeBell,
  Pill,
  UserCog,
  Phone,
  User,
  X,
  CheckCircle2,
  XCircle,
  CalendarDays,
} from "lucide-react";

// ======================== MOCK DATA ========================

const mockNhanVien = [
  { maNV: "NV001", hoTen: "Nguyễn Minh Tuấn", tenDangNhap: "tuannm", soDienThoai: "0901234567", vaiTro: "Admin", trangThai: "Hoạt động", email: "tuannm@hospital.vn", ngayTao: "2024-01-15" },
  { maNV: "NV002", hoTen: "Trần Minh Đức", tenDangNhap: "ductm", soDienThoai: "0912345678", vaiTro: "Bác sĩ", trangThai: "Hoạt động", email: "ductm@hospital.vn", ngayTao: "2024-02-20" },
  { maNV: "NV003", hoTen: "Phạm Hồng Sơn", tenDangNhap: "sonph", soDienThoai: "0923456789", vaiTro: "Bác sĩ", trangThai: "Hoạt động", email: "sonph@hospital.vn", ngayTao: "2024-03-10" },
  { maNV: "NV004", hoTen: "Lê Thị Hương", tenDangNhap: "huonglt", soDienThoai: "0934567890", vaiTro: "Lễ tân", trangThai: "Hoạt động", email: "huonglt@hospital.vn", ngayTao: "2024-04-05" },
  { maNV: "NV005", hoTen: "Võ Gia Huy", tenDangNhap: "huyvg", soDienThoai: "0945678901", vaiTro: "Dược sĩ", trangThai: "Hoạt động", email: "huyvg@hospital.vn", ngayTao: "2024-05-18" },
  { maNV: "NV006", hoTen: "Đặng Thanh Hà", tenDangNhap: "hadt", soDienThoai: "0956789012", vaiTro: "Bác sĩ", trangThai: "Bị khóa", email: "hadt@hospital.vn", ngayTao: "2024-06-22" },
  { maNV: "NV007", hoTen: "Nguyễn Thanh Hà", tenDangNhap: "hant", soDienThoai: "0967890123", vaiTro: "Bác sĩ", trangThai: "Hoạt động", email: "hant@hospital.vn", ngayTao: "2024-07-30" },
  { maNV: "NV008", hoTen: "Bùi Quốc Anh", tenDangNhap: "anhbq", soDienThoai: "0978901234", vaiTro: "Lễ tân", trangThai: "Bị khóa", email: "anhbq@hospital.vn", ngayTao: "2024-08-14" },
  { maNV: "NV009", hoTen: "Hoàng Phương Linh", tenDangNhap: "linhhp", soDienThoai: "0989012345", vaiTro: "Dược sĩ", trangThai: "Hoạt động", email: "linhhp@hospital.vn", ngayTao: "2024-09-01" },
  { maNV: "NV010", hoTen: "Trương Văn Khải", tenDangNhap: "khaitv", soDienThoai: "0990123456", vaiTro: "Admin", trangThai: "Hoạt động", email: "khaitv@hospital.vn", ngayTao: "2025-01-10" },
  { maNV: "NV011", hoTen: "Mai Anh Thư", tenDangNhap: "thuma", soDienThoai: "0911223344", vaiTro: "Lễ tân", trangThai: "Hoạt động", email: "thuma@hospital.vn", ngayTao: "2025-03-25" },
  { maNV: "NV012", hoTen: "Phan Đình Quân", tenDangNhap: "quanpd", soDienThoai: "0922334455", vaiTro: "Bác sĩ", trangThai: "Hoạt động", email: "quanpd@hospital.vn", ngayTao: "2025-05-12" },
];

const VAI_TRO_OPTIONS = ["Tất cả", "Admin", "Bác sĩ", "Lễ tân", "Dược sĩ"];

const vaiTroConfig = {
  Admin: { icon: <Shield size={13} />, color: "bg-purple-100 text-purple-700 ring-purple-200" },
  "Bác sĩ": { icon: <Stethoscope size={13} />, color: "bg-blue-100 text-blue-700 ring-blue-200" },
  "Lễ tân": { icon: <ConciergeBell size={13} />, color: "bg-teal-100 text-teal-700 ring-teal-200" },
  "Dược sĩ": { icon: <Pill size={13} />, color: "bg-emerald-100 text-emerald-700 ring-emerald-200" },
};

// ======================== COMPONENT ========================

export default function QuanLyNhanSu() {
  const [search, setSearch] = useState("");
  const [filterVaiTro, setFilterVaiTro] = useState("Tất cả");
  const [nhanVienList, setNhanVienList] = useState(mockNhanVien);
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredList = useMemo(() => {
    let result = [...nhanVienList];
    if (filterVaiTro !== "Tất cả") {
      result = result.filter((nv) => nv.vaiTro === filterVaiTro);
    }
    if (search.trim()) {
      const keyword = search.toLowerCase();
      result = result.filter(
        (nv) =>
          nv.hoTen.toLowerCase().includes(keyword) ||
          nv.maNV.toLowerCase().includes(keyword) ||
          nv.tenDangNhap.toLowerCase().includes(keyword)
      );
    }
    return result;
  }, [search, filterVaiTro, nhanVienList]);

  const handleToggleLock = (maNV) => {
    setNhanVienList((prev) =>
      prev.map((nv) =>
        nv.maNV === maNV
          ? { ...nv, trangThai: nv.trangThai === "Hoạt động" ? "Bị khóa" : "Hoạt động" }
          : nv
      )
    );
  };

  // Stats
  const totalNV = nhanVienList.length;
  const activeNV = nhanVienList.filter((nv) => nv.trangThai === "Hoạt động").length;
  const lockedNV = nhanVienList.filter((nv) => nv.trangThai === "Bị khóa").length;
  const statsByRole = VAI_TRO_OPTIONS.filter((v) => v !== "Tất cả").map((role) => ({
    role,
    count: nhanVienList.filter((nv) => nv.vaiTro === role).length,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/20 to-purple-50/30">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-indigo-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200">
                <UserCog size={22} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-700 to-purple-600 bg-clip-text text-transparent">
                  Quản lý Nhân sự
                </h1>
                <p className="text-xs text-slate-400">Quản trị viên — Hệ thống quản lý bệnh viện</p>
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 mb-1">Tổng nhân viên</p>
                <p className="text-3xl font-bold text-indigo-700">{totalNV}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                <Users size={20} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 mb-1">Đang hoạt động</p>
                <p className="text-3xl font-bold text-emerald-600">{activeNV}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                <CheckCircle2 size={20} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 mb-1">Bị khóa</p>
                <p className="text-3xl font-bold text-red-600">{lockedNV}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                <Lock size={20} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 mb-1">Vai trò</p>
                <div className="flex gap-1 mt-1 flex-wrap">
                  {statsByRole.map((s) => (
                    <span
                      key={s.role}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ring-1 ${vaiTroConfig[s.role].color}`}
                    >
                      {vaiTroConfig[s.role].icon}
                      {s.count}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                <Shield size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Table Card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Toolbar */}
          <div className="p-5 border-b border-slate-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-1 w-full">
                {/* Search */}
                <div className="relative flex-1 max-w-md w-full">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Tìm theo tên hoặc mã nhân viên..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all bg-slate-50/50"
                  />
                </div>

                {/* Dropdown lọc vai trò */}
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white hover:bg-slate-50 transition-colors min-w-[160px] justify-between"
                  >
                    <span className="text-slate-600">
                      {filterVaiTro === "Tất cả" ? "Lọc vai trò" : filterVaiTro}
                    </span>
                    <ChevronDown size={14} className={`text-slate-400 transition-transform ${showDropdown ? "rotate-180" : ""}`} />
                  </button>
                  {showDropdown && (
                    <div className="absolute top-full mt-1 left-0 w-full bg-white border border-slate-200 rounded-xl shadow-lg z-20 overflow-hidden">
                      {VAI_TRO_OPTIONS.map((vt) => (
                        <button
                          key={vt}
                          onClick={() => {
                            setFilterVaiTro(vt);
                            setShowDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-sm hover:bg-indigo-50 transition-colors flex items-center gap-2 ${
                            filterVaiTro === vt ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-slate-600"
                          }`}
                        >
                          {vt !== "Tất cả" && vaiTroConfig[vt]?.icon}
                          {vt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
                <Plus size={16} />
                Thêm nhân viên
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-slate-50 to-indigo-50/30">
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Mã NV</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Họ tên</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Tên đăng nhập</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Số điện thoại</th>
                  <th className="text-center px-4 py-3 font-semibold text-slate-600">Vai trò</th>
                  <th className="text-center px-4 py-3 font-semibold text-slate-600">Trạng thái</th>
                  <th className="text-center px-4 py-3 font-semibold text-slate-600">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredList.map((nv, index) => {
                  const roleConf = vaiTroConfig[nv.vaiTro];
                  return (
                    <tr
                      key={nv.maNV}
                      className={`hover:bg-indigo-50/40 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-slate-50/30"
                      }`}
                    >
                      <td className="px-4 py-3.5 font-mono text-xs text-indigo-600 font-semibold">
                        {nv.maNV}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                            {nv.hoTen.charAt(nv.hoTen.lastIndexOf(" ") + 1)}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800">{nv.hoTen}</p>
                            <p className="text-xs text-slate-400">{nv.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="font-mono text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
                          {nv.tenDangNhap}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="flex items-center gap-1.5 text-slate-600">
                          <Phone size={13} className="text-slate-400" />
                          {nv.soDienThoai}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ring-1 ${roleConf.color}`}
                        >
                          {roleConf.icon}
                          {nv.vaiTro}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        {nv.trangThai === "Hoạt động" ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200">
                            <CheckCircle2 size={12} />
                            Hoạt động
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 ring-1 ring-red-200">
                            <XCircle size={12} />
                            Bị khóa
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg border border-indigo-200 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors"
                            onClick={() => alert(`Mở form sửa nhân viên ${nv.maNV}: ${nv.hoTen}`)}
                          >
                            <Edit3 size={12} />
                            Sửa
                          </button>
                          <button
                            onClick={() => handleToggleLock(nv.maNV)}
                            className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
                              nv.trangThai === "Hoạt động"
                                ? "border border-red-200 text-red-600 bg-red-50 hover:bg-red-100"
                                : "border border-emerald-200 text-emerald-600 bg-emerald-50 hover:bg-emerald-100"
                            }`}
                          >
                            {nv.trangThai === "Hoạt động" ? (
                              <>
                                <Lock size={12} />
                                Khóa
                              </>
                            ) : (
                              <>
                                <Unlock size={12} />
                                Mở khóa
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredList.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                <Search size={40} strokeWidth={1} />
                <p className="mt-3 text-sm">Không tìm thấy nhân viên phù hợp</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
            <span>
              Hiển thị <strong className="text-slate-700">{filteredList.length}</strong> / {totalNV} nhân viên
            </span>
            <span className="flex items-center gap-1">
              <User size={12} />
              Cập nhật lần cuối: {new Date().toLocaleDateString("vi-VN")}
            </span>
          </div>
        </div>
      </div>

      {/* Click-away dropdown */}
      {showDropdown && (
        <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />
      )}
    </div>
  );
}
