const CreateBanner = async () => {
  try {
    let images = [...req.body.images];
    let imagesBuffer = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], {
        folder: 'banners',
        width: 1920,
        crop: 'scale',
      });

      imagesBuffer.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesBuffer;
    const banner = await Banner.create(req.body);

    res.status(201).json({
      success: true,
      banner,
    });
  } catch (error) {

    next(error);
  }
};
export default CreateBanner;
