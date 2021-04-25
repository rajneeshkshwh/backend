let io;

module.exports = {
    init: httpServer => {
        io = require('socket.io')(httpServer, {
            cors: {
                origin: "http://b984edd53bb3.ngrok.io",
                methods: ["GET","POST"]
            }
        });
        return io;
    },
    getIO: () => {
        if (!io) {
            throw  new Error('Socket.io not initialized!');
        }
        return io;
    }
};