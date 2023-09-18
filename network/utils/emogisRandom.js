function generarEmojiAleatorio() {
  const emojis = [
    `🫣`, `🫠`, `🦄`, `🌚`, `💫`, `🎯`, `🛸`, `🚀`, `🪅`, `🎈`, `🐛`, `🐡`, `😌`, `🫢`, `🤭`, `🤠`, `🪻`, `🌸`];
  const indiceAleatorio = Math.floor(Math.random() * emojis.length);
  return emojis[indiceAleatorio];
}


module.exports = generarEmojiAleatorio