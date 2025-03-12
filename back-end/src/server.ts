import app from './app.js';

const PORT = process.env.PORT || 5006;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  //listen api docs
//  console.log(`Listening on port http://localhost:${PORT}/api-docs`);
});
