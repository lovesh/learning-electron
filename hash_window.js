$(() => {
  const crypto = require('crypto')

  function generateHash(event) {
    
    const text = $('#text-input')[0].value;

    const md5 = crypto.createHash('md5').update(text, 'utf8').digest('hex')
    $('#md5-output').text(md5)

    const sha1 = crypto.createHash('sha1').update(text, 'utf8').digest('hex')
    $('#sha1-output').text(sha1)

    const sha256 = crypto.createHash('sha256').update(text, 'utf8').digest('hex')
    $('#sha256-output').text(sha256)

    const sha512 = crypto.createHash('sha512').update(text, 'utf8').digest('hex')
    $('#sha512-output').text(sha512)
  }

  $('#generate').bind('click', generateHash);

  $('#text-input').focus() // focus input box
})
