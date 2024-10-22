const Joi = require("joi");

const pemesananSchema = Joi.object({
  nama_pemesan: Joi.string().required().messages({
    "string.base": "Nama pemesan harus berupa teks",
    "string.empty": "Nama pemesan tidak boleh kosong",
    "any.required": "Nama pemesan wajib diisi",
  }),
  email_pemesan: Joi.string().email().required().messages({
    "string.email": "Format email pemesan tidak valid",
    "string.empty": "Email pemesan tidak boleh kosong",
    "any.required": "Email pemesan wajib diisi",
  }),
  check_in: Joi.date().required().messages({
    "date.base": "Tanggal check-in harus berupa tanggal yang valid",
    "date.empty": "Tanggal check-in tidak boleh kosong",
    "any.required": "Tanggal check-in wajib diisi",
  }),
  check_out: Joi.date().required().messages({
    "date.base": "Tanggal check-out harus berupa tanggal yang valid",
    "date.empty": "Tanggal check-out tidak boleh kosong",
    "any.required": "Tanggal check-out wajib diisi",
  }),
  nama_tamu: Joi.string().required().messages({
    "string.base": "Nama tamu harus berupa teks",
    "string.empty": "Nama tamu tidak boleh kosong",
    "any.required": "Nama tamu wajib diisi",
  }),
  jumlah_kamar: Joi.number().integer().required().messages({
    "number.base": "Jumlah kamar harus berupa angka",
    "number.empty": "Jumlah kamar tidak boleh kosong",
    "any.required": "Jumlah kamar wajib diisi",
  }),
  tipe_kamar: Joi.string().required().messages({
    "string.base": "Nama tipe kamar harus berupa angka",
    "string.empty": "Nama tipe kamar tidak boleh kosong",
    "any.required": "Nama tipe kamar wajib diisi",
  }),
  status_pemesanan: Joi.string()
    .valid("baru", "check_in", "check_out")
    .required()
    .messages({
      "any.only":
        "Status pemesanan harus salah satu dari 'baru', 'check_in', atau 'check_out'",
      "any.required": "Status pemesanan wajib diisi",
    }),
    selectedDate: Joi.array(),
});

exports.validatePemesanan = async (req, res, next) => {
  const { error } = pemesananSchema.validate(req.body);
  if (error) {
     const message = error.details.map((item) => item.message).join(" ")
    return res.status(400).json({ status: "error", message: message });
  }

  next();
};
