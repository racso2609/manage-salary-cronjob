module.exports = {
    apps: [
        {
            script: 'dist/app.js',
            watch: '.',
            name: 'manage-salary-back',
        },
        {
            name: 'manage-salary-binance',
            script: 'dist/cronjobs/binance/index.js',
            instances: 1,
            exec_mode: 'fork',
            cron_restart: '* * * *',
            watch: false,
            autorestart: true,
        },
    ],
};
