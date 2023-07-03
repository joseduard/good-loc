export async function upload(req, res) {
  if (req) {
    const user = req.user;
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${
      user.pseudo
    }/${req.file.filename}`;
    const x = await user.update(
      {
        img: imageUrl,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    console.log(x);
    req.res.status(200).json({
      message: 'Image upload successfully',
      url: imageUrl,
    });
  } else {
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
}
