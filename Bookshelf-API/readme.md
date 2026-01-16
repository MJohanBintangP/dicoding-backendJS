Bookshelf API

Cara menjalankan:

1. Install dependencies

```
npm install
```

2. Jalankan server pada port 9000

```
npm run start
```

Endpoint utama:

- POST /books — tambah buku
- GET /books — daftar buku (id, name, publisher)
- GET /books/{bookId} — detail buku
- PUT /books/{bookId} — perbarui buku
- DELETE /books/{bookId} — hapus buku
