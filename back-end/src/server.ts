import app from './app.js';

const PORT = parseInt(process.env.PORT || '5006', 10);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port http://0.0.0.0:${PORT}`);
  //listen api docs
//  console.log(`Listening on port http://localhost:${PORT}/api-docs`);
});
