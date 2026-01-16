const express = require("express");
const { nanoid } = require("nanoid");

const app = express();
const PORT = 9000;

const books = [];

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Bookshelf API is running",
  });
});

app.post("/books", (req, res) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.body || {};

  if (!name) {
    return res.status(400).json({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
  }

  if (
    typeof readPage === "number" &&
    typeof pageCount === "number" &&
    readPage > pageCount
  ) {
    return res.status(400).json({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
  }

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  const book = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading: Boolean(reading),
    insertedAt,
    updatedAt,
  };

  books.push(book);

  return res.status(201).json({
    status: "success",
    message: "Buku berhasil ditambahkan",
    data: { bookId: id },
  });
});

app.get("/books", (req, res) => {
  const list = books.map((b) => ({
    id: b.id,
    name: b.name,
    publisher: b.publisher,
  }));
  return res.status(200).json({
    status: "success",
    data: { books: list },
  });
});

app.get("/books/:bookId", (req, res) => {
  const { bookId } = req.params;
  const book = books.find((b) => b.id === bookId);
  if (!book) {
    return res.status(404).json({
      status: "fail",
      message: "Buku tidak ditemukan",
    });
  }
  return res.status(200).json({
    status: "success",
    data: { book },
  });
});

app.put("/books/:bookId", (req, res) => {
  const { bookId } = req.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.body || {};

  const idx = books.findIndex((b) => b.id === bookId);
  if (idx === -1) {
    return res.status(404).json({
      status: "fail",
      message: "Gagal memperbarui buku. Id tidak ditemukan",
    });
  }

  if (!name) {
    return res.status(400).json({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
  }

  if (
    typeof readPage === "number" &&
    typeof pageCount === "number" &&
    readPage > pageCount
  ) {
    return res.status(400).json({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
  }

  const updatedAt = new Date().toISOString();
  const finished = pageCount === readPage;

  const prev = books[idx];
  books[idx] = {
    ...prev,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading: Boolean(reading),
    updatedAt,
  };

  return res.status(200).json({
    status: "success",
    message: "Buku berhasil diperbarui",
  });
});

app.delete("/books/:bookId", (req, res) => {
  const { bookId } = req.params;
  const idx = books.findIndex((b) => b.id === bookId);
  if (idx === -1) {
    return res.status(404).json({
      status: "fail",
      message: "Buku gagal dihapus. Id tidak ditemukan",
    });
  }
  books.splice(idx, 1);
  return res.status(200).json({
    status: "success",
    message: "Buku berhasil dihapus",
  });
});

const server = app.listen(PORT, () => {
  console.log(`Bookshelf API running on port ${PORT}`);
});

server.on("error", (err) => {
  console.error("Server error:", err);
  process.exit(1);
});
