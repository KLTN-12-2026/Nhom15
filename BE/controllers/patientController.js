
const Patient = require('../models/Patient');

// 1. Thêm bệnh nhân
const createPatient = async (req, res) => {
    try {
        const patient = await Patient.create(req.body);

        res.status(201).json({
            message: 'Thêm bệnh nhân thành công',
            data: patient
        });
    } catch (error) {
        res.status(400).json({
            message: 'Không thể thêm bệnh nhân',
            error: error.message
        });
    }
};

// 2. Lấy danh sách bệnh nhân
const getPatients = async (req, res) => {
    try {
        const patients = await Patient.find();

        res.status(200).json({
            message: 'Lấy danh sách bệnh nhân thành công',
            data: patients
        });
    } catch (error) {
        res.status(500).json({
            message: 'Lỗi khi lấy danh sách bệnh nhân',
            error: error.message
        });
    }
};

// 3. Lấy thông tin một bệnh nhân
const getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);

        if (!patient) {
            return res.status(404).json({
                message: 'Không tìm thấy bệnh nhân'
            });
        }

        res.status(200).json({
            message: 'Lấy thông tin bệnh nhân thành công',
            data: patient
        });
    } catch (error) {
        res.status(400).json({
            message: 'ID bệnh nhân không hợp lệ',
            error: error.message
        });
    }
};

// 4. Cập nhật bệnh nhân
const updatePatient = async (req, res) => {
    try {
        const patient = await Patient.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!patient) {
            return res.status(404).json({
                message: 'Không tìm thấy bệnh nhân'
            });
        }

        res.status(200).json({
            message: 'Cập nhật bệnh nhân thành công',
            data: patient
        });
    } catch (error) {
        res.status(400).json({
            message: 'Không thể cập nhật bệnh nhân',
            error: error.message
        });
    }
};

// 5. Xóa bệnh nhân
const deletePatient = async (req, res) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);

        if (!patient) {
            return res.status(404).json({
                message: 'Không tìm thấy bệnh nhân'
            });
        }

        res.status(200).json({
            message: 'Xóa bệnh nhân thành công'
        });
    } catch (error) {
        res.status(400).json({
            message: 'ID bệnh nhân không hợp lệ',
            error: error.message
        });
    }
};

module.exports = {
    createPatient,
    getPatients,
    getPatientById,
    updatePatient,
    deletePatient
};
