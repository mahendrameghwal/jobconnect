const APIKEY = process.env.SECERET_API_KEY;

const GetAPIKEY = async (req, res) => {
  try {
    if (APIKEY) {
      return res.send(APIKEY);
    }
  } catch (error) {
    return res.send('not found api key');
  }
};

module.exports = GetAPIKEY;
