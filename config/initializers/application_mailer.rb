# Action Mailer Configuration for Yandex
Rails.application.config.action_mailer.smtp_settings = {
    address: 'smtp.yandex.ru',
    domain: ENV['MAILER_DOMAIN'],
    port: 465,
    user_name: ENV['MAILER_USER_NAME'],
    password: ENV['MAILER_PASSWORD'],
    authentication: 'plain',
    ssl: true
}
