const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Records = require('./records');

const app = express();
app.use(express.json());
app.use(morgan('dev'));

// Enable CORS 
const cors = require('cors');
app.use(cors());

// Get all books
app.get("/books", async (req, res) => {
    try {
        const records = await Records.find().lean();
        res.json(records);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error: error.message });
    }
});

// Get book by ID
app.get("/books/:id", async (req, res) => {
    try {
        const record = await Records.findById(req.params.id).lean();
        if (!record) return res.status(404).json({ message: "Book not found" });
        res.json(record);
    } catch (error) {
        res.status(400).json({ message: "Invalid ID format", error: error.message });
    }
});

// Get book by genre
app.get("/books/genre/:genre", async (req, res) => {
    try {
        const record = await Records.findOne({ genre: req.params.genre }).lean();
        if (!record) return res.status(404).json({ message: "Genre not found" });
        res.json(record);
    } catch (error) {
        res.status(500).json({ message: "Error searching books", error: error.message });
    }
});

// Add a new book
app.post("/books", async (req, res) => {
    try {
        const record = new Records({
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            year: req.body.year
        });
        await record.save();
        res.status(201).json({ message: "Book added successfully", book: record });
    } catch (error) {
        res.status(400).json({ message: "Error adding book", error: error.message });
    }
});

// Update book
app.put("/books/:id", async (req, res) => {
    try {
        const record = await Records.findById(req.params.id);
        if (!record) return res.status(404).json({ message: "Book not found" });

        Object.assign(record, req.body);
        await record.save();
        res.json({ message: "Book updated successfully", book: record });
    } catch (error) {
        res.status(400).json({ message: "Invalid ID format", error: error.message });
    }
});

// Delete book
app.delete("/books/:id", async (req, res) => {
    try {
        const record = await Records.findByIdAndDelete(req.params.id);
        if (!record) return res.status(404).json({ message: "Book not found" });
        res.json({ message: "Book deleted successfully", book: record });
    } catch (error) {
        res.status(400).json({ message: "Invalid ID format", error: error.message });
    }
});

// Home route
app.get("/", (req, res) => {
    res.send("Hello, Welcome to the public library");
});

// Start server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
