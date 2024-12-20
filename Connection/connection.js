const mongoose = require("mongoose")

const connection_str = `mongodb+srv://monupareek632:Monu%40632@monu1322.tue4v.mongodb.net/`

mongoose.connect(connection_str).then(() => {
    console.log('Database Connected');
})