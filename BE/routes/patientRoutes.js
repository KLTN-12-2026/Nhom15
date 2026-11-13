
const express = require('express');
const router = express.Router();

const {
    createPatient,
    getPatients,
    getPatientById,
    updatePatient,
    deletePatient
} = require('../controllers/patientController');

// Thêm bệnh nhân
router.post('/', createPatient);

// Lấy danh sách bệnh nhân
router.get('/', getPatients);

// Lấy thông tin bệnh nhân theo ID
router.get('/:id', getPatientById);

// Cập nhật bệnh nhân
router.put('/:id', updatePatient);

// Xóa bệnh nhân
router.delete('/:id', deletePatient);

module.exports = router;
