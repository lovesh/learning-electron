$(() => {
  const MAP = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  
  function to_b58(B, A) {
    var d = [],
      s = "",
      i, j, c, n;
    for (i in B) {
      j = 0, c = B[i];
      s += c || s.length ^ i ? "" : 1;
      while (j in d || c) {
        n = d[j];
        n = n ? n * 256 + c : c;
        c = n / 58 | 0;
        d[j] = n % 58;
        j++
      }
    }
    while (j--) s += A[d[j]];
    return s
  }
  
  function from_b58(S, A) {
    var d = [],
      b = [],
      i, j, c, n;
    for (i in S) {
      j = 0, c = A.indexOf(S[i]);
      if (c < 0) return undefined;
      c || b.length ^ i ? i : b.push(0);
      while (j in d || c) {
        n = d[j];
        n = n ? n * 58 + c : c;
        c = n >> 8;
        d[j] = n % 256;
        j++
      }
    }
    while (j--) b.push(d[j]);
    return new Uint8Array(b)
  }

  function generateHash(event) {
    var seed = nacl.randomBytes(nacl.sign.seedLength);
    var x = nacl.sign.keyPair.fromSeed(seed);
    var pkBytes = [];
    var skBytes = [];
    var pk = '';
    var sk = '';
    var seedHx = '';

    for (i = 0; i < nacl.sign.seedLength; i++) {
      var c = seed[i].toString(16);
      seedHx += c.length == 1 ? "0" + c : c;

    }

    for (i = 0; i < 32; i++) {
      var c = x.secretKey[i].toString(16);
      sk += c.length == 1 ? "0" + c : c;
      skBytes.push(x.secretKey[i]);
    }

    for (i = 32; i < 64; i++) {
      var c = x.secretKey[i].toString(16);
      pk += c.length == 1 ? "0" + c : c;
      pkBytes.push(x.secretKey[i]);
    }

      $('#seed-hex-output').text("Seed in hex is " + seedHx);
      $('#sk-hex-output').text("Signing key in hex is " + sk);
      $('#sk-b58-output').text("Signing key in base58 is " + to_b58(skBytes, MAP));
      $('#vk-hex-output').text("Verification key in hex is " + pk);
      $('#vk-b58-output').text("Verification key in base58 is " + to_b58(pkBytes, MAP));

    // const text = $('#text-input')[0].value;
      
    // const md5 = crypto.createHash('md5').update(text, 'utf8').digest('hex')
    // $('#md5-output').text(md5)

    // const sha1 = crypto.createHash('sha1').update(text, 'utf8').digest('hex')
    // $('#sha1-output').text(sha1)

    // const sha256 = crypto.createHash('sha256').update(text, 'utf8').digest('hex')
    // $('#sha256-output').text(sha256)

    // const sha512 = crypto.createHash('sha512').update(text, 'utf8').digest('hex')
    // $('#sha512-output').text(sha512)
  }

  $('#generate').bind('click', generateHash);

  $('#text-input').focus() // focus input box
})
