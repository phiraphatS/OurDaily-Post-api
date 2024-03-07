export default () => ({
    mode: process.env.NODE_ENV,
    port: parseInt(process.env.NODE_PORT, 10) || 5001,
});
