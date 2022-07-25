import nodemailer from "nodemailer";

export const sentMail = async (emailReceived, emailUsername, tokenEmail) => {
  const emailSender = "hasnakh0402@gmail.com";
  const emailPassword = "nfzlfsjvhupgzivr";
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    // secure: true, // true for 465, false for other ports
    secure: false,
    requireTLS: true,
    auth: {
      user: emailSender, // generated ethereal user
      pass: emailPassword, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail(
    {
      from: emailSender, // sender address
      to: emailReceived, // list of receivers
      subject: "Verifikasi Pendaftaran", // Subject line
      text: `Verifikasi Pendaftaran`, // plain text body
      html: `<b>Kepada Yth. ${emailUsername} Terimakasih telah melakukan pendaftaran. Silahkan Klik link dibawah ini untuk melakukan konfirmasi email http://http://103.183.75.222:3001/pesertaWakaf/activate?token=${tokenEmail}</b>`,
    },
    (err, info) => {
      if (err) {
        return false;
      }
      //   console.log("first", info.messageId);
      return info.messageId;
    }
  );
  //   console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
