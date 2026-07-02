const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Data dummy
let students = [
    { id: 1, nama: "Andi", jurusan: "Informatika" },
    { id: 2, nama: "Budi", jurusan: "Sistem Informasi" },
    { id: 3, nama: "Citra", jurusan: "Teknik Komputer" }
];

// 1. Home Endpoint
app.get('/', (req, res) => {
    res.send("API berjalan");
});

// 2. GET semua mahasiswa
app.get('/students', (req, res) => {
    res.json(students);
});

// 3. GET mahasiswa by ID
app.get('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
    }

    res.json(student);
});

// 4. POST tambah mahasiswa
app.post('/students', (req, res) => {
    const { nama, jurusan } = req.body;

    const newStudent = {
        id: students.length + 1,
        nama,
        jurusan
    };

    students.push(newStudent);
    res.json(newStudent);
});

// 5. PUT update mahasiswa
app.put('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
    }

    const { nama, jurusan } = req.body;

    student.nama = nama;
    student.jurusan = jurusan;

    res.json(student);
});

// 6. DELETE mahasiswa
app.delete('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);

    students = students.filter(s => s.id !== id);

    res.json({ message: "Mahasiswa berhasil dihapus" });
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});