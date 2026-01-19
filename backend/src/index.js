import app from "./app.js";

const PORT = 5100;
app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});