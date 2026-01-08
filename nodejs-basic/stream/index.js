const fs = require("fs");

const readableStream = fs.createReadStream("input.txt", {
  highWaterMark: 10,
  encoding: "utf8",
});

const writableStream = fs.createWriteStream("output.txt");

readableStream.on("readable", () => {
  let chunk;
  while ((chunk = readableStream.read()) !== null) {
    const output = chunk + "\n";

    process.stdout.write(output);
    writableStream.write(output);
  }
});

readableStream.on("end", () => {
  console.log("Done");
  writableStream.end();
});
