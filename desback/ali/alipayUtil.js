const AlipaySdk = require("alipay-sdk").default; // 引入 SDK
const alipaySdk = new AlipaySdk({
  appId: "2021000117621383", // 开放平台上创建应用时生成的 appId
  signType: "RSA", // 签名算法,默认 RSA2
  gateway: "https://openapi.alipaydev.com/gateway.do", // 支付宝网关地址 ，沙箱环境下使用时需要修改
  alipayPublicKey:
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAh2x1ppHmer4WTi/Hr0HUIyfT6Z12nJ4vxC8cBIqqnTMeqIQKx73qjKjA++10EVNN6lNdBzYVtDiJyWmjL/JxIGb0e30+C0nMUTT7gYNEiY9lSuCbEBzvmf3P1iQsXVDVMvs3msbqUkNCk/Ni0UsKEkH/Fj8tQd+f6xqqimN/t5ULTn58Q/zBJ5uS9bqaKWlRIg52ROrvbOElvXIoCu1J8sfyVRGuHh7d2f9VHB7ZmOCs/i7D6j3Un09hp5nJ5DyPsC6yU+W7NtlCIoqE8e1nALGtctLiDJXaffj6JP66h4YkBI+F08OxIE8hv89YUdZAS3+8RdgVSfCE4cWCszC7GQIDAQAB", // 支付宝公钥，需要对结果验签时候必填
  privateKey:
    "MIIEogIBAAKCAQEAj5dw0UaJUz/6rgbRoMrR2w9AyGBTMsr8PKdmVmAImxZ+3kCBByKPS6k/tY9PDDrn0dOaDMrSaAX7TNBuMQnAEVfXCjtdwcfzAdQ7+b2sWXIvIH9eegw1cd0+ZP9pI8yuGZAbibUz6wQdeot0NIQFyJqEc8TXEVToP9FCT/h8vXumMEBX9MonVA0UROzwicULHpsZk3wz1dZeh2jpfngkU2wG1FonFVYPvTtdTzUm6L9AoGZLHxYeBWNqyk74x+aJDJWWpi/fG1RSkKgSKJiP6szh21nP1ysiggTcwyBeePv2f1OUlOj2H30hYLWhdGJWluf498mntT/DwjenKpbzYQIDAQABAoIBAHa0yLSJro9fLfreckCOS4zggDrmvwEXpAz0ivrPK24i28Ea7FActv/irGOJVN0UeX8SgqEer3EFuOmYye/KUrlDt+eiinDfvrp9XROqRSgw6FriURVusGQwdhuCtsW8uRUy+EEQxxn77e7YCLo9hpZ/fw5B5VZTrijL8xkvoNf3eQT+0IBP0H9flsND/mZVVEdMkcVrpzDOLv8H37VshcIAEH2kWg5HCvGOk8/UrTdbx+DHF/m9rA1J632ISj0yCz7aOwpd6gO+QIRBIgG5dRpFLQ+19DeOHS+WRky/jZAQUEfQYGO+G8pkyhbjSpf/GQuRabzfxqRbSpDkPGTEwEECgYEA1LueE4cKwO5xSZ5+QMvdVtXCcEPYXEAN5nGfYxqxDVhw/aBcMXmV6vmnuv4OpL4Da6z1TMlLoFem8SmEOm8JPAvqNXQ3acfdz9PGU2kVJMRm2ngOGhoaIG6WYODdkfqsgl7d2vd8LUbKtwyTOu+pg3vAgVCojr6egLE14WYs7ykCgYEArMvWASqnn9HkjDawrbL0Ig36MLB5R8x+NLplNnkddDG7HhRyuho+wq7FDBOUkcmx3skx0M4X12h3ewZK2wy37stkVrBDPE9ktJNXML76K4cx92TefquKIJPj3WZevc9GcPcR3nhRCVAk6Ausau9eUf6xX0BN76HsfE9U5kQswXkCgYAxuAvQ+o3b256kmyNc14jKo7kG7gRiQyI8iq+6xOE+gj4eON1zPrx4J5M5E+muPS6les31/VHsjq/Yy2A5G/xniU1a4ueUlH7V9OP0WKn1ZuW3B7ocBZ+3lsEUsVl3pcOt0Kg/ZfoixtnYAFtkueC/dyvdzVEn04tN/pzeKjg0SQKBgEu+rnikcgYkw8KS1q/NmiazadCeCwvmIAyNCIDwZnDgu91bqU7a4lgEtGuuyZl+iHHYT/Xv4ZOTP4y2HWoYESikD7/QVCjDxKlDTR0ZGiCqisSfesib+Vh+e4w5q54YlhA+vZ5/r0Yd04/ETjgx5W6b7rSKQ5+fo0J6pASsLdJBAoGAT9Jz6UqOF1vBrEZH1JgzYJFWrvuTrsIH8+AYjvPK5cggjed6I6/ons3igZD5iUJuRsbglXh3RiLzeYzZ87D3a5wvcj9UQzcYYw3Ajko3Ng5nLsJhYmo3H53Ox+h9uRijkyuIZUDnWSYoHXEQgV1pWxf0ZEGfPS+SKLNDiZ/7lz4=", // 应用私钥字符串
});
module.exports = alipaySdk;